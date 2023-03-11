import { ClientContext } from "../../ClientContext";
import { RequestOptions } from "../../request/RequestOptions";
import { User } from "../User";
import { PermissionDefinition } from "./PermissionDefinition";
import { PermissionResponse } from "./PermissionResponse";
/**
 * Use to read, replace, or delete a given {@link Permission} by id.
 *
 * @see {@link Permissions} to create, upsert, query, or read all Permissions.
 */
export declare class Permission {
    readonly user: User;
    readonly id: string;
    private readonly clientContext;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param user - The parent {@link User}.
     * @param id - The id of the given {@link Permission}.
     */
    constructor(user: User, id: string, clientContext: ClientContext);
    /**
     * Read the {@link PermissionDefinition} of the given {@link Permission}.
     */
    read(options?: RequestOptions): Promise<PermissionResponse>;
    /**
     * Replace the given {@link Permission} with the specified {@link PermissionDefinition}.
     * @param body - The specified {@link PermissionDefinition}.
     */
    replace(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse>;
    /**
     * Delete the given {@link Permission}.
     */
    delete(options?: RequestOptions): Promise<PermissionResponse>;
}
//# sourceMappingURL=Permission.d.ts.map