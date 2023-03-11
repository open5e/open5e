import { Constants, getIdFromLink, getPathFromLink, ResourceType } from "../../common";
import { ConflictResponse } from "./ConflictResponse";
import { undefinedPartitionKey } from "../../extractPartitionKey";
/**
 * Use to read or delete a given {@link Conflict} by id.
 *
 * @see {@link Conflicts} to query or read all conflicts.
 */
export class Conflict {
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Conflict}.
     */
    constructor(container, id, clientContext, partitionKey) {
        this.container = container;
        this.id = id;
        this.clientContext = clientContext;
        this.partitionKey = partitionKey;
        this.partitionKey = partitionKey;
    }
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return `/${this.container.url}/${Constants.Path.ConflictsPathSegment}/${this.id}`;
    }
    /**
     * Read the {@link ConflictDefinition} for the given {@link Conflict}.
     */
    async read(options) {
        const path = getPathFromLink(this.url, ResourceType.conflicts);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.read({
            path,
            resourceType: ResourceType.user,
            resourceId: id,
            options,
        });
        return new ConflictResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Delete the given {@link ConflictDefinition}.
     */
    async delete(options) {
        if (this.partitionKey === undefined) {
            const { resource: partitionKeyDefinition } = await this.container.readPartitionKeyDefinition();
            this.partitionKey = undefinedPartitionKey(partitionKeyDefinition);
        }
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.delete({
            path,
            resourceType: ResourceType.conflicts,
            resourceId: id,
            options,
            partitionKey: this.partitionKey,
        });
        return new ConflictResponse(response.result, response.headers, response.code, this);
    }
}
//# sourceMappingURL=Conflict.js.map