import { ClientContext } from "../../ClientContext";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Database } from "../Database";
import { Resource } from "../Resource";
import { ContainerDefinition } from "./ContainerDefinition";
import { ContainerRequest } from "./ContainerRequest";
import { ContainerResponse } from "./ContainerResponse";
/**
 * Operations for creating new containers, and reading/querying all containers
 *
 * @see {@link Container} for reading, replacing, or deleting an existing container; use `.container(id)`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `containers.readAll()` before every single `item.read()` call, to ensure the container exists;
 * do this once on application start up.
 */
export declare class Containers {
    readonly database: Database;
    private readonly clientContext;
    constructor(database: Database, clientContext: ClientContext);
    /**
     * Queries all containers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return specific containers in an array or iterate over them one at a time.
     * @example Read all containers to array.
     * ```typescript
     * const querySpec: SqlQuerySpec = {
     *   query: "SELECT * FROM root r WHERE r.id = @container",
     *   parameters: [
     *     {name: "@container", value: "Todo"}
     *   ]
     * };
     * const {body: containerList} = await client.database("<db id>").containers.query(querySpec).fetchAll();
     * ```
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Queries all containers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return specific containers in an array or iterate over them one at a time.
     * @example Read all containers to array.
     * ```typescript
     * const querySpec: SqlQuerySpec = {
     *   query: "SELECT * FROM root r WHERE r.id = @container",
     *   parameters: [
     *     {name: "@container", value: "Todo"}
     *   ]
     * };
     * const {body: containerList} = await client.database("<db id>").containers.query(querySpec).fetchAll();
     * ```
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Creates a container.
     *
     * A container is a named logical container for items.
     *
     * A database may contain zero or more named containers and each container consists of
     * zero or more JSON items.
     *
     * Being schema-free, the items in a container do not need to share the same structure or fields.
     *
     *
     * Since containers are application resources, they can be authorized using either the
     * master key or resource keys.
     *
     * @param body - Represents the body of the container.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     */
    create(body: ContainerRequest, options?: RequestOptions): Promise<ContainerResponse>;
    /**
     * Checks if a Container exists, and, if it doesn't, creates it.
     * This will make a read operation based on the id in the `body`, then if it is not found, a create operation.
     * You should confirm that the output matches the body you passed in for non-default properties (i.e. indexing policy/etc.)
     *
     * A container is a named logical container for items.
     *
     * A database may contain zero or more named containers and each container consists of
     * zero or more JSON items.
     *
     * Being schema-free, the items in a container do not need to share the same structure or fields.
     *
     *
     * Since containers are application resources, they can be authorized using either the
     * master key or resource keys.
     *
     * @param body - Represents the body of the container.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     */
    createIfNotExists(body: ContainerRequest, options?: RequestOptions): Promise<ContainerResponse>;
    /**
     * Read all containers.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return all containers in an array or iterate over them one at a time.
     * @example Read all containers to array.
     * ```typescript
     * const {body: containerList} = await client.database("<db id>").containers.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<ContainerDefinition & Resource>;
}
//# sourceMappingURL=Containers.d.ts.map