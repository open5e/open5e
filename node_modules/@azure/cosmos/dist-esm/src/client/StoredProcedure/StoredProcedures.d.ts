import { ClientContext } from "../../ClientContext";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
import { StoredProcedureResponse } from "./StoredProcedureResponse";
/**
 * Operations for creating, upserting, or reading/querying all Stored Procedures.
 *
 * For operations to read, replace, delete, or execute a specific, existing stored procedure by id, see `container.storedProcedure()`.
 */
export declare class StoredProcedures {
    readonly container: Container;
    private readonly clientContext;
    /**
     * @param container - The parent {@link Container}.
     * @hidden
     */
    constructor(container: Container, clientContext: ClientContext);
    /**
     * Query all Stored Procedures.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @example Read all stored procedures to array.
     * ```typescript
     * const querySpec: SqlQuerySpec = {
     *   query: "SELECT * FROM root r WHERE r.id = @sproc",
     *   parameters: [
     *     {name: "@sproc", value: "Todo"}
     *   ]
     * };
     * const {body: sprocList} = await containers.storedProcedures.query(querySpec).fetchAll();
     * ```
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all Stored Procedures.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @example Read all stored procedures to array.
     * ```typescript
     * const querySpec: SqlQuerySpec = {
     *   query: "SELECT * FROM root r WHERE r.id = @sproc",
     *   parameters: [
     *     {name: "@sproc", value: "Todo"}
     *   ]
     * };
     * const {body: sprocList} = await containers.storedProcedures.query(querySpec).fetchAll();
     * ```
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Read all stored procedures.
     * @example Read all stored procedures to array.
     * ```typescript
     * const {body: sprocList} = await containers.storedProcedures.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<StoredProcedureDefinition & Resource>;
    /**
     * Create a StoredProcedure.
     *
     * Azure Cosmos DB allows stored procedures to be executed in the storage tier,
     * directly against an item container. The script
     * gets executed under ACID transactions on the primary storage partition of the
     * specified container. For additional details,
     * refer to the server-side JavaScript API documentation.
     */
    create(body: StoredProcedureDefinition, options?: RequestOptions): Promise<StoredProcedureResponse>;
}
//# sourceMappingURL=StoredProcedures.d.ts.map