export declare const fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
export default fetch;
export declare const Headers: {
    new (init?: HeadersInit | undefined): Headers;
    prototype: Headers;
};
export declare const Request: {
    new (input: RequestInfo | URL, init?: RequestInit | undefined): Request;
    prototype: Request;
};
export declare const Response: {
    new (body?: BodyInit | null | undefined, init?: ResponseInit | undefined): Response;
    prototype: Response;
    error(): Response;
    redirect(url: string | URL, status?: number | undefined): Response;
};
