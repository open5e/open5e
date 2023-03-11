interface LoadPayloadOptions {
    fresh?: boolean;
    hash?: string;
}
export declare function loadPayload(url: string, opts?: LoadPayloadOptions): any;
export declare function preloadPayload(url: string, opts?: LoadPayloadOptions): void;
export declare function isPrerendered(): boolean;
export {};
