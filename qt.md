<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>새벽기도회 은혜의 나눔</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg-dark: #0a0f1d;
      --card-bg: rgba(22, 32, 53, 0.82);
      --gold: #e5c158;
      --gold-soft: #f5e6b8;
      --text-main: #f4f6f9;
      --text-sub: #a9b3c6;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Noto Sans KR', sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-main);
      line-height: 1.65;
      padding-bottom: 90px;
      overflow-x: hidden;
    }

    /* 배경 별빛 캔버스 */
    #bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: linear-gradient(180deg, #131d36 0%, #0a0f1d 100%);
    }

    /* 모바일 컨테이너 (최대 폭 480px 고정) */
    .mobile-wrap {
      max-width: 480px;
      margin: 0 auto;
      padding: 0 18px;
    }

    .serif {
      font-family: 'Nanum Myeongjo', serif;
    }

    /* 스크롤 등장 애니메이션 */
    .fade-up {
      opacity: 0;
      transform: translateY(25px);
      transition: all 0.6s ease-out;
    }
    .fade-up.show {
      opacity: 1;
      transform: translateY(0);
    }

    /* 상단 날짜 선택 탭 (고정형) */
    .day-selector-wrap {
      position: sticky;
      top: 0;
      z-index: 90;
      background: rgba(10, 15, 29, 0.88);
      backdrop-filter: blur(10px);
      margin: 0 -18px;
      padding: 12px 18px 10px;
      border-bottom: 1px solid rgba(229, 193, 88, 0.15);
      display: flex;
      gap: 8px;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
    }
    .day-selector-wrap::-webkit-scrollbar {
      display: none;
    }
    .day-btn {
      background: var(--card-bg);
      border: 1px solid rgba(229, 193, 88, 0.35);
      color: var(--text-sub);
      padding: 7px 16px;
      border-radius: 20px;
      font-size: 0.82rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .day-btn.active {
      background: var(--gold);
      color: #0a0f1d;
      font-weight: 700;
      border-color: var(--gold);
      box-shadow: 0 0 12px rgba(229, 193, 88, 0.35);
    }

    /* 1. 상단 표지 */
    .hero {
      padding: 40px 0 30px;
      text-align: center;
    }

    .date-badge {
      display: inline-block;
      font-size: 0.78rem;
      color: var(--gold);
      border: 1px solid rgba(229, 193, 88, 0.4);
      background: rgba(229, 193, 88, 0.08);
      padding: 4px 14px;
      border-radius: 20px;
      margin-bottom: 16px;
      letter-spacing: 1px;
    }

    .hero h1 {
      font-size: 1.85rem;
      line-height: 1.35;
      color: #fff;
      margin-bottom: 10px;
      word-break: keep-all;
    }

    .hero h1 span {
      color: var(--gold);
    }

    .hero-sub {
      font-size: 0.9rem;
      color: var(--text-sub);
      margin-bottom: 24px;
    }

    .info-bar {
      display: flex;
      justify-content: space-around;
      background: var(--card-bg);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 14px 10px;
      font-size: 0.82rem;
    }

    .info-item strong {
      display: block;
      color: var(--gold);
      font-size: 0.75rem;
      margin-bottom: 2px;
    }

    /* 공통 섹션 & 카드 */
    section {
      margin-bottom: 28px;
      scroll-margin-top: 65px;
    }

    .sec-title {
      font-size: 1.15rem;
      color: var(--gold-soft);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sec-title::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 16px;
      background: var(--gold);
      border-radius: 2px;
    }

    .card {
      background: var(--card-bg);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 14px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    }

    /* 말씀 구절 */
    .verse-item {
      margin-bottom: 14px;
      font-size: 0.95rem;
      line-height: 1.7;
    }
    .verse-item:last-child {
      margin-bottom: 0;
    }
    .v-num {
      color: var(--gold);
      font-weight: 700;
      margin-right: 6px;
    }

    /* 아코디언 (더보기 버튼) */
    details {
      margin-top: 12px;
      border-top: 1px dashed rgba(255, 255, 255, 0.12);
      padding-top: 12px;
    }
    summary {
      font-size: 0.85rem;
      color: var(--gold);
      cursor: pointer;
      list-style: none;
      text-align: center;
      font-weight: 500;
    }
    summary::-webkit-details-marker {
      display: none;
    }
    .details-content {
      margin-top: 12px;
      font-size: 0.9rem;
      color: var(--text-sub);
      line-height: 1.7;
    }

    /* 설교 3대 포인트 카드 */
    .point-card {
      border-left: 3px solid var(--gold);
    }

    .point-tag {
      font-size: 0.72rem;
      color: #0a0f1d;
      background: var(--gold);
      font-weight: 700;
      padding: 2px 9px;
      border-radius: 10px;
      display: inline-block;
      margin-bottom: 8px;
    }

    .point-card h3 {
      font-size: 1.12rem;
      color: #fff;
      margin-bottom: 10px;
      line-height: 1.4;
      word-break: keep-all;
    }

    .point-desc {
      font-size: 0.92rem;
      color: var(--text-sub);
      margin-bottom: 12px;
      line-height: 1.7;
      word-break: keep-all;
    }

    .key-quote {
      background: rgba(229, 193, 88, 0.1);
      border-radius: 10px;
      padding: 12px 14px;
      font-size: 0.88rem;
      color: var(--gold-soft);
      font-weight: 500;
    }

    /* 미니 비교 박스 */
    .name-box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 12px 0;
      text-align: center;
    }
    .name-item {
      padding: 12px 8px;
      border-radius: 10px;
      font-size: 0.85rem;
    }
    .name-old {
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-sub);
    }
    .name-new {
      background: rgba(229, 193, 88, 0.18);
      border: 1px solid var(--gold);
      color: #fff;
    }

    /* 공동 기도 제목 리스트 */
    .prayer-list {
      list-style: none;
    }
    .prayer-list li {
      position: relative;
      padding-left: 22px;
      margin-bottom: 12px;
      font-size: 0.92rem;
      color: var(--text-main);
    }
    .prayer-list li:last-child {
      margin-bottom: 0;
    }
    .prayer-list li::before {
      content: '✦';
      position: absolute;
      left: 0;
      color: var(--gold);
    }
    .prayer-list strong {
      color: var(--gold-soft);
      display: block;
      font-size: 0.95rem;
      margin-bottom: 2px;
    }

    /* 통성기도 강조 박스 */
    .cry-box {
      background: linear-gradient(135deg, rgba(229, 193, 88, 0.2), rgba(22, 32, 53, 0.95));
      border: 1px solid var(--gold);
      text-align: center;
    }
    .cry-title {
      font-size: 1.25rem;
      color: var(--gold);
      font-weight: 800;
      margin: 10px 0;
      letter-spacing: 2px;
      animation: pulse 2s infinite alternate;
    }
    @keyframes pulse {
      from { opacity: 0.8; }
      to { opacity: 1; text-shadow: 0 0 12px var(--gold); }
    }

    /* 하단 고정 네비게이션 */
    .bottom-nav {
      position: fixed;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 36px);
      max-width: 440px;
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(229, 193, 88, 0.35);
      border-radius: 30px;
      display: flex;
      justify-content: space-around;
      padding: 10px 6px;
      z-index: 100;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }
    .bottom-nav a {
      color: var(--text-sub);
      text-decoration: none;
      font-size: 0.78rem;
      font-weight: 500;
      padding: 4px 12px;
      border-radius: 16px;
      transition: all 0.2s;
    }
    .bottom-nav a.active {
      background: var(--gold);
      color: #0a0f1d;
      font-weight: 700;
    }
  </style>
