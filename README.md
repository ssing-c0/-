# 모임 일정 신청폼

Vercel에 배포하는 Next.js 웹사이트. 응답은 Google Sheets에 저장되고, 신청 현황도 시트에서 읽어 옵니다.

## 1. Google Sheets 연결
1. 새 Google 스프레드시트를 만듭니다.
2. 주소 `https://docs.google.com/spreadsheets/d/스프레드시트_ID/edit`에서 ID를 복사합니다.
3. **확장 프로그램 → Apps Script**를 열고 `google-apps-script.gs` 파일의 내용을 붙여 넣습니다.
4. `SPREADSHEET_ID`를 실제 ID로 바꿉니다.
5. `API_SECRET`를 길고 무작위인 비밀 문자열로 바꿉니다. Vercel에도 똑같은 값을 넣어야 합니다.
6. **배포 → 새 배포 → 유형: 웹 앱**을 선택합니다. 실행 사용자: **나**, 액세스 권한: **모든 사용자**로 설정하고 배포합니다. 필요한 Google 권한을 승인합니다.
7. 생성된 웹 앱 URL (`.../exec`)을 복사합니다. 이 URL은 공개될 수 있지만, 스크립트는 비밀 문자열로 요청을 확인합니다.

## 2. Vercel 배포
1. 이 프로젝트 폴더를 GitHub 저장소에 올립니다.
2. Vercel에서 **Add New → Project**로 저장소를 가져옵니다. Framework Preset은 Next.js입니다.
3. Environment Variables에 다음을 설정합니다.
   - `GOOGLE_SCRIPT_URL`: 위에서 복사한 `/exec` URL
   - `SHEET_API_SECRET`: Apps Script의 `API_SECRET`와 동일한 값
4. Deploy를 누릅니다. 환경 변수를 바꾼 경우 다시 배포합니다.

## 로컬 실행
`npm install` 후 `.env.example`을 `.env.local`로 복사해 값을 설정하고 `npm run dev`를 실행합니다.

## 유의사항
- 신청 현황은 웹사이트 방문자 누구나 볼 수 있습니다. 민감한 정보를 입력하지 않도록 안내하세요.
- 누구나 제출할 수 있는 공개 폼이므로 스팸 방지 기능은 포함되어 있지 않습니다.
- Apps Script에서 코드를 수정한 경우 **배포 관리 → 수정 → 새 버전**으로 재배포해야 변경 사항이 반영됩니다.
- 이름, 날짜, 시간, 장소는 각각 하나의 입력 필드입니다. 날짜 복수 선택 기능은 포함하지 않았습니다.
