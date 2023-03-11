import { ResourceResponse } from "../../request";
export class TriggerResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, trigger) {
        super(resource, headers, statusCode);
        this.trigger = trigger;
    }
}
//# sourceMappingURL=TriggerResponse.js.map