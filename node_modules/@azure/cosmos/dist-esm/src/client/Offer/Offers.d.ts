import { ClientContext } from "../../ClientContext";
import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions } from "../../request";
import { Resource } from "../Resource";
import { OfferDefinition } from "./OfferDefinition";
/**
 * Use to query or read all Offers.
 *
 * @see {@link Offer} to read or replace an existing {@link Offer} by id.
 */
export declare class Offers {
    readonly client: CosmosClient;
    private readonly clientContext;
    /**
     * @hidden
     * @param client - The parent {@link CosmosClient} for the offers.
     */
    constructor(client: CosmosClient, clientContext: ClientContext);
    /**
     * Query all offers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all offers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Read all offers.
     * @example Read all offers to array.
     * ```typescript
     * const {body: offerList} = await client.offers.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<OfferDefinition & Resource>;
}
//# sourceMappingURL=Offers.d.ts.map