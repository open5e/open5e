/// <reference lib="esnext.asynciterable" />
import { ClientContext } from "./ClientContext";
import { ResourceType } from "./common";
import { FetchFunctionCallback, SqlQuerySpec } from "./queryExecutionContext";
import { FeedOptions } from "./request/FeedOptions";
import { FeedResponse } from "./request/FeedResponse";
/**
 * Represents a QueryIterator Object, an implementation of feed or query response that enables
 * traversal and iterating over the response
 * in the Azure Cosmos DB database service.
 */
export declare class QueryIterator<T> {
    private clientContext;
    private query;
    private options;
    private fetchFunctions;
    private resourceLink?;
    private resourceType?;
    private fetchAllTempResources;
    private fetchAllLastResHeaders;
    private queryExecutionContext;
    private queryPlanPromise;
    private isInitialized;
    /**
     * @hidden
     */
    constructor(clientContext: ClientContext, query: SqlQuerySpec | string, options: FeedOptions, fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[], resourceLink?: string, resourceType?: ResourceType);
    /**
     * Gets an async iterator that will yield results until completion.
     *
     * NOTE: AsyncIterators are a very new feature and you might need to
     * use polyfils/etc. in order to use them in your code.
     *
     * If you're using TypeScript, you can use the following polyfill as long
     * as you target ES6 or higher and are running on Node 6 or higher.
     *
     * ```typescript
     * if (!Symbol || !Symbol.asyncIterator) {
     *   (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
     * }
     * ```
     *
     * @example Iterate over all databases
     * ```typescript
     * for await(const { resources: db } of client.databases.readAll().getAsyncIterator()) {
     *   console.log(`Got ${db} from AsyncIterator`);
     * }
     * ```
     */
    getAsyncIterator(): AsyncIterable<FeedResponse<T>>;
    /**
     * Determine if there are still remaining resources to processs based on the value of the continuation token or the
     * elements remaining on the current batch in the QueryIterator.
     * @returns true if there is other elements to process in the QueryIterator.
     */
    hasMoreResults(): boolean;
    /**
     * Fetch all pages for the query and return a single FeedResponse.
     */
    fetchAll(): Promise<FeedResponse<T>>;
    /**
     * Retrieve the next batch from the feed.
     *
     * This may or may not fetch more pages from the backend depending on your settings
     * and the type of query. Aggregate queries will generally fetch all backend pages
     * before returning the first batch of responses.
     */
    fetchNext(): Promise<FeedResponse<T>>;
    /**
     * Reset the QueryIterator to the beginning and clear all the resources inside it
     */
    reset(): void;
    private toArrayImplementation;
    private createPipelinedExecutionContext;
    private fetchQueryPlan;
    private needsQueryPlan;
    private initPromise;
    private init;
    private _init;
    private handleSplitError;
}
//# sourceMappingURL=queryIterator.d.ts.map