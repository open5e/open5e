export type MagicItemFilterState = {
  name__icontains?: string;
  rarity?: string;
  category?: string;
  requires_attunement?: boolean;
};

export type MonsterFilterState = {
  name__icontains?: string;
  challenge_rating_decimal_gte?: string;
  challenge_rating_decimal__lte?: string;
  size?: string;
  type?: string;
};

export type SpellFilterState = {
  name__contains?: string;
  level?: string;
  school__key?: string;
  classes__key__in?: string;
};

export type ResultTableSelectFieldFilter = {
  name: string;
  filterField: string;
  options: { name: string; value: string }[];
  isLeastPriority?: boolean
};