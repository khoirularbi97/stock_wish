'use client';

import { useState, useEffect } from 'react';

interface RadarData {
  label: string;
  value: number;
}

interface RadarChartVisualizationProps {
  data: RadarData[];
  title: string;
  color: string;
}

const RadarChartVisualization = ({ data, title, color }: RadarChartVisualizationProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="w-full h-96 md:h-80 sm:h-64 bg-muted/30 rounded-lg animate-pulse" />
    );
  }

  const centerX = 50;
  const centerY = 50;
  const radius = 40;
  const levels = 5;

  const angleStep = (2 * Math.PI) / data.length;

  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = (value / 1) * radius;
    return {
      x: centerX + distance * Math.cos(angle),
      y: centerY + distance * Math.sin(angle)
    };
  };

  const dataPoints = data.map((item, index) => ({
    ...getPoint(item.value, index),
    label: item.label,
    value: item.value
  }));

  const pathData = dataPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <div className="w-full min-w-0 p-6 md:p-5 sm:p-4 bg-surface rounded-lg border border-border">
      <h3 className="text-lg md:text-base sm:text-sm font-semibold text-text-primary mb-6 md:mb-4 sm:mb-3 line-clamp-2">{title}</h3>
      <div className="w-full aspect-square max-w-md mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {[...Array(levels)].map((_, i) => {
            const levelRadius = radius * ((i + 1) / levels);
            const levelPoints = data.map((_, index) => {
              const angle = index * angleStep - Math.PI / 2;
              return {
                x: centerX + levelRadius * Math.cos(angle),
                y: centerY + levelRadius * Math.sin(angle)
              };
            });
            const levelPath = levelPoints.map((point, index) => 
              `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
            ).join(' ') + ' Z';
            
            return (
              <path
                key={i}
                d={levelPath}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="0.2"
              />
            );
          })}

          {data.map((_, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const endX = centerX + radius * Math.cos(angle);
            const endY = centerY + radius * Math.sin(angle);
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={endX}
                y2={endY}
                stroke="#E2E8F0"
                strokeWidth="0.2"
              />
            );
          })}

          <path
            d={pathData}
            fill={`${color}40`}
            stroke={color}
            strokeWidth="0.5"
          />

          {dataPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="1.5"
              fill={hoveredPoint === index ? color : 'white'}
              stroke={color}
              strokeWidth="0.5"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {data.map((item, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const labelDistance = radius + 8;
            const labelX = centerX + labelDistance * Math.cos(angle);
            const labelY = centerY + labelDistance * Math.sin(angle);
            
            return (
              <text
                key={index}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[3px] fill-text-secondary font-medium"
              >
                {item.label}
              </text>
            );
          })}
        </svg>
      </div>
      {hoveredPoint !== null && (
        <div className="mt-4 md:mt-3 sm:mt-2 text-center">
          <div className="text-sm md:text-xs font-semibold text-text-primary">{data[hoveredPoint].label}</div>
          <div className="text-lg md:text-base font-bold text-primary whitespace-nowrap">{data[hoveredPoint].value.toFixed(4)}</div>
        </div>
      )}
    </div>
  );
};

export default RadarChartVisualization;