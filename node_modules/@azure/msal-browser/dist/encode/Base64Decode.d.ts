/**
 * Class which exposes APIs to decode base64 strings to plaintext. See here for implementation details:
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_2_%E2%80%93_JavaScript's_UTF-16_%3E_UTF-8_%3E_base64
 */
export declare class Base64Decode {
    /**
     * Returns a URL-safe plaintext decoded string from b64 encoded input.
     * @param input
     */
    decode(input: string): string;
    /**
     * Decodes base64 into Uint8Array
     * @param base64String
     * @param nBlockSize
     */
    private base64DecToArr;
    /**
     * Base64 string to array decoding helper
     * @param charNum
     */
    private b64ToUint6;
}
//# sourceMappingURL=Base64Decode.d.ts.map