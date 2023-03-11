import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { QueryInfo } from "../../request/ErrorResponse";
/** @hidden */
export declare class GroupByEndpointComponent implements ExecutionContext {
    private executionContext;
    private queryInfo;
    constructor(executionContext: ExecutionContext, queryInfo: QueryInfo);
    private readonly groupings;
    private readonly aggregateResultArray;
    private completed;
    nextItem(): Promise<Response<any>>;
    hasMoreResults(): boolean;
}
//# sourceMappingURL=GroupByEndpointComponent.d.ts.map