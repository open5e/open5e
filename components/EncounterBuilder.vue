<template>
  <div class="h-full overflow-y-auto">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-bold">
        <Icon name="heroicons:sword-shield" /> Encounter Builder
      </h2>
      <button
        class="flex h-8 w-8 items-center justify-center rounded-full bg-fog hover:bg-smoke dark:bg-basalt hover:dark:bg-granite"
        @click="$emit('hide-encounter')"
      >
        <Icon name="heroicons:x-mark" />
      </button>
    </div>
    <PartyBuilder />

    <div class="mb-2 flex items-center justify-between">
      <h3 class="text-sm font-bold">Monsters</h3>
    </div>
    <div v-if="isLoading" class="py-4 text-center">
      <p class="text-sm text-gray-500">Loading monster data...</p>
    </div>
    <div v-else-if="monsters.length === 0" class="py-4 text-center">
      <p class="text-sm text-gray-500">No monsters added to encounter yet</p>
      <p class="text-xs text-gray-400">
        Click the + button on monster pages to add them
      </p>
    </div>

    <div v-else>
      <div
        v-for="monster in monsters"
        :key="monster.id"
        class="flex items-start justify-between rounded bg-white p-2 dark:bg-gray-800"
      >
        <div class="flex flex-col">
          <span class="font-medium"
            >{{ monster.name }}
            <source-tag
              v-if="monster.document?.name"
              :title="monster.document.name"
              :text="monster.document.key"
          /></span>
          <div class="text-sm text-gray-500">
            CR
            {{ monster.challenge_rating_text || monster.challenge_rating }} ({{
              (monster.experience_points || 0) * monster.count
            }}
            XP)
          </div>
        </div>
        <div class="flex gap-1">
          <button
            class="rounded bg-blood px-2 py-0.5 text-sm font-medium text-white hover:bg-blood/80"
            @click="removeMonster(monster.id)"
          >
            -
          </button>
          <span class="w-6 text-sm">{{ monster.count }}</span>
          <button
            class="rounded bg-blood px-2 py-0.5 text-sm font-medium text-white hover:bg-blood/80"
            @click="incrementMonster(monster.id)"
          >
            +
          </button>
        </div>
      </div>

      <div class="mb-4 flex items-center justify-between border-t pt-2">
        <span class="text-sm"
          >{{ totalMonsters }} Monsters | {{ totalXP }} XP ({{
            multiplier
          }})</span
        >
      </div>

      <div v-if="partyRows.length" class="mb-4">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th
                v-for="(budget, difficulty) in { trivial: 0, ...partyXPBudget }"
                :key="difficulty"
                class="py-1"
                :class="[
                  difficultyColors(difficulty),
                  {
                    'font-bold':
                      encounterDifficulty ===
                      difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
                  },
                ]"
              >
                <div class="capitalize">{{ difficulty }}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                v-for="(budget, difficulty) in { trivial: 0, ...partyXPBudget }"
                :key="difficulty"
                class="py-1"
                :class="[
                  difficultyColors(difficulty),
                  {
                    'font-bold':
                      encounterDifficulty ===
                      difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
                  },
                ]"
              >
                {{ formatXPBudget(budget, difficulty) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        class="w-full border-t py-2 text-center text-sm text-blood hover:text-black dark:hover:text-fog"
        @click="clearEncounter"
      >
        Clear Encounter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEncounterStore } from '~/composables/useEncounter';
import { usePartyStore } from '~/composables/useParty';
import { useXPCalculator } from '~/composables/useXPCalculator';
import PartyBuilder from '~/components/PartyBuilder.vue';

const encounterStore = useEncounterStore();
const { partyRows, partyXPBudget } = usePartyStore();
const { calculateEncounterDifficulty, getDifficultyThresholds, getMultiplier } =
  useXPCalculator();

const monsters = ref(encounterStore.monsters);
const isLoading = ref(false);

// Load initial monster data
onMounted(async () => {
  if (monsters.value.length > 0) {
    isLoading.value = true;
    try {
      await Promise.all(
        monsters.value.map((monster) =>
          encounterStore.fetchMonsterData(monster.id)
        )
      );
    } catch (error) {
      console.error('Failed to load monster data:', error);
    } finally {
      isLoading.value = false;
    }
  }
});

const totalMonsters = computed(() =>
  monsters.value.reduce((sum, m) => sum + m.count, 0)
);
const totalXP = computed(() => {
  return monsters.value.reduce(
    (sum, monster) => sum + (monster.experience_points || 0) * monster.count,
    0
  );
});

const multiplier = computed(() => {
  const count = totalMonsters.value;
  return `${getMultiplier(count)}x`;
});

const difficultyColors = computed(() => {
  const colors = {
    trivial: 'bg-gray-100 dark:bg-gray-700',
    easy: 'bg-green-100 dark:bg-green-900',
    medium: 'bg-yellow-100 dark:bg-yellow-900',
    hard: 'bg-orange-100 dark:bg-orange-900',
    deadly: 'bg-red-100 dark:bg-red-900',
  };

  return (difficulty: string) => {
    const isCurrent =
      encounterDifficulty.value ===
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    return isCurrent ? colors[difficulty as keyof typeof colors] : '';
  };
});

const formatXPBudget = (budget: number, difficulty: string) => {
  if (difficulty === 'trivial') {
    return `<${partyXPBudget.value.easy.toLocaleString()}`;
  }
  return budget.toLocaleString();
};

const encounterDifficulty = computed(() => {
  if (!partyRows.value.length) return null;

  const budget = partyRows.value.reduce(
    (acc, row) => {
      if (!row.count || !row.level) return acc;
      const thresholds = getDifficultyThresholds(row.level);
      return {
        easy: acc.easy + thresholds.easy * row.count,
        medium: acc.medium + thresholds.medium * row.count,
        hard: acc.hard + thresholds.hard * row.count,
        deadly: acc.deadly + thresholds.deadly * row.count,
      };
    },
    { easy: 0, medium: 0, hard: 0, deadly: 0 }
  );

  return calculateEncounterDifficulty(totalXP.value, budget);
});

const removeMonster = (id: string) => {
  encounterStore.removeMonster(id);
};

const clearEncounter = () => {
  encounterStore.clearEncounter();
};

const incrementMonster = (id: string) => {
  encounterStore.incrementMonster(id);
};
</script>
