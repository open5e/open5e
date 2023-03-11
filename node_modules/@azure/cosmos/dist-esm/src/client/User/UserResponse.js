import { ResourceResponse } from "../../request";
export class UserResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, user) {
        super(resource, headers, statusCode);
        this.user = user;
    }
}
//# sourceMappingURL=UserResponse.js.map