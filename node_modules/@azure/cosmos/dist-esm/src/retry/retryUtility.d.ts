import { Response } from "../request";
import { RequestContext } from "../request/RequestContext";
import { DefaultRetryPolicy } from "./defaultRetryPolicy";
import { EndpointDiscoveryRetryPolicy } from "./endpointDiscoveryRetryPolicy";
import { ResourceThrottleRetryPolicy } from "./resourceThrottleRetryPolicy";
import { RetryContext } from "./RetryContext";
import { SessionRetryPolicy } from "./sessionRetryPolicy";
/**
 * @hidden
 */
interface ExecuteArgs {
    retryContext?: RetryContext;
    retryPolicies?: RetryPolicies;
    requestContext: RequestContext;
    executeRequest: (requestContext: RequestContext) => Promise<Response<any>>;
}
/**
 * @hidden
 */
interface RetryPolicies {
    endpointDiscoveryRetryPolicy: EndpointDiscoveryRetryPolicy;
    resourceThrottleRetryPolicy: ResourceThrottleRetryPolicy;
    sessionReadRetryPolicy: SessionRetryPolicy;
    defaultRetryPolicy: DefaultRetryPolicy;
}
/**
 * @hidden
 */
export declare function execute({ retryContext, retryPolicies, requestContext, executeRequest, }: ExecuteArgs): Promise<Response<any>>;
export {};
//# sourceMappingURL=retryUtility.d.ts.map