import { CosmosHeaders } from "../queryExecutionContext";
export declare class FeedResponse<TResource> {
    readonly resources: TResource[];
    private readonly headers;
    readonly hasMoreResults: boolean;
    constructor(resources: TResource[], headers: CosmosHeaders, hasMoreResults: boolean);
    get continuation(): string;
    get continuationToken(): string;
    get queryMetrics(): string;
    get requestCharge(): number;
    get activityId(): string;
}
//# sourceMappingURL=FeedResponse.d.ts.map