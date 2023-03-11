import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { UserDefinedFunction } from "./UserDefinedFunction";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";
export declare class UserDefinedFunctionResponse extends ResourceResponse<UserDefinedFunctionDefinition & Resource> {
    constructor(resource: UserDefinedFunctionDefinition & Resource, headers: CosmosHeaders, statusCode: number, udf: UserDefinedFunction);
    /** A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}. */
    readonly userDefinedFunction: UserDefinedFunction;
    /**
     * Alias for `userDefinedFunction(id)`.
     *
     * A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}.
     */
    get udf(): UserDefinedFunction;
}
//# sourceMappingURL=UserDefinedFunctionResponse.d.ts.map