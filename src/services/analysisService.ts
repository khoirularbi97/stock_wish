import { supabase } from '../lib/supabase/client';
import { AnalysisResult, InsertAnalysisResult, AnalysisResultWithStock } from '../types/supabase.types';

interface AnalysisResponse {
  data: AnalysisResult[] | null;
  error: Error | null;
}

interface AnalysisWithStockResponse {
  data: AnalysisResultWithStock[] | null;
  error: Error | null;
}

interface SingleAnalysisResponse {
  data: AnalysisResult | null;
  error: Error | null;
}

export const analysisService = {
  // Get all analysis results with stock details
  async getAllWithStocks(): Promise<AnalysisWithStockResponse> {
    const { data, error } = await supabase
      .from('analysis_results')
      .select(`
        *,
        stocks(*)
      `)
      .order('ranking', { ascending: true });
    return { data, error };
  },

  // Get analysis by method
  async getByMethod(method: 'ahp' | 'saw' | 'hybrid_ahp_saw'): Promise<AnalysisWithStockResponse> {
    const { data, error } = await supabase
      .from('analysis_results')
      .select(`
        *,
        stocks(*)
      `)
      .eq('method', method)
      .order('ranking', { ascending: true });
    return { data, error };
  },

  // Get analysis for specific stock
  async getByStockId(stockId: string): Promise<AnalysisResponse> {
    const { data, error } = await supabase
      .from('analysis_results')
      .select('*')
      .eq('stock_id', stockId)
      .order('analysis_date', { ascending: false });
    return { data, error };
  },

  // Create analysis result
  async create(analysis: InsertAnalysisResult): Promise<SingleAnalysisResponse> {
    const { data, error } = await supabase
      .from('analysis_results')
      .insert(analysis)
      .select()
      .single();
    return { data, error };
  },

  // Get top ranked stocks
  async getTopRanked(limit: number = 10): Promise<AnalysisWithStockResponse> {
    const { data, error } = await supabase
      .from('analysis_results')
      .select(`
        *,
        stocks(*)
      `)
      .order('ranking', { ascending: true })
      .limit(limit);
    return { data, error };
  },

  // Delete analysis result
  async delete(id: string): Promise<{ error: Error | null }> {
    const { error } = await supabase
      .from('analysis_results')
      .delete()
      .eq('id', id);
    return { error };
  },
};