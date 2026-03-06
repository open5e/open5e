import type { TableColumn, RuleSet } from '@/types';

export const rulesApiParams = {
  fields: ['name', 'key', 'document'].join(','),
  document__fields: ['name', 'key'].join(','),
};

export const rulesTableColumnDefinitions: TableColumn<RuleSet>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/species/${data.key}`,
  }
];