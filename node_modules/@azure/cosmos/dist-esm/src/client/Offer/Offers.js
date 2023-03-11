import { ResourceType } from "../../common";
import { QueryIterator } from "../../queryIterator";
/**
 * Use to query or read all Offers.
 *
 * @see {@link Offer} to read or replace an existing {@link Offer} by id.
 */
export class Offers {
    /**
     * @hidden
     * @param client - The parent {@link CosmosClient} for the offers.
     */
    constructor(client, clientContext) {
        this.client = client;
        this.clientContext = clientContext;
    }
    query(query, options) {
        return new QueryIterator(this.clientContext, query, options, (innerOptions) => {
            return this.clientContext.queryFeed({
                path: "/offers",
                resourceType: ResourceType.offer,
                resourceId: "",
                resultFn: (result) => result.Offers,
                query,
                options: innerOptions,
            });
        });
    }
    /**
     * Read all offers.
     * @example Read all offers to array.
     * ```typescript
     * const {body: offerList} = await client.offers.readAll().fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
}
//# sourceMappingURL=Offers.js.map