'use client';

import { useState } from 'react';
import { stockSchema, type StockInput } from '@/lib/validation/stockSchema';
import { z } from 'zod';
import Icon from '@/components/ui/AppIcon';

const StockCreateForm = () => {
  const [form, setForm] = useState<Partial<StockInput>>({
    stock_code: '',
    company_name: '',
    sector: 'mining',
    current_price: 0,
    market_cap: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (k: keyof StockInput, v: any) => {
    setForm((prev: Partial<StockInput>) => ({ ...prev, [k]: v }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      const parsed = stockSchema.parse({
        stock_code: String(form.stock_code || '').trim(),
        company_name: String(form.company_name || '').trim(),
        sector: String(form.sector) as any,
        current_price: Number(form.current_price || 0),
        market_cap: Number(form.market_cap || 0),
      });

      setLoading(true);
      const res = await fetch('/api/stocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      const json = await res.json();
      setResult(json);
      if (!res.ok) {
        setErrors({ general: json?.error?.message || JSON.stringify(json?.error) || 'Unknown error' });
      }
    } catch (err: unknown) {
      const anyErr = err as any;
      if (anyErr && Array.isArray(anyErr.errors)) {
        const zErr: Record<string, string> = {};
        anyErr.errors.forEach((e: any) => {
          const key = e.path && e.path[0];
          if (key) zErr[key] = e.message;
        });
        setErrors(zErr);
      } else {
        setErrors({ general: anyErr?.message || String(anyErr) });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl">
      <div>
        <label className="block text-sm font-semibold">Kode Saham</label>
        <input value={form.stock_code} onChange={e => handleChange('stock_code', e.target.value)} className="w-full border px-3 py-2 rounded" />
        {errors.stock_code && <p className="text-xs text-red-600">{errors.stock_code}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold">Nama Perusahaan</label>
        <input value={form.company_name} onChange={e => handleChange('company_name', e.target.value)} className="w-full border px-3 py-2 rounded" />
        {errors.company_name && <p className="text-xs text-red-600">{errors.company_name}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold">Sektor</label>
        <select value={form.sector} onChange={e => handleChange('sector', e.target.value as any)} className="w-full border px-3 py-2 rounded">
          <option value="mining">Mining</option>
          <option value="financial">Financial</option>
          <option value="telecommunications">Telecommunications</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold">Harga Saat Ini</label>
          <input type="number" value={form.current_price} onChange={e => handleChange('current_price', Number(e.target.value))} className="w-full border px-3 py-2 rounded" />
          {errors.current_price && <p className="text-xs text-red-600">{errors.current_price}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Market Cap</label>
          <input type="number" value={form.market_cap} onChange={e => handleChange('market_cap', Number(e.target.value))} className="w-full border px-3 py-2 rounded" />
          {errors.market_cap && <p className="text-xs text-red-600">{errors.market_cap}</p>}
        </div>
      </div>

      {errors.general && <p className="text-sm text-red-600">{errors.general}</p>}

      <div className="flex items-center gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-brand-cta text-white rounded flex items-center gap-2">
          {loading ? 'Menyimpan...' : 'Simpan Saham'}
          <Icon name="PlusIcon" size={16} />
        </button>
        {result && <pre className="bg-muted p-2 rounded text-xs">{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </form>
  );
};

export default StockCreateForm;
