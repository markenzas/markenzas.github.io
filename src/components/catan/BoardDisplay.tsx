import { useMemo } from 'react';
import type { HexTile as HexTileType } from '../../lib/catan/types';
import { axialToPixel } from '../../lib/catan/hex-utils';
import { HexTile } from './HexTile';

interface BoardDisplayProps {
  tiles: HexTileType[];
}

const HEX_SIZE = 50;

export function BoardDisplay({ tiles }: BoardDisplayProps) {
  const { viewBox, positions } = useMemo(() => {
    const pos = tiles.map((tile) => ({
      tile,
      ...axialToPixel(tile.coord, HEX_SIZE),
    }));

    if (pos.length === 0) {
      return { viewBox: '0 0 100 100', positions: [] };
    }

    const padding = HEX_SIZE * 1.2;
    const xs = pos.map((p) => p.x);
    const ys = pos.map((p) => p.y);
    const minX = Math.min(...xs) - padding;
    const maxX = Math.max(...xs) + padding;
    const minY = Math.min(...ys) - padding;
    const maxY = Math.max(...ys) + padding;

    return {
      viewBox: `${minX} ${minY} ${maxX - minX} ${maxY - minY}`,
      positions: pos,
    };
  }, [tiles]);

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[400px]">
      <svg
        viewBox={viewBox}
        className="w-full h-full max-h-[75vh]"
        preserveAspectRatio="xMidYMid meet"
      >
        {positions.map(({ tile, x, y }) => (
          <HexTile
            key={`${tile.coord.q},${tile.coord.r}`}
            tile={tile}
            x={x}
            y={y}
            size={HEX_SIZE}
          />
        ))}
      </svg>
    </div>
  );
}
