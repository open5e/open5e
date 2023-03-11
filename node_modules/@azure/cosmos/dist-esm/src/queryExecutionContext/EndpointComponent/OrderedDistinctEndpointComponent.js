import { hashObject } from "../../utils/hashObject";
/** @hidden */
export class OrderedDistinctEndpointComponent {
    constructor(executionContext) {
        this.executionContext = executionContext;
    }
    async nextItem() {
        const { headers, result } = await this.executionContext.nextItem();
        if (result) {
            const hashedResult = await hashObject(result);
            if (hashedResult === this.hashedLastResult) {
                return { result: undefined, headers };
            }
            this.hashedLastResult = hashedResult;
        }
        return { result, headers };
    }
    hasMoreResults() {
        return this.executionContext.hasMoreResults();
    }
}
//# sourceMappingURL=OrderedDistinctEndpointComponent.js.map