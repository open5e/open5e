import { ClientContext } from "../../ClientContext";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions } from "../../request";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { ConflictDefinition } from "./ConflictDefinition";
/**
 * Use to query or read all conflicts.
 *
 * @see {@link Conflict} to read or delete a given {@link Conflict} by id.
 */
export declare class Conflicts {
    readonly container: Container;
    private readonly clientContext;
    constructor(container: Container, clientContext: ClientContext);
    /**
     * Queries all conflicts.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return results in an array or iterate over them one at a time.
     */
    query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Queries all conflicts.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return results in an array or iterate over them one at a time.
     */
    query<T>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Reads all conflicts
     * @param options - Use to set options like response page size, continuation tokens, etc.
     */
    readAll(options?: FeedOptions): QueryIterator<ConflictDefinition & Resource>;
}
//# sourceMappingURL=Conflicts.d.ts.map