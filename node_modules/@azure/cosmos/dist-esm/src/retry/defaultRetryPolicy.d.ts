import { OperationType } from "../common";
import { ErrorResponse } from "../request";
import { RetryPolicy } from "./RetryPolicy";
/**
 * This class implements the default connection retry policy for requests.
 * @hidden
 */
export declare class DefaultRetryPolicy implements RetryPolicy {
    private operationType;
    private maxTries;
    private currentRetryAttemptCount;
    retryAfterInMs: number;
    constructor(operationType: OperationType);
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     */
    shouldRetry(err: ErrorResponse): Promise<boolean>;
}
//# sourceMappingURL=defaultRetryPolicy.d.ts.map