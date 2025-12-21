-- Location: supabase/migrations/20251220234943_stock_analysis_system.sql
-- Schema Analysis: Fresh project - no existing tables
-- Integration Type: New complete schema
-- Dependencies: None - fresh start

-- 1. Types for stock analysis
CREATE TYPE public.stock_sector AS ENUM ('financial', 'mining', 'telecommunications', 'energy', 'consumer_goods', 'technology', 'healthcare', 'industrials', 'other');
CREATE TYPE public.analysis_method AS ENUM ('ahp', 'saw', 'hybrid_ahp_saw');

-- 2. Core tables - stocks and criteria
CREATE TABLE public.stocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stock_code TEXT NOT NULL UNIQUE,
    company_name TEXT NOT NULL,
    sector public.stock_sector DEFAULT 'other'::public.stock_sector,
    current_price DECIMAL(10,2) NOT NULL,
    market_cap BIGINT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.criteria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    criteria_name TEXT NOT NULL,
    criteria_code TEXT NOT NULL UNIQUE,
    description TEXT,
    weight DECIMAL(5,4) NOT NULL CHECK (weight >= 0 AND weight <= 1),
    is_benefit BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Stock data with criteria values
CREATE TABLE public.stock_criteria_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stock_id UUID REFERENCES public.stocks(id) ON DELETE CASCADE,
    criteria_id UUID REFERENCES public.criteria(id) ON DELETE CASCADE,
    value DECIMAL(12,4) NOT NULL,
    normalized_value DECIMAL(8,6),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(stock_id, criteria_id)
);

-- 4. Analysis results
CREATE TABLE public.analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stock_id UUID REFERENCES public.stocks(id) ON DELETE CASCADE,
    method public.analysis_method NOT NULL,
    ahp_score DECIMAL(8,6),
    saw_score DECIMAL(8,6),
    final_score DECIMAL(8,6) NOT NULL,
    ranking INTEGER,
    analysis_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. User workspace saves (optional - for future auth integration)
CREATE TABLE public.saved_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_name TEXT NOT NULL,
    description TEXT,
    stocks_included UUID[] NOT NULL,
    criteria_used UUID[] NOT NULL,
    method public.analysis_method NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Essential Indexes
CREATE INDEX idx_stocks_code ON public.stocks(stock_code);
CREATE INDEX idx_stocks_sector ON public.stocks(sector);
CREATE INDEX idx_criteria_code ON public.criteria(criteria_code);
CREATE INDEX idx_stock_criteria_values_stock ON public.stock_criteria_values(stock_id);
CREATE INDEX idx_stock_criteria_values_criteria ON public.stock_criteria_values(criteria_id);
CREATE INDEX idx_analysis_results_stock ON public.analysis_results(stock_id);
CREATE INDEX idx_analysis_results_ranking ON public.analysis_results(ranking);

-- 7. RLS Setup (Preview mode - public access)
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_criteria_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_analyses ENABLE ROW LEVEL SECURITY;

-- Open access for preview mode
CREATE POLICY "preview_public_access_stocks" ON public.stocks FOR ALL TO public USING (true);
CREATE POLICY "preview_public_access_criteria" ON public.criteria FOR ALL TO public USING (true);
CREATE POLICY "preview_public_access_stock_criteria_values" ON public.stock_criteria_values FOR ALL TO public USING (true);
CREATE POLICY "preview_public_access_analysis_results" ON public.analysis_results FOR ALL TO public USING (true);
CREATE POLICY "preview_public_access_saved_analyses" ON public.saved_analyses FOR ALL TO public USING (true);

-- 8. Helper functions for calculations
CREATE OR REPLACE FUNCTION public.calculate_normalized_value(
    value DECIMAL,
    min_value DECIMAL,
    max_value DECIMAL,
    is_benefit BOOLEAN
)
RETURNS DECIMAL
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
    IF max_value = min_value THEN
        RETURN 0.5;
    END IF;
    
    IF is_benefit THEN
        RETURN (value - min_value) / (max_value - min_value);
    ELSE
        RETURN (max_value - value) / (max_value - min_value);
    END IF;
END;
$$;

