// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Constants } from "../common/constants";
import { sleep } from "../common/helper";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes";
import { DefaultRetryPolicy } from "./defaultRetryPolicy";
import { EndpointDiscoveryRetryPolicy } from "./endpointDiscoveryRetryPolicy";
import { ResourceThrottleRetryPolicy } from "./resourceThrottleRetryPolicy";
import { SessionRetryPolicy } from "./sessionRetryPolicy";
/**
 * @hidden
 */
export async function execute({ retryContext = { retryCount: 0 }, retryPolicies, requestContext, executeRequest, }) {
    // TODO: any response
    if (!retryPolicies) {
        retryPolicies = {
            endpointDiscoveryRetryPolicy: new EndpointDiscoveryRetryPolicy(requestContext.globalEndpointManager, requestContext.operationType),
            resourceThrottleRetryPolicy: new ResourceThrottleRetryPolicy(requestContext.connectionPolicy.retryOptions.maxRetryAttemptCount, requestContext.connectionPolicy.retryOptions.fixedRetryIntervalInMilliseconds, requestContext.connectionPolicy.retryOptions.maxWaitTimeInSeconds),
            sessionReadRetryPolicy: new SessionRetryPolicy(requestContext.globalEndpointManager, requestContext.resourceType, requestContext.operationType, requestContext.connectionPolicy),
            defaultRetryPolicy: new DefaultRetryPolicy(requestContext.operationType),
        };
    }
    if (retryContext && retryContext.clearSessionTokenNotAvailable) {
        requestContext.client.clearSessionToken(requestContext.path);
        delete requestContext.headers["x-ms-session-token"];
    }
    requestContext.endpoint = await requestContext.globalEndpointManager.resolveServiceEndpoint(requestContext.resourceType, requestContext.operationType);
    try {
        const response = await executeRequest(requestContext);
        response.headers[Constants.ThrottleRetryCount] =
            retryPolicies.resourceThrottleRetryPolicy.currentRetryAttemptCount;
        response.headers[Constants.ThrottleRetryWaitTimeInMs] =
            retryPolicies.resourceThrottleRetryPolicy.cummulativeWaitTimeinMs;
        return response;
    }
    catch (err) {
        // TODO: any error
        let retryPolicy = null;
        const headers = err.headers || {};
        if (err.code === StatusCodes.ENOTFOUND ||
            err.code === "REQUEST_SEND_ERROR" ||
            (err.code === StatusCodes.Forbidden &&
                (err.substatus === SubStatusCodes.DatabaseAccountNotFound ||
                    err.substatus === SubStatusCodes.WriteForbidden))) {
            retryPolicy = retryPolicies.endpointDiscoveryRetryPolicy;
        }
        else if (err.code === StatusCodes.TooManyRequests) {
            retryPolicy = retryPolicies.resourceThrottleRetryPolicy;
        }
        else if (err.code === StatusCodes.NotFound &&
            err.substatus === SubStatusCodes.ReadSessionNotAvailable) {
            retryPolicy = retryPolicies.sessionReadRetryPolicy;
        }
        else {
            retryPolicy = retryPolicies.defaultRetryPolicy;
        }
        const results = await retryPolicy.shouldRetry(err, retryContext, requestContext.endpoint);
        if (!results) {
            headers[Constants.ThrottleRetryCount] =
                retryPolicies.resourceThrottleRetryPolicy.currentRetryAttemptCount;
            headers[Constants.ThrottleRetryWaitTimeInMs] =
                retryPolicies.resourceThrottleRetryPolicy.cummulativeWaitTimeinMs;
            err.headers = Object.assign(Object.assign({}, err.headers), headers);
            throw err;
        }
        else {
            requestContext.retryCount++;
            const newUrl = results[1]; // TODO: any hack
            if (newUrl !== undefined) {
                requestContext.endpoint = newUrl;
            }
            await sleep(retryPolicy.retryAfterInMs);
            return execute({
                executeRequest,
                requestContext,
                retryContext,
                retryPolicies,
            });
        }
    }
}
//# sourceMappingURL=retryUtility.js.map