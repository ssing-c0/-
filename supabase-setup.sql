-- Supabase > SQL Editor > New query 에 붙여넣고 Run을 누르세요.
create table if not exists public.meetup_responses (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 40),
  date date not null,
  time text not null check (char_length(time) between 1 and 120),
  place text not null check (char_length(place) between 1 and 300)
);
-- 외부 공개 API 키(anon/publishable)로는 직접 읽거나 쓸 수 없도록 보호합니다.
alter table public.meetup_responses enable row level security;
revoke all on public.meetup_responses from anon, authenticated;
-- Vercel 서버의 비공개 service_role 키를 이용해서만 접근합니다.
