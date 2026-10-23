import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request) {
  try {
    const { name, date, time, place } = await request.json();
    if (![name, date, time, place].every(v => typeof v === 'string' && v.trim())) {
      return NextResponse.json({ error: '모든 항목을 입력해 주세요.' }, { status: 400 });
    }
    if (name.length > 40 || time.length > 120 || place.length > 300 ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0,10) !== date) {
      return NextResponse.json({ error: '입력 형식을 확인해 주세요.' }, { status: 400 });
    }
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return NextResponse.json({ error: 'Supabase 연결 환경변수가 설정되지 않았습니다.' }, { status: 503 });
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await db.from('meetup_responses').insert({
      name: name.trim(), date, time: time.trim(), place: place.trim()
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: '저장에 실패했습니다. 잠시 후 다시 시도해 주세요.' }, { status: 500 });
  }
}
