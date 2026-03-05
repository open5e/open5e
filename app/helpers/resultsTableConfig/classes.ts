import type { TableColumn, Class } from '@/types';

export const classTableColumnDefinitions: TableColumn<Class>[] = [
  {
    displayName: 'Class',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/classes/${data.key}`,
  }
];