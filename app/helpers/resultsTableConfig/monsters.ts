import type {
  TableColumn,
  Monster,
  ResultTableSelectFieldFilter,
  MonsterFilterState
} from '@/types';

import {
  monsterChallengeRatings,
  monsterSizes,
  monsterTypes,
} from '@/constants';
import { parseChallengeRating } from '@/helpers';

// -- API --
export const monsterApiParams = {
  fields: [
    'key',
    'name',
    'document',
    'challenge_rating_decimal',
    'type',
    'size',
  ].join(','),
  document__fields: ['name' ,'key'].join(','),
  type__fields: 'name',
  size__fields: 'name',
};

// -- TABLE --
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

// -- FILTER --
export const monsterFilterSelectFieldsDefinition: ResultTableSelectFieldFilter[] = [
  {
    name: 'Type',
    filterField: 'type',
    options: monsterTypes.map((monsterType) => ({
      name: monsterType,
      value: monsterType.toLowerCase(),
    })),
  },
  {
    name: 'Size',
    filterField: 'size',
    options: monsterSizes.map((monsterSize) => ({
      name: monsterSize,
      value: monsterSize.toLowerCase(),
    })),
    isLeastPriority: true,
  },
  {
    name: 'CR (min)',
    filterField: 'challenge_rating_decimal__gte',
    options: monsterChallengeRatings.map(([name, value]) => ({
      name: name,
      value: value.toString(),
    })),
  },
  {
    name: 'CR (max)',
    filterField: 'challenge_rating_decimal__lte',
    options: monsterChallengeRatings.map(([name, value]) => ({
      name: name,
      value: value.toString(),
    })),
  },
];

export const monsterFilterDefaults: Readonly<MonsterFilterState> = {
  name__icontains: '',
  challenge_rating_decimal_gte: '',
  challenge_rating_decimal__lte: '',
  size: '',
  type: '',
};
