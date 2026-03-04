export type Resource = 'wood' | 'brick' | 'sheep' | 'wheat' | 'ore' | 'desert' | 'sea' | 'gold';

export interface AxialCoord {
  q: number;
  r: number;
}

export interface HexTile {
  coord: AxialCoord;
  resource: Resource;
  numberToken: number | null;
}

export type ExpansionType = 'base' | 'seafarers';

export interface BoardConfig {
  expansion: ExpansionType;
  extended: boolean; // 5-6 player
  rowLayout: number[];
  resources: Record<Resource, number>;
  numberTokens: number[];
}

export interface ConstraintOptions {
  sixEightCanTouch: boolean;
  twoTwelveCanTouch: boolean;
  sameNumberCanTouch: boolean;
  sameResourceCanTouch: boolean;
}

export const DEFAULT_CONSTRAINTS: ConstraintOptions = {
  sixEightCanTouch: false,
  twoTwelveCanTouch: false,
  sameNumberCanTouch: false,
  sameResourceCanTouch: false,
};
