<template>
  <th :aria-sort="currentSortDir" class="sortable-table-header">
    <button @click="onClick">
      <span class="label">
        <slot></slot>
      </span>
      <span
        aria-hidden="true"
        class="arrow"
        :class="{ 'arrow--visible': currentSortDir }"
        >{{ isAscending ? '▲' : '▼' }}</span
      >
    </button>
  </th>
</template>

<script setup>
import { computed, defineEmits } from 'vue';

const emit = defineEmits(['sort']);

const props = defineProps({
  currentSortDir: {
    type: String,
    default: null,
  },
});

const isAscending = computed(() => props.currentSortDir === 'ascending');

const onClick = () => {
  const newSortDir = isAscending.value ? 'descending' : 'ascending';
  emit('sort', newSortDir);
};
</script>

<style lang="scss" scoped>
.sortable-table-header {
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;

    font-weight: bold;

    .label {
      text-decoration: underline;
    }

    .arrow {
      margin-left: 2px;
      visibility: hidden;

      &.arrow--visible {
        visibility: visible;
      }
    }
  }
}
</style>
