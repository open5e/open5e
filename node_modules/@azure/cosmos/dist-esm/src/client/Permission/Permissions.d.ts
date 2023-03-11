import { ClientContext } from "../../ClientContext";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Resource } from "../Resource";
import { User } from "../User";
import { PermissionDefinition } from "./PermissionDefinition";
import { PermissionResponse } from "./PermissionResponse";
/**
 * Use to create, replace, query, and read all Permissions.
 *
 * @see {@link Permission} to read, replace, or delete a specific permission by id.
 */
export declare class Permissions {
    readonly user: User;
    private readonly clientContext;
    /**
     * @hidden
     * @param user - The parent {@link User}.
     */
    constructor(user: User, clientContext: ClientContext);
    /**
     * Query all permissions.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all permissions.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Read all permissions.
     * @example Read all permissions to array.
     * ```typescript
     * const {body: permissionList} = await user.permissions.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<PermissionDefinition & Resource>;
    /**
     * Create a permission.
     *
     * A permission represents a per-User Permission to access a specific resource
     * e.g. Item or Container.
     * @param body - Represents the body of the permission.
     */
    create(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse>;
    /**
     * Upsert a permission.
     *
     * A permission represents a per-User Permission to access a
     * specific resource e.g. Item or Container.
     */
    upsert(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse>;
}
//# sourceMappingURL=Permissions.d.ts.map