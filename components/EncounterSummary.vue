<template>
  <button
    class="hidden h-8 items-center justify-center rounded-md px-2 transition-colors duration-500 lg:flex"
    :class="encounterStore.difficultyColor.value"
    @click="$emit('show-encounter')"
  >
    <div v-if="encounterStore.monsters.value.length > 0">
      <span class="mr-1"
        ><Icon name="game-icons:crossed-swords" /> Encounter |</span
      >
      <span>
        <Icon name="game-icons:imp-laugh" /> x
        {{ encounterStore.totalMonsters }} ({{
          encounterStore.difficulty.value
        }})
      </span>
    </div>
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
