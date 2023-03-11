import type { DefineComponent } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
export type NuxtLinkOptions = {
    componentName?: string;
    externalRelAttribute?: string | null;
    activeClass?: string;
    exactActiveClass?: string;
    prefetchedClass?: string;
};
export type NuxtLinkProps = {
    to?: string | RouteLocationRaw;
    href?: string | RouteLocationRaw;
    external?: boolean;
    replace?: boolean;
    custom?: boolean;
    target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
    rel?: string | null;
    noRel?: boolean;
    prefetch?: boolean;
    noPrefetch?: boolean;
    activeClass?: string;
    exactActiveClass?: string;
    ariaCurrentValue?: string;
};
export declare function defineNuxtLink(options: NuxtLinkOptions): DefineComponent<NuxtLinkProps, {}, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<NuxtLinkProps>, {}>;
declare const _default: DefineComponent<NuxtLinkProps, {}, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<NuxtLinkProps>, {}>;
export default _default;
