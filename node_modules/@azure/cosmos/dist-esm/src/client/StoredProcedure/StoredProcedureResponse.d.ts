import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { StoredProcedure } from "./StoredProcedure";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
export declare class StoredProcedureResponse extends ResourceResponse<StoredProcedureDefinition & Resource> {
    constructor(resource: StoredProcedureDefinition & Resource, headers: CosmosHeaders, statusCode: number, storedProcedure: StoredProcedure);
    /**
     * A reference to the {@link StoredProcedure} which the {@link StoredProcedureDefinition} corresponds to.
     */
    readonly storedProcedure: StoredProcedure;
    /**
     * Alias for storedProcedure.
     *
     * A reference to the {@link StoredProcedure} which the {@link StoredProcedureDefinition} corresponds to.
     */
    get sproc(): StoredProcedure;
}
//# sourceMappingURL=StoredProcedureResponse.d.ts.map