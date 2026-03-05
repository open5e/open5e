import type { SpellFilterState } from '@/types';

export const spellFilterDefaults: Readonly<SpellFilterState> = {
  name__contains: '',
  level: undefined,
  school__key: undefined,
  classes__key__in: undefined,
};

export const spellLevels = [
  'Cantrip',
  '1st-level',
  '2nd-level',
  '3rd-level',
  '4th-level',
  '5th-level',
  '6th-level',
  '7th-level',
  '8th-level',
  '9th-level',
] as const;

export const spellSchools = [
  'Abjuration',
  'Conjuration',
  'Divination',
  'Enchantment',
  'Evocation',
  'Illusion',
  'Necromancy',
  'Transmutation',
];

export const spellcastingClasses = [
  'Bard',
  'Cleric',
  'Druid',
  'Sorcerer',
  'Warlock',
  'Wizard',
];

