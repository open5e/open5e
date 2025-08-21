<script>
/**
 * ApiResultRow.vue -> Sub-component of ResultsTable. Displays a single
 * result returned by the API as a a table row (<tr> element). Typically
 * contains a link to the single-view page of the API resource.
 *
 * -= PROPS (INPUTS) =-
 * @prop {Object} data – data for a single item from the Open5e API
 * @prop {Array} cols – an array specifying which table columns to render:
 *   @property {String} displayName – column name formatted to display
 *   @property {String} sortValue – column name (used for sorting)
 *   @property {Boolean?} isLeastPriority – (optional) controls whether this
 *      column is hidden on small screen
 *
 * -= DEPENDENCIES =-
 * @component SourceTag – renders doucment source UI
 */
</script>

<template>
  <tr>
    <!-- Render each field defined in columns as a table cell -->
    <td
      v-for="col in cols"
      :key="col.displayName"
      :class="{ 'hidden sm:block': col.isLeastPriority }"
    >
      <template v-if="col.customTemplate">
        <component :is="col.customTemplate(data)" />
      </template>
      <template v-else-if="col.link">
        <span>
          <NuxtLink :to="col.link(data)">
            {{ col.value(data) }}
          </NuxtLink>
          <SourceTag
            :text="data.document.key"
            :title="data.document.name"
          />
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
defineProps({
  data: { type: Object, default: () => {} }, // Open5e data to render
  cols: { type: Array, default: () => [] }, // Arr. of table columns to render
});
</script>
