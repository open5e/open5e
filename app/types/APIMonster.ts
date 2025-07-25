// raw data coming from api

export interface RawMonster {
  id?: string | number;
  key?: string;
  slug?: string;
  name: string;
  challenge_rating: string | number;
  challenge_rating_text?: string;
  challenge_rating_decimal?: number;
  document?: {
    name: string;
    key: string;
  }
}