</head>
<body>

  <canvas id="bg-canvas"></canvas>

  <div class="mobile-wrap">
    <!-- 상단 요일 전환 탭 -->
    <div id="daySelector" class="day-selector-wrap"></div>

    <!-- 성도용 설교 요약 및 기도 가이드 영역 -->
    <div id="contentArea"></div>
  </div>

  <!-- 하단 고정 탭바 -->
  <nav class="bottom-nav">
    <a href="#top" class="nav-link active">표지</a>
    <a href="#word" class="nav-link">말씀</a>
    <a href="#sermon" class="nav-link">설교핵심</a>
    <a href="#prayer" class="nav-link">합심기도</a>
  </nav>

  <script>
    // =========================================================================
    // 📂 [성도용 새벽기도 나눔 데이터]
    // 새로운 날짜가 추가될 때마다 이 객체 안에 동일한 포맷으로 추가하시면 됩니다.
    // =========================================================================
    const sermons = {
      "2026-10-19": {
        tabLabel: "📅 10.19 (월) 새벽",
        dateBadge: "2026. 10. 19 (월) 새벽기도회",
        titleHtml: "<span>새 일을 행하시는</span><br>하나님과 첫날의 믿음",
        subtitle: "종일토록 손을 펼치시는 주님의 품으로",
        bibleRange: "이사야 65:1-16",
        hymn: "370장 · 455장",
        
        openingPrayer: "새로운 한 주의 첫 문을 여는 월요일 새벽, 세상의 염려와 막막함을 주님 앞에 내려놓습니다. 종일토록 두 손을 펼치사 우리를 기다리시는 아버지의 품 안에서, 실패와 상처의 아골 골짜기가 변하여 축복의 땅이 되는 역사를 보게 하옵소서. 아멘.",
        
        keyVerses: [
          { num: "1", text: "나는 나를 구하지 아니하던 자에게 물음을 받았으며 나를 찾지 아니하던 자에게 찾아 발견됨을 받았으며 내가 이름을 부르지 아니하던 나라에게 내가 여기 있노라 내가 여기 있노라 하였노라" },
          { num: "2", text: "내가 종일 내 손을 펼쳐 자기의 생각을 따라 불선한 길을 행하는 패역한 백성들을 불렀나니" },
          { num: "10", text: "<strong>샤론</strong>은 양 떼의 우리가 되겠고 <strong>아골 골짜기</strong>는 소 떼가 눕는 곳이 되어 나를 찾은 내 백성의 소유가 되려니와" },
          { num: "14", text: "보라 나의 종들은 마음이 즐거우므로 노래할 것이로되 너희는 마음이 슬프므로 울며 심령이 상하므로 통곡할 것이며" }
        ],
        moreVersesLabel: "📖 본문 전체(1~16절) 펼쳐보기 ▾",
        moreVersesHtml: `
          3. 곧 동산에서 제사하며 벽돌 위에서 분향하여 내 앞에서 항상 나의 진노를 일으키는 백성이라<br>
          4. 그들이 무덤 사이에 앉으며 은밀한 곳에서 밤을 보내며 돼지고기를 먹으며 가증한 것들의 국을 그들의 그릇에 담으면서<br>
          5. 사람에게 이르기를 너는 네 자리에 서 있고 내게 가까이 하지 말라 나는 너보다 거룩함이라 하나니 이런 자들은 내 코의 연기요 종일 타는 불이로다<br>
          6. 보라 이것이 내 앞에 기록되었으니 내가 잠잠하지 아니하고 반드시 보응하되 그들의 품에 보응하리라<br>
          7. 너희의 죄악과 너희 조상들의 죄악이 한가지니 그들이 산 위에서 분향하며 작은 산 위에서 나를 능욕하였음이라 그러므로 내가 먼저 그들의 행위를 헤아리고 그들의 품에 보응하리라 여호와가 말하였느니라<br>
          8. 여호와께서 이와 같이 말씀하시되 포도송이에는 즙이 있으므로 사람들이 말하기를 그것을 상하지 못하게 하라 거기에 복이 있느니라 하나니 나도 내 종들을 위하여 그같이 행하여 다 멸하지 아니하고<br>
          9. 내가 야곱에게서 씨를 내며 유다에게서 나의 산들을 기업으로 얻을 자를 내리니 내가 택한 자가 이를 기업으로 얻을 것이요 나의 종들이 거기에 살 것이라<br>
          10. 오직 나 여호와를 버리며 나의 성산을 잊고 갓에게 상을 베풀며 므니에게 섞은 술을 가득히 붓는 너희여<br>
          11. 내가 너희를 칼에 붙일 것인즉 다 구푸리고 죽임을 당하리니 이는 내가 불러도 너희가 대답하지 아니하며 내가 말하여도 듣지 아니하고 나의 눈에 악을 행하였으며 내가 기뻐하지 아니하는 일을 택하였음이니라<br>
          12. 이러므로 주 여호와께서 이같이 말씀하시니라 보라 나의 종들은 먹을 것이로되 너희는 주릴 것이니라 보라 나의 종들은 마실 것이로되 너희는 갈할 것이니라 보라 나의 종들은 기뻐할 것이로되 너희는 수치를 당할 것이니라<br>
          13. 너희가 남겨 놓은 이름은 내가 택한 자의 저줏거리가 될 것이니라 주 여호와 내가 너를 죽이고 내 종들은 다른 이름으로 부르리라<br>
          14. 이러므로 땅에서 자기를 위하여 복을 구하는 자는 진리의 하나님을 향하여 복을 구할 것이요 땅에서 맹세하는 자는 진리의 하나님으로 맹세하리니 이는 이전 환난이 잊혀졌고 내 눈 앞에 숨겨졌음이라
        `,

        points: [
          {
            tag: "은혜 01",
            title: "종일토록 손을 펼치고 우리를 기다리십니다 (1-2절)",
            desc: "우리는 연약하여 쉽게 주님을 잊고 내 생각을 따라 방황하지만, 하나님은 우리가 등을 돌릴 때조차도 <strong>종일토록 두 손을 넓게 펼쳐</strong> 기다리십니다. 한 주를 시작하는 우리를 향해 주님은 '내가 여기 있노라' 부르고 계십니다.",
            quote: "💡 우리의 연약함에 머물러 있지 말고, 오늘도 두 팔 벌려 기다리시는 아버지의 품 안으로 나아오십시오."
          },
          {
            tag: "은혜 02",
            title: "아골 골짜기를 바꾸어 축복의 땅이 되게 하십니다 (8-10절)",
            desc: "구약에서 '아골 골짜기'는 심판과 저주, 실패의 자리를 상징합니다. 그러나 주님을 찾는 백성에게는 눈물 흘리던 그 아골 골짜기가 변하여 양과 소가 평안히 누워 쉬는 축복의 소유지가 되는 역전이 일어납니다.",
            compareBox: {
              oldLabel: "과거의 상처와 실패",
              oldVal: "아골 골짜기 (괴로움)",
              newLabel: "주님이 주시는 회복",
              newVal: "샤론의 평원 (축복의 땅)"
            },
            quote: "💡 아픔과 실패의 자리가 하나님의 은혜로 인해 새로운 축복과 역전의 무대가 됩니다."
          },
          {
            tag: "은혜 03",
            title: "진리의 하나님 안에서 참된 즐거움을 누립니다 (13-16절)",
            desc: "세상의 헛된 우상과 요행을 좇는 길의 끝은 목마름과 슬픔입니다. 그러나 오직 <strong>'진리의 하나님'</strong>을 찾고 의지하는 주의 종들에게는 이전 환난이 잊혀지고 세상이 줄 수 없는 마음의 즐거움과 찬송이 넘치게 됩니다.",
            quote: "💡 한 주의 첫날, 세상의 근심 대신 진리 되신 주님만을 의지함으로 기쁨의 찬송을 부르십시오."
          }
        ],

        prayers: [
          { title: "1. 한 주의 첫날을 주님께 위탁", desc: "새로운 한 주간의 모든 삶과 일정을 주님의 주권 아래 온전히 내어드리고, 종일토록 손을 펼치시는 하나님의 인도하심을 신뢰하게 하소서." },
          { title: "2. 아골 골짜기가 변하여 축복이 되도록", desc: "내 삶의 아픔과 과거의 실패를 딛고 일어나, 하나님이 예비하신 샤론의 평원과 같은 풍성한 은혜와 회복의 소유지를 누리게 하소서." },
          { title: "3. 마음의 즐거움과 찬송의 회복", desc: "세상의 헛된 것을 좇지 않고 오직 진리의 하나님 안에서 복을 구하며, 입술에 불평 대신 감사와 찬송이 넘치는 한 주가 되게 하소서." },
          { title: "4. 환우들과 무거운 짐을 진 성도들", desc: "질병과 경제적 압박으로 월요일 아침을 힘겹게 맞이하는 성도들을 찾아가 주사, 새 일을 행하시는 능력으로 치유와 공급의 대로를 열어 주소서." }
        ],

        cryIntro: "종일토록 손을 펼치시는 주님을 의지하며<br>함께 부르짖어 기도합시다!",
        cryPrayer: "종일토록 두 팔 벌려 우리를 기다리시는 하나님 아버지! 새로운 한 주를 시작하며 우리의 무거운 염려와 두려움을 주님 발 앞에 내려놓습니다. 눈물 흘리던 아골 골짜기를 축복의 샤론 평원으로 바꾸어 주시고, 오늘 하루 성도들의 가정과 일터와 병상 위에 새 일을 행하시는 주님의 치유와 능력이 임하게 하옵소서. 예수님의 이름으로 기도합니다. 아멘!"
      },

      "2026-10-16": {
        tabLabel: "📅 10.16 (금) 새벽",
        dateBadge: "2026. 10. 16 (금) 새벽기도회",
        titleHtml: "<span>헵시바</span>와 <span>쁄라</span>,<br>신랑이 신부를 기뻐함 같이",
        subtitle: "우리를 향해 쉬지 않으시는 하나님의 사랑",
        bibleRange: "이사야 62:1-12",
        hymn: "210장 · 550장",
        
        openingPrayer: "시온을 위하여 쉬지 않으시는 하나님 아버지, 세상의 시선에 흔들려 스스로를 '버림받은 자'처럼 여겼던 연약함을 내려놓습니다. 오늘 우리를 '헵시바'와 '쁄라'라 부르시는 주님의 음성을 듣고, 거룩한 기도의 파수꾼으로 일어서게 하옵소서. 아멘.",
        
        keyVerses: [
          { num: "1", text: "나는 시온의 의가 빛 같이, 예루살렘의 구원이 횃불 같이 나타나도록 시온을 위하여 잠잠하지 아니하며 예루살렘을 위하여 쉬지 아니할 것인즉" },
          { num: "4", text: "다시는 너를 버림 받은 자라 부르지 아니하며 다시는 네 땅을 황무지라 부르지 아니하고 오직 너를 <strong>헵시바</strong>라 하며 네 땅을 <strong>쁄라</strong>라 하리니 이는 여호와께서 너를 기뻐하실 것이며 네 땅이 결혼한 것처럼 될 것임이라" },
          { num: "5", text: "신랑이 신부를 기뻐함 같이 네 하나님이 너를 기뻐하시리라" },
          { num: "12", text: "사람들이 너를 일컬어 거룩한 백성이라 여호와께서 구속하신 자라 하겠고 또 너를 일컬어 찾은 바 된 자요 버림 받지 아니한 성읍이라 하리라" }
        ],
        moreVersesLabel: "📖 본문 전체(1~12절) 펼쳐보기 ▾",
        moreVersesHtml: `
          15. 이방 나라들이 네 공의를, 뭇 왕이 다 네 영광을 볼 것이요 너는 여호와의 입으로 정하실 새 이름으로 일컬음이 될 것이며<br>
          16. 너는 또 여호와의 손의 아름다운 관, 네 하나님의 손의 왕관이 될 것이라<br>
          17. 예루살렘이여 내가 너의 성벽 위에 파수꾼을 세우고 그들로 하여금 주야로 계속 잠잠하지 않게 하였느니라 너희 여호와로 기억하시게 하는 자들아 너희는 쉬지 말며<br>
          18. 또 여호와께서 예루살렘을 세워 세상에서 찬송을 받게 하시기까지 그로 쉬지 못하시게 하라<br>
          19. 여호와께서 그 오른손, 그 능력의 팔로 맹세하시되 내가 다시는 네 곡식을 네 원수들에게 양식으로 주지 아니하겠고 네가 수고하여 얻은 포도주를 이방인이 마시지 못하게 할 것인즉<br>
          20. 오직 추수한 자가 그것을 먹고 나 여호와를 찬송할 것이요 거둔 자가 그것을 나의 성소 뜰에서 마시리라 하셨느니라<br>
          21. 성문으로 나아가라 나아가라 백성이 올 길을 닦으라 큰 길을 수축하고 수축하라 돌을 제하라 만민을 위하여 기치를 들라<br>
          22. 여호와께서 땅 끝까지 선포하시되 너희는 딸 시온에게 이르라 보라 네 구원이 이르렀느니라 보라 상급이 그에게 있고 보응이 그 앞에 있느니라 하셨느니라
        `,

        points: [
          {
            tag: "은혜 01",
            title: "하나님은 우리를 위해 결코 쉬지 않으십니다 (1, 6-7절)",
            desc: "세상이 우리를 포기할 때에도 하나님은 우리의 회복을 위해 잠잠하지 않고 일하십니다. 그리고 우리를 <strong>'성벽 위 파수꾼'</strong>으로 부르셔서, 우리의 기도를 통해 일하시겠다고 약속하십니다.",
            quote: "💡 오늘 우리의 새벽 기도는 쉬지 않으시는 하나님의 열심과 만나는 거룩한 통로입니다."
          },
          {
            tag: "은혜 02",
            title: "'버림받은 자'가 아니라 '헵시바'와 '쁄라'입니다 (2-5절)",
            desc: "스스로를 향해 \"나는 안 된다\"고 부르던 옛 이름을 내려놓으십시오. 우리는 하나님의 손에 들린 아름다운 왕관이며, 신랑이 기뻐하는 신부입니다.",
            compareBox: {
              oldLabel: "과거의 이름",
              oldVal: "버림받은 자 · 황무지",
              newLabel: "주님이 주신 새 이름",
              newVal: "헵시바 · 쁄라"
            },
            quote: "💡 <strong>헵시바:</strong> 나의 기쁨이 그에게 있다<br>💡 <strong>쁄라:</strong> 결혼한 여인 (주님의 신부)"
          },
          {
            tag: "은혜 03",
            title: "길을 닦고 구원의 기치를 높이 드십시오 (10-12절)",
            desc: "사랑으로 회복된 백성에게는 <strong>'나아가라'</strong>는 사명이 주어집니다. 삶의 자리에서 걸림돌을 제하고, 만민을 향해 오직 예수 그리스도의 구원의 깃발(기치)을 높이 드는 성도가 되십시오.",
            quote: "💡 우리의 최종 이름은 <strong>'찾은 바 된 자요, 버림받지 아니한 거룩한 성읍'</strong>입니다."
          }
        ],

        prayers: [
          { title: "1. 정체성 회복을 위하여", desc: "세상의 평가나 자책에서 벗어나, 나를 '헵시바'와 '쁄라'라 부르시는 하나님의 절대적인 사랑을 확신하게 하소서." },
          { title: "2. 쉬지 않는 기도의 파수꾼", desc: "가정과 교회, 민족의 성벽 위에 깨어 서서 주님이 역사하실 때까지 쉬지 않고 부르짖게 하소서." },
          { title: "3. 구원의 기치를 드는 삶", desc: "무너진 삶의 자리에서 길을 닦고 돌을 제하며, 세상 가운데 그리스도의 기치를 높이 들게 하소서." },
          { title: "4. 환우와 지친 성도들의 회복", desc: "질병과 어려움 가운데 있는 성도들의 가정과 일터를 붙드시고 새 힘과 치유를 허락하소서." }
        ],

        cryIntro: "나를 기뻐하시는 주님의 음성을 붙들고<br>함께 부르짖어 기도합시다!",
        cryPrayer: "우리를 위하여 잠시도 쉬지 않으시는 하나님 아버지! 우리는 더 이상 버림받은 자가 아니라 주님의 손에 들린 아름다운 왕관이며 기쁨의 신부임을 고백합니다. 오늘 파수꾼으로 일어나 가정과 교회와 환우들을 위해 부르짖사오니, 우리의 기도가 하늘 보좌에 상달되게 하옵소서. 예수님의 이름으로 기도합니다. 아멘!"
      }
    };

    // =========================================================================
    // ⚙️ [화면 렌더링 스크립트]
    // =========================================================================
    const keys = Object.keys(sermons);
    let currentKey = keys[0];

    function renderApp(targetKey) {
      currentKey = targetKey;
      const data = sermons[targetKey];

      // 1. 상단 날짜 선택 버튼 생성
      let selectorHtml = '';
      keys.forEach((k) => {
        const activeClass = k === targetKey ? 'active' : '';
        selectorHtml += `<button class="day-btn ${activeClass}" onclick="renderApp('${k}')">${sermons[k].tabLabel}</button>`;
      });
      document.getElementById('daySelector').innerHTML = selectorHtml;

      // 2. 핵심 구절 생성
      let versesHtml = '';
      data.keyVerses.forEach(v => {
        versesHtml += `<div class="verse-item"><span class="v-num">${v.num}</span>${v.text}</div>`;
      });

      // 3. 설교 핵심 3대지 카드 생성
      let pointsHtml = '';
      data.points.forEach(p => {
        let compareHtml = '';
        if (p.compareBox) {
          compareHtml = `
            <div class="name-box">
              <div class="name-item name-old">
                <small>${p.compareBox.oldLabel}</small><br><strong>${p.compareBox.oldVal}</strong>
              </div>
              <div class="name-item name-new">
                <small>${p.compareBox.newLabel}</small><br><strong>${p.compareBox.newVal}</strong>
              </div>
            </div>
          `;
        }

        pointsHtml += `
          <div class="card point-card fade-up">
            <span class="point-tag">${p.tag}</span>
            <h3 class="serif">${p.title}</h3>
            <p class="point-desc">${p.desc}</p>
            ${compareHtml}
            <div class="key-quote">${p.quote}</div>
          </div>
        `;
      });

      // 4. 공동 기도 제목 리스트 생성
      let prayersHtml = '';
      data.prayers.forEach(pr => {
        prayersHtml += `
          <li>
            <strong>${pr.title}</strong>
            ${pr.desc}
          </li>
        `;
      });

      // 5. 전체 HTML 조립
      const contentHtml = `
        <!-- 1. 표지 -->
        <header class="hero fade-up" id="top">
          <div class="date-badge">${data.dateBadge}</div>
          <h1 class="serif">${data.titleHtml}</h1>
          <p class="hero-sub">${data.subtitle}</p>

          <div class="info-bar">
            <div class="info-item">
              <strong>본문</strong>
              <span>${data.bibleRange}</span>
            </div>
            <div class="info-item">
              <strong>찬송</strong>
              <span>${data.hymn}</span>
            </div>
          </div>
        </header>

        <!-- 2. 시작 기도 (요약) -->
        <section class="fade-up">
          <div class="card">
            <p style="font-size: 0.92rem; color: var(--gold-soft); font-style: italic;">
              "${data.openingPrayer}"
            </p>
          </div>
        </section>

        <!-- 3. 핵심 성경 본문 -->
        <section id="word" class="fade-up">
          <h2 class="sec-title serif">핵심 말씀 (${data.bibleRange})</h2>
          <div class="card serif">
            ${versesHtml}
            <details>
              <summary>${data.moreVersesLabel}</summary>
              <div class="details-content">${data.moreVersesHtml}</div>
            </details>
          </div>
        </section>

        <!-- 4. 설교 핵심 메시지 -->
        <section id="sermon">
          <h2 class="sec-title serif fade-up">오늘의 말씀 핵심</h2>
          ${pointsHtml}
        </section>

        <!-- 5. 공동 기도 제목 & 통성기도 -->
        <section id="prayer" class="fade-up">
          <h2 class="sec-title serif">오늘의 공동 기도 제목</h2>
          
          <div class="card">
            <ul class="prayer-list">${prayersHtml}</ul>
          </div>

          <div class="card cry-box fade-up">
            <span class="point-tag">새벽 합심 기도</span>
            <p style="font-size: 0.9rem; color: #fff;">${data.cryIntro}</p>
            <div class="cry-title serif">주여! 주여! 주여!</div>
            
            <p style="font-size: 0.9rem; color: var(--gold-soft); text-align: left; margin-top: 10px;">
              "${data.cryPrayer}"
            </p>
          </div>
        </section>
      `;

      document.getElementById('contentArea').innerHTML = contentHtml;
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // 스크롤 페이드업 재연결
      document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    }

    // 스크롤 페이드업 효과
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('show');
      });
    }, { threshold: 0.1 });

    renderApp(currentKey);

    // 하단 탭바 활성화 표시
    const links = document.querySelectorAll('.nav-link');
    const sections = ['top', 'word', 'sermon', 'prayer'];

    window.addEventListener('scroll', () => {
      let current = 'top';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 220) {
          current = id;
        }
      });
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    });

    // 별빛 배경 애니메이션
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random(),
        da: Math.random() * 0.015 + 0.005,
        dy: -(Math.random() * 0.2 + 0.05)
      });
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.y += s.dy;
        s.a += s.da;
        if (s.a > 0.9 || s.a < 0.1) s.da *= -1;
        if (s.y < 0) s.y = canvas.height;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 193, 88, ${s.a})`;
        ctx.fill();
      });
      requestAnimationFrame(drawStars);
    }
    drawStars();
  </script>
</body>
</html>