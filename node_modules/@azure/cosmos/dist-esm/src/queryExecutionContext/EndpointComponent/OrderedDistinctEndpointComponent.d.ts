import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
/** @hidden */
export declare class OrderedDistinctEndpointComponent implements ExecutionContext {
    private executionContext;
    private hashedLastResult;
    constructor(executionContext: ExecutionContext);
    nextItem(): Promise<Response<any>>;
    hasMoreResults(): boolean;
}
//# sourceMappingURL=OrderedDistinctEndpointComponent.d.ts.map