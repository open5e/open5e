import { createUserUri, getIdFromLink, getPathFromLink, isResourceValid, ResourceType, } from "../../common";
import { Permission, Permissions } from "../Permission";
import { UserResponse } from "./UserResponse";
/**
 * Used to read, replace, and delete Users.
 *
 * Additionally, you can access the permissions for a given user via `user.permission` and `user.permissions`.
 *
 * @see {@link Users} to create, upsert, query, or read all.
 */
export class User {
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database, id, clientContext) {
        this.database = database;
        this.id = id;
        this.clientContext = clientContext;
        this.permissions = new Permissions(this, this.clientContext);
    }
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return createUserUri(this.database.id, this.id);
    }
    /**
     * Operations to read, replace, or delete a specific Permission by id.
     *
     * See `client.permissions` for creating, upserting, querying, or reading all operations.
     */
    permission(id) {
        return new Permission(this, id, this.clientContext);
    }
    /**
     * Read the {@link UserDefinition} for the given {@link User}.
     */
    async read(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.read({
            path,
            resourceType: ResourceType.user,
            resourceId: id,
            options,
        });
        return new UserResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Replace the given {@link User}'s definition with the specified {@link UserDefinition}.
     * @param body - The specified {@link UserDefinition} to replace the definition.
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
            resourceType: ResourceType.user,
            resourceId: id,
            options,
        });
        return new UserResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Delete the given {@link User}.
     */
    async delete(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.delete({
            path,
            resourceType: ResourceType.user,
            resourceId: id,
            options,
        });
        return new UserResponse(response.result, response.headers, response.code, this);
    }
}
//# sourceMappingURL=User.js.map