/// <reference types="@cloudflare/workers-types" />
export interface KVOptions {
    binding?: string | KVNamespace;
}
declare const _default: (opts?: KVOptions | undefined) => import("../types").Driver;
export default _default;
