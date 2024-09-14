<!-- SearchResults is designed to take a single row returned by the /search API endpoint and return a list item containing a link to a page -->

<template>
  <li class="py-2 text-base">
    <!-- Row title -->
    <h3 class="mt-1 flex items-center align-middle text-xl">
      <nuxt-link tag="a" :to="formatUrl(result)">
        {{ result.object_name }}
      </nuxt-link>
      <span class="ml-2 font-sans text-sm uppercase text-granite">
        {{ formatCategory(result) }}
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
const props = defineProps({
  query: { type: String, default: '' },
  result: { type: Object, default: () => {} },
});

function stripMarkdownTables(text) {
  // Remove table row markup but keep the content
  return text
    .replace(/\|/g, ' ') // Replace pipe characters with spaces
    .replace(/(\r\n|\n|\r)/gm, ' ') // Remove line breaks
    .replace(/-{3,}/g, ''); // Remove three or more hyphens
}

const endpoints = {
  Creature: 'monsters',
  Spell: 'spells',
  Race: 'races',
  Section: 'sections',
  Item: 'magic-items',
  Feat: 'feats',
  Background: 'backgrounds',
  CharacterClass: 'classes',
};

const formatUrl = (input) => {
  let baseUrl = endpoints[input.object_model] ?? input.object_model;
  if (input?.object?.subclass_of) baseUrl += `/${input.object.subclass_of.key}`;
  baseUrl += `/${input.object_pk}`;
  return baseUrl;
};

const formatCategory = (input) => {
  const category = input.object_model.match(/[A-Z][a-z]+/g).join(' ');
  if (category === 'Creature') return 'Monster';
  if (category === 'Character Class') {
    if (input?.object?.subclass_of)
      return `${input.object.subclass_of.name} Subclass`;
    return 'Class';
  }

  return category; // base-case: return category without substitutions
};
</script>

<style>
.highlighted {
  @apply bg-amber-300 px-1 text-black dark:bg-yellow-800 dark:text-white;
}
</style>
