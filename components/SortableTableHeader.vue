<template>
  <th :aria-sort="currentSortDir" class="align-baseline">
    <button @click="onClick">
      <span>
        {{ format(title) }}
      </span>
      <span
        aria-hidden="true"
        class="ml-1"
        :class="!!isSortingProperty ? 'visible text-blood' : 'invisible'"
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
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const onClick = () => {
  emit('sort', props.title);
};
</script>
