import type { TableColumn, Background } from '@/types';

export const backgroundApiParams = {
  fields: ['key', 'name', 'document'].join(','),
  document__fields: ['name', 'key'].join(','),
};

export const backgroundTableColumnDefinitions: TableColumn<Background>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/backgrounds/${data.key}`,
  }
];