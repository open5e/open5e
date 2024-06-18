<template>
  <th :aria-sort="currentSortDir" class="sortable-table-header">
    <button class="" @click="onClick">
      <span class="capitalize">
        {{ title.split('_').join(' ') }}
      </span>
      <span
        aria-hidden="true"
        class="arrow ml-1"
        :class="!!isSortingProperty && 'arrow--visible text-blood'"
      >
        {{ isSortingProperty !== 'ascending' ? '▲' : '▼' }}
      </span>
    </button>
  </th>
</template>

<script setup>
const emit = defineEmits(['sort']);

const props = defineProps({
  title: { type: String, default: '' },
  isSortingProperty: { type: String, default: '' },
  currentSortDir: { type: String, default: '' },
});

const onClick = () => {
  emit('sort', props.title);
};
</script>

<style lang="scss" scoped>
.arrow {
  visibility: hidden;

  &.arrow--visible {
    visibility: visible;
  }
}
</style>
