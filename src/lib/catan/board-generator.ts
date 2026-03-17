import type { HexTile, BoardConfig, ConstraintOptions, Resource } from '@/types/catan';
import { generateGridPositions, getNeighborCoords, coordKey } from './hex-utils';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildResourcePool(config: BoardConfig): Resource[] {
  const pool: Resource[] = [];
  const resourceTypes: Resource[] = ['wood', 'brick', 'sheep', 'wheat', 'ore', 'desert'];
  for (const r of resourceTypes) {
    for (let i = 0; i < config.resources[r]; i++) {
      pool.push(r);
    }
  }
  return pool;
}

function assignNumberTokens(tiles: HexTile[], tokens: number[]): void {
  const shuffledTokens = shuffle(tokens);
  let tokenIdx = 0;
  for (const tile of tiles) {
    if (tile.resource === 'desert') {
      tile.numberToken = null;
    } else {
      tile.numberToken = shuffledTokens[tokenIdx++] ?? null;
    }
  }
}

// --- Resource placement via backtracking ---

function backtrackResources(
  tiles: HexTile[],
  available: Record<string, number>,
  index: number,
  tileMap: Map<string, HexTile>,
  assigned: Set<string>,
): boolean {
  if (index >= tiles.length) return true;

  const tile = tiles[index];
  const tileKey = coordKey(tile.coord);
  const types = shuffle(Object.keys(available).filter(r => available[r] > 0));

  for (const resource of types) {
    tile.resource = resource as Resource;

    // Desert can always be placed (no adjacency constraint)
    let valid = true;
    if (resource !== 'desert') {
      for (const nc of getNeighborCoords(tile.coord)) {
        const nKey = coordKey(nc);
        if (assigned.has(nKey)) {
          const neighbor = tileMap.get(nKey);
          if (neighbor && neighbor.resource !== 'desert' && neighbor.resource === resource) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      available[resource]--;
      assigned.add(tileKey);
      if (backtrackResources(tiles, available, index + 1, tileMap, assigned)) {
        return true;
      }
      assigned.delete(tileKey);
      available[resource]++;
    }
  }

  return false;
}

function assignResourcesWithBacktracking(
  tiles: HexTile[],
  config: BoardConfig,
  constraints: ConstraintOptions,
): boolean {
  const pool = buildResourcePool(config);

  if (constraints.sameResourceCanTouch) {
    const shuffled = shuffle(pool);
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].resource = shuffled[i];
    }
    return true;
  }

  const tileMap = new Map<string, HexTile>();
  for (const tile of tiles) tileMap.set(coordKey(tile.coord), tile);

  // Sort by neighbor count descending (most constrained first)
  const sorted = [...tiles].sort((a, b) => {
    const aN = getNeighborCoords(a.coord).filter(nc => tileMap.has(coordKey(nc))).length;
    const bN = getNeighborCoords(b.coord).filter(nc => tileMap.has(coordKey(nc))).length;
    return bN - aN;
  });

  const available: Record<string, number> = {};
  for (const r of pool) available[r] = (available[r] || 0) + 1;

  return backtrackResources(sorted, available, 0, tileMap, new Set());
}

// --- Number token placement via backtracking ---

function checkTileNumberConstraints(
  tile: HexTile,
  tileMap: Map<string, HexTile>,
  constraints: ConstraintOptions,
): boolean {
  if (tile.numberToken == null) return true;

  for (const nc of getNeighborCoords(tile.coord)) {
    const neighbor = tileMap.get(coordKey(nc));
    if (!neighbor || neighbor.numberToken == null) continue;

    if (!constraints.sixEightCanTouch) {
      if (
        (tile.numberToken === 6 || tile.numberToken === 8) &&
        (neighbor.numberToken === 6 || neighbor.numberToken === 8)
      ) return false;
    }
    if (!constraints.twoTwelveCanTouch) {
      if (
        (tile.numberToken === 2 || tile.numberToken === 12) &&
        (neighbor.numberToken === 2 || neighbor.numberToken === 12)
      ) return false;
    }
    if (!constraints.sameNumberCanTouch) {
      if (tile.numberToken === neighbor.numberToken) return false;
    }
  }
  return true;
}

function backtrackNumbers(
  tiles: HexTile[],
  available: number[],
  index: number,
  tileMap: Map<string, HexTile>,
  constraints: ConstraintOptions,
): boolean {
  if (index >= tiles.length) return true;

  const tile = tiles[index];
  for (let i = 0; i < available.length; i++) {
    const token = available[i];
    tile.numberToken = token;

    if (checkTileNumberConstraints(tile, tileMap, constraints)) {
      available.splice(i, 1);
      if (backtrackNumbers(tiles, available, index + 1, tileMap, constraints)) {
        return true;
      }
      available.splice(i, 0, token);
    }
  }

  tile.numberToken = null;
  return false;
}

function assignNumberTokensWithBacktracking(
  tiles: HexTile[],
  tokens: number[],
  constraints: ConstraintOptions,
): boolean {
  const tileMap = new Map<string, HexTile>();
  for (const tile of tiles) tileMap.set(coordKey(tile.coord), tile);

  const nonDesertTiles = tiles.filter(t => t.resource !== 'desert');
  nonDesertTiles.sort((a, b) => {
    const aN = getNeighborCoords(a.coord).filter(nc => tileMap.has(coordKey(nc))).length;
    const bN = getNeighborCoords(b.coord).filter(nc => tileMap.has(coordKey(nc))).length;
    return bN - aN;
  });

  const available = shuffle(tokens);
  return backtrackNumbers(nonDesertTiles, available, 0, tileMap, constraints);
}

export function generateBoard(config: BoardConfig, constraints: ConstraintOptions): HexTile[] {
  const positions = generateGridPositions(config.rowLayout);

  // Try multiple attempts with different random seeds
  for (let attempt = 0; attempt < 10; attempt++) {
    const tiles: HexTile[] = positions.map(coord => ({
      coord,
      resource: 'desert' as Resource,
      numberToken: null,
    }));

    // Phase 1: resources via backtracking
    if (!assignResourcesWithBacktracking(tiles, config, constraints)) continue;

    // Phase 2: number tokens via backtracking
    if (assignNumberTokensWithBacktracking(tiles, [...config.numberTokens], constraints)) {
      return tiles;
    }
  }

  // Fallback: unconstrained board
  const resourcePool = shuffle(buildResourcePool(config));
  const tiles: HexTile[] = positions.map((coord, i) => ({
    coord,
    resource: resourcePool[i],
    numberToken: null,
  }));
  assignNumberTokens(tiles, [...config.numberTokens]);
  return tiles;
}
