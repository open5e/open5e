import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { Conflict } from "./Conflict";
import { ConflictDefinition } from "./ConflictDefinition";
export declare class ConflictResponse extends ResourceResponse<ConflictDefinition & Resource> {
    constructor(resource: ConflictDefinition & Resource, headers: CosmosHeaders, statusCode: number, conflict: Conflict);
    /** A reference to the {@link Conflict} corresponding to the returned {@link ConflictDefinition}. */
    readonly conflict: Conflict;
}
//# sourceMappingURL=ConflictResponse.d.ts.map