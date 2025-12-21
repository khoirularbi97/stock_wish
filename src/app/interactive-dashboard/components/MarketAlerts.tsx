'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Alert {
  id: number;
  type: 'price' | 'volume' | 'news' | 'technical';
  severity: 'high' | 'medium' | 'low';
  symbol: string;
  title: string;
  message: string;
  timestamp: string;
}

interface MarketAlertsProps {
  className?: string;
}

const MarketAlerts = ({ className = '' }: MarketAlertsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    setIsHydrated(true);
    
    const mockAlerts: Alert[] = [
      {
        id: 1,
        type: 'price',
        severity: 'high',
        symbol: 'ANTM',
        title: 'Price Alert Triggered',
        message: 'ANTM reached target price of $1,920. Consider reviewing position.',
        timestamp: '2025-12-20T05:30:00'
      },
      {
        id: 2,
        type: 'volume',
        severity: 'medium',
        symbol: 'BBCA',
        title: 'Volume Spike Detected',
        message: 'BBCA trading volume increased by 45% above average.',
        timestamp: '2025-12-20T04:15:00'
      },
      {
        id: 3,
        type: 'technical',
        severity: 'medium',
        symbol: 'TLKM',
        title: 'Technical Indicator Signal',
        message: 'TLKM RSI indicates oversold condition at 28.5.',
        timestamp: '2025-12-20T03:45:00'
      },
      {
        id: 4,
        type: 'news',
        severity: 'low',
        symbol: 'ANTM',
        title: 'Market News Update',
        message: 'Commodity prices showing positive momentum in Asian markets.',
        timestamp: '2025-12-20T02:30:00'
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'price': return 'CurrencyDollarIcon';
      case 'volume': return 'ChartBarIcon';
      case 'news': return 'NewspaperIcon';
      case 'technical': return 'ChartBarSquareIcon';
      default: return 'BellIcon';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-text-secondary border-border';
    }
  };

  const formatTime = (timestamp: string) => {
    if (!isHydrated) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (!isHydrated) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 ${className}`}>
        <div className="flex items-center justify-between mb-6 md:mb-4 sm:mb-3">
          <h2 className="text-xl md:text-lg sm:text-base font-semibold text-text-primary">Market Alerts</h2>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 ${className}`}>
      <div className="flex items-center justify-between mb-6 md:mb-4 sm:mb-3">
        <h2 className="text-xl md:text-lg sm:text-base font-semibold text-text-primary">Market Alerts</h2>
        <div className="flex items-center gap-2">
          <span className="px-3 md:px-2 py-1 bg-error/10 text-error text-xs font-medium rounded-full whitespace-nowrap">
            {alerts.filter(a => a.severity === 'high').length} High
          </span>
          <Icon name="BellIcon" size={24} className="text-primary" />
        </div>
      </div>

      <div className="space-y-4 md:space-y-3 sm:space-y-2 max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-6 md:p-4 sm:p-3 transition-smooth hover:shadow-md ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start gap-4 md:gap-3 sm:gap-2">
              <div className="flex-shrink-0 mt-1">
                <Icon name={getAlertIcon(alert.type) as any} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2 md:mb-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-sm sm:text-xs font-semibold line-clamp-1">{alert.title}</h3>
                    <p className="text-sm md:text-xs font-medium opacity-80 whitespace-nowrap">{alert.symbol}</p>
                  </div>
                  <span className="text-xs opacity-60 whitespace-nowrap flex-shrink-0">{formatTime(alert.timestamp)}</span>
                </div>
                <p className="text-sm md:text-xs opacity-90 line-clamp-2">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-4 sm:mt-3 pt-6 md:pt-4 sm:pt-3 border-t border-border">
        <button className="w-full px-4 py-2 text-sm md:text-xs font-medium text-primary hover:bg-primary/5 rounded-md transition-smooth">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default MarketAlerts;