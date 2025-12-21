import Icon from '@/components/ui/AppIcon';

interface Activity {
  id: string;
  type: 'analysis' | 'export' | 'criteria' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'analysis': return 'bg-primary/10 text-primary';
      case 'export': return 'bg-accent/10 text-accent';
      case 'criteria': return 'bg-success/10 text-success';
      case 'alert': return 'bg-warning/10 text-warning';
      default: return 'bg-muted text-text-secondary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-5 sm:p-4">
      <h2 className="text-xl md:text-lg sm:text-base font-bold text-text-primary mb-6 md:mb-5 sm:mb-4">Recent Activity</h2>
      
      <div className="space-y-4 md:space-y-3 sm:space-y-2">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 md:p-2 hover:bg-muted rounded-lg transition-smooth">
            <div className={`p-2 rounded-lg flex-shrink-0 ${getActivityColor(activity.type)}`}>
              <Icon name={activity.icon as any} size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary truncate">{activity.title}</h3>
              <p className="text-xs text-text-secondary line-clamp-2 mb-1">{activity.description}</p>
              <p className="text-xs text-text-secondary">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;