// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { doubleToByteArrayJSBI } from "./encoding/number";
import { BytePrefix } from "./encoding/prefix";
import MurmurHash from "./murmurHash";
export function hashV2PartitionKey(partitionKey) {
    const toHash = prefixKeyByType(partitionKey);
    const hash = MurmurHash.x64.hash128(toHash);
    const reverseBuff = reverse(Buffer.from(hash, "hex"));
    reverseBuff[0] &= 0x3f;
    return reverseBuff.toString("hex").toUpperCase();
}
function prefixKeyByType(key) {
    let bytes;
    switch (typeof key) {
        case "string": {
            bytes = Buffer.concat([
                Buffer.from(BytePrefix.String, "hex"),
                Buffer.from(key),
                Buffer.from(BytePrefix.Infinity, "hex"),
            ]);
            return bytes;
        }
        case "number": {
            const numberBytes = doubleToByteArrayJSBI(key);
            bytes = Buffer.concat([Buffer.from(BytePrefix.Number, "hex"), numberBytes]);
            return bytes;
        }
        case "boolean": {
            const prefix = key ? BytePrefix.True : BytePrefix.False;
            return Buffer.from(prefix, "hex");
        }
        case "object": {
            if (key === null) {
                return Buffer.from(BytePrefix.Null, "hex");
            }
            return Buffer.from(BytePrefix.Undefined, "hex");
        }
        case "undefined": {
            return Buffer.from(BytePrefix.Undefined, "hex");
        }
        default:
            throw new Error(`Unexpected type: ${typeof key}`);
    }
}
export function reverse(buff) {
    const buffer = Buffer.allocUnsafe(buff.length);
    for (let i = 0, j = buff.length - 1; i <= j; ++i, --j) {
        buffer[i] = buff[j];
        buffer[j] = buff[i];
    }
    return buffer;
}
//# sourceMappingURL=v2.js.map