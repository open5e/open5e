<template>
  <div class="stat-group">
    <div v-for="(stat, key) in stats" :key="key" class="stat-unit">
      <span class="title-case">{{ key }}</span
      ><span>{{ stat }} (<statBonus :stat="parseInt(stat)" />)</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import StatBonus from '~/components/StatBonus';

defineProps({
  stats: {
    type: Object,
    default: () => ({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }),
  },
});
</script>

<style lang="scss" scoped>
.stat-group {
  display: inline-flex;
  flex-direction: row;

  .stat-unit {
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    align-items: center;

    .title-case {
      font-weight: bold;
    }
  }
}
</style>
