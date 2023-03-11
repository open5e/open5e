import { ClientContext } from "../../ClientContext";
import { PartitionKey } from "../../documents";
import { RequestOptions } from "../../request";
import { PatchRequestBody } from "../../utils/patch";
import { Container } from "../Container";
import { ItemDefinition } from "./ItemDefinition";
import { ItemResponse } from "./ItemResponse";
/**
 * Used to perform operations on a specific item.
 *
 * @see {@link Items} for operations on all items; see `container.items`.
 */
export declare class Item {
    readonly container: Container;
    readonly id: string;
    private readonly clientContext;
    private partitionKey;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Item}.
     * @param partitionKey - The primary key of the given {@link Item} (only for partitioned containers).
     */
    constructor(container: Container, id: string, partitionKey: PartitionKey, clientContext: ClientContext);
    /**
     * Read the item's definition.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     * If the type, T, is a class, it won't pass `typeof` comparisons, because it won't have a match prototype.
     * It's recommended to only use interfaces.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param options - Additional options for the request
     *
     * @example Using custom type for response
     * ```typescript
     * interface TodoItem {
     *   title: string;
     *   done: bool;
     *   id: string;
     * }
     *
     * let item: TodoItem;
     * ({body: item} = await item.read<TodoItem>());
     * ```
     */
    read<T extends ItemDefinition = any>(options?: RequestOptions): Promise<ItemResponse<T>>;
    /**
     * Replace the item's definition.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param body - The definition to replace the existing {@link Item}'s definition with.
     * @param options - Additional options for the request
     */
    replace(body: ItemDefinition, options?: RequestOptions): Promise<ItemResponse<ItemDefinition>>;
    /**
     * Replace the item's definition.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * There is no set schema for JSON items. They may contain any number of custom properties.
     *
     * @param body - The definition to replace the existing {@link Item}'s definition with.
     * @param options - Additional options for the request
     */
    replace<T extends ItemDefinition>(body: T, options?: RequestOptions): Promise<ItemResponse<T>>;
    /**
     * Delete the item.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * @param options - Additional options for the request
     */
    delete<T extends ItemDefinition = any>(options?: RequestOptions): Promise<ItemResponse<T>>;
    /**
     * Perform a JSONPatch on the item.
     *
     * Any provided type, T, is not necessarily enforced by the SDK.
     * You may get more or less properties and it's up to your logic to enforce it.
     *
     * @param options - Additional options for the request
     */
    patch<T extends ItemDefinition = any>(body: PatchRequestBody, options?: RequestOptions): Promise<ItemResponse<T>>;
}
//# sourceMappingURL=Item.d.ts.map