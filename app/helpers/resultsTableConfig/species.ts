import type { TableColumn, Species } from '@/types';

export const speciesTableColumnDefinitions: TableColumn<Species>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/species/${data.key}`,
  }
];