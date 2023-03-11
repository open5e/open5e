import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { QueryInfo } from "../../request/ErrorResponse";
/** @hidden */
export declare class GroupByValueEndpointComponent implements ExecutionContext {
    private executionContext;
    private queryInfo;
    private readonly aggregators;
    private readonly aggregateResultArray;
    private aggregateType;
    private completed;
    constructor(executionContext: ExecutionContext, queryInfo: QueryInfo);
    nextItem(): Promise<Response<any>>;
    hasMoreResults(): boolean;
}
//# sourceMappingURL=GroupByValueEndpointComponent.d.ts.map