import { INetworkModule } from "@azure/msal-common";
import { InteractionType } from "./BrowserConstants";
/**
 * Utility class for browser specific functions
 */
export declare class BrowserUtils {
    /**
     * Clears hash from window url.
     */
    static clearHash(contentWindow: Window): void;
    /**
     * Replaces current hash with hash from provided url
     */
    static replaceHash(url: string): void;
    /**
     * Returns boolean of whether the current window is in an iframe or not.
     */
    static isInIframe(): boolean;
    /**
     * Returns boolean of whether or not the current window is a popup opened by msal
     */
    static isInPopup(): boolean;
    /**
     * Returns current window URL as redirect uri
     */
    static getCurrentUri(): string;
    /**
     * Gets the homepage url for the current window location.
     */
    static getHomepage(): string;
    /**
     * Returns best compatible network client object.
     */
    static getBrowserNetworkClient(): INetworkModule;
    /**
     * Throws error if we have completed an auth and are
     * attempting another auth request inside an iframe.
     */
    static blockReloadInHiddenIframes(): void;
    /**
     * Block redirect operations in iframes unless explicitly allowed
     * @param interactionType Interaction type for the request
     * @param allowRedirectInIframe Config value to allow redirects when app is inside an iframe
     */
    static blockRedirectInIframe(interactionType: InteractionType, allowRedirectInIframe: boolean): void;
    /**
     * Block redirectUri loaded in popup from calling AcquireToken APIs
     */
    static blockAcquireTokenInPopups(): void;
    /**
     * Throws error if token requests are made in non-browser environment
     * @param isBrowserEnvironment Flag indicating if environment is a browser.
     */
    static blockNonBrowserEnvironment(isBrowserEnvironment: boolean): void;
    /**
     * Throws error if native brokering is enabled but initialize hasn't been called
     * @param allowNativeBroker
     * @param initialized
     */
    static blockNativeBrokerCalledBeforeInitialized(allowNativeBroker: boolean, initialized: boolean): void;
    /**
     * Returns boolean of whether current browser is an Internet Explorer or Edge browser.
     */
    static detectIEOrEdge(): boolean;
}
//# sourceMappingURL=BrowserUtils.d.ts.map