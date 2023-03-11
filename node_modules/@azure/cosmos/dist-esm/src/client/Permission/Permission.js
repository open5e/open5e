import { createPermissionUri, getIdFromLink, getPathFromLink, isResourceValid, ResourceType, } from "../../common";
import { PermissionResponse } from "./PermissionResponse";
/**
 * Use to read, replace, or delete a given {@link Permission} by id.
 *
 * @see {@link Permissions} to create, upsert, query, or read all Permissions.
 */
export class Permission {
    /**
     * @hidden
     * @param user - The parent {@link User}.
     * @param id - The id of the given {@link Permission}.
     */
    constructor(user, id, clientContext) {
        this.user = user;
        this.id = id;
        this.clientContext = clientContext;
    }
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return createPermissionUri(this.user.database.id, this.user.id, this.id);
    }
    /**
     * Read the {@link PermissionDefinition} of the given {@link Permission}.
     */
    async read(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.read({
            path,
            resourceType: ResourceType.permission,
            resourceId: id,
            options,
        });
        return new PermissionResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Replace the given {@link Permission} with the specified {@link PermissionDefinition}.
     * @param body - The specified {@link PermissionDefinition}.
     */
    async replace(body, options) {
        const err = {};
        if (!isResourceValid(body, err)) {
            throw err;
        }
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.replace({
            body,
            path,
            resourceType: ResourceType.permission,
            resourceId: id,
            options,
        });
        return new PermissionResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Delete the given {@link Permission}.
     */
    async delete(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.delete({
            path,
            resourceType: ResourceType.permission,
            resourceId: id,
            options,
        });
        return new PermissionResponse(response.result, response.headers, response.code, this);
    }
}
//# sourceMappingURL=Permission.js.map