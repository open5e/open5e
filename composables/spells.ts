import { groupBy } from '~/functions/groupBy';

export const useSpellsByClass = (
  charClass: string,
  params: Record<string, any>
) => {
  const { findMany } = useAPI();
  const { sources } = useSourcesList();
  return useQuery({
    queryKey: ['findMany', API_ENDPOINTS.spells, sources, params],
    queryFn: async () => {
      const spells = await findMany(
        API_ENDPOINTS.spells,
        sources.value,
        params
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
};

export const useAllSpells = (params: Record<string, any> = {}) => {
  const { findMany } = useAPI();
  const { sources } = useSourcesList();
  return useQuery({
    queryKey: ['allSpells', API_ENDPOINTS.spells, sources, params],
    queryFn: async () => {
      const spells = await findMany(
        API_ENDPOINTS.spells,
        sources.value,
        params
      );
      return spells;
    },
  });
};

const SPELL_LEVELS_NAMES = [
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
