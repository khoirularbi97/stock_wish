import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import StockAnalyzerInteractive from './components/StockAnalyzerInteractive';

export const metadata: Metadata = {
  title: 'Stock Analyzer - StockWise Analytics',
  description: 'Core calculation engine with step-by-step AHP-SAW processing visualization for systematic stock analysis and investment decision-making.',
};

export default function StockAnalyzerPage() {
  return (
    <>
      <Header />
      <StockAnalyzerInteractive />
    </>
  );
}