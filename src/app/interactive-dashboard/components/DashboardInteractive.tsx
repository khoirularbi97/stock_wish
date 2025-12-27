'use client';

import { useState, useEffect } from 'react';
import QuickMetrics from './QuickMetrics';
import MarketOverview from './MarketOverview';
import PortfolioOverview from './PortfolioOverview';
import MarketAlerts from './MarketAlerts';
import RecentAnalyses from './RecentAnalyses';
import QuickActions from './QuickActions';

const DashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-full mx-auto px-8 md:px-6 sm:px-4 py-8 md:py-6 sm:py-4 mt-16">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 h-96 bg-muted rounded-lg"></div>
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-full mx-auto px-8 md:px-6 sm:px-4 py-8 md:py-6 sm:py-4 mt-16">
        {/* Header Section */}
        <div className="mb-8 md:mb-6 sm:mb-4">
          <h1 className="text-4xl md:text-3xl sm:text-2xl font-bold text-text-primary mb-3 md:mb-2 sm:mb-2">
            Dasbor Interaktif
          </h1>
          <p className="text-lg md:text-base sm:text-sm text-text-secondary line-clamp-2">
            Pusat analitik waktu-nyata dengan pelacakan portofolio lengkap dan wawasan pasar
          </p>
        </div>

        {/* Quick Metrics */}
        <QuickMetrics className="mb-8 md:mb-6 sm:mb-4" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4 mb-8 md:mb-6 sm:mb-4">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8 md:space-y-6 sm:space-y-4">
            <MarketOverview />
            <PortfolioOverview />
            <RecentAnalyses />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-8 md:space-y-6 sm:space-y-4">
            <MarketAlerts />
            <QuickActions />
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-3 sm:gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-sm sm:text-xs font-semibold text-text-primary mb-2 md:mb-1">
                Informasi Dasbor
              </h3>
              <p className="text-sm md:text-xs text-text-secondary line-clamp-2">
                Semua data diperbarui secara waktu-nyata. Perhitungan analisis menggunakan metodologi hibrida AHP-SAW untuk mendukung pengambilan keputusan yang akurat.
              </p>
            </div>
            <div className="flex-shrink-0 text-xs text-text-secondary whitespace-nowrap">
              Last sync: 2025-12-20 05:45 WIB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInteractive;