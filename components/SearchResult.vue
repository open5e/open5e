<script>
/**
 * SearchResults.vue - Renders a single item returned by the /search endpoint.
 *   Returns an `<li>` element to be placed in a list of other results.
 *
 * -= PROPS (INPUTS) =-
 * @prop {String} query - The search query. Used for highlighting matching text
 *   in the result snippet.
 * @prop {Object} result - A single search result rtn'd by /search endpoint
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
      <nuxt-link tag="a" :to="formatUrl(result)">
        {{ result.object_name }}
      </nuxt-link>
      <span class="ml-2 font-sans text-sm uppercase text-granite">
        {{ formatCategory(result) }}
      </span>
      <source-tag :text="result.document.key" :title="result.document.name" />
    </h3>

    <!-- Row subtitle -->

    <div
      v-if="result.object_model === 'Creature' && result.object?.cr"
      class="text-sm"
    >
      <span class="after:content-['_|_']">CR {{ result.object.cr }}</span>
      <span>{{ `${result.object.type} (${result.object.size})` }}</span>
    </div>

    <div v-if="result.object_model === 'Spell'" class="text-sm capitalize">
      {{
        useFormatSpellSubtitle({
          level: result.object.level,
          school: result.object.school,
        })
      }}
    </div>

    <span
      v-else-if="result.object_model === 'Item' && result.object.is_magic_item"
      class="text-sm capitalize"
    >
      {{ `${result.object.type}, ${result.object.rarity}` }}
    </span>

    <!-- include article source -->
    <div class="text-sm">
      <span class="after:content-[':_']">Source</span>
      <span class="font-bold">{{ result.document.name }}</span>
    </div>

    <!-- include snipet if query text is not part of article title -->
    <md-viewer
      v-if="!result.object_name.toUpperCase().includes(query.toUpperCase())"
      class="text-sm italic text-granite dark:text-granite"
      :markdown="stripMarkdownTables(result.highlighted)"
    />
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

// Look-up Table: mapping API endpoints to website routes
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

// Takes a search result and generates its URL on the Open5e website
const formatUrl = (input) => {
  let baseUrl = endpoints[input.object_model] ?? input.object_model;

  // non-magic items link to /equipment route
  if (baseUrl === 'magic-items' && !input?.object?.is_magic_item)
    baseUrl = 'equipment';

  // subclass urls must be prepended by their base-class
  if (input?.object?.subclass_of) baseUrl += `/${input.object.subclass_of.key}`;

  // subraces link to their base-race
  if (input?.object?.subrace_of)
    return `${baseUrl}/${input.object.subrace_of.key}`;

  return `${baseUrl}/${input.object_pk}`;
};

// Takes the API endpoint a result is pulled from and returns
const formatCategory = (input) => {
  // Insert spaces into PascalCase text
  const category = input.object_model.match(/[A-Z][a-z]+/g).join(' ');
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
  // Race -> Race OR [RACE] Subrace
  if (input?.object?.subrace_of)
    return `${input.object.subrace_of.name} Subrace`;
  return category; // BASE-CASE: return category without alteration

  // Non-magic items -> Equipment
};
</script>

<style>
.highlighted {
  @apply bg-amber-300 px-1 text-black dark:bg-yellow-800 dark:text-white;
}
</style>
