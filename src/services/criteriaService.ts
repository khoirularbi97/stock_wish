import { supabase } from '../lib/supabase/client';
import { Criteria, InsertCriteria, UpdateCriteria, StockCriteriaValue, InsertStockCriteriaValue } from '../types/supabase.types';

interface CriteriaResponse {
  data: Criteria[] | null;
  error: Error | null;
}

interface SingleCriteriaResponse {
  data: Criteria | null;
  error: Error | null;
}

interface StockCriteriaValueResponse {
  data: StockCriteriaValue[] | null;
  error: Error | null;
}

export const criteriaService = {
  // Get all criteria
  async getAll(): Promise<CriteriaResponse> {
    const { data, error } = await supabase
      .from('criteria')
      .select('*')
      .order('criteria_code', { ascending: true });
    return { data, error };
  },

  // Get single criteria by ID
  async getById(id: string): Promise<SingleCriteriaResponse> {
    const { data, error } = await supabase
      .from('criteria')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  // Get criteria by code
  async getByCode(code: string): Promise<SingleCriteriaResponse> {
    const { data, error } = await supabase
      .from('criteria')
      .select('*')
      .eq('criteria_code', code)
      .single();
    return { data, error };
  },

  // Create criteria
  async create(criteria: InsertCriteria): Promise<SingleCriteriaResponse> {
    const { data, error } = await supabase
      .from('criteria')
      .insert(criteria)
      .select()
      .single();
    return { data, error };
  },

  // Update criteria
  async update(id: string, updates: UpdateCriteria): Promise<SingleCriteriaResponse> {
    const { data, error } = await supabase
      .from('criteria')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Delete criteria
  async delete(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase
      .from('criteria')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Get stock criteria values for a specific stock
  async getStockValues(stockId: string): Promise<StockCriteriaValueResponse> {
    const { data, error } = await supabase
      .from('stock_criteria_values')
      .select(`
        *,
        criteria(*)
      `)
      .eq('stock_id', stockId);
    return { data, error };
  },

  // Create stock criteria value
  async createStockValue(value: InsertStockCriteriaValue): Promise<{ data: StockCriteriaValue | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('stock_criteria_values')
      .insert(value)
      .select()
      .single();
    return { data, error };
  },

  // Update stock criteria value
  async updateStockValue(id: string, value: number, normalizedValue?: number): Promise<{ data: StockCriteriaValue | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('stock_criteria_values')
      .update({ 
        value, 
        ...(normalizedValue !== undefined && { normalized_value: normalizedValue })
      })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },
};