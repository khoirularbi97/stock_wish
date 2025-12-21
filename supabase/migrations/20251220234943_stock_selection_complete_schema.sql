-- Location: supabase/migrations/20251220234943_stock_selection_complete_schema.sql
-- Schema Analysis: Fresh project - no existing tables
-- Integration Type: NEW_MODULE - Complete stock selection system
-- Module: Stock Analysis & Portfolio Management with AHP-SAW Methodology
-- Dependencies: None (fresh installation)

-- 1. Custom Types
CREATE TYPE public.criterion_category AS ENUM ('financial', 'valuation', 'growth', 'risk', 'quality');
CREATE TYPE public.analysis_status AS ENUM ('draft', 'completed', 'archived');
CREATE TYPE public.portfolio_transaction_type AS ENUM ('buy', 'sell');

-- 2. Core Tables

-- Critical intermediary table for authentication
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Stock master data
CREATE TABLE public.stocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticker TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    sector TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    market_cap DECIMAL(20, 2),
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Analysis criteria definitions
CREATE TABLE public.criteria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category public.criterion_category NOT NULL,
    is_benefit BOOLEAN DEFAULT true,
    unit TEXT,
    min_value DECIMAL(15, 4),
    max_value DECIMAL(15, 4),
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User's custom criteria templates
CREATE TABLE public.user_criteria_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Criteria included in templates with weights
CREATE TABLE public.template_criteria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES public.user_criteria_templates(id) ON DELETE CASCADE,
    criterion_id UUID REFERENCES public.criteria(id) ON DELETE CASCADE,
    weight DECIMAL(5, 4) NOT NULL CHECK (weight >= 0 AND weight <= 1),
    ahp_score DECIMAL(10, 6),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(template_id, criterion_id)
);

-- Stock analysis sessions
CREATE TABLE public.analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    template_id UUID REFERENCES public.user_criteria_templates(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    status public.analysis_status DEFAULT 'draft',
    calculation_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Stocks included in specific analysis
CREATE TABLE public.analysis_stocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE,
    stock_id UUID REFERENCES public.stocks(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(analysis_id, stock_id)
);

-- Raw data values for each stock and criterion in an analysis
CREATE TABLE public.stock_data_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE,
    stock_id UUID REFERENCES public.stocks(id) ON DELETE CASCADE,
    criterion_id UUID REFERENCES public.criteria(id) ON DELETE CASCADE,
    raw_value DECIMAL(15, 4) NOT NULL,
    normalized_value DECIMAL(10, 6),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(analysis_id, stock_id, criterion_id)
);

-- Final calculation results (SAW scores)
CREATE TABLE public.analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE,
    stock_id UUID REFERENCES public.stocks(id) ON DELETE CASCADE,
    saw_score DECIMAL(10, 6) NOT NULL,
    rank INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(analysis_id, stock_id)
);

-- Portfolio tracking
CREATE TABLE public.portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    stock_id UUID REFERENCES public.stocks(id) ON DELETE CASCADE,
    shares DECIMAL(15, 4) NOT NULL CHECK (shares >= 0),
    average_price DECIMAL(15, 2),
    current_value DECIMAL(20, 2),
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, stock_id)
);

-- Portfolio transaction history
CREATE TABLE public.portfolio_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
    transaction_type public.portfolio_transaction_type NOT NULL,
    shares DECIMAL(15, 4) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    transaction_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Market alerts and notifications
CREATE TABLE public.market_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    stock_id UUID REFERENCES public.stocks(id) ON DELETE CASCADE,
    alert_type TEXT NOT NULL,
    trigger_value DECIMAL(15, 2),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_stocks_ticker ON public.stocks(ticker);
