import { StandardInteractionClient } from "./StandardInteractionClient";
import { CommonSilentFlowRequest, AuthenticationResult, SilentFlowClient, ServerTelemetryManager, AccountInfo, AzureCloudOptions } from "@azure/msal-common";
import { SilentRequest } from "../request/SilentRequest";
export declare class SilentCacheClient extends StandardInteractionClient {
    /**
     * Returns unexpired tokens from the cache, if available
     * @param silentRequest
     */
    acquireToken(silentRequest: CommonSilentFlowRequest): Promise<AuthenticationResult>;
    /**
     * Currently Unsupported
     */
    logout(): Promise<void>;
    /**
     * Creates an Silent Flow Client with the given authority, or the default authority.
     * @param serverTelemetryManager
     * @param authorityUrl
     */
    protected createSilentFlowClient(serverTelemetryManager: ServerTelemetryManager, authorityUrl?: string, azureCloudOptions?: AzureCloudOptions): Promise<SilentFlowClient>;
    initializeSilentRequest(request: SilentRequest, account: AccountInfo): Promise<CommonSilentFlowRequest>;
}
//# sourceMappingURL=SilentCacheClient.d.ts.map