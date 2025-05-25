<script>
/**
 * SortableTableHeader.vue - A table header cell that includes sorting functionality. It displays a title with a sorting indicator (▲/▼),
 *   allowing users to sort the table by the corresponding column.
 *
 * -= PROPS (INPUTS) =-
 * @prop {String} title - Column title, appears in table header
 * @prop {String} sortBy - `key` in data to sort by when clicked. If omitted,
 *   then sorting by this column will be disabled.
 * @prop {Boolean} isSortingProperty - True if this col is currently sorting the
 *   table. It is used to highlight the sorting indicator.
 * @prop {Boolean} isSortDescending - Specifies sort direction. Controls
 *   direction of the sort indicator (▲/▼).
 * @prop {Boolean} isLeastPriority - If true, hide this col on small screens
 *
 * -= EMITS (OUTPUTS) =-
 * @emits {String} sort - Emits the `sortBy` key when user clicks the column
 *   header. Used to update data on parent component
 *
 *
 */
</script>

<template>
  <th
    :aria-sort="isSortDescending"
    class="align-baseline"
    :class="{ 'hidden sm:table-cell': isLeastPriority }"
  >
    <button
      v-if="sortBy"
      @click="onClick"
    >
      <span>
        {{ format(title) }}
      </span>
      <span
        aria-hidden="true"
        class="ml-1"
        :class="isSortingProperty ? 'visible text-blood' : 'invisible'"
      >
        {{ isSortDescending ? '▲' : '▼' }}
      </span>
    </button>
    <span v-else>
      {{ format(title) }}
    </span>
  </th>
</template>

<script setup>
const emit = defineEmits(['sort']);

const props = defineProps({
  title: { type: String, default: '' },
  sortBy: { type: String, default: '' },
  isSortingProperty: { type: Boolean, default: false },
  isSortDescending: { type: Boolean, default: false },
  isLeastPriority: { type: Boolean, default: false },
});

// a list of human-readable subsitutions
const subsitutions = {
  level_int: 'Level',
  dnd_class: 'Classes',
  cr: 'CR',
};

const format = (input) => {
  if (subsitutions[input]) {
    return subsitutions[input];
  }
  // Replace underscores w/ spaces and capitalise initials
  return input
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const onClick = () => {
  emit('sort', props.sortBy);
};
</script>
