'use client';

import Icon from '@/components/ui/AppIcon';

interface ExportControlsProps {
  onExportPDF: () => void;
  onExportCSV: () => void;
  onShare: () => void;
}

const ExportControls = ({ onExportPDF, onExportCSV, onShare }: ExportControlsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-2 sm:gap-1.5">
      <button
        onClick={onExportPDF}
        className="flex items-center gap-2 px-4 md:px-3 sm:px-2 py-2 md:py-1.5 sm:py-1 bg-primary text-white rounded-md hover:opacity-90 transition-smooth text-sm md:text-xs font-medium whitespace-nowrap"
      >
  <Icon name="DocumentArrowDownIcon" size={18} />
  <span>Ekspor PDF</span>
      </button>
      <button
        onClick={onExportCSV}
        className="flex items-center gap-2 px-4 md:px-3 sm:px-2 py-2 md:py-1.5 sm:py-1 bg-accent text-white rounded-md hover:opacity-90 transition-smooth text-sm md:text-xs font-medium whitespace-nowrap"
      >
  <Icon name="TableCellsIcon" size={18} />
  <span>Ekspor CSV</span>
      </button>
      <button
        onClick={onShare}
        className="flex items-center gap-2 px-4 md:px-3 sm:px-2 py-2 md:py-1.5 sm:py-1 bg-secondary text-white rounded-md hover:opacity-90 transition-smooth text-sm md:text-xs font-medium whitespace-nowrap"
      >
  <Icon name="ShareIcon" size={18} />
  <span>Bagikan</span>
      </button>
    </div>
  );
};

export default ExportControls;