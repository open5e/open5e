import { AuthError } from "@azure/msal-common";
/**
 * BrowserAuthErrorMessage class containing string constants used by error codes and messages.
 */
export declare const BrowserConfigurationAuthErrorMessage: {
    redirectUriNotSet: {
        code: string;
        desc: string;
    };
    postLogoutUriNotSet: {
        code: string;
        desc: string;
    };
    storageNotSupportedError: {
        code: string;
        desc: string;
    };
    noRedirectCallbacksSet: {
        code: string;
        desc: string;
    };
    invalidCallbackObject: {
        code: string;
        desc: string;
    };
    stubPcaInstanceCalled: {
        code: string;
        desc: string;
    };
    inMemRedirectUnavailable: {
        code: string;
        desc: string;
    };
    entropyNotProvided: {
        code: string;
        desc: string;
    };
};
/**
 * Browser library error class thrown by the MSAL.js library for SPAs
 */
export declare class BrowserConfigurationAuthError extends AuthError {
    constructor(errorCode: string, errorMessage?: string);
    /**
     * Creates an error thrown when the redirect uri is empty (not set by caller)
     */
    static createRedirectUriEmptyError(): BrowserConfigurationAuthError;
    /**
     * Creates an error thrown when the post-logout redirect uri is empty (not set by caller)
     */
    static createPostLogoutRedirectUriEmptyError(): BrowserConfigurationAuthError;
    /**
     * Creates error thrown when given storage location is not supported.
     * @param givenStorageLocation
     */
    static createStorageNotSupportedError(givenStorageLocation: string): BrowserConfigurationAuthError;
    /**
     * Creates error thrown when redirect callbacks are not set before calling loginRedirect() or acquireTokenRedirect().
     */
    static createRedirectCallbacksNotSetError(): BrowserConfigurationAuthError;
    /**
     * Creates error thrown when the stub instance of PublicClientApplication is called.
     */
    static createStubPcaInstanceCalledError(): BrowserConfigurationAuthError;
    static createInMemoryRedirectUnavailableError(): BrowserConfigurationAuthError;
    /**
     * Creates an error thrown when a crypto interface that requires entropy is initialized without entropy
     */
    static createEntropyNotProvided(): BrowserConfigurationAuthError;
}
//# sourceMappingURL=BrowserConfigurationAuthError.d.ts.map