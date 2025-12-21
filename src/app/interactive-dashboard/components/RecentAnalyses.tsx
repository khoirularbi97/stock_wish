'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Analysis {
  id: number;
  title: string;
  type: 'comparison' | 'single' | 'portfolio';
  stocks: string[];
  date: string;
  status: 'completed' | 'in-progress' | 'draft';
  score?: number;
}

interface RecentAnalysesProps {
  className?: string;
}

const RecentAnalyses = ({ className = '' }: RecentAnalysesProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);

  useEffect(() => {
    setIsHydrated(true);
    
    const mockAnalyses: Analysis[] = [
      {
        id: 1,
        title: 'Banking Sector Comparison',
        type: 'comparison',
        stocks: ['BBCA', 'BMRI', 'BBRI'],
        date: '2025-12-20T05:00:00',
        status: 'completed',
        score: 87.5
      },
      {
        id: 2,
        title: 'ANTM Deep Dive Analysis',
        type: 'single',
        stocks: ['ANTM'],
        date: '2025-12-19T14:30:00',
        status: 'completed',
        score: 92.3
      },
      {
        id: 3,
        title: 'Telecom vs Mining Sectors',
        type: 'comparison',
        stocks: ['TLKM', 'ANTM'],
        date: '2025-12-19T10:15:00',
        status: 'completed',
        score: 78.9
      },
      {
        id: 4,
        title: 'Q4 Portfolio Review',
        type: 'portfolio',
        stocks: ['ANTM', 'BBCA', 'TLKM', 'BMRI'],
        date: '2025-12-18T16:45:00',
        status: 'in-progress'
      },
      {
        id: 5,
        title: 'Infrastructure Stocks Analysis',
        type: 'comparison',
        stocks: ['TLKM', 'JSMR', 'PTPP'],
        date: '2025-12-18T09:20:00',
        status: 'draft'
      }
    ];

    setAnalyses(mockAnalyses);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'comparison': return 'TableCellsIcon';
      case 'single': return 'MagnifyingGlassIcon';
      case 'portfolio': return 'FolderIcon';
      default: return 'DocumentTextIcon';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success';
      case 'in-progress': return 'bg-warning/10 text-warning';
      case 'draft': return 'bg-muted text-text-secondary';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const formatDate = (dateString: string) => {
    if (!isHydrated) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (!isHydrated) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 ${className}`}>
        <div className="flex items-center justify-between mb-6 md:mb-4 sm:mb-3">
          <h2 className="text-xl md:text-lg sm:text-base font-semibold text-text-primary">Recent Analyses</h2>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 ${className}`}>
      <div className="flex items-center justify-between mb-6 md:mb-4 sm:mb-3">
        <h2 className="text-xl md:text-lg sm:text-base font-semibold text-text-primary">Recent Analyses</h2>
        <Link href="/user-workspace" className="text-sm md:text-xs font-medium text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="space-y-4 md:space-y-3 sm:space-y-2">
        {analyses.map((analysis) => (
          <div
            key={analysis.id}
            className="border border-border rounded-lg p-6 md:p-4 sm:p-3 hover:border-primary transition-smooth cursor-pointer"
          >
            <div className="flex items-start gap-4 md:gap-3 sm:gap-2">
              <div className="flex-shrink-0 w-10 h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={getTypeIcon(analysis.type) as any} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2 md:mb-1">
                  <h3 className="text-base md:text-sm sm:text-xs font-semibold text-text-primary line-clamp-1">
                    {analysis.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap flex-shrink-0 ${getStatusColor(analysis.status)}`}>
                    {analysis.status === 'in-progress' ? 'In Progress' : analysis.status.charAt(0).toUpperCase() + analysis.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 md:gap-1 mb-3 md:mb-2 sm:mb-2">
                  {analysis.stocks.map((stock, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-text-primary text-xs font-medium rounded whitespace-nowrap">
                      {stock}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4 md:gap-3 sm:gap-2">
                  <span className="text-xs text-text-secondary whitespace-nowrap">{formatDate(analysis.date)}</span>
                  {analysis.score && (
                    <div className="flex items-center gap-2 md:gap-1">
                      <span className="text-xs text-text-secondary">Score:</span>
                      <span className="text-sm md:text-xs font-semibold text-success whitespace-nowrap">{analysis.score.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-4 sm:mt-3 pt-6 md:pt-4 sm:pt-3 border-t border-border">
        <Link
          href="/stock-analyzer"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 md:py-2 bg-brand-cta text-white font-semibold text-sm md:text-xs rounded-md hover:opacity-90 transition-smooth"
        >
          <Icon name="PlusIcon" size={20} />
          <span>New Analysis</span>
        </Link>
      </div>
    </div>
  );
};

export default RecentAnalyses;