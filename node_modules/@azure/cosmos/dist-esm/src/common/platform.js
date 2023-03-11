// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { getUserAgent as userAgent } from "universal-user-agent";
import { Constants } from "./constants";
/**
 * @hidden
 */
export function getUserAgent(suffix) {
    const ua = `${userAgent()} ${Constants.SDKName}/${Constants.SDKVersion}`;
    if (suffix) {
        return ua + " " + suffix;
    }
    return ua;
}
//# sourceMappingURL=platform.js.map