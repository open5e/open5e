export interface Monster {
  id: string;
  name: string;
  challenge_rating: string;
  challenge_rating_decimal: number;
  document?: {
    name: string;
    key: string;
  };
}