CREATE INDEX idx_stocks_sector ON public.stocks(sector);
CREATE INDEX idx_criteria_category ON public.criteria(category);
CREATE INDEX idx_user_criteria_templates_user_id ON public.user_criteria_templates(user_id);
CREATE INDEX idx_template_criteria_template_id ON public.template_criteria(template_id);
CREATE INDEX idx_analyses_user_id ON public.analyses(user_id);
CREATE INDEX idx_analyses_status ON public.analyses(status);
CREATE INDEX idx_analysis_stocks_analysis_id ON public.analysis_stocks(analysis_id);
CREATE INDEX idx_stock_data_values_analysis_id ON public.stock_data_values(analysis_id);
CREATE INDEX idx_analysis_results_analysis_id ON public.analysis_results(analysis_id);
CREATE INDEX idx_portfolios_user_id ON public.portfolios(user_id);
CREATE INDEX idx_portfolio_transactions_portfolio_id ON public.portfolio_transactions(portfolio_id);
CREATE INDEX idx_market_alerts_user_id ON public.market_alerts(user_id);
CREATE INDEX idx_market_alerts_is_read ON public.market_alerts(is_read);

-- 4. Functions (before RLS policies)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $func$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$func$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $func$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$func$;

-- 5. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_criteria_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_data_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_alerts ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Pattern 1: Core user table
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 4: Public read, private write
CREATE POLICY "public_read_stocks"
ON public.stocks
FOR SELECT
TO public
USING (true);

CREATE POLICY "authenticated_write_stocks"
ON public.stocks
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "public_read_criteria"
ON public.criteria
FOR SELECT
TO public
USING (true);

CREATE POLICY "authenticated_write_criteria"
ON public.criteria
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Pattern 2: Simple user ownership
CREATE POLICY "users_manage_own_templates"
ON public.user_criteria_templates
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_template_criteria"
ON public.template_criteria
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_criteria_templates uct
    WHERE uct.id = template_criteria.template_id
    AND uct.user_id = auth.uid()
  )
);

CREATE POLICY "users_manage_own_analyses"
ON public.analyses
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_analysis_stocks"
ON public.analysis_stocks
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.analyses a
    WHERE a.id = analysis_stocks.analysis_id
    AND a.user_id = auth.uid()
  )
);

CREATE POLICY "users_manage_own_stock_data_values"
ON public.stock_data_values
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.analyses a
    WHERE a.id = stock_data_values.analysis_id
    AND a.user_id = auth.uid()
  )
);

CREATE POLICY "users_manage_own_analysis_results"
ON public.analysis_results
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.analyses a
    WHERE a.id = analysis_results.analysis_id
    AND a.user_id = auth.uid()
  )
);

CREATE POLICY "users_manage_own_portfolios"
ON public.portfolios
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_portfolio_transactions"
ON public.portfolio_transactions
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.portfolios p
    WHERE p.id = portfolio_transactions.portfolio_id
    AND p.user_id = auth.uid()
  )
);

