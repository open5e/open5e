import { getInitialHeader, mergeHeaders } from "../headerUtils";
/** @hidden */
export class OffsetLimitEndpointComponent {
    constructor(executionContext, offset, limit) {
        this.executionContext = executionContext;
        this.offset = offset;
        this.limit = limit;
    }
    async nextItem() {
        const aggregateHeaders = getInitialHeader();
        while (this.offset > 0) {
            // Grab next item but ignore the result. We only need the headers
            const { headers } = await this.executionContext.nextItem();
            this.offset--;
            mergeHeaders(aggregateHeaders, headers);
        }
        if (this.limit > 0) {
            const { result, headers } = await this.executionContext.nextItem();
            this.limit--;
            mergeHeaders(aggregateHeaders, headers);
            return { result, headers: aggregateHeaders };
        }
        // If both limit and offset are 0, return nothing
        return { result: undefined, headers: getInitialHeader() };
    }
    hasMoreResults() {
        return (this.offset > 0 || this.limit > 0) && this.executionContext.hasMoreResults();
    }
}
//# sourceMappingURL=OffsetLimitEndpointComponent.js.map