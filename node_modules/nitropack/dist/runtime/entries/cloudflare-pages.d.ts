import "#internal/nitro/virtual/polyfill";
/** @see https://developers.cloudflare.com/pages/platform/functions/#writing-your-first-function */
interface CFRequestContext {
    /** same as existing Worker API */
    request: any;
    /** same as existing Worker API */
    env: any;
    /** if filename includes [id] or [[path]] **/
    params: any;
    /** Same as ctx.waitUntil in existing Worker API */
    waitUntil: any;
    /** Used for middleware or to fetch assets */
    next: any;
    /** Arbitrary space for passing data between middlewares */
    data: any;
}
export declare function onRequest(ctx: CFRequestContext): Promise<any>;
export {};
