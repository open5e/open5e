import { ClientContext } from "../../ClientContext";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Database } from "../Database";
import { Resource } from "../Resource";
import { UserDefinition } from "./UserDefinition";
import { UserResponse } from "./UserResponse";
/**
 * Used to create, upsert, query, and read all users.
 *
 * @see {@link User} to read, replace, or delete a specific User by id.
 */
export declare class Users {
    readonly database: Database;
    private readonly clientContext;
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database: Database, clientContext: ClientContext);
    /**
     * Query all users.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all users.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Read all users.-
     * @example Read all users to array.
     * ```typescript
     * const {body: usersList} = await database.users.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<UserDefinition & Resource>;
    /**
     * Create a database user with the specified {@link UserDefinition}.
     * @param body - The specified {@link UserDefinition}.
     */
    create(body: UserDefinition, options?: RequestOptions): Promise<UserResponse>;
    /**
     * Upsert a database user with a specified {@link UserDefinition}.
     * @param body - The specified {@link UserDefinition}.
     */
    upsert(body: UserDefinition, options?: RequestOptions): Promise<UserResponse>;
}
//# sourceMappingURL=Users.d.ts.map