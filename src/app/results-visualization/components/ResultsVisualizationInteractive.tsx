'use client';

import { useState, useEffect } from 'react';
import ChartTypeSelector from './ChartTypeSelector';
import TimePeriodFilter from './TimePeriodFilter';
import StockRankingTable from './StockRankingTable';
import BarChartVisualization from './BarChartVisualization';
import LineChartVisualization from './LineChartVisualization';
import RadarChartVisualization from './RadarChartVisualization';
import ScatterPlotVisualization from './ScatterPlotVisualization';
import ExportControls from './ExportControls';
import AnnotationTool from './AnnotationTool';
import ComparisonOverlay from './ComparisonOverlay';
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

interface Annotation {
  id: string;
  text: string;
  timestamp: string;
}

interface ComparisonStock {
  symbol: string;
  name: string;
  color: string;
  visible: boolean;
}

const ResultsVisualizationInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState('bar');
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [comparisonStocks, setComparisonStocks] = useState<ComparisonStock[]>([
    { symbol: 'ANTM', name: 'Aneka Tambang', color: '#2E8B57', visible: true },
    { symbol: 'BBCA', name: 'Bank Central Asia', color: '#4A90A4', visible: true },
    { symbol: 'TLKM', name: 'Telkom Indonesia', color: '#FF6B35', visible: true },
  ]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const stockRankings: StockRanking[] = [
    {
      rank: 1,
      symbol: 'BBCA',
      name: 'Bank Central Asia Tbk',
      score: 0.8547,
      change: 0,
      criteria: {
        profitability: 0.2845,
        liquidity: 0.2134,
        solvency: 0.1876,
        efficiency: 0.1692
      }
    },
    {
      rank: 2,
      symbol: 'TLKM',
      name: 'Telkom Indonesia Tbk',
      score: 0.7823,
      change: 1,
      criteria: {
        profitability: 0.2456,
        liquidity: 0.1987,
        solvency: 0.1734,
        efficiency: 0.1646
      }
    },
    {
      rank: 3,
      symbol: 'ANTM',
      name: 'Aneka Tambang Tbk',
      score: 0.7156,
      change: -1,
      criteria: {
        profitability: 0.2123,
        liquidity: 0.1845,
        solvency: 0.1623,
        efficiency: 0.1565
      }
    }
  ];

  const barChartData = stockRankings.map(stock => ({
    label: stock.symbol,
    value: stock.score,
    color: comparisonStocks.find(s => s.symbol === stock.symbol)?.color || '#2E8B57'
  }));

  const lineChartData = [
    { label: 'Jan', value: 0.7234 },
    { label: 'Feb', value: 0.7456 },
    { label: 'Mar', value: 0.7689 },
    { label: 'Apr', value: 0.7823 },
    { label: 'May', value: 0.8012 },
    { label: 'Jun', value: 0.8234 },
    { label: 'Jul', value: 0.8367 },
    { label: 'Aug', value: 0.8456 },
    { label: 'Sep', value: 0.8523 },
    { label: 'Oct', value: 0.8547 },
    { label: 'Nov', value: 0.8547 },
    { label: 'Dec', value: 0.8547 }
  ];

  const radarChartData = [
    { label: 'Profitability', value: 0.8547 },
    { label: 'Liquidity', value: 0.7823 },
    { label: 'Solvency', value: 0.7156 },
    { label: 'Efficiency', value: 0.8234 },
    { label: 'Growth', value: 0.7689 }
  ];

  const scatterPlotData = stockRankings.map(stock => ({
    x: stock.criteria.profitability,
    y: stock.criteria.liquidity,
    label: stock.symbol,
    color: comparisonStocks.find(s => s.symbol === stock.symbol)?.color || '#2E8B57'
  }));

  const handleExportPDF = () => {
    if (!isHydrated) return;
    alert('PDF export functionality would be implemented here. This would generate a comprehensive report with all charts and rankings.');
  };

  const handleExportCSV = () => {
    if (!isHydrated) return;
    alert('CSV export functionality would be implemented here. This would export the ranking data in spreadsheet format.');
  };

  const handleShare = () => {
    if (!isHydrated) return;
    alert('Share functionality would be implemented here. This would allow sharing analysis results via email or social media.');
  };

  const handleAddAnnotation = (text: string) => {
    if (!isHydrated) return;
    const newAnnotation: Annotation = {
      id: `ann-${Date.now()}`,
      text,
      timestamp: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    setAnnotations([newAnnotation, ...annotations]);
  };

  const handleDeleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter(ann => ann.id !== id));
  };

  const handleToggleStock = (symbol: string) => {
    setComparisonStocks(comparisonStocks.map(stock =>
      stock.symbol === symbol ? { ...stock, visible: !stock.visible } : stock
    ));
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-full mx-auto px-8 md:px-6 sm:px-4 py-8 md:py-6 sm:py-4">
          <div className="h-12 bg-muted/30 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-muted/30 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="h-96 bg-muted/30 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-full mx-auto px-8 md:px-6 sm:px-4 py-8 md:py-6 sm:py-4">
        {/* Header Section */}
        <div className="mb-8 md:mb-6 sm:mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-3 sm:gap-2 mb-6 md:mb-4 sm:mb-3">
            <div>
              <h1 className="text-3xl md:text-2xl sm:text-xl font-bold text-text-primary mb-2 md:mb-1.5 sm:mb-1">Results Visualization</h1>
              <p className="text-base md:text-sm sm:text-xs text-text-secondary">Interactive analysis of AHP-SAW stock rankings with comprehensive data visualization</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:gap-2 sm:gap-1.5">
              <ExportControls
                onExportPDF={handleExportPDF}
                onExportCSV={handleExportCSV}
                onShare={handleShare}
              />
              <AnnotationTool
                annotations={annotations}
                onAddAnnotation={handleAddAnnotation}
                onDeleteAnnotation={handleDeleteAnnotation}
              />
              <ComparisonOverlay
                stocks={comparisonStocks}
                onToggleStock={handleToggleStock}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 sm:gap-2">
            <div className="p-6 md:p-5 sm:p-4 bg-surface rounded-lg border border-border">
              <div className="flex items-center gap-3 md:gap-2">
                <div className="p-3 md:p-2 bg-primary/10 rounded-lg">
                  <Icon name="ChartBarIcon" size={24} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs md:text-[10px] text-text-secondary mb-1">Top Performer</div>
                  <div className="text-xl md:text-lg sm:text-base font-bold text-text-primary line-clamp-1">BBCA</div>
                  <div className="text-sm md:text-xs text-success whitespace-nowrap">Score: 0.8547</div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-5 sm:p-4 bg-surface rounded-lg border border-border">
              <div className="flex items-center gap-3 md:gap-2">
                <div className="p-3 md:p-2 bg-accent/10 rounded-lg">
                  <Icon name="TrendingUpIcon" size={24} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs md:text-[10px] text-text-secondary mb-1">Biggest Gainer</div>
                  <div className="text-xl md:text-lg sm:text-base font-bold text-text-primary line-clamp-1">TLKM</div>
                  <div className="text-sm md:text-xs text-success whitespace-nowrap">+1 Position</div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-5 sm:p-4 bg-surface rounded-lg border border-border">
              <div className="flex items-center gap-3 md:gap-2">
                <div className="p-3 md:p-2 bg-warning/10 rounded-lg">
                  <Icon name="ClockIcon" size={24} className="text-warning" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs md:text-[10px] text-text-secondary mb-1">Analysis Period</div>
                  <div className="text-xl md:text-lg sm:text-base font-bold text-text-primary line-clamp-1">{selectedPeriod}</div>
                  <div className="text-sm md:text-xs text-text-secondary whitespace-nowrap">Updated Today</div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-5 sm:p-4 bg-surface rounded-lg border border-border">
              <div className="flex items-center gap-3 md:gap-2">
                <div className="p-3 md:p-2 bg-success/10 rounded-lg">
                  <Icon name="DocumentChartBarIcon" size={24} className="text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs md:text-[10px] text-text-secondary mb-1">Stocks Analyzed</div>
                  <div className="text-xl md:text-lg sm:text-base font-bold text-text-primary whitespace-nowrap">3</div>
                  <div className="text-sm md:text-xs text-text-secondary whitespace-nowrap">All Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="mb-8 md:mb-6 sm:mb-4 space-y-6 md:space-y-4 sm:space-y-3">
          <div>
            <h2 className="text-lg md:text-base sm:text-sm font-semibold text-text-primary mb-4 md:mb-3 sm:mb-2">Chart Type</h2>
            <ChartTypeSelector
              selectedType={selectedChartType}
              onTypeChange={setSelectedChartType}
            />
          </div>

          <div>
            <h2 className="text-lg md:text-base sm:text-sm font-semibold text-text-primary mb-4 md:mb-3 sm:mb-2">Time Period</h2>
            <TimePeriodFilter
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />
          </div>
        </div>

        {/* Chart Visualization */}
        <div className="mb-8 md:mb-6 sm:mb-4">
          {selectedChartType === 'bar' && (
            <BarChartVisualization
              data={barChartData.filter(d => 
                comparisonStocks.find(s => s.symbol === d.label)?.visible
              )}
              title="Stock Performance Comparison - AHP-SAW Scores"
            />
          )}

          {selectedChartType === 'line' && (
            <LineChartVisualization
              data={lineChartData}
              title="BBCA Performance Trend Over Time"
              color="#2E8B57"
            />
          )}

          {selectedChartType === 'radar' && (
            <RadarChartVisualization
              data={radarChartData}
              title="Multi-Criteria Analysis - BBCA"
              color="#2E8B57"
            />
          )}

          {selectedChartType === 'scatter' && (
            <ScatterPlotVisualization
              data={scatterPlotData.filter(d => 
                comparisonStocks.find(s => s.symbol === d.label)?.visible
              )}
              title="Profitability vs Liquidity Correlation"
              xLabel="Profitability Score"
              yLabel="Liquidity Score"
            />
          )}
        </div>

        {/* Ranking Table */}
        <div className="mb-8 md:mb-6 sm:mb-4">
          <div className="flex items-center justify-between mb-4 md:mb-3 sm:mb-2">
            <h2 className="text-lg md:text-base sm:text-sm font-semibold text-text-primary">Stock Rankings</h2>
            <div className="flex items-center gap-2 md:gap-1.5 text-sm md:text-xs text-text-secondary">
              <Icon name="InformationCircleIcon" size={16} />
              <span className="hidden sm:inline">Click rows to expand details</span>
            </div>
          </div>
          <div className="bg-surface rounded-lg border border-border overflow-hidden">
            <StockRankingTable rankings={stockRankings} />
          </div>
        </div>

        {/* Methodology Note */}
        <div className="p-6 md:p-5 sm:p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-start gap-3 md:gap-2">
            <Icon name="AcademicCapIcon" size={24} className="text-primary flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-sm font-semibold text-text-primary mb-2 md:mb-1.5">About This Analysis</h3>
              <p className="text-sm md:text-xs text-text-secondary leading-relaxed">
                These visualizations represent the results of our hybrid AHP-SAW methodology applied to Indonesian stock market data. The rankings combine weighted criteria analysis (AHP) with normalized performance scoring (SAW) to provide comprehensive investment decision support. All calculations are transparent and can be reviewed in detail through our methodology documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsVisualizationInteractive;