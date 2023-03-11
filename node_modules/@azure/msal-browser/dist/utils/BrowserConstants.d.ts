import { PopupRequest } from "../request/PopupRequest";
import { RedirectRequest } from "../request/RedirectRequest";
/**
 * Constants
 */
export declare const BrowserConstants: {
    /**
     * Interaction in progress cache value
     */
    INTERACTION_IN_PROGRESS_VALUE: string;
    /**
     * Invalid grant error code
     */
    INVALID_GRANT_ERROR: string;
    /**
     * Default popup window width
     */
    POPUP_WIDTH: number;
    /**
     * Default popup window height
     */
    POPUP_HEIGHT: number;
    /**
     * Name of the popup window starts with
     */
    POPUP_NAME_PREFIX: string;
    /**
     * Default popup monitor poll interval in milliseconds
     */
    DEFAULT_POLL_INTERVAL_MS: number;
    /**
     * Msal-browser SKU
     */
    MSAL_SKU: string;
};
export declare const NativeConstants: {
    CHANNEL_ID: string;
    PREFERRED_EXTENSION_ID: string;
    MATS_TELEMETRY: string;
};
export declare enum NativeExtensionMethod {
    HandshakeRequest = "Handshake",
    HandshakeResponse = "HandshakeResponse",
    GetToken = "GetToken",
    Response = "Response"
}
export declare enum BrowserCacheLocation {
    LocalStorage = "localStorage",
    SessionStorage = "sessionStorage",
    MemoryStorage = "memoryStorage"
}
/**
 * HTTP Request types supported by MSAL.
 */
export declare enum HTTP_REQUEST_TYPE {
    GET = "GET",
    POST = "POST"
}
/**
 * Temporary cache keys for MSAL, deleted after any request.
 */
export declare enum TemporaryCacheKeys {
    AUTHORITY = "authority",
    ACQUIRE_TOKEN_ACCOUNT = "acquireToken.account",
    SESSION_STATE = "session.state",
    REQUEST_STATE = "request.state",
    NONCE_IDTOKEN = "nonce.id_token",
    ORIGIN_URI = "request.origin",
    RENEW_STATUS = "token.renew.status",
    URL_HASH = "urlHash",
    REQUEST_PARAMS = "request.params",
    SCOPES = "scopes",
    INTERACTION_STATUS_KEY = "interaction.status",
    CCS_CREDENTIAL = "ccs.credential",
    CORRELATION_ID = "request.correlationId",
    NATIVE_REQUEST = "request.native",
    REDIRECT_CONTEXT = "request.redirect.context"
}
/**
 * Cache keys stored in-memory
 */
export declare enum InMemoryCacheKeys {
    WRAPPER_SKU = "wrapper.sku",
    WRAPPER_VER = "wrapper.version"
}
/**
 * API Codes for Telemetry purposes.
 * Before adding a new code you must claim it in the MSAL Telemetry tracker as these number spaces are shared across all MSALs
 * 0-99 Silent Flow
 * 800-899 Auth Code Flow
 */
export declare enum ApiId {
    acquireTokenRedirect = 861,
    acquireTokenPopup = 862,
    ssoSilent = 863,
    acquireTokenSilent_authCode = 864,
    handleRedirectPromise = 865,
    acquireTokenByCode = 866,
    acquireTokenSilent_silentFlow = 61,
    logout = 961,
    logoutPopup = 962
}
export declare enum InteractionType {
    Redirect = "redirect",
    Popup = "popup",
    Silent = "silent",
    None = "none"
}
/**
 * Types of interaction currently in progress.
 * Used in events in wrapper libraries to invoke functions when certain interaction is in progress or all interactions are complete.
 */
export declare enum InteractionStatus {
    /**
     * Initial status before interaction occurs
     */
    Startup = "startup",
    /**
     * Status set when all login calls occuring
     */
    Login = "login",
    /**
     * Status set when logout call occuring
     */
    Logout = "logout",
    /**
     * Status set for acquireToken calls
     */
    AcquireToken = "acquireToken",
    /**
     * Status set for ssoSilent calls
     */
    SsoSilent = "ssoSilent",
    /**
     * Status set when handleRedirect in progress
     */
    HandleRedirect = "handleRedirect",
    /**
     * Status set when interaction is complete
     */
    None = "none"
}
export declare const DEFAULT_REQUEST: RedirectRequest | PopupRequest;
/**
 * JWK Key Format string (Type MUST be defined for window crypto APIs)
 */
export declare const KEY_FORMAT_JWK = "jwk";
export declare enum WrapperSKU {
    React = "@azure/msal-react",
    Angular = "@azure/msal-angular"
}
export declare const DB_NAME = "msal.db";
export declare const DB_VERSION = 1;
export declare const DB_TABLE_NAME: string;
export declare enum CacheLookupPolicy {
    Default = 0,
    AccessToken = 1,
    AccessTokenAndRefreshToken = 2,
    RefreshToken = 3,
    RefreshTokenAndNetwork = 4,
    Skip = 5
}
//# sourceMappingURL=BrowserConstants.d.ts.map