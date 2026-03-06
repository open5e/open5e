import type { TableColumn, Class } from '@/types';

export const classesApiParams = {
  is_subclass: false,
  fields: ['key', 'name', 'document'].join(),
  document__fields: ['name', 'key'].join(),
};

export const classTableColumnDefinitions: TableColumn<Class>[] = [
  {
    displayName: 'Class',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/classes/${data.key}`,
  }
];