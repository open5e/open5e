export declare const URL: {
    new (url: string | URL, base?: string | URL | undefined): URL;
    prototype: URL;
    createObjectURL(obj: Blob | MediaSource): string;
    revokeObjectURL(url: string): void;
};
export declare const URLSearchParams: {
    new (init?: string | URLSearchParams | Record<string, string> | string[][] | undefined): URLSearchParams;
    prototype: URLSearchParams;
    toString(): string;
};
export declare const parseURL: () => any;
export declare const basicURLParse: () => any;
export declare const serializeURL: () => any;
export declare const serializeHost: () => any;
export declare const serializeInteger: () => any;
export declare const serializeURLOrigin: () => any;
export declare const setTheUsername: () => any;
export declare const setThePassword: () => any;
export declare const cannotHaveAUsernamePasswordPort: () => any;
export declare const percentDecodeBytes: () => any;
export declare const percentDecodeString: () => any;
