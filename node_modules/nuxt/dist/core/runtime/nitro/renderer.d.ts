export interface NuxtRenderHTMLContext {
    island?: boolean;
    htmlAttrs: string[];
    head: string[];
    bodyAttrs: string[];
    bodyPrepend: string[];
    body: string[];
    bodyAppend: string[];
}
export interface NuxtIslandContext {
    id?: string;
    name: string;
    props?: Record<string, any>;
    url?: string;
}
export interface NuxtIslandResponse {
    id?: string;
    html: string;
    state: Record<string, any>;
    head: {
        link: (Record<string, string>)[];
        style: ({
            innerHTML: string;
            key: string;
        })[];
    };
}
export interface NuxtRenderResponse {
    body: string;
    statusCode: number;
    statusMessage?: string;
    headers: Record<string, string>;
}
declare const _default: any;
export default _default;
