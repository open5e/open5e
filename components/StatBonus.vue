<template>
  <span>
    <span v-if="statBonus >= 0">+</span>
    <span>{{ statBonus }}</span>
  </span>
</template>

<script setup>
const props = defineProps({
  stat: { type: Number, default: 0 },
  type: { type: String, default: 'score' },
});
const statBonus = computed(() => {
  if (props.type === 'score') {
    return Math.floor((props.stat - 10) / 2);
  } else {
    return props.stat;
  }
});
</script>
