import { hashObject } from "../../utils/hashObject";
import { createAggregator } from "../Aggregators";
import { getInitialHeader, mergeHeaders } from "../headerUtils";
import { emptyGroup, extractAggregateResult } from "./emptyGroup";
/** @hidden */
export class GroupByValueEndpointComponent {
    constructor(executionContext, queryInfo) {
        this.executionContext = executionContext;
        this.queryInfo = queryInfo;
        this.aggregators = new Map();
        this.aggregateResultArray = [];
        this.completed = false;
        // VALUE queries will only every have a single grouping
        this.aggregateType = this.queryInfo.aggregates[0];
    }
    async nextItem() {
        // Start returning results if we have processed a full results set
        if (this.aggregateResultArray.length > 0) {
            return { result: this.aggregateResultArray.pop(), headers: getInitialHeader() };
        }
        if (this.completed) {
            return { result: undefined, headers: getInitialHeader() };
        }
        const aggregateHeaders = getInitialHeader();
        while (this.executionContext.hasMoreResults()) {
            // Grab the next result
            const { result, headers } = (await this.executionContext.nextItem());
            mergeHeaders(aggregateHeaders, headers);
            // If it exists, process it via aggregators
            if (result) {
                let grouping = emptyGroup;
                let payload = result;
                if (result.groupByItems) {
                    // If the query contains a GROUP BY clause, it will have a payload property and groupByItems
                    payload = result.payload;
                    grouping = await hashObject(result.groupByItems);
                }
                const aggregator = this.aggregators.get(grouping);
                if (!aggregator) {
                    // This is the first time we have seen a grouping so create a new aggregator
                    this.aggregators.set(grouping, createAggregator(this.aggregateType));
                }
                if (this.aggregateType) {
                    const aggregateResult = extractAggregateResult(payload[0]);
                    // if aggregate result is null, we need to short circuit aggregation and return undefined
                    if (aggregateResult === null) {
                        this.completed = true;
                    }
                    this.aggregators.get(grouping).aggregate(aggregateResult);
                }
                else {
                    // Queries with no aggregates pass the payload directly to the aggregator
                    // Example: SELECT VALUE c.team FROM c GROUP BY c.team
                    this.aggregators.get(grouping).aggregate(payload);
                }
            }
        }
        // We bail early since we got an undefined result back `[{}]`
        if (this.completed) {
            return { result: undefined, headers: aggregateHeaders };
        }
        // If no results are left in the underlying execution context, convert our aggregate results to an array
        for (const aggregator of this.aggregators.values()) {
            this.aggregateResultArray.push(aggregator.getResult());
        }
        this.completed = true;
        return { result: this.aggregateResultArray.pop(), headers: aggregateHeaders };
    }
    hasMoreResults() {
        return this.executionContext.hasMoreResults() || this.aggregateResultArray.length > 0;
    }
}
//# sourceMappingURL=GroupByValueEndpointComponent.js.map