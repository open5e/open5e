import { ClientContext } from "../../ClientContext";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { ConflictResponse } from "./ConflictResponse";
import { PartitionKey } from "../../documents";
/**
 * Use to read or delete a given {@link Conflict} by id.
 *
 * @see {@link Conflicts} to query or read all conflicts.
 */
export declare class Conflict {
    readonly container: Container;
    readonly id: string;
    private readonly clientContext;
    private partitionKey?;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Conflict}.
     */
    constructor(container: Container, id: string, clientContext: ClientContext, partitionKey?: PartitionKey);
    /**
     * Read the {@link ConflictDefinition} for the given {@link Conflict}.
     */
    read(options?: RequestOptions): Promise<ConflictResponse>;
    /**
     * Delete the given {@link ConflictDefinition}.
     */
    delete(options?: RequestOptions): Promise<ConflictResponse>;
}
//# sourceMappingURL=Conflict.d.ts.map