/**
 * This class implements the resource throttle retry policy for requests.
 * @hidden
 */
export class ResourceThrottleRetryPolicy {
    /**
     * @param maxTries - Max number of retries to be performed for a request.
     * @param fixedRetryIntervalInMs - Fixed retry interval in milliseconds to wait between each
     * retry ignoring the retryAfter returned as part of the response.
     * @param timeoutInSeconds - Max wait time in seconds to wait for a request while the
     * retries are happening.
     */
    constructor(maxTries = 9, fixedRetryIntervalInMs = 0, timeoutInSeconds = 30) {
        this.maxTries = maxTries;
        this.fixedRetryIntervalInMs = fixedRetryIntervalInMs;
        /** Current retry attempt count. */
        this.currentRetryAttemptCount = 0;
        /** Cummulative wait time in milliseconds for a request while the retries are happening. */
        this.cummulativeWaitTimeinMs = 0;
        /** Retry interval in milliseconds to wait before the next request will be sent. */
        this.retryAfterInMs = 0;
        this.timeoutInMs = timeoutInSeconds * 1000;
        this.currentRetryAttemptCount = 0;
        this.cummulativeWaitTimeinMs = 0;
    }
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     */
    async shouldRetry(err) {
        // TODO: any custom error object
        if (err) {
            if (this.currentRetryAttemptCount < this.maxTries) {
                this.currentRetryAttemptCount++;
                this.retryAfterInMs = 0;
                if (this.fixedRetryIntervalInMs) {
                    this.retryAfterInMs = this.fixedRetryIntervalInMs;
                }
                else if (err.retryAfterInMs) {
                    this.retryAfterInMs = err.retryAfterInMs;
                }
                if (this.cummulativeWaitTimeinMs < this.timeoutInMs) {
                    this.cummulativeWaitTimeinMs += this.retryAfterInMs;
                    return true;
                }
            }
        }
        return false;
    }
}
//# sourceMappingURL=resourceThrottleRetryPolicy.js.map