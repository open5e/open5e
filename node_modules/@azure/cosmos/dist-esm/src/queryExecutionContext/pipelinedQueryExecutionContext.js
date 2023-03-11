import { OffsetLimitEndpointComponent } from "./EndpointComponent/OffsetLimitEndpointComponent";
import { OrderByEndpointComponent } from "./EndpointComponent/OrderByEndpointComponent";
import { OrderedDistinctEndpointComponent } from "./EndpointComponent/OrderedDistinctEndpointComponent";
import { UnorderedDistinctEndpointComponent } from "./EndpointComponent/UnorderedDistinctEndpointComponent";
import { GroupByEndpointComponent } from "./EndpointComponent/GroupByEndpointComponent";
import { getInitialHeader, mergeHeaders } from "./headerUtils";
import { OrderByQueryExecutionContext } from "./orderByQueryExecutionContext";
import { ParallelQueryExecutionContext } from "./parallelQueryExecutionContext";
import { GroupByValueEndpointComponent } from "./EndpointComponent/GroupByValueEndpointComponent";
/** @hidden */
export class PipelinedQueryExecutionContext {
    constructor(clientContext, collectionLink, query, options, partitionedQueryExecutionInfo) {
        this.clientContext = clientContext;
        this.collectionLink = collectionLink;
        this.query = query;
        this.options = options;
        this.partitionedQueryExecutionInfo = partitionedQueryExecutionInfo;
        this.endpoint = null;
        this.pageSize = options["maxItemCount"];
        if (this.pageSize === undefined) {
            this.pageSize = PipelinedQueryExecutionContext.DEFAULT_PAGE_SIZE;
        }
        // Pick between parallel vs order by execution context
        const sortOrders = partitionedQueryExecutionInfo.queryInfo.orderBy;
        if (Array.isArray(sortOrders) && sortOrders.length > 0) {
            // Need to wrap orderby execution context in endpoint component, since the data is nested as a \
            //      "payload" property.
            this.endpoint = new OrderByEndpointComponent(new OrderByQueryExecutionContext(this.clientContext, this.collectionLink, this.query, this.options, this.partitionedQueryExecutionInfo));
        }
        else {
            this.endpoint = new ParallelQueryExecutionContext(this.clientContext, this.collectionLink, this.query, this.options, this.partitionedQueryExecutionInfo);
        }
        if (Object.keys(partitionedQueryExecutionInfo.queryInfo.groupByAliasToAggregateType).length > 0 ||
            partitionedQueryExecutionInfo.queryInfo.aggregates.length > 0 ||
            partitionedQueryExecutionInfo.queryInfo.groupByExpressions.length > 0) {
            if (partitionedQueryExecutionInfo.queryInfo.hasSelectValue) {
                this.endpoint = new GroupByValueEndpointComponent(this.endpoint, partitionedQueryExecutionInfo.queryInfo);
            }
            else {
                this.endpoint = new GroupByEndpointComponent(this.endpoint, partitionedQueryExecutionInfo.queryInfo);
            }
        }
        // If top then add that to the pipeline. TOP N is effectively OFFSET 0 LIMIT N
        const top = partitionedQueryExecutionInfo.queryInfo.top;
        if (typeof top === "number") {
            this.endpoint = new OffsetLimitEndpointComponent(this.endpoint, 0, top);
        }
        // If offset+limit then add that to the pipeline
        const limit = partitionedQueryExecutionInfo.queryInfo.limit;
        const offset = partitionedQueryExecutionInfo.queryInfo.offset;
        if (typeof limit === "number" && typeof offset === "number") {
            this.endpoint = new OffsetLimitEndpointComponent(this.endpoint, offset, limit);
        }
        // If distinct then add that to the pipeline
        const distinctType = partitionedQueryExecutionInfo.queryInfo.distinctType;
        if (distinctType === "Ordered") {
            this.endpoint = new OrderedDistinctEndpointComponent(this.endpoint);
        }
        if (distinctType === "Unordered") {
            this.endpoint = new UnorderedDistinctEndpointComponent(this.endpoint);
        }
    }
    async nextItem() {
        return this.endpoint.nextItem();
    }
    // Removed callback here beacuse it wouldn't have ever worked...
    hasMoreResults() {
        return this.endpoint.hasMoreResults();
    }
    async fetchMore() {
        // if the wrapped endpoint has different implementation for fetchMore use that
        // otherwise use the default implementation
        if (typeof this.endpoint.fetchMore === "function") {
            return this.endpoint.fetchMore();
        }
        else {
            this.fetchBuffer = [];
            this.fetchMoreRespHeaders = getInitialHeader();
            return this._fetchMoreImplementation();
        }
    }
    async _fetchMoreImplementation() {
        try {
            const { result: item, headers } = await this.endpoint.nextItem();
            mergeHeaders(this.fetchMoreRespHeaders, headers);
            if (item === undefined) {
                // no more results
                if (this.fetchBuffer.length === 0) {
                    return {
                        result: undefined,
                        headers: this.fetchMoreRespHeaders,
                    };
                }
                else {
                    // Just give what we have
                    const temp = this.fetchBuffer;
                    this.fetchBuffer = [];
                    return { result: temp, headers: this.fetchMoreRespHeaders };
                }
            }
            else {
                // append the result
                this.fetchBuffer.push(item);
                if (this.fetchBuffer.length >= this.pageSize) {
                    // fetched enough results
                    const temp = this.fetchBuffer.slice(0, this.pageSize);
                    this.fetchBuffer = this.fetchBuffer.splice(this.pageSize);
                    return { result: temp, headers: this.fetchMoreRespHeaders };
                }
                else {
                    // recursively fetch more
                    // TODO: is recursion a good idea?
                    return this._fetchMoreImplementation();
                }
            }
        }
        catch (err) {
            mergeHeaders(this.fetchMoreRespHeaders, err.headers);
            err.headers = this.fetchMoreRespHeaders;
            if (err) {
                throw err;
            }
        }
    }
}
PipelinedQueryExecutionContext.DEFAULT_PAGE_SIZE = 10;
//# sourceMappingURL=pipelinedQueryExecutionContext.js.map