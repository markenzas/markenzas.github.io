import type { BoardConfig, Resource, PortPosition, PortType } from '@/types/catan';

const BASE_3_4: BoardConfig = {
  extended: false,
  rowLayout: [3, 4, 5, 4, 3],
  resources: {
    wood: 4, brick: 3, sheep: 4, wheat: 4, ore: 3, desert: 1,
  },
  numberTokens: [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12],
};

const BASE_5_6: BoardConfig = {
  extended: true,
  rowLayout: [3, 4, 5, 6, 5, 4, 3],
  resources: {
    wood: 6, brick: 5, sheep: 6, wheat: 6, ore: 5, desert: 2,
  },
  numberTokens: [
    2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6,
    8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12,
  ],
};

export function getConfig(extended: boolean): BoardConfig {
  return extended ? BASE_5_6 : BASE_3_4;
}

export const RESOURCE_COLORS: Record<Resource, string> = {
  wood: '#2D6A2E',
  brick: '#C4503A',
  sheep: '#8BC34A',
  wheat: '#F5C542',
  ore: '#78909C',
  desert: '#E8D5A3',
};

export const RESOURCE_LABELS: Record<Resource, string> = {
  wood: 'Wood',
  brick: 'Brick',
  sheep: 'Sheep',
  wheat: 'Wheat',
  ore: 'Ore',
  desert: 'Desert',
};

// 3-4 player: 9 ports (4 generic + 5 resource)
export const BASE_3_4_PORT_POSITIONS: PortPosition[] = [
  { hexCoord: { q: 0, r: -2 }, edge: 4 },
  { hexCoord: { q: 2, r: -2 }, edge: 4 },
  { hexCoord: { q: 2, r: -1 }, edge: 5 },
  { hexCoord: { q: 2, r: 0 }, edge: 0 },
  { hexCoord: { q: 1, r: 1 }, edge: 1 },
  { hexCoord: { q: -1, r: 2 }, edge: 1 },
  { hexCoord: { q: -2, r: 2 }, edge: 2 },
  { hexCoord: { q: -2, r: 0 }, edge: 2 },
  { hexCoord: { q: -1, r: -1 }, edge: 3 },
];

export const BASE_3_4_PORT_TYPES: PortType[] = [
  'generic', 'generic', 'generic', 'generic',
  'wood', 'brick', 'sheep', 'wheat', 'ore',
];

// 5-6 player: 11 ports (5 generic + 6 resource)
export const BASE_5_6_PORT_POSITIONS: PortPosition[] = [
  { hexCoord: { q: 0, r: -3 }, edge: 4 },
  { hexCoord: { q: 1, r: -3 }, edge: 5 },
  { hexCoord: { q: 2, r: -2 }, edge: 5 },
  { hexCoord: { q: 2, r: -1 }, edge: 0 },
  { hexCoord: { q: 1, r: 1 }, edge: 0 },
  { hexCoord: { q: 0, r: 2 }, edge: 1 },
  { hexCoord: { q: -2, r: 3 }, edge: 1 },
  { hexCoord: { q: -3, r: 3 }, edge: 2 },
  { hexCoord: { q: -3, r: 1 }, edge: 2 },
  { hexCoord: { q: -3, r: 0 }, edge: 3 },
  { hexCoord: { q: -1, r: -2 }, edge: 3 },
];

export const BASE_5_6_PORT_TYPES: PortType[] = [
  'generic', 'generic', 'generic', 'generic', 'generic',
  'wood', 'brick', 'sheep', 'wheat', 'ore', 'wood',
];

export function getPortConfig(extended: boolean): { positions: PortPosition[]; types: PortType[] } {
  return extended
    ? { positions: BASE_5_6_PORT_POSITIONS, types: BASE_5_6_PORT_TYPES }
    : { positions: BASE_3_4_PORT_POSITIONS, types: BASE_3_4_PORT_TYPES };
}
