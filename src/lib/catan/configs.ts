import type { BoardConfig, Resource } from './types';

const BASE_3_4: BoardConfig = {
  expansion: 'base',
  extended: false,
  rowLayout: [3, 4, 5, 4, 3],
  resources: {
    wood: 4, brick: 3, sheep: 4, wheat: 4, ore: 3, desert: 1, sea: 0, gold: 0,
  },
  numberTokens: [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12],
};

const BASE_5_6: BoardConfig = {
  expansion: 'base',
  extended: true,
  rowLayout: [3, 4, 5, 6, 5, 4, 3],
  resources: {
    wood: 6, brick: 5, sheep: 6, wheat: 6, ore: 5, desert: 2, sea: 0, gold: 0,
  },
  numberTokens: [
    2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6,
    8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12,
  ],
};

const SEAFARERS_3_4: BoardConfig = {
  expansion: 'seafarers',
  extended: false,
  rowLayout: [4, 5, 6, 7, 6, 5, 4],
  resources: {
    wood: 4, brick: 3, sheep: 4, wheat: 4, ore: 3, desert: 1, sea: 16, gold: 2,
  },
  numberTokens: [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12, 3, 5],
};

const SEAFARERS_5_6: BoardConfig = {
  expansion: 'seafarers',
  extended: true,
  rowLayout: [5, 6, 7, 8, 7, 6, 5],
  resources: {
    wood: 6, brick: 5, sheep: 6, wheat: 6, ore: 5, desert: 2, sea: 11, gold: 3,
  },
  numberTokens: [
    2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6,
    8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12,
    3, 4, 5,
  ],
};

export function getConfig(expansion: 'base' | 'seafarers', extended: boolean): BoardConfig {
  if (expansion === 'seafarers') return extended ? SEAFARERS_5_6 : SEAFARERS_3_4;
  return extended ? BASE_5_6 : BASE_3_4;
}

export const RESOURCE_COLORS: Record<Resource, string> = {
  wood: '#2D6A2E',
  brick: '#C4503A',
  sheep: '#8BC34A',
  wheat: '#F5C542',
  ore: '#78909C',
  desert: '#E8D5A3',
  sea: '#4A90D9',
  gold: '#FFD700',
};

export const RESOURCE_LABELS: Record<Resource, string> = {
  wood: 'Wood',
  brick: 'Brick',
  sheep: 'Sheep',
  wheat: 'Wheat',
  ore: 'Ore',
  desert: 'Desert',
  sea: 'Sea',
  gold: 'Gold',
};
