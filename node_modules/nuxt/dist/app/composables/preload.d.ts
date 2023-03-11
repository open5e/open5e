import type { Router } from 'vue-router';
/**
 * Preload a component or components that have been globally registered.
 *
 * @param components Pascal-cased name or names of components to prefetch
 */
export declare const preloadComponents: (components: string | string[]) => Promise<void>;
/**
 * Prefetch a component or components that have been globally registered.
 *
 * @param components Pascal-cased name or names of components to prefetch
 */
export declare const prefetchComponents: (components: string | string[]) => Promise<void>;
export declare function preloadRouteComponents(to: string, router?: Router & {
    _routePreloaded?: Set<string>;
    _preloadPromises?: Array<Promise<any>>;
}): Promise<void>;
