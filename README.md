# 모임 일정 신청폼 — Supabase 버전

Vercel(Next.js) + Supabase. 신청 시 `meetup_responses` 테이블에 저장하고, 화면에 최근 200건을 표시합니다.

## 1. Supabase 데이터베이스 만들기
1. https://supabase.com/dashboard 에 GitHub 계정으로 로그인합니다.
2. **New project**를 눌러 프로젝트 이름, 데이터베이스 비밀번호, Region을 설정하고 생성합니다. GitHub로 로그인한 것과 DB 프로젝트 생성은 별개입니다.
3. 왼쪽 **SQL Editor → New query**에서 `supabase-setup.sql` 파일 내용을 붙여넣고 **Run**을 누릅니다.
4. **Project Settings → API** (화면에 따라 **Connect → API Keys** 또는 **Settings → API Keys**)에서 Project URL과 `service_role` **secret key**를 확인합니다. 새 `sb_secret_...` 키가 제공되는 경우 해당 서버용 secret key를 사용할 수도 있습니다.

## 2. Vercel 연결
1. GitHub 저장소의 기존 Google Sheets 버전 파일을 이 폴더의 파일들로 교체합니다. 특히 `app/api/submit/route.js`, `app/api/responses/route.js`, `package.json`이 변경되어야 합니다.
2. Vercel 프로젝트 → **Settings → Environment Variables**에서 다음 두 항목을 추가합니다.
   - `SUPABASE_URL` = Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = Supabase 서버 전용 secret/service_role 키
3. **Deployments → Redeploy**를 실행합니다. 기존 `GOOGLE_SCRIPT_URL`과 `SHEET_API_SECRET`은 더 이상 사용하지 않습니다.
4. 배포된 웹사이트에서 시험 신청을 해보고 Supabase **Table Editor → meetup_responses**에서 새 행이 생성되었는지 확인합니다.

## 주의
- **서비스 역할 키/secret key를 GitHub, 클라이언트 코드, 채팅, 스크린샷에 공개하지 마세요.** 오직 Vercel 서버 환경변수에 넣으세요.
- 웹사이트 신청 현황은 방문자에게 공개됩니다. 이름과 일정 공유에 동의한 사람만 입력하도록 안내하세요.
- 공개 제출 API에는 인증/봇 방지가 없으므로, 널리 공개할 경우 CAPTCHA 및 rate limit을 추가해야 합니다.
- 데이터는 기존 Google Sheets에서 자동 이전되지 않습니다.
