interface XPRules {
  easy: number[];
  medium: number[];
  hard: number[];
  deadly: number[];
}

const XP_RULES: XPRules = {
  easy: [
    25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800, 1000, 1100, 1250, 1400,
    1600, 2000, 2100, 2400, 2800,
  ],
  medium: [
    50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200, 1600, 2000, 2200, 2500,
    2800, 3200, 3900, 4200, 4900, 5700,
  ],
  hard: [
    75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900, 2400, 3000, 3400, 3800,
    4300, 4800, 5900, 6300, 7300, 8500,
  ],
  deadly: [
    100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400, 2800, 3600, 4500, 5100,
    5700, 6400, 7200, 8800, 9500, 10900, 12700,
  ],
};

// Calculate the multiplier based on the number of monsters in the encounter
const getMultiplier = (monsterCount: number): number => {
  if (monsterCount === 1) return 1;
  if (monsterCount === 2) return 1.5;
  if (monsterCount <= 6) return 2;
  if (monsterCount <= 10) return 2.5;
  if (monsterCount <= 14) return 3;
  return 4;
};

export const useXPCalculator = () => {
  const getDifficultyThresholds = (level: number) => {
    return {
      easy: XP_RULES.easy[level - 1],
      medium: XP_RULES.medium[level - 1],
      hard: XP_RULES.hard[level - 1],
      deadly: XP_RULES.deadly[level - 1],
    };
  };

  return {
    getDifficultyThresholds,
    getMultiplier,
    calculateEncounterDifficulty: (
      encounterXP: number,
      partyXPBudget: {
        easy: number;
        medium: number;
        hard: number;
        deadly: number;
      },
    ) => {
      if (encounterXP < partyXPBudget.easy) return 'Trivial';
      if (encounterXP < partyXPBudget.medium) return 'Easy';
      if (encounterXP < partyXPBudget.hard) return 'Medium';
      if (encounterXP < partyXPBudget.deadly) return 'Hard';
      return 'Deadly';
    },
  };
};
