<template>
  <tr>
    <!-- Render each field defined in columns as a table cell -->
    <td v-for="col in cols" :key="col.displayName">
      <template v-if="col.link">
        <span>
          <nuxt-link :to="col.link(data)">
            {{ col.value(data) }}
          </nuxt-link>
          <source-tag :text="slug" :title="data.document.name" />
        </span>
      </template>
      <!-- If data is boolean, display as √ or -, not true or false  -->
      <template v-else-if="typeof col.value(data) === 'boolean'">
        <span>{{ col.value(data) ? '√' : '-' }}</span>
      </template>
      <template v-else>
        {{ col.value(data) }}
      </template>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  data: { type: Object, default: () => {} }, // Open5e data to render
  cols: { type: Array, default: () => [] }, // Arr. of table columns to render
});

// Workaround for API V2 no returning Document 'key'
// Extrapolate key from 'url'
const slug = computed(() =>
  props.data.document.url
    .split('/')
    .filter((exists) => exists)
    .pop()
);
</script>
