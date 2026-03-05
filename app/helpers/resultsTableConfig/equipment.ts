import type { TableColumn, Item } from '@/types';

export const equipmentTableColumnDefinitions: TableColumn<Item>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/equipment/${data.key}`,
  },
  {
    displayName: 'Category',
    value: (data) => data.category.name,
    sortValue: 'category',
  }
];