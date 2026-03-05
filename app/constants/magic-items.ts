import type { MagicItemFilterState } from '@/types';

export const magicItemFilterDefaults: Readonly<MagicItemFilterState> = {
  name__icontains: '',
  rarity: '',
  category: '',
  requires_attunement: undefined,
};

export const magicItemRarities = [
  'Common',
  'Uncommon',
  'Rare',
  'Very Rare',
  'Legendary',
] as const;

export const magicItemTypes = [
  'Armor',
  'Potion',
  'Ring',
  'Rod',
  'Scroll',
  'Staff',
  'Wand',
  'Weapon',
  'Wondrous Item',
] as const;