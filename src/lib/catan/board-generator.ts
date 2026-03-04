import type { HexTile, BoardConfig, ConstraintOptions, Resource } from './types';
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
  const resourceTypes: Resource[] = ['wood', 'brick', 'sheep', 'wheat', 'ore', 'desert', 'sea', 'gold'];
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
    if (tile.resource === 'desert' || tile.resource === 'sea') {
      tile.numberToken = null;
    } else {
      tile.numberToken = shuffledTokens[tokenIdx++] ?? null;
    }
  }
}

function checkConstraints(tiles: HexTile[], constraints: ConstraintOptions): boolean {
  const tileMap = new Map<string, HexTile>();
  for (const tile of tiles) {
    tileMap.set(coordKey(tile.coord), tile);
  }

  for (const tile of tiles) {
    if (tile.resource === 'sea') continue;
    const neighbors = getNeighborCoords(tile.coord);

    for (const nc of neighbors) {
      const neighbor = tileMap.get(coordKey(nc));
      if (!neighbor || neighbor.resource === 'sea') continue;

      if (!constraints.sameResourceCanTouch) {
        if (tile.resource !== 'desert' && tile.resource === neighbor.resource) return false;
      }

      if (tile.numberToken != null && neighbor.numberToken != null) {
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
  }

  return true;
}

export function generateBoard(config: BoardConfig, constraints: ConstraintOptions): HexTile[] {
  const positions = generateGridPositions(config.rowLayout);
  const maxRetries = 1000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const resourcePool = shuffle(buildResourcePool(config));
    const tiles: HexTile[] = positions.map((coord, i) => ({
      coord,
      resource: resourcePool[i],
      numberToken: null,
    }));

    assignNumberTokens(tiles, [...config.numberTokens]);

    if (checkConstraints(tiles, constraints)) {
      return tiles;
    }
  }

  // Fallback: relax all constraints and return best effort
  const resourcePool = shuffle(buildResourcePool(config));
  const tiles: HexTile[] = positions.map((coord, i) => ({
    coord,
    resource: resourcePool[i],
    numberToken: null,
  }));
  assignNumberTokens(tiles, [...config.numberTokens]);
  return tiles;
}
