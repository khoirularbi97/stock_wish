'use client';

import { useState, useEffect } from 'react';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface BarChartVisualizationProps {
  data: ChartData[];
  title: string;
}

const BarChartVisualization = ({ data, title }: BarChartVisualizationProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="w-full h-96 md:h-80 sm:h-64 bg-muted/30 rounded-lg animate-pulse" />
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full min-w-0 p-6 md:p-5 sm:p-4 bg-surface rounded-lg border border-border">
      <h3 className="text-lg md:text-base sm:text-sm font-semibold text-text-primary mb-6 md:mb-4 sm:mb-3 line-clamp-2">{title}</h3>
      <div className="w-full h-80 md:h-64 sm:h-48 flex items-end justify-between gap-4 md:gap-3 sm:gap-2">
        {data.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          return (
            <div
              key={index}
              className="flex-1 min-w-0 flex flex-col items-center gap-2 md:gap-1.5 sm:gap-1"
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div className="w-full flex flex-col items-center gap-1">
                {hoveredBar === index && (
                  <div className="px-2 py-1 bg-text-primary text-white text-xs md:text-[10px] rounded whitespace-nowrap">
                    {item.value.toFixed(4)}
                  </div>
                )}
                <div
                  className="w-full rounded-t-md transition-all duration-300 cursor-pointer hover:opacity-80"
                  style={{
                    height: `${heightPercentage}%`,
                    backgroundColor: item.color,
                    minHeight: '8px'
                  }}
                />
              </div>
              <div className="text-xs md:text-[10px] sm:text-[9px] text-text-secondary font-medium text-center line-clamp-2 w-full">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChartVisualization;