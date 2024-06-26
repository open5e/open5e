<!-- SearchResults is designed to take a single row returned by the /search API endpoint and return a list item containing a link to a page -->

<template>
  <li class="border-b py-2">
    <!-- Row title -->
    <h3 class="mt-2 flex align-middle">
      <nuxt-link
        tag="a"
        :to="`${getRoute(result.object_model)}/${result.object_pk}`"
      >
        {{ result.object_name }}
      </nuxt-link>
      <span
        class="font-sans text-sm uppercase text-granite before:mx-2 before:text-lg before:content-['|']"
      >
        {{ result.object_model }}
      </span>
    </h3>

    <!-- Row subtitle -->
    <div class="">
      <span v-if="result.object_model === 'Monster'">
        {{ `CR ${result.object.challenge_rating}` }}
      </span>
      <span v-else-if="result.object_model === 'Spell'" class="capitalize">
        {{ result.object.school }} Spell | {{ result.object.dnd_class }}
      </span>
      <span v-else-if="result.object_model === 'MagicItem'" class="capitalize">
        {{ result.object.type }} | {{ result.object.rarity }}
      </span>
      <span class="text-sm text-granite">
        (from {{ result.document.name }})</span
      >
    </div>

    <!-- include snipet if query text is not part of article title -->
    <div
      class="text-sm"
      v-if="!result.object_name.toUpperCase().includes(query.toUpperCase())"
      v-html="result.highlighted"
    />
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
  text-decoration: underline;
  text-transform: uppercase;
}
</style>
