import { OperationType } from "../common";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { ErrorResponse } from "../request";
import { RetryContext } from "./RetryContext";
import { RetryPolicy } from "./RetryPolicy";
/**
 * This class implements the retry policy for endpoint discovery.
 * @hidden
 */
export declare class EndpointDiscoveryRetryPolicy implements RetryPolicy {
    private globalEndpointManager;
    private operationType;
    /** Current retry attempt count. */
    currentRetryAttemptCount: number;
    /** Retry interval in milliseconds. */
    retryAfterInMs: number;
    /** Max number of retry attempts to perform. */
    private maxTries;
    private static readonly maxTries;
    private static readonly retryAfterInMs;
    /**
     * @param globalEndpointManager - The GlobalEndpointManager instance.
     */
    constructor(globalEndpointManager: GlobalEndpointManager, operationType: OperationType);
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     */
    shouldRetry(err: ErrorResponse, retryContext?: RetryContext, locationEndpoint?: string): Promise<boolean | [boolean, string]>;
}
//# sourceMappingURL=endpointDiscoveryRetryPolicy.d.ts.map