import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
/** @hidden */
export declare class OffsetLimitEndpointComponent implements ExecutionContext {
    private executionContext;
    private offset;
    private limit;
    constructor(executionContext: ExecutionContext, offset: number, limit: number);
    nextItem(): Promise<Response<any>>;
    hasMoreResults(): boolean;
}
//# sourceMappingURL=OffsetLimitEndpointComponent.d.ts.map