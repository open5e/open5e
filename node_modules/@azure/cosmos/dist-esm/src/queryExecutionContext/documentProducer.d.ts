import { PartitionKeyRange, Resource } from "../client";
import { ClientContext } from "../ClientContext";
import { FeedOptions } from "../request";
import { Response } from "../request";
import { FetchResult } from "./FetchResult";
import { SqlQuerySpec } from "./index";
/** @hidden */
export declare class DocumentProducer {
    private clientContext;
    private collectionLink;
    private query;
    targetPartitionKeyRange: PartitionKeyRange;
    fetchResults: FetchResult[];
    allFetched: boolean;
    private err;
    previousContinuationToken: string;
    continuationToken: string;
    generation: number;
    private respHeaders;
    private internalExecutionContext;
    /**
     * Provides the Target Partition Range Query Execution Context.
     * @param clientContext  - The service endpoint to use to create the client.
     * @param collectionLink - Represents collection link
     * @param query          - A SQL query.
     * @param targetPartitionKeyRange - Query Target Partition key Range
     * @hidden
     */
    constructor(clientContext: ClientContext, collectionLink: string, query: SqlQuerySpec, targetPartitionKeyRange: PartitionKeyRange, options: FeedOptions);
    /**
     * Synchronously gives the contiguous buffered results (stops at the first non result) if any
     * @returns buffered current items if any
     * @hidden
     */
    peekBufferedItems(): any[];
    fetchFunction: (options: FeedOptions) => Promise<Response<Resource>>;
    hasMoreResults(): boolean;
    gotSplit(): boolean;
    private _getAndResetActiveResponseHeaders;
    private _updateStates;
    private static _needPartitionKeyRangeCacheRefresh;
    /**
     * Fetches and bufferes the next page of results and executes the given callback
     */
    bufferMore(): Promise<Response<any>>;
    /**
     * Synchronously gives the bufferend current item if any
     * @returns buffered current item if any
     * @hidden
     */
    getTargetParitionKeyRange(): PartitionKeyRange;
    /**
     * Fetches the next element in the DocumentProducer.
     */
    nextItem(): Promise<Response<any>>;
    /**
     * Retrieve the current element on the DocumentProducer.
     */
    current(): Promise<Response<any>>;
}
//# sourceMappingURL=documentProducer.d.ts.map