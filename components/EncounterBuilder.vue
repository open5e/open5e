<template>
  <div class="mx-2 rounded-lg bg-white p-4 dark:bg-gray-800">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="my-2 inline-block text-xl font-bold">
        <Icon name="game-icons:crossed-swords" /> Encounter Builder
      </h2>
      <button
        class="flex size-8 items-center justify-center rounded-full bg-fog hover:bg-smoke dark:bg-gray-900 hover:dark:bg-granite"
        @click="$emit('hide-encounter')"
      >
        <Icon name="heroicons:x-mark" />
      </button>
    </div>
    <div class="mb-2 border-b border-gray-200 pb-4 dark:border-gray-700">
      <EncounterBuilderPartyBuilder />
    </div>

    <div
      v-if="isLoadingOverride ?? isLoading"
      class="py-4 text-center"
    >
      <p class="text-sm text-gray-300 dark:text-gray-200">
        Loading monster data...
      </p>
    </div>
    <div
      v-else-if="monsters.length === 0"
      class="py-4 text-center"
    >
      <Icon
        name="game-icons:hidden"
        class="size-32 text-red-300 dark:text-gray-600"
      />
      <p class="mt-0 text-lg font-bold text-gray-300 dark:text-gray-200">
        It's too quiet...
      </p>
      <p class="text-sm text-gray-400 dark:text-gray-300">
        Click + on a monster page or search below
      </p>
      <div class="mt-4">
        <EncounterBuilderMonsterSearch @select="handleMonsterSelect" />
      </div>
    </div>

    <div v-else>
      <h3 class="mb-2 mt-4 text-lg font-bold">
        Monsters
      </h3>
      <div
        v-for="monster in monsters"
        :key="monster.id"
        class="flex items-start justify-between rounded bg-white p-2 dark:bg-gray-800"
      >
        <div class="flex flex-col">
          <nuxt-link
            class="font-medium text-gray-900 hover:text-blood dark:text-white dark:hover:text-blood"
            :to="`/monsters/${monster.id}`"
          >
            {{ monster.name }}
            <SourceTag
              v-if="monster.document?.name"
              :title="monster.document.name"
              :text="monster.document.key"
            />
          </nuxt-link>
          <div class="text-sm text-gray-500 dark:text-gray-300">
            CR
            {{ monster.challenge_rating_text || monster.challenge_rating }} ({{
              (monster.experience_points || 0) * monster.count
            }}
            XP)
          </div>
        </div>
        <div class="flex gap-1">
          <button
            class="rounded bg-blood px-1 py-0.5 text-sm font-medium text-white hover:bg-blood/80 dark:bg-blood dark:hover:bg-red-400"
            data-testid="remove-monster"
            @click="removeMonster(monster.id)"
          >
            <Icon name="heroicons:minus" />
          </button>
          <span
            class="w-6 text-center text-sm text-gray-700 dark:text-gray-200"
          >
            {{ monster.count }}
          </span>
          <button
            class="rounded bg-blood px-1 py-0.5 text-sm font-medium text-white hover:bg-blood/80 dark:bg-blood dark:hover:bg-red-400"
            data-testid="increment-monster"
            @click="incrementMonster(monster.id)"
          >
            <Icon name="heroicons:plus" />
          </button>
        </div>
      </div>

      <div
        class="mb-4 flex items-center justify-between border-t border-gray-200 pt-2 dark:border-gray-700"
      >
        <span class="text-sm text-gray-700 dark:text-gray-200">
          {{ encounterStore.totalMonsters }} Monsters (
          {{ encounterStore.multiplier }} group multiplier) |
          {{ encounterStore.totalXP }} XP
        </span>
      </div>

      <div
        v-if="partyRows.length"
        class="mb-4"
      >
        <table
          class="w-full overflow-hidden rounded border-0 bg-white text-sm dark:bg-gray-900"
        >
          <thead>
            <tr class="border-0">
              <th
                v-for="(budget, difficulty) in { trivial: 0, ...partyXPBudget }"
                :key="difficulty"
                class="border-0 py-1"
                :class="[
                  difficultyColors(difficulty as DifficultyLevel),
                  {
                    'font-bold':
                      encounterStore.difficulty.value === difficulty,
                  },
                ]"
              >
                <div class="capitalize">
                  {{ difficulty }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-0">
              <td
                v-for="(budget, difficulty) in { trivial: 0, ...partyXPBudget }"
                :key="difficulty"
                class="border-0 py-1"
                :class="[
                  difficultyColors(difficulty as DifficultyLevel),
                  {
                    'font-bold':
                      encounterStore.difficulty.value === difficulty,
                  },
                ]"
              >
                {{ encounterStore.formatXPBudget(budget, difficulty) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mb-4">
        <EncounterBuilderMonsterSearch @select="handleMonsterSelect" />
      </div>

      <button
        class="w-full border-t border-gray-200 py-2 text-center text-sm text-blood hover:text-black dark:border-gray-700 dark:text-red-400 dark:hover:text-white"
        data-testid="clear-encounter"
        @click="clearEncounter"
      >
        Clear Encounter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  useEncounterStore,
  type DifficultyLevel,
} from '~/composables/useEncounter';
import { usePartyStore } from '~/composables/useParty';
import EncounterBuilderPartyBuilder from '~/components/EncounterBuilderPartyBuilder.vue';
import EncounterBuilderMonsterSearch from '~/components/EncounterBuilderMonsterSearch.vue';
import type { Monster } from '~/types/monster';

// Prop included for testing purposes
defineProps<{ isLoadingOverride?: boolean }>();

defineEmits(['hide-encounter']);

const encounterStore = useEncounterStore();
const { partyRows, partyXPBudget } = usePartyStore();

const monsters = ref(encounterStore.monsters);
const isLoading = ref(false);

// Load initial monster data
onMounted(async () => {
  if (!monsters.value.length) return;

  isLoading.value = true;
  try {
    await Promise.all(
      monsters.value.map(monster =>
        encounterStore.fetchMonsterData(monster.id),
      ),
    );
  } catch (error) {
    console.error('Failed to load monster data:', error);
  } finally {
    isLoading.value = false;
  }
});

// Simplified difficulty colors logic
const difficultyColors = computed(
  () => (difficulty: DifficultyLevel) =>
    encounterStore.difficulty.value === difficulty
      ? encounterStore.difficultyColors[difficulty]
      : '',
);

// Direct store action calls for monster management
const removeMonster = (id: string) => encounterStore.removeMonster(id);
const clearEncounter = () => encounterStore.clearEncounter();
const incrementMonster = (id: string) => encounterStore.incrementMonster(id);
const handleMonsterSelect = (monster: Monster) => {
  if (!monster?.id) return;

  encounterStore.addMonster(
    monster.id,
    monster.name,
    monster.challenge_rating_decimal,
    monster.challenge_rating,
  );
};
</script>
