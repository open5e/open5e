<template>
  <ul class="inline-flex">
    <li
      v-for="(stat, key) in stats"
      :key="key"
      class="mr-4 flex flex-col items-center"
      @click="useDiceRoller(useFormatModifier(stat, { inputType: 'score' }))"
    >
      <span class="font-bold capitalize">{{ key }}</span>
      <span>
        {{ stat }} ({{ useFormatModifier(stat, { inputType: 'score' }) }})
      </span>
    </li>
  </ul>
</template>

<script setup>
import StatBonus from '~/components/StatBonus';

defineProps({
  stats: {
    type: Object,
    default: () => ({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }),
  },
});
</script>
