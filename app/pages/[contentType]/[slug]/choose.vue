<template>
  <main
    v-if="matches?.length"
    class="docs-container container"
  >
    <h1>Content is now organized by game version and source</h1>
    <p class="text-sm text-granite">
      This link potentially matches multiple versions of "{{ displayName }}":
    </p>
    <ul class="mt-6 divide-y divide-fog dark:divide-granite">
      <li
        v-for="match in matches"
        :key="match.object_pk"
        class="py-4"
      >
        <h2 class="mt-1 border-none p-0 text-lg">
          <NuxtLink :to="buildSearchResultUrl(match)">
            {{ match.object_name }}
          </NuxtLink>
          ({{ match.document.name }})
        </h2>
        <p
          v-if="formatSearchResultSubtitle(match)"
          class="mt-1 text-sm text-granite"
        >
          {{ formatSearchResultSubtitle(match) }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
// Legacy-only: ambiguous flat-slug links land here to pick a source-prefixed match.
import { buildSearchResultUrl, formatSearchResultSubtitle } from '@/helpers';
import { LEGACY_CONTENT_ROUTES, resolveLegacySlug } from '@/helpers/legacyContentRoutes';

const route = useRoute();
const contentType = route.params.contentType as string;
const slug = route.params.slug as string;

const config = LEGACY_CONTENT_ROUTES[contentType];
if (!config) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}

const apiUrl = useRuntimeConfig().public.apiUrl as string;

const { data: resolution } = await useAsyncData(
  `legacy-choose:${contentType}:${slug}`,
  () => resolveLegacySlug(config, slug, apiUrl),
);

if (resolution.value?.status === 'redirect') {
  await navigateTo(resolution.value.url, { redirectCode: 301 });
}

if (resolution.value?.status === 'not_found') {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}

const matches = computed(() =>
  resolution.value?.status === 'disambiguate' ? resolution.value.matches : [],
);

const displayName = computed(() => matches.value[0]?.object_name ?? slug);

useSeoMeta({ title: () => `Choose version: ${displayName.value}` });
</script>
