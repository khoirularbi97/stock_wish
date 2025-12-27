'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Action {
  id: number;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

interface QuickActionsProps {
  className?: string;
}

const QuickActions = ({ className = '' }: QuickActionsProps) => {
  const actions: Action[] = [
    {
      id: 1,
  title: 'Analisis Saham',
      description: 'Jalankan analisis AHP-SAW pada saham individu',
      icon: 'MagnifyingGlassIcon',
      href: '/stock-analyzer',
      color: 'bg-primary/10 text-primary hover:bg-primary/20'
    },
    {
      id: 2,
  title: 'Bandingkan Saham',
  description: 'Perbandingan berdampingan dengan kriteria kustom',
      icon: 'TableCellsIcon',
      href: '/comparison-matrix',
      color: 'bg-accent/10 text-accent hover:bg-accent/20'
    },
    {
      id: 3,
  title: 'Lihat Hasil',
      description: 'Jelajahi hasil analisis dan peringkat',
      icon: 'ChartPieIcon',
      href: '/results-visualization',
      color: 'bg-success/10 text-success hover:bg-success/20'
    },
    {
      id: 4,
  title: 'Ruang Kerja Saya',
  description: 'Akses analisis tersimpan dan portofolio',
      icon: 'FolderIcon',
      href: '/user-workspace',
      color: 'bg-warning/10 text-warning hover:bg-warning/20'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-8 md:p-6 sm:p-4 ${className}`}>
      <div className="flex items-center justify-between mb-6 md:mb-4 sm:mb-3">
        <h2 className="text-xl md:text-lg sm:text-base font-semibold text-text-primary">Aksi Cepat</h2>
        <Icon name="BoltIcon" size={24} className="text-primary" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3 sm:gap-2">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={`w-full min-w-0 border border-border rounded-lg p-6 md:p-4 sm:p-3 transition-smooth hover:shadow-md ${action.color}`}
          >
            <div className="flex items-start gap-4 md:gap-3 sm:gap-2">
              <div className="flex-shrink-0">
                <Icon name={action.icon as any} size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-sm sm:text-xs font-semibold mb-1 line-clamp-1">{action.title}</h3>
                <p className="text-sm md:text-xs opacity-80 line-clamp-2">{action.description}</p>
              </div>
              <Icon name="ChevronRightIcon" size={20} className="flex-shrink-0 opacity-50" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;