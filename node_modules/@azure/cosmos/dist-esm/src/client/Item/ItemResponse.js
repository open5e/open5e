import { ResourceResponse } from "../../request/ResourceResponse";
export class ItemResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, subsstatusCode, item) {
        super(resource, headers, statusCode, subsstatusCode);
        this.item = item;
    }
}
//# sourceMappingURL=ItemResponse.js.map