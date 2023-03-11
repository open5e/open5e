import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { Permission } from "./Permission";
import { PermissionBody } from "./PermissionBody";
import { PermissionDefinition } from "./PermissionDefinition";
export declare class PermissionResponse extends ResourceResponse<PermissionDefinition & PermissionBody & Resource> {
    constructor(resource: PermissionDefinition & PermissionBody & Resource, headers: CosmosHeaders, statusCode: number, permission: Permission);
    /** A reference to the {@link Permission} corresponding to the returned {@link PermissionDefinition}. */
    readonly permission: Permission;
}
//# sourceMappingURL=PermissionResponse.d.ts.map