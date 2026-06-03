import type { TableColumn, Species } from '@/types';

export const speciesApiParams = {
  fields: ['key', 'name', 'document'].join(','),
  document__fields: ['name', 'key'].join(','),
  subspecies_of__isnull: true,
};

export const speciesTableColumnDefinitions: TableColumn<Species>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/species/${data.key}`,
  }
];