import { API_ENDPOINTS, useFindMany } from './api';

export const useAllSpells = async (params: Record<string, never> = {}) => {
  return await useFindMany(API_ENDPOINTS.spells, params); // This will now use v2/spells
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

/** useFormatSpellSubtitle takes a spells school and name and returns a user
 * readble formatted string.
 */

interface IUseFormatSpellSubtitle {
  level: number | undefined;
  school: string | undefined;
}
export const useFormatSpellSubtitle = ({
  level,
  school,
}: IUseFormatSpellSubtitle) => {
  // use typeof for early rtrn because !level is false when level = 0
  if (typeof level !== 'number') return `${school} Spell`;
  const spellType = `${school} ${level && level > 0 ? 'Spell' : 'Cantrip'}`;
  const spellLevel = level > 0 ? SPELL_LEVELS_NAMES[level] + ' ' : '';
  return spellLevel + spellType;
};

export type SpellFilter = {
  name__contains?: string;
  level?: number;
  school?: string;
  classes__key__in?: string;
};

export const DefaultSpellFilter: Readonly<SpellFilter> = {
  name__contains: '',
  level: undefined,
  school: undefined,
  classes__key__in: undefined,
};

export const copySpellFilter = (): SpellFilter => {
  return { ...DefaultSpellFilter };
};
