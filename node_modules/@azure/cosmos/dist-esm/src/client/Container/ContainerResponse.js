import { ResourceResponse } from "../../request/ResourceResponse";
/** Response object for Container operations */
export class ContainerResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, container) {
        super(resource, headers, statusCode);
        this.container = container;
    }
}
//# sourceMappingURL=ContainerResponse.js.map