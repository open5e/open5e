import type { App, onErrorCaptured, VNode, Ref } from 'vue';
import type { Hookable } from 'hookable';
import type { SSRContext } from 'vue-bundle-renderer/runtime';
import type { H3Event } from 'h3';
import type { NuxtIslandContext } from '../core/runtime/nitro/renderer';
import type { RuntimeConfig, AppConfigInput } from 'nuxt/schema';
type NuxtMeta = {
    htmlAttrs?: string;
    headAttrs?: string;
    bodyAttrs?: string;
    headTags?: string;
    bodyScriptsPrepend?: string;
    bodyScripts?: string;
};
type HookResult = Promise<void> | void;
type AppRenderedContext = {
    ssrContext: NuxtApp['ssrContext'];
};
export interface RuntimeNuxtHooks {
    'app:created': (app: App<Element>) => HookResult;
    'app:beforeMount': (app: App<Element>) => HookResult;
    'app:mounted': (app: App<Element>) => HookResult;
    'app:rendered': (ctx: AppRenderedContext) => HookResult;
    'app:redirected': () => HookResult;
    'app:suspense:resolve': (Component?: VNode) => HookResult;
    'app:error': (err: any) => HookResult;
    'app:error:cleared': (options: {
        redirect?: string;
    }) => HookResult;
    'app:chunkError': (options: {
        error: any;
    }) => HookResult;
    'app:data:refresh': (keys?: string[]) => HookResult;
    'link:prefetch': (link: string) => HookResult;
    'page:start': (Component?: VNode) => HookResult;
    'page:finish': (Component?: VNode) => HookResult;
    'page:transition:finish': (Component?: VNode) => HookResult;
    'vue:setup': () => void;
    'vue:error': (...args: Parameters<Parameters<typeof onErrorCaptured>[0]>) => HookResult;
}
export interface NuxtSSRContext extends SSRContext {
    url: string;
    event: H3Event;
    runtimeConfig: RuntimeConfig;
    noSSR: boolean;
    /** whether we are rendering an SSR error */
    error?: boolean;
    nuxt: _NuxtApp;
    payload: _NuxtApp['payload'];
    teleports?: Record<string, string>;
    renderMeta?: () => Promise<NuxtMeta> | NuxtMeta;
    islandContext?: NuxtIslandContext;
}
interface _NuxtApp {
    vueApp: App<Element>;
    globalName: string;
    hooks: Hookable<RuntimeNuxtHooks>;
    hook: _NuxtApp['hooks']['hook'];
    callHook: _NuxtApp['hooks']['callHook'];
    [key: string]: any;
    _asyncDataPromises: Record<string, Promise<any> | undefined>;
    _asyncData: Record<string, {
        data: Ref<any>;
        pending: Ref<boolean>;
        error: Ref<any>;
    } | undefined>;
    isHydrating?: boolean;
    deferHydration: () => () => void | Promise<void>;
    ssrContext?: NuxtSSRContext;
    payload: {
        serverRendered?: boolean;
        prerenderedAt?: number;
        data: Record<string, any>;
        state: Record<string, any>;
        rendered?: Function;
        error?: Error | {
            url: string;
            statusCode: number;
            statusMessage: string;
            message: string;
            description: string;
            data?: any;
        } | null;
        [key: string]: any;
    };
    static: {
        data: Record<string, any>;
    };
    provide: (name: string, value: any) => void;
}
export interface NuxtApp extends _NuxtApp {
}
export declare const NuxtPluginIndicator = "__nuxt_plugin";
export interface Plugin<Injections extends Record<string, any> = Record<string, any>> {
    (nuxt: _NuxtApp): Promise<void> | Promise<{
        provide?: Injections;
    }> | void | {
        provide?: Injections;
    };
    [NuxtPluginIndicator]?: true;
}
export interface CreateOptions {
    vueApp: NuxtApp['vueApp'];
    ssrContext?: NuxtApp['ssrContext'];
    globalName?: NuxtApp['globalName'];
}
export declare function createNuxtApp(options: CreateOptions): NuxtApp;
export declare function applyPlugin(nuxtApp: NuxtApp, plugin: Plugin): Promise<void>;
export declare function applyPlugins(nuxtApp: NuxtApp, plugins: Plugin[]): Promise<void>;
export declare function normalizePlugins(_plugins: Plugin[]): Plugin<Record<string, any>>[];
export declare function defineNuxtPlugin<T extends Record<string, any>>(plugin: Plugin<T>): Plugin<T>;
export declare function isNuxtPlugin(plugin: unknown): boolean;
/**
 * Ensures that the setup function passed in has access to the Nuxt instance via `useNuxt`.
 *
 * @param nuxt A Nuxt instance
 * @param setup The function to call
 */
export declare function callWithNuxt<T extends (...args: any[]) => any>(nuxt: NuxtApp | _NuxtApp, setup: T, args?: Parameters<T>): ReturnType<T> | Promise<ReturnType<T>>;
/**
 * Returns the current Nuxt instance.
 */
export declare function useNuxtApp(): NuxtApp;
export declare function useRuntimeConfig(): RuntimeConfig;
export declare function defineAppConfig<C extends AppConfigInput>(config: C): C;
export {};
