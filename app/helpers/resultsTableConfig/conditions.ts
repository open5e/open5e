import type { TableColumn, Condition } from '@/types';

export const conditionsApiParams = {
  fields: ['name', 'key', 'document'].join(','),
  document__fields: ['name', 'key'].join(','),
};

export const conditionTableColumnDefinitions: TableColumn<Condition>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    link: (data) => `/conditions/${data.key}`,
  },
];