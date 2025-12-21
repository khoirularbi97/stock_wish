'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface StockRanking {
  rank: number;
  symbol: string;
  name: string;
  score: number;
  change: number;
  criteria: {
    profitability: number;
    liquidity: number;
    solvency: number;
    efficiency: number;
  };
}

interface StockRankingTableProps {
  rankings: StockRanking[];
}

const StockRankingTable = ({ rankings }: StockRankingTableProps) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (rank: number) => {
    setExpandedRow(expandedRow === rank ? null : rank);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-6 md:px-4 sm:px-3 py-4 md:py-3 sm:py-2 text-left text-sm md:text-xs font-semibold text-text-primary whitespace-nowrap">Rank</th>
            <th className="px-6 md:px-4 sm:px-3 py-4 md:py-3 sm:py-2 text-left text-sm md:text-xs font-semibold text-text-primary">Stock</th>
            <th className="px-6 md:px-4 sm:px-3 py-4 md:py-3 sm:py-2 text-right text-sm md:text-xs font-semibold text-text-primary whitespace-nowrap">AHP-SAW Score</th>
            <th className="px-6 md:px-4 sm:px-3 py-4 md:py-3 sm:py-2 text-right text-sm md:text-xs font-semibold text-text-primary whitespace-nowrap">Change</th>
            <th className="px-6 md:px-4 sm:px-3 py-4 md:py-3 sm:py-2 text-center text-sm md:text-xs font-semibold text-text-primary">Details</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((stock) => (
            <>
              <tr
                key={stock.rank}
                className="border-b border-border hover:bg-muted/30 transition-smooth cursor-pointer"
                onClick={() => toggleRow(stock.rank)}
              >
                <td className="px-6 md:px-4 sm:px-3 py-4 md:py-3 sm:py-2">
                  <div className={`w-8 h-8 md:w-7 md:h-7 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold text-sm md:text-xs ${
                    stock.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    stock.rank === 2 ? 'bg-gray-100 text-gray-700' :
                    stock.rank === 3 ? 'bg-orange-100 text-orange-700': 'bg-muted text-text-secondary'
                  }`}>
                    {stock.rank}
                  </div>
                </td>
                <td className="px-6 md:px-4 sm:px-3 py-4 md:py-3 sm:py-2">
                  <div className="flex flex-col">
                    <span className="font-semibold text-text-primary text-base md:text-sm line-clamp-1">{stock.symbol}</span>
                    <span className="text-sm md:text-xs text-text-secondary line-clamp-1">{stock.name}</span>
                  </div>
                </td>
                <td className="px-6 md:px-4 sm:px-3 py-4 md:py-3 sm:py-2 text-right">
                  <span className="font-bold text-primary text-lg md:text-base sm:text-sm whitespace-nowrap">{stock.score.toFixed(4)}</span>
                </td>
                <td className="px-6 md:px-4 sm:px-3 py-4 md:py-3 sm:py-2 text-right">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm md:text-xs font-medium whitespace-nowrap ${
                    stock.change > 0 ? 'bg-success/10 text-success' :
                    stock.change < 0 ? 'bg-error/10 text-error': 'bg-muted text-text-secondary'
                  }`}>
                    {stock.change > 0 && <Icon name="ArrowUpIcon" size={14} />}
                    {stock.change < 0 && <Icon name="ArrowDownIcon" size={14} />}
                    {stock.change === 0 && <Icon name="MinusIcon" size={14} />}
                    <span>{Math.abs(stock.change)}</span>
                  </div>
                </td>
                <td className="px-6 md:px-4 sm:px-3 py-4 md:py-3 sm:py-2 text-center">
                  <Icon
                    name={expandedRow === stock.rank ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                    size={20}
                    className="mx-auto text-text-secondary"
                  />
                </td>
              </tr>
              {expandedRow === stock.rank && (
                <tr className="bg-muted/20 border-b border-border">
                  <td colSpan={5} className="px-6 md:px-4 sm:px-3 py-6 md:py-4 sm:py-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 sm:gap-2">
                      <div className="p-4 md:p-3 sm:p-2 bg-surface rounded-lg border border-border">
                        <div className="text-xs md:text-[10px] text-text-secondary mb-1">Profitability</div>
                        <div className="text-xl md:text-lg sm:text-base font-bold text-primary whitespace-nowrap">{stock.criteria.profitability.toFixed(3)}</div>
                      </div>
                      <div className="p-4 md:p-3 sm:p-2 bg-surface rounded-lg border border-border">
                        <div className="text-xs md:text-[10px] text-text-secondary mb-1">Liquidity</div>
                        <div className="text-xl md:text-lg sm:text-base font-bold text-accent whitespace-nowrap">{stock.criteria.liquidity.toFixed(3)}</div>
                      </div>
                      <div className="p-4 md:p-3 sm:p-2 bg-surface rounded-lg border border-border">
                        <div className="text-xs md:text-[10px] text-text-secondary mb-1">Solvency</div>
                        <div className="text-xl md:text-lg sm:text-base font-bold text-warning whitespace-nowrap">{stock.criteria.solvency.toFixed(3)}</div>
                      </div>
                      <div className="p-4 md:p-3 sm:p-2 bg-surface rounded-lg border border-border">
                        <div className="text-xs md:text-[10px] text-text-secondary mb-1">Efficiency</div>
                        <div className="text-xl md:text-lg sm:text-base font-bold text-success whitespace-nowrap">{stock.criteria.efficiency.toFixed(3)}</div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockRankingTable;