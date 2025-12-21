'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Criterion {
  id: string;
  name: string;
  description: string;
  category: 'profitability' | 'liquidity' | 'solvency' | 'efficiency';
  selected: boolean;
}

interface CriteriaSelectionStepProps {
  onNext: (selectedCriteria: Criterion[]) => void;
}

const CriteriaSelectionStep = ({ onNext }: CriteriaSelectionStepProps) => {
  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      id: 'roe',
      name: 'Return on Equity (ROE)',
      description: 'Measures profitability by revealing how much profit a company generates with shareholders\' equity',
      category: 'profitability',
      selected: true,
    },
    {
      id: 'npm',
      name: 'Net Profit Margin (NPM)',
      description: 'Shows percentage of revenue that translates into profit after all expenses',
      category: 'profitability',
      selected: true,
    },
    {
      id: 'roa',
      name: 'Return on Assets (ROA)',
      description: 'Indicates how efficiently a company uses its assets to generate profit',
      category: 'profitability',
      selected: false,
    },
    {
      id: 'cr',
      name: 'Current Ratio (CR)',
      description: 'Measures ability to pay short-term obligations with current assets',
      category: 'liquidity',
      selected: true,
    },
    {
      id: 'qr',
      name: 'Quick Ratio (QR)',
      description: 'Tests ability to meet short-term obligations with most liquid assets',
      category: 'liquidity',
      selected: false,
    },
    {
      id: 'der',
      name: 'Debt to Equity Ratio (DER)',
      description: 'Compares total liabilities to shareholder equity to assess financial leverage',
      category: 'solvency',
      selected: true,
    },
    {
      id: 'ato',
      name: 'Asset Turnover (ATO)',
      description: 'Measures efficiency of using assets to generate sales revenue',
      category: 'efficiency',
      selected: false,
    },
    {
      id: 'ito',
      name: 'Inventory Turnover (ITO)',
      description: 'Shows how many times inventory is sold and replaced over a period',
      category: 'efficiency',
      selected: false,
    },
  ]);

  const [expandedCategory, setExpandedCategory] = useState<string | null>('profitability');

  const toggleCriterion = (id: string) => {
    setCriteria(prev =>
      prev.map(c => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(prev => (prev === category ? null : category));
  };

  const handleNext = () => {
    const selected = criteria.filter(c => c.selected);
    if (selected.length < 3) {
      alert('Please select at least 3 criteria for meaningful analysis');
      return;
    }
    onNext(selected);
  };

  const categories = [
    { id: 'profitability', name: 'Profitability Ratios', icon: 'ChartBarIcon' },
    { id: 'liquidity', name: 'Liquidity Ratios', icon: 'CurrencyDollarIcon' },
    { id: 'solvency', name: 'Solvency Ratios', icon: 'ScaleIcon' },
    { id: 'efficiency', name: 'Efficiency Ratios', icon: 'ArrowPathIcon' },
  ];

  const selectedCount = criteria.filter(c => c.selected).length;

  return (
    <div className="w-full min-w-0 space-y-6 md:space-y-5 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-3">
        <div>
          <h2 className="text-2xl md:text-xl sm:text-lg font-semibold text-text-primary">
            Select Analysis Criteria
          </h2>
          <p className="text-sm md:text-xs text-text-secondary mt-1">
            Choose financial ratios to evaluate stocks (minimum 3 required)
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-lg">
          <Icon name="CheckCircleIcon" size={20} className="text-brand-primary" />
          <span className="text-sm font-semibold text-brand-primary whitespace-nowrap">
            {selectedCount} Selected
          </span>
        </div>
      </div>

      <div className="space-y-4 md:space-y-3 sm:space-y-2">
        {categories.map(category => {
          const categoryCriteria = criteria.filter(c => c.category === category.id);
          const selectedInCategory = categoryCriteria.filter(c => c.selected).length;
          const isExpanded = expandedCategory === category.id;

          return (
            <div
              key={category.id}
              className="w-full min-w-0 border border-border rounded-lg overflow-hidden bg-card"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-6 md:px-5 sm:px-4 py-4 md:py-3 sm:py-3 hover:bg-muted transition-smooth"
              >
                <div className="flex items-center gap-3 md:gap-2 sm:gap-2">
                  <Icon name={category.icon as any} size={24} className="text-brand-primary flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="text-base md:text-sm sm:text-sm font-semibold text-text-primary">
                      {category.name}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {selectedInCategory} of {categoryCriteria.length} selected
                    </p>
                  </div>
                </div>
                <Icon
                  name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                  size={20}
                  className="text-text-secondary flex-shrink-0"
                />
              </button>

              {isExpanded && (
                <div className="border-t border-border bg-muted/30 px-6 md:px-5 sm:px-4 py-4 md:py-3 sm:py-3 space-y-3 md:space-y-2 sm:space-y-2">
                  {categoryCriteria.map(criterion => (
                    <label
                      key={criterion.id}
                      className="flex items-start gap-3 md:gap-2 sm:gap-2 p-4 md:p-3 sm:p-3 bg-card rounded-lg border border-border hover:border-brand-primary/50 cursor-pointer transition-smooth"
                    >
                      <input
                        type="checkbox"
                        checked={criterion.selected}
                        onChange={() => toggleCriterion(criterion.id)}
                        className="mt-1 w-5 h-5 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded border-border text-brand-primary focus:ring-brand-primary focus:ring-offset-0 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-xs sm:text-xs font-semibold text-text-primary">
                          {criterion.name}
                        </h4>
                        <p className="text-xs md:text-xs sm:text-xs text-text-secondary mt-1 line-clamp-2">
                          {criterion.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 md:pt-3 sm:pt-2">
        <button
          onClick={handleNext}
          disabled={selectedCount < 3}
          className="flex items-center gap-2 px-6 md:px-5 sm:px-4 py-3 md:py-2 sm:py-2 bg-brand-cta text-white font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth shadow-md"
        >
          <span>Continue to Weight Assignment</span>
          <Icon name="ArrowRightIcon" size={18} />
        </button>
      </div>
    </div>
  );
};

export default CriteriaSelectionStep;