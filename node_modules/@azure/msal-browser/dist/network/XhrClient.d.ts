import { INetworkModule, NetworkRequestOptions, NetworkResponse } from "@azure/msal-common";
/**
 * This client implements the XMLHttpRequest class to send GET and POST requests.
 */
export declare class XhrClient implements INetworkModule {
    /**
     * XhrClient for REST endpoints - Get request
     * @param url
     * @param headers
     * @param body
     */
    sendGetRequestAsync<T>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;
    /**
     * XhrClient for REST endpoints - Post request
     * @param url
     * @param headers
     * @param body
     */
    sendPostRequestAsync<T>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;
    /**
     * Helper for XhrClient requests.
     * @param url
     * @param method
     * @param options
     */
    private sendRequestAsync;
    /**
     * Helper to set XHR headers for request.
     * @param xhr
     * @param options
     */
    private setXhrHeaders;
    /**
     * Gets a string map of the headers received in the response.
     *
     * Algorithm comes from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
     * @param xhr
     */
    private getHeaderDict;
}
//# sourceMappingURL=XhrClient.d.ts.map