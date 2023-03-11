import { hashObject } from "../../utils/hashObject";
/** @hidden */
export class UnorderedDistinctEndpointComponent {
    constructor(executionContext) {
        this.executionContext = executionContext;
        this.hashedResults = new Set();
    }
    async nextItem() {
        const { headers, result } = await this.executionContext.nextItem();
        if (result) {
            const hashedResult = await hashObject(result);
            if (this.hashedResults.has(hashedResult)) {
                return { result: undefined, headers };
            }
            this.hashedResults.add(hashedResult);
        }
        return { result, headers };
    }
    hasMoreResults() {
        return this.executionContext.hasMoreResults();
    }
}
//# sourceMappingURL=UnorderedDistinctEndpointComponent.js.map