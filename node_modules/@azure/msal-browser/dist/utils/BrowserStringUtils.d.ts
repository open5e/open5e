/**
 * Utility functions for strings in a browser. See here for implementation details:
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_2_%E2%80%93_JavaScript's_UTF-16_%3E_UTF-8_%3E_base64
 */
export declare class BrowserStringUtils {
    /**
     * Converts string to Uint8Array
     * @param sDOMStr
     */
    static stringToUtf8Arr(sDOMStr: string): Uint8Array;
    /**
     * Converst string to ArrayBuffer
     * @param dataString
     */
    static stringToArrayBuffer(dataString: string): ArrayBuffer;
    /**
     * Converts Uint8Array to a string
     * @param aBytes
     */
    static utf8ArrToString(aBytes: Uint8Array): string;
    /**
     * Returns stringified jwk.
     * @param jwk
     */
    static getSortedObjectString(obj: object): string;
}
//# sourceMappingURL=BrowserStringUtils.d.ts.map