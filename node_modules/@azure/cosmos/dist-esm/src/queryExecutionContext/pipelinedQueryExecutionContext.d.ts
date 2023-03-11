import { ClientContext } from "../ClientContext";
import { Response, FeedOptions } from "../request";
import { PartitionedQueryExecutionInfo } from "../request/ErrorResponse";
import { ExecutionContext } from "./ExecutionContext";
import { SqlQuerySpec } from "./SqlQuerySpec";
/** @hidden */
export declare class PipelinedQueryExecutionContext implements ExecutionContext {
    private clientContext;
    private collectionLink;
    private query;
    private options;
    private partitionedQueryExecutionInfo;
    private fetchBuffer;
    private fetchMoreRespHeaders;
    private endpoint;
    private pageSize;
    private static DEFAULT_PAGE_SIZE;
    constructor(clientContext: ClientContext, collectionLink: string, query: string | SqlQuerySpec, options: FeedOptions, partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo);
    nextItem(): Promise<Response<any>>;
    hasMoreResults(): boolean;
    fetchMore(): Promise<Response<any>>;
    private _fetchMoreImplementation;
}
//# sourceMappingURL=pipelinedQueryExecutionContext.d.ts.map