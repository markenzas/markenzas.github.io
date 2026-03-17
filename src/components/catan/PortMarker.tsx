import type { PortType } from "@/types/catan";

const RESOURCE_IMAGES: Record<string, string> = {
  wood: "catan/resources/wood.webp",
  brick: "catan/resources/clay.webp",
  sheep: "catan/resources/sheep.webp",
  wheat: "catan/resources/wheat.webp",
  ore: "catan/resources/iron.webp",
};

function BridgeLine({
  x1,
  y1,
  x2,
  y2,
  size,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  size: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const plankCount = Math.max(3, Math.floor(length / (size * 0.08)));
  const plankWidth = size * 0.04;
  const plankHeight = size * 0.12;

  const planks = [];
  for (let i = 0; i <= plankCount; i++) {
    const t = i / plankCount;
    const px = x1 + dx * t;
    const py = y1 + dy * t;
    planks.push(
      <rect
        key={i}
        x={px - plankWidth / 2}
        y={py - plankHeight / 2}
        width={plankWidth}
        height={plankHeight}
        rx={plankWidth * 0.2}
        fill="#99948e"
        stroke="#9c8b79"
        strokeWidth={size * 0.008}
        transform={`rotate(${angle}, ${px}, ${py})`}
      />,
    );
  }

  const perpX = (-dy / length) * plankHeight * 0.35;
  const perpY = (dx / length) * plankHeight * 0.35;

  return (
    <g>
      <line
        x1={x1 + perpX}
        y1={y1 + perpY}
        x2={x2 + perpX}
        y2={y2 + perpY}
        stroke="#6B4E2A"
        strokeWidth={size * 0.015}
      />
      <line
        x1={x1 - perpX}
        y1={y1 - perpY}
        x2={x2 - perpX}
        y2={y2 - perpY}
        stroke="#6B4E2A"
        strokeWidth={size * 0.015}
      />
      {planks}
    </g>
  );
}

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

export function PortMarker({
  portX,
  portY,
  v1x,
  v1y,
  v2x,
  v2y,
  type,
  size,
}: PortMarkerProps) {
  const isGeneric = type === "generic";
  const ratio = isGeneric ? "3:1" : "2:1";
  const fontSize = size * 0.2;
  const imgSrc = !isGeneric ? `${RESOURCE_IMAGES[type]}` : null;

  // Boat dimensions
  const boatW = size * 0.8;
  const boatH = size * 0.15;
  const sailH = size * 0.65;
  const sailW = size * 0.35;

  // Boat hull path (curved bottom)
  const hullPath = `M ${portX - boatW / 2} ${portY + boatH * 0.3} 
    Q ${portX - boatW * 0.3} ${portY + boatH * 1.2} ${portX} ${portY + boatH * 1.3}
    Q ${portX + boatW * 0.3} ${portY + boatH * 1.2} ${portX + boatW / 2} ${portY + boatH * 0.3} 
    Z`;

  // Sail path (curved triangle)
  const sailPath = `M ${portX - boatW / 3} ${portY - sailH + boatH * 0.3}
    Q ${portX + sailW * 1.6} ${portY - sailH * 0.8} ${portX + sailW * 0.4} ${portY + boatH * 0.4}
    L ${portX - boatW / 3} ${portY + boatH * 0.4} Z`;

  return (
    <g>
      {/* Bridge-style dock lines */}
      <BridgeLine x1={portX} y1={portY} x2={v1x} y2={v1y} size={size} />
      <BridgeLine x1={portX} y1={portY} x2={v2x} y2={v2y} size={size} />

      {/* Dock vertices */}
      <circle
        cx={v1x}
        cy={v1y}
        r={size * 0.06}
        fill="#D4A76A"
        stroke="#8B7355"
        strokeWidth={size * 0.02}
      />
      <circle
        cx={v2x}
        cy={v2y}
        r={size * 0.06}
        fill="#D4A76A"
        stroke="#8B7355"
        strokeWidth={size * 0.02}
      />

      {/* Boat hull */}
      <path
        d={hullPath}
        fill="#8B6914"
        stroke="#5C4A32"
        strokeWidth={size * 0.02}
      />

      {/* Mast */}
      <line
        x1={portX}
        y1={portY - sailH + boatH * 0.3}
        x2={portX}
        y2={portY + boatH * 0.5}
        stroke="#5C4A32"
        strokeWidth={size * 0.025}
        strokeLinecap="round"
      />

      {/* Sail */}
      <path
        d={sailPath}
        fill="#FFF8E7"
        stroke="#8B7355"
        strokeWidth={size * 0.02}
        opacity={0.95}
      />

      {/* Ratio text on sail */}
      <text
        x={portX - sailW * 0.25}
        y={portY - sailH * 0.6}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight="bold"
        fill="#5C4A32"
        fontFamily="serif"
        style={{ userSelect: "none" }}
      >
        {ratio}
      </text>

      {/* Generic port: dark gray "?" */}
      {isGeneric && (
        <text
          x={portX - sailW * 0.05}
          y={portY - sailH * 0.16}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.35}
          fontWeight="bold"
          fill="#555"
          fontFamily="serif"
          style={{ userSelect: "none" }}
        >
          ?
        </text>
      )}

      {/* Resource icon */}
      {imgSrc && (
        <image
          href={imgSrc}
          x={portX - size * 0.18}
          y={portY - sailH * 0.4}
          width={size * 0.32}
          height={size * 0.32}
          preserveAspectRatio="xMidYMid meet"
        />
      )}
    </g>
  );
}