-- 9. Trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_stocks_updated_at
    BEFORE UPDATE ON public.stocks
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Sample data for stock analysis system
DO $$
DECLARE
    antm_id UUID := gen_random_uuid();
    bbca_id UUID := gen_random_uuid();
    tlkm_id UUID := gen_random_uuid();
    
    roe_id UUID := gen_random_uuid();
    der_id UUID := gen_random_uuid();
    per_id UUID := gen_random_uuid();
    pbv_id UUID := gen_random_uuid();
    current_ratio_id UUID := gen_random_uuid();
BEGIN
    -- Insert stocks
    INSERT INTO public.stocks (id, stock_code, company_name, sector, current_price, market_cap) VALUES
        (antm_id, 'ANTM', 'PT Aneka Tambang Tbk', 'mining'::public.stock_sector, 1250.00, 82500000000000),
        (bbca_id, 'BBCA', 'PT Bank Central Asia Tbk', 'financial'::public.stock_sector, 8775.00, 1080000000000000),
        (tlkm_id, 'TLKM', 'PT Telkom Indonesia Tbk', 'telecommunications'::public.stock_sector, 3510.00, 345000000000000);

    -- Insert criteria (weights for hybrid AHP-SAW method)
    INSERT INTO public.criteria (id, criteria_name, criteria_code, description, weight, is_benefit) VALUES
        (roe_id, 'Return on Equity', 'ROE', 'Net income divided by shareholders equity', 0.25, true),
        (der_id, 'Debt to Equity Ratio', 'DER', 'Total liabilities divided by shareholders equity', 0.20, false),
        (per_id, 'Price to Earnings Ratio', 'PER', 'Stock price divided by earnings per share', 0.20, false),
        (pbv_id, 'Price to Book Value', 'PBV', 'Stock price divided by book value per share', 0.15, false),
        (current_ratio_id, 'Current Ratio', 'CR', 'Current assets divided by current liabilities', 0.20, true);

    -- Insert stock criteria values (realistic Indonesian stock market data)
    -- ANTM values
    INSERT INTO public.stock_criteria_values (stock_id, criteria_id, value, normalized_value) VALUES
        (antm_id, roe_id, 15.30, 0.85),
        (antm_id, der_id, 0.45, 0.92),
        (antm_id, per_id, 12.50, 0.75),
        (antm_id, pbv_id, 1.80, 0.70),
        (antm_id, current_ratio_id, 2.10, 0.88);
    
    -- BBCA values
    INSERT INTO public.stock_criteria_values (stock_id, criteria_id, value, normalized_value) VALUES
        (bbca_id, roe_id, 18.75, 1.00),
        (bbca_id, der_id, 6.80, 0.15),
        (bbca_id, per_id, 25.30, 0.40),
        (bbca_id, pbv_id, 4.20, 0.30),
        (bbca_id, current_ratio_id, 1.15, 0.45);
    
    -- TLKM values
    INSERT INTO public.stock_criteria_values (stock_id, criteria_id, value, normalized_value) VALUES
        (tlkm_id, roe_id, 17.20, 0.92),
        (tlkm_id, der_id, 0.85, 0.80),
        (tlkm_id, per_id, 14.80, 0.68),
        (tlkm_id, pbv_id, 2.50, 0.60),
        (tlkm_id, current_ratio_id, 1.95, 0.82);

    -- Insert analysis results (hybrid AHP-SAW method)
    INSERT INTO public.analysis_results (stock_id, method, ahp_score, saw_score, final_score, ranking) VALUES
        (bbca_id, 'hybrid_ahp_saw'::public.analysis_method, 0.875, 0.820, 0.848, 1),
        (tlkm_id, 'hybrid_ahp_saw'::public.analysis_method, 0.845, 0.798, 0.822, 2),
        (antm_id, 'hybrid_ahp_saw'::public.analysis_method, 0.802, 0.785, 0.794, 3);

    -- Insert sample saved analysis
    INSERT INTO public.saved_analyses (analysis_name, description, stocks_included, criteria_used, method) VALUES
        ('Indonesian Blue Chip Analysis', 'Comparison of top 3 Indonesian blue chip stocks using hybrid AHP-SAW method', 
         ARRAY[antm_id, bbca_id, tlkm_id], 
         ARRAY[roe_id, der_id, per_id, pbv_id, current_ratio_id],
         'hybrid_ahp_saw'::public.analysis_method);
END $$;