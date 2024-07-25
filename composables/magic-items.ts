export type MagicItemFilter = {
  /** Name contains*/
  name__icontains?: string;
  rarity?: string;
  type?: typeof MAGIC_ITEMS_TYPES | '';
  requires_attunement?: 'requires attunement' | '';
};

export const DefaultMagicItemFilter: Readonly<MagicItemFilter> = {
  name__icontains: '',
  rarity: '',
  type: '',
  requires_attunement: '',
};

export const copyMagicItemFilter = (): MagicItemFilter => {
  return { ...DefaultMagicItemFilter };
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
