<template>
  <span>
    {{ fraction(challenge) }}
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ challenge: string }>(), {
  challenge: "0",
});

const fraction = computed(() => {
  const map = {
    0.125: "1/8",
    0.25: "1/4",
    0.5: "1/2",
  };
  return map[props.challenge] || props.challenge;
});
</script>
