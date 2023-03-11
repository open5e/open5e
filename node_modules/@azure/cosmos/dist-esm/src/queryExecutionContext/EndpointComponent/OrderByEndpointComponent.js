/** @hidden */
export class OrderByEndpointComponent {
    /**
     * Represents an endpoint in handling an order by query. For each processed orderby
     * result it returns 'payload' item of the result
     *
     * @param executionContext - Underlying Execution Context
     * @hidden
     */
    constructor(executionContext) {
        this.executionContext = executionContext;
    }
    /**
     * Execute a provided function on the next element in the OrderByEndpointComponent.
     */
    async nextItem() {
        const { result: item, headers } = await this.executionContext.nextItem();
        return {
            result: item !== undefined ? item.payload : undefined,
            headers,
        };
    }
    /**
     * Determine if there are still remaining resources to processs.
     * @returns true if there is other elements to process in the OrderByEndpointComponent.
     */
    hasMoreResults() {
        return this.executionContext.hasMoreResults();
    }
}
//# sourceMappingURL=OrderByEndpointComponent.js.map