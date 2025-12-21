'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stock {
  id: string;
  symbol: string;
  name: string;
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

interface Criterion {
  id: string;
  name: string;
  weight: number;
  category: string;
}

interface ComparisonTableProps {
  comparisons: StockComparison[];
  criteria: Criterion[];
  onExportCSV: () => void;
  onExportPDF: () => void;
}

export default function ComparisonTable({
  comparisons,
  criteria,
  onExportCSV,
  onExportPDF
}: ComparisonTableProps) {
  const [sortBy, setSortBy] = useState<'rank' | 'symbol'>('rank');
  const [viewMode, setViewMode] = useState<'scores' | 'normalized' | 'weighted'>('scores');

  const sortedComparisons = [...comparisons].sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank;
    return a.stock.symbol.localeCompare(b.stock.symbol);
  });

  const getValueForMode = (score: CriterionScore) => {
    switch (viewMode) {
      case 'normalized': return score.normalizedValue;
      case 'weighted': return score.weightedScore;
      default: return score.value;
    }
  };

  const getColorForRank = (rank: number) => {
    if (rank === 1) return 'bg-success/10 text-success border-success/30';
    if (rank === 2) return 'bg-accent/10 text-accent border-accent/30';
    if (rank === 3) return 'bg-warning/10 text-warning border-warning/30';
    return 'bg-muted text-text-secondary border-border';
  };

  const getHeatmapColor = (value: number, max: number) => {
    const intensity = (value / max) * 100;
    if (intensity >= 80) return 'bg-success/20 text-success';
    if (intensity >= 60) return 'bg-brand-primary/20 text-brand-primary';
    if (intensity >= 40) return 'bg-accent/20 text-accent';
    if (intensity >= 20) return 'bg-warning/20 text-warning';
    return 'bg-error/20 text-error';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('scores')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
              viewMode === 'scores' ?'bg-brand-primary text-white' :'bg-muted text-text-secondary hover:bg-muted/80'
            }`}
          >
            Raw Scores
          </button>
          <button
            onClick={() => setViewMode('normalized')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
              viewMode === 'normalized' ?'bg-brand-primary text-white' :'bg-muted text-text-secondary hover:bg-muted/80'
            }`}
          >
            Normalized
          </button>
          <button
            onClick={() => setViewMode('weighted')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
              viewMode === 'weighted' ?'bg-brand-primary text-white' :'bg-muted text-text-secondary hover:bg-muted/80'
            }`}
          >
            Weighted
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name="DocumentArrowDownIcon" size={18} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={onExportPDF}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-brand-cta text-white rounded-lg hover:opacity-90 transition-smooth"
          >
            <Icon name="DocumentTextIcon" size={18} />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full min-w-[800px]">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => setSortBy(sortBy === 'rank' ? 'symbol' : 'rank')}
                  className="flex items-center gap-2 font-semibold text-text-primary hover:text-brand-primary transition-smooth"
                >
                  <span>Stock</span>
                  <Icon name="ArrowsUpDownIcon" size={16} />
                </button>
              </th>
              {criteria.map((criterion) => (
                <th key={criterion.id} className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-semibold text-text-primary">
                      {criterion.name}
                    </span>
                    <span className="text-xs text-text-secondary">
                      ({criterion.weight.toFixed(1)}%)
                    </span>
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-center">
                <span className="font-semibold text-text-primary">Total Score</span>
              </th>
              <th className="px-6 py-4 text-center">
                <span className="font-semibold text-text-primary">Rank</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedComparisons.map((comparison, index) => {
              const maxScores = criteria.map(criterion => {
                const scores = comparisons.map(c => 
                  getValueForMode(c.scores.find(s => s.criterionId === criterion.id)!)
                );
                return Math.max(...scores);
              });

              return (
                <tr
                  key={comparison.stock.id}
                  className={`border-t border-border ${
                    index % 2 === 0 ? 'bg-surface' : 'bg-muted/30'
                  } hover:bg-brand-primary/5 transition-smooth`}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-text-primary">
                        {comparison.stock.symbol}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {comparison.stock.name}
                      </span>
                    </div>
                  </td>
                  {criteria.map((criterion, criterionIndex) => {
                    const score = comparison.scores.find(s => s.criterionId === criterion.id)!;
                    const value = getValueForMode(score);
                    const maxValue = maxScores[criterionIndex];

                    return (
                      <td key={criterion.id} className="px-4 py-4 text-center">
                        <div
                          className={`inline-block px-3 py-2 rounded-lg font-medium text-sm ${getHeatmapColor(
                            value,
                            maxValue
                          )}`}
                        >
                          {value.toFixed(2)}
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-lg text-brand-primary">
                      {comparison.totalScore.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold ${getColorForRank(
                        comparison.rank
                      )}`}
                    >
                      {comparison.rank}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 text-sm text-text-secondary mt-4">
        <Icon name="InformationCircleIcon" size={18} />
        <span>
          Heat map colors indicate relative performance: Green (highest) to Red (lowest)
        </span>
      </div>
    </div>
  );
}