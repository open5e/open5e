<template>
  <main class="docs-container container">
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
        <h3 class="mt-1 text-lg">
          <NuxtLink :to="buildSearchResultUrl(match)">
            {{ match.object_name }}
          </NuxtLink>
          ({{ match.document.name }})
        </h3>
        <p
          v-if="subtitle(match)"
          class="mt-1 text-sm text-granite"
        >
          {{ subtitle(match) }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import type { SearchResult } from '@/types';
import { formatSpellSubtitle } from '@/helpers';
import { buildSearchResultUrl } from '@/helpers/buildSearchResultUrl';

const props = defineProps<{
  slug: string;
  matches: SearchResult[];
}>();

const displayName = computed(() => {
  if (props.matches.length === 0) return props.slug;
  return props.matches[0].object_name;
});

function subtitle(match: SearchResult): string | null {
  if (match.object_model === 'Creature' && match.object?.cr) {
    return `CR ${match.object.cr} · ${match.object.type} (${match.object.size})`;
  }

  if (match.object_model === 'Spell') {
    return formatSpellSubtitle({
      level: match.object?.level,
      school: match.object?.school,
    });
  }

  if (match.object_model === 'Item' && match.object?.is_magic_item) {
    return `${match.object.type}, ${match.object.rarity}`;
  }

  return null;
}
</script>
