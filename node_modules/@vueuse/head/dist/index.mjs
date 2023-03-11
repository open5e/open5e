import { createHead as createHead$1, useHead, Vue2ProvideUnheadPlugin, injectHead } from '@unhead/vue';
export { Vue2ProvideUnheadPlugin, VueHeadMixin, createHeadCore, injectHead, unheadVueComposablesImports, useBodyAttrs, useHead, useHeadSafe, useHtmlAttrs, useSeoMeta, useServerBodyAttrs, useServerHead, useServerHeadSafe, useServerHtmlAttrs, useServerSeoMeta, useServerTagBase, useServerTagLink, useServerTagMeta, useServerTagMetaFlat, useServerTagNoscript, useServerTagScript, useServerTagStyle, useServerTagTitle, useServerTitleTemplate, useTagBase, useTagLink, useTagMeta, useTagMetaFlat, useTagNoscript, useTagScript, useTagStyle, useTagTitle, useTitleTemplate } from '@unhead/vue';
import { renderDOMHead, debouncedRenderDOMHead } from '@unhead/dom';
import { version, defineComponent, ref, onBeforeUnmount, watchEffect } from 'vue';
import { renderSSRHead } from '@unhead/ssr';

function createHead(initHeadObject, options) {
  const unhead = createHead$1(options || {});
  const legacyHead = {
    unhead,
    install(app) {
      if (version.startsWith("3")) {
        app.config.globalProperties.$head = unhead;
        app.provide("usehead", unhead);
      }
    },
    use(plugin) {
      unhead.use(plugin);
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options2) {
      return unhead.push(input, options2);
    },
    addEntry(input, options2) {
      return unhead.push(input, options2);
    },
    addHeadObjs(input, options2) {
      return unhead.push(input, options2);
    },
    addReactiveEntry(input, options2) {
      const api = useHead(input, options2);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document, force) {
      if (force)
        renderDOMHead(unhead, { document });
      else
        debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}

const HeadVuePlugin = Vue2ProvideUnheadPlugin;
const renderHeadToString = (head) => renderSSRHead(head.unhead);

const Vue2 = version.startsWith("2.");
const IsBrowser = typeof window !== "undefined";

const addVNodeToHeadObj = (node, obj) => {
  const nodeType = Vue2 ? node.tag : node.type;
  const type = nodeType === "html" ? "htmlAttrs" : nodeType === "body" ? "bodyAttrs" : nodeType;
  if (typeof type !== "string" || !(type in obj))
    return;
  const nodeData = Vue2 ? node.data : node;
  const props = (Vue2 ? nodeData.attrs : node.props) || {};
  if (Vue2) {
    if (nodeData.staticClass)
      props.class = nodeData.staticClass;
    if (nodeData.staticStyle)
      props.style = Object.entries(nodeData.staticStyle).map(([key, value]) => `${key}:${value}`).join(";");
  }
  if (node.children) {
    const childrenAttr = Vue2 ? "text" : "children";
    props.children = Array.isArray(node.children) ? node.children[0][childrenAttr] : node[childrenAttr];
  }
  if (Array.isArray(obj[type]))
    obj[type].push(props);
  else if (type === "title")
    obj.title = props.children;
  else
    obj[type] = props;
};
const vnodesToHeadObj = (nodes) => {
  const obj = {
    title: void 0,
    htmlAttrs: void 0,
    bodyAttrs: void 0,
    base: void 0,
    meta: [],
    link: [],
    style: [],
    script: [],
    noscript: []
  };
  for (const node of nodes) {
    if (typeof node.type === "symbol" && Array.isArray(node.children)) {
      for (const childNode of node.children)
        addVNodeToHeadObj(childNode, obj);
    } else {
      addVNodeToHeadObj(node, obj);
    }
  }
  return obj;
};
const Head = /* @__PURE__ */ defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Head",
  setup(_, { slots }) {
    const head = injectHead();
    const obj = ref({});
    const entry = head.push(obj);
    if (IsBrowser) {
      onBeforeUnmount(() => {
        entry.dispose();
      });
    }
    return () => {
      watchEffect(() => {
        if (!slots.default)
          return;
        entry.patch(vnodesToHeadObj(slots.default()));
      });
      return null;
    };
  }
});

export { Head, HeadVuePlugin, createHead, renderHeadToString };
