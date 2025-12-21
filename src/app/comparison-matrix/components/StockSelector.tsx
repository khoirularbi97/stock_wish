'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
}

interface StockSelectorProps {
  availableStocks: Stock[];
  selectedStocks: Stock[];
  onStockSelect: (stock: Stock) => void;
  onStockRemove: (stockId: string) => void;
  maxSelections?: number;
}

export default function StockSelector({
  availableStocks,
  selectedStocks,
  onStockSelect,
  onStockRemove,
  maxSelections = 5
}: StockSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredStocks = availableStocks.filter(stock => 
    !selectedStocks.find(s => s.id === stock.id) &&
    (stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
     stock.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleStockSelect = (stock: Stock) => {
    if (selectedStocks.length < maxSelections) {
      onStockSelect(stock);
      setSearchQuery('');
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-4">
        {selectedStocks.map((stock) => (
          <div
            key={stock.id}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/30 rounded-lg"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-text-primary">{stock.symbol}</span>
              <span className="text-xs text-text-secondary">{stock.name}</span>
            </div>
            <button
              onClick={() => onStockRemove(stock.id)}
              className="p-1 hover:bg-error/10 rounded transition-smooth"
              aria-label={`Remove ${stock.symbol}`}
            >
              <Icon name="XMarkIcon" size={16} className="text-error" />
            </button>
          </div>
        ))}
      </div>

      {selectedStocks.length < maxSelections && (
        <div className="relative">
          <div className="relative">
            <Icon 
              name="MagnifyingGlassIcon" 
              size={20} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search stocks by symbol or name..."
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-smooth"
            />
          </div>

          {isDropdownOpen && searchQuery && filteredStocks.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-popover border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {filteredStocks.map((stock) => (
                <button
                  key={stock.id}
                  onClick={() => handleStockSelect(stock)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-smooth border-b border-border last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-text-primary">{stock.symbol}</div>
                      <div className="text-sm text-text-secondary">{stock.name}</div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                      {stock.sector}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-2 text-sm text-text-secondary">
        {selectedStocks.length} of {maxSelections} stocks selected
      </div>
    </div>
  );
}