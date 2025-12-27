'use client';


import Icon from '@/components/ui/AppIcon';

interface ChartType {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface ChartTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const ChartTypeSelector = ({ selectedType, onTypeChange }: ChartTypeSelectorProps) => {
  const chartTypes: ChartType[] = [
  { id: 'bar', name: 'Diagram Batang', icon: 'ChartBarIcon', description: 'Bandingkan nilai antar kategori' },
    { id: 'line', name: 'Diagram Garis', icon: 'ChartBarSquareIcon', description: 'Tampilkan tren dari waktu ke waktu' },
    { id: 'radar', name: 'Diagram Radar', icon: 'CircleStackIcon', description: 'Perbandingan multi-dimensi' },
    { id: 'scatter', name: 'Diagram Sebar', icon: 'SparklesIcon', description: 'Analisis korelasi' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 sm:gap-2">
      {chartTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeChange(type.id)}
          className={`w-full min-w-0 p-6 md:p-5 sm:p-4 rounded-lg border-2 transition-smooth text-left ${
            selectedType === type.id
              ? 'border-primary bg-primary/5' :'border-border bg-surface hover:border-primary/50'
          }`}
        >
          <div className="flex items-start gap-3 md:gap-2">
            <div className={`p-2 rounded-md ${selectedType === type.id ? 'bg-primary text-white' : 'bg-muted text-text-secondary'}`}>
              <Icon name={type.icon as any} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-sm font-semibold text-text-primary line-clamp-1">{type.name}</h3>
              <p className="text-sm md:text-xs text-text-secondary mt-1 line-clamp-2">{type.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChartTypeSelector;