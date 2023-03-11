import { AuthError } from "@azure/msal-common";
/**
 * BrowserAuthErrorMessage class containing string constants used by error codes and messages.
 */
export declare const BrowserAuthErrorMessage: {
    pkceNotGenerated: {
        code: string;
        desc: string;
    };
    cryptoDoesNotExist: {
        code: string;
        desc: string;
    };
    httpMethodNotImplementedError: {
        code: string;
        desc: string;
    };
    emptyNavigateUriError: {
        code: string;
        desc: string;
    };
    hashEmptyError: {
        code: string;
        desc: string;
    };
    hashDoesNotContainStateError: {
        code: string;
        desc: string;
    };
    hashDoesNotContainKnownPropertiesError: {
        code: string;
        desc: string;
    };
    unableToParseStateError: {
        code: string;
        desc: string;
    };
    stateInteractionTypeMismatchError: {
        code: string;
        desc: string;
    };
    interactionInProgress: {
        code: string;
        desc: string;
    };
    popupWindowError: {
        code: string;
        desc: string;
    };
    emptyWindowError: {
        code: string;
        desc: string;
    };
    userCancelledError: {
        code: string;
        desc: string;
    };
    monitorPopupTimeoutError: {
        code: string;
        desc: string;
    };
    monitorIframeTimeoutError: {
        code: string;
        desc: string;
    };
    redirectInIframeError: {
        code: string;
        desc: string;
    };
    blockTokenRequestsInHiddenIframeError: {
        code: string;
        desc: string;
    };
    blockAcquireTokenInPopupsError: {
        code: string;
        desc: string;
    };
    iframeClosedPrematurelyError: {
        code: string;
        desc: string;
    };
    silentLogoutUnsupportedError: {
        code: string;
        desc: string;
    };
    noAccountError: {
        code: string;
        desc: string;
    };
    silentPromptValueError: {
        code: string;
        desc: string;
    };
    noTokenRequestCacheError: {
        code: string;
        desc: string;
    };
    unableToParseTokenRequestCacheError: {
        code: string;
        desc: string;
    };
    noCachedAuthorityError: {
        code: string;
        desc: string;
    };
    authRequestNotSet: {
        code: string;
        desc: string;
    };
    invalidCacheType: {
        code: string;
        desc: string;
    };
    notInBrowserEnvironment: {
        code: string;
        desc: string;
    };
    databaseNotOpen: {
        code: string;
        desc: string;
    };
    noNetworkConnectivity: {
        code: string;
        desc: string;
    };
    postRequestFailed: {
        code: string;
        desc: string;
    };
    getRequestFailed: {
        code: string;
        desc: string;
    };
    failedToParseNetworkResponse: {
        code: string;
        desc: string;
    };
    unableToLoadTokenError: {
        code: string;
        desc: string;
    };
    signingKeyNotFoundInStorage: {
        code: string;
        desc: string;
    };
    authCodeRequired: {
        code: string;
        desc: string;
    };
    authCodeOrNativeAccountRequired: {
        code: string;
        desc: string;
    };
    spaCodeAndNativeAccountPresent: {
        code: string;
        desc: string;
    };
    databaseUnavailable: {
        code: string;
        desc: string;
    };
    unableToAcquireTokenFromNativePlatform: {
        code: string;
        desc: string;
    };
    nativeHandshakeTimeout: {
        code: string;
        desc: string;
    };
    nativeExtensionNotInstalled: {
        code: string;
        desc: string;
    };
    nativeConnectionNotEstablished: {
        code: string;
        desc: string;
    };
    nativeBrokerCalledBeforeInitialize: {
        code: string;
        desc: string;
    };
    nativePromptNotSupported: {
        code: string;
        desc: string;
    };
};
/**
 * Browser library error class thrown by the MSAL.js library for SPAs
 */
