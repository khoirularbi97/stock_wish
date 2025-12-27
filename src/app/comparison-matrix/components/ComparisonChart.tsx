'use client';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stock {
  id: string;
  symbol: string;
  name: string;
}

interface StockComparison {
  stock: Stock;
  totalScore: number;
  rank: number;
}

interface ComparisonChartProps {
  comparisons: StockComparison[];
}

export default function ComparisonChart({ comparisons }: ComparisonChartProps) {
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');

  const barChartData = comparisons
    .sort((a, b) => a.rank - b.rank)
    .map(c => ({
      name: c.stock.symbol,
      score: c.totalScore,
      rank: c.rank
    }));

  const radarChartData = comparisons.map(c => ({
    stock: c.stock.symbol,
    score: c.totalScore
  }));

  const getBarColor = (rank: number) => {
    if (rank === 1) return '#38A169';
    if (rank === 2) return '#3182CE';
    if (rank === 3) return '#D69E2E';
    return '#718096';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Visualisasi Kinerja</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
              chartType === 'bar' ?'bg-brand-primary text-white' :'bg-muted text-text-secondary hover:bg-muted/80'
            }`}
          >
            <Icon name="ChartBarIcon" size={18} />
            <span className="hidden sm:inline">Diagram Batang</span>
          </button>
          <button
            onClick={() => setChartType('radar')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
              chartType === 'radar' ?'bg-brand-primary text-white' :'bg-muted text-text-secondary hover:bg-muted/80'
            }`}
          >
            <Icon name="ChartPieIcon" size={18} />
            <span className="hidden sm:inline">Diagram Radar</span>
          </button>
        </div>
      </div>

      <div className="w-full h-96 bg-surface border border-border rounded-lg p-6">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="name" 
                stroke="#718096"
                style={{ fontSize: '14px', fontWeight: 500 }}
              />
              <YAxis 
                stroke="#718096"
                style={{ fontSize: '14px' }}
                label={{ value: 'Skor Total', angle: -90, position: 'insideLeft', style: { fill: '#718096' } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '12px'
                }}
                labelStyle={{ fontWeight: 600, color: '#2D3748' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar 
                dataKey="score" 
                name="Skor Total"
                radius={[8, 8, 0, 0]}
              >
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.rank)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarChartData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis 
                dataKey="stock" 
                stroke="#718096"
                style={{ fontSize: '14px', fontWeight: 500 }}
              />
              <PolarRadiusAxis 
                stroke="#718096"
                style={{ fontSize: '12px' }}
              />
              <Radar
                name="Skor Total"
                dataKey="score"
                stroke="#2E8B57"
                fill="#2E8B57"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}