import { useMemo } from 'react';

import type { HexTile as HexTileType, Port as PortType } from '@/types/catan';
import { axialToPixel, getPortPixelPositions } from '@/lib/catan/hex-utils';
import { HexTile } from './HexTile';
import { PortMarker } from './PortMarker';

interface BoardDisplayProps {
  tiles: HexTileType[];
  ports: PortType[];
  extended?: boolean;
}

const HEX_SIZE = 50;

export function BoardDisplay({ tiles, ports, extended = false }: BoardDisplayProps) {
  const { viewBox, positions, portPositions, bounds } = useMemo(() => {
    const pos = tiles.map((tile) => ({
      tile,
      ...axialToPixel(tile.coord, HEX_SIZE),
    }));

    if (pos.length === 0) {
      return { viewBox: '0 0 100 100', positions: [], portPositions: [], bounds: { minX: 0, minY: 0, w: 100, h: 100 } };
    }

    const padding = HEX_SIZE * 2.0;
    const xs = pos.map((p) => p.x);
    const ys = pos.map((p) => p.y);

    const pp = ports.map((port) => ({
      port,
      ...getPortPixelPositions(port.position.hexCoord, port.position.edge, HEX_SIZE),
    }));
    const portXs = pp.map((p) => p.portX);
    const portYs = pp.map((p) => p.portY);

    const allXs = [...xs, ...portXs];
    const allYs = [...ys, ...portYs];
    const minX = Math.min(...allXs) - padding;
    const maxX = Math.max(...allXs) + padding;
    const minY = Math.min(...allYs) - padding;
    const maxY = Math.max(...allYs) + padding;
    const w = maxX - minX;
    const h = maxY - minY;

    return {
      viewBox: `${minX} ${minY} ${w} ${h}`,
      positions: pos,
      portPositions: pp,
      bounds: { minX, minY, w, h },
    };
  }, [tiles, ports]);

  const bgImgSrc = `${import.meta.env.BASE_URL}base-background.png`;

  return (
    <div
      className="flex items-center justify-center w-full h-full min-h-100"
      style={extended ? {
        background: 'radial-gradient(ellipse at center, #3B82F6 0%, #2563EB 40%, #1D4ED8 70%, #1E3A5F 100%)',
        backgroundSize: 'cover',
        borderRadius: '1rem',
      } : undefined}
    >
      <svg
        viewBox={viewBox}
        className="w-full h-full max-h-[75vh]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Board background */}
        {!extended && (
          <image
            href={bgImgSrc}
            x={bounds.minX}
            y={bounds.minY}
            width={bounds.w}
            height={bounds.h}
            preserveAspectRatio="xMidYMid slice"
          />
        )}
        {extended && (
          <>
            <defs>
              <radialGradient id="ocean-gradient" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </radialGradient>
              <pattern id="wave-pattern" width="40" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-15)">
                <path d="M0 10 Q10 0 20 10 Q30 20 40 10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect x={bounds.minX} y={bounds.minY} width={bounds.w} height={bounds.h} fill="url(#ocean-gradient)" rx="8" />
            <rect x={bounds.minX} y={bounds.minY} width={bounds.w} height={bounds.h} fill="url(#wave-pattern)" rx="8" />
          </>
        )}

        {positions.map(({ tile, x, y }) => (
          <HexTile
            key={`${tile.coord.q},${tile.coord.r}`}
            tile={tile}
            x={x}
            y={y}
            size={HEX_SIZE}
          />
        ))}

        {portPositions.map(({ port, portX, portY, v1x, v1y, v2x, v2y }) => (
          <PortMarker
            key={`port-${port.position.hexCoord.q},${port.position.hexCoord.r}-${port.position.edge}`}
            portX={portX}
            portY={portY}
            v1x={v1x}
            v1y={v1y}
            v2x={v2x}
            v2y={v2y}
            type={port.type}
            size={HEX_SIZE}
          />
        ))}
      </svg>
    </div>
  );
}
