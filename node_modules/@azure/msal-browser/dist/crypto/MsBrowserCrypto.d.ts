import { ISubtleCrypto } from "./ISubtleCrypto";
export declare class MsBrowserCrypto implements ISubtleCrypto {
    getRandomValues(dataBuffer: Uint8Array): Uint8Array;
    generateKey(algorithm: RsaHashedKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair>;
    exportKey(key: CryptoKey): Promise<JsonWebKey>;
    importKey(keyData: JsonWebKey, algorithm: RsaHashedImportParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    sign(algorithm: AlgorithmIdentifier, key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
    digest(algorithm: AlgorithmIdentifier, data: Uint8Array): Promise<ArrayBuffer>;
}
//# sourceMappingURL=MsBrowserCrypto.d.ts.map