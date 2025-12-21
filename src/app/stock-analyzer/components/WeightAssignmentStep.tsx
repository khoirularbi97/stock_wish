'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Criterion {
  id: string;
  name: string;
  description: string;
  category: string;
  selected: boolean;
}

interface CriterionWeight extends Criterion {
  weight: number;
  ahpScore: number;
}

interface WeightAssignmentStepProps {
  criteria: Criterion[];
  onNext: (weightedCriteria: CriterionWeight[]) => void;
  onBack: () => void;
}

const WeightAssignmentStep = ({ criteria, onNext, onBack }: WeightAssignmentStepProps) => {
  const [weightedCriteria, setWeightedCriteria] = useState<CriterionWeight[]>(
    criteria.map(c => ({
      ...c,
      weight: 0,
      ahpScore: 0,
    }))
  );

  const [showAHPMatrix, setShowAHPMatrix] = useState(false);
  const [activeComparison, setActiveComparison] = useState<{ row: number; col: number } | null>(null);

  const comparisonScale = [
    { value: 9, label: 'Extremely More Important' },
    { value: 7, label: 'Very Strongly More Important' },
    { value: 5, label: 'Strongly More Important' },
    { value: 3, label: 'Moderately More Important' },
    { value: 1, label: 'Equally Important' },
  ];

  const calculateAHPWeights = () => {
    const n = weightedCriteria.length;
    const matrix: number[][] = Array(n)
      .fill(0)
      .map(() => Array(n).fill(1));

    // Simulate pairwise comparisons with mock values
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const comparison = Math.random() * 4 + 1; // Random value between 1-5
        matrix[i][j] = comparison;
        matrix[j][i] = 1 / comparison;
      }
    }

    // Calculate column sums
    const colSums = Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        colSums[j] += matrix[i][j];
      }
    }

    // Normalize matrix
    const normalized: number[][] = Array(n)
      .fill(0)
      .map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        normalized[i][j] = matrix[i][j] / colSums[j];
      }
    }

    // Calculate weights (row averages)
    const weights = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += normalized[i][j];
      }
      weights[i] = sum / n;
    }

    // Update criteria with calculated weights
    setWeightedCriteria(prev =>
      prev.map((c, idx) => ({
        ...c,
        ahpScore: weights[idx],
        weight: Math.round(weights[idx] * 100),
      }))
    );

    setShowAHPMatrix(false);
  };

  const handleManualWeightChange = (id: string, value: number) => {
    setWeightedCriteria(prev =>
      prev.map(c => (c.id === id ? { ...c, weight: value } : c))
    );
  };

  const normalizeWeights = () => {
    const total = weightedCriteria.reduce((sum, c) => sum + c.weight, 0);
    if (total === 0) return;

    setWeightedCriteria(prev =>
      prev.map(c => ({
        ...c,
        weight: Math.round((c.weight / total) * 100),
      }))
    );
  };

  const handleNext = () => {
    const total = weightedCriteria.reduce((sum, c) => sum + c.weight, 0);
    if (Math.abs(total - 100) > 1) {
      alert('Total weight must equal 100%. Click "Normalize Weights" to auto-adjust.');
      return;
    }
    onNext(weightedCriteria);
  };

  const totalWeight = weightedCriteria.reduce((sum, c) => sum + c.weight, 0);
  const isValid = Math.abs(totalWeight - 100) <= 1;

  return (
    <div className="w-full min-w-0 space-y-6 md:space-y-5 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-3">
        <div>
          <h2 className="text-2xl md:text-xl sm:text-lg font-semibold text-text-primary">
            Assign Criteria Weights
          </h2>
          <p className="text-sm md:text-xs text-text-secondary mt-1">
            Define importance of each criterion (total must equal 100%)
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-lg">
          <Icon
            name={isValid ? 'CheckCircleIcon' : 'ExclamationCircleIcon'}
            size={20}
            className={isValid ? 'text-success' : 'text-warning'}
          />
          <span
            className={`text-sm font-semibold whitespace-nowrap ${
              isValid ? 'text-success' : 'text-warning'
            }`}
          >
            Total: {totalWeight}%
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 md:gap-2 sm:gap-2">
        <button
          onClick={() => setShowAHPMatrix(true)}
          className="flex items-center gap-2 px-5 md:px-4 sm:px-3 py-2 md:py-2 sm:py-2 bg-brand-primary text-white font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:opacity-90 transition-smooth shadow-md"
        >
          <Icon name="CalculatorIcon" size={18} />
          <span>Calculate AHP Weights</span>
        </button>
        <button
          onClick={normalizeWeights}
          className="flex items-center gap-2 px-5 md:px-4 sm:px-3 py-2 md:py-2 sm:py-2 bg-secondary text-white font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:opacity-90 transition-smooth"
        >
          <Icon name="AdjustmentsHorizontalIcon" size={18} />
          <span>Normalize Weights</span>
        </button>
      </div>

      <div className="space-y-4 md:space-y-3 sm:space-y-3">
        {weightedCriteria.map(criterion => (
          <div
            key={criterion.id}
            className="w-full min-w-0 p-6 md:p-5 sm:p-4 bg-card border border-border rounded-lg"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-3 sm:gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-sm sm:text-sm font-semibold text-text-primary">
                  {criterion.name}
                </h3>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                  {criterion.description}
                </p>
              </div>

              <div className="flex items-center gap-4 md:gap-3 sm:gap-3">
                <div className="flex-1 lg:flex-none lg:w-48 md:w-40 sm:w-full">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={criterion.weight}
                    onChange={e => handleManualWeightChange(criterion.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-brand-primary"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={criterion.weight}
                    onChange={e => handleManualWeightChange(criterion.id, parseInt(e.target.value) || 0)}
                    className="w-20 md:w-16 sm:w-16 px-3 md:px-2 sm:px-2 py-2 md:py-1 sm:py-1 text-sm md:text-xs sm:text-xs font-semibold text-center border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <span className="text-sm md:text-xs sm:text-xs font-semibold text-text-secondary">
                    %
                  </span>
                </div>
              </div>
            </div>

            {criterion.ahpScore > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Icon name="InformationCircleIcon" size={16} />
                  <span>AHP Calculated Score: {(criterion.ahpScore * 100).toFixed(2)}%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAHPMatrix && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 md:p-3 sm:p-2">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-xl shadow-xl">
            <div className="sticky top-0 bg-card border-b border-border px-6 md:px-5 sm:px-4 py-4 md:py-3 sm:py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-base sm:text-sm font-semibold text-text-primary">
                  AHP Pairwise Comparison Matrix
                </h3>
                <button
                  onClick={() => setShowAHPMatrix(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="XMarkIcon" size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-5 sm:p-4 space-y-4 md:space-y-3 sm:space-y-3">
              <p className="text-sm md:text-xs sm:text-xs text-text-secondary">
                Compare each pair of criteria using the scale below. The system will calculate optimal weights using the Analytic Hierarchy Process (AHP) methodology.
              </p>

              <div className="flex items-center justify-center">
                <button
                  onClick={calculateAHPWeights}
                  className="flex items-center gap-2 px-6 md:px-5 sm:px-4 py-3 md:py-2 sm:py-2 bg-brand-cta text-white font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:opacity-90 transition-smooth shadow-md"
                >
                  <Icon name="CalculatorIcon" size={18} />
                  <span>Calculate Weights</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-2 sm:gap-2 pt-4 md:pt-3 sm:pt-2">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 md:px-5 sm:px-4 py-3 md:py-2 sm:py-2 bg-muted text-text-primary font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:bg-muted/80 transition-smooth"
        >
          <Icon name="ArrowLeftIcon" size={18} />
          <span>Back to Criteria</span>
        </button>
        <button
          onClick={handleNext}
          disabled={!isValid}
          className="flex items-center justify-center gap-2 px-6 md:px-5 sm:px-4 py-3 md:py-2 sm:py-2 bg-brand-cta text-white font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth shadow-md"
        >
          <span>Continue to Stock Data</span>
          <Icon name="ArrowRightIcon" size={18} />
        </button>
      </div>
    </div>
  );
};

export default WeightAssignmentStep;