import { ClientContext } from "../../ClientContext";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request";
import { OfferDefinition } from "./OfferDefinition";
import { OfferResponse } from "./OfferResponse";
/**
 * Use to read or replace an existing {@link Offer} by id.
 *
 * @see {@link Offers} to query or read all offers.
 */
export declare class Offer {
    readonly client: CosmosClient;
    readonly id: string;
    private readonly clientContext;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param client - The parent {@link CosmosClient} for the Database Account.
     * @param id - The id of the given {@link Offer}.
     */
    constructor(client: CosmosClient, id: string, clientContext: ClientContext);
    /**
     * Read the {@link OfferDefinition} for the given {@link Offer}.
     */
    read(options?: RequestOptions): Promise<OfferResponse>;
    /**
     * Replace the given {@link Offer} with the specified {@link OfferDefinition}.
     * @param body - The specified {@link OfferDefinition}
     */
    replace(body: OfferDefinition, options?: RequestOptions): Promise<OfferResponse>;
}
//# sourceMappingURL=Offer.d.ts.map