import type { AxialCoord } from '@/types/catan';

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

/** Convert axial coordinates to pixel position (pointy-top hex) */
export function axialToPixel(coord: AxialCoord, size: number): { x: number; y: number } {
  const x = size * (Math.sqrt(3) * coord.q + Math.sqrt(3) / 2 * coord.r);
  const y = size * (3 / 2 * coord.r);
  return { x, y };
}

/** Get SVG points string for a pointy-top hexagon */
export function hexPoints(size: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    points.push(`${size * Math.cos(angle)},${size * Math.sin(angle)}`);
  }
  return points.join(' ');
}

/** Compute pixel positions for a port on a given hex edge (pointy-top) */
export function getPortPixelPositions(
  hexCoord: AxialCoord,
  edge: number,
  size: number,
): { portX: number; portY: number; v1x: number; v1y: number; v2x: number; v2y: number; angle: number } {
  const { x: cx, y: cy } = axialToPixel(hexCoord, size);
  const a1 = (Math.PI / 180) * (60 * edge - 30);
  const a2 = (Math.PI / 180) * (60 * ((edge + 1) % 6) - 30);
  const v1x = cx + size * Math.cos(a1);
  const v1y = cy + size * Math.sin(a1);
  const v2x = cx + size * Math.cos(a2);
  const v2y = cy + size * Math.sin(a2);
  const edgeAngle = (Math.PI / 180) * (60 * edge);
  const offset = size * 1.55;
  const portX = cx + offset * Math.cos(edgeAngle);
  const portY = cy + offset * Math.sin(edgeAngle);
  const angleDeg = 60 * edge;
  return { portX, portY, v1x, v1y, v2x, v2y, angle: angleDeg };
}
