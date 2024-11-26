export type MagicItemFilter = {
  /** Name contains */
  name__icontains?: string;
  rarity?: string;
  category?: string;
  requires_attunement?: boolean;
};

export const DefaultMagicItemFilter: Readonly<MagicItemFilter> = {
  name__icontains: '',
  rarity: '',
  category: '',
  requires_attunement: undefined,
};

export const MAGIC_ITEMS_RARITES = [
  'Common',
  'Uncommon',
  'Rare',
  'Very Rare',
  'Legendary',
] as const;

export const MAGIC_ITEMS_TYPES = [
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
