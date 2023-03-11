import { ClientContext } from "../../ClientContext";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse";
/**
 * Used to read, replace, or delete a specified User Definied Function by id.
 *
 * @see {@link UserDefinedFunction} to create, upsert, query, read all User Defined Functions.
 */
export declare class UserDefinedFunction {
    readonly container: Container;
    readonly id: string;
    private readonly clientContext;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link UserDefinedFunction}.
     */
    constructor(container: Container, id: string, clientContext: ClientContext);
    /**
     * Read the {@link UserDefinedFunctionDefinition} for the given {@link UserDefinedFunction}.
     */
    read(options?: RequestOptions): Promise<UserDefinedFunctionResponse>;
    /**
     * Replace the given {@link UserDefinedFunction} with the specified {@link UserDefinedFunctionDefinition}.
     * @param options -
     */
    replace(body: UserDefinedFunctionDefinition, options?: RequestOptions): Promise<UserDefinedFunctionResponse>;
    /**
     * Delete the given {@link UserDefined}.
     */
    delete(options?: RequestOptions): Promise<UserDefinedFunctionResponse>;
}
//# sourceMappingURL=UserDefinedFunction.d.ts.map