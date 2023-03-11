type Fetch = typeof globalThis.fetch;
type RequestInfo = globalThis.RequestInfo;
type RequestInit = globalThis.RequestInit;
type Response = globalThis.Response;

interface ResponseMap {
    blob: Blob;
    text: string;
    arrayBuffer: ArrayBuffer;
    stream: ReadableStream<Uint8Array>;
}
type ResponseType = keyof ResponseMap | "json";
type MappedType<R extends ResponseType, JsonType = any> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;

interface CreateFetchOptions {
    defaults?: FetchOptions;
    fetch: Fetch;
    Headers: typeof Headers;
}
type FetchRequest = RequestInfo;
interface FetchResponse<T> extends Response {
    _data?: T;
}
interface SearchParameters {
    [key: string]: any;
}
interface FetchContext<T = any, R extends ResponseType = ResponseType> {
    request: FetchRequest;
    options: FetchOptions<R>;
    response?: FetchResponse<T>;
    error?: Error;
}
interface FetchOptions<R extends ResponseType = ResponseType> extends Omit<RequestInit, "body"> {
    baseURL?: string;
    body?: RequestInit["body"] | Record<string, any>;
    params?: SearchParameters;
    query?: SearchParameters;
    parseResponse?: (responseText: string) => any;
    responseType?: R;
    response?: boolean;
    retry?: number | false;
    onRequest?(context: FetchContext): Promise<void> | void;
    onRequestError?(context: FetchContext & {
        error: Error;
    }): Promise<void> | void;
    onResponse?(context: FetchContext & {
        response: FetchResponse<R>;
    }): Promise<void> | void;
    onResponseError?(context: FetchContext & {
        response: FetchResponse<R>;
    }): Promise<void> | void;
}
interface $Fetch {
    <T = any, R extends ResponseType = "json">(request: FetchRequest, options?: FetchOptions<R>): Promise<MappedType<R, T>>;
    raw<T = any, R extends ResponseType = "json">(request: FetchRequest, options?: FetchOptions<R>): Promise<FetchResponse<MappedType<R, T>>>;
    native: Fetch;
    create(defaults: FetchOptions): $Fetch;
}
declare function createFetch(globalOptions: CreateFetchOptions): $Fetch;

declare class FetchError<T = any> extends Error {
    name: string;
    request?: FetchRequest;
    response?: FetchResponse<T>;
    data?: T;
    status?: number;
    statusText?: string;
    statusCode?: number;
    statusMessage?: string;
}
declare function createFetchError<T = any>(request: FetchRequest, error?: Error, response?: FetchResponse<T>): FetchError<T>;

export { $Fetch as $, CreateFetchOptions as C, FetchRequest as F, SearchParameters as S, FetchResponse as a, FetchContext as b, FetchOptions as c, createFetch as d, FetchError as e, createFetchError as f };
