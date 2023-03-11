// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { parsePath } from "./common";
/**
 * @hidden
 */
export function extractPartitionKey(document, partitionKeyDefinition) {
    if (partitionKeyDefinition &&
        partitionKeyDefinition.paths &&
        partitionKeyDefinition.paths.length > 0) {
        const partitionKey = [];
        partitionKeyDefinition.paths.forEach((path) => {
            const pathParts = parsePath(path);
            let obj = document;
            for (const part of pathParts) {
                if (typeof obj === "object" && part in obj) {
                    obj = obj[part];
                }
                else {
                    obj = undefined;
                    break;
                }
            }
            partitionKey.push(obj);
        });
        if (partitionKey.length === 1 && partitionKey[0] === undefined) {
            return undefinedPartitionKey(partitionKeyDefinition);
        }
        return partitionKey;
    }
}
/**
 * @hidden
 */
export function undefinedPartitionKey(partitionKeyDefinition) {
    if (partitionKeyDefinition.systemKey === true) {
        return [];
    }
    else {
        return [{}];
    }
}
//# sourceMappingURL=extractPartitionKey.js.map