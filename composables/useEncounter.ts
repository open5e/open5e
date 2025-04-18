import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { API_ENDPOINTS, useAPI } from '~/composables/api';
import { until } from '@vueuse/core';

interface EncounterMonster {
  id: string;
  name: string;
  challenge_rating_decimal: number;
  challenge_rating_text: string;
  count: number;
  // Remainder will be populated by API call
  [key: string]: any;
}

export const useEncounterStore = () => {
  const monsters = useLocalStorage<EncounterMonster[]>(
    'encounter-monsters',
    []
  );
  const monsterCache = useLocalStorage<Record<string, any>>(
    'monster-cache',
    {}
  );
  const { get } = useAPI();

  const totalMonsters = computed(() =>
    monsters.value.reduce((sum, m) => sum + m.count, 0)
  );

  const totalXP = computed(() =>
    monsters.value.reduce(
      (sum, m) => sum + (m.experience_points || 0) * m.count,
      0
    )
  );

  const fetchMonsterData = async (id: string) => {
    if (monsterCache.value[id]) {
      return monsterCache.value[id];
    }

    try {
      const data = await get(
        API_ENDPOINTS.monsters,
        id,
        '/?document__fields=name,key,permalink'
      );
      monsterCache.value[id] = data;

      // Update the monster in the list with the new data
      const monster = monsters.value.find((m) => m.id === id);
      if (monster) {
        Object.assign(monster, data);
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
    challenge_rating_text: string
  ) => {
    try {
      // First check if monster exists
      const existingMonster = monsters.value.find((m) => m.id === id);
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
      await fetchMonsterData(id);
    } catch (error) {
      console.error('Failed to add monster:', error);
    }
  };

  const removeMonster = (id: string) => {
    const index = monsters.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      if (monsters.value[index].count > 1) {
        monsters.value[index].count -= 1;
      } else {
        monsters.value.splice(index, 1);
      }
    }
  };

  const incrementMonster = (id: string) => {
    const monster = monsters.value.find((m) => m.id === id);
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
  };
};
