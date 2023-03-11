import { EventHandler } from "h3";
import type { H3Event } from "h3";
export interface CacheEntry<T = any> {
    value?: T;
    expires?: number;
    mtime?: number;
    integrity?: string;
}
export interface CacheOptions<T = any> {
    name?: string;
    getKey?: (...args: any[]) => string | Promise<string>;
    transform?: (entry: CacheEntry<T>, ...args: any[]) => any;
    validate?: (entry: CacheEntry<T>) => boolean;
    shouldInvalidateCache?: (...args: any[]) => boolean;
    shouldBypassCache?: (...args: any[]) => boolean;
    group?: string;
    integrity?: any;
    maxAge?: number;
    static?: boolean;
    swr?: boolean;
    staleMaxAge?: number;
    base?: string;
}
export declare function defineCachedFunction<T = any>(fn: (...args: any[]) => T | Promise<T>, opts: CacheOptions<T>): (...args: any[]) => Promise<T | undefined>;
export declare const cachedFunction: typeof defineCachedFunction;
export interface ResponseCacheEntry<T = any> {
    body: T;
    code: number;
    headers: Record<string, string | number | string[]>;
}
export interface CachedEventHandlerOptions<T = any> extends Omit<CacheOptions<ResponseCacheEntry<T>>, "transform" | "validate"> {
    shouldInvalidateCache?: (event: H3Event) => boolean;
    shouldBypassCache?: (event: H3Event) => boolean;
    getKey?: (event: H3Event) => string | Promise<string>;
    headersOnly?: boolean;
}
export declare function defineCachedEventHandler<T = any>(handler: EventHandler<T>, opts?: CachedEventHandlerOptions<T>): EventHandler<T>;
export declare const cachedEventHandler: typeof defineCachedEventHandler;
