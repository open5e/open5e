import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
/** @hidden */
export declare class UnorderedDistinctEndpointComponent implements ExecutionContext {
    private executionContext;
    private hashedResults;
    constructor(executionContext: ExecutionContext);
    nextItem(): Promise<Response<any>>;
    hasMoreResults(): boolean;
}
//# sourceMappingURL=UnorderedDistinctEndpointComponent.d.ts.map