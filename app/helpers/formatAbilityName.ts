const shortToLongMap = {
  'STR': 'Strength',
  'DEX': 'Dexterity',
  'CON': 'Constitution',
  'WIS': 'Wisdom',
  'INT': 'Intelligence',
  'CHA': 'Charisma',
};

const longToShortMap = {
  'Strength': 'STR', 
  'Dexterity': 'DEX',
  'Constitution': 'CON',
  'Wisdom': 'WIS',
  'Intelligence': 'INT',
  'Charisma': 'CHA',
};

const fullMap = {...shortToLongMap, ...longToShortMap};

export function formatAbilityName(
  input: string,
  target?: 'fullName' | 'shortName' 
): string {


  if (!Object.keys(fullMap).includes(input)) return input;

  if (!target) {
    return fullMap[input as keyof typeof fullMap];
  }

  if (target === 'fullName') {
    return longToShortMap[input as keyof typeof longToShortMap];
  }

  if (target === 'shortName') {
    return shortToLongMap[input as keyof typeof shortToLongMap];
  }

  return input;
}