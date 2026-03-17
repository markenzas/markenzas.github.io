export type Resource = 'wood' | 'brick' | 'sheep' | 'wheat' | 'ore' | 'desert';

export type PortResource = Exclude<Resource, 'desert'>;
export type PortType = 'generic' | PortResource;

export interface PortPosition {
  hexCoord: AxialCoord;
  edge: number; // 0-5
}

export interface Port {
  position: PortPosition;
  type: PortType;
}

export interface AxialCoord {
  q: number;
  r: number;
}

export interface HexTile {
  coord: AxialCoord;
  resource: Resource;
  numberToken: number | null;
}

export interface BoardConfig {
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
