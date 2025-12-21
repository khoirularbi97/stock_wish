'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface CriterionWeight {
  id: string;
  name: string;
  weight: number;
}

interface StockData {
  id: string;
  ticker: string;
  name: string;
  logo: string;
  sector: string;
  values: { [criterionId: string]: number };
}

interface StockDataInputStepProps {
  criteria: CriterionWeight[];
  onNext: (stocks: StockData[]) => void;
  onBack: () => void;
}

const StockDataInputStep = ({ criteria, onNext, onBack }: StockDataInputStepProps) => {
  const [stocks, setStocks] = useState<StockData[]>([
    {
      id: 'antm',
      ticker: 'ANTM',
      name: 'Aneka Tambang',
      logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=200&fit=crop',
      sector: 'Mining',
      values: {},
    },
    {
      id: 'bbca',
      ticker: 'BBCA',
      name: 'Bank Central Asia',
      logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
      sector: 'Banking',
      values: {},
    },
    {
      id: 'tlkm',
      ticker: 'TLKM',
      name: 'Telkom Indonesia',
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop',
      sector: 'Telecommunications',
      values: {},
    },
  ]);

  const [activeStock, setActiveStock] = useState<string | null>('antm');
  const [showAddStock, setShowAddStock] = useState(false);

  const handleValueChange = (stockId: string, criterionId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setStocks(prev =>
      prev.map(stock =>
        stock.id === stockId
          ? {
              ...stock,
              values: { ...stock.values, [criterionId]: numValue },
            }
          : stock
      )
    );
  };

  const loadSampleData = (stockId: string) => {
    const sampleData: { [key: string]: { [criterionId: string]: number } } = {
      antm: {
        roe: 15.2,
        npm: 12.8,
        roa: 8.5,
        cr: 2.1,
        qr: 1.5,
        der: 0.65,
        ato: 1.2,
        ito: 4.5,
      },
      bbca: {
        roe: 18.5,
        npm: 35.2,
        roa: 3.2,
        cr: 1.8,
        qr: 1.2,
        der: 4.8,
        ato: 0.15,
        ito: 0,
      },
      tlkm: {
        roe: 16.8,
        npm: 18.5,
        roa: 9.2,
        cr: 1.5,
        qr: 1.1,
        der: 1.2,
        ato: 0.8,
        ito: 12.5,
      },
    };

    const data = sampleData[stockId] || {};
    setStocks(prev =>
      prev.map(stock =>
        stock.id === stockId
          ? {
              ...stock,
              values: criteria.reduce((acc, c) => {
                acc[c.id] = data[c.id] || 0;
                return acc;
              }, {} as { [key: string]: number }),
            }
          : stock
      )
    );
  };

  const handleNext = () => {
    const allFilled = stocks.every(stock =>
      criteria.every(c => stock.values[c.id] !== undefined && stock.values[c.id] !== 0)
    );

    if (!allFilled) {
      alert('Please fill in all financial data for all stocks or use "Load Sample Data"');
      return;
    }

    onNext(stocks);
  };

  const activeStockData = stocks.find(s => s.id === activeStock);

  return (
    <div className="w-full min-w-0 space-y-6 md:space-y-5 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-3">
        <div>
          <h2 className="text-2xl md:text-xl sm:text-lg font-semibold text-text-primary">
            Input Stock Financial Data
          </h2>
          <p className="text-sm md:text-xs text-text-secondary mt-1">
            Enter financial ratios for each stock or load sample data
          </p>
        </div>
        <button
          onClick={() => setShowAddStock(true)}
          className="flex items-center gap-2 px-5 md:px-4 sm:px-3 py-2 md:py-2 sm:py-2 bg-brand-primary text-white font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:opacity-90 transition-smooth shadow-md whitespace-nowrap"
        >
          <Icon name="PlusIcon" size={18} />
          <span>Add Stock</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-5 sm:gap-4">
        <div className="lg:col-span-1 space-y-3 md:space-y-2 sm:space-y-2">
          <h3 className="text-sm md:text-xs font-semibold text-text-primary px-2">
            Select Stock
          </h3>
          <div className="space-y-2 md:space-y-2 sm:space-y-1">
            {stocks.map(stock => (
              <button
                key={stock.id}
                onClick={() => setActiveStock(stock.id)}
                className={`w-full flex items-center gap-3 md:gap-2 sm:gap-2 p-4 md:p-3 sm:p-3 rounded-lg border-2 transition-smooth ${
                  activeStock === stock.id
                    ? 'border-brand-primary bg-brand-primary/5' :'border-border bg-card hover:border-brand-primary/50'
                }`}
              >
                <div className="w-12 h-12 md:w-10 md:h-10 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <AppImage
                    src={stock.logo}
                    alt={`${stock.name} company logo with ${stock.sector.toLowerCase()} industry branding`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-xs sm:text-xs font-bold text-text-primary">
                      {stock.ticker}
                    </span>
                    {Object.keys(stock.values).length === criteria.length && (
                      <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs md:text-xs sm:text-xs text-text-secondary truncate">
                    {stock.name}
                  </p>
                  <p className="text-xs text-text-secondary/70">{stock.sector}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 w-full min-w-0">
          {activeStockData && (
            <div className="w-full min-w-0 p-6 md:p-5 sm:p-4 bg-card border border-border rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-3 mb-6 md:mb-5 sm:mb-4">
                <div className="flex items-center gap-3 md:gap-2 sm:gap-2">
                  <div className="w-16 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <AppImage
                      src={activeStockData.logo}
                      alt={`${activeStockData.name} company logo with ${activeStockData.sector.toLowerCase()} industry branding`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-base sm:text-sm font-bold text-text-primary">
                      {activeStockData.ticker}
                    </h3>
                    <p className="text-sm md:text-xs sm:text-xs text-text-secondary">
                      {activeStockData.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => loadSampleData(activeStockData.id)}
                  className="flex items-center gap-2 px-4 md:px-3 sm:px-3 py-2 md:py-2 sm:py-2 bg-secondary text-white font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:opacity-90 transition-smooth whitespace-nowrap"
                >
                  <Icon name="ArrowDownTrayIcon" size={16} />
                  <span>Load Sample Data</span>
                </button>
              </div>

              <div className="space-y-4 md:space-y-3 sm:space-y-3">
                {criteria.map(criterion => (
                  <div key={criterion.id} className="w-full min-w-0">
                    <label className="block text-sm md:text-xs sm:text-xs font-semibold text-text-primary mb-2 md:mb-1 sm:mb-1">
                      {criterion.name}
                      <span className="ml-2 text-xs text-text-secondary font-normal">
                        (Weight: {criterion.weight}%)
                      </span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={activeStockData.values[criterion.id] || ''}
                        onChange={e => handleValueChange(activeStockData.id, criterion.id, e.target.value)}
                        placeholder="Enter value"
                        className="flex-1 px-4 md:px-3 sm:px-3 py-3 md:py-2 sm:py-2 text-sm md:text-xs sm:text-xs border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                      <span className="text-sm md:text-xs sm:text-xs text-text-secondary whitespace-nowrap">
                        {criterion.id.includes('ratio') || criterion.id === 'cr' || criterion.id === 'qr'
                          ? 'x' :'%'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-2 sm:gap-2 pt-4 md:pt-3 sm:pt-2">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 md:px-5 sm:px-4 py-3 md:py-2 sm:py-2 bg-muted text-text-primary font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:bg-muted/80 transition-smooth"
        >
          <Icon name="ArrowLeftIcon" size={18} />
          <span>Back to Weights</span>
        </button>
        <button
          onClick={handleNext}
          className="flex items-center justify-center gap-2 px-6 md:px-5 sm:px-4 py-3 md:py-2 sm:py-2 bg-brand-cta text-white font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:opacity-90 transition-smooth shadow-md"
        >
          <span>Calculate Results</span>
          <Icon name="ArrowRightIcon" size={18} />
        </button>
      </div>
    </div>
  );
};

export default StockDataInputStep;