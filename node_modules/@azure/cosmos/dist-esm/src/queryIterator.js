// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __asyncGenerator, __await } from "tslib";
import { getPathFromLink, ResourceType, StatusCodes } from "./common";
import { DefaultQueryExecutionContext, getInitialHeader, mergeHeaders, PipelinedQueryExecutionContext, } from "./queryExecutionContext";
import { FeedResponse } from "./request/FeedResponse";
/**
 * Represents a QueryIterator Object, an implementation of feed or query response that enables
 * traversal and iterating over the response
 * in the Azure Cosmos DB database service.
 */
export class QueryIterator {
    /**
     * @hidden
     */
    constructor(clientContext, query, options, fetchFunctions, resourceLink, resourceType) {
        this.clientContext = clientContext;
        this.query = query;
        this.options = options;
        this.fetchFunctions = fetchFunctions;
        this.resourceLink = resourceLink;
        this.resourceType = resourceType;
        this.query = query;
        this.fetchFunctions = fetchFunctions;
        this.options = options || {};
        this.resourceLink = resourceLink;
        this.fetchAllLastResHeaders = getInitialHeader();
        this.reset();
        this.isInitialized = false;
    }
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
    getAsyncIterator() {
        return __asyncGenerator(this, arguments, function* getAsyncIterator_1() {
            this.reset();
            this.queryPlanPromise = this.fetchQueryPlan();
            while (this.queryExecutionContext.hasMoreResults()) {
                let response;
                try {
                    response = yield __await(this.queryExecutionContext.fetchMore());
                }
                catch (error) {
                    if (this.needsQueryPlan(error)) {
                        yield __await(this.createPipelinedExecutionContext());
                        try {
                            response = yield __await(this.queryExecutionContext.fetchMore());
                        }
                        catch (queryError) {
                            this.handleSplitError(queryError);
                        }
                    }
                    else {
                        throw error;
                    }
                }
                const feedResponse = new FeedResponse(response.result, response.headers, this.queryExecutionContext.hasMoreResults());
                if (response.result !== undefined) {
                    yield yield __await(feedResponse);
                }
            }
        });
    }
    /**
     * Determine if there are still remaining resources to processs based on the value of the continuation token or the
     * elements remaining on the current batch in the QueryIterator.
     * @returns true if there is other elements to process in the QueryIterator.
     */
    hasMoreResults() {
        return this.queryExecutionContext.hasMoreResults();
    }
    /**
     * Fetch all pages for the query and return a single FeedResponse.
     */
    async fetchAll() {
        this.reset();
        this.fetchAllTempResources = [];
        let response;
        try {
            response = await this.toArrayImplementation();
        }
        catch (error) {
            this.handleSplitError(error);
        }
        return response;
    }
    /**
     * Retrieve the next batch from the feed.
     *
     * This may or may not fetch more pages from the backend depending on your settings
     * and the type of query. Aggregate queries will generally fetch all backend pages
     * before returning the first batch of responses.
     */
    async fetchNext() {
        this.queryPlanPromise = this.fetchQueryPlan();
        if (!this.isInitialized) {
            await this.init();
        }
        let response;
        try {
            response = await this.queryExecutionContext.fetchMore();
        }
        catch (error) {
            if (this.needsQueryPlan(error)) {
                await this.createPipelinedExecutionContext();
                try {
                    response = await this.queryExecutionContext.fetchMore();
                }
                catch (queryError) {
                    this.handleSplitError(queryError);
                }
            }
            else {
                throw error;
            }
        }
        return new FeedResponse(response.result, response.headers, this.queryExecutionContext.hasMoreResults());
    }
    /**
     * Reset the QueryIterator to the beginning and clear all the resources inside it
     */
    reset() {
        this.queryPlanPromise = undefined;
        this.queryExecutionContext = new DefaultQueryExecutionContext(this.options, this.fetchFunctions);
    }
    async toArrayImplementation() {
        this.queryPlanPromise = this.fetchQueryPlan();
        if (!this.isInitialized) {
            await this.init();
        }
        while (this.queryExecutionContext.hasMoreResults()) {
            let response;
            try {
                response = await this.queryExecutionContext.nextItem();
            }
            catch (error) {
                if (this.needsQueryPlan(error)) {
                    await this.createPipelinedExecutionContext();
                    response = await this.queryExecutionContext.nextItem();
                }
                else {
                    throw error;
                }
            }
            const { result, headers } = response;
            // concatenate the results and fetch more
            mergeHeaders(this.fetchAllLastResHeaders, headers);
            if (result !== undefined) {
                this.fetchAllTempResources.push(result);
            }
        }
        return new FeedResponse(this.fetchAllTempResources, this.fetchAllLastResHeaders, this.queryExecutionContext.hasMoreResults());
    }
    async createPipelinedExecutionContext() {
        const queryPlanResponse = await this.queryPlanPromise;
        // We always coerce queryPlanPromise to resolved. So if it errored, we need to manually inspect the resolved value
        if (queryPlanResponse instanceof Error) {
            throw queryPlanResponse;
        }
        const queryPlan = queryPlanResponse.result;
        const queryInfo = queryPlan.queryInfo;
        if (queryInfo.aggregates.length > 0 && queryInfo.hasSelectValue === false) {
            throw new Error("Aggregate queries must use the VALUE keyword");
        }
        this.queryExecutionContext = new PipelinedQueryExecutionContext(this.clientContext, this.resourceLink, this.query, this.options, queryPlan);
    }
    async fetchQueryPlan() {
        if (!this.queryPlanPromise && this.resourceType === ResourceType.item) {
            return this.clientContext
                .getQueryPlan(getPathFromLink(this.resourceLink) + "/docs", ResourceType.item, this.resourceLink, this.query, this.options)
                .catch((error) => error); // Without this catch, node reports an unhandled rejection. So we stash the promise as resolved even if it errored.
        }
        return this.queryPlanPromise;
    }
    needsQueryPlan(error) {
        var _a;
        if (((_a = error.body) === null || _a === void 0 ? void 0 : _a.additionalErrorInfo) ||
            error.message.includes("Cross partition query only supports")) {
            return error.code === StatusCodes.BadRequest && this.resourceType === ResourceType.item;
        }
        else {
            throw error;
        }
    }
    async init() {
        if (this.isInitialized === true) {
            return;
        }
        if (this.initPromise === undefined) {
            this.initPromise = this._init();
        }
        return this.initPromise;
    }
    async _init() {
        if (this.options.forceQueryPlan === true && this.resourceType === ResourceType.item) {
            await this.createPipelinedExecutionContext();
        }
        this.isInitialized = true;
    }
    handleSplitError(err) {
        if (err.code === 410) {
            const error = new Error("Encountered partition split and could not recover. This request is retryable");
            error.code = 503;
            error.originalError = err;
            throw error;
        }
        else {
            throw err;
        }
    }
}
//# sourceMappingURL=queryIterator.js.map