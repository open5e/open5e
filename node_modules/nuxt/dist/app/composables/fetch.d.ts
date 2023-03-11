import type { FetchError } from 'ofetch';
import type { TypedInternalResponse, NitroFetchOptions, NitroFetchRequest, AvailableRouterMethod } from 'nitropack';
import type { Ref } from 'vue';
import type { AsyncDataOptions, _Transform, KeyOfRes, AsyncData, PickFrom } from './asyncData';
export type FetchResult<ReqT extends NitroFetchRequest, M extends AvailableRouterMethod<ReqT>> = TypedInternalResponse<ReqT, unknown, M>;
type ComputedOptions<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends Function ? T[K] : T[K] extends Record<string, any> ? ComputedOptions<T[K]> | Ref<T[K]> | T[K] : Ref<T[K]> | T[K];
};
type ComputedFetchOptions<R extends NitroFetchRequest, M extends AvailableRouterMethod<R>> = ComputedOptions<NitroFetchOptions<R, M>>;
export interface UseFetchOptions<DataT, Transform extends _Transform<DataT, any> = _Transform<DataT, DataT>, PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>, R extends NitroFetchRequest = string & {}, M extends AvailableRouterMethod<R> = AvailableRouterMethod<R>> extends AsyncDataOptions<DataT, Transform, PickKeys>, ComputedFetchOptions<R, M> {
    key?: string;
    $fetch?: typeof globalThis.$fetch;
}
export declare function useFetch<ResT = void, ErrorT = FetchError, ReqT extends NitroFetchRequest = NitroFetchRequest, Method extends AvailableRouterMethod<ReqT> = 'get' extends AvailableRouterMethod<ReqT> ? 'get' : AvailableRouterMethod<ReqT>, _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT, Transform extends (res: _ResT) => any = (res: _ResT) => _ResT, PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>>(request: Ref<ReqT> | ReqT | (() => ReqT), opts?: UseFetchOptions<_ResT, Transform, PickKeys, ReqT, Method>): AsyncData<PickFrom<ReturnType<Transform>, PickKeys>, ErrorT | null>;
export declare function useLazyFetch<ResT = void, ErrorT = FetchError, ReqT extends NitroFetchRequest = NitroFetchRequest, Method extends AvailableRouterMethod<ReqT> = 'get' extends AvailableRouterMethod<ReqT> ? 'get' : AvailableRouterMethod<ReqT>, _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT, Transform extends (res: _ResT) => any = (res: _ResT) => _ResT, PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>>(request: Ref<ReqT> | ReqT | (() => ReqT), opts?: Omit<UseFetchOptions<_ResT, Transform, PickKeys, Method>, 'lazy'>): AsyncData<PickFrom<ReturnType<Transform>, PickKeys>, ErrorT | null>;
export {};
