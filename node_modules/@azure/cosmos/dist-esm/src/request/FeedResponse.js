// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Constants } from "../common";
export class FeedResponse {
    constructor(resources, headers, hasMoreResults) {
        this.resources = resources;
        this.headers = headers;
        this.hasMoreResults = hasMoreResults;
    }
    get continuation() {
        return this.continuationToken;
    }
    get continuationToken() {
        return this.headers[Constants.HttpHeaders.Continuation];
    }
    get queryMetrics() {
        return this.headers[Constants.HttpHeaders.QueryMetrics];
    }
    get requestCharge() {
        return this.headers[Constants.HttpHeaders.RequestCharge];
    }
    get activityId() {
        return this.headers[Constants.HttpHeaders.ActivityId];
    }
}
//# sourceMappingURL=FeedResponse.js.map