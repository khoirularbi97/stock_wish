import { z } from 'zod';

export const stockSchema = z.object({
  stock_code: z.string().min(1),
  company_name: z.string().min(1),
  sector: z.enum(['mining', 'financial', 'telecommunications']),
  current_price: z.number().nonnegative(),
  market_cap: z.number().nonnegative(),
});

export type StockInput = z.infer<typeof stockSchema>;
