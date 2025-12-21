import { supabase } from '../lib/supabase/client';
import { Stock, InsertStock, UpdateStock, StockWithAnalysis } from '../types/supabase.types';

interface StockResponse {
  data: Stock[] | null;
  error: Error | null;
}

interface SingleStockResponse {
  data: Stock | null;
  error: Error | null;
}

interface StockWithAnalysisResponse {
  data: StockWithAnalysis[] | null;
  error: Error | null;
}

export const stockService = {
  // Get all stocks
  async getAll(): Promise<StockResponse> {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('stock_code', { ascending: true });
    return { data, error };
  },

  // Get stocks with analysis results
  async getAllWithAnalysis(): Promise<StockWithAnalysisResponse> {
    const { data, error } = await supabase
      .from('stocks')
      .select(`
        *,
        analysis_results(*)
      `)
      .order('stock_code', { ascending: true });
    return { data, error };
  },

  // Get single stock by ID
  async getById(id: string): Promise<SingleStockResponse> {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  // Get stock by code
  async getByCode(stockCode: string): Promise<SingleStockResponse> {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .eq('stock_code', stockCode)
      .single();
    return { data, error };
  },

  // Create stock
  async create(stock: InsertStock): Promise<SingleStockResponse> {
    const { data, error } = await supabase
      .from('stocks')
      .insert(stock)
      .select()
      .single();
    return { data, error };
  },

  // Update stock
  async update(id: string, updates: UpdateStock): Promise<SingleStockResponse> {
    const { data, error } = await supabase
      .from('stocks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Delete stock
  async delete(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase
      .from('stocks')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Get stocks by sector
  async getBySector(sector: string): Promise<StockResponse> {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .eq('sector', sector)
      .order('stock_code', { ascending: true });
    return { data, error };
  },
};