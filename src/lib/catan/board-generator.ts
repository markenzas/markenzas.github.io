import type { HexTile, BoardConfig, ConstraintOptions, Resource, Port, PortType, PortPosition } from '@/types/catan';
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

function checkResourceConstraints(tiles: HexTile[], constraints: ConstraintOptions): boolean {
  if (constraints.sameResourceCanTouch) return true;

  const tileMap = new Map<string, HexTile>();
  for (const tile of tiles) {
    tileMap.set(coordKey(tile.coord), tile);
  }

  for (const tile of tiles) {
    if (tile.resource === 'desert') continue;
    for (const nc of getNeighborCoords(tile.coord)) {
      const neighbor = tileMap.get(coordKey(nc));
      if (!neighbor || neighbor.resource === 'desert') continue;
      if (tile.resource === neighbor.resource) return false;
    }
  }

  return true;
}

function checkNumberConstraints(tiles: HexTile[], constraints: ConstraintOptions): boolean {
  const tileMap = new Map<string, HexTile>();
  for (const tile of tiles) {
    tileMap.set(coordKey(tile.coord), tile);
  }

  for (const tile of tiles) {
    if (tile.numberToken == null) continue;
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
  }

  return true;
}

export function generateBoard(config: BoardConfig, constraints: ConstraintOptions): HexTile[] {
  const positions = generateGridPositions(config.rowLayout);
  const outerRetries = 10;
  const resourceRetries = 500;
  const numberRetries = 500;

  for (let outer = 0; outer < outerRetries; outer++) {
    // Phase 1: find a valid resource layout
    let resourceTiles: HexTile[] | null = null;
    for (let r = 0; r < resourceRetries; r++) {
      const resourcePool = shuffle(buildResourcePool(config));
      const tiles: HexTile[] = positions.map((coord, i) => ({
        coord,
        resource: resourcePool[i],
        numberToken: null,
      }));
      if (checkResourceConstraints(tiles, constraints)) {
        resourceTiles = tiles;
        break;
      }
    }

    if (!resourceTiles) continue;

    // Phase 2: find valid number token placement on the resource layout
    for (let n = 0; n < numberRetries; n++) {
      const tiles = resourceTiles.map((t) => ({ ...t }));
      assignNumberTokens(tiles, [...config.numberTokens]);
      if (checkNumberConstraints(tiles, constraints)) {
        return tiles;
      }
    }
  }

  // Fallback: return an unconstrained board
  const resourcePool = shuffle(buildResourcePool(config));
  const tiles: HexTile[] = positions.map((coord, i) => ({
    coord,
    resource: resourcePool[i],
    numberToken: null,
  }));
  assignNumberTokens(tiles, [...config.numberTokens]);
  return tiles;
}

export function generatePorts(positions: PortPosition[], types: PortType[]): Port[] {
  const shuffledTypes = shuffle(types);
  return positions.map((position, i) => ({
    position,
    type: shuffledTypes[i],
  }));
}
