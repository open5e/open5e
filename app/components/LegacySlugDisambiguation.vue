<template>
  <main class="docs-container container">
    <h1>Content is now organized by game version and source</h1>
    <p class="text-sm text-granite">
      This link potentially matches multiple versions of "{{ displayName }}":
    </p>
    <ul class="mt-6 divide-y divide-fog dark:divide-granite">
      <li
        v-for="match in matches ?? []"
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
import { buildSearchResultUrl, formatSearchResultSubtitle } from '@/helpers';

const slug = useQueryParameter('id');
const matches = useLegacyDisambiguation();

const displayName = computed(() => matches.value?.[0]?.object_name ?? slug);
</script>
