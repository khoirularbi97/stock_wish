'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Criterion {
  id: string;
  name: string;
  weight: number;
  category: string;
  isActive: boolean;
}

interface CustomCriteriaProps {
  criteria: Criterion[];
}

const CustomCriteria = ({ criteria: initialCriteria }: CustomCriteriaProps) => {
  const [criteria, setCriteria] = useState(initialCriteria);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCriterion, setNewCriterion] = useState({ name: '', weight: 0, category: 'Financial' });

  const toggleCriterion = (id: string) => {
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const updateWeight = (id: string, weight: number) => {
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, weight } : c));
  };

  const addNewCriterion = () => {
    if (newCriterion.name && newCriterion.weight > 0) {
      const newCrit: Criterion = {
        id: `custom-${Date.now()}`,
        name: newCriterion.name,
        weight: newCriterion.weight,
        category: newCriterion.category,
        isActive: true
      };
      setCriteria(prev => [...prev, newCrit]);
      setNewCriterion({ name: '', weight: 0, category: 'Financial' });
      setIsAddingNew(false);
    }
  };

  const totalWeight = criteria.filter(c => c.isActive).reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-5 sm:p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-5 sm:mb-4">
        <div>
          <h2 className="text-xl md:text-lg sm:text-base font-bold text-text-primary mb-1">Custom Criteria Sets</h2>
          <p className="text-sm text-text-secondary">
            Total Weight: <span className={`font-semibold ${totalWeight === 100 ? 'text-success' : 'text-warning'}`}>{totalWeight}%</span>
          </p>
        </div>
        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:opacity-90 transition-smooth"
        >
          <Icon name={isAddingNew ? 'XMarkIcon' : 'PlusIcon'} size={18} />
          <span>{isAddingNew ? 'Cancel' : 'Add Criterion'}</span>
        </button>
      </div>

      {isAddingNew && (
        <div className="mb-6 md:mb-5 sm:mb-4 p-4 md:p-3 sm:p-2 bg-muted rounded-lg">
          <h3 className="text-sm font-semibold text-text-primary mb-3">New Criterion</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Criterion name"
              value={newCriterion.name}
              onChange={(e) => setNewCriterion(prev => ({ ...prev, name: e.target.value }))}
              className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              value={newCriterion.category}
              onChange={(e) => setNewCriterion(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-surface"
            >
              <option value="Financial">Financial</option>
              <option value="Technical">Technical</option>
              <option value="Market">Market</option>
              <option value="Risk">Risk</option>
            </select>
            <input
              type="number"
              placeholder="Weight %"
              min="0"
              max="100"
              value={newCriterion.weight || ''}
              onChange={(e) => setNewCriterion(prev => ({ ...prev, weight: Number(e.target.value) }))}
              className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={addNewCriterion}
              className="px-4 py-2 bg-success text-white text-sm font-medium rounded-md hover:opacity-90 transition-smooth"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3 md:space-y-2">
        {criteria.map((criterion) => (
          <div key={criterion.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 md:p-3 sm:p-2 border border-border rounded-lg">
            <button
              onClick={() => toggleCriterion(criterion.id)}
              className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${
                criterion.isActive ? 'bg-primary border-primary' : 'border-border'
              }`}
            >
              {criterion.isActive && <Icon name="CheckIcon" size={14} className="text-white" />}
            </button>
            
            <div className="flex-1 min-w-0 w-full sm:w-auto">
              <h3 className="text-sm md:text-xs font-semibold text-text-primary truncate">{criterion.name}</h3>
              <p className="text-xs text-text-secondary">{criterion.category}</p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none sm:w-32">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={criterion.weight}
                  onChange={(e) => updateWeight(criterion.id, Number(e.target.value))}
                  disabled={!criterion.isActive}
                  className="w-full"
                />
              </div>
              <span className="text-sm font-semibold text-text-primary whitespace-nowrap w-12 text-right">
                {criterion.weight}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {totalWeight !== 100 && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg flex items-start gap-2">
          <Icon name="ExclamationTriangleIcon" size={18} className="text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-warning">
            Total weight must equal 100% for accurate analysis. Current total: {totalWeight}%
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomCriteria;