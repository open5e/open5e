import { AuthenticationResult, ICrypto, Logger, IPerformanceClient } from "@azure/msal-common";
import { StandardInteractionClient } from "./StandardInteractionClient";
import { BrowserConfiguration } from "../config/Configuration";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { EventHandler } from "../event/EventHandler";
import { INavigationClient } from "../navigation/INavigationClient";
import { ApiId } from "../utils/BrowserConstants";
import { AuthorizationCodeRequest } from "../request/AuthorizationCodeRequest";
import { NativeMessageHandler } from "../broker/nativeBroker/NativeMessageHandler";
export declare class SilentAuthCodeClient extends StandardInteractionClient {
    private apiId;
    constructor(config: BrowserConfiguration, storageImpl: BrowserCacheManager, browserCrypto: ICrypto, logger: Logger, eventHandler: EventHandler, navigationClient: INavigationClient, apiId: ApiId, performanceClient: IPerformanceClient, nativeMessageHandler?: NativeMessageHandler, correlationId?: string);
    /**
     * Acquires a token silently by redeeming an authorization code against the /token endpoint
     * @param request
     */
    acquireToken(request: AuthorizationCodeRequest): Promise<AuthenticationResult>;
    /**
     * Currently Unsupported
     */
    logout(): Promise<void>;
}
//# sourceMappingURL=SilentAuthCodeClient.d.ts.map