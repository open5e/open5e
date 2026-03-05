import type { TableColumn, Condition } from '@/types';

export const conditionTableColumnDefinitions: TableColumn<Condition>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    link: (data) => `/conditions/${data.key}`,
  },
];