import { Logger } from "@azure/msal-common";
import { CachedKeyPair } from "../crypto/CryptoOps";
import { AsyncMemoryStorage } from "./AsyncMemoryStorage";
export declare enum CryptoKeyStoreNames {
    asymmetricKeys = "asymmetricKeys",
    symmetricKeys = "symmetricKeys"
}
/**
 * MSAL CryptoKeyStore DB Version 2
 */
export declare class CryptoKeyStore {
    asymmetricKeys: AsyncMemoryStorage<CachedKeyPair>;
    symmetricKeys: AsyncMemoryStorage<CryptoKey>;
    logger: Logger;
    constructor(logger: Logger);
    clear(): Promise<boolean>;
}
//# sourceMappingURL=CryptoKeyStore.d.ts.map