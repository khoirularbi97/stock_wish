import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ComparisonMatrixInteractive from './components/ComparisonMatrixInteractive';

export const metadata: Metadata = {
  title: 'Comparison Matrix - StockWise Analytics',
  description: 'Multi-stock comparison with customizable criteria weighting using hybrid AHP-SAW methodology for systematic investment decision-making.',
};

export default function ComparisonMatrixPage() {
  return (
    <>
      <Header />
      <ComparisonMatrixInteractive />
    </>
  );
}