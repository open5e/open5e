import { ResourceResponse } from "../../request";
export class OfferResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, offer) {
        super(resource, headers, statusCode);
        this.offer = offer;
    }
}
//# sourceMappingURL=OfferResponse.js.map