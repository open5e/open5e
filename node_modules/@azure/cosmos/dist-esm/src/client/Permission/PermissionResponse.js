import { ResourceResponse } from "../../request";
export class PermissionResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, permission) {
        super(resource, headers, statusCode);
        this.permission = permission;
    }
}
//# sourceMappingURL=PermissionResponse.js.map