import type { RouterView, RouteLocationNormalizedLoaded } from 'vue-router';
type InstanceOf<T> = T extends new (...args: any[]) => infer R ? R : never;
type RouterViewSlot = Exclude<InstanceOf<typeof RouterView>['$slots']['default'], undefined>;
export type RouterViewSlotProps = Parameters<RouterViewSlot>[0];
export declare const generateRouteKey: (routeProps: RouterViewSlotProps, override?: string | ((route: RouteLocationNormalizedLoaded) => string) | undefined) => string | false | undefined;
export declare const wrapInKeepAlive: (props: any, children: any) => {
    default: () => any;
};
export {};
