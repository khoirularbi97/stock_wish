import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface Action {
  label: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

interface QuickActionsProps {
  actions: Action[];
}

const QuickActions = ({ actions }: QuickActionsProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-5 sm:p-4">
      <h2 className="text-xl md:text-lg sm:text-base font-bold text-text-primary mb-6 md:mb-5 sm:mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3 sm:gap-2">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="w-full min-w-0 flex items-start gap-3 p-4 md:p-3 sm:p-2 border border-border rounded-lg hover:bg-muted hover:shadow-md transition-smooth group"
          >
            <div className={`p-3 md:p-2 rounded-lg flex-shrink-0 ${action.color} group-hover:scale-110 transition-transform`}>
              <Icon name={action.icon as any} size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary mb-1 truncate">{action.label}</h3>
              <p className="text-xs text-text-secondary line-clamp-2">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;