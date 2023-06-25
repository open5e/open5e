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

<script>
export default {
  props: {
    currentSortDir: {
      type: String,
      default: null,
    },
  },
  computed: {
    isAscending() {
      return this.currentSortDir === 'ascending';
    },
  },
  methods: {
    onClick() {
      this.$emit('sort', this.isAscending ? 'descending' : 'ascending');
    },
  },
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
