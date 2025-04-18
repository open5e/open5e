<template>
  <button
    class="hidden h-8 items-center justify-center rounded-md bg-fog px-2 hover:bg-smoke dark:bg-basalt hover:dark:bg-granite lg:flex"
    @click="showEncounter"
  >
    <Icon name="heroicons:plus" />
    <span v-if="encounterStore.monsters.value.length > 0">
      Encounter ({{ encounterStore.monsters.value.length }} monsters,
      {{ encounterStore.totalXP }} XP)
    </span>
    <span v-else>Show encounter builder</span>
  </button>
</template>

<script setup lang="ts">
import { useEncounterStore } from '~/composables/useEncounter';

const encounterStore = useEncounterStore();

const showEncounter = () => {
  // You'll need to implement this based on your app's state management
  // This could be an emit, a store action, or a route change
};
</script>
