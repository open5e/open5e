/// <reference types="node" />
import { HTTPMethod, ResourceType } from "../common";
import { CosmosClientOptions } from "../CosmosClientOptions";
import { PartitionKey } from "../documents";
import { CosmosHeaders } from "../queryExecutionContext";
import { FeedOptions, RequestOptions } from "./index";
/** @hidden */
export declare function bodyFromData(data: Buffer | string | Record<string, unknown>): string;
/**
 * @hidden
 */
interface GetHeadersOptions {
    clientOptions: CosmosClientOptions;
    defaultHeaders: CosmosHeaders;
    verb: HTTPMethod;
    path: string;
    resourceId: string;
    resourceType: ResourceType;
    options: RequestOptions & FeedOptions;
    partitionKeyRangeId?: string;
    useMultipleWriteLocations?: boolean;
    partitionKey?: PartitionKey;
}
/**
 * @hidden
 */
export declare function getHeaders({ clientOptions, defaultHeaders, verb, path, resourceId, resourceType, options, partitionKeyRangeId, useMultipleWriteLocations, partitionKey, }: GetHeadersOptions): Promise<CosmosHeaders>;
export {};
//# sourceMappingURL=request.d.ts.map