'use client';

import { useState, useEffect } from 'react';

interface ScatterPoint {
  x: number;
  y: number;
  label: string;
  color: string;
}

interface ScatterPlotVisualizationProps {
  data: ScatterPoint[];
  title: string;
  xLabel: string;
  yLabel: string;
}

const ScatterPlotVisualization = ({ data, title, xLabel, yLabel }: ScatterPlotVisualizationProps) => {
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

  const maxX = Math.max(...data.map(d => d.x));
  const minX = Math.min(...data.map(d => d.x));
  const maxY = Math.max(...data.map(d => d.y));
  const minY = Math.min(...data.map(d => d.y));

  const rangeX = maxX - minX;
  const rangeY = maxY - minY;

  const normalizedPoints = data.map(point => ({
    x: ((point.x - minX) / rangeX) * 90 + 5,
    y: ((maxY - point.y) / rangeY) * 90 + 5,
    label: point.label,
    color: point.color,
    originalX: point.x,
    originalY: point.y
  }));

  return (
    <div className="w-full min-w-0 p-6 md:p-5 sm:p-4 bg-surface rounded-lg border border-border">
      <h3 className="text-lg md:text-base sm:text-sm font-semibold text-text-primary mb-6 md:mb-4 sm:mb-3 line-clamp-2">{title}</h3>
      <div className="w-full aspect-square max-w-2xl mx-auto relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line x1="5" y1="95" x2="95" y2="95" stroke="#E2E8F0" strokeWidth="0.3" />
          <line x1="5" y1="5" x2="5" y2="95" stroke="#E2E8F0" strokeWidth="0.3" />

          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={`x-${tick}`}>
              <line x1={tick * 0.9 + 5} y1="95" x2={tick * 0.9 + 5} y2="96" stroke="#718096" strokeWidth="0.2" />
            </g>
          ))}

          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={`y-${tick}`}>
              <line x1="4" y1={95 - (tick * 0.9)} x2="5" y2={95 - (tick * 0.9)} stroke="#718096" strokeWidth="0.2" />
            </g>
          ))}

          {normalizedPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === index ? "2" : "1.5"}
              fill={point.color}
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>

        {hoveredPoint !== null && (
          <div
            className="absolute px-2 py-1 bg-text-primary text-white text-xs md:text-[10px] rounded whitespace-nowrap pointer-events-none z-10"
            style={{
              left: `${normalizedPoints[hoveredPoint].x}%`,
              top: `${normalizedPoints[hoveredPoint].y}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <div className="font-semibold">{normalizedPoints[hoveredPoint].label}</div>
            <div>X: {normalizedPoints[hoveredPoint].originalX.toFixed(3)}</div>
            <div>Y: {normalizedPoints[hoveredPoint].originalY.toFixed(3)}</div>
          </div>
        )}

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs md:text-[10px] text-text-secondary font-medium whitespace-nowrap">
          {xLabel}
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs md:text-[10px] text-text-secondary font-medium whitespace-nowrap">
          {yLabel}
        </div>
      </div>
    </div>
  );
};

export default ScatterPlotVisualization;