import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { Offer } from "./Offer";
import { OfferDefinition } from "./OfferDefinition";
export declare class OfferResponse extends ResourceResponse<OfferDefinition & Resource> {
    constructor(resource: OfferDefinition & Resource, headers: CosmosHeaders, statusCode: number, offer?: Offer);
    /** A reference to the {@link Offer} corresponding to the returned {@link OfferDefinition}. */
    readonly offer: Offer;
}
//# sourceMappingURL=OfferResponse.d.ts.map