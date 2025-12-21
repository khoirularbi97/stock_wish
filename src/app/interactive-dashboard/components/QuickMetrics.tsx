'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Metric {
  id: number;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

interface QuickMetricsProps {
  className?: string;
}

const QuickMetrics = ({ className = '' }: QuickMetricsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const metrics: Metric[] = [
    {
      id: 1,
      label: 'Total Portfolio Value',
      value: '$5,234,500',
      change: 2.45,
      changeLabel: 'vs last week',
      icon: 'CurrencyDollarIcon',
      color: 'text-primary'
    },
    {
      id: 2,
      label: 'Active Analyses',
      value: '12',
      change: 3,
      changeLabel: 'new this week',
      icon: 'ChartBarIcon',
      color: 'text-accent'
    },
    {
      id: 3,
      label: 'Stocks Tracked',
      value: '24',
      change: 5,
      changeLabel: 'added recently',
      icon: 'EyeIcon',
      color: 'text-warning'
    },
    {
      id: 4,
      label: 'Avg. Analysis Score',
      value: '86.7',
      change: 1.2,
      changeLabel: 'improvement',
      icon: 'StarIcon',
      color: 'text-success'
    }
  ];

  if (!isHydrated) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 sm:gap-3 ${className}`}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 animate-pulse">
            <div className="h-20 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 sm:gap-3 ${className}`}>
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 hover:border-primary transition-smooth"
        >
          <div className="flex items-start justify-between mb-4 md:mb-3 sm:mb-2">
            <div className={`w-12 h-12 md:w-10 md:h-10 sm:w-10 sm:h-10 bg-muted rounded-lg flex items-center justify-center ${metric.color}`}>
              <Icon name={metric.icon as any} size={24} />
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              metric.change >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
            }`}>
              <Icon name={metric.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'} size={14} />
              <span>{Math.abs(metric.change)}</span>
            </div>
          </div>
          
          <h3 className="text-3xl md:text-2xl sm:text-xl font-bold text-text-primary mb-2 md:mb-1 whitespace-nowrap">
            {metric.value}
          </h3>
          
          <p className="text-sm md:text-xs text-text-secondary mb-1 line-clamp-1">{metric.label}</p>
          <p className="text-xs text-text-secondary opacity-70 line-clamp-1">{metric.changeLabel}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickMetrics;