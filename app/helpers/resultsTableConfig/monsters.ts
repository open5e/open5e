import type { TableColumn, Monster } from '@/types';
import { parseChallengeRating } from '@/helpers';

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