import type { SpellFilterState } from '@/types';

export const SPELL_FILTER_DEFAULTS: Readonly<SpellFilterState> = {
  name__contains: '',
  level: undefined,
  school__key: undefined,
  classes__key__in: undefined,
};

export const SPELL_LEVELS_NAMES = [
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

export const SPELL_SCHOOLS = [
  'Abjuration',
  'Conjuration',
  'Divination',
  'Enchantment',
  'Evocation',
  'Illusion',
  'Necromancy',
  'Transmutation',
];

export const SPELLCASTING_CLASSES = [
  'Bard',
  'Cleric',
  'Druid',
  'Sorcerer',
  'Warlock',
  'Wizard',
];

