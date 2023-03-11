import type { Driver } from "../types";
export interface OverlayStorageOptions {
    layers: Driver[];
}
declare const _default: (opts?: OverlayStorageOptions | undefined) => Driver;
export default _default;
