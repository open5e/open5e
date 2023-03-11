import { ResourceResponse } from "../../request";
export class UserDefinedFunctionResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, udf) {
        super(resource, headers, statusCode);
        this.userDefinedFunction = udf;
    }
    /**
     * Alias for `userDefinedFunction(id)`.
     *
     * A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}.
     */
    get udf() {
        return this.userDefinedFunction;
    }
}
//# sourceMappingURL=UserDefinedFunctionResponse.js.map