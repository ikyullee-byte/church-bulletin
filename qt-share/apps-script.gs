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
  if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return json_({ ok: false });

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
    } else {
      return json_({ ok: false });
    }
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

// ---------------------------------------------------------------
// 매일 아침 축복 메시지 자동 남기기 (아래 목록을 날마다 돌아가며 사용)
// 사용법: 편집기에서 함수 'installDailyTrigger'를 한 번만 실행하면 매일 새벽 5시대에 자동 실행됩니다.
// ---------------------------------------------------------------
const BLESSING_NAME = '새벽기도 축복';
const BLESSINGS = [
  '오늘 하루, 세상이 줄 수 없는 하나님의 참된 평안이 성도님의 마음과 가정을 가득 채우기를 축복합니다.',
  '지치고 무거운 짐은 주님 앞에 내려놓고, 독수리 날개 치며 올라가는 새 힘을 얻는 복된 날 되시길 바랍니다.',
  '눈동자처럼 성도님을 지키시고 안위하시는 하나님의 따뜻한 손길을 경험하는 하루 되길 기도합니다.',
  '비바람이 지나간 뒤 맑은 하늘이 열리듯, 오늘 성도님의 삶에 주님의 위로와 회복의 빛이 임하기를 축복합니다.',
  '성도님이 딛는 모든 걸음마다 주님이 앞서 행하시며 가장 선한 길로 인도하시기를 축복합니다.',
  '오늘 만나는 모든 일 속에서 임마누엘 하나님이 함께하심을 온전히 누리는 은혜의 날이 되시길 바랍니다.',
  '믿음으로 시작한 오늘 하루가 감사와 찬양으로 풍성하게 마무리되기를 주님의 이름으로 축복합니다.',
  '주님을 신뢰함으로 모든 두려움을 이기고, 담대하게 승리하는 하루가 되기를 축복합니다.',
  '아침마다 새롭고 늘 풍성하신 주님의 자비와 은혜가 오늘 성도님의 일터와 가정에 넘쳐나길 바랍니다.',
  '주님 안에서 심은 작은 기도의 씨앗들이 오늘 아름다운 기쁨의 열매로 맺히기를 축복합니다.',
  '성도님의 손으로 하는 모든 수고 위에 하늘의 신령한 복과 땅의 기름진 복이 더해지기를 소망합니다.',
  '오늘 성도님을 통해 만나는 이웃들에게 주님의 사랑과 그리스도의 향기가 흘러가기를 축복합니다.',
  '주의 말씀은 내 발의 등이요 내 길의 빛이시니, 오늘도 말씀 따라 승리하는 복된 걸음 되시길 바랍니다.',
  '우리의 작은 신음에도 귀 기울이시는 신실하신 하나님께서 오늘 성도님의 기도를 기쁨으로 응답해 주시길 축복합니다.',
  '주 여호와로 인하여 기뻐하는 것이 성도님의 참된 힘이 되는 하루가 되시기를 간절히 기도합니다.'
];

function postDailyBlessing() {
  const tz = 'Asia/Seoul';
  const today = new Date();
  const key = Utilities.formatDate(today, tz, 'yyyy-MM-dd');
  const sh = sheet_();
  const rows = sh.getDataRange().getDisplayValues().slice(1);
  if (rows.some(r => r[0] === key && r[1] === 'comment' && r[2] === BLESSING_NAME)) return; // 하루 한 번만
  const dayNumber = Math.floor(today.getTime() / 86400000);
  const text = BLESSINGS[dayNumber % BLESSINGS.length];
  const now = Utilities.formatDate(today, tz, 'M/d HH:mm');
  sh.appendRow([text_(key), 'comment', text_(BLESSING_NAME), text_(text), text_(now)]);
}

function installDailyTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'postDailyBlessing')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('postDailyBlessing').timeBased().everyDays(1).atHour(5).inTimezone('Asia/Seoul').create();
}
