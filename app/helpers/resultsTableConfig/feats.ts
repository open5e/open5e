import type { TableColumn, Feat } from '@/types';

export const featsApiParams = {
  fields: ['key', 'name', 'document'].join(','),
  document__fields: ['name', 'key'].join(','),
};

export const featTableColumnDefinitions: TableColumn<Feat>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/feats/${data.key}`,
  }
];