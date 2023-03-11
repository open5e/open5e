import { ClientContext } from "../../ClientContext";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { TriggerDefinition } from "./TriggerDefinition";
import { TriggerResponse } from "./TriggerResponse";
/**
 * Operations to read, replace, or delete a {@link Trigger}.
 *
 * Use `container.triggers` to create, upsert, query, or read all.
 */
export declare class Trigger {
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
     * @param id - The id of the given {@link Trigger}.
     */
    constructor(container: Container, id: string, clientContext: ClientContext);
    /**
     * Read the {@link TriggerDefinition} for the given {@link Trigger}.
     */
    read(options?: RequestOptions): Promise<TriggerResponse>;
    /**
     * Replace the given {@link Trigger} with the specified {@link TriggerDefinition}.
     * @param body - The specified {@link TriggerDefinition} to replace the existing definition with.
     */
    replace(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse>;
    /**
     * Delete the given {@link Trigger}.
     */
    delete(options?: RequestOptions): Promise<TriggerResponse>;
}
//# sourceMappingURL=Trigger.d.ts.map