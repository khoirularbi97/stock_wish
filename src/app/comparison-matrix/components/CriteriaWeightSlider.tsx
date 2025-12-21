'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Criterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  category: string;
}

interface CriteriaWeightSliderProps {
  criteria: Criterion[];
  onWeightChange: (criterionId: string, newWeight: number) => void;
  onResetWeights: () => void;
}

export default function CriteriaWeightSlider({
  criteria,
  onWeightChange,
  onResetWeights
}: CriteriaWeightSliderProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Financial', 'Performance', 'Risk']);

  const categories = Array.from(new Set(criteria.map(c => c.category)));

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Criteria Weights</h3>
          <p className="text-sm text-text-secondary mt-1">
            Total Weight: <span className="font-semibold text-brand-primary">{totalWeight.toFixed(2)}%</span>
          </p>
        </div>
        <button
          onClick={onResetWeights}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted rounded-lg transition-smooth"
        >
          <Icon name="ArrowPathIcon" size={18} />
          <span>Reset</span>
        </button>
      </div>

      {categories.map((category) => {
        const categoryCriteria = criteria.filter(c => c.category === category);
        const isExpanded = expandedCategories.includes(category);

        return (
          <div key={category} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between px-6 py-4 bg-muted hover:bg-muted/80 transition-smooth"
            >
              <div className="flex items-center gap-3">
                <Icon 
                  name={isExpanded ? 'ChevronDownIcon' : 'ChevronRightIcon'} 
                  size={20} 
                  className="text-text-secondary"
                />
                <span className="font-semibold text-text-primary">{category}</span>
                <span className="text-sm text-text-secondary">
                  ({categoryCriteria.length} criteria)
                </span>
              </div>
            </button>

            {isExpanded && (
              <div className="px-6 py-4 space-y-6 bg-surface">
                {categoryCriteria.map((criterion) => (
                  <div key={criterion.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <label className="text-sm font-medium text-text-primary">
                          {criterion.name}
                        </label>
                        <p className="text-xs text-text-secondary mt-1">
                          {criterion.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <input
                          type="number"
                          value={criterion.weight.toFixed(1)}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value) && value >= 0 && value <= 100) {
                              onWeightChange(criterion.id, value);
                            }
                          }}
                          className="w-16 px-2 py-1 text-sm text-center border border-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                        <span className="text-sm text-text-secondary">%</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      value={criterion.weight}
                      onChange={(e) => onWeightChange(criterion.id, parseFloat(e.target.value))}
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}