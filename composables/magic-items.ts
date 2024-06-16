export const useMagicItems = (filters: MagicItemsFilter = {}) => {
  const { findMany } = useAPI();
  const { sources } = useSourcesList();
  const { data } = useQuery({
    queryKey: ['findMany', API_ENDPOINTS.magicitems, sources],
    queryFn: async () => {
      const magicItems = await findMany(
        API_ENDPOINTS.magicitems,
        sources.value
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
          .includes(filters.name?.toLowerCase() ?? '');
      })
      .filter((item) => {
        return item.rarity
          .toLowerCase()
          .includes(filters.rarity?.toLowerCase() ?? '');
      })
      .filter((item) =>
        filters.type
          ? item.type.toLowerCase() === filters.type.toLowerCase()
          : true
      )
      .filter((item) =>
        filters.rarity
          ? item.rarity.toLowerCase() === filters.rarity.toLowerCase()
          : true
      )
      .filter((item) =>
        filters.isAttunementRequired != null
          ? (filters.isAttunementRequired &&
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
