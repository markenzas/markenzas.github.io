import { describe, it, expect } from 'vitest';
import { generateGridPositions, getNeighborCoords, coordKey, axialToPixel, hexPoints, getPortPixelPositions } from '../hex-utils';

describe('generateGridPositions', () => {
  it('generates 19 positions for base 3-4p', () => {
    const positions = generateGridPositions([3, 4, 5, 4, 3]);
    expect(positions).toHaveLength(19);
  });

  it('generates 30 positions for base 5-6p', () => {
    const positions = generateGridPositions([3, 4, 5, 6, 5, 4, 3]);
    expect(positions).toHaveLength(30);
  });

  it('produces no duplicate coordinates', () => {
    const positions = generateGridPositions([3, 4, 5, 4, 3]);
    const keys = positions.map(p => coordKey(p));
    expect(new Set(keys).size).toBe(positions.length);
  });
});

describe('getNeighborCoords', () => {
  it('returns 6 neighbors', () => {
    const neighbors = getNeighborCoords({ q: 0, r: 0 });
    expect(neighbors).toHaveLength(6);
  });

  it('returns correct neighbors for origin', () => {
    const neighbors = getNeighborCoords({ q: 0, r: 0 });
    const keys = neighbors.map(n => coordKey(n)).sort();
    expect(keys).toEqual(['-1,0', '-1,1', '0,-1', '0,1', '1,-1', '1,0']);
  });
});

describe('coordKey', () => {
  it('returns "q,r" format', () => {
    expect(coordKey({ q: 3, r: -2 })).toBe('3,-2');
  });
});

describe('axialToPixel', () => {
  it('maps origin to (0,0)', () => {
    const { x, y } = axialToPixel({ q: 0, r: 0 }, 50);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(0);
  });

  it('uses pointy-top formula', () => {
    const { x, y } = axialToPixel({ q: 1, r: 0 }, 50);
    expect(x).toBeCloseTo(50 * Math.sqrt(3));
    expect(y).toBeCloseTo(0);
  });
});

describe('hexPoints', () => {
  it('returns 6 point pairs', () => {
    const points = hexPoints(50);
    const pairs = points.split(' ');
    expect(pairs).toHaveLength(6);
  });
});

describe('getPortPixelPositions', () => {
  it('returns port position outside hex center', () => {
    const result = getPortPixelPositions({ q: 0, r: 0 }, 0, 50);
    const dist = Math.sqrt(result.portX ** 2 + result.portY ** 2);
    expect(dist).toBeGreaterThan(50);
  });
});
