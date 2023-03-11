/**
 * @packageDocumentation
 * @module @azure/msal-browser
 */
/**
 * Warning: This set of exports is purely intended to be used by other MSAL libraries, and should be considered potentially unstable. We strongly discourage using them directly, you do so at your own risk.
 * Breaking changes to these APIs will be shipped under a minor version, instead of a major version.
 */
import * as internals from "./internals";
export { internals };
export { PublicClientApplication } from "./app/PublicClientApplication";
export { Configuration, BrowserAuthOptions, CacheOptions, BrowserSystemOptions, BrowserConfiguration, DEFAULT_IFRAME_TIMEOUT_MS } from "./config/Configuration";
export { InteractionType, InteractionStatus, BrowserCacheLocation, WrapperSKU, ApiId, CacheLookupPolicy } from "./utils/BrowserConstants";
export { BrowserUtils } from "./utils/BrowserUtils";
export { BrowserAuthError, BrowserAuthErrorMessage } from "./error/BrowserAuthError";
export { BrowserConfigurationAuthError, BrowserConfigurationAuthErrorMessage } from "./error/BrowserConfigurationAuthError";
export { IPublicClientApplication, stubbedPublicClientApplication } from "./app/IPublicClientApplication";
export { INavigationClient } from "./navigation/INavigationClient";
export { NavigationClient } from "./navigation/NavigationClient";
export { NavigationOptions } from "./navigation/NavigationOptions";
export { PopupRequest } from "./request/PopupRequest";
export { RedirectRequest } from "./request/RedirectRequest";
export { SilentRequest } from "./request/SilentRequest";
export { SsoSilentRequest } from "./request/SsoSilentRequest";
export { EndSessionRequest } from "./request/EndSessionRequest";
export { EndSessionPopupRequest } from "./request/EndSessionPopupRequest";
export { AuthorizationUrlRequest } from "./request/AuthorizationUrlRequest";
export { AuthorizationCodeRequest } from "./request/AuthorizationCodeRequest";
export { LoadTokenOptions } from "./cache/TokenCache";
export { EventMessage, EventPayload, EventError, EventCallbackFunction, EventMessageUtils, PopupEvent } from "./event/EventMessage";
export { EventType } from "./event/EventType";
export { SignedHttpRequest, SignedHttpRequestOptions } from "./crypto/SignedHttpRequest";
export { PopupWindowAttributes } from "./request/PopupWindowAttributes";
export { AuthenticationScheme, AccountInfo, AccountEntity, AuthenticationResult, AuthError, AuthErrorMessage, ClientAuthError, ClientAuthErrorMessage, ClientConfigurationError, ClientConfigurationErrorMessage, InteractionRequiredAuthError, InteractionRequiredAuthErrorMessage, ServerError, INetworkModule, NetworkResponse, NetworkRequestOptions, ILoggerCallback, Logger, LogLevel, ProtocolMode, ExternalTokenResponse, StringUtils, UrlString, AzureCloudInstance, AzureCloudOptions, AuthenticationHeaderParser, OIDC_DEFAULT_SCOPES, PerformanceCallbackFunction, PerformanceEvent, PerformanceEvents } from "@azure/msal-common";
export { version } from "./packageMetadata";
//# sourceMappingURL=index.d.ts.map