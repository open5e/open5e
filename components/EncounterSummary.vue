<template>
  <button
    class="hidden h-8 items-center justify-center rounded-md px-2 lg:flex"
    :class="encounterStore.difficultyColor.value"
    @click="$emit('show-encounter')"
  >
    <Icon name="game-icons:crossed-swords" />
    <span v-if="encounterStore.monsters.value.length > 0">
      {{ encounterStore.monsters.value.length }} |
      {{ encounterStore.difficulty.value }}
    </span>
    <span v-else>Show encounter builder</span>
  </button>
</template>

<script setup lang="ts">
import { useEncounterStore } from '~/composables/useEncounter';
import { usePartyStore } from '~/composables/useParty';
import { useXPCalculator } from '~/composables/useXPCalculator';

const encounterStore = useEncounterStore();
const { partyXPBudget } = usePartyStore();
const xpCalculator = useXPCalculator();

defineEmits(['show-encounter']);
</script>
