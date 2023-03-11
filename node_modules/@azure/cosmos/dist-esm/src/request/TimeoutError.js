// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * @hidden
 */
export const TimeoutErrorCode = "TimeoutError";
export class TimeoutError extends Error {
    constructor(message = "Timeout Error") {
        super(message);
        this.code = TimeoutErrorCode;
        this.name = TimeoutErrorCode;
    }
}
//# sourceMappingURL=TimeoutError.js.map