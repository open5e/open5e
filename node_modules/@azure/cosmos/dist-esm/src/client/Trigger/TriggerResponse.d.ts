import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { Trigger } from "./index";
import { TriggerDefinition } from "./TriggerDefinition";
export declare class TriggerResponse extends ResourceResponse<TriggerDefinition & Resource> {
    constructor(resource: TriggerDefinition & Resource, headers: CosmosHeaders, statusCode: number, trigger: Trigger);
    /** A reference to the {@link Trigger} corresponding to the returned {@link TriggerDefinition}. */
    readonly trigger: Trigger;
}
//# sourceMappingURL=TriggerResponse.d.ts.map