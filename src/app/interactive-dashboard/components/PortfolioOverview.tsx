'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PortfolioStock {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
}

interface PortfolioOverviewProps {
  className?: string;
}

const PortfolioOverview = ({ className = '' }: PortfolioOverviewProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const portfolioData: PortfolioStock[] = [
    {
      symbol: 'ANTM',
      name: 'Aneka Tambang',
      shares: 500,
      avgPrice: 1850,
      currentPrice: 1920,
      change: 70,
      changePercent: 3.78
    },
    {
      symbol: 'BBCA',
      name: 'Bank Central Asia',
      shares: 300,
      avgPrice: 8750,
      currentPrice: 8900,
      change: 150,
      changePercent: 1.71
    },
    {
      symbol: 'TLKM',
      name: 'Telkom Indonesia',
      shares: 1000,
      avgPrice: 3650,
      currentPrice: 3580,
      change: -70,
      changePercent: -1.92
    }
  ];

  const totalValue = portfolioData.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
  const totalCost = portfolioData.reduce((sum, stock) => sum + (stock.shares * stock.avgPrice), 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = ((totalGainLoss / totalCost) * 100);

  if (!isHydrated) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 ${className}`}>
        <div className="flex items-center justify-between mb-6 md:mb-4 sm:mb-3">
          <h2 className="text-xl md:text-lg sm:text-base font-semibold text-text-primary">Portfolio Overview</h2>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 ${className}`}>
      <div className="flex items-center justify-between mb-6 md:mb-4 sm:mb-3">
        <h2 className="text-xl md:text-lg sm:text-base font-semibold text-text-primary">Portfolio Overview</h2>
        <Icon name="ChartPieIcon" size={24} className="text-primary" />
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-4 sm:gap-3 mb-8 md:mb-6 sm:mb-4">
        <div className="bg-muted rounded-lg p-6 md:p-4 sm:p-3">
          <p className="text-sm md:text-xs text-text-secondary mb-2 md:mb-1">Total Value</p>
          <p className="text-2xl md:text-xl sm:text-lg font-bold text-text-primary whitespace-nowrap">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-6 md:p-4 sm:p-3">
          <p className="text-sm md:text-xs text-text-secondary mb-2 md:mb-1">Total Gain/Loss</p>
          <p className={`text-2xl md:text-xl sm:text-lg font-bold whitespace-nowrap ${totalGainLoss >= 0 ? 'text-success' : 'text-error'}`}>
            {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-base md:text-sm sm:text-xs ml-2">
              ({totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%)
            </span>
          </p>
        </div>
      </div>

      {/* Holdings List */}
      <div className="space-y-4 md:space-y-3 sm:space-y-2">
        {portfolioData.map((stock) => {
          const stockValue = stock.shares * stock.currentPrice;
          const stockGainLoss = stock.shares * stock.change;

          return (
            <div key={stock.symbol} className="border border-border rounded-lg p-6 md:p-4 sm:p-3 hover:border-primary transition-smooth">
              <div className="flex items-start justify-between gap-4 md:gap-3 sm:gap-2 mb-4 md:mb-3 sm:mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-base sm:text-sm font-semibold text-text-primary line-clamp-1">{stock.symbol}</h3>
                  <p className="text-sm md:text-xs text-text-secondary line-clamp-1">{stock.name}</p>
                </div>
                <div className={`flex items-center gap-2 md:gap-1 px-3 md:px-2 sm:px-2 py-1 rounded-full text-sm md:text-xs font-medium whitespace-nowrap ${
                  stock.change >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  <Icon name={stock.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'} size={16} />
                  <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-3 sm:gap-2">
                <div>
                  <p className="text-xs text-text-secondary mb-1">Shares</p>
                  <p className="text-sm md:text-xs font-medium text-text-primary whitespace-nowrap">{stock.shares}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Avg Price</p>
                  <p className="text-sm md:text-xs font-medium text-text-primary whitespace-nowrap">${stock.avgPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Current Price</p>
                  <p className="text-sm md:text-xs font-medium text-text-primary whitespace-nowrap">${stock.currentPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Total Value</p>
                  <p className="text-sm md:text-xs font-medium text-text-primary whitespace-nowrap">${stockValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-3 sm:mt-2 pt-4 md:pt-3 sm:pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Gain/Loss</span>
                  <span className={`text-sm md:text-xs font-semibold whitespace-nowrap ${stockGainLoss >= 0 ? 'text-success' : 'text-error'}`}>
                    {stockGainLoss >= 0 ? '+' : ''}${stockGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioOverview;