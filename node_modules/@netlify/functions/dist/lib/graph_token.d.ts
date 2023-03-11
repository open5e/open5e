export type GraphTokenResponseError = {
    type: 'missing-event-in-function' | 'provided-event-in-build';
    message: string;
};
export type GraphTokenResponse = {
    errors?: GraphTokenResponseError[];
    token?: string | null;
};
interface RequestHeaders {
    get(name: string): string | null;
}
interface IncomingHttpHeaders {
    [key: string]: string | string[] | undefined;
}
export interface HasHeaders {
    headers: RequestHeaders | IncomingHttpHeaders;
}
export declare const getNetlifyGraphToken: (event?: HasHeaders | null | undefined, supressLog?: boolean) => GraphTokenResponse;
export declare const getNetlifyGraphTokenForBuild: () => GraphTokenResponse;
export {};
