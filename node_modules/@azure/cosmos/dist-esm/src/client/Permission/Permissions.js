import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType } from "../../common";
import { QueryIterator } from "../../queryIterator";
import { Permission } from "./Permission";
import { PermissionResponse } from "./PermissionResponse";
/**
 * Use to create, replace, query, and read all Permissions.
 *
 * @see {@link Permission} to read, replace, or delete a specific permission by id.
 */
export class Permissions {
    /**
     * @hidden
     * @param user - The parent {@link User}.
     */
    constructor(user, clientContext) {
        this.user = user;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = getPathFromLink(this.user.url, ResourceType.permission);
        const id = getIdFromLink(this.user.url);
        return new QueryIterator(this.clientContext, query, options, (innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: ResourceType.permission,
                resourceId: id,
                resultFn: (result) => result.Permissions,
                query,
                options: innerOptions,
            });
        });
    }
    /**
     * Read all permissions.
     * @example Read all permissions to array.
     * ```typescript
     * const {body: permissionList} = await user.permissions.readAll().fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
    /**
     * Create a permission.
     *
     * A permission represents a per-User Permission to access a specific resource
     * e.g. Item or Container.
     * @param body - Represents the body of the permission.
     */
    async create(body, options) {
        const err = {};
        if (!isResourceValid(body, err)) {
            throw err;
        }
        const path = getPathFromLink(this.user.url, ResourceType.permission);
        const id = getIdFromLink(this.user.url);
        const response = await this.clientContext.create({
            body,
            path,
            resourceType: ResourceType.permission,
            resourceId: id,
            options,
        });
        const ref = new Permission(this.user, response.result.id, this.clientContext);
        return new PermissionResponse(response.result, response.headers, response.code, ref);
    }
    /**
     * Upsert a permission.
     *
     * A permission represents a per-User Permission to access a
     * specific resource e.g. Item or Container.
     */
    async upsert(body, options) {
        const err = {};
        if (!isResourceValid(body, err)) {
            throw err;
        }
        const path = getPathFromLink(this.user.url, ResourceType.permission);
        const id = getIdFromLink(this.user.url);
        const response = await this.clientContext.upsert({
            body,
            path,
            resourceType: ResourceType.permission,
            resourceId: id,
            options,
        });
        const ref = new Permission(this.user, response.result.id, this.clientContext);
        return new PermissionResponse(response.result, response.headers, response.code, ref);
    }
}
//# sourceMappingURL=Permissions.js.map