CREATE POLICY "users_manage_own_market_alerts"
ON public.market_alerts
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 7. Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_user_criteria_templates_updated_at
  BEFORE UPDATE ON public.user_criteria_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_analyses_updated_at
  BEFORE UPDATE ON public.analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_stock_data_values_updated_at
  BEFORE UPDATE ON public.stock_data_values
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- 8. Mock Data
DO $$
DECLARE
    user1_id UUID := gen_random_uuid();
    user2_id UUID := gen_random_uuid();
    antm_id UUID := gen_random_uuid();
    bbca_id UUID := gen_random_uuid();
    tlkm_id UUID := gen_random_uuid();
    pe_ratio_id UUID := gen_random_uuid();
    roe_id UUID := gen_random_uuid();
    revenue_growth_id UUID := gen_random_uuid();
    template1_id UUID := gen_random_uuid();
    analysis1_id UUID := gen_random_uuid();
    portfolio1_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (user1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'investor@example.com', crypt('investor123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Investor"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user2_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'analyst@example.com', crypt('analyst123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Analyst"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Insert stocks (ANTM, BBCA, TLKM)
    INSERT INTO public.stocks (id, ticker, name, sector, logo_url, description, market_cap) VALUES
        (antm_id, 'ANTM', 'PT Aneka Tambang Tbk', 'Mining', 'https://example.com/logos/antm.png', 'Leading mining company in Indonesia', 50000000000000),
        (bbca_id, 'BBCA', 'PT Bank Central Asia Tbk', 'Banking', 'https://example.com/logos/bbca.png', 'Largest private bank in Indonesia', 1200000000000000),
        (tlkm_id, 'TLKM', 'PT Telkom Indonesia Tbk', 'Telecommunications', 'https://example.com/logos/tlkm.png', 'State-owned telecommunications company', 450000000000000);

    -- Insert criteria
    INSERT INTO public.criteria (id, name, description, category, is_benefit, unit) VALUES
        (pe_ratio_id, 'P/E Ratio', 'Price to Earnings Ratio', 'valuation', false, 'ratio'),
        (roe_id, 'ROE', 'Return on Equity', 'financial', true, 'percentage'),
        (revenue_growth_id, 'Revenue Growth', 'Year over year revenue growth', 'growth', true, 'percentage');

    -- Create template for user1
    INSERT INTO public.user_criteria_templates (id, user_id, name, description, is_default) VALUES
        (template1_id, user1_id, 'Value Investing Template', 'Focus on valuation and financial health', true);

    -- Add criteria to template with weights
    INSERT INTO public.template_criteria (template_id, criterion_id, weight, ahp_score) VALUES
        (template1_id, pe_ratio_id, 0.4, 0.4),
        (template1_id, roe_id, 0.35, 0.35),
        (template1_id, revenue_growth_id, 0.25, 0.25);

    -- Create analysis
    INSERT INTO public.analyses (id, user_id, template_id, name, status) VALUES
        (analysis1_id, user1_id, template1_id, 'Q4 2025 Stock Selection', 'completed');

    -- Add stocks to analysis
    INSERT INTO public.analysis_stocks (analysis_id, stock_id) VALUES
        (analysis1_id, antm_id),
        (analysis1_id, bbca_id),
        (analysis1_id, tlkm_id);

    -- Add stock data values (sample data)
    INSERT INTO public.stock_data_values (analysis_id, stock_id, criterion_id, raw_value, normalized_value) VALUES
        (analysis1_id, antm_id, pe_ratio_id, 12.5, 0.85),
        (analysis1_id, antm_id, roe_id, 18.2, 0.76),
        (analysis1_id, antm_id, revenue_growth_id, 15.5, 0.72),
        (analysis1_id, bbca_id, pe_ratio_id, 22.3, 0.60),
        (analysis1_id, bbca_id, roe_id, 28.5, 0.95),
        (analysis1_id, bbca_id, revenue_growth_id, 12.8, 0.68),
        (analysis1_id, tlkm_id, pe_ratio_id, 15.8, 0.75),
        (analysis1_id, tlkm_id, roe_id, 22.1, 0.82),
        (analysis1_id, tlkm_id, revenue_growth_id, 8.5, 0.55);

    -- Add analysis results
    INSERT INTO public.analysis_results (analysis_id, stock_id, saw_score, rank) VALUES
        (analysis1_id, bbca_id, 0.8245, 1),
        (analysis1_id, antm_id, 0.7682, 2),
        (analysis1_id, tlkm_id, 0.7015, 3);

    -- Add portfolio entry for user1
    INSERT INTO public.portfolios (id, user_id, stock_id, shares, average_price, current_value) VALUES
        (portfolio1_id, user1_id, bbca_id, 500, 9500, 5000000);

    -- Add portfolio transaction
    INSERT INTO public.portfolio_transactions (portfolio_id, transaction_type, shares, price, notes) VALUES
        (portfolio1_id, 'buy', 500, 9500, 'Initial purchase based on analysis');

    -- Add market alert
    INSERT INTO public.market_alerts (user_id, stock_id, alert_type, trigger_value, message) VALUES
        (user1_id, bbca_id, 'price_target', 11000, 'BBCA reached target price of 11,000');
END $$;