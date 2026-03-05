import type { TableColumn, Feat } from '@/types';

export const featTableColumnDefinitions: TableColumn<Feat>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/feats/${data.key}`,
  }
];