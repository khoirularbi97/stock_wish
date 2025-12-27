'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Analysis {
  id: string;
  stockSymbol: string;
  stockName: string;
  date: string;
  score: number;
  rank: number;
  criteria: string[];
  image: string;
  alt: string;
}

interface SavedAnalysesProps {
  analyses: Analysis[];
}

const SavedAnalyses = ({ analyses }: SavedAnalysesProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'rank'>('date');

  const filteredAnalyses = analyses
    .filter(analysis => 
      analysis.stockSymbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.stockName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'score') return b.score - a.score;
      return a.rank - b.rank;
    });

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-5 sm:p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-5 sm:mb-4">
  <h2 className="text-xl md:text-lg sm:text-base font-bold text-text-primary">Analisis Tersimpan</h2>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Icon name="MagnifyingGlassIcon" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Cari analisis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'score' | 'rank')}
            className="px-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-surface"
          >
            <option value="date">Urutkan berdasarkan Tanggal</option>
            <option value="score">Urutkan berdasarkan Skor</option>
            <option value="rank">Urutkan berdasarkan Peringkat</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 md:space-y-3 sm:space-y-2">
        {filteredAnalyses.map((analysis) => (
          <div key={analysis.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 md:p-3 sm:p-2 border border-border rounded-lg hover:bg-muted transition-smooth">
            <div className="w-full sm:w-16 h-48 sm:h-16 flex-shrink-0 overflow-hidden rounded-md">
              <AppImage
                src={analysis.image}
                alt={analysis.alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0 w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                <div className="min-w-0 w-full sm:w-auto">
                  <h3 className="text-base md:text-sm font-semibold text-text-primary truncate">{analysis.stockSymbol}</h3>
                  <p className="text-sm md:text-xs text-text-secondary truncate">{analysis.stockName}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md whitespace-nowrap">
                    Skor: {analysis.score.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md whitespace-nowrap">
                    Rank #{analysis.rank}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-2">
                {analysis.criteria.slice(0, 3).map((criterion, idx) => (
                  <span key={idx} className="px-2 py-1 bg-muted text-text-secondary text-xs rounded">
                    {criterion}
                  </span>
                ))}
                {analysis.criteria.length > 3 && (
                  <span className="text-xs text-text-secondary">+{analysis.criteria.length - 3} lainnya</span>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-text-secondary">
                  Dianalisis pada {new Date(analysis.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-smooth">
                    <Icon name="EyeIcon" size={16} />
                    <span>Lihat</span>
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:bg-muted rounded-md transition-smooth">
                    <Icon name="ArrowDownTrayIcon" size={16} />
                    <span>Ekspor</span>
                  </button>
                  <button className="flex items-center justify-center p-2 text-error hover:bg-error/10 rounded-md transition-smooth">
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnalyses.length === 0 && (
        <div className="text-center py-12 md:py-10 sm:py-8">
          <Icon name="DocumentTextIcon" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary">Tidak ditemukan analisis yang cocok dengan pencarian Anda</p>
        </div>
      )}
    </div>
  );
};

export default SavedAnalyses;