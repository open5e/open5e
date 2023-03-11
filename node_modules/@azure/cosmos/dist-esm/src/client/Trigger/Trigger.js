import { createTriggerUri, getIdFromLink, getPathFromLink, isResourceValid, ResourceType, } from "../../common";
import { TriggerResponse } from "./TriggerResponse";
/**
 * Operations to read, replace, or delete a {@link Trigger}.
 *
 * Use `container.triggers` to create, upsert, query, or read all.
 */
export class Trigger {
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Trigger}.
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
        return createTriggerUri(this.container.database.id, this.container.id, this.id);
    }
    /**
     * Read the {@link TriggerDefinition} for the given {@link Trigger}.
     */
    async read(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.read({
            path,
            resourceType: ResourceType.trigger,
            resourceId: id,
            options,
        });
        return new TriggerResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Replace the given {@link Trigger} with the specified {@link TriggerDefinition}.
     * @param body - The specified {@link TriggerDefinition} to replace the existing definition with.
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
            resourceType: ResourceType.trigger,
            resourceId: id,
            options,
        });
        return new TriggerResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Delete the given {@link Trigger}.
     */
    async delete(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.delete({
            path,
            resourceType: ResourceType.trigger,
            resourceId: id,
            options,
        });
        return new TriggerResponse(response.result, response.headers, response.code, this);
    }
}
//# sourceMappingURL=Trigger.js.map