import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { StatusCode, SubStatusCode } from "./StatusCodes";
export declare class ResourceResponse<TResource> {
    readonly resource: TResource | undefined;
    readonly headers: CosmosHeaders;
    readonly statusCode: StatusCode;
    readonly substatus?: SubStatusCode;
    constructor(resource: TResource | undefined, headers: CosmosHeaders, statusCode: StatusCode, substatus?: SubStatusCode);
    get requestCharge(): number;
    get activityId(): string;
    get etag(): string;
}
//# sourceMappingURL=ResourceResponse.d.ts.map