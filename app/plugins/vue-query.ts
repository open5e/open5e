import { defineNuxtPlugin, useState } from 'nuxt/app';

import type {
  DehydratedState, VueQueryPluginOptions,
} from '@tanstack/vue-query';
import {
  dehydrate,
  hydrate,
  QueryCache,
  QueryClient,
  VueQueryPlugin,
} from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxtApp) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query');

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => showError(error)
    }),
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: false,
      }
    },
  });

  const options: VueQueryPluginOptions = { queryClient };

  nuxtApp.vueApp.use(VueQueryPlugin, options);

  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    nuxtApp.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value);
    });
  }
});