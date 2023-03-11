import { ClientContext } from "../../ClientContext";
import { RequestOptions } from "../../request";
import { Database } from "../Database";
import { Permission, Permissions } from "../Permission";
import { UserDefinition } from "./UserDefinition";
import { UserResponse } from "./UserResponse";
/**
 * Used to read, replace, and delete Users.
 *
 * Additionally, you can access the permissions for a given user via `user.permission` and `user.permissions`.
 *
 * @see {@link Users} to create, upsert, query, or read all.
 */
export declare class User {
    readonly database: Database;
    readonly id: string;
    private readonly clientContext;
    /**
     * Operations for creating, upserting, querying, or reading all operations.
     *
     * See `client.permission(id)` to read, replace, or delete a specific Permission by id.
     */
    readonly permissions: Permissions;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database: Database, id: string, clientContext: ClientContext);
    /**
     * Operations to read, replace, or delete a specific Permission by id.
     *
     * See `client.permissions` for creating, upserting, querying, or reading all operations.
     */
    permission(id: string): Permission;
    /**
     * Read the {@link UserDefinition} for the given {@link User}.
     */
    read(options?: RequestOptions): Promise<UserResponse>;
    /**
     * Replace the given {@link User}'s definition with the specified {@link UserDefinition}.
     * @param body - The specified {@link UserDefinition} to replace the definition.
     */
    replace(body: UserDefinition, options?: RequestOptions): Promise<UserResponse>;
    /**
     * Delete the given {@link User}.
     */
    delete(options?: RequestOptions): Promise<UserResponse>;
}
//# sourceMappingURL=User.d.ts.map