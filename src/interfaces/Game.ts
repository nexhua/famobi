export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: Category;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export type Platform = 'PC' | 'BROWSER' | 'ALL';

export type Category =
  | 'MMORPG'
  | 'SHOOTER'
  | 'STRATEGY'
  | 'ACTION'
  | 'RACING'
  | 'SPORTS'
  | 'MMO'
  | 'SURVIVAL'
  | 'SOCIAL';
