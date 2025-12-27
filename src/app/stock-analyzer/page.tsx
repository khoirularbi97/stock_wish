import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import StockAnalyzerInteractive from './components/StockAnalyzerInteractive';
import StockCreateForm from './components/StockCreateForm';

export const metadata: Metadata = {
  title: 'Stock Analyzer - StockWise Analytics',
  description: 'Core calculation engine with step-by-step AHP-SAW processing visualization for systematic stock analysis and investment decision-making.',
};

export default function StockAnalyzerPage() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-6 md:px-4 sm:px-3 space-y-6">
        <div className="w-full bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Tambah Saham Baru</h2>
          <StockCreateForm />
        </div>

        <StockAnalyzerInteractive />
      </div>
    </>
  );
}