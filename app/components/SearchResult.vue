<script lang="ts">
/**
 * SearchResults.vue - Renders a single item returned by the /search endpoint.
 *   Returns an `<li>` element to be placed in a list of other results.
 *
 * -= PROPS (INPUTS) =-
 * @prop {String} query - The search query. Used for highlighting matching text
 *   in the result snippet.
 * @prop {SearchResult} result - A single search result rtn'd by /search endpoint
 *   @property {String} result.object_name - The name of the result returned
 *   @property {String} result.object_model - result's type (ie. Spell, Item)
 *   @property {Object} result.object - Extra data about the search result,
 *     varies depending on the `object_model`.
 *   @property {Object} result.document - result's source: includes 'key' and 'name'.
 *   @property {String} result.object_pk - Results UID
 *   @property {String} result.highlighted - highlighted snippet for result
 *
 * -= DEPENDENCIES =-
 * @component SourceTag – Renders info about document source of search result
 * @component MdViewer – Renders Markdown as HTML
 *
 */
</script>

<template>
  <li class="py-2 text-base">
    <!-- Row title -->
    <h3 class="mt-1 flex items-center align-middle text-xl">
      <NuxtLink
        tag="a"
        :to="buildSearchResultUrl(result)"
      >
        {{ result.object_name }}
      </NuxtLink>
      <span class="ml-2 font-sans text-sm uppercase text-granite">
        {{ formatCategory(result) }}
      </span>
      <SourceTag
        :text="result.document.key"
        :title="result.document.name"
      />
    </h3>

    <!-- Row subtitle -->

    <div
      v-if="result.object_model === 'Creature' && result.object?.cr"
      class="text-sm"
    >
      <span class="after:content-['_|_']">CR {{ parseChallengeRating(result.object.cr) }}</span>
      <span>{{ `${result.object.type} (${result.object.size})` }}</span>
    </div>

    <div
      v-if="result.object_model === 'Spell' && formatSearchResultSubtitle(result)"
      class="text-sm capitalize"
    >
      {{ formatSearchResultSubtitle(result) }}
    </div>

    <span
      v-else-if="result.object_model === 'Item' && result.object?.is_magic_item && formatSearchResultSubtitle(result)"
      class="text-sm capitalize"
    >
      {{ formatSearchResultSubtitle(result) }}
    </span>

    <!-- Ruleset caption for Rules  -->
    <div
      v-if="result.object_model === 'Rule'"
      class="text-sm capitalize italic before:not-italic before:content-['From_']"
    >
      {{ result.object_pk.split('_')[1].split('-').join(' ') }}
    </div>

    <div class="text-sm">
      <span class="after:content-[':_']">Source</span>
      <span class="font-bold">{{ result.document.name }}</span>
    </div>

    <!-- include snipet if query text is not part of article title -->
    <MdViewer
      v-if="!result.object_name.toUpperCase().includes(query.toUpperCase())"
      class="text-sm italic text-granite dark:text-granite"
      :markdown="stripMarkdownTables(result.highlighted ?? '')"
    />
  </li>
</template>

<script setup lang="ts">
import type { SearchResult } from '@/types';
import { formatSearchResultSubtitle, parseChallengeRating } from '@/helpers';
import { buildSearchResultUrl } from '@/helpers/buildSearchResultUrl';
defineProps<{
  query: string;
  result: SearchResult;
}>();

function stripMarkdownTables(text: string) {
  // Remove table row markup but keep the content
  return text
    .replace(/\|/g, ' ') // Replace pipe characters with spaces
    .replace(/(\r\n|\n|\r)/gm, ' ') // Remove line breaks
    .replace(/-{3,}/g, ''); // Remove three or more hyphens
}

// Takes the API endpoint a result is pulled from and returns
const formatCategory = (input: SearchResult) => {
  // Insert spaces into PascalCase text
  const category = input.object_model.match(/[A-Z][a-z]+/g)?.join(' ');
  // Creatures -> Monsters
  if (category === 'Creature') return 'Monster';
  // Items (Magic) -> 'Magic Item'
  if (input.object?.is_magic_item) return 'Magic Item';
  // Items (Rest) -> 'Equipment'
  if (category === 'Item') return 'Equipment';
  // Character Class -> Class OR [CLASS] Subclass
  if (category === 'Character Class') {
    if (input?.object?.subclass_of)
      return `${input.object.subclass_of.name} Subclass`;
    else return 'Class';
  }

  // Species -> Species OR [SPECIES] Subspecies
  if (input?.object?.subspecies_of)
    return `${input.object.subspecies_of.name} Subspecies`;
  return category; // BASE-CASE: return category without alteration
};
</script>

<style>
.highlighted {
  @apply bg-amber-300 px-1 text-black dark:bg-yellow-800 dark:text-white;
}
</style>
