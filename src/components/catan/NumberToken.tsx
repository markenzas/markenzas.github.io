interface NumberTokenProps {
  value: number;
  size: number;
}

export function NumberToken({ value, size }: NumberTokenProps) {
  const isHighProb = value === 6 || value === 8;
  const dots = 6 - Math.abs(7 - value);
  const radius = size * 0.34;
  const fontSize = size * 0.28;
  const dotRadius = size * 0.025;
  const dotY = size * 0.12;

  return (
    <g>
      <circle r={radius} fill="#FFF8E7" stroke="#8B7355" strokeWidth={size * 0.02} />
      <text
        y={-size * 0.02}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight={isHighProb ? 'bold' : '600'}
        fill={isHighProb ? '#DC2626' : '#3B2714'}
        fontFamily="serif"
      >
        {value}
      </text>
      <g transform={`translate(0, ${dotY})`}>
        {Array.from({ length: dots }, (_, i) => {
          const totalWidth = (dots - 1) * dotRadius * 3;
          const x = -totalWidth / 2 + i * dotRadius * 3;
          return (
            <circle
              key={i}
              cx={x}
              cy={0}
              r={dotRadius}
              fill={isHighProb ? '#DC2626' : '#3B2714'}
            />
          );
        })}
      </g>
    </g>
  );
}
