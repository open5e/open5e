export type MonsterFilter = {
  name__icontains?: string; // filter by name (TODO)
  challenge_rating_decimal_gte?: string; // CR lower bound
  challenge_rating_decimal__lte?: string; // CR upper bound
  size?: string; // filter by size
  type?: string; // filter by monster type (TODO)
};

export const DefaultMonsterFilter: Readonly<MonsterFilter> = {
  name__icontains: '',
  challenge_rating_decimal_gte: '',
  challenge_rating_decimal__lte: '',
  size: '',
  type: '',
};

// Fetch a single monster from Open5e API
export const useMonster = (slug: string) => {
  const { get } = useAPI();
  return useQuery({
    queryKey: ['get', API_ENDPOINTS.monsters, slug],
    queryFn: async () => {
      const monster = await get(API_ENDPOINTS.monsters, slug);
      monster.abilities = ABILITY_SCORE_NAMES.map(ability => ({
        name: ability,
        shortName: ability.slice(0, 3),
        score: monster[ability],
        modifier: useFormatModifier(monster[ability], { inputType: 'score' }),
        save: monster[`${ability}_save`],
      }));
      return monster as Record<string, string>;
    },
  });
};

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
