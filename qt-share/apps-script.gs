/**
 * @OnlyCurrentDoc
 */
// 새벽기도 QT 은혜 나눔 공유 저장소 (구글 시트 + 앱스 스크립트)
// 이 시트의 '은혜나눔' 탭에 글과 '아멘'이 한 줄씩 쌓입니다.
// 부적절한 글은 시트에서 그 줄을 지우면 페이지에서도 사라집니다.

const SHEET_NAME = '은혜나눔';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['날짜', '종류', '이름', '내용', '작성시각']);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// 시트가 날짜·숫자·수식으로 바꾸지 않도록 글자 그대로 저장
function text_(v) {
  return "'" + String(v);
}

function doGet(e) {
  const key = String((e.parameter && e.parameter.key) || '');
  const rows = sheet_().getDataRange().getDisplayValues().slice(1);
  const comments = [];
  let amen = 0;
  rows.forEach(r => {
    if (r[0] !== key) return;
    if (r[1] === 'amen') amen++;
    else if (r[1] === 'comment') comments.push({ name: r[2], text: r[3], date: r[4] });
  });
  comments.reverse(); // 최신 글이 위
  return json_({ ok: true, comments, amen });
}

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false }); }
  const key = String(d.key || '');
  if (d.action !== 'prayer' && !/^\d{4}-\d{2}-\d{2}$/.test(key)) return json_({ ok: false });

  const now = Utilities.formatDate(new Date(), 'Asia/Seoul', 'M/d HH:mm');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (d.action === 'amen') {
      sheet_().appendRow([text_(key), 'amen', '', '', text_(now)]);
    } else if (d.action === 'comment') {
      const name = String(d.name || '').trim().slice(0, 30);
      const text = String(d.text || '').trim().slice(0, 1000);
      if (!name || !text) return json_({ ok: false });
      sheet_().appendRow([text_(key), 'comment', text_(name), text_(text), text_(now)]);
    } else if (d.action === 'prayer') {
      // 기도제목 요청: 시트에만 쌓이고 페이지에는 공개되지 않음
      const name = String(d.name || '').trim().slice(0, 30);
      const text = String(d.text || '').trim().slice(0, 1000);
      if (!name || !text) return json_({ ok: false });
      sheet_().appendRow([text_('기도제목'), 'prayer', text_(name), text_(text), text_(now)]);
    } else {
      return json_({ ok: false });
    }
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}
