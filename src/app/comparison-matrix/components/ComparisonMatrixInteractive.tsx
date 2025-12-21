'use client';

import { useState, useEffect } from 'react';
import StockSelector from './StockSelector';
import CriteriaWeightSlider from './CriteriaWeightSlider';
import ComparisonTable from './ComparisonTable';
import ComparisonChart from './ComparisonChart';
import TemplateManager from './TemplateManager';
import Icon from '@/components/ui/AppIcon';

interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
}

interface Criterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  category: string;
}

interface CriterionScore {
  criterionId: string;
  value: number;
  normalizedValue: number;
  weightedScore: number;
}

interface StockComparison {
  stock: Stock;
  scores: CriterionScore[];
  totalScore: number;
  rank: number;
}

interface Template {
  id: string;
  name: string;
  description: string;
  criteriaWeights: Record<string, number>;
  createdAt: string;
  isDefault: boolean;
}

export default function ComparisonMatrixInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const availableStocks: Stock[] = [
    { id: '1', symbol: 'ANTM', name: 'Aneka Tambang (Persero) Tbk', sector: 'Mining' },
    { id: '2', symbol: 'BBCA', name: 'Bank Central Asia Tbk', sector: 'Banking' },
    { id: '3', symbol: 'TLKM', name: 'Telkom Indonesia (Persero) Tbk', sector: 'Telecommunications' },
    { id: '4', symbol: 'ASII', name: 'Astra International Tbk', sector: 'Automotive' },
    { id: '5', symbol: 'UNVR', name: 'Unilever Indonesia Tbk', sector: 'Consumer Goods' },
    { id: '6', symbol: 'BMRI', name: 'Bank Mandiri (Persero) Tbk', sector: 'Banking' },
    { id: '7', symbol: 'BBRI', name: 'Bank Rakyat Indonesia (Persero) Tbk', sector: 'Banking' },
    { id: '8', symbol: 'INDF', name: 'Indofood Sukses Makmur Tbk', sector: 'Food & Beverage' }
  ];

  const defaultCriteria: Criterion[] = [
    { id: 'c1', name: 'ROE', description: 'Return on Equity', weight: 15.0, category: 'Financial' },
    { id: 'c2', name: 'ROA', description: 'Return on Assets', weight: 12.0, category: 'Financial' },
    { id: 'c3', name: 'NPM', description: 'Net Profit Margin', weight: 10.0, category: 'Financial' },
    { id: 'c4', name: 'DER', description: 'Debt to Equity Ratio', weight: 8.0, category: 'Risk' },
    { id: 'c5', name: 'CR', description: 'Current Ratio', weight: 7.0, category: 'Risk' },
    { id: 'c6', name: 'PER', description: 'Price to Earnings Ratio', weight: 12.0, category: 'Valuation' },
    { id: 'c7', name: 'PBV', description: 'Price to Book Value', weight: 10.0, category: 'Valuation' },
    { id: 'c8', name: 'EPS Growth', description: 'Earnings Per Share Growth', weight: 13.0, category: 'Performance' },
    { id: 'c9', name: 'Revenue Growth', description: 'Year-over-Year Revenue Growth', weight: 13.0, category: 'Performance' }
  ];

  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([
    availableStocks[0],
    availableStocks[1],
    availableStocks[2]
  ]);
  const [criteria, setCriteria] = useState<Criterion[]>(defaultCriteria);
  const [comparisons, setComparisons] = useState<StockComparison[]>([]);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 't1',
      name: 'Balanced Growth',
      description: 'Equal emphasis on financial performance and growth metrics',
      criteriaWeights: {
        c1: 15.0, c2: 12.0, c3: 10.0, c4: 8.0, c5: 7.0,
        c6: 12.0, c7: 10.0, c8: 13.0, c9: 13.0
      },
      createdAt: '2025-12-15',
      isDefault: true
    },
    {
      id: 't2',
      name: 'Value Investing',
      description: 'Focus on valuation metrics and financial stability',
      criteriaWeights: {
        c1: 12.0, c2: 10.0, c3: 8.0, c4: 12.0, c5: 10.0,
        c6: 18.0, c7: 15.0, c8: 8.0, c9: 7.0
      },
      createdAt: '2025-12-16',
      isDefault: false
    }
  ]);

  const mockStockData: Record<string, Record<string, number>> = {
    'ANTM': { c1: 18.5, c2: 12.3, c3: 15.2, c4: 0.65, c5: 2.1, c6: 12.5, c7: 1.8, c8: 22.5, c9: 18.3 },
    'BBCA': { c1: 16.8, c2: 3.2, c3: 38.5, c4: 5.2, c5: 1.5, c6: 28.3, c7: 4.2, c8: 12.8, c9: 8.5 },
    'TLKM': { c1: 14.2, c2: 8.5, c3: 18.7, c4: 0.85, c5: 1.8, c6: 15.2, c7: 2.5, c8: 8.3, c9: 5.2 },
    'ASII': { c1: 12.5, c2: 7.8, c3: 9.2, c4: 0.95, c5: 1.6, c6: 10.8, c7: 1.5, c8: 6.5, c9: 4.8 },
    'UNVR': { c1: 135.2, c2: 22.5, c3: 21.8, c4: 2.8, c5: 0.9, c6: 42.5, c7: 28.5, c8: 3.2, c9: 2.8 },
    'BMRI': { c1: 13.8, c2: 2.8, c3: 28.5, c4: 4.8, c5: 1.3, c6: 11.2, c7: 2.1, c8: 10.5, c9: 7.2 },
    'BBRI': { c1: 15.2, c2: 3.5, c3: 32.8, c4: 4.2, c5: 1.4, c6: 13.5, c7: 2.8, c8: 11.8, c9: 9.5 },
    'INDF': { c1: 8.5, c2: 5.2, c3: 6.8, c4: 1.2, c5: 1.5, c6: 18.5, c7: 1.2, c8: 5.8, c9: 6.2 }
  };

  useEffect(() => {
    if (isHydrated && selectedStocks.length > 0) {
      calculateComparisons();
    }
  }, [selectedStocks, criteria, isHydrated]);

  const calculateComparisons = () => {
    const newComparisons: StockComparison[] = selectedStocks.map(stock => {
      const scores: CriterionScore[] = criteria.map(criterion => {
        const rawValue = mockStockData[stock.symbol]?.[criterion.id] || 0;
        
        const allValues = selectedStocks.map(s => mockStockData[s.symbol]?.[criterion.id] || 0);
        const maxValue = Math.max(...allValues);
        const minValue = Math.min(...allValues);
        
        const normalizedValue = maxValue !== minValue 
          ? ((rawValue - minValue) / (maxValue - minValue)) * 100
          : 50;
        
        const weightedScore = (normalizedValue * criterion.weight) / 100;

        return {
          criterionId: criterion.id,
          value: rawValue,
          normalizedValue,
          weightedScore
        };
      });

      const totalScore = scores.reduce((sum, score) => sum + score.weightedScore, 0);

      return {
        stock,
        scores,
        totalScore,
        rank: 0
      };
    });

    newComparisons.sort((a, b) => b.totalScore - a.totalScore);
    newComparisons.forEach((comparison, index) => {
      comparison.rank = index + 1;
    });

    setComparisons(newComparisons);
  };

  const handleStockSelect = (stock: Stock) => {
    setSelectedStocks([...selectedStocks, stock]);
  };

  const handleStockRemove = (stockId: string) => {
    setSelectedStocks(selectedStocks.filter(s => s.id !== stockId));
  };

  const handleWeightChange = (criterionId: string, newWeight: number) => {
    setCriteria(criteria.map(c => 
      c.id === criterionId ? { ...c, weight: newWeight } : c
    ));
  };

  const handleResetWeights = () => {
    setCriteria(defaultCriteria);
  };

  const handleLoadTemplate = (template: Template) => {
    setCriteria(criteria.map(c => ({
      ...c,
      weight: template.criteriaWeights[c.id] || c.weight
    })));
  };

  const handleSaveTemplate = (name: string, description: string) => {
    const newTemplate: Template = {
      id: `t${templates.length + 1}`,
      name,
      description,
      criteriaWeights: criteria.reduce((acc, c) => ({ ...acc, [c.id]: c.weight }), {}),
      createdAt: new Date().toISOString().split('T')[0],
      isDefault: false
    };
    setTemplates([...templates, newTemplate]);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const handleExportCSV = () => {
    if (!isHydrated) return;
    
    let csv = 'Stock,Symbol';
    criteria.forEach(c => csv += `,${c.name}`);
    csv += ',Total Score,Rank\n';

    comparisons.forEach(comp => {
      csv += `${comp.stock.name},${comp.stock.symbol}`;
      comp.scores.forEach(score => csv += `,${score.value.toFixed(2)}`);
      csv += `,${comp.totalScore.toFixed(2)},${comp.rank}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stock-comparison-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleExportPDF = () => {
    if (!isHydrated) return;
    alert('PDF export functionality would generate a detailed report with charts and analysis.');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 px-8 md:px-6 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded-lg w-1/3"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-8 md:px-6 sm:px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-primary/10 rounded-lg">
              <Icon name="TableCellsIcon" size={28} className="text-brand-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-2xl sm:text-xl font-bold text-text-primary">
                Comparison Matrix
              </h1>
              <p className="text-text-secondary mt-1">
                Multi-stock comparison with customizable criteria weighting
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-8 md:p-6 sm:p-4">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Select Stocks to Compare</h2>
          <StockSelector
            availableStocks={availableStocks}
            selectedStocks={selectedStocks}
            onStockSelect={handleStockSelect}
            onStockRemove={handleStockRemove}
            maxSelections={5}
          />
        </div>

        {selectedStocks.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4">
              <div className="lg:col-span-2 bg-surface border border-border rounded-lg p-8 md:p-6 sm:p-4">
                <CriteriaWeightSlider
                  criteria={criteria}
                  onWeightChange={handleWeightChange}
                  onResetWeights={handleResetWeights}
                />
              </div>

              <div className="bg-surface border border-border rounded-lg p-8 md:p-6 sm:p-4">
                <TemplateManager
                  templates={templates}
                  onLoadTemplate={handleLoadTemplate}
                  onSaveTemplate={handleSaveTemplate}
                  onDeleteTemplate={handleDeleteTemplate}
                />
              </div>
            </div>

            {comparisons.length > 0 && (
              <>
                <div className="bg-surface border border-border rounded-lg p-8 md:p-6 sm:p-4">
                  <ComparisonChart comparisons={comparisons} />
                </div>

                <div className="bg-surface border border-border rounded-lg p-8 md:p-6 sm:p-4">
                  <h2 className="text-xl font-semibold text-text-primary mb-6">Detailed Comparison</h2>
                  <ComparisonTable
                    comparisons={comparisons}
                    criteria={criteria}
                    onExportCSV={handleExportCSV}
                    onExportPDF={handleExportPDF}
                  />
                </div>

                <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="InformationCircleIcon" size={24} className="text-accent flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-text-primary">Analysis Methodology</h3>
                      <p className="text-sm text-text-secondary">
                        This comparison uses a hybrid AHP-SAW methodology. Scores are normalized across all selected stocks, then weighted according to your criteria preferences. The total score represents the weighted sum of all normalized criteria values.
                      </p>
                      <ul className="text-sm text-text-secondary space-y-1 ml-4 list-disc">
                        <li>Raw scores show actual financial metric values</li>
                        <li>Normalized scores are scaled 0-100 relative to selected stocks</li>
                        <li>Weighted scores apply your custom criteria weights</li>
                        <li>Heat map colors indicate relative performance within each criterion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}