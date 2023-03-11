import { StandardInteractionClient } from "./StandardInteractionClient";
import { CommonSilentFlowRequest, AuthenticationResult, ServerTelemetryManager, RefreshTokenClient, AzureCloudOptions } from "@azure/msal-common";
export declare class SilentRefreshClient extends StandardInteractionClient {
    /**
     * Exchanges the refresh token for new tokens
     * @param request
     */
    acquireToken(request: CommonSilentFlowRequest): Promise<AuthenticationResult>;
    /**
     * Currently Unsupported
     */
    logout(): Promise<void>;
    /**
     * Creates a Refresh Client with the given authority, or the default authority.
     * @param serverTelemetryManager
     * @param authorityUrl
     */
    protected createRefreshTokenClient(serverTelemetryManager: ServerTelemetryManager, authorityUrl?: string, azureCloudOptions?: AzureCloudOptions): Promise<RefreshTokenClient>;
}
//# sourceMappingURL=SilentRefreshClient.d.ts.map