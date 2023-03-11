import type { Ref } from 'vue';
import type { CookieParseOptions, CookieSerializeOptions } from 'cookie-es';
type _CookieOptions = Omit<CookieSerializeOptions & CookieParseOptions, 'decode' | 'encode'>;
export interface CookieOptions<T = any> extends _CookieOptions {
    decode?(value: string): T;
    encode?(value: T): string;
    default?: () => T | Ref<T>;
    watch?: boolean | 'shallow';
}
export interface CookieRef<T> extends Ref<T> {
}
export declare function useCookie<T = string | null>(name: string, _opts?: CookieOptions<T>): CookieRef<T>;
export {};
