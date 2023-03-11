// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Database, Databases } from "./client/Database";
import { Offer, Offers } from "./client/Offer";
import { ClientContext } from "./ClientContext";
import { parseConnectionString } from "./common";
import { Constants } from "./common/constants";
import { getUserAgent } from "./common/platform";
import { defaultConnectionPolicy } from "./documents";
import { GlobalEndpointManager } from "./globalEndpointManager";
import { ResourceResponse } from "./request";
import { checkURL } from "./utils/checkURL";
/**
 * Provides a client-side logical representation of the Azure Cosmos DB database account.
 * This client is used to configure and execute requests in the Azure Cosmos DB database service.
 * @example Instantiate a client and create a new database
 * ```typescript
 * const client = new CosmosClient({endpoint: "<URL HERE>", auth: {masterKey: "<KEY HERE>"}});
 * await client.databases.create({id: "<datbase name here>"});
 * ```
 * @example Instantiate a client with custom Connection Policy
 * ```typescript
 * const connectionPolicy = new ConnectionPolicy();
 * connectionPolicy.RequestTimeout = 10000;
 * const client = new CosmosClient({
 *    endpoint: "<URL HERE>",
 *    auth: {masterKey: "<KEY HERE>"},
 *    connectionPolicy
 * });
 * ```
 */
export class CosmosClient {
    constructor(optionsOrConnectionString) {
        var _a, _b;
        if (typeof optionsOrConnectionString === "string") {
            optionsOrConnectionString = parseConnectionString(optionsOrConnectionString);
        }
        const endpoint = checkURL(optionsOrConnectionString.endpoint);
        if (!endpoint) {
            throw new Error("Invalid endpoint specified");
        }
        optionsOrConnectionString.connectionPolicy = Object.assign({}, defaultConnectionPolicy, optionsOrConnectionString.connectionPolicy);
        optionsOrConnectionString.defaultHeaders = optionsOrConnectionString.defaultHeaders || {};
        optionsOrConnectionString.defaultHeaders[Constants.HttpHeaders.CacheControl] = "no-cache";
        optionsOrConnectionString.defaultHeaders[Constants.HttpHeaders.Version] =
            Constants.CurrentVersion;
        if (optionsOrConnectionString.consistencyLevel !== undefined) {
            optionsOrConnectionString.defaultHeaders[Constants.HttpHeaders.ConsistencyLevel] =
                optionsOrConnectionString.consistencyLevel;
        }
        optionsOrConnectionString.defaultHeaders[Constants.HttpHeaders.UserAgent] = getUserAgent(optionsOrConnectionString.userAgentSuffix);
        const globalEndpointManager = new GlobalEndpointManager(optionsOrConnectionString, async (opts) => this.getDatabaseAccount(opts));
        this.clientContext = new ClientContext(optionsOrConnectionString, globalEndpointManager);
        if (((_a = optionsOrConnectionString.connectionPolicy) === null || _a === void 0 ? void 0 : _a.enableEndpointDiscovery) &&
            ((_b = optionsOrConnectionString.connectionPolicy) === null || _b === void 0 ? void 0 : _b.enableBackgroundEndpointRefreshing)) {
            this.backgroundRefreshEndpointList(globalEndpointManager, optionsOrConnectionString.connectionPolicy.endpointRefreshRateInMs ||
                defaultConnectionPolicy.endpointRefreshRateInMs);
        }
        this.databases = new Databases(this, this.clientContext);
        this.offers = new Offers(this, this.clientContext);
    }
    /**
     * Get information about the current {@link DatabaseAccount} (including which regions are supported, etc.)
     */
    async getDatabaseAccount(options) {
        const response = await this.clientContext.getDatabaseAccount(options);
        return new ResourceResponse(response.result, response.headers, response.code);
    }
    /**
     * Gets the currently used write endpoint url. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    getWriteEndpoint() {
        return this.clientContext.getWriteEndpoint();
    }
    /**
     * Gets the currently used read endpoint. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    getReadEndpoint() {
        return this.clientContext.getReadEndpoint();
    }
    /**
     * Gets the known write endpoints. Useful for troubleshooting purposes.
     *
     * The urls may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    getWriteEndpoints() {
        return this.clientContext.getWriteEndpoints();
    }
    /**
     * Gets the currently used read endpoint. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    getReadEndpoints() {
        return this.clientContext.getReadEndpoints();
    }
    /**
     * Used for reading, updating, or deleting a existing database by id or accessing containers belonging to that database.
     *
     * This does not make a network call. Use `.read` to get info about the database after getting the {@link Database} object.
     *
     * @param id - The id of the database.
     * @example Create a new container off of an existing database
     * ```typescript
     * const container = client.database("<database id>").containers.create("<container id>");
     * ```
     *
     * @example Delete an existing database
     * ```typescript
     * await client.database("<id here>").delete();
     * ```
     */
    database(id) {
        return new Database(this, id, this.clientContext);
    }
    /**
     * Used for reading, or updating a existing offer by id.
     * @param id - The id of the offer.
     */
    offer(id) {
        return new Offer(this, id, this.clientContext);
    }
    /**
     * Clears background endpoint refresher. Use client.dispose() when destroying the CosmosClient within another process.
     */
    dispose() {
        clearTimeout(this.endpointRefresher);
    }
    async backgroundRefreshEndpointList(globalEndpointManager, refreshRate) {
        this.endpointRefresher = setInterval(() => {
            try {
                globalEndpointManager.refreshEndpointList();
            }
            catch (e) {
                console.warn("Failed to refresh endpoints", e);
            }
        }, refreshRate);
        if (this.endpointRefresher.unref && typeof this.endpointRefresher.unref === "function") {
            this.endpointRefresher.unref();
        }
    }
}
//# sourceMappingURL=CosmosClient.js.map