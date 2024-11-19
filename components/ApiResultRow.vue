<template>
  <tr>
    <!-- Render each field defined in columns as a table cell -->
    <td
      v-for="col in cols"
      :key="col.displayName"
    >
      <template v-if="col.link">
        <span>
          <nuxt-link :to="col.link(data)">
            {{ col.value(data) }}
          </nuxt-link>
          <source-tag
            :text="data.document.key"
            :title="data.document.name"
          />
        </span>
      </template>
      <!-- If data is boolean, display as √ or -, not true or false  -->
      <template v-else-if="typeof col.value(data) === 'boolean'">
        <span>{{ col.value(data) ? "√" : "-" }}</span>
      </template>
      <template v-else>
        {{ col.value(data) }}
      </template>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  data: { type: Object, default: () => {} }, // Open5e data to render
  cols: { type: Array, default: () => [] }, // Arr. of table columns to render
})
</script>
