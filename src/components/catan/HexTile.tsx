import type { HexTile as HexTileType, Resource } from '@/types/catan';
import { hexPoints } from '@/lib/catan/hex-utils';
import { RESOURCE_COLORS } from '@/lib/catan/configs';
import { NumberToken } from './NumberToken';

const RESOURCE_EMOJI: Record<Resource, string> = {
  wood: '🌲',
  brick: '🧱',
  sheep: '🐑',
  wheat: '🌾',
  ore: '⛏️',
  desert: '🏜️',
  sea: '🌊',
  gold: '✨',
};

interface HexTileProps {
  tile: HexTileType;
  x: number;
  y: number;
  size: number;
}

export function HexTile({ tile, x, y, size }: HexTileProps) {
  const points = hexPoints(size);
  const color = RESOURCE_COLORS[tile.resource];
  const emoji = RESOURCE_EMOJI[tile.resource];
  const hasNumber = tile.numberToken != null;
  const emojiSize = size * 0.35;
  const emojiY = hasNumber ? -size * 0.22 : size * 0.06;

  return (
    <g transform={`translate(${x}, ${y})`} className="hex-tile">
      {/* Hex shape */}
      <polygon
        points={points}
        fill={color}
        stroke="#5C4A32"
        strokeWidth={size * 0.03}
        strokeLinejoin="round"
      />

      {/* Sea wave pattern overlay */}
      {tile.resource === 'sea' && (
        <g opacity={0.3}>
          <path
            d={`M${-size * 0.5},${-size * 0.1} Q${-size * 0.25},${-size * 0.3} 0,${-size * 0.1} Q${size * 0.25},${size * 0.1} ${size * 0.5},${-size * 0.1}`}
            fill="none"
            stroke="white"
            strokeWidth={size * 0.04}
            strokeLinecap="round"
          />
          <path
            d={`M${-size * 0.5},${size * 0.2} Q${-size * 0.25},0 0,${size * 0.2} Q${size * 0.25},${size * 0.4} ${size * 0.5},${size * 0.2}`}
            fill="none"
            stroke="white"
            strokeWidth={size * 0.04}
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Gold sparkle overlay */}
      {tile.resource === 'gold' && (
        <g opacity={0.4}>
          {[0, 72, 144, 216, 288].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const dist = size * 0.35;
            return (
              <circle
                key={angle}
                cx={Math.cos(rad) * dist}
                cy={Math.sin(rad) * dist}
                r={size * 0.04}
                fill="white"
              />
            );
          })}
        </g>
      )}

      {/* Resource emoji */}
      <text
        y={emojiY}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={emojiSize}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {emoji}
      </text>

      {/* Number token */}
      {hasNumber && (
        <g transform={`translate(0, ${size * 0.15})`}>
          <NumberToken value={tile.numberToken!} size={size} />
        </g>
      )}
    </g>
  );
}
