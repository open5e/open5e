import type { TableColumn, MagicItem, ResultTableSelectFieldFilter } from '@/types';
import { MAGIC_ITEMS_RARITES, MAGIC_ITEMS_TYPES } from '@/constants';

export const magicItemTableColumnDefinitions: TableColumn<MagicItem>[] = [
  {
    displayName: 'Name',
    value: (data) => data.name,
    sortValue: 'name',
    link: (data) => `/magic-items/${data.key}`,
  },
  {
    displayName: 'Category',
    value: (data) => data.category.name,
    sortValue: 'category',
    isLeastPriority: true,
  },
  {
    displayName: 'Rarity',
    value: (data) => data.rarity.name,
    sortValue: 'rarity',
  },
  {
    displayName: 'Attunement',
    value: (data) => (data.requires_attunement ?? false),
    sortValue: 'requires_attunement',
  },
];

export const magicItemFilterSelectFieldsDefinition: ResultTableSelectFieldFilter[] = [
  {
    name: 'Rarity',
    filterField: 'rarity',
    options: MAGIC_ITEMS_RARITES.map((rarity) => ({
      name: rarity,
      value: rarity.toLowerCase().split(' ').join('-'),
    })),
  },
  {
    name: 'Category',
    filterField: 'category',
    options: MAGIC_ITEMS_TYPES.map((type) => ({
      name: type,
      value: type.toLowerCase().split(' ').join('-'),
    })),
    isLeastPriority: true,
  },
];