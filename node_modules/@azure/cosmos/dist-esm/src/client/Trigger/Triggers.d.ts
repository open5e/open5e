import { ClientContext } from "../../ClientContext";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { TriggerDefinition } from "./TriggerDefinition";
import { TriggerResponse } from "./TriggerResponse";
/**
 * Operations to create, upsert, query, and read all triggers.
 *
 * Use `container.triggers` to read, replace, or delete a {@link Trigger}.
 */
export declare class Triggers {
    readonly container: Container;
    private readonly clientContext;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     */
    constructor(container: Container, clientContext: ClientContext);
    /**
     * Query all Triggers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all Triggers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Read all Triggers.
     * @example Read all trigger to array.
     * ```typescript
     * const {body: triggerList} = await container.triggers.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<TriggerDefinition & Resource>;
    /**
     * Create a trigger.
     *
     * Azure Cosmos DB supports pre and post triggers defined in JavaScript to be executed
     * on creates, updates and deletes.
     *
     * For additional details, refer to the server-side JavaScript API documentation.
     */
    create(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse>;
}
//# sourceMappingURL=Triggers.d.ts.map