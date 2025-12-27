'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Criterion {
  id: string;
  name: string;
  description: string;
  category: 'profitability' | 'liquidity' | 'solvency' | 'efficiency';
  selected: boolean;
}

interface CriteriaSelectionStepProps {
  onNext: (selectedCriteria: Criterion[]) => void;
}

const CriteriaSelectionStep = ({ onNext }: CriteriaSelectionStepProps) => {
  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      id: 'roe',
      name: 'Pengembalian atas Ekuitas (ROE)',
      description: "Mengukur profitabilitas dengan menunjukkan seberapa banyak laba yang dihasilkan perusahaan dari ekuitas pemegang saham",
      category: 'profitability',
      selected: true,
    },
    {
      id: 'npm',
      name: 'Margin Laba Bersih (NPM)',
      description: 'Menunjukkan persentase pendapatan yang menjadi laba setelah semua beban',
      category: 'profitability',
      selected: true,
    },
    {
      id: 'roa',
      name: 'Pengembalian atas Aset (ROA)',
      description: 'Menunjukkan seberapa efisien perusahaan menggunakan asetnya untuk menghasilkan laba',
      category: 'profitability',
      selected: false,
    },
    {
      id: 'cr',
      name: 'Rasio Lancar (CR)',
      description: 'Mengukur kemampuan memenuhi kewajiban jangka pendek dengan aset lancar',
      category: 'liquidity',
      selected: true,
    },
    {
      id: 'qr',
      name: 'Rasio Cepat (QR)',
      description: 'Mengukur kemampuan memenuhi kewajiban jangka pendek menggunakan aset paling likuid',
      category: 'liquidity',
      selected: false,
    },
    {
      id: 'der',
      name: 'Rasio Hutang terhadap Ekuitas (DER)',
      description: 'Membandingkan total kewajiban dengan ekuitas pemegang saham untuk menilai leverage keuangan',
      category: 'solvency',
      selected: true,
    },
    {
      id: 'ato',
      name: 'Perputaran Aset (ATO)',
      description: 'Mengukur efisiensi penggunaan aset untuk menghasilkan pendapatan penjualan',
      category: 'efficiency',
      selected: false,
    },
    {
      id: 'ito',
      name: 'Perputaran Persediaan (ITO)',
      description: 'Menunjukkan berapa kali persediaan terjual dan diganti selama suatu periode',
      category: 'efficiency',
      selected: false,
    },
  ]);

  const [expandedCategory, setExpandedCategory] = useState<string | null>('profitability');

  const toggleCriterion = (id: string) => {
    setCriteria(prev =>
      prev.map(c => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(prev => (prev === category ? null : category));
  };

  const handleNext = () => {
    const selected = criteria.filter(c => c.selected);
    if (selected.length < 3) {
      alert('Silakan pilih minimal 3 kriteria untuk analisis yang bermakna');
      return;
    }
    onNext(selected);
  };

  const categories = [
    { id: 'profitability', name: 'Rasio Profitabilitas', icon: 'ChartBarIcon' },
    { id: 'liquidity', name: 'Rasio Likuiditas', icon: 'CurrencyDollarIcon' },
    { id: 'solvency', name: 'Rasio Solvabilitas', icon: 'ScaleIcon' },
    { id: 'efficiency', name: 'Rasio Efisiensi', icon: 'ArrowPathIcon' },
  ];

  const selectedCount = criteria.filter(c => c.selected).length;

  return (
    <div className="w-full min-w-0 space-y-6 md:space-y-5 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-3">
        <div>
          <h2 className="text-2xl md:text-xl sm:text-lg font-semibold text-text-primary">
            Pilih Kriteria Analisis
          </h2>
          <p className="text-sm md:text-xs text-text-secondary mt-1">
            Pilih rasio keuangan untuk mengevaluasi saham (minimal 3 diperlukan)
          </p>
        </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-lg">
          <Icon name="CheckCircleIcon" size={20} className="text-brand-primary" />
          <span className="text-sm font-semibold text-brand-primary whitespace-nowrap">
            {selectedCount} Dipilih
          </span>
        </div>
      </div>

      <div className="space-y-4 md:space-y-3 sm:space-y-2">
        {categories.map(category => {
          const categoryCriteria = criteria.filter(c => c.category === category.id);
          const selectedInCategory = categoryCriteria.filter(c => c.selected).length;
          const isExpanded = expandedCategory === category.id;

          return (
            <div
              key={category.id}
              className="w-full min-w-0 border border-border rounded-lg overflow-hidden bg-card"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-6 md:px-5 sm:px-4 py-4 md:py-3 sm:py-3 hover:bg-muted transition-smooth"
              >
                <div className="flex items-center gap-3 md:gap-2 sm:gap-2">
                  <Icon name={category.icon as any} size={24} className="text-brand-primary flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="text-base md:text-sm sm:text-sm font-semibold text-text-primary">
                      {category.name}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {selectedInCategory} dari {categoryCriteria.length} dipilih
                    </p>
                  </div>
                </div>
                <Icon
                  name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                  size={20}
                  className="text-text-secondary flex-shrink-0"
                />
              </button>

              {isExpanded && (
                <div className="border-t border-border bg-muted/30 px-6 md:px-5 sm:px-4 py-4 md:py-3 sm:py-3 space-y-3 md:space-y-2 sm:space-y-2">
                  {categoryCriteria.map(criterion => (
                    <label
                      key={criterion.id}
                      className="flex items-start gap-3 md:gap-2 sm:gap-2 p-4 md:p-3 sm:p-3 bg-card rounded-lg border border-border hover:border-brand-primary/50 cursor-pointer transition-smooth"
                    >
                      <input
                        type="checkbox"
                        checked={criterion.selected}
                        onChange={() => toggleCriterion(criterion.id)}
                        className="mt-1 w-5 h-5 md:w-4 md:h-4 sm:w-4 sm:h-4 rounded border-border text-brand-primary focus:ring-brand-primary focus:ring-offset-0 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-xs sm:text-xs font-semibold text-text-primary">
                          {criterion.name}
                        </h4>
                        <p className="text-xs md:text-xs sm:text-xs text-text-secondary mt-1 line-clamp-2">
                          {criterion.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 md:pt-3 sm:pt-2">
        <button
          onClick={handleNext}
          disabled={selectedCount < 3}
          className="flex items-center gap-2 px-6 md:px-5 sm:px-4 py-3 md:py-2 sm:py-2 bg-brand-cta text-white font-semibold text-sm md:text-xs sm:text-xs rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth shadow-md"
        >
          <span>Lanjut ke Penetapan Bobot</span>
          <Icon name="ArrowRightIcon" size={18} />
        </button>
      </div>
    </div>
  );
};

export default CriteriaSelectionStep;