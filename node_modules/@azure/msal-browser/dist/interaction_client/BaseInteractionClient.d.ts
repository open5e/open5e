import { ICrypto, INetworkModule, Logger, AuthenticationResult, AccountInfo, BaseAuthRequest, ServerTelemetryManager, Authority, IPerformanceClient } from "@azure/msal-common";
import { BrowserConfiguration } from "../config/Configuration";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { EventHandler } from "../event/EventHandler";
import { EndSessionRequest } from "../request/EndSessionRequest";
import { RedirectRequest } from "../request/RedirectRequest";
import { PopupRequest } from "../request/PopupRequest";
import { SsoSilentRequest } from "../request/SsoSilentRequest";
import { INavigationClient } from "../navigation/INavigationClient";
import { NativeMessageHandler } from "../broker/nativeBroker/NativeMessageHandler";
export declare abstract class BaseInteractionClient {
    protected config: BrowserConfiguration;
    protected browserStorage: BrowserCacheManager;
    protected browserCrypto: ICrypto;
    protected networkClient: INetworkModule;
    protected logger: Logger;
    protected eventHandler: EventHandler;
    protected navigationClient: INavigationClient;
    protected nativeMessageHandler: NativeMessageHandler | undefined;
    protected correlationId: string;
    protected performanceClient: IPerformanceClient;
    constructor(config: BrowserConfiguration, storageImpl: BrowserCacheManager, browserCrypto: ICrypto, logger: Logger, eventHandler: EventHandler, navigationClient: INavigationClient, performanceClient: IPerformanceClient, nativeMessageHandler?: NativeMessageHandler, correlationId?: string);
    abstract acquireToken(request: RedirectRequest | PopupRequest | SsoSilentRequest): Promise<AuthenticationResult | void>;
    abstract logout(request: EndSessionRequest): Promise<void>;
    protected clearCacheOnLogout(account?: AccountInfo | null): Promise<void>;
    /**
     * Initializer function for all request APIs
     * @param request
     */
    protected initializeBaseRequest(request: Partial<BaseAuthRequest>): Promise<BaseAuthRequest>;
    /**
     *
     * Use to get the redirect uri configured in MSAL or null.
     * @param requestRedirectUri
     * @returns Redirect URL
     *
     */
    getRedirectUri(requestRedirectUri?: string): string;
    /**
     *
     * @param apiId
     * @param correlationId
     * @param forceRefresh
     */
    protected initializeServerTelemetryManager(apiId: number, forceRefresh?: boolean): ServerTelemetryManager;
    /**
     * Used to get a discovered version of the default authority.
     * @param requestAuthority
     * @param requestCorrelationId
     */
    protected getDiscoveredAuthority(requestAuthority?: string): Promise<Authority>;
}
//# sourceMappingURL=BaseInteractionClient.d.ts.map