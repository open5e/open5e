import { NativeExtensionMethod } from "../../utils/BrowserConstants";
import { StringDict } from "@azure/msal-common";
/**
 * Token request which native broker will use to acquire tokens
 */
export declare type NativeTokenRequest = {
    accountId: string;
    clientId: string;
    authority: string;
    redirectUri: string;
    scope: string;
    correlationId: string;
    windowTitleSubstring: string;
    prompt?: string;
    nonce?: string;
    claims?: string;
    state?: string;
    reqCnf?: string;
    keyId?: string;
    tokenType?: string;
    shrClaims?: string;
    shrNonce?: string;
    resourceRequestMethod?: string;
    resourceRequestUri?: string;
    extendedExpiryToken?: boolean;
    extraParameters?: StringDict;
};
/**
 * Request which will be forwarded to native broker by the browser extension
 */
export declare type NativeExtensionRequestBody = {
    method: NativeExtensionMethod;
    request?: NativeTokenRequest;
};
/**
 * Browser extension request
 */
export declare type NativeExtensionRequest = {
    channel: string;
    responseId: number;
    extensionId?: string;
    body: NativeExtensionRequestBody;
};
//# sourceMappingURL=NativeRequest.d.ts.map