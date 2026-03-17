import type { HexTile as HexTileType, Resource } from '@/types/catan';
import { hexPoints } from '@/lib/catan/hex-utils';
import { NumberToken } from './NumberToken';

const RESOURCE_IMAGES: Record<Resource, string> = {
  wood: 'wood.png',
  brick: 'brick.png',
  sheep: 'sheep.png',
  wheat: 'wheat.png',
  ore: 'ore.png',
  desert: 'desert.png',
};

interface HexTileProps {
  tile: HexTileType;
  x: number;
  y: number;
  size: number;
}

export function HexTile({ tile, x, y, size }: HexTileProps) {
  const points = hexPoints(size);
  const hasNumber = tile.numberToken != null;
  const clipId = `hex-clip-${tile.coord.q}-${tile.coord.r}`;
  const imgSrc = `${import.meta.env.BASE_URL}${RESOURCE_IMAGES[tile.resource]}`;

  return (
    <g transform={`translate(${x}, ${y})`} className="hex-tile">
      <defs>
        <clipPath id={clipId}>
          <polygon points={points} />
        </clipPath>
      </defs>

      {/* Resource image clipped to hex */}
      <image
        href={imgSrc}
        x={-size}
        y={-size * 0.87}
        width={size * 2}
        height={size * 1.74}
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
      />

      {/* Hex border */}
      <polygon
        points={points}
        fill="none"
        stroke="#5C4A32"
        strokeWidth={size * 0.03}
        strokeLinejoin="round"
      />

      {/* Number token */}
      {hasNumber && (
        <g transform={`translate(0, ${size * 0.15})`}>
          <NumberToken value={tile.numberToken!} size={size} />
        </g>
      )}
    </g>
  );
}
