import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { User } from "./User";
import { UserDefinition } from "./UserDefinition";
export declare class UserResponse extends ResourceResponse<UserDefinition & Resource> {
    constructor(resource: UserDefinition & Resource, headers: CosmosHeaders, statusCode: number, user: User);
    /** A reference to the {@link User} corresponding to the returned {@link UserDefinition}. */
    readonly user: User;
}
//# sourceMappingURL=UserResponse.d.ts.map