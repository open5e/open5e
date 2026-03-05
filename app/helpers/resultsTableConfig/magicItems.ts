import type { TableColumn, MagicItem } from '@/types';

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