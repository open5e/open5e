import { computed, defineComponent, h, inject, nextTick, onMounted, Transition, unref } from "vue";
import { _wrapIf } from "./utils.mjs";
import { useRoute } from "#app/composables/router";
import { useRoute as useVueRouterRoute } from "#build/pages";
import layouts from "#build/layouts";
import { appLayoutTransition as defaultLayoutTransition } from "#build/nuxt.config.mjs";
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    ...process.dev ? { hasTransition: Boolean } : {}
  },
  async setup(props, context) {
    let vnode;
    if (process.dev && process.client) {
      onMounted(() => {
        nextTick(() => {
          if (props.name && ["#comment", "#text"].includes(vnode?.el?.nodeName)) {
            console.warn(`[nuxt] \`${props.name}\` layout does not have a single root node and will cause errors when navigating between routes.`);
          }
        });
      });
    }
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      if (process.dev && process.client && props.hasTransition) {
        vnode = h(LayoutComponent, context.attrs, context.slots);
        return vnode;
      }
      return h(LayoutComponent, context.attrs, context.slots);
    };
  }
});
export default defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useVueRouterRoute() : injectedRoute;
    const layout = computed(() => unref(props.name) ?? route.meta.layout ?? "default");
    let vnode;
    let _layout;
    if (process.dev && process.client) {
      onMounted(() => {
        nextTick(() => {
          if (_layout && _layout in layouts && ["#comment", "#text"].includes(vnode?.el?.nodeName)) {
            console.warn(`[nuxt] \`${_layout}\` layout does not have a single root node and will cause errors when navigating between routes.`);
          }
        });
      });
    }
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      if (process.dev && layout.value && !hasLayout && layout.value !== "default") {
        console.warn(`Invalid layout \`${layout.value}\` selected.`);
      }
      const transitionProps = route.meta.layoutTransition ?? defaultLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && {
          key: layout.value,
          name: layout.value,
          ...process.dev ? { hasTransition: !!transitionProps } : {},
          ...context.attrs
        }, context.slots).default()
      }).default();
    };
  }
});
