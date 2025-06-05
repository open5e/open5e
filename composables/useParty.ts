import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useXPCalculator } from './useXPCalculator';

interface PartyRow {
  level: number;
  count: number;
}

export const usePartyStore = () => {
  const partyRows = useLocalStorage<PartyRow[]>('party-rows', [
    { level: 3, count: 4 },
  ]);

  const xpCalculator = useXPCalculator();

  const partyXPBudget = computed(() => {
    const budget = {
      easy: 0,
      medium: 0,
      hard: 0,
      deadly: 0,
    };

    for (const row of partyRows.value) {
      if (!row.count || !row.level) continue;
      const thresholds = xpCalculator.getDifficultyThresholds(row.level);
      budget.easy += thresholds.easy * row.count;
      budget.medium += thresholds.medium * row.count;
      budget.hard += thresholds.hard * row.count;
      budget.deadly += thresholds.deadly * row.count;
    }

    return budget;
  });

  const addPartyRow = () => {
    partyRows.value.push({ level: 1, count: 1 });
  };

  const removePartyRow = (index: number) => {
    if (partyRows.value.length > 1) {
      partyRows.value.splice(index, 1);
    }
  };

  return {
    partyRows,
    partyXPBudget,
    addPartyRow,
    removePartyRow,
  };
};
