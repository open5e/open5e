// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Constants } from "../common";
export class ResourceResponse {
    constructor(resource, headers, statusCode, substatus) {
        this.resource = resource;
        this.headers = headers;
        this.statusCode = statusCode;
        this.substatus = substatus;
    }
    get requestCharge() {
        return Number(this.headers[Constants.HttpHeaders.RequestCharge]) || 0;
    }
    get activityId() {
        return this.headers[Constants.HttpHeaders.ActivityId];
    }
    get etag() {
        return this.headers[Constants.HttpHeaders.ETag];
    }
}
//# sourceMappingURL=ResourceResponse.js.map