export declare class BrowserAuthError extends AuthError {
    constructor(errorCode: string, errorMessage?: string);
    /**
     * Creates an error thrown when PKCE is not implemented.
     * @param errDetail
     */
    static createPkceNotGeneratedError(errDetail: string): BrowserAuthError;
    /**
     * Creates an error thrown when the crypto object is unavailable.
     * @param errDetail
     */
    static createCryptoNotAvailableError(errDetail: string): BrowserAuthError;
    /**
     * Creates an error thrown when an HTTP method hasn't been implemented by the browser class.
     * @param method
     */
    static createHttpMethodNotImplementedError(method: string): BrowserAuthError;
    /**
     * Creates an error thrown when the navigation URI is empty.
     */
    static createEmptyNavigationUriError(): BrowserAuthError;
    /**
     * Creates an error thrown when the hash string value is unexpectedly empty.
     * @param hashValue
     */
    static createEmptyHashError(hashValue: string): BrowserAuthError;
    /**
     * Creates an error thrown when the hash string value is unexpectedly empty.
     */
    static createHashDoesNotContainStateError(): BrowserAuthError;
    /**
     * Creates an error thrown when the hash string value does not contain known properties
     */
    static createHashDoesNotContainKnownPropertiesError(): BrowserAuthError;
    /**
     * Creates an error thrown when the hash string value is unexpectedly empty.
     */
    static createUnableToParseStateError(): BrowserAuthError;
    /**
     * Creates an error thrown when the state value in the hash does not match the interaction type of the API attempting to consume it.
     */
    static createStateInteractionTypeMismatchError(): BrowserAuthError;
    /**
     * Creates an error thrown when a browser interaction (redirect or popup) is in progress.
     */
    static createInteractionInProgressError(): BrowserAuthError;
    /**
     * Creates an error thrown when the popup window could not be opened.
     * @param errDetail
     */
    static createPopupWindowError(errDetail?: string): BrowserAuthError;
    /**
     * Creates an error thrown when window.open returns an empty window object.
     * @param errDetail
     */
    static createEmptyWindowCreatedError(): BrowserAuthError;
    /**
     * Creates an error thrown when the user closes a popup.
     */
    static createUserCancelledError(): BrowserAuthError;
    /**
     * Creates an error thrown when monitorPopupFromHash times out for a given popup.
     */
    static createMonitorPopupTimeoutError(): BrowserAuthError;
    /**
     * Creates an error thrown when monitorIframeFromHash times out for a given iframe.
     */
    static createMonitorIframeTimeoutError(): BrowserAuthError;
    /**
     * Creates an error thrown when navigateWindow is called inside an iframe or brokered applications.
     * @param windowParentCheck
     */
    static createRedirectInIframeError(windowParentCheck: boolean): BrowserAuthError;
    /**
     * Creates an error thrown when an auth reload is done inside an iframe.
     */
    static createBlockReloadInHiddenIframeError(): BrowserAuthError;
    /**
     * Creates an error thrown when a popup attempts to call an acquireToken API
     * @returns
     */
    static createBlockAcquireTokenInPopupsError(): BrowserAuthError;
    /**
     * Creates an error thrown when an iframe is found to be closed before the timeout is reached.
     */
    static createIframeClosedPrematurelyError(): BrowserAuthError;
    /**
     * Creates an error thrown when the logout API is called on any of the silent interaction clients
     */
    static createSilentLogoutUnsupportedError(): BrowserAuthError;
    /**
     * Creates an error thrown when the account object is not provided in the acquireTokenSilent API.
     */
    static createNoAccountError(): BrowserAuthError;
    /**
     * Creates an error thrown when a given prompt value is invalid for silent requests.
     */
    static createSilentPromptValueError(givenPrompt: string): BrowserAuthError;
    /**
     * Creates an error thrown when the cached token request could not be retrieved from the cache
     */
    static createUnableToParseTokenRequestCacheError(): BrowserAuthError;
    /**
     * Creates an error thrown when the token request could not be retrieved from the cache
     */
    static createNoTokenRequestCacheError(): BrowserAuthError;
    /**
     * Creates an error thrown when handleCodeResponse is called before initiateAuthRequest (InteractionHandler)
     */
    static createAuthRequestNotSetError(): BrowserAuthError;
    /**
     * Creates an error thrown when the authority could not be retrieved from the cache
     */
    static createNoCachedAuthorityError(): BrowserAuthError;
    /**
     * Creates an error thrown if cache type is invalid.
     */
    static createInvalidCacheTypeError(): BrowserAuthError;
    /**
     * Create an error thrown when login and token requests are made from a non-browser environment
     */
    static createNonBrowserEnvironmentError(): BrowserAuthError;
    /**
     * Create an error thrown when indexDB database is not open
     */
    static createDatabaseNotOpenError(): BrowserAuthError;
    /**
     * Create an error thrown when token fetch fails due to no internet
     */
    static createNoNetworkConnectivityError(): BrowserAuthError;
    /**
     * Create an error thrown when token fetch fails due to reasons other than internet connectivity
     */
    static createPostRequestFailedError(errorDesc: string, endpoint: string): BrowserAuthError;
    /**
     * Create an error thrown when get request fails due to reasons other than internet connectivity
     */
    static createGetRequestFailedError(errorDesc: string, endpoint: string): BrowserAuthError;
    /**
     * Create an error thrown when network client fails to parse network response
     */
    static createFailedToParseNetworkResponseError(endpoint: string): BrowserAuthError;
    /**
     * Create an error thrown when the necessary information is not available to sideload tokens
     */
    static createUnableToLoadTokenError(errorDetail: string): BrowserAuthError;
    /**
     * Create an error thrown when the queried cryptographic key is not found in IndexedDB
     */
    static createSigningKeyNotFoundInStorageError(keyId: string): BrowserAuthError;
    /**
     * Create an error when an authorization code is required but not provided
     */
    static createAuthCodeRequiredError(): BrowserAuthError;
    /**
     * Create an error when an authorization code or native account ID is required but not provided
     */
    static createAuthCodeOrNativeAccountIdRequiredError(): BrowserAuthError;
    /**
     * Create an error when both authorization code and native account ID are provided
     */
    static createSpaCodeAndNativeAccountIdPresentError(): BrowserAuthError;
    /**
     * Create an error when IndexedDB is unavailable
     */
    static createDatabaseUnavailableError(): BrowserAuthError;
    /**
     * Create an error when native token acquisition is not possible
     */
    static createUnableToAcquireTokenFromNativePlatformError(): BrowserAuthError;
    /**
     * Create an error thrown when Handshake with browser extension times out
     */
    static createNativeHandshakeTimeoutError(): BrowserAuthError;
    /**
     * Create an error thrown when browser extension is not installed
     */
    static createNativeExtensionNotInstalledError(): BrowserAuthError;
    /**
     * Create an error when native connection has not been established
     * @returns
     */
    static createNativeConnectionNotEstablishedError(): BrowserAuthError;
    /**
     * Create an error thrown when the initialize function hasn't been called
     */
    static createNativeBrokerCalledBeforeInitialize(): BrowserAuthError;
    /**
     * Create an error thrown when requesting a token directly from the native platform with an unsupported prompt parameter e.g. select_account, login or create
     * These requests must go through eSTS to ensure eSTS is aware of the new account
     */
    static createNativePromptParameterNotSupportedError(): BrowserAuthError;
}
//# sourceMappingURL=BrowserAuthError.d.ts.map