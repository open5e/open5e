import type { Ref, WatchSource } from 'vue';
import type { NuxtApp } from '../nuxt';
export type _Transform<Input = any, Output = any> = (input: Input) => Output;
export type PickFrom<T, K extends Array<string>> = T extends Array<any> ? T : T extends Record<string, any> ? keyof T extends K[number] ? T : Pick<T, K[number]> : T;
export type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : string : never>;
export type KeyOfRes<Transform extends _Transform> = KeysOf<ReturnType<Transform>>;
type MultiWatchSources = (WatchSource<unknown> | object)[];
export interface AsyncDataOptions<DataT, Transform extends _Transform<DataT, any> = _Transform<DataT, DataT>, PickKeys extends KeyOfRes<_Transform> = KeyOfRes<Transform>> {
    server?: boolean;
    lazy?: boolean;
    default?: () => DataT | Ref<DataT> | null;
    transform?: Transform;
    pick?: PickKeys;
    watch?: MultiWatchSources;
    immediate?: boolean;
}
export interface AsyncDataExecuteOptions {
    _initial?: boolean;
    /**
     * Force a refresh, even if there is already a pending request. Previous requests will
     * not be cancelled, but their result will not affect the data/pending state - and any
     * previously awaited promises will not resolve until this new request resolves.
     */
    dedupe?: boolean;
}
export interface _AsyncData<DataT, ErrorT> {
    data: Ref<DataT | null>;
    pending: Ref<boolean>;
    refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>;
    execute: (opts?: AsyncDataExecuteOptions) => Promise<void>;
    error: Ref<ErrorT | null>;
}
export type AsyncData<Data, Error> = _AsyncData<Data, Error> & Promise<_AsyncData<Data, Error>>;
export declare function useAsyncData<DataT, DataE = Error, Transform extends _Transform<DataT> = _Transform<DataT, DataT>, PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>>(handler: (ctx?: NuxtApp) => Promise<DataT>, options?: AsyncDataOptions<DataT, Transform, PickKeys>): AsyncData<PickFrom<ReturnType<Transform>, PickKeys>, DataE | null>;
export declare function useAsyncData<DataT, DataE = Error, Transform extends _Transform<DataT> = _Transform<DataT, DataT>, PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>>(key: string, handler: (ctx?: NuxtApp) => Promise<DataT>, options?: AsyncDataOptions<DataT, Transform, PickKeys>): AsyncData<PickFrom<ReturnType<Transform>, PickKeys>, DataE | null>;
export declare function useLazyAsyncData<DataT, DataE = Error, Transform extends _Transform<DataT> = _Transform<DataT, DataT>, PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>>(handler: (ctx?: NuxtApp) => Promise<DataT>, options?: Omit<AsyncDataOptions<DataT, Transform, PickKeys>, 'lazy'>): AsyncData<PickFrom<ReturnType<Transform>, PickKeys>, DataE | null>;
export declare function useLazyAsyncData<DataT, DataE = Error, Transform extends _Transform<DataT> = _Transform<DataT, DataT>, PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>>(key: string, handler: (ctx?: NuxtApp) => Promise<DataT>, options?: Omit<AsyncDataOptions<DataT, Transform, PickKeys>, 'lazy'>): AsyncData<PickFrom<ReturnType<Transform>, PickKeys>, DataE | null>;
export declare function useNuxtData<DataT = any>(key: string): {
    data: Ref<DataT | null>;
};
export declare function refreshNuxtData(keys?: string | string[]): Promise<void>;
export declare function clearNuxtData(keys?: string | string[] | ((key: string) => boolean)): void;
export {};
