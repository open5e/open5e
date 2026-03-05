import type { TableColumn, RuleSet } from '@/types';

export const rulesTableColumnDefinitions: TableColumn<RuleSet>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/species/${data.key}`,
  }
];