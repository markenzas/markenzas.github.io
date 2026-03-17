import type { PortType } from '@/types/catan';

const RESOURCE_IMAGES: Record<string, string> = {
  wood: 'wood.png',
  brick: 'brick.png',
  sheep: 'sheep.png',
  wheat: 'wheat.png',
  ore: 'ore.png',
};

interface PortMarkerProps {
  portX: number;
  portY: number;
  v1x: number;
  v1y: number;
  v2x: number;
  v2y: number;
  type: PortType;
  size: number;
}

export function PortMarker({ portX, portY, v1x, v1y, v2x, v2y, type, size }: PortMarkerProps) {
  const isGeneric = type === 'generic';
  const ratio = isGeneric ? '3:1' : '2:1';
  const w = size * 0.58;
  const h = size * 0.48;
  const fontSize = size * 0.22;
  const imgSrc = !isGeneric ? `${import.meta.env.BASE_URL}${RESOURCE_IMAGES[type]}` : null;

  return (
    <g>
      {/* Dock lines */}
      <line x1={portX} y1={portY} x2={v1x} y2={v1y} stroke="#8B7355" strokeWidth={size * 0.025} strokeDasharray={`${size * 0.06} ${size * 0.04}`} />
      <line x1={portX} y1={portY} x2={v2x} y2={v2y} stroke="#8B7355" strokeWidth={size * 0.025} strokeDasharray={`${size * 0.06} ${size * 0.04}`} />

      {/* Dock vertices */}
      <circle cx={v1x} cy={v1y} r={size * 0.06} fill="#D4A76A" stroke="#8B7355" strokeWidth={size * 0.02} />
      <circle cx={v2x} cy={v2y} r={size * 0.06} fill="#D4A76A" stroke="#8B7355" strokeWidth={size * 0.02} />

      {/* Port background */}
      <rect
        x={portX - w / 2}
        y={portY - h / 2}
        width={w}
        height={h}
        rx={size * 0.06}
        fill="#FFF8E7"
        stroke="#8B7355"
        strokeWidth={size * 0.03}
      />

      {/* Ratio text */}
      <text
        x={portX}
        y={isGeneric ? portY + fontSize * 0.35 : portY - h * 0.05}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight="bold"
        fill="#5C4A32"
        fontFamily="serif"
      >
        {ratio}
      </text>

      {/* Resource icon for non-generic ports */}
      {imgSrc && (
        <image
          href={imgSrc}
          x={portX - size * 0.12}
          y={portY + h * 0.04}
          width={size * 0.24}
          height={size * 0.24}
          preserveAspectRatio="xMidYMid meet"
        />
      )}
    </g>
  );
}
