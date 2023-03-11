import { createUserDefinedFunctionUri, getIdFromLink, getPathFromLink, isResourceValid, ResourceType, } from "../../common";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse";
/**
 * Used to read, replace, or delete a specified User Definied Function by id.
 *
 * @see {@link UserDefinedFunction} to create, upsert, query, read all User Defined Functions.
 */
export class UserDefinedFunction {
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link UserDefinedFunction}.
     */
    constructor(container, id, clientContext) {
        this.container = container;
        this.id = id;
        this.clientContext = clientContext;
    }
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return createUserDefinedFunctionUri(this.container.database.id, this.container.id, this.id);
    }
    /**
     * Read the {@link UserDefinedFunctionDefinition} for the given {@link UserDefinedFunction}.
     */
    async read(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.read({
            path,
            resourceType: ResourceType.udf,
            resourceId: id,
            options,
        });
        return new UserDefinedFunctionResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Replace the given {@link UserDefinedFunction} with the specified {@link UserDefinedFunctionDefinition}.
     * @param options -
     */
    async replace(body, options) {
        if (body.body) {
            body.body = body.body.toString();
        }
        const err = {};
        if (!isResourceValid(body, err)) {
            throw err;
        }
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.replace({
            body,
            path,
            resourceType: ResourceType.udf,
            resourceId: id,
            options,
        });
        return new UserDefinedFunctionResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Delete the given {@link UserDefined}.
     */
    async delete(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.delete({
            path,
            resourceType: ResourceType.udf,
            resourceId: id,
            options,
        });
        return new UserDefinedFunctionResponse(response.result, response.headers, response.code, this);
    }
}
//# sourceMappingURL=UserDefinedFunction.js.map