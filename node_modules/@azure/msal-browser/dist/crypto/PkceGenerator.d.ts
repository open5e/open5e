import { PkceCodes } from "@azure/msal-common";
import { BrowserCrypto } from "./BrowserCrypto";
/**
 * Class which exposes APIs to generate PKCE codes and code verifiers.
 */
export declare class PkceGenerator {
    private base64Encode;
    private cryptoObj;
    constructor(cryptoObj: BrowserCrypto);
    /**
     * Generates PKCE Codes. See the RFC for more information: https://tools.ietf.org/html/rfc7636
     */
    generateCodes(): Promise<PkceCodes>;
    /**
     * Generates a random 32 byte buffer and returns the base64
     * encoded string to be used as a PKCE Code Verifier
     */
    private generateCodeVerifier;
    /**
     * Creates a base64 encoded PKCE Code Challenge string from the
     * hash created from the PKCE Code Verifier supplied
     */
    private generateCodeChallengeFromVerifier;
}
//# sourceMappingURL=PkceGenerator.d.ts.map