import { ServerTelemetryManager, CommonAuthorizationCodeRequest, AuthorizationCodeClient, ClientConfiguration, Authority, ServerAuthorizationCodeResponse, CommonEndSessionRequest, AccountInfo, AzureCloudOptions } from "@azure/msal-common";
import { BaseInteractionClient } from "./BaseInteractionClient";
import { AuthorizationUrlRequest } from "../request/AuthorizationUrlRequest";
import { InteractionType } from "../utils/BrowserConstants";
import { EndSessionRequest } from "../request/EndSessionRequest";
import { RedirectRequest } from "../request/RedirectRequest";
import { PopupRequest } from "../request/PopupRequest";
import { SsoSilentRequest } from "../request/SsoSilentRequest";
/**
 * Defines the class structure and helper functions used by the "standard", non-brokered auth flows (popup, redirect, silent (RT), silent (iframe))
 */
export declare abstract class StandardInteractionClient extends BaseInteractionClient {
    /**
     * Generates an auth code request tied to the url request.
     * @param request
     */
    protected initializeAuthorizationCodeRequest(request: AuthorizationUrlRequest): Promise<CommonAuthorizationCodeRequest>;
    /**
     * Initializer for the logout request.
     * @param logoutRequest
     */
    protected initializeLogoutRequest(logoutRequest?: EndSessionRequest): CommonEndSessionRequest;
    /**
     * Parses login_hint ID Token Claim out of AccountInfo object to be used as
     * logout_hint in end session request.
     * @param account
     */
    protected getLogoutHintFromIdTokenClaims(account: AccountInfo): string | null;
    /**
     * Creates an Authorization Code Client with the given authority, or the default authority.
     * @param serverTelemetryManager
     * @param authorityUrl
     */
    protected createAuthCodeClient(serverTelemetryManager: ServerTelemetryManager, authorityUrl?: string, requestAzureCloudOptions?: AzureCloudOptions): Promise<AuthorizationCodeClient>;
    /**
     * Creates a Client Configuration object with the given request authority, or the default authority.
     * @param serverTelemetryManager
     * @param requestAuthority
     * @param requestCorrelationId
     */
    protected getClientConfiguration(serverTelemetryManager: ServerTelemetryManager, requestAuthority?: string, requestAzureCloudOptions?: AzureCloudOptions): Promise<ClientConfiguration>;
    /**
     * @param hash
     * @param interactionType
     */
    protected validateAndExtractStateFromHash(serverParams: ServerAuthorizationCodeResponse, interactionType: InteractionType, requestCorrelationId?: string): string;
    /**
     * Used to get a discovered version of the default authority.
     * @param requestAuthority
     * @param requestCorrelationId
     */
    protected getDiscoveredAuthority(requestAuthority?: string, requestAzureCloudOptions?: AzureCloudOptions): Promise<Authority>;
    /**
     * Helper to initialize required request parameters for interactive APIs and ssoSilent()
     * @param request
     * @param interactionType
     */
    protected initializeAuthorizationRequest(request: RedirectRequest | PopupRequest | SsoSilentRequest, interactionType: InteractionType): Promise<AuthorizationUrlRequest>;
}
//# sourceMappingURL=StandardInteractionClient.d.ts.map