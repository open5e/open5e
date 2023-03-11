import { InteractionType } from "./BrowserConstants";
import { ICrypto, ServerAuthorizationCodeResponse } from "@azure/msal-common";
export declare type BrowserStateObject = {
    interactionType: InteractionType;
};
export declare class BrowserProtocolUtils {
    /**
     * Extracts the BrowserStateObject from the state string.
     * @param browserCrypto
     * @param state
     */
    static extractBrowserRequestState(browserCrypto: ICrypto, state: string): BrowserStateObject | null;
    /**
     * Parses properties of server response from url hash
     * @param locationHash Hash from url
     */
    static parseServerResponseFromHash(locationHash: string): ServerAuthorizationCodeResponse;
}
//# sourceMappingURL=BrowserProtocolUtils.d.ts.map