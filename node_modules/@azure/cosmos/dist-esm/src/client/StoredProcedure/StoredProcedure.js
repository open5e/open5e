import { createStoredProcedureUri, getIdFromLink, getPathFromLink, isResourceValid, ResourceType, } from "../../common";
import { undefinedPartitionKey } from "../../extractPartitionKey";
import { ResourceResponse } from "../../request";
import { StoredProcedureResponse } from "./StoredProcedureResponse";
/**
 * Operations for reading, replacing, deleting, or executing a specific, existing stored procedure by id.
 *
 * For operations to create, read all, or query Stored Procedures,
 */
export class StoredProcedure {
    /**
     * Creates a new instance of {@link StoredProcedure} linked to the parent {@link Container}.
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link StoredProcedure}.
     * @hidden
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
        return createStoredProcedureUri(this.container.database.id, this.container.id, this.id);
    }
    /**
     * Read the {@link StoredProcedureDefinition} for the given {@link StoredProcedure}.
     */
    async read(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.read({
            path,
            resourceType: ResourceType.sproc,
            resourceId: id,
            options,
        });
        return new StoredProcedureResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Replace the given {@link StoredProcedure} with the specified {@link StoredProcedureDefinition}.
     * @param body - The specified {@link StoredProcedureDefinition} to replace the existing definition.
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
            resourceType: ResourceType.sproc,
            resourceId: id,
            options,
        });
        return new StoredProcedureResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Delete the given {@link StoredProcedure}.
     */
    async delete(options) {
        const path = getPathFromLink(this.url);
        const id = getIdFromLink(this.url);
        const response = await this.clientContext.delete({
            path,
            resourceType: ResourceType.sproc,
            resourceId: id,
            options,
        });
        return new StoredProcedureResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Execute the given {@link StoredProcedure}.
     *
     * The specified type, T, is not enforced by the client.
     * Be sure to validate the response from the stored procedure matches the type, T, you provide.
     *
     * @param partitionKey - The partition key to use when executing the stored procedure
     * @param params - Array of parameters to pass as arguments to the given {@link StoredProcedure}.
     * @param options - Additional options, such as the partition key to invoke the {@link StoredProcedure} on.
     */
    async execute(partitionKey, params, options) {
        if (partitionKey === undefined) {
            const { resource: partitionKeyDefinition } = await this.container.readPartitionKeyDefinition();
            partitionKey = undefinedPartitionKey(partitionKeyDefinition);
        }
        const response = await this.clientContext.execute({
            sprocLink: this.url,
            params,
            options,
            partitionKey,
        });
        return new ResourceResponse(response.result, response.headers, response.code);
    }
}
//# sourceMappingURL=StoredProcedure.js.map