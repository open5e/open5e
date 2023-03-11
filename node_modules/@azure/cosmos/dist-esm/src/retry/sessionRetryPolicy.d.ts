import { OperationType, ResourceType } from "../common";
import { ConnectionPolicy } from "../documents";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { ErrorResponse } from "../request";
import { RetryContext } from "./RetryContext";
import { RetryPolicy } from "./RetryPolicy";
/**
 * This class implements the retry policy for session consistent reads.
 * @hidden
 */
export declare class SessionRetryPolicy implements RetryPolicy {
    private globalEndpointManager;
    private resourceType;
    private operationType;
    private connectionPolicy;
    /** Current retry attempt count. */
    currentRetryAttemptCount: number;
    /** Retry interval in milliseconds. */
    retryAfterInMs: number;
    /**
     * @param globalEndpointManager - The GlobalEndpointManager instance.
     */
    constructor(globalEndpointManager: GlobalEndpointManager, resourceType: ResourceType, operationType: OperationType, connectionPolicy: ConnectionPolicy);
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     * @param callback - The callback function which takes bool argument which specifies whether the request
     * will be retried or not.
     */
    shouldRetry(err: ErrorResponse, retryContext?: RetryContext): Promise<boolean>;
}
//# sourceMappingURL=sessionRetryPolicy.d.ts.map