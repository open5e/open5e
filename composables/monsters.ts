export type MonsterFilter = {
  name?: string;
  challengeLow?: number;
  challengeHigh?: number;
  hpLow?: number;
  hpHigh?: number;
  size?: string;
  type?: string;
};

export const useAllMonsters = () => {
  const { findMany } = useAPI();
  const { sources } = useSourcesList();
  return useQuery({
    queryKey: ['monsters', API_ENDPOINTS.monsters, sources],
    queryFn: async () => {
      const monsters = await findMany(API_ENDPOINTS.monsters, sources.value);

      return monsters;
    },
  });
};

export const filterMonsters = (
  monsters: Record<string, any>[],
  filter: MonsterFilter
) => {
  const _mons = monsters;
  const { challengeHigh, challengeLow, hpHigh, hpLow, name, size, type } =
    filter;

  return _mons
    .filter((monster) =>
      name ? monster.name.toLowerCase().includes(name.toLowerCase()) : true
    )
    .filter((monster) =>
      inRange(monster.cr, challengeLow ?? 0, challengeHigh ?? Infinity)
    )
    .filter((monster) =>
      inRange(monster.hit_points, hpLow ?? 0, hpHigh ?? Infinity)
    )
    .filter((monster) =>
      size ? monster.size.toLowerCase().includes(size.toLowerCase()) : true
    )
    .filter((monster) =>
      type ? monster.type.toLowerCase().includes(type.toLowerCase()) : true
    );
};

export const useMonster = (slug: string) => {
  const { get } = useAPI();
  return useQuery({
    queryKey: ['get', API_ENDPOINTS.monsters, slug],
    queryFn: async () => {
      const monster = await get(API_ENDPOINTS.monsters, slug);
      monster.abilities = ABILITY_SCORE_NAMES.map((ability) => ({
        name: ability,
        shortName: ability.slice(0, 3),
        score: monster[ability],
        modifier: formatMod(calcMod(monster[ability])),
        save: monster[`${ability}_save`],
      }));
      return monster;
    },
  });
};

function calcMod(score: number) {
  return Math.floor((score - 10) / 2);
}

function formatMod(mod: number) {
  return mod >= 0 ? '+' + mod.toString() : mod.toString();
}

function inRange(value: number, low: number, high: number) {
  return low <= value && value <= high;
}

const ABILITY_SCORE_NAMES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const;

export const MONSTER_CHALLENGE_RATINGS_LIST = [
  '0',
  '1/8',
  '1/4',
  '1/2',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
] as const;

export const MONSTER_CHALLENGE_RATINGS_MAP = [
  ['0', 0],
  ['1/8', 0.125],
  ['1/4', 0.25],
  ['1/2', 0.5],
  ['1', 1],
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
  ['10', 10],
  ['11', 11],
  ['12', 12],
  ['13', 13],
  ['14', 14],
  ['15', 15],
  ['16', 16],
  ['17', 17],
  ['18', 18],
  ['19', 19],
  ['20', 20],
  ['21', 21],
  ['22', 22],
  ['23', 23],
  ['24', 24],
  ['25', 25],
  ['26', 26],
  ['27', 27],
  ['28', 28],
  ['29', 29],
  ['30', 30],
] as const;

export const MONSTER_SIZES_LIST = [
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
  'Gargantuan',
] as const;

export const MONSTER_TYPES_LIST = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead',
] as const;
