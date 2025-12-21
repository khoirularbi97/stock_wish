import Icon from '@/components/ui/AppIcon';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

const StatCard = ({ icon, label, value, change, trend }: StatCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-5 sm:p-4 hover:shadow-md transition-smooth">
      <div className="flex items-start justify-between mb-4 md:mb-3 sm:mb-2">
        <div className="p-3 md:p-2.5 sm:p-2 bg-primary/10 rounded-lg">
          <Icon name={icon as any} size={24} className="text-primary" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
          trend === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
        }`}>
          <Icon name={trend === 'up' ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'} size={14} />
          <span className="whitespace-nowrap">{change}</span>
        </div>
      </div>
      <p className="text-sm text-text-secondary mb-1">{label}</p>
      <p className="text-2xl md:text-xl sm:text-lg font-bold text-text-primary whitespace-nowrap">{value}</p>
    </div>
  );
};

interface WorkspaceStatsProps {
  stats: StatCardProps[];
}

const WorkspaceStats = ({ stats }: WorkspaceStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 sm:gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default WorkspaceStats;