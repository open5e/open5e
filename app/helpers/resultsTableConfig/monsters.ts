import type { TableColumn, Monster, ResultTableSelectFieldFilter } from '@/types';
import { parseChallengeRating } from '@/helpers';
import {
  MONSTER_CHALLENGE_RATINGS_MAP,
  MONSTER_SIZES_LIST,
  MONSTER_TYPES_LIST
} from '@/constants';

export const monsterTableColumnDefinitions: TableColumn<Monster>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/monsters/${data.key}`,
  },
  {
    displayName: 'CR',
    value: (data) => parseChallengeRating(data.challenge_rating_decimal),
    sortValue: 'challenge_rating_decimal',
  },
  {
    displayName: 'Type',
    value: (data) => data.type?.name,
    sortValue: 'type',
  },
  {
    displayName: 'Size',
    value: (data) => data.size.name,
    sortValue: 'size',
    isLeastPriority: true,
  }
];

export const monsterFilterSelectFieldsDefinition: ResultTableSelectFieldFilter[] = [
  {
    name: 'Type',
    filterField: 'type',
    options: MONSTER_TYPES_LIST.map((monsterType) => ({
      name: monsterType,
      value: monsterType.toLowerCase(),
    })),
  },
  {
    name: 'Size',
    filterField: 'size',
    options: MONSTER_SIZES_LIST.map((monsterSize) => ({
      name: monsterSize,
      value: monsterSize.toLowerCase(),
    })),
    isLeastPriority: true,
  },
  {
    name: 'CR (min)',
    filterField: 'challenge_rating_decimal__gte',
    options: MONSTER_CHALLENGE_RATINGS_MAP.map(([name, value]) => ({
      name: name,
      value: value.toString(),
    })),
  },
  {
    name: 'CR (max)',
    filterField: 'challenge_rating_decimal__lte',
    options: MONSTER_CHALLENGE_RATINGS_MAP.map(([name, value]) => ({
      name: name,
      value: value.toString(),
    })),
  },
];