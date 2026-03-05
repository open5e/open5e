import type { TableColumn, Item } from '@/types';
import { equipmentCategories } from '@/constants';

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
export const equipmentFilterSelectFieldsDefinition = [{
  name: 'Category',
  filterField: 'category',
  options: equipmentCategories.map((category) => ({
    name: category,
    value: category.toLowerCase().split(' ').join('-'),
  })),
}];