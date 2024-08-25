<template>
  <tr>
    <!-- Render each field defined in columns as a table cell -->
    <td v-for="col in cols" :key="col.displayName" class="capitalize">
      <template v-if="col.link">
        <nuxt-link :to="col.link(data)">
          {{ col.value(data) }}
        </nuxt-link>
      </template>
      <template v-else>
        {{ col.value(data) }}
      </template>
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

// Result UID has a different btwn API V1 & V2 - handle both 'key' & 'slug'
const slug = props.data.key ?? props.data.slug;

const format = (input) => {
  // parse decimals <1 as fractions
  const asFloat = parseFloat(input);
  if (asFloat && asFloat < 1 && asFloat > 0) {
    return `1/${1.0 / asFloat}`;
  }
  return input;
};
</script>
