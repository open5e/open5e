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
      <source-tag :text="result.document.key" :title="result.document.name" />
      <span
        class="font-sans text-sm uppercase text-granite before:mx-2 before:content-['|']"
      >
        {{ result.object_model.match(/[A-Z][a-z]+/g).join(' ') }}
      </span>
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
    <div
      v-if="!result.object_name.toUpperCase().includes(query.toUpperCase())"
      class="text-sm italic text-granite"
      v-html="result.highlighted"
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

function getRoute(model) {
  return ModelToRoute[model] ?? 'error';
}
</script>

<style>
.highlighted {
  @apply bg-basalt uppercase text-white dark:bg-white dark:text-black;
}
</style>
