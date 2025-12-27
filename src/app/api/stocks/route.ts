import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stockSchema } from '@/lib/validation/stockSchema';

export async function GET() {
  try {
    const supabase = createClient() as any;
    const { data, error } = await supabase.from('stocks').select('*').order('stock_code', { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // normalize alias 'name' to company_name
    if (body && !body.company_name && body.name) {
      body.company_name = body.name;
      delete body.name;
    }

    // Validate shape using zod
    const parsed = stockSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const supabase = createClient() as any;
    const payload = parsed.data as unknown as Record<string, any>;
    const { data, error } = await supabase.from('stocks').insert(payload).select().single();
    if (error) {
      // include structured error for easier debugging
      const errPayload = {
        message: error.message || 'Supabase error',
        details: error.details || null,
        code: (error as any).code || null,
      };
      return NextResponse.json({ error: errPayload }, { status: 400 });
    }
    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
