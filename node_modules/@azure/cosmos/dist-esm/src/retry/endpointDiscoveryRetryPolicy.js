import { isReadRequest } from "../common/helper";
/**
 * This class implements the retry policy for endpoint discovery.
 * @hidden
 */
export class EndpointDiscoveryRetryPolicy {
    /**
     * @param globalEndpointManager - The GlobalEndpointManager instance.
     */
    constructor(globalEndpointManager, operationType) {
        this.globalEndpointManager = globalEndpointManager;
        this.operationType = operationType;
        this.maxTries = EndpointDiscoveryRetryPolicy.maxTries;
        this.currentRetryAttemptCount = 0;
        this.retryAfterInMs = EndpointDiscoveryRetryPolicy.retryAfterInMs;
    }
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     */
    async shouldRetry(err, retryContext, locationEndpoint) {
        if (!err) {
            return false;
        }
        if (!retryContext || !locationEndpoint) {
            return false;
        }
        if (!this.globalEndpointManager.enableEndpointDiscovery) {
            return false;
        }
        if (this.currentRetryAttemptCount >= this.maxTries) {
            return false;
        }
        this.currentRetryAttemptCount++;
        if (isReadRequest(this.operationType)) {
            await this.globalEndpointManager.markCurrentLocationUnavailableForRead(locationEndpoint);
        }
        else {
            await this.globalEndpointManager.markCurrentLocationUnavailableForWrite(locationEndpoint);
        }
        retryContext.retryCount = this.currentRetryAttemptCount;
        retryContext.clearSessionTokenNotAvailable = false;
        retryContext.retryRequestOnPreferredLocations = false;
        return true;
    }
}
EndpointDiscoveryRetryPolicy.maxTries = 120; // TODO: Constant?
EndpointDiscoveryRetryPolicy.retryAfterInMs = 1000;
//# sourceMappingURL=endpointDiscoveryRetryPolicy.js.map