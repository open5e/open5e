import type { H3Event } from 'h3';
import type { NuxtApp } from '../nuxt';
export declare function useRequestHeaders<K extends string = string>(include: K[]): Record<Lowercase<K>, string | undefined>;
export declare function useRequestHeaders(): Readonly<Record<string, string | undefined>>;
export declare function useRequestEvent(nuxtApp?: NuxtApp): H3Event;
export declare function useRequestFetch(): typeof global.$fetch;
export declare function setResponseStatus(code: number, message?: string): void;
