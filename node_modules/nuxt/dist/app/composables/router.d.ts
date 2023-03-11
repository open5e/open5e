import type { Router, RouteLocationNormalizedLoaded, NavigationGuard, RouteLocationNormalized, RouteLocationRaw, NavigationFailure } from 'vue-router';
import type { NuxtError } from './error';
export declare const useRouter: () => Router;
export declare const useRoute: () => RouteLocationNormalizedLoaded;
export declare const onBeforeRouteLeave: (guard: NavigationGuard) => void;
export declare const onBeforeRouteUpdate: (guard: NavigationGuard) => void;
export interface RouteMiddleware {
    (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>;
}
export declare const defineNuxtRouteMiddleware: (middleware: RouteMiddleware) => RouteMiddleware;
export interface AddRouteMiddlewareOptions {
    global?: boolean;
}
interface AddRouteMiddleware {
    (name: string, middleware: RouteMiddleware, options?: AddRouteMiddlewareOptions): void;
    (middleware: RouteMiddleware): void;
}
export declare const addRouteMiddleware: AddRouteMiddleware;
export interface NavigateToOptions {
    replace?: boolean;
    redirectCode?: number;
    external?: boolean;
}
export declare const navigateTo: (to: RouteLocationRaw | undefined | null, options?: NavigateToOptions) => Promise<void | NavigationFailure> | RouteLocationRaw;
/** This will abort navigation within a Nuxt route middleware handler. */
export declare const abortNavigation: (err?: string | Partial<NuxtError>) => boolean;
export declare const setPageLayout: (layout: string) => void;
export {};
