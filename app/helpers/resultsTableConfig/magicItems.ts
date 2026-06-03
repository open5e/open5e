import type {
  MagicItem,
  MagicItemFilterState,
  ResultTableSelectFieldFilter,
  TableColumn,
} from '@/types';

import { magicItemRarities, magicItemTypes } from '@/constants';

// -- API --
export const magicItemApiParams = {
  fields: [
    'key',
    'name',
    'document',
    'category',
    'rarity',
    'requires_attunement',
  ].join(','),
  is_magic_item: true,
  document__fields: ['name', 'key'].join(','),
  category__fields: ['name', 'key'].join(','),
  rarity__fields: ['name', 'rank'].join(','),
};

// -- TABLE --
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

// -- FILTERS --
export const magicItemFilterSelectFieldsDefinition: ResultTableSelectFieldFilter[] = [
  {
    name: 'Rarity',
    filterField: 'rarity',
    options: magicItemRarities.map((rarity) => ({
      name: rarity,
      value: rarity.toLowerCase().split(' ').join('-'),
    })),
  },
  {
    name: 'Category',
    filterField: 'category',
    options: magicItemTypes.map((type) => ({
      name: type,
      value: type.toLowerCase().split(' ').join('-'),
    })),
    isLeastPriority: true,
  },
];

export const magicItemFilterDefaults: Readonly<MagicItemFilterState> = {
  name__icontains: '',
  rarity: '',
  category: '',
  requires_attunement: undefined,
};