import { ResourceResponse } from "../../request";
export class StoredProcedureResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, storedProcedure) {
        super(resource, headers, statusCode);
        this.storedProcedure = storedProcedure;
    }
    /**
     * Alias for storedProcedure.
     *
     * A reference to the {@link StoredProcedure} which the {@link StoredProcedureDefinition} corresponds to.
     */
    get sproc() {
        return this.storedProcedure;
    }
}
//# sourceMappingURL=StoredProcedureResponse.js.map