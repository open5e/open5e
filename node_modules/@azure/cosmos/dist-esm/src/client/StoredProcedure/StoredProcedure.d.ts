import { ClientContext } from "../../ClientContext";
import { PartitionKey } from "../../documents/PartitionKey";
import { RequestOptions, ResourceResponse } from "../../request";
import { Container } from "../Container";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
import { StoredProcedureResponse } from "./StoredProcedureResponse";
/**
 * Operations for reading, replacing, deleting, or executing a specific, existing stored procedure by id.
 *
 * For operations to create, read all, or query Stored Procedures,
 */
export declare class StoredProcedure {
    readonly container: Container;
    readonly id: string;
    private readonly clientContext;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * Creates a new instance of {@link StoredProcedure} linked to the parent {@link Container}.
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link StoredProcedure}.
     * @hidden
     */
    constructor(container: Container, id: string, clientContext: ClientContext);
    /**
     * Read the {@link StoredProcedureDefinition} for the given {@link StoredProcedure}.
     */
    read(options?: RequestOptions): Promise<StoredProcedureResponse>;
    /**
     * Replace the given {@link StoredProcedure} with the specified {@link StoredProcedureDefinition}.
     * @param body - The specified {@link StoredProcedureDefinition} to replace the existing definition.
     */
    replace(body: StoredProcedureDefinition, options?: RequestOptions): Promise<StoredProcedureResponse>;
    /**
     * Delete the given {@link StoredProcedure}.
     */
    delete(options?: RequestOptions): Promise<StoredProcedureResponse>;
    /**
     * Execute the given {@link StoredProcedure}.
     *
     * The specified type, T, is not enforced by the client.
     * Be sure to validate the response from the stored procedure matches the type, T, you provide.
     *
     * @param partitionKey - The partition key to use when executing the stored procedure
     * @param params - Array of parameters to pass as arguments to the given {@link StoredProcedure}.
     * @param options - Additional options, such as the partition key to invoke the {@link StoredProcedure} on.
     */
    execute<T = any>(partitionKey: PartitionKey, params?: any[], options?: RequestOptions): Promise<ResourceResponse<T>>;
}
//# sourceMappingURL=StoredProcedure.d.ts.map