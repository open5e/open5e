<!-- SearchResults is designed to take a single row returned by the /search API endpoint and return a list item containing a link to a page -->

<template>
  <li class="py-2 text-base">
    <!-- Row title -->
    <h3 class="mt-1 flex items-center align-middle text-xl">
      <nuxt-link
        tag="a"
        :to="`${getRoute(result.object_model)}/${result.object_pk}`"
      >
        {{ result.object_name }}
      </nuxt-link>
      <span class="ml-2 font-sans text-sm uppercase text-granite">
        {{ result.object_model.match(/[A-Z][a-z]+/g).join(' ') }}
      </span>
      <source-tag :text="result.document.key" :title="result.document.name" />
    </h3>

    <!-- Row subtitle -->
    <div>
      <span v-if="result.object_model === 'Monster'">
        {{
          `
           CR ${result.object.challenge_rating} | 
           HP ${result.object.hit_points},
           AC ${result.object.armor_class}
           `
        }}
      </span>
      <span v-else-if="result.object_model === 'Spell'" class="capitalize">
        {{ result.object.school }} Spell | {{ result.object.dnd_class }}
      </span>
      <span v-else-if="result.object_model === 'MagicItem'" class="capitalize">
        {{ result.object.type }}, {{ result.object.rarity }}
      </span>
    </div>

    <!-- include snipet if query text is not part of article title -->
    <md-viewer
      v-if="!result.object_name.toUpperCase().includes(query.toUpperCase())"
      class="text-sm italic text-basalt dark:text-granite"
      :markdown="stripMarkdownTables(result.highlighted)"
    />
    <!-- include article source -->
    <div class="text-sm">(from {{ result.document.name }})</div>
  </li>
</template>

<script setup>
defineProps({
  query: {
    type: String,
    default: '',
  },
  result: {
    type: Array,
    default: () => [],
  },
});

const ModelToRoute = {
  Monster: 'monsters',
  Spell: 'spells',
  Race: 'races',
  Section: 'sections',
  MagicItem: 'magic-items',
  Feat: 'feats',
  Background: 'backgrounds',
  CharClass: 'classes',
};

function stripMarkdownTables(text) {
  // Remove table row markup but keep the content
  return text
    .replace(/\|/g, ' ') // Replace pipe characters with spaces
    .replace(/(\r\n|\n|\r)/gm, ' ') // Remove line breaks
    .replace(/-{3,}/g, ''); // Remove three or more hyphens
}

function getRoute(model) {
  return ModelToRoute[model] ?? 'error';
}
</script>

<style>
.highlighted {
  @apply bg-amber-300 px-1 text-black dark:bg-yellow-800 dark:text-white;
}
</style>
