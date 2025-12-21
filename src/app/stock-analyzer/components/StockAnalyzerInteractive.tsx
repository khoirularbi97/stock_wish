'use client';

import { useState, useEffect } from 'react';
import CriteriaSelectionStep from './CriteriaSelectionStep';
import WeightAssignmentStep from './WeightAssignmentStep';
import StockDataInputStep from './StockDataInputStep';
import CalculationProcessStep from './CalculationProcessStep';
import Icon from '@/components/ui/AppIcon';
import { useRouter } from 'next/navigation';

interface Criterion {
  id: string;
  name: string;
  description: string;
  category: string;
  selected: boolean;
}

interface CriterionWeight extends Criterion {
  weight: number;
  ahpScore: number;
}

interface StockData {
  id: string;
  ticker: string;
  name: string;
  logo: string;
  sector: string;
  values: { [criterionId: string]: number };
}

interface CalculationResult {
  stockId: string;
  ticker: string;
  name: string;
  logo: string;
  sector: string;
  sawScore: number;
  weightedScores: { [criterionId: string]: number };
  rank: number;
}

const StockAnalyzerInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCriteria, setSelectedCriteria] = useState<Criterion[]>([]);
  const [weightedCriteria, setWeightedCriteria] = useState<CriterionWeight[]>([]);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [results, setResults] = useState<CalculationResult[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 md:pt-20 sm:pt-16 px-8 md:px-6 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="w-full min-w-0 p-8 md:p-6 sm:p-4 bg-card rounded-xl border border-border">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleCriteriaNext = (criteria: Criterion[]) => {
    setSelectedCriteria(criteria);
    setCurrentStep(2);
  };

  const handleWeightNext = (weighted: CriterionWeight[]) => {
    setWeightedCriteria(weighted);
    setCurrentStep(3);
  };

  const handleStockDataNext = (stocks: StockData[]) => {
    setStockData(stocks);
    setCurrentStep(4);
  };

  const handleCalculationComplete = (calculationResults: CalculationResult[]) => {
    setResults(calculationResults);
    // Store results in sessionStorage for results page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('analysisResults', JSON.stringify(calculationResults));
      sessionStorage.setItem('analysisCriteria', JSON.stringify(weightedCriteria));
    }
    router.push('/results-visualization');
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const steps = [
    { number: 1, name: 'Select Criteria', icon: 'ListBulletIcon' },
    { number: 2, name: 'Assign Weights', icon: 'ScaleIcon' },
    { number: 3, name: 'Input Data', icon: 'DocumentTextIcon' },
    { number: 4, name: 'Calculate', icon: 'CalculatorIcon' },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-20 sm:pt-16 px-8 md:px-6 sm:px-4 pb-16 md:pb-12 sm:pb-8">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-6 sm:space-y-4">
        {/* Progress Stepper */}
        <div className="w-full min-w-0 p-6 md:p-5 sm:p-4 bg-card rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <button
                  onClick={() => handleStepClick(step.number)}
                  disabled={step.number > currentStep}
                  className={`flex items-center gap-3 md:gap-2 sm:gap-2 ${
                    step.number > currentStep ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                  }`}
                >
                  <div
                    className={`w-12 h-12 md:w-10 md:h-10 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-xs sm:text-xs flex-shrink-0 transition-smooth ${
                      currentStep === step.number
                        ? 'bg-brand-primary text-white shadow-lg'
                        : currentStep > step.number
                        ? 'bg-success text-white' :'bg-muted text-text-secondary'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Icon name="CheckIcon" size={20} />
                    ) : (
                      <Icon name={step.icon as any} size={20} />
                    )}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs text-text-secondary">Step {step.number}</p>
                    <p
                      className={`text-sm font-semibold ${
                        currentStep === step.number ? 'text-brand-primary' : 'text-text-primary'
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 md:mx-3 sm:mx-2 rounded transition-smooth ${
                      currentStep > step.number ? 'bg-success' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="w-full min-w-0 p-8 md:p-6 sm:p-4 bg-card rounded-xl border border-border shadow-sm">
          {currentStep === 1 && <CriteriaSelectionStep onNext={handleCriteriaNext} />}

          {currentStep === 2 && (
            <WeightAssignmentStep
              criteria={selectedCriteria}
              onNext={handleWeightNext}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <StockDataInputStep
              criteria={weightedCriteria}
              onNext={handleStockDataNext}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <CalculationProcessStep
              criteria={weightedCriteria}
              stocks={stockData}
              onComplete={handleCalculationComplete}
              onBack={() => setCurrentStep(3)}
            />
          )}
        </div>

        {/* Help Section */}
        <div className="w-full min-w-0 p-6 md:p-5 sm:p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-xl">
          <div className="flex items-start gap-4 md:gap-3 sm:gap-3">
            <div className="w-10 h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="InformationCircleIcon" size={20} className="text-brand-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-sm sm:text-sm font-semibold text-text-primary mb-2">
                About AHP-SAW Methodology
              </h3>
              <p className="text-sm md:text-xs sm:text-xs text-text-secondary leading-relaxed">
                This analyzer combines Analytic Hierarchy Process (AHP) for criteria weighting with Simple Additive Weighting (SAW) for stock evaluation. The hybrid approach ensures systematic, transparent decision-making backed by academic research. Each step is designed to guide you through the complete analysis process with full visibility into calculations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAnalyzerInteractive;