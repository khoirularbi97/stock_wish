export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      stocks: {
        Row: {
          id: string;
          ticker: string;
          name: string;
          sector: string;
          logo_url: string | null;
          description: string | null;
          market_cap: number | null;
          last_updated: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          ticker: string;
          name: string;
          sector: string;
          logo_url?: string | null;
          description?: string | null;
          market_cap?: number | null;
          last_updated?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          ticker?: string;
          name?: string;
          sector?: string;
          logo_url?: string | null;
          description?: string | null;
          market_cap?: number | null;
          last_updated?: string;
          created_at?: string;
        };
      };
      criteria: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category: 'financial' | 'valuation' | 'growth' | 'risk' | 'quality';
          is_benefit: boolean;
          unit: string | null;
          min_value: number | null;
          max_value: number | null;
          is_system: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          category: 'financial' | 'valuation' | 'growth' | 'risk' | 'quality';
          is_benefit?: boolean;
          unit?: string | null;
          min_value?: number | null;
          max_value?: number | null;
          is_system?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          category?: 'financial' | 'valuation' | 'growth' | 'risk' | 'quality';
          is_benefit?: boolean;
          unit?: string | null;
          min_value?: number | null;
          max_value?: number | null;
          is_system?: boolean;
          created_at?: string;
        };
      };
      user_criteria_templates: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      template_criteria: {
        Row: {
          id: string;
          template_id: string;
          criterion_id: string;
          weight: number;
          ahp_score: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          template_id: string;
          criterion_id: string;
          weight: number;
          ahp_score?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          template_id?: string;
          criterion_id?: string;
          weight?: number;
          ahp_score?: number | null;
          created_at?: string;
        };
      };
      analyses: {
        Row: {
          id: string;
          user_id: string;
          template_id: string | null;
          name: string;
          description: string | null;
          status: 'draft' | 'completed' | 'archived';
          calculation_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          template_id?: string | null;
          name: string;
          description?: string | null;
          status?: 'draft' | 'completed' | 'archived';
          calculation_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          template_id?: string | null;
          name?: string;
          description?: string | null;
          status?: 'draft' | 'completed' | 'archived';
          calculation_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      analysis_stocks: {
        Row: {
          id: string;
          analysis_id: string;
          stock_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          analysis_id: string;
          stock_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          analysis_id?: string;
          stock_id?: string;
          created_at?: string;
        };
      };
      stock_data_values: {
        Row: {
          id: string;
          analysis_id: string;
          stock_id: string;
          criterion_id: string;
          raw_value: number;
          normalized_value: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          analysis_id: string;
          stock_id: string;
          criterion_id: string;
          raw_value: number;
          normalized_value?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          analysis_id?: string;
          stock_id?: string;
          criterion_id?: string;
          raw_value?: number;
          normalized_value?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      analysis_results: {
        Row: {
          id: string;
          analysis_id: string;
          stock_id: string;
          saw_score: number;
          rank: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          analysis_id: string;
          stock_id: string;
          saw_score: number;
          rank: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          analysis_id?: string;
          stock_id?: string;
          saw_score?: number;
          rank?: number;
          created_at?: string;
        };
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
          stock_id: string;
          shares: number;
          average_price: number | null;
          current_value: number | null;
          last_updated: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stock_id: string;
          shares: number;
          average_price?: number | null;
          current_value?: number | null;
          last_updated?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stock_id?: string;
          shares?: number;
          average_price?: number | null;
          current_value?: number | null;
          last_updated?: string;
          created_at?: string;
        };
      };
      portfolio_transactions: {
        Row: {
          id: string;
          portfolio_id: string;
          transaction_type: 'buy' | 'sell';
          shares: number;
          price: number;
          transaction_date: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          portfolio_id: string;
          transaction_type: 'buy' | 'sell';
          shares: number;
          price: number;
          transaction_date?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          portfolio_id?: string;
          transaction_type?: 'buy' | 'sell';
          shares?: number;
          price?: number;
          transaction_date?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      market_alerts: {
        Row: {
          id: string;
          user_id: string;
          stock_id: string;
          alert_type: string;
          trigger_value: number | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stock_id: string;
          alert_type: string;
          trigger_value?: number | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stock_id?: string;
          alert_type?: string;
          trigger_value?: number | null;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
  };
}