'use client';



interface TimePeriod {
  id: string;
  label: string;
  value: string;
}

interface TimePeriodFilterProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const TimePeriodFilter = ({ selectedPeriod, onPeriodChange }: TimePeriodFilterProps) => {
  const periods: TimePeriod[] = [
    { id: '1M', label: '1 Month', value: '1M' },
    { id: '3M', label: '3 Months', value: '3M' },
    { id: '6M', label: '6 Months', value: '6M' },
    { id: '1Y', label: '1 Year', value: '1Y' },
    { id: 'YTD', label: 'Year to Date', value: 'YTD' },
    { id: 'ALL', label: 'All Time', value: 'ALL' },
  ];

  return (
    <div className="flex flex-wrap gap-2 md:gap-1.5 sm:gap-1">
      {periods.map((period) => (
        <button
          key={period.id}
          onClick={() => onPeriodChange(period.value)}
          className={`px-4 md:px-3 sm:px-2 py-2 md:py-1.5 sm:py-1 rounded-md text-sm md:text-xs font-medium transition-smooth whitespace-nowrap ${
            selectedPeriod === period.value
              ? 'bg-primary text-white' :'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};

export default TimePeriodFilter;