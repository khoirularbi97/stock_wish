'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Stock {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  image: string;
  alt: string;
}

interface PortfolioTrackingProps {
  stocks: Stock[];
}

const PortfolioTracking = ({ stocks }: PortfolioTrackingProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const totalValue = stocks.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
  const totalCost = stocks.reduce((sum, stock) => sum + (stock.shares * stock.avgPrice), 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = ((totalGainLoss / totalCost) * 100);

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-5 sm:p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-5 sm:mb-4">
        <div>
          <h2 className="text-xl md:text-lg sm:text-base font-bold text-text-primary mb-2">Portfolio Tracking</h2>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-text-secondary">Total Value</p>
              <p className="text-lg md:text-base font-bold text-text-primary whitespace-nowrap">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Total Gain/Loss</p>
              <p className={`text-lg md:text-base font-bold whitespace-nowrap ${totalGainLoss >= 0 ? 'text-success' : 'text-error'}`}>
                {totalGainLoss >= 0 ? '+' : ''}{totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-smooth ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-muted'}`}
          >
            <Icon name="ListBulletIcon" size={20} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-smooth ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-muted'}`}
          >
            <Icon name="Squares2X2Icon" size={20} />
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="space-y-3 md:space-y-2">
          {stocks.map((stock) => {
            const value = stock.shares * stock.currentPrice;
            const cost = stock.shares * stock.avgPrice;
            const gainLoss = value - cost;
            const gainLossPercent = ((gainLoss / cost) * 100);

            return (
              <div key={stock.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 md:p-3 sm:p-2 border border-border rounded-lg hover:bg-muted transition-smooth">
                <div className="w-full sm:w-12 h-48 sm:h-12 flex-shrink-0 overflow-hidden rounded-md">
                  <AppImage
                    src={stock.image}
                    alt={stock.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                    <div className="min-w-0 w-full sm:w-auto">
                      <h3 className="text-base md:text-sm font-semibold text-text-primary truncate">{stock.symbol}</h3>
                      <p className="text-sm md:text-xs text-text-secondary truncate">{stock.name}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                      stock.change >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                      <Icon name={stock.change >= 0 ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'} size={14} />
                      <span className="whitespace-nowrap">{stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-2 text-xs">
                    <div>
                      <p className="text-text-secondary mb-1">Shares</p>
                      <p className="font-semibold text-text-primary whitespace-nowrap">{stock.shares}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary mb-1">Avg Price</p>
                      <p className="font-semibold text-text-primary whitespace-nowrap">${stock.avgPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary mb-1">Current Price</p>
                      <p className="font-semibold text-text-primary whitespace-nowrap">${stock.currentPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary mb-1">Gain/Loss</p>
                      <p className={`font-semibold whitespace-nowrap ${gainLoss >= 0 ? 'text-success' : 'text-error'}`}>
                        {gainLoss >= 0 ? '+' : ''}${Math.abs(gainLoss).toFixed(2)} ({gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-3 sm:gap-2">
          {stocks.map((stock) => {
            const value = stock.shares * stock.currentPrice;
            const cost = stock.shares * stock.avgPrice;
            const gainLoss = value - cost;
            const gainLossPercent = ((gainLoss / cost) * 100);

            return (
              <div key={stock.id} className="w-full min-w-0 bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-smooth">
                <div className="aspect-[3/4] overflow-hidden">
                  <AppImage
                    src={stock.image}
                    alt={stock.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 md:p-3 sm:p-2">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base md:text-sm font-semibold text-text-primary truncate">{stock.symbol}</h3>
                      <p className="text-xs text-text-secondary line-clamp-1">{stock.name}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 ml-2 ${
                      stock.change >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                      <Icon name={stock.change >= 0 ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'} size={12} />
                      <span className="whitespace-nowrap">{stock.changePercent.toFixed(2)}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Shares:</span>
                      <span className="font-semibold text-text-primary whitespace-nowrap">{stock.shares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Current:</span>
                      <span className="font-semibold text-text-primary whitespace-nowrap">${stock.currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Gain/Loss:</span>
                      <span className={`font-semibold whitespace-nowrap ${gainLoss >= 0 ? 'text-success' : 'text-error'}`}>
                        {gainLoss >= 0 ? '+' : ''}${Math.abs(gainLoss).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PortfolioTracking;