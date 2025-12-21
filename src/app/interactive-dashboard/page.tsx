import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'Interactive Dashboard - StockWise Analytics',
  description: 'Real-time analytics center with comprehensive portfolio tracking, market insights, and customizable widgets for data-driven investment decisions.',
};

export default function InteractiveDashboardPage() {
  return (
    <>
      <Header />
      <main>
        <DashboardInteractive />
      </main>
    </>
  );
}