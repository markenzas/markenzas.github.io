import { describe, it, expect } from 'vitest';
import { generateBoard } from '../board-generator';
import { getConfig } from '../configs';
import { getNeighborCoords, coordKey } from '../hex-utils';
import type { ConstraintOptions, HexTile } from '@/types/catan';
import { DEFAULT_CONSTRAINTS } from '@/types/catan';

function getAdjacentPairs(tiles: HexTile[]): Array<[HexTile, HexTile]> {
  const tileMap = new Map<string, HexTile>();
  for (const t of tiles) tileMap.set(coordKey(t.coord), t);
  const pairs: Array<[HexTile, HexTile]> = [];
  for (const tile of tiles) {
    for (const nc of getNeighborCoords(tile.coord)) {
      const neighbor = tileMap.get(coordKey(nc));
      if (neighbor) pairs.push([tile, neighbor]);
    }
  }
  return pairs;
}

describe('generateBoard', () => {
  describe('base 3-4 player', () => {
    const config = getConfig(false);

    it('produces 19 tiles', () => {
      const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
      expect(tiles).toHaveLength(19);
    });

    it('has correct resource counts', () => {
      const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
      const counts: Record<string, number> = {};
      for (const t of tiles) counts[t.resource] = (counts[t.resource] || 0) + 1;
      expect(counts['wood']).toBe(4);
      expect(counts['brick']).toBe(3);
      expect(counts['sheep']).toBe(4);
      expect(counts['wheat']).toBe(4);
      expect(counts['ore']).toBe(3);
      expect(counts['desert']).toBe(1);
    });

    it('desert tiles have no number token', () => {
      const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
      const deserts = tiles.filter(t => t.resource === 'desert');
      for (const d of deserts) expect(d.numberToken).toBeNull();
    });

    it('has correct number of tokens', () => {
      const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
      const numbered = tiles.filter(t => t.numberToken !== null);
      expect(numbered).toHaveLength(18);
    });

    it('enforces no same resources touching by default', () => {
      for (let i = 0; i < 15; i++) {
        const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
        const pairs = getAdjacentPairs(tiles);
        for (const [a, b] of pairs) {
          if (a.resource !== 'desert' && b.resource !== 'desert') {
            expect(a.resource === b.resource).toBe(false);
          }
        }
      }
    });

    it('enforces no 6&8 touching by default', () => {
      for (let i = 0; i < 15; i++) {
        const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
        const pairs = getAdjacentPairs(tiles);
        for (const [a, b] of pairs) {
          if (a.numberToken && b.numberToken) {
            const isHighProb = (n: number) => n === 6 || n === 8;
            expect(isHighProb(a.numberToken) && isHighProb(b.numberToken)).toBe(false);
          }
        }
      }
    });

    it('enforces no 2&12 touching by default', () => {
      for (let i = 0; i < 15; i++) {
        const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
        const pairs = getAdjacentPairs(tiles);
        for (const [a, b] of pairs) {
          if (a.numberToken && b.numberToken) {
            const isLowProb = (n: number) => n === 2 || n === 12;
            expect(isLowProb(a.numberToken) && isLowProb(b.numberToken)).toBe(false);
          }
        }
      }
    });

    it('enforces no same numbers touching by default', () => {
      for (let i = 0; i < 15; i++) {
        const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
        const pairs = getAdjacentPairs(tiles);
        for (const [a, b] of pairs) {
          if (a.numberToken != null && b.numberToken != null) {
            expect(a.numberToken === b.numberToken).toBe(false);
          }
        }
      }
    });

    it('generates board with all constraints relaxed', () => {
      const relaxed: ConstraintOptions = {
        sixEightCanTouch: true,
        twoTwelveCanTouch: true,
        sameNumberCanTouch: true,
        sameResourceCanTouch: true,
      };
      const tiles = generateBoard(config, relaxed);
      expect(tiles).toHaveLength(19);
    });
  });

  describe('base 5-6 player', () => {
    const config = getConfig(true);

    it('produces 30 tiles', () => {
      const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
      expect(tiles).toHaveLength(30);
    });

    it('has correct resource counts', () => {
      const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
      const counts: Record<string, number> = {};
      for (const t of tiles) counts[t.resource] = (counts[t.resource] || 0) + 1;
      expect(counts['wood']).toBe(6);
      expect(counts['brick']).toBe(5);
      expect(counts['sheep']).toBe(6);
      expect(counts['wheat']).toBe(6);
      expect(counts['ore']).toBe(5);
      expect(counts['desert']).toBe(2);
    });

    it('has correct number of tokens (28)', () => {
      const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
      const numbered = tiles.filter(t => t.numberToken !== null);
      expect(numbered).toHaveLength(28);
    });

    it('always returns a valid board even if constraints cannot be met', () => {
      // The 5-6 player board may fall back to unconstrained layout
      // but should still have correct structure
      for (let i = 0; i < 5; i++) {
        const tiles = generateBoard(config, DEFAULT_CONSTRAINTS);
        expect(tiles).toHaveLength(30);
        const deserts = tiles.filter(t => t.resource === 'desert');
        for (const d of deserts) expect(d.numberToken).toBeNull();
        const numbered = tiles.filter(t => t.numberToken !== null);
        expect(numbered).toHaveLength(28);
      }
    });
  });
});
