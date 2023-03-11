import { ClientContext } from "../../ClientContext";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse";
/**
 * Used to create, upsert, query, or read all User Defined Functions.
 *
 * @see {@link UserDefinedFunction} to read, replace, or delete a given User Defined Function by id.
 */
export declare class UserDefinedFunctions {
    readonly container: Container;
    private readonly clientContext;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     */
    constructor(container: Container, clientContext: ClientContext);
    /**
     * Query all User Defined Functions.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all User Defined Functions.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Read all User Defined Functions.
     * @example Read all User Defined Functions to array.
     * ```typescript
     * const {body: udfList} = await container.userDefinedFunctions.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<UserDefinedFunctionDefinition & Resource>;
    /**
     * Create a UserDefinedFunction.
     *
     * Azure Cosmos DB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers.
     *
     * For additional details, refer to the server-side JavaScript API documentation.
     *
     */
    create(body: UserDefinedFunctionDefinition, options?: RequestOptions): Promise<UserDefinedFunctionResponse>;
}
//# sourceMappingURL=UserDefinedFunctions.d.ts.map