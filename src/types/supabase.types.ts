import { createBrowserClient } from '@supabase/ssr';
import { Database } from './database.types';

export type SupabaseClient = ReturnType<typeof createBrowserClient<Database>>;

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Specific table types for stock analysis system
export type Stock = Tables<'stocks'>;
export type Criteria = Tables<'criteria'>;
export type StockCriteriaValue = Tables<'stock_criteria_values'>;
export type AnalysisResult = Tables<'analysis_results'>;
export type SavedAnalysis = Tables<'saved_analyses'>;

export type InsertStock = InsertTables<'stocks'>;
export type InsertCriteria = InsertTables<'criteria'>;
export type InsertStockCriteriaValue = InsertTables<'stock_criteria_values'>;
export type InsertAnalysisResult = InsertTables<'analysis_results'>;
export type InsertSavedAnalysis = InsertTables<'saved_analyses'>;

export type UpdateStock = UpdateTables<'stocks'>;
export type UpdateCriteria = UpdateTables<'criteria'>;
export type UpdateStockCriteriaValue = UpdateTables<'stock_criteria_values'>;
export type UpdateAnalysisResult = UpdateTables<'analysis_results'>;
export type UpdateSavedAnalysis = UpdateTables<'saved_analyses'>;

// Extended types with relationships
export interface StockWithAnalysis extends Stock {
  analysis_results?: AnalysisResult[];
  stock_criteria_values?: StockCriteriaValue[];
}

export interface AnalysisResultWithStock extends AnalysisResult {
  stocks?: Stock;
}

export interface StockCriteriaValueWithDetails extends StockCriteriaValue {
  stocks?: Stock;
  criteria?: Criteria;
}