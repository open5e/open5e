import { computed, defineComponent, h, provide, reactive, onMounted, nextTick, Suspense, Transition } from "vue";
import { RouterView } from "vue-router";
import { defu } from "defu";
import { generateRouteKey, wrapInKeepAlive } from "./utils.mjs";
import { useNuxtApp } from "#app/nuxt";
import { _wrapIf } from "#app/components/utils";
import { appPageTransition as defaultPageTransition, appKeepalive as defaultKeepaliveConfig } from "#build/nuxt.config.mjs";
export default defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? defaultPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            defaultPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? defaultKeepaliveConfig,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = defineComponent({
  name: "RouteProvider",
  // TODO: Type props
  // eslint-disable-next-line vue/require-prop-types
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    let vnode;
    if (process.dev && process.client && props.hasTransition) {
      onMounted(() => {
        nextTick(() => {
          if (["#comment", "#text"].includes(vnode?.el?.nodeName)) {
            const filename = (vnode?.type).__file;
            console.warn(`[nuxt] \`${filename}\` does not have a single root node and will cause errors when navigating between routes.`);
          }
        });
      });
    }
    return () => {
      if (process.dev && process.client) {
        vnode = h(props.routeProps.Component);
        return vnode;
      }
      return h(props.routeProps.Component);
    };
  }
});
