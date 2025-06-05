import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { API_ENDPOINTS, useAPI } from '~/composables/api';
import { usePartyStore } from '~/composables/useParty';
import { useXPCalculator } from '~/composables/useXPCalculator';

interface EncounterMonster {
  id: string;
  name: string;
  challenge_rating_decimal: number;
  challenge_rating_text: string;
  count: number;
  // Remainder will be populated by API call
  [key: string]: string | number;
}

export type { EncounterMonster };

export type DifficultyLevel =
  | 'empty'
  | 'trivial'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'deadly';

export const useEncounterStore = () => {
  const monsters = useLocalStorage<EncounterMonster[]>(
    'encounter-monsters',
    [],
  );
  const monsterCache = useLocalStorage<Record<string, string | number>>(
    'monster-cache',
    {},
  );
  const { get } = useAPI();
  const { partyXPBudget } = usePartyStore();
  const xpCalculator = useXPCalculator();

  const difficultyColors: Record<DifficultyLevel, string> = {
    empty: 'bg-fog hover:bg-smoke dark:bg-basalt hover:dark:bg-granite',
    trivial:
      'bg-lime-200 hover:bg-lime-200 dark:bg-lime-800 hover:dark:bg-lime-900',
    easy: 'bg-green-200 hover:bg-green-200 dark:bg-green-800 hover:dark:bg-green-900',
    medium:
      'bg-blue-200 hover:bg-blue-200 dark:bg-blue-800 hover:dark:bg-blue-900',
    hard: 'bg-yellow-200 hover:bg-yellow-200 dark:bg-yellow-800 hover:dark:bg-yellow-900',
    deadly:
      'animate-pulse-orange dark:animate-pulse-orange-dark bg-orange-100 dark:bg-orange-700 text-red-800 dark:text-red-100 hover:animate-none hover:bg-orange-200 hover:dark:bg-orange-900',
  };

  const totalMonsters = computed(() =>
    monsters.value.reduce((sum, m) => sum + m.count, 0),
  );

  const totalXP = computed(
    () =>
      monsters.value.reduce(
        (sum, m) => sum + (m.experience_points || 0) * m.count,
        0,
      ) * xpCalculator.getMultiplier(totalMonsters.value),
  );

  const multiplier = computed(() => {
    const count = totalMonsters.value;
    return `${xpCalculator.getMultiplier(count)}x`;
  });

  const difficulty = computed(() => {
    if (!monsters.value.length) return 'empty';

    const multiplier = xpCalculator.getMultiplier(monsters.value.length);
    const adjustedXP = totalXP.value * multiplier;

    return xpCalculator
      .calculateEncounterDifficulty(adjustedXP, partyXPBudget.value)
      .toLowerCase() as DifficultyLevel;
  });

  const difficultyColor = computed(() => {
    return difficultyColors[difficulty.value];
  });

  const formatXPBudget = (budget: number, difficulty: string) => {
    if (difficulty === 'trivial') {
      return `<${partyXPBudget.value.easy.toLocaleString()}`;
    }
    return budget.toLocaleString();
  };

  const fetchMonsterData = async (id: string) => {
    try {
      let data;
      if (monsterCache.value[id]) {
        data = monsterCache.value[id];
      } else {
        if (!id) {
          console.error('Cannot fetch monster data: ID is empty');
          return null;
        }
        data = await get(
          API_ENDPOINTS.monsters,
          id,
          '/?document__fields=name,key,permalink',
        );
        monsterCache.value[id] = data;
      }

      // Update the monster in the list with the new data
      const monster = monsters.value.find(m => m.id === id);
      if (monster) {
        // Preserve the count and basic info while updating with API data
        const { count, name, challenge_rating_decimal, challenge_rating_text }
          = monster;
        Object.assign(monster, data, {
          count,
          name,
          challenge_rating_decimal,
          challenge_rating_text,
        });
      }

      return data;
    } catch (error) {
      console.error('Error fetching monster data:', error);
      throw error;
    }
  };

  const addMonster = async (
    id: string,
    name: string,
    challenge_rating_decimal: number,
    challenge_rating_text: string,
  ) => {
    try {
      // First check if monster exists
      const existingMonster = monsters.value.find(m => m.id === id);
      if (existingMonster) {
        existingMonster.count += 1;
        return;
      }

      // Add monster with loading state
      monsters.value.push({
        id,
        name,
        challenge_rating_decimal,
        challenge_rating_text,
        count: 1,
        document: {
          name: 'Loading...',
          key: 'loading',
        },
      });

      // Then fetch the full monster data
      const monsterData = await fetchMonsterData(id);
      if (!monsterData) {
        console.error('Failed to fetch monster data');
        return;
      }
    } catch (error) {
      console.error('Failed to add monster:', error);
    }
  };

  const removeMonster = (id: string) => {
    const index = monsters.value.findIndex(m => m.id === id);
    if (index !== -1) {
      if (monsters.value[index].count > 1) {
        monsters.value[index].count -= 1;
      } else {
        monsters.value.splice(index, 1);
      }
    }
  };

  const incrementMonster = (id: string) => {
    const monster = monsters.value.find(m => m.id === id);
    if (monster) {
      monster.count += 1;
    }
  };

  const clearEncounter = () => {
    monsters.value = [];
  };

  return {
    monsters,
    totalMonsters,
    totalXP,
    addMonster,
    removeMonster,
    incrementMonster,
    clearEncounter,
    fetchMonsterData,
    difficultyColors,
    difficulty,
    difficultyColor,
    multiplier,
    formatXPBudget,
  };
};
