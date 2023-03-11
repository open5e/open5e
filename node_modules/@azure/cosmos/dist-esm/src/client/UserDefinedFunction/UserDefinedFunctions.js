import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType } from "../../common";
import { QueryIterator } from "../../queryIterator";
import { UserDefinedFunction } from "./UserDefinedFunction";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse";
/**
 * Used to create, upsert, query, or read all User Defined Functions.
 *
 * @see {@link UserDefinedFunction} to read, replace, or delete a given User Defined Function by id.
 */
export class UserDefinedFunctions {
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     */
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = getPathFromLink(this.container.url, ResourceType.udf);
        const id = getIdFromLink(this.container.url);
        return new QueryIterator(this.clientContext, query, options, (innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: ResourceType.udf,
                resourceId: id,
                resultFn: (result) => result.UserDefinedFunctions,
                query,
                options: innerOptions,
            });
        });
    }
    /**
     * Read all User Defined Functions.
     * @example Read all User Defined Functions to array.
     * ```typescript
     * const {body: udfList} = await container.userDefinedFunctions.readAll().fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
    /**
     * Create a UserDefinedFunction.
     *
     * Azure Cosmos DB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers.
     *
     * For additional details, refer to the server-side JavaScript API documentation.
     *
     */
    async create(body, options) {
        if (body.body) {
            body.body = body.body.toString();
        }
        const err = {};
        if (!isResourceValid(body, err)) {
            throw err;
        }
        const path = getPathFromLink(this.container.url, ResourceType.udf);
        const id = getIdFromLink(this.container.url);
        const response = await this.clientContext.create({
            body,
            path,
            resourceType: ResourceType.udf,
            resourceId: id,
            options,
        });
        const ref = new UserDefinedFunction(this.container, response.result.id, this.clientContext);
        return new UserDefinedFunctionResponse(response.result, response.headers, response.code, ref);
    }
}
//# sourceMappingURL=UserDefinedFunctions.js.map