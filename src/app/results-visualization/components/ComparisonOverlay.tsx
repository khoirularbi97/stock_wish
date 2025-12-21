'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ComparisonStock {
  symbol: string;
  name: string;
  color: string;
  visible: boolean;
}

interface ComparisonOverlayProps {
  stocks: ComparisonStock[];
  onToggleStock: (symbol: string) => void;
}

const ComparisonOverlay = ({ stocks, onToggleStock }: ComparisonOverlayProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 md:px-3 sm:px-2 py-2 md:py-1.5 sm:py-1 bg-surface border border-border rounded-md hover:bg-muted transition-smooth text-sm md:text-xs font-medium whitespace-nowrap"
      >
        <Icon name="AdjustmentsHorizontalIcon" size={18} />
        <span>Compare Stocks</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 md:w-56 sm:w-48 bg-popover border border-border rounded-lg shadow-xl z-50 animate-scale-in">
          <div className="p-4 md:p-3 sm:p-2 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-sm font-semibold text-text-primary">Stock Comparison</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded transition-smooth"
              >
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
          </div>

          <div className="p-3 md:p-2 sm:p-1.5 space-y-2 md:space-y-1.5 sm:space-y-1">
            {stocks.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => onToggleStock(stock.symbol)}
                className="w-full flex items-center gap-3 md:gap-2 p-3 md:p-2 sm:p-1.5 rounded-md hover:bg-muted transition-smooth text-left"
              >
                <div
                  className={`w-4 h-4 md:w-3.5 md:h-3.5 sm:w-3 sm:h-3 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    stock.visible ? 'border-primary bg-primary' : 'border-border bg-surface'
                  }`}
                >
                  {stock.visible && <Icon name="CheckIcon" size={12} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 md:gap-1.5">
                    <div
                      className="w-3 h-3 md:w-2.5 md:h-2.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: stock.color }}
                    />
                    <span className="text-sm md:text-xs font-semibold text-text-primary line-clamp-1">{stock.symbol}</span>
                  </div>
                  <p className="text-xs md:text-[10px] text-text-secondary line-clamp-1">{stock.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonOverlay;