<template>
  <div class="flex gap-1">
    <button
      v-if="isInEncounter"
      class="rounded bg-red p-1 text-sm font-medium text-white hover:bg-blood/80"
      @click="removeFromEncounter"
    >
      <MinusIcon  class="size-4" />
    </button>
    <button
      class="rounded bg-red p-1 text-sm font-medium text-white hover:bg-blood/80"
      :data-testid="isInEncounter ? 'remove-from-encounter' : 'add-to-encounter'"
      @click="addToEncounter"
    >
      <PlusIcon class="size-4" />
    </button>

  </div>
</template>

<script lang="ts" setup>
import type { Monster } from '@/types';
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{ monster: Monster }>();
const encounterStore = useEncounterStore();

const isInEncounter = computed(() =>
  encounterStore.monsters.value.some(m => m.key === props.monster.key)
);

const addToEncounter = () => {
  encounterStore.addMonster(
    props.monster.key,
    props.monster.name,
    parseFloat(props.monster.challenge_rating_decimal),
    props.monster.challenge_rating_text
  );
};

const removeFromEncounter = () => {
  encounterStore.removeMonster(props.monster.key);
};

</script>