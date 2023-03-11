import { ClientContext } from "../../ClientContext";
import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Resource } from "../Resource";
import { DatabaseDefinition } from "./DatabaseDefinition";
import { DatabaseRequest } from "./DatabaseRequest";
import { DatabaseResponse } from "./DatabaseResponse";
/**
 * Operations for creating new databases, and reading/querying all databases
 *
 * @see {@link Database} for reading or deleting an existing database; use `client.database(id)`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `databases.readAll()` before every single `item.read()` call, to ensure the database exists;
 * do this once on application start up.
 */
export declare class Databases {
    readonly client: CosmosClient;
    private readonly clientContext;
    /**
     * @hidden
     * @param client - The parent {@link CosmosClient} for the Database.
     */
    constructor(client: CosmosClient, clientContext: ClientContext);
    /**
     * Queries all databases.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return all databases in an array or iterate over them one at a time.
     * @example Read all databases to array.
     * ```typescript
     * const querySpec: SqlQuerySpec = {
     *   query: "SELECT * FROM root r WHERE r.id = @db",
     *   parameters: [
     *     {name: "@db", value: "Todo"}
     *   ]
     * };
     * const {body: databaseList} = await client.databases.query(querySpec).fetchAll();
     * ```
     */
    query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Queries all databases.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return all databases in an array or iterate over them one at a time.
     * @example Read all databases to array.
     * ```typescript
     * const querySpec: SqlQuerySpec = {
     *   query: "SELECT * FROM root r WHERE r.id = @db",
     *   parameters: [
     *     {name: "@db", value: "Todo"}
     *   ]
     * };
     * const {body: databaseList} = await client.databases.query(querySpec).fetchAll();
     * ```
     */
    query<T>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Send a request for creating a database.
     *
     * A database manages users, permissions and a set of containers.
     * Each Azure Cosmos DB Database Account is able to support multiple independent named databases,
     * with the database being the logical container for data.
     *
     * Each Database consists of one or more containers, each of which in turn contain one or more
     * documents. Since databases are an administrative resource, the Service Master Key will be
     * required in order to access and successfully complete any action using the User APIs.
     *
     * @param body - The {@link DatabaseDefinition} that represents the {@link Database} to be created.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     */
    create(body: DatabaseRequest, options?: RequestOptions): Promise<DatabaseResponse>;
    /**
     * Check if a database exists, and if it doesn't, create it.
     * This will make a read operation based on the id in the `body`, then if it is not found, a create operation.
     *
     * A database manages users, permissions and a set of containers.
     * Each Azure Cosmos DB Database Account is able to support multiple independent named databases,
     * with the database being the logical container for data.
     *
     * Each Database consists of one or more containers, each of which in turn contain one or more
     * documents. Since databases are an an administrative resource, the Service Master Key will be
     * required in order to access and successfully complete any action using the User APIs.
     *
     * @param body - The {@link DatabaseDefinition} that represents the {@link Database} to be created.
     * @param options - Additional options for the request
     */
    createIfNotExists(body: DatabaseRequest, options?: RequestOptions): Promise<DatabaseResponse>;
    /**
     * Reads all databases.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return all databases in an array or iterate over them one at a time.
     * @example Read all databases to array.
     * ```typescript
     * const {body: databaseList} = await client.databases.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<DatabaseDefinition & Resource>;
}
//# sourceMappingURL=Databases.d.ts.map