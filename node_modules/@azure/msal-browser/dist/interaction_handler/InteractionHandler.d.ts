import { AuthorizationCodePayload, CommonAuthorizationCodeRequest, AuthenticationResult, AuthorizationCodeClient, Authority, INetworkModule, CcsCredential, Logger, IPerformanceClient } from "@azure/msal-common";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
export declare type InteractionParams = {};
/**
 * Abstract class which defines operations for a browser interaction handling class.
 */
export declare class InteractionHandler {
    protected authModule: AuthorizationCodeClient;
    protected browserStorage: BrowserCacheManager;
    protected authCodeRequest: CommonAuthorizationCodeRequest;
    protected logger: Logger;
    protected performanceClient: IPerformanceClient;
    constructor(authCodeModule: AuthorizationCodeClient, storageImpl: BrowserCacheManager, authCodeRequest: CommonAuthorizationCodeRequest, logger: Logger, performanceClient: IPerformanceClient);
    /**
     * Function to handle response parameters from hash.
     * @param locationHash
     */
    handleCodeResponseFromHash(locationHash: string, state: string, authority: Authority, networkModule: INetworkModule): Promise<AuthenticationResult>;
    /**
     * Process auth code response from AAD
     * @param authCodeResponse
     * @param state
     * @param authority
     * @param networkModule
     * @returns
     */
    handleCodeResponseFromServer(authCodeResponse: AuthorizationCodePayload, state: string, authority: Authority, networkModule: INetworkModule, validateNonce?: boolean): Promise<AuthenticationResult>;
    /**
     * Updates authority based on cloudInstanceHostname
     * @param cloudInstanceHostname
     * @param authority
     * @param networkModule
     */
    protected updateTokenEndpointAuthority(cloudInstanceHostname: string, authority: Authority, networkModule: INetworkModule): Promise<void>;
    /**
     * Looks up ccs creds in the cache
     */
    protected checkCcsCredentials(): CcsCredential | null;
}
//# sourceMappingURL=InteractionHandler.d.ts.map