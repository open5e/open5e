import { IGuidGenerator } from "@azure/msal-common";
import { BrowserCrypto } from "./BrowserCrypto";
export declare class GuidGenerator implements IGuidGenerator {
    private cryptoObj;
    constructor(cryptoObj: BrowserCrypto);
    generateGuid(): string;
    /**
     * verifies if a string is  GUID
     * @param guid
     */
    isGuid(guid: string): boolean;
}
//# sourceMappingURL=GuidGenerator.d.ts.map