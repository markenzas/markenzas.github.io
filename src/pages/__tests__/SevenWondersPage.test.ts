import { describe, it, expect } from 'vitest';

/**
 * Science scoring from Seven Wonders:
 * - Each symbol type scores count² points
 * - Each complete set of all 3 different symbols scores 7 points
 */
function calculateScienceScore(compass: number, gear: number, tablet: number) {
  const compassPts = compass * compass;
  const gearPts = gear * gear;
  const tabletPts = tablet * tablet;
  const completeSets = Math.min(compass, gear, tablet);
  const setPts = completeSets * 7;
  return {
    compassPts,
    gearPts,
    tabletPts,
    completeSets,
    setPts,
    total: compassPts + gearPts + tabletPts + setPts,
  };
}

describe('Seven Wonders science scoring', () => {
  it('scores 0 with no symbols', () => {
    const result = calculateScienceScore(0, 0, 0);
    expect(result.total).toBe(0);
  });

  it('scores n² for a single symbol type', () => {
    expect(calculateScienceScore(3, 0, 0).total).toBe(9);
    expect(calculateScienceScore(0, 4, 0).total).toBe(16);
    expect(calculateScienceScore(0, 0, 5).total).toBe(25);
  });

  it('scores 1 complete set (1,1,1) = 1+1+1+7 = 10', () => {
    const result = calculateScienceScore(1, 1, 1);
    expect(result.compassPts).toBe(1);
    expect(result.gearPts).toBe(1);
    expect(result.tabletPts).toBe(1);
    expect(result.completeSets).toBe(1);
    expect(result.setPts).toBe(7);
    expect(result.total).toBe(10);
  });

  it('scores 2 complete sets (2,2,2) = 4+4+4+14 = 26', () => {
    const result = calculateScienceScore(2, 2, 2);
    expect(result.completeSets).toBe(2);
    expect(result.total).toBe(26);
  });

  it('scores mixed (3,2,1) = 9+4+1+7 = 21', () => {
    const result = calculateScienceScore(3, 2, 1);
    expect(result.compassPts).toBe(9);
    expect(result.gearPts).toBe(4);
    expect(result.tabletPts).toBe(1);
    expect(result.completeSets).toBe(1);
    expect(result.total).toBe(21);
  });

  it('scores (4,1,1) = 16+1+1+7 = 25', () => {
    const result = calculateScienceScore(4, 1, 1);
    expect(result.total).toBe(25);
  });

  it('scores with one symbol missing = no sets', () => {
    const result = calculateScienceScore(5, 3, 0);
    expect(result.completeSets).toBe(0);
    expect(result.setPts).toBe(0);
    expect(result.total).toBe(34);
  });

  it('scores (6,6,6) = 36+36+36+42 = 150', () => {
    const result = calculateScienceScore(6, 6, 6);
    expect(result.total).toBe(150);
  });

  it('complete sets use minimum of all three', () => {
    expect(calculateScienceScore(5, 2, 3).completeSets).toBe(2);
    expect(calculateScienceScore(1, 6, 4).completeSets).toBe(1);
  });
});
