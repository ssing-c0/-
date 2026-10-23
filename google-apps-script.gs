// Google Sheets > 확장 프로그램 > Apps Script에 붙여 넣으세요.
// 배포 전에 아래 두 값을 설정하세요.
const SPREADSHEET_ID = '여기에_스프레드시트_ID';
const API_SECRET = '여기에_긴_임의의_비밀문자열';
const TAB_NAME = '신청현황';
function sheet_(){const ss=SpreadsheetApp.openById(SPREADSHEET_ID);let sh=ss.getSheetByName(TAB_NAME);if(!sh)sh=ss.insertSheet(TAB_NAME);if(sh.getLastRow()===0)sh.appendRow(['제출 시각','이름','가능한 날짜','가능한 시간','원하는 장소']);return sh;}
function json_(data){return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);}
function safe_(value){const s=String(value||'').trim();return /^[=+\-@\t\r]/.test(s)?"'"+s:s;}
function doPost(e){try{const d=JSON.parse(e.postData.contents);if(d.secret!==API_SECRET||!API_SECRET)return json_({ok:false,error:'인증 실패'});if(![d.name,d.date,d.time,d.place].every(v=>typeof v==='string'&&v.trim()))return json_({ok:false,error:'필수 항목 누락'});const lock=LockService.getScriptLock();lock.waitLock(10000);try{sheet_().appendRow([new Date(),safe_(d.name),safe_(d.date),safe_(d.time),safe_(d.place)]);}finally{lock.releaseLock();}return json_({ok:true});}catch(err){return json_({ok:false,error:String(err)});}}
function doGet(e){try{if(e.parameter.secret!==API_SECRET||!API_SECRET)return json_({ok:false,error:'인증 실패'});const sh=sheet_();const last=sh.getLastRow();if(last<2)return json_({ok:true,rows:[]});const values=sh.getRange(2,1,last-1,5).getDisplayValues();return json_({ok:true,rows:values.map(r=>({submittedAt:r[0],name:r[1],date:r[2],time:r[3],place:r[4]})).reverse()});}catch(err){return json_({ok:false,error:String(err)});}}
