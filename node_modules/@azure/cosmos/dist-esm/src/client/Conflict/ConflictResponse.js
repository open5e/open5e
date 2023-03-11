import { ResourceResponse } from "../../request";
export class ConflictResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, conflict) {
        super(resource, headers, statusCode);
        this.conflict = conflict;
    }
}
//# sourceMappingURL=ConflictResponse.js.map