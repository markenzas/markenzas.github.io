import { hexPoints } from "@/lib/catan/hex-utils";
import type { HexTile as HexTileType, Resource } from "@/types/catan";
import { NumberToken } from "./NumberToken";

const RESOURCE_IMAGES: Record<Resource, string> = {
  wood: "catan/tiles/wood.webp",
  brick: "catan/tiles/brick.webp",
  sheep: "catan/tiles/sheep.webp",
  wheat: "catan/tiles/wheat.webp",
  ore: "catan/tiles/ore.webp",
  desert: "catan/tiles/desert.webp",
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
  const imgSrc = `${RESOURCE_IMAGES[tile.resource]}`;

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
        x={-size * 0.87}
        y={-size}
        width={size * 1.74}
        height={size * 2}
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
