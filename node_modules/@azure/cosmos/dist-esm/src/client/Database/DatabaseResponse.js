import { ResourceResponse } from "../../request/ResourceResponse";
/** Response object for Database operations */
export class DatabaseResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, database) {
        super(resource, headers, statusCode);
        this.database = database;
    }
}
//# sourceMappingURL=DatabaseResponse.js.map