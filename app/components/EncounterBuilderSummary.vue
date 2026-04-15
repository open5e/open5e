<template>
  <button
    class="hidden h-8 items-center justify-center rounded-md px-2 transition-colors duration-500 lg:flex"
    :class="buttonClass"
    @click="$emit('show-encounter')"
  >
    <div v-if="isReady && encounterStore.monsters.value.length > 0">
      <span class="mr-1">
        <Icon name="game-icons:crossed-swords" /> Encounter |
      </span>
      <span>
        <Icon name="game-icons:imp-laugh" /> x
        {{ encounterStore.totalMonsters }} ({{
          encounterStore.difficulty.value
        }})
      </span>
    </div>
    <span v-else><Icon name="game-icons:crossed-swords" /> Encounter Builder</span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue';
import { useEncounterStore } from '~/composables/useEncounter';

const encounterStore = useEncounterStore();
const isReady = ref(false);

onMounted(() => {
  // Give Vue a chance to fully initialize reactive state
  nextTick(() => isReady.value = true);
});

const buttonClass = computed(() => {
  if (!isReady.value) return encounterStore.difficultyColors.empty;
  return encounterStore.difficultyColor.value;
});

defineEmits(['show-encounter']);
</script>
