import { HTTPMethod, ResourceType } from "./common";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { CosmosHeaders } from "./queryExecutionContext";
/** @hidden */
export interface RequestInfo {
    verb: HTTPMethod;
    path: string;
    resourceId: string;
    resourceType: ResourceType;
    headers: CosmosHeaders;
}
export declare type TokenProvider = (requestInfo: RequestInfo) => Promise<string>;
/**
 * @hidden
 */
export declare function setAuthorizationHeader(clientOptions: CosmosClientOptions, verb: HTTPMethod, path: string, resourceId: string, resourceType: ResourceType, headers: CosmosHeaders): Promise<void>;
/**
 * The default function for setting header token using the masterKey
 * @hidden
 */
export declare function setAuthorizationTokenHeaderUsingMasterKey(verb: HTTPMethod, resourceId: string, resourceType: ResourceType, headers: CosmosHeaders, masterKey: string): Promise<void>;
/**
 * @hidden
 */
export declare function getAuthorizationTokenUsingResourceTokens(resourceTokens: {
    [resourceId: string]: string;
}, path: string, resourceId: string): string;
//# sourceMappingURL=auth.d.ts.map