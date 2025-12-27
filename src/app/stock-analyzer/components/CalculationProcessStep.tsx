'use client';


import { useState, useEffect } from 'react';
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

interface NormalizedData {
  stockId: string;
  values: { [criterionId: string]: number };
}

interface CalculationResult {
  stockId: string;
  ticker: string;
  name: string;
  logo: string;
  sector: string;
  sawScore: number;
  weightedScores: { [criterionId: string]: number };
  rank: number;
}

interface CalculationProcessStepProps {
  criteria: CriterionWeight[];
  stocks: StockData[];
  onComplete: (results: CalculationResult[]) => void;
  onBack: () => void;
}

const CalculationProcessStep = ({ criteria, stocks, onComplete, onBack }: CalculationProcessStepProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [normalizedData, setNormalizedData] = useState<NormalizedData[]>([]);
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>('normalization');

  const steps = [
    { id: 'normalization', name: 'Normalisasi Data', icon: 'AdjustmentsHorizontalIcon' },
    { id: 'weighting', name: 'Penerapan Bobot', icon: 'ScaleIcon' },
    { id: 'aggregation', name: 'Agregasi Skor', icon: 'CalculatorIcon' },
    { id: 'ranking', name: 'Peringkat Akhir', icon: 'TrophyIcon' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  useEffect(() => {
    if (currentStep === 0) {
      performNormalization();
    } else if (currentStep === 2) {
      calculateResults();
    }
  }, [currentStep]);

  const performNormalization = () => {
    const normalized: NormalizedData[] = stocks.map(stock => {
      const normalizedValues: { [key: string]: number } = {};

      criteria.forEach(criterion => {
        const values = stocks.map(s => s.values[criterion.id]);
        const max = Math.max(...values);
        const min = Math.min(...values);

        // Benefit criteria (higher is better): ROE, NPM, ROA, CR, QR, ATO, ITO
        // Cost criteria (lower is better): DER
        const isCost = criterion.id === 'der';

        if (isCost) {
          normalizedValues[criterion.id] = min / (stock.values[criterion.id] || 1);
        } else {
          normalizedValues[criterion.id] = stock.values[criterion.id] / (max || 1);
        }
      });

      return {
        stockId: stock.id,
        values: normalizedValues,
      };
    });

    setNormalizedData(normalized);
  };

  const calculateResults = () => {
    const calculatedResults: CalculationResult[] = stocks.map(stock => {
      const normalized = normalizedData.find(n => n.stockId === stock.id);
      if (!normalized) {
        return {
          stockId: stock.id,
          ticker: stock.ticker,
          name: stock.name,
          logo: stock.logo,
          sector: stock.sector,
          sawScore: 0,
          weightedScores: {},
          rank: 0,
        };
      }

      const weightedScores: { [key: string]: number } = {};
      let sawScore = 0;

      criteria.forEach(criterion => {
        const weighted = normalized.values[criterion.id] * (criterion.weight / 100);
        weightedScores[criterion.id] = weighted;
        sawScore += weighted;
      });

      return {
        stockId: stock.id,
        ticker: stock.ticker,
        name: stock.name,
        logo: stock.logo,
        sector: stock.sector,
        sawScore,
        weightedScores,
        rank: 0,
      };
    });

    // Assign ranks
    const sorted = [...calculatedResults].sort((a, b) => b.sawScore - a.sawScore);
    sorted.forEach((result, index) => {
      result.rank = index + 1;
    });

    setResults(sorted);
  };

  const handleComplete = () => {
    onComplete(results);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(prev => (prev === sectionId ? null : sectionId));
  };

  return (
    <div className="w-full min-w-0 space-y-6 md:space-y-5 sm:space-y-4">
      <div>
        <h2 className="text-2xl md:text-xl sm:text-lg font-semibold text-text-primary">
          Proses Perhitungan AHP-SAW
        </h2>
        <p className="text-sm md:text-xs text-text-secondary mt-1">
          Visualisasi metodologi langkah demi langkah dengan perhitungan rinci
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 sm:gap-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`w-full min-w-0 p-4 md:p-3 sm:p-3 rounded-lg border-2 transition-smooth ${
              index <= currentStep
                ? 'border-brand-primary bg-brand-primary/5' :'border-border bg-card'
            }`}
          >
            <div className="flex items-center gap-3 md:gap-2 sm:gap-2">
              <div
                className={`w-10 h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  index <= currentStep ? 'bg-brand-primary text-white' : 'bg-muted text-text-secondary'
                }`}
              >
                {index < currentStep ? (
                  <Icon name="CheckIcon" size={20} />
                ) : (
                  <Icon name={step.icon as any} size={20} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-secondary">Langkah {index + 1}</p>
                <h3 className="text-sm md:text-xs sm:text-xs font-semibold text-text-primary truncate">
                  {step.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 md:space-y-3 sm:space-y-3">
        {/* Normalization Section */}
        <div className="w-full min-w-0 border border-border rounded-lg overflow-hidden bg-card">
          <button
            onClick={() => toggleSection('normalization')}
            className="w-full flex items-center justify-between px-6 md:px-5 sm:px-4 py-4 md:py-3 sm:py-3 hover:bg-muted transition-smooth"
          >
            <div className="flex items-center gap-3 md:gap-2 sm:gap-2">
              <Icon name="AdjustmentsHorizontalIcon" size={24} className="text-brand-primary flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-base md:text-sm sm:text-sm font-semibold text-text-primary">
                  Normalisasi Data
                </h3>
                <p className="text-xs text-text-secondary">
                  Mengubah nilai mentah ke skala yang dapat dibandingkan (0-1)
                </p>
              </div>
            </div>
            <Icon
              name={expandedSection === 'normalization' ? 'ChevronUpIcon' : 'ChevronDownIcon'}
              size={20}
              className="text-text-secondary flex-shrink-0"
            />
          </button>

          {expandedSection === 'normalization' && normalizedData.length > 0 && (
            <div className="border-t border-border bg-muted/30 p-6 md:p-5 sm:p-4">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm md:text-xs sm:text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 md:py-2 sm:py-2 px-4 md:px-3 sm:px-2 font-semibold text-text-primary">
                        Stock
                      </th>
                      {criteria.map(c => (
                        <th
                          key={c.id}
                          className="text-right py-3 md:py-2 sm:py-2 px-4 md:px-3 sm:px-2 font-semibold text-text-primary whitespace-nowrap"
                        >
                          {c.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {normalizedData.map(data => {
                      const stock = stocks.find(s => s.id === data.stockId);
                      return (
                        <tr key={data.stockId} className="border-b border-border">
                          <td className="py-3 md:py-2 sm:py-2 px-4 md:px-3 sm:px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 md:w-6 md:h-6 sm:w-6 sm:h-6 rounded overflow-hidden flex-shrink-0">
                                <AppImage
                                  src={stock?.logo || ''}
                                  alt={`${stock?.name} logo perusahaan`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-semibold text-text-primary whitespace-nowrap">
                                {stock?.ticker}
                              </span>
                            </div>
                          </td>
                          {criteria.map(c => (
                            <td
                              key={c.id}
                              className="text-right py-3 md:py-2 sm:py-2 px-4 md:px-3 sm:px-2 text-text-secondary whitespace-nowrap"
                            >
                              {data.values[c.id].toFixed(4)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="w-full min-w-0 border border-border rounded-lg overflow-hidden bg-card">
            <button
              onClick={() => toggleSection('results')}
              className="w-full flex items-center justify-between px-6 md:px-5 sm:px-4 py-4 md:py-3 sm:py-3 hover:bg-muted transition-smooth"
            >
              <div className="flex items-center gap-3 md:gap-2 sm:gap-2">
                <Icon name="TrophyIcon" size={24} className="text-brand-primary flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-base md:text-sm sm:text-sm font-semibold text-text-primary">
                    Peringkat Akhir
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Saham diperingkat berdasarkan skor komposit SAW
                  </p>
                </div>
              </div>
              <Icon
                name={expandedSection === 'results' ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                size={20}
                className="text-text-secondary flex-shrink-0"
              />
            </button>

            {expandedSection === 'results' && (
              <div className="border-t border-border bg-muted/30 p-6 md:p-5 sm:p-4 space-y-3 md:space-y-2 sm:space-y-2">
                {results.map(result => (
                  <div
                    key={result.stockId}
                    className="w-full min-w-0 p-4 md:p-3 sm:p-3 bg-card rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4 md:gap-3 sm:gap-3">
                      <div
                        className={`w-12 h-12 md:w-10 md:h-10 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-lg md:text-base sm:text-sm flex-shrink-0 ${
                          result.rank === 1
                            ? 'bg-yellow-500 text-white'
                            : result.rank === 2
                            ? 'bg-gray-400 text-white'
                            : result.rank === 3
                            ? 'bg-orange-600 text-white' :'bg-muted text-text-secondary'
                        }`}
                      >
                        #{result.rank}
                      </div>
                      <div className="w-12 h-12 md:w-10 md:h-10 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <AppImage
                          src={result.logo}
                          alt={`${result.name} logo perusahaan`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base md:text-sm sm:text-sm font-bold text-text-primary">
                          {result.ticker}
                        </h4>
                        <p className="text-xs text-text-secondary truncate">{result.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-text-secondary">Skor SAW</p>
                        <p className="text-lg md:text-base sm:text-sm font-bold text-brand-primary whitespace-nowrap">
                          {result.sawScore.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-2 sm:gap-2 pt-4 md:pt-3 sm:pt-2">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 md:px-5 sm:px-4 py-3 md:py-2 sm:py-2 bg-muted text-text-primary font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:bg-muted/80 transition-smooth"
        >
          <Icon name="ArrowLeftIcon" size={18} />
          <span>Kembali ke Input Data</span>
        </button>
        <button
          onClick={handleComplete}
          disabled={currentStep < steps.length - 1}
          className="flex items-center justify-center gap-2 px-6 md:px-5 sm:px-4 py-3 md:py-2 sm:py-2 bg-brand-cta text-white font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth shadow-md"
        >
          <span>Lihat Hasil Rinci</span>
          <Icon name="ArrowRightIcon" size={18} />
        </button>
      </div>
    </div>
  );
};

export default CalculationProcessStep;