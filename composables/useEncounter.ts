import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

interface EncounterMonster {
  id: string;
  name: string;
  challenge_rating: number;
  experience_points: number;
  count: number;
}

export const useEncounterStore = () => {
  const monsters = useLocalStorage<EncounterMonster[]>(
    'encounter-monsters',
    []
  );

  const totalMonsters = computed(() =>
    monsters.value.reduce((sum, m) => sum + m.count, 0)
  );

  const totalXP = computed(() =>
    monsters.value.reduce((sum, m) => sum + m.experience_points * m.count, 0)
  );

  const addMonster = (monster: EncounterMonster) => {
    const existing = monsters.value.find((m) => m.id === monster.id);
    if (existing) {
      existing.count++;
    } else {
      monsters.value.push({ ...monster, count: 1 });
    }
  };

  const incrementMonster = (id: string) => {
    const monster = monsters.value.find((m) => m.id === id);
    if (monster) monster.count++;
  };

  const removeMonster = (id: string) => {
    const index = monsters.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      const monster = monsters.value[index];
      if (monster.count > 1) {
        monster.count--;
      } else {
        monsters.value.splice(index, 1);
      }
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
    incrementMonster,
    removeMonster,
    clearEncounter,
  };
};
