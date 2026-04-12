export interface Monster {
  key: string;
  name: string;
  challenge_rating: number;
  document?: {
    name: string;
    key: string;
  };
}
