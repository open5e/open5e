import { createHead, useHead } from "@vueuse/head";
import { renderSSRHead } from "@unhead/ssr";
import { defineNuxtPlugin } from "#app/nuxt";
import { appHead } from "#build/nuxt.config.mjs";
export default defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.push(appHead);
  nuxtApp.vueApp.use(head);
  if (process.client) {
    let pauseDOMUpdates = true;
    const unpauseDom = () => {
      pauseDOMUpdates = false;
      head.internalHooks.callHook("entries:updated", head.unhead);
    };
    head.internalHooks.hook("dom:beforeRender", (context) => {
      context.shouldRender = !pauseDOMUpdates;
    });
    nuxtApp.hooks.hook("page:start", () => {
      pauseDOMUpdates = true;
    });
    nuxtApp.hooks.hook("page:finish", unpauseDom);
    nuxtApp.hooks.hook("app:mounted", unpauseDom);
  }
  nuxtApp._useHead = useHead;
  if (process.server) {
    nuxtApp.ssrContext.renderMeta = async () => {
      const meta = await renderSSRHead(head.unhead);
      return {
        ...meta,
        bodyScriptsPrepend: meta.bodyTagsOpen,
        // resolves naming difference with NuxtMeta and @vueuse/head
        bodyScripts: meta.bodyTags
      };
    };
  }
});
