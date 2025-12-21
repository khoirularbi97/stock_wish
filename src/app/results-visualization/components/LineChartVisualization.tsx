'use client';

import { useState, useEffect } from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartVisualizationProps {
  data: DataPoint[];
  title: string;
  color: string;
}

const LineChartVisualization = ({ data, title, color }: LineChartVisualizationProps) => {
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

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const getYPosition = (value: number) => {
    return ((maxValue - value) / range) * 100;
  };

  const points = data.map((point, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: getYPosition(point.value),
    value: point.value,
    label: point.label
  }));

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div className="w-full min-w-0 p-6 md:p-5 sm:p-4 bg-surface rounded-lg border border-border">
      <h3 className="text-lg md:text-base sm:text-sm font-semibold text-text-primary mb-6 md:mb-4 sm:mb-3 line-clamp-2">{title}</h3>
      <div className="w-full h-80 md:h-64 sm:h-48 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="1.5"
                fill={hoveredPoint === index ? color : 'white'}
                stroke={color}
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </g>
          ))}
        </svg>
        {hoveredPoint !== null && (
          <div
            className="absolute px-2 py-1 bg-text-primary text-white text-xs md:text-[10px] rounded whitespace-nowrap pointer-events-none"
            style={{
              left: `${points[hoveredPoint].x}%`,
              top: `${points[hoveredPoint].y}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <div className="font-semibold">{points[hoveredPoint].label}</div>
            <div>{points[hoveredPoint].value.toFixed(4)}</div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 md:gap-1.5 sm:gap-1 mt-4 md:mt-3 sm:mt-2 overflow-x-auto">
        {data.map((point, index) => (
          <div
            key={index}
            className="flex-shrink-0 text-xs md:text-[10px] text-text-secondary px-2 py-1 bg-muted rounded whitespace-nowrap"
          >
            {point.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChartVisualization;