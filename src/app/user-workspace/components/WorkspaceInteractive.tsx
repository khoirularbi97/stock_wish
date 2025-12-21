'use client';

import { useState, useEffect } from 'react';
import WorkspaceStats from './WorkspaceStats';
import SavedAnalyses from './SavedAnalyses';
import CustomCriteria from './CustomCriteria';
import PortfolioTracking from './PortfolioTracking';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';

interface WorkspaceInteractiveProps {
  stats: any[];
  analyses: any[];
  criteria: any[];
  stocks: any[];
  activities: any[];
  actions: any[];
}

const WorkspaceInteractive = ({ stats, analyses, criteria, stocks, activities, actions }: WorkspaceInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="space-y-8 md:space-y-6 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 md:p-5 sm:p-4 animate-pulse">
              <div className="h-12 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-8 bg-muted rounded"></div>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-lg p-6 md:p-5 sm:p-4 animate-pulse">
          <div className="h-8 bg-muted rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-6 sm:space-y-4">
      <WorkspaceStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4">
        <div className="lg:col-span-2 space-y-8 md:space-y-6 sm:space-y-4">
          <SavedAnalyses analyses={analyses} />
          <PortfolioTracking stocks={stocks} />
        </div>
        
        <div className="space-y-8 md:space-y-6 sm:space-y-4">
          <QuickActions actions={actions} />
          <RecentActivity activities={activities} />
        </div>
      </div>
      
      <CustomCriteria criteria={criteria} />
    </div>
  );
};

export default WorkspaceInteractive;