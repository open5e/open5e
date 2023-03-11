import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request/ResourceResponse";
import { Resource } from "../Resource";
import { Item } from "./Item";
import { ItemDefinition } from "./ItemDefinition";
export declare class ItemResponse<T extends ItemDefinition> extends ResourceResponse<T & Resource> {
    constructor(resource: T & Resource, headers: CosmosHeaders, statusCode: number, subsstatusCode: number, item: Item);
    /** Reference to the {@link Item} the response corresponds to. */
    readonly item: Item;
}
//# sourceMappingURL=ItemResponse.d.ts.map