/**
 * Class which exposes APIs to encode plaintext to base64 encoded string. See here for implementation details:
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_2_%E2%80%93_JavaScript's_UTF-16_%3E_UTF-8_%3E_base64
 */
export declare class Base64Encode {
    /**
     * Returns URL Safe b64 encoded string from a plaintext string.
     * @param input
     */
    urlEncode(input: string): string;
    /**
     * Returns URL Safe b64 encoded string from an int8Array.
     * @param inputArr
     */
    urlEncodeArr(inputArr: Uint8Array): string;
    /**
     * Returns b64 encoded string from plaintext string.
     * @param input
     */
    encode(input: string): string;
    /**
     * Base64 encode byte array
     * @param aBytes
     */
    private base64EncArr;
    /**
     * Base64 string to array encoding helper
     * @param nUint6
     */
    private uint6ToB64;
}
//# sourceMappingURL=Base64Encode.d.ts.map