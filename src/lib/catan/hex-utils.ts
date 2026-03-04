import type { AxialCoord } from './types';

export function generateGridPositions(rowLayout: number[]): AxialCoord[] {
  const positions: AxialCoord[] = [];
  const midRow = Math.floor(rowLayout.length / 2);

  for (let rowIdx = 0; rowIdx < rowLayout.length; rowIdx++) {
    const count = rowLayout[rowIdx];
    const r = rowIdx - midRow;
    const qStart = -midRow - Math.min(r, 0);
    const qEnd = qStart + count;

    for (let q = qStart; q < qEnd; q++) {
      positions.push({ q, r });
    }
  }

  return positions;
}

const AXIAL_DIRECTIONS: AxialCoord[] = [
  { q: 1, r: 0 },
  { q: -1, r: 0 },
  { q: 0, r: 1 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
  { q: -1, r: 1 },
];

export function getNeighborCoords(coord: AxialCoord): AxialCoord[] {
  return AXIAL_DIRECTIONS.map((d) => ({ q: coord.q + d.q, r: coord.r + d.r }));
}

export function coordKey(coord: AxialCoord): string {
  return `${coord.q},${coord.r}`;
}

/** Convert axial coordinates to pixel position (flat-top hex) */
export function axialToPixel(coord: AxialCoord, size: number): { x: number; y: number } {
  const x = size * (3 / 2 * coord.q);
  const y = size * (Math.sqrt(3) / 2 * coord.q + Math.sqrt(3) * coord.r);
  return { x, y };
}

/** Get SVG points string for a flat-top hexagon */
export function hexPoints(size: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i);
    points.push(`${size * Math.cos(angle)},${size * Math.sin(angle)}`);
  }
  return points.join(' ');
}
