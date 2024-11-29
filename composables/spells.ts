import { groupBy } from '~/functions/groupBy';

export const useSpellsByClass = (
  charClass: string,
) => ({
  queryKey: ['findMany', API_ENDPOINTS.spells, sources, params],
  queryFn: async () => {
    const spells = await findMany(
      API_ENDPOINTS.spells, // This will now use v2/spells
      sources.value,
      params,
    );
    const class_spells = spells
      .filter((spell) => {
        return spell.dnd_class.toLowerCase().includes(charClass);
      })
      .sort(function (a, b) {
        return a.lvl - b.lvl;
      });
    const grouped_spells = groupBy(class_spells, 'level_int');
    // label groups by level
    const levels = Object.getOwnPropertyNames(grouped_spells).map((key) => {
      return {
        lvl: key,
        lvlText: SPELL_LEVELS_NAMES[parseInt(key)],
        spells: grouped_spells[key],
      };
    });

    return levels;
  },
});

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
