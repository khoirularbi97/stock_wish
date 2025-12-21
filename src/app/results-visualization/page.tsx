import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ResultsVisualizationInteractive from './components/ResultsVisualizationInteractive';

export const metadata: Metadata = {
  title: 'Results Visualization - StockWise Analytics',
  description: 'Interactive visualization of AHP-SAW stock analysis results with dynamic charts, ranking displays, and comprehensive data exploration tools for informed investment decisions.',
};

export default function ResultsVisualizationPage() {
  return (
    <>
      <Header />
      <ResultsVisualizationInteractive />
    </>
  );
}