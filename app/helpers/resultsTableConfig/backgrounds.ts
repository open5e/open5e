import type { TableColumn, Background } from '@/types';

export const backgroundTableColumnDefinitions: TableColumn<Background>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/backgrounds/${data.key}`,
  }
];