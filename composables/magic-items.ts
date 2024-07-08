export type MagicItemFilter = {
  /** Name contains*/
  search?: string;
  rarity?: string;
  type?: typeof MAGIC_ITEMS_TYPES;
  requires_attunement?: 'requires attunement' | '';
};

export const DefaultMagicItemFilter: Readonly<MagicItemFilter> = {
  search: undefined,
  rarity: undefined,
  type: undefined,
  requires_attunement: undefined,
};

export const copyMagicItemFilter = (): MagicItemFilter => {
  return { ...DefaultMagicItemFilter };
};

export const useMagicItems = (
  filter: MagicItemsFilter = {},
  queryParams: Record<string, any> = {}
) => {
  const { findMany } = useAPI();
  const { sources } = useSourcesList();
  const { data } = useQuery({
    queryKey: ['findMany', API_ENDPOINTS.magicitems, sources],
    queryFn: async () => {
      const magicItems = await findMany(
        API_ENDPOINTS.magicitems,
        sources.value,
        queryParams
      );
      return magicItems;
    },
  });

  const filtered_items = computed(() => {
    const items = data.value ?? [];

    return items
      .filter((item) => {
        return item.name
          .toLowerCase()
          .includes(filter.name?.toLowerCase() ?? '');
      })
      .filter((item) => {
        return item.rarity
          .toLowerCase()
          .includes(filter.rarity?.toLowerCase() ?? '');
      })
      .filter((item) =>
        filter.type
          ? item.type.toLowerCase() === filter.type.toLowerCase()
          : true
      )
      .filter((item) =>
        filter.rarity
          ? item.rarity.toLowerCase() === filter.rarity.toLowerCase()
          : true
      )
      .filter((item) =>
        filter.isAttunementRequired != null
          ? (filter.isAttunementRequired &&
              item.requires_attunement === 'requires attunement') ||
            item.requires_attunement === ''
          : true
      );
  });

  return { data: filtered_items };
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
