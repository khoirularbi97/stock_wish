import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import WorkspaceInteractive from './components/WorkspaceInteractive';

export const metadata: Metadata = {
  title: 'User Workspace - StockWise Analytics',
  description: 'Manage your saved analyses, custom criteria sets, and portfolio tracking in your personalized workspace dashboard.'
};

export default function UserWorkspacePage() {
  const stats = [
  {
    icon: 'DocumentTextIcon',
    label: 'Saved Analyses',
    value: '24',
    change: '+3 this week',
    trend: 'up' as const
  },
  {
    icon: 'AdjustmentsHorizontalIcon',
    label: 'Custom Criteria',
    value: '8',
    change: '+2 new',
    trend: 'up' as const
  },
  {
    icon: 'ChartBarIcon',
    label: 'Tracked Stocks',
    value: '12',
    change: 'No change',
    trend: 'up' as const
  },
  {
    icon: 'BellAlertIcon',
    label: 'Active Alerts',
    value: '5',
    change: '-1 resolved',
    trend: 'down' as const
  }];


  const analyses = [
  {
    id: '1',
    stockSymbol: 'ANTM',
    stockName: 'Aneka Tambang (Persero) Tbk',
    date: '2025-12-18',
    score: 0.8542,
    rank: 1,
    criteria: ['ROE', 'NPM', 'DER', 'CR', 'PBV'],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fff21d89-1765280176499.png",
    alt: 'Mining equipment and gold ore processing facility with industrial machinery'
  },
  {
    id: '2',
    stockSymbol: 'BBCA',
    stockName: 'Bank Central Asia Tbk',
    date: '2025-12-17',
    score: 0.7891,
    rank: 2,
    criteria: ['ROE', 'NPM', 'DER', 'CR'],
    image: "https://images.unsplash.com/photo-1652445953283-2e587d42e8d9",
    alt: 'Modern bank building exterior with glass facade and BCA logo signage'
  },
  {
    id: '3',
    stockSymbol: 'TLKM',
    stockName: 'Telkom Indonesia (Persero) Tbk',
    date: '2025-12-16',
    score: 0.7234,
    rank: 3,
    criteria: ['ROE', 'NPM', 'DER', 'PBV', 'PER'],
    image: "https://images.unsplash.com/photo-1584572705555-29f1a07d4dad",
    alt: 'Telecommunications tower with satellite dishes against blue sky'
  },
  {
    id: '4',
    stockSymbol: 'ASII',
    stockName: 'Astra International Tbk',
    date: '2025-12-15',
    score: 0.6987,
    rank: 4,
    criteria: ['ROE', 'NPM', 'CR', 'PBV'],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e4f4f608-1765112151140.png",
    alt: 'Automotive manufacturing assembly line with robotic arms and vehicles'
  },
  {
    id: '5',
    stockSymbol: 'UNVR',
    stockName: 'Unilever Indonesia Tbk',
    date: '2025-12-14',
    score: 0.6543,
    rank: 5,
    criteria: ['ROE', 'NPM', 'DER'],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16fec54bd-1765372840415.png",
    alt: 'Consumer goods products on retail shelves with Unilever branding'
  }];


  const criteria = [
  { id: '1', name: 'Return on Equity (ROE)', weight: 25, category: 'Financial', isActive: true },
  { id: '2', name: 'Net Profit Margin (NPM)', weight: 20, category: 'Financial', isActive: true },
  { id: '3', name: 'Debt to Equity Ratio (DER)', weight: 15, category: 'Risk', isActive: true },
  { id: '4', name: 'Current Ratio (CR)', weight: 15, category: 'Financial', isActive: true },
  { id: '5', name: 'Price to Book Value (PBV)', weight: 12, category: 'Market', isActive: true },
  { id: '6', name: 'Price Earnings Ratio (PER)', weight: 13, category: 'Market', isActive: true },
  { id: '7', name: 'Earnings Per Share (EPS)', weight: 0, category: 'Financial', isActive: false },
  { id: '8', name: 'Dividend Yield', weight: 0, category: 'Financial', isActive: false }];


  const stocks = [
  {
    id: '1',
    symbol: 'ANTM',
    name: 'Aneka Tambang (Persero) Tbk',
    shares: 1000,
    avgPrice: 1250.00,
    currentPrice: 1380.00,
    change: 130.00,
    changePercent: 10.40,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fff21d89-1765280176499.png",
    alt: 'Mining equipment and gold ore processing facility with industrial machinery'
  },
  {
    id: '2',
    symbol: 'BBCA',
    name: 'Bank Central Asia Tbk',
    shares: 500,
    avgPrice: 8750.00,
    currentPrice: 9200.00,
    change: 450.00,
    changePercent: 5.14,
    image: "https://images.unsplash.com/photo-1652445953283-2e587d42e8d9",
    alt: 'Modern bank building exterior with glass facade and BCA logo signage'
  },
  {
    id: '3',
    symbol: 'TLKM',
    name: 'Telkom Indonesia (Persero) Tbk',
    shares: 2000,
    avgPrice: 3850.00,
    currentPrice: 3720.00,
    change: -130.00,
    changePercent: -3.38,
    image: "https://images.unsplash.com/photo-1584572705555-29f1a07d4dad",
    alt: 'Telecommunications tower with satellite dishes against blue sky'
  },
  {
    id: '4',
    symbol: 'ASII',
    name: 'Astra International Tbk',
    shares: 800,
    avgPrice: 5200.00,
    currentPrice: 5450.00,
    change: 250.00,
    changePercent: 4.81,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e4f4f608-1765112151140.png",
    alt: 'Automotive manufacturing assembly line with robotic arms and vehicles'
  },
  {
    id: '5',
    symbol: 'UNVR',
    name: 'Unilever Indonesia Tbk',
    shares: 300,
    avgPrice: 4100.00,
    currentPrice: 3950.00,
    change: -150.00,
    changePercent: -3.66,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16fec54bd-1765372840415.png",
    alt: 'Consumer goods products on retail shelves with Unilever branding'
  },
  {
    id: '6',
    symbol: 'BMRI',
    name: 'Bank Mandiri (Persero) Tbk',
    shares: 1500,
    avgPrice: 6300.00,
    currentPrice: 6580.00,
    change: 280.00,
    changePercent: 4.44,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_112cd5ca1-1764643934378.png",
    alt: 'Bank Mandiri branch office with modern architecture and corporate branding'
  }];


  const activities = [
  {
    id: '1',
    type: 'analysis' as const,
    title: 'New Analysis Completed',
    description: 'ANTM stock analysis with 5 criteria completed successfully',
    timestamp: '2 hours ago',
    icon: 'DocumentTextIcon'
  },
  {
    id: '2',
    type: 'export' as const,
    title: 'Report Exported',
    description: 'BBCA comparative analysis exported to PDF',
    timestamp: '5 hours ago',
    icon: 'ArrowDownTrayIcon'
  },
  {
    id: '3',
    type: 'criteria' as const,
    title: 'Criteria Set Updated',
    description: 'Modified weights for Financial Stability criteria set',
    timestamp: '1 day ago',
    icon: 'AdjustmentsHorizontalIcon'
  },
  {
    id: '4',
    type: 'alert' as const,
    title: 'Price Alert Triggered',
    description: 'TLKM reached target price of Rp 3,800',
    timestamp: '1 day ago',
    icon: 'BellAlertIcon'
  },
  {
    id: '5',
    type: 'analysis' as const,
    title: 'Comparison Analysis',
    description: 'ANTM vs BBCA vs TLKM comparison completed',
    timestamp: '2 days ago',
    icon: 'TableCellsIcon'
  }];


  const actions = [
  {
    label: 'New Analysis',
    description: 'Start a fresh stock analysis with AHP-SAW methodology',
    icon: 'PlusCircleIcon',
    href: '/stock-analyzer',
    color: 'bg-primary/10 text-primary'
  },
  {
    label: 'Compare Stocks',
    description: 'Run side-by-side comparison of multiple stocks',
    icon: 'ArrowsRightLeftIcon',
    href: '/comparison-matrix',
    color: 'bg-accent/10 text-accent'
  },
  {
    label: 'View Dashboard',
    description: 'Access your analytics dashboard with real-time data',
    icon: 'ChartBarIcon',
    href: '/interactive-dashboard',
    color: 'bg-success/10 text-success'
  },
  {
    label: 'Results History',
    description: 'Review past analysis results and visualizations',
    icon: 'ClockIcon',
    href: '/results-visualization',
    color: 'bg-warning/10 text-warning'
  }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 md:pt-20 md:pb-12 sm:pt-20 sm:pb-8">
        <div className="max-w-full mx-auto px-8 md:px-6 sm:px-4">
          <div className="mb-8 md:mb-6 sm:mb-4">
            <h1 className="text-3xl md:text-2xl sm:text-xl font-bold text-text-primary mb-2">User Workspace</h1>
            <p className="text-base md:text-sm sm:text-xs text-text-secondary">
              Manage your analyses, criteria sets, and portfolio tracking in one centralized dashboard
            </p>
          </div>

          <WorkspaceInteractive
            stats={stats}
            analyses={analyses}
            criteria={criteria}
            stocks={stocks}
            activities={activities}
            actions={actions} />

        </div>
      </main>
    </div>);

}