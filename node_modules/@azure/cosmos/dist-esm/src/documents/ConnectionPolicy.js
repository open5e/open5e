import { ConnectionMode } from "./ConnectionMode";
/**
 * @hidden
 */
export const defaultConnectionPolicy = Object.freeze({
    connectionMode: ConnectionMode.Gateway,
    requestTimeout: 60000,
    enableEndpointDiscovery: true,
    preferredLocations: [],
    retryOptions: {
        maxRetryAttemptCount: 9,
        fixedRetryIntervalInMilliseconds: 0,
        maxWaitTimeInSeconds: 30,
    },
    useMultipleWriteLocations: true,
    endpointRefreshRateInMs: 300000,
    enableBackgroundEndpointRefreshing: true,
});
//# sourceMappingURL=ConnectionPolicy.js.map