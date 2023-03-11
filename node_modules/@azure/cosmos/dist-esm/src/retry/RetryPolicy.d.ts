import { ErrorResponse } from "../request";
import { RetryContext } from "./RetryContext";
/**
 * @hidden
 */
export interface RetryPolicy {
    retryAfterInMs: number;
    shouldRetry: (errorResponse: ErrorResponse, retryContext?: RetryContext, locationEndpoint?: string) => Promise<boolean | [boolean, string]>;
}
//# sourceMappingURL=RetryPolicy.d.ts.map