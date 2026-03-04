export type MonsterFilterState = {
  name__icontains?: string; // filter by name (TODO)
  challenge_rating_decimal_gte?: string; // CR lower bound
  challenge_rating_decimal__lte?: string; // CR upper bound
  size?: string; // filter by size
  type?: string; // filter by monster type (TODO)
};