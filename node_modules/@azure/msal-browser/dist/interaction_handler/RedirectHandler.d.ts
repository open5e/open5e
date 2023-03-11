import { AuthorizationCodeClient, CommonAuthorizationCodeRequest, ICrypto, AuthenticationResult, Authority, INetworkModule, Logger, IPerformanceClient } from "@azure/msal-common";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { InteractionHandler, InteractionParams } from "./InteractionHandler";
import { INavigationClient } from "../navigation/INavigationClient";
export declare type RedirectParams = InteractionParams & {
    navigationClient: INavigationClient;
    redirectTimeout: number;
    redirectStartPage: string;
    onRedirectNavigate?: (url: string) => void | boolean;
};
export declare class RedirectHandler extends InteractionHandler {
    private browserCrypto;
    constructor(authCodeModule: AuthorizationCodeClient, storageImpl: BrowserCacheManager, authCodeRequest: CommonAuthorizationCodeRequest, logger: Logger, browserCrypto: ICrypto, performanceClient: IPerformanceClient);
    /**
     * Redirects window to given URL.
     * @param urlNavigate
     */
    initiateAuthRequest(requestUrl: string, params: RedirectParams): Promise<void>;
    /**
     * Handle authorization code response in the window.
     * @param hash
     */
    handleCodeResponseFromHash(locationHash: string, state: string, authority: Authority, networkModule: INetworkModule): Promise<AuthenticationResult>;
}
//# sourceMappingURL=RedirectHandler.d.ts.map