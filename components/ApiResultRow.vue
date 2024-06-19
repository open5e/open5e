<template>
  <tr>
    <th class="border-none align-top font-normal">
      <!-- Row header contains a link to article and a source tag -->
      <nuxt-link
        tag="a"
        :params="{ id: data.slug }"
        :to="`/${endpoint}/${data.slug}`"
        :prefetch="false"
      >
        {{ data.name }}
      </nuxt-link>
      <source-tag
        v-if="data.document__slug && data.document__slug !== 'wotc-srd'"
        class="hide-mobile ml-0"
        :title="data.document__title"
        :text="data.document__slug"
      />
    </th>
    <!-- Render each field defined in columns as a table cell -->
    <td v-for="field in cols" :key="field" class="capitalize">
      {{ format(data[field]) }}
    </td>
  </tr>
</template>

<script setup>
import SourceTag from './SourceTag.vue';

const props = defineProps({
  // API endpoint from which data is sourced. Used to create links
  endpoint: { type: String, default: '' },
  // Data for a specific item from the Open5e API
  data: { type: Object, default: () => {} },
  // An arr. of which fields in the data prop to render as columns
  cols: { type: Array, default: () => [] },
});

const format = (input) => {
  // parse decimals <1 as fractions
  const asFloat = parseFloat(input);
  if (asFloat && asFloat < 1 && asFloat > 0) {
    return `1/${1.0 / asFloat}`;
  }
  return input;
};
</script>
