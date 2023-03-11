import { AuthenticationResult, Logger, ICrypto, AuthToken, AccountEntity, ScopeSet, IPerformanceClient } from "@azure/msal-common";
import { BaseInteractionClient } from "./BaseInteractionClient";
import { BrowserConfiguration } from "../config/Configuration";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { EventHandler } from "../event/EventHandler";
import { PopupRequest } from "../request/PopupRequest";
import { SilentRequest } from "../request/SilentRequest";
import { SsoSilentRequest } from "../request/SsoSilentRequest";
import { NativeMessageHandler } from "../broker/nativeBroker/NativeMessageHandler";
import { ApiId } from "../utils/BrowserConstants";
import { NativeTokenRequest } from "../broker/nativeBroker/NativeRequest";
import { MATS, NativeResponse } from "../broker/nativeBroker/NativeResponse";
import { RedirectRequest } from "../request/RedirectRequest";
import { INavigationClient } from "../navigation/INavigationClient";
import { SilentCacheClient } from "./SilentCacheClient";
export declare class NativeInteractionClient extends BaseInteractionClient {
    protected apiId: ApiId;
    protected accountId: string;
    protected nativeMessageHandler: NativeMessageHandler;
    protected silentCacheClient: SilentCacheClient;
    protected nativeStorageManager: BrowserCacheManager;
    constructor(config: BrowserConfiguration, browserStorage: BrowserCacheManager, browserCrypto: ICrypto, logger: Logger, eventHandler: EventHandler, navigationClient: INavigationClient, apiId: ApiId, performanceClient: IPerformanceClient, provider: NativeMessageHandler, accountId: string, nativeStorageImpl: BrowserCacheManager, correlationId?: string);
    /**
     * Acquire token from native platform via browser extension
     * @param request
     */
    acquireToken(request: PopupRequest | SilentRequest | SsoSilentRequest): Promise<AuthenticationResult>;
    /**
     * Creates silent flow request
     * @param request
     * @param cachedAccount
     * @returns CommonSilentFlowRequest
     */
    private createSilentCacheRequest;
    /**
     * Fetches the tokens from the cache if un-expired
     * @param nativeAccountId
     * @param request
     * @returns authenticationResult
     */
    protected acquireTokensFromCache(nativeAccountId: string, request: NativeTokenRequest): Promise<AuthenticationResult>;
    /**
     * Acquires a token from native platform then redirects to the redirectUri instead of returning the response
     * @param request
     */
    acquireTokenRedirect(request: RedirectRequest): Promise<void>;
    /**
     * If the previous page called native platform for a token using redirect APIs, send the same request again and return the response
     */
    handleRedirectPromise(): Promise<AuthenticationResult | null>;
    /**
     * Logout from native platform via browser extension
     * @param request
     */
    logout(): Promise<void>;
    /**
     * Transform response from native platform into AuthenticationResult object which will be returned to the end user
     * @param response
     * @param request
     * @param reqTimestamp
     */
    protected handleNativeResponse(response: NativeResponse, request: NativeTokenRequest, reqTimestamp: number): Promise<AuthenticationResult>;
    /**
     * Create an idToken Object (not entity)
     * @param response
     * @returns
     */
    protected createIdTokenObj(response: NativeResponse): AuthToken;
    /**
     * creates an homeAccountIdentifier for the account
     * @param response
     * @param idTokenObj
     * @returns
     */
    protected createHomeAccountIdentifier(response: NativeResponse, idTokenObj: AuthToken): string;
    /**
     * Creates account entity
     * @param response
     * @param homeAccountIdentifier
     * @param idTokenObj
     * @param authority
     * @returns
     */
    protected createAccountEntity(response: NativeResponse, homeAccountIdentifier: string, idTokenObj: AuthToken, authority: string): AccountEntity;
    /**
     * Helper to generate scopes
     * @param response
     * @param request
     * @returns
     */
    generateScopes(response: NativeResponse, request: NativeTokenRequest): ScopeSet;
    /**
     * If PoP token is requesred, records the PoP token if returned from the WAM, else generates one in the browser
     * @param request
     * @param response
     */
    generatePopAccessToken(response: NativeResponse, request: NativeTokenRequest): Promise<string>;
    /**
     * Generates authentication result
     * @param response
     * @param request
     * @param idTokenObj
     * @param accountEntity
     * @param authority
     * @param reqTimestamp
     * @returns
     */
    protected generateAuthenticationResult(response: NativeResponse, request: NativeTokenRequest, idTokenObj: AuthToken, accountEntity: AccountEntity, authority: string, reqTimestamp: number): Promise<AuthenticationResult>;
    /**
     * cache the account entity in browser storage
     * @param accountEntity
     */
    cacheAccount(accountEntity: AccountEntity): void;
    /**
     * Stores the access_token and id_token in inmemory storage
     * @param response
     * @param request
     * @param homeAccountIdentifier
     * @param idTokenObj
     * @param responseAccessToken
     * @param tenantId
     * @param reqTimestamp
     */
    cacheNativeTokens(response: NativeResponse, request: NativeTokenRequest, homeAccountIdentifier: string, idTokenObj: AuthToken, responseAccessToken: string, tenantId: string, reqTimestamp: number): void;
    protected addTelemetryFromNativeResponse(response: NativeResponse): MATS | null;
    /**
     * Validates native platform response before processing
     * @param response
     */
    private validateNativeResponse;
    /**
     * Gets MATS telemetry from native response
     * @param response
     * @returns
     */
    private getMATSFromResponse;
    /**
     * Returns whether or not response came from native cache
     * @param response
     * @returns
     */
    protected isResponseFromCache(mats: MATS): boolean;
    /**
     * Translates developer provided request object into NativeRequest object
     * @param request
     */
    protected initializeNativeRequest(request: PopupRequest | SsoSilentRequest): Promise<NativeTokenRequest>;
}
//# sourceMappingURL=NativeInteractionClient.d.ts.map