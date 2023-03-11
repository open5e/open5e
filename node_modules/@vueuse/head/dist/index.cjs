'use strict';

const vue = require('@unhead/vue');
const dom = require('@unhead/dom');
const vue$1 = require('vue');
const ssr = require('@unhead/ssr');

function createHead(initHeadObject, options) {
  const unhead = vue.createHead(options || {});
  const legacyHead = {
    unhead,
    install(app) {
      if (vue$1.version.startsWith("3")) {
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
      const api = vue.useHead(input, options2);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document, force) {
      if (force)
        dom.renderDOMHead(unhead, { document });
      else
        dom.debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document });
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

const HeadVuePlugin = vue.Vue2ProvideUnheadPlugin;
const renderHeadToString = (head) => ssr.renderSSRHead(head.unhead);

const Vue2 = vue$1.version.startsWith("2.");
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
const Head = /* @__PURE__ */ vue$1.defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Head",
  setup(_, { slots }) {
    const head = vue.injectHead();
    const obj = vue$1.ref({});
    const entry = head.push(obj);
    if (IsBrowser) {
      vue$1.onBeforeUnmount(() => {
        entry.dispose();
      });
    }
    return () => {
      vue$1.watchEffect(() => {
        if (!slots.default)
          return;
        entry.patch(vnodesToHeadObj(slots.default()));
      });
      return null;
    };
  }
});

exports.Vue2ProvideUnheadPlugin = vue.Vue2ProvideUnheadPlugin;
exports.VueHeadMixin = vue.VueHeadMixin;
exports.createHeadCore = vue.createHeadCore;
exports.injectHead = vue.injectHead;
exports.unheadVueComposablesImports = vue.unheadVueComposablesImports;
exports.useBodyAttrs = vue.useBodyAttrs;
exports.useHead = vue.useHead;
exports.useHeadSafe = vue.useHeadSafe;
exports.useHtmlAttrs = vue.useHtmlAttrs;
exports.useSeoMeta = vue.useSeoMeta;
exports.useServerBodyAttrs = vue.useServerBodyAttrs;
exports.useServerHead = vue.useServerHead;
exports.useServerHeadSafe = vue.useServerHeadSafe;
exports.useServerHtmlAttrs = vue.useServerHtmlAttrs;
exports.useServerSeoMeta = vue.useServerSeoMeta;
exports.useServerTagBase = vue.useServerTagBase;
exports.useServerTagLink = vue.useServerTagLink;
exports.useServerTagMeta = vue.useServerTagMeta;
exports.useServerTagMetaFlat = vue.useServerTagMetaFlat;
exports.useServerTagNoscript = vue.useServerTagNoscript;
exports.useServerTagScript = vue.useServerTagScript;
exports.useServerTagStyle = vue.useServerTagStyle;
exports.useServerTagTitle = vue.useServerTagTitle;
exports.useServerTitleTemplate = vue.useServerTitleTemplate;
exports.useTagBase = vue.useTagBase;
exports.useTagLink = vue.useTagLink;
exports.useTagMeta = vue.useTagMeta;
exports.useTagMetaFlat = vue.useTagMetaFlat;
exports.useTagNoscript = vue.useTagNoscript;
exports.useTagScript = vue.useTagScript;
exports.useTagStyle = vue.useTagStyle;
exports.useTagTitle = vue.useTagTitle;
exports.useTitleTemplate = vue.useTitleTemplate;
exports.Head = Head;
exports.HeadVuePlugin = HeadVuePlugin;
exports.createHead = createHead;
exports.renderHeadToString = renderHeadToString;
