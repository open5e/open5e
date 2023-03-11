import { Database, Databases } from "./client/Database";
import { Offer, Offers } from "./client/Offer";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { DatabaseAccount } from "./documents";
import { RequestOptions, ResourceResponse } from "./request";
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
export declare class CosmosClient {
    /**
     * Used for creating new databases, or querying/reading all databases.
     *
     * Use `.database(id)` to read, replace, or delete a specific, existing database by id.
     *
     * @example Create a new database
     * ```typescript
     * const {resource: databaseDefinition, database} = await client.databases.create({id: "<name here>"});
     * ```
     */
    readonly databases: Databases;
    /**
     * Used for querying & reading all offers.
     *
     * Use `.offer(id)` to read, or replace existing offers.
     */
    readonly offers: Offers;
    private clientContext;
    private endpointRefresher;
    /**
     * Creates a new {@link CosmosClient} object from a connection string. Your database connection string can be found in the Azure Portal
     */
    constructor(connectionString: string);
    /**
     * Creates a new {@link CosmosClient} object. See {@link CosmosClientOptions} for more details on what options you can use.
     * @param options - bag of options; require at least endpoint and auth to be configured
     */
    constructor(options: CosmosClientOptions);
    /**
     * Get information about the current {@link DatabaseAccount} (including which regions are supported, etc.)
     */
    getDatabaseAccount(options?: RequestOptions): Promise<ResourceResponse<DatabaseAccount>>;
    /**
     * Gets the currently used write endpoint url. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    getWriteEndpoint(): Promise<string>;
    /**
     * Gets the currently used read endpoint. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    getReadEndpoint(): Promise<string>;
    /**
     * Gets the known write endpoints. Useful for troubleshooting purposes.
     *
     * The urls may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    getWriteEndpoints(): Promise<readonly string[]>;
    /**
     * Gets the currently used read endpoint. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    getReadEndpoints(): Promise<readonly string[]>;
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
    database(id: string): Database;
    /**
     * Used for reading, or updating a existing offer by id.
     * @param id - The id of the offer.
     */
    offer(id: string): Offer;
    /**
     * Clears background endpoint refresher. Use client.dispose() when destroying the CosmosClient within another process.
     */
    dispose(): void;
    private backgroundRefreshEndpointList;
}
//# sourceMappingURL=CosmosClient.d.ts.map