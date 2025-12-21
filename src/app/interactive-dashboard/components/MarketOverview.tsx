'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface MarketOverviewProps {
  className?: string;
}

const MarketOverview = ({ className = '' }: MarketOverviewProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const marketIndices: MarketIndex[] = [
    { name: 'IDX Composite', value: 7234.56, change: 45.23, changePercent: 0.63 },
    { name: 'LQ45', value: 982.34, change: 12.45, changePercent: 1.28 },
    { name: 'IDX30', value: 512.78, change: -3.21, changePercent: -0.62 },
    { name: 'Banking Index', value: 1456.89, change: 23.67, changePercent: 1.65 }
  ];

  if (!isHydrated) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 ${className}`}>
        <div className="flex items-center justify-between mb-6 md:mb-4 sm:mb-3">
          <h2 className="text-xl md:text-lg sm:text-base font-semibold text-text-primary">Market Overview</h2>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-16 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 ${className}`}>
      <div className="flex items-center justify-between mb-6 md:mb-4 sm:mb-3">
        <h2 className="text-xl md:text-lg sm:text-base font-semibold text-text-primary">Market Overview</h2>
        <Icon name="GlobeAltIcon" size={24} className="text-primary" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-4 sm:gap-3">
        {marketIndices.map((index, i) => (
          <div key={i} className="border border-border rounded-lg p-6 md:p-4 sm:p-3 hover:border-primary transition-smooth">
            <div className="flex items-start justify-between mb-3 md:mb-2 sm:mb-2">
              <h3 className="text-base md:text-sm sm:text-xs font-semibold text-text-primary line-clamp-1">{index.name}</h3>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                index.change >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              }`}>
                <Icon name={index.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'} size={14} />
                <span>{Math.abs(index.changePercent).toFixed(2)}%</span>
              </div>
            </div>
            
            <p className="text-2xl md:text-xl sm:text-lg font-bold text-text-primary mb-2 md:mb-1 whitespace-nowrap">
              {index.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            
            <p className={`text-sm md:text-xs font-medium whitespace-nowrap ${
              index.change >= 0 ? 'text-success' : 'text-error'
            }`}>
              {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} points
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-4 sm:mt-3 pt-6 md:pt-4 sm:pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Last updated: 2025-12-20 05:45 WIB</span>
          <button className="text-primary hover:underline font-medium">Refresh</button>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;