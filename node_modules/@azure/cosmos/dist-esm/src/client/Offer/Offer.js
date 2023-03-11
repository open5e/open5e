import { Constants, isResourceValid, ResourceType } from "../../common";
import { OfferResponse } from "./OfferResponse";
/**
 * Use to read or replace an existing {@link Offer} by id.
 *
 * @see {@link Offers} to query or read all offers.
 */
export class Offer {
    /**
     * @hidden
     * @param client - The parent {@link CosmosClient} for the Database Account.
     * @param id - The id of the given {@link Offer}.
     */
    constructor(client, id, clientContext) {
        this.client = client;
        this.id = id;
        this.clientContext = clientContext;
    }
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return `/${Constants.Path.OffersPathSegment}/${this.id}`;
    }
    /**
     * Read the {@link OfferDefinition} for the given {@link Offer}.
     */
    async read(options) {
        const response = await this.clientContext.read({
            path: this.url,
            resourceType: ResourceType.offer,
            resourceId: this.id,
            options,
        });
        return new OfferResponse(response.result, response.headers, response.code, this);
    }
    /**
     * Replace the given {@link Offer} with the specified {@link OfferDefinition}.
     * @param body - The specified {@link OfferDefinition}
     */
    async replace(body, options) {
        const err = {};
        if (!isResourceValid(body, err)) {
            throw err;
        }
        const response = await this.clientContext.replace({
            body,
            path: this.url,
            resourceType: ResourceType.offer,
            resourceId: this.id,
            options,
        });
        return new OfferResponse(response.result, response.headers, response.code, this);
    }
}
//# sourceMappingURL=Offer.js.map