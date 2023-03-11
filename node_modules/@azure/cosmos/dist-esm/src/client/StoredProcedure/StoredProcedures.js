import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType } from "../../common";
import { QueryIterator } from "../../queryIterator";
import { StoredProcedure } from "./StoredProcedure";
import { StoredProcedureResponse } from "./StoredProcedureResponse";
/**
 * Operations for creating, upserting, or reading/querying all Stored Procedures.
 *
 * For operations to read, replace, delete, or execute a specific, existing stored procedure by id, see `container.storedProcedure()`.
 */
export class StoredProcedures {
    /**
     * @param container - The parent {@link Container}.
     * @hidden
     */
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = getPathFromLink(this.container.url, ResourceType.sproc);
        const id = getIdFromLink(this.container.url);
        return new QueryIterator(this.clientContext, query, options, (innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: ResourceType.sproc,
                resourceId: id,
                resultFn: (result) => result.StoredProcedures,
                query,
                options: innerOptions,
            });
        });
    }
    /**
     * Read all stored procedures.
     * @example Read all stored procedures to array.
     * ```typescript
     * const {body: sprocList} = await containers.storedProcedures.readAll().fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
    /**
     * Create a StoredProcedure.
     *
     * Azure Cosmos DB allows stored procedures to be executed in the storage tier,
     * directly against an item container. The script
     * gets executed under ACID transactions on the primary storage partition of the
     * specified container. For additional details,
     * refer to the server-side JavaScript API documentation.
     */
    async create(body, options) {
        if (body.body) {
            body.body = body.body.toString();
        }
        const err = {};
        if (!isResourceValid(body, err)) {
            throw err;
        }
        const path = getPathFromLink(this.container.url, ResourceType.sproc);
        const id = getIdFromLink(this.container.url);
        const response = await this.clientContext.create({
            body,
            path,
            resourceType: ResourceType.sproc,
            resourceId: id,
            options,
        });
        const ref = new StoredProcedure(this.container, response.result.id, this.clientContext);
        return new StoredProcedureResponse(response.result, response.headers, response.code, ref);
    }
}
//# sourceMappingURL=StoredProcedures.js.map