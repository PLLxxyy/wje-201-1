export interface Cocktail {
  id: string;
  name: string;
  nameEn: string;
  baseSpirit: BaseSpirit;
  difficulty: number; // 1-5
  abv: number; // alcohol by volume percentage
  color: string; // hex color for the card strip
  flavor: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  tips: string;
}

export interface Rating {
  score: number; // 1-5
  comment: string;
  updatedAt: number;
}

export type RatingsMap = Record<string, Rating>;

export type BaseSpirit = '伏特加' | '威士忌' | '朗姆酒' | '金酒' | '龙舌兰' | '其他';

export const BASE_SPIRITS: BaseSpirit[] = ['伏特加', '威士忌', '朗姆酒', '金酒', '龙舌兰', '其他'];
