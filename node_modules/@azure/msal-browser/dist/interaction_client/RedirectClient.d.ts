import { AuthenticationResult, ServerTelemetryManager, ICrypto, Logger, IPerformanceClient } from "@azure/msal-common";
import { StandardInteractionClient } from "./StandardInteractionClient";
import { EndSessionRequest } from "../request/EndSessionRequest";
import { RedirectRequest } from "../request/RedirectRequest";
import { NativeMessageHandler } from "../broker/nativeBroker/NativeMessageHandler";
import { BrowserConfiguration } from "../config/Configuration";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { EventHandler } from "../event/EventHandler";
import { INavigationClient } from "../navigation/INavigationClient";
export declare class RedirectClient extends StandardInteractionClient {
    protected nativeStorage: BrowserCacheManager;
    constructor(config: BrowserConfiguration, storageImpl: BrowserCacheManager, browserCrypto: ICrypto, logger: Logger, eventHandler: EventHandler, navigationClient: INavigationClient, performanceClient: IPerformanceClient, nativeStorageImpl: BrowserCacheManager, nativeMessageHandler?: NativeMessageHandler, correlationId?: string);
    /**
     * Redirects the page to the /authorize endpoint of the IDP
     * @param request
     */
    acquireToken(request: RedirectRequest): Promise<void>;
    /**
     * Checks if navigateToLoginRequestUrl is set, and:
     * - if true, performs logic to cache and navigate
     * - if false, handles hash string and parses response
     * @param hash
     */
    handleRedirectPromise(hash?: string): Promise<AuthenticationResult | null>;
    /**
     * Gets the response hash for a redirect request
     * Returns null if interactionType in the state value is not "redirect" or the hash does not contain known properties
     * @param hash
     */
    protected getRedirectResponseHash(hash: string): string | null;
    /**
     * Checks if hash exists and handles in window.
     * @param hash
     * @param state
     */
    protected handleHash(hash: string, state: string, serverTelemetryManager: ServerTelemetryManager): Promise<AuthenticationResult>;
    /**
     * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param logoutRequest
     */
    logout(logoutRequest?: EndSessionRequest): Promise<void>;
    /**
     * Use to get the redirectStartPage either from request or use current window
     * @param requestStartPage
     */
    protected getRedirectStartPage(requestStartPage?: string): string;
}
//# sourceMappingURL=RedirectClient.d.ts.map