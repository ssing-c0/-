import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return NextResponse.json({ error: 'Supabase 연결 환경변수가 설정되지 않았습니다.' }, { status: 503 });
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await db.from('meetup_responses')
      .select('name,date,time,place,created_at').order('created_at', { ascending: false }).limit(200);
    if (error) throw error;
    const rows = data.map(row => ({
      name: row.name, date: row.date, time: row.time, place: row.place,
      submittedAt: new Date(row.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    }));
    return NextResponse.json({ rows }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Responses error:', error);
    return NextResponse.json({ error: '신청 현황을 불러오지 못했습니다.' }, { status: 500 });
  }
}
