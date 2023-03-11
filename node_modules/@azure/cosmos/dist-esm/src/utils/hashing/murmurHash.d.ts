/// <reference types="node" />
declare function x86Hash32(bytes: Buffer, seed?: number): number;
declare function x86Hash128(bytes: Buffer, seed?: number): string;
declare function x64Hash128(bytes: Buffer, seed?: number): string;
export declare function reverse(buff: Buffer): Buffer;
declare const _default: {
    version: string;
    x86: {
        hash32: typeof x86Hash32;
        hash128: typeof x86Hash128;
    };
    x64: {
        hash128: typeof x64Hash128;
    };
    inputValidation: boolean;
};
export default _default;
//# sourceMappingURL=murmurHash.d.ts.map