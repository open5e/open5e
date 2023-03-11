import { CommonAuthorizationCodeRequest, AuthorizationCodeClient, Logger, IPerformanceClient } from "@azure/msal-common";
import { InteractionHandler } from "./InteractionHandler";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { BrowserSystemOptions } from "../config/Configuration";
export declare class SilentHandler extends InteractionHandler {
    private navigateFrameWait;
    private pollIntervalMilliseconds;
    constructor(authCodeModule: AuthorizationCodeClient, storageImpl: BrowserCacheManager, authCodeRequest: CommonAuthorizationCodeRequest, logger: Logger, systemOptions: Required<Pick<BrowserSystemOptions, "navigateFrameWait" | "pollIntervalMilliseconds">>, performanceClient: IPerformanceClient);
    /**
     * Creates a hidden iframe to given URL using user-requested scopes as an id.
     * @param urlNavigate
     * @param userRequestScopes
     */
    initiateAuthRequest(requestUrl: string): Promise<HTMLIFrameElement>;
    /**
     * Monitors an iframe content window until it loads a url with a known hash, or hits a specified timeout.
     * @param iframe
     * @param timeout
     */
    monitorIframeForHash(iframe: HTMLIFrameElement, timeout: number): Promise<string>;
    /**
     * @hidden
     * Loads iframe with authorization endpoint URL
     * @ignore
     */
    private loadFrame;
    /**
     * @hidden
     * Loads the iframe synchronously when the navigateTimeFrame is set to `0`
     * @param urlNavigate
     * @param frameName
     * @param logger
     */
    private loadFrameSync;
    /**
     * @hidden
     * Creates a new hidden iframe or gets an existing one for silent token renewal.
     * @ignore
     */
    private createHiddenIframe;
    /**
     * @hidden
     * Removes a hidden iframe from the page.
     * @ignore
     */
    private removeHiddenIframe;
}
//# sourceMappingURL=SilentHandler.d.ts.map