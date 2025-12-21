export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stock {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  logoUrl?: string;
  description?: string;
  marketCap?: number;
  lastUpdated: string;
  createdAt: string;
}

export type CriterionCategory = 'financial' | 'valuation' | 'growth' | 'risk' | 'quality';

export interface Criterion {
  id: string;
  name: string;
  description?: string;
  category: CriterionCategory;
  isBenefit: boolean;
  unit?: string;
  minValue?: number;
  maxValue?: number;
  isSystem: boolean;
  createdAt: string;
}

export interface UserCriteriaTemplate {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateCriterion {
  id: string;
  templateId: string;
  criterionId: string;
  weight: number;
  ahpScore?: number;
  createdAt: string;
  criterion?: Criterion;
}

export type AnalysisStatus = 'draft' | 'completed' | 'archived';

export interface Analysis {
  id: string;
  userId: string;
  templateId?: string;
  name: string;
  description?: string;
  status: AnalysisStatus;
  calculationDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalysisStock {
  id: string;
  analysisId: string;
  stockId: string;
  createdAt: string;
  stock?: Stock;
}

export interface StockDataValue {
  id: string;
  analysisId: string;
  stockId: string;
  criterionId: string;
  rawValue: number;
  normalizedValue?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AnalysisResult {
  id: string;
  analysisId: string;
  stockId: string;
  sawScore: number;
  rank: number;
  createdAt: string;
  stock?: Stock;
}

export interface Portfolio {
  id: string;
  userId: string;
  stockId: string;
  shares: number;
  averagePrice?: number;
  currentValue?: number;
  lastUpdated: string;
  createdAt: string;
  stock?: Stock;
}

export type PortfolioTransactionType = 'buy' | 'sell';

export interface PortfolioTransaction {
  id: string;
  portfolioId: string;
  transactionType: PortfolioTransactionType;
  shares: number;
  price: number;
  transactionDate: string;
  notes?: string;
  createdAt: string;
}

export interface MarketAlert {
  id: string;
  userId: string;
  stockId: string;
  alertType: string;
  triggerValue?: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  stock?: Stock;
}