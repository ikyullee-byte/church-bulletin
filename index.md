<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2026.10.16 새벽기도회 | 헵시바와 쁄라</title>
  <!-- Google Fonts: 나눔명조 & 프리텐다드 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg-deep: #0b111e;
      --bg-card: rgba(20, 30, 50, 0.75);
      --gold-light: #f3e5ab;
      --gold-main: #d4af37;
      --gold-dark: #aa8010;
      --text-white: #f8f9fa;
      --text-muted: #b0b8c8;
      --accent-rose: #e09f9f;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

     html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Noto Sans KR', sans-serif;
      background-color: var(--bg-deep);
      color: var(--text-white);
      line-height: 1.8;
      overflow-x: hidden;
      position: relative;
    }

    /* 상단 스크롤 진행 바 */
    #progress-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      z-index: 1000;
    }

    #progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--gold-dark), var(--gold-light));
      width: 0%;
      transition: width 0.1s ease-out;
      box-shadow: 0 0 10px var(--gold-main);
    }

    /* 배경 캔버스 (별빛 효과) */
    #dawn-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: radial-gradient(circle at 50% 10%, #1a2744 0%, #0b111e 70%, #060911 100%);
    }

    /* 플로팅 네비게이션 */
    .floating-nav {
      position: fixed;
      right: 25px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 900;
    }

    .nav-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.3);
      border: 1px solid var(--gold-main);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-dot:hover, .nav-dot.active {
      background: var(--gold-main);
      transform: scale(1.3);
      box-shadow: 0 0 8px var(--gold-light);
    }

    .nav-dot span {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(11, 17, 30, 0.9);
      color: var(--gold-light);
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.75rem;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      border: 1px solid rgba(212, 175, 55, 0.3);
    }

    .nav-dot:hover span {
      opacity: 1;
    }

    @media (max-width: 768px) {
      .floating-nav {
        display: none;
      }
    }

    /* 타이포그래피 */
    h1, h2, h3, .serif {
      font-family: 'Nanum Myeongjo', serif;
    }

    /* 레이아웃 컨테이너 */
    .container {
      max-width: 860px;
      margin: 0 auto;
      padding: 0 24px;
    }

    section {
      padding: 90px 0;
      position: relative;
    }

    /* 히어로 섹션 (표지) */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 40px 20px;
      position: relative;
    }

    .badge {
      display: inline-block;
      padding: 6px 18px;
      border: 1px solid var(--gold-main);
      border-radius: 30px;
      color: var(--gold-light);
      font-size: 0.9rem;
      letter-spacing: 2px;
      margin-bottom: 24px;
      background: rgba(212, 175, 55, 0.1);
      animation: pulseGlow 3s infinite alternate;
    }

    @keyframes pulseGlow {
      0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); }
      100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.6); }
    }

    .hero h1 {
      font-size: clamp(2.2rem, 5vw, 3.6rem);
      font-weight: 800;
      line-height: 1.35;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #ffffff 0%, var(--gold-light) 60%, var(--gold-main) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      word-break: keep-all;
    }

    .hero-subtitle {
      font-size: clamp(1.1rem, 2.5vw, 1.4rem);
      color: var(--text-muted);
      margin-bottom: 40px;
      font-weight: 300;
    }

    .meta-box {
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 16px;
      padding: 24px 36px;
      display: inline-flex;
      flex-direction: column;
      gap: 10px;
      text-align: left;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.95rem;
    }

    .meta-label {
      color: var(--gold-main);
      font-weight: 700;
      min-width: 55px;
    }

    /* 스크롤 유도 아이콘 */
    .scroll-down {
      position: absolute;
      bottom: 35px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: var(--gold-light);
      font-size: 0.8rem;
      letter-spacing: 2px;
      opacity: 0.7;
      animation: bounce 2s infinite;
      text-decoration: none;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translate(-50%, 0); }
      40% { transform: translate(-50%, -10px); }
      60% { transform: translate(-50%, -5px); }
    }

    /* 스크롤 등장 애니메이션 클래스 */
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }

    /* 섹션 헤더 */
    .section-header {
      text-align: center;
      margin-bottom: 50px;
    }

    .section-num {
      font-family: 'Nanum Myeongjo', serif;
      color: var(--gold-main);
      font-size: 1rem;
      letter-spacing: 3px;
      display: block;
      margin-bottom: 10px;
    }

    .section-title {
      font-size: clamp(1.8rem, 4vw, 2.4rem);
      color: var(--gold-light);
      font-weight: 700;
      position: relative;
      display: inline-block;
      padding-bottom: 15px;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: var(--gold-main);
    }

    /* 카드 공통 스타일 */
    .card {
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 40px;
      margin-bottom: 30px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .card:hover {
      border-color: rgba(212, 175, 55, 0.4);
      transform: translateY(-4px);
    }

    /* 기도문 스타일 */
    .prayer-card {
      border-left: 4px solid var(--gold-main);
      background: linear-gradient(135deg, rgba(20, 30, 50, 0.85) 0%, rgba(15, 22, 38, 0.9) 100%);
    }

    .prayer-text p {
      margin-bottom: 20px;
      font-size: 1.08rem;
      line-height: 1.95;
      color: #e6e9f0;
      text-align: justify;
    }

    .prayer-text p:last-child {
      margin-bottom: 0;
      font-weight: 700;
      color: var(--gold-light);
    }

    /* 성경 본문 스타일 */
    .scripture-box {
      display: grid;
      gap: 16px;
    }

    .verse {
      display: flex;
      gap: 14px;
      padding: 14px 18px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.03);
      transition: background 0.3s ease;
    }

    .verse:hover {
      background: rgba(212, 175, 55, 0.08);
    }

    .verse.highlight-verse {
      background: rgba(212, 175, 55, 0.12);
      border: 1px solid rgba(212, 175, 55, 0.35);
    }

    .verse-num {
      color: var(--gold-main);
      font-weight: 700;
      font-family: 'Nanum Myeongjo', serif;
      min-width: 26px;
      padding-top: 2px;
    }

    .verse-text {
      font-family: 'Nanum Myeongjo', serif;
      font-size: 1.08rem;
      line-height: 1.75;
      color: #f1f3f5;
    }

    /* 설교 본문 포인트 카드 */
    .sermon-intro {
      background: rgba(212, 175, 55, 0.07);
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 40px;
      border: 1px dashed rgba(212, 175, 55, 0.35);
    }

    .quote-box {
      font-family: 'Nanum Myeongjo', serif;
      font-size: 1.12rem;
      color: var(--gold-light);
      padding: 20px 24px;
      margin: 24px 0;
      background: rgba(0, 0, 0, 0.25);
      border-left: 3px solid var(--gold-main);
      border-radius: 0 12px 12px 0;
      line-height: 1.8;
    }

    .point-badge {
      display: inline-block;
      background: var(--gold-main);
      color: #0b111e;
      font-weight: 800;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      margin-bottom: 14px;
    }

    .point-title {
      font-size: 1.55rem;
      color: var(--gold-light);
      margin-bottom: 24px;
      line-height: 1.4;
      word-break: keep-all;
    }

    .sermon-p {
      margin-bottom: 20px;
      font-size: 1.05rem;
      color: #d8dee9;
      line-height: 1.9;
    }

    .sermon-p strong {
      color: var(--gold-light);
      font-weight: 600;
    }

    /* 헵시바 & 쁄라 비교 카드 */
    .name-comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 30px 0;
    }

    @media (max-width: 640px) {
      .name-comparison {
        grid-template-columns: 1fr;
      }
      .card {
        padding: 26px 20px;
      }
    }

    .name-card {
      padding: 24px;
      border-radius: 16px;
      text-align: center;
    }

    .name-card.old {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-muted);
    }

    .name-card.new {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(224, 159, 159, 0.15));
      border: 1px solid var(--gold-main);
      box-shadow: 0 0 25px rgba(212, 175, 55, 0.15);
    }

    .name-card h4 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: var(--gold-light);
    }

    /* 공동 기도 제목 그리드 */
    .prayer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .topic-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: 16px;
      padding: 26px;
      transition: all 0.3s ease;
    }

    .topic-card:hover {
      background: rgba(212, 175, 55, 0.1);
      transform: translateY(-5px);
    }

    .topic-num {
      font-size: 0.85rem;
      color: var(--gold-main);
      font-weight: 700;
      margin-bottom: 8px;
      display: block;
    }

    .topic-title {
      font-size: 1.2rem;
      color: var(--gold-light);
      margin-bottom: 12px;
    }

    /* 통성기도 강조 박스 */
    .cry-prayer-box {
      background: linear-gradient(135deg, rgba(170, 128, 16, 0.2) 0%, rgba(20, 30, 50, 0.95) 100%);
      border: 2px solid var(--gold-main);
      border-radius: 20px;
      padding: 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .cry-call {
      font-family: 'Nanum Myeongjo', serif;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--gold-light);
      margin: 24px 0;
      letter-spacing: 4px;
      animation: glowText 2s infinite alternate;
    }

    @keyframes glowText {
      from { text-shadow: 0 0 5px rgba(212, 175, 55, 0.3); }
      to { text-shadow: 0 0 20px rgba(243, 229, 171, 0.9); }
    }

    footer {
      text-align: center;
      padding: 50px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
      font-size: 0.9rem;
    }
  </style>
</head>
<body>

  <!-- 상단 진행 표시줄 -->
  <div id="progress-container">
    <div id="progress-bar"></div>
  </div>

  <!-- 새벽 별빛 배경 캔버스 -->
  <canvas id="dawn-canvas"></canvas>

  <!-- 우측 플로팅 네비게이션 -->
  <nav class="floating-nav">
    <a href="#top" class="nav-dot active"><span>표지</span></a>
    <a href="#opening-prayer" class="nav-dot"><span>1. 시작 기도</span></a>
    <a href="#scripture" class="nav-dot"><span>2. 성경 본문</span></a>
    <a href="#sermon" class="nav-dot"><span>3. 설교 말씀</span></a>
    <a href="#closing-prayer" class="nav-dot"><span>4. 결단 기도</span></a>
    <a href="#joint-prayer" class="nav-dot"><span>5. 공동·통성기도</span></a>
  </nav>

  <!-- 0. 표지 (Hero Section) -->
  <header class="hero" id="top">
    <div class="badge">2026년 10월 16일 (금) 새벽기도회</div>
    <h1>헵시바와 쁄라,<br>신랑이 신부를 기뻐함 같이</h1>
    <p class="hero-subtitle">우리를 향하여 잠잠하지 않으시는 하나님의 열심과 사랑의 반전</p>

    <div class="meta-box">
      <div class="meta-item">
        <span class="meta-label">본문</span>
        <span>이사야 62장 1절 ~ 12절 (개역개정)</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">찬송</span>
        <span>210장 (시온성과 같은 교회), 550장 (시온의 영광이 빛나는 아침)</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">핵심</span>
        <span>쉬지 않으시는 하나님 · 새 이름(헵시바와 쁄라) · 구원의 기치</span>
      </div>
    </div>

    <a href="#opening-prayer" class="scroll-down">
      <span>SCROLL DOWN</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
      </svg>
    </a>
  </header>

  <main class="container">

    <!-- 1. 설교 전 시작 기도문 -->
    <section id="opening-prayer" class="reveal">
      <div class="section-header">
        <span class="section-num">PART 01</span>
        <h2 class="section-title">설교 전 시작 기도문</h2>
      </div>

      <div class="card prayer-card">
        <div class="prayer-text">
          <p>시온을 위하여 잠시도 쉬지 아니하시며 예루살렘을 위하여 잠잠하지 아니하시는 열심과 사랑의 하나님 아버지. 2026년 10월 16일 금요일, 어둠을 헤치고 이 거룩한 새벽의 제단으로 우리의 발걸음을 인도하여 주심에 감사를 드립니다. 한 주간의 삶을 마무리해 가는 이 금요일 아침, 세상의 거친 풍파와 분주함 속에서 고단해진 우리의 영혼을 주님의 따스한 품에 안아 주시고, 하늘의 영원한 생수로 채워 주시옵소서. 이 아침, 하늘 문을 활짝 여시고 주의 영으로 이 자리에 충만히 임하여 주시옵소서.</p>
          <p>사랑의 주님, 지난 하루의 삶을 되돌아봅니다. 우리는 여전히 세상의 눈으로 자신을 바라보며 스스로를 황무지와 같다고 낙심했고, 사람들의 평가에 흔들려 '버림받은 자'처럼 외로워하고 근심했던 불신앙을 고백합니다. 내 안에 거하시는 주님의 가치와 사랑을 잊은 채, 내 힘으로 무언가를 이루려 애쓰다 지쳐 버린 우리의 연약함을 불쌍히 여겨 주시옵소서. 이 시간 십자가의 보혈로 우리의 모든 죄와 허물을 깨끗이 씻어 주시고, 성령의 정결한 기름으로 우리의 영혼을 다시 새롭게 세워 주시옵소서.</p>
          <p>오늘 이사야 62장의 말씀을 통하여, 버려진 것 같던 우리 인생을 향해 '헵시바(나의 기쁨이 그에게 있다)'라 부르시고, 황폐했던 우리의 삶을 '쁄라(결혼한 여인)'라 칭하시는 하나님의 위대한 사랑과 반전의 역사를 묵상합니다. 신랑이 신부를 맞아 기뻐함 같이 우리를 기뻐하시는 주님의 음성이, 오늘 이 새벽 기도의 자리에 참여한 모든 성도들의 심령 깊은 곳에 울려 퍼지게 하옵소서.</p>
          <p>단 위에 세우신 종을 온전히 성령으로 사로잡으사 하나님의 마음과 권능의 말씀만을 온전히 대언하게 하시고, 이 말씀을 듣는 모든 성도가 영적 자신감을 회복하여 담대히 거룩한 기도의 파수꾼으로 일어서게 하옵소서. 감사를 드리며 우리를 구원하신 주 예수 그리스도의 이름으로 간절히 기도드리옵나이다. 아멘.</p>
        </div>
      </div>
    </section>

    <!-- 2. 성경 본문 -->
    <section id="scripture" class="reveal">
      <div class="section-header">
        <span class="section-num">PART 02</span>
        <h2 class="section-title">성경 본문 : 이사야 62:1-12</h2>
      </div>

      <div class="card">
        <div class="scripture-box">
          <div class="verse highlight-verse">
            <span class="verse-num">1</span>
            <span class="verse-text">나는 시온의 의가 빛 같이, 예루살렘의 구원이 횃불 같이 나타나도록 시온을 위하여 잠잠하지 아니하며 예루살렘을 위하여 쉬지 아니할 것인즉</span>
          </div>
          <div class="verse">
            <span class="verse-num">2</span>
            <span class="verse-text">이방 나라들이 네 공의를, 뭇 왕이 다 네 영광을 볼 것이요 너는 여호와의 입으로 정하실 새 이름으로 일컬음이 될 것이며</span>
          </div>
          <div class="verse">
            <span class="verse-num">3</span>
            <span class="verse-text">너는 또 여호와의 손의 아름다운 관, 네 하나님의 손의 왕관이 될 것이라</span>
          </div>
          <div class="verse highlight-verse">
            <span class="verse-num">4</span>
            <span class="verse-text">다시는 너를 버림 받은 자라 부르지 아니하며 다시는 네 땅을 황무지라 부르지 아니하고 오직 너를 헵시바라 하며 네 땅을 쁄라라 하리니 이는 여호와께서 너를 기뻐하실 것이며 네 땅이 결혼한 것처럼 될 것임이라</span>
          </div>
          <div class="verse highlight-verse">
            <span class="verse-num">5</span>
            <span class="verse-text">마치 청년이 처녀와 결혼함 같이 네 아들들이 너를 취하겠고 신랑이 신부를 기뻐함 같이 네 하나님이 너를 기뻐하시리라</span>
          </div>
          <div class="verse">
            <span class="verse-num">6</span>
            <span class="verse-text">예루살렘이여 내가 너의 성벽 위에 파수꾼을 세우고 그들로 하여금 주야로 계속 잠잠하지 않게 하였느니라 너희 여호와로 기억하시게 하는 자들아 너희는 쉬지 말며</span>
          </div>
          <div class="verse">
            <span class="verse-num">7</span>
            <span class="verse-text">또 여호와께서 예루살렘을 세워 세상에서 찬송을 받게 하시기까지 그로 쉬지 못하시게 하라</span>
          </div>
          <div class="verse">
            <span class="verse-num">8</span>
            <span class="verse-text">여호와께서 그 오른손, 그 능력의 팔로 맹세하시되 내가 다시는 네 곡식을 네 원수들에게 양식으로 주지 아니하겠고 네가 수고하여 얻은 포도주를 이방인이 마시지 못하게 할 것인즉</span>
          </div>
          <div class="verse">
            <span class="verse-num">9</span>
            <span class="verse-text">오직 추수한 자가 그것을 먹고 나 여호와를 찬송할 것이요 거둔 자가 그것을 나의 성소 뜰에서 마시리라 하셨느니라</span>
          </div>
          <div class="verse">
            <span class="verse-num">10</span>
            <span class="verse-text">성문으로 나아가라 나아가라 백성이 올 길을 닦으라 큰 길을 수축하고 수축하라 돌을 제하라 만민을 위하여 기치를 들라</span>
          </div>
          <div class="verse">
            <span class="verse-num">11</span>
            <span class="verse-text">여호와께서 땅 끝까지 선포하시되 너희는 딸 시온에게 이르라 보라 네 구원이 이르렀느니라 보라 상급이 그에게 있고 보응이 그 앞에 있느니라 하셨느니라</span>
          </div>
          <div class="verse highlight-verse">
            <span class="verse-num">12</span>
            <span class="verse-text">사람들이 너를 일컬어 거룩한 백성이라 여호와께서 구속하신 자라 하겠고 또 너를 일컬어 찾은 바 된 자요 버림 받지 아니한 성읍이라 하리라</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 설교 말씀 -->
    <section id="sermon">
      <div class="section-header reveal">
        <span class="section-num">PART 03</span>
        <h2 class="section-title">설교 말씀</h2>
      </div>

      <!-- 서론 -->
      <div class="sermon-intro reveal">
        <p class="sermon-p">사랑하는 성도 여러분, 한 주간의 모든 수고와 삶의 짐을 주님 앞에 내려놓고 나아온 복된 금요일 새벽입니다. 오늘도 어두운 새벽길을 걸어 이 거룩한 기도의 자리에 나오신 성도님들의 심령 위에, 우리를 향하여 한순간도 잠잠하지 않으시는 하나님의 뜨거운 사랑이 가득 차기를 주님의 이름으로 축원합니다.</p>
        <p class="sermon-p">어제 이사야 61장에서 우리는 성령의 기름 부으심으로 오신 메시아와, 슬픔이 기쁨으로 바뀌는 희년의 은혜를 함께 묵상했습니다. 그리고 61장은 이렇게 마무리되었습니다.</p>
        <div class="quote-box">
          "내가 여호와로 말미암아 크게 기뻐하며 내 영혼이 나의 하나님으로 말미암아 즐거워하리니 이는 그가 구원의 옷을 내게 입히시며 공의의 겉옷을 내게 더하심이 신랑이 사모를 쓰며 신부가 자기 보석으로 단장함 같게 하셨음이라" (사 61:10)
        </div>
        <p class="sermon-p" style="margin-bottom:0;">구원의 옷을 입고 신부처럼 단장한 백성의 모습으로 61장은 끝이 났습니다. 오늘 이어지는 이사야 62장은 바로 그 신부를 향한 신랑 하나님의 사랑이 터져 나오는 장입니다. 하나님은 여기서 당신의 백성에게 <strong>세 가지 은혜</strong>를 선포하십니다.</p>
      </div>

      <!-- 대지 1 -->
      <div class="card reveal">
        <span class="point-badge">첫째 은혜</span>
        <h3 class="point-title">1. 하나님은 우리를 위해 결코 쉬지 않으십니다 (1절, 6-7절)</h3>
        <div class="quote-box">
          "나는 시온의 의가 빛 같이, 예루살렘의 구원이 횃불 같이 나타나도록 시온을 위하여 잠잠하지 아니하며 예루살렘을 위하여 쉬지 아니할 것인즉" (1절)
        </div>
        <p class="sermon-p">여기서 우리는 참으로 놀라운 하나님의 모습을 봅니다. 하나님은 우리가 넘어졌을 때 "이제 너희는 끝났다" 하시고 등을 돌리시는 분이 아니라, 당신의 백성이 다시 일어나 빛나게 될 때까지 스스로 <strong>"잠잠하지 아니하며 쉬지 아니하겠다"</strong>고 선언하시는 분이십니다. 하나님께는 우리를 향한 '쉼'이 없으십니다.</p>
        <p class="sermon-p">이스라엘은 오랜 세월 하나님을 떠났고, 그 결과 예루살렘은 폐허가 되고 말았습니다. 그러나 하나님은 그 폐허를 바라보며 결코 침묵하지 않으셨습니다. 밤새 자녀의 이마를 짚으며 열이 내리기를 기다리는 어머니의 마음처럼, 하나님은 지금도 우리의 회복을 위하여 일하고 계십니다. 세상이 우리를 포기할 때에도 하나님은 우리를 포기하지 않으십니다. 이것이 오늘 우리가 붙들 소망입니다.</p>
        <div class="quote-box">
          "예루살렘이여 내가 너의 성벽 위에 파수꾼을 세우고 그들로 하여금 주야로 계속 잠잠하지 않게 하였느니라 너희 여호와로 기억하시게 하는 자들아 너희는 쉬지 말며 또 여호와께서 예루살렘을 세워 세상에서 찬송을 받게 하시기까지 그로 쉬지 못하시게 하라" (6-7절)
        </div>
        <p class="sermon-p">하나님은 성벽 위에 파수꾼을 세우시고 그들에게 주야로 쉬지 말고 기도하라고 명하십니다. 그리고 이어서 <strong>"너희 여호와로 기억하시게 하는 자들아"</strong>, 곧 하나님을 기억나게 하는 자들이 되어, 이제는 하나님께서 쉬지 못하시게 하라고까지 하십니다. 피조물의 부르짖음이 창조주의 손을 움직인다니, 이 얼마나 엄청난 특권입니까.</p>
        <p class="sermon-p" style="margin-bottom:0;">예수님도 이 진리를 불의한 재판관의 비유로 가르쳐 주셨습니다(눅 18:6-8). 밤낮 부르짖는 택하신 자들의 호소를 하나님이 외면하실 리 없으며, 반드시 속히 그들을 위하여 일하신다는 것입니다. 그러므로 오늘 새벽 여러분의 기도는 허공에 흩어지는 소리가 아닙니다. 그것은 우리를 향해 쉬지 않으시는 하나님의 열심과 정확히 만나는 거룩한 통로입니다. 우리가 이 자리에서 무릎을 꿇는 이 시간, 하늘에서는 이미 응답의 역사가 시작되고 있습니다.</p>
      </div>

      <!-- 대지 2 -->
      <div class="card reveal">
        <span class="point-badge">둘째 은혜</span>
        <h3 class="point-title">2. 우리는 버림받은 자가 아니라 '헵시바'와 '쁄라'입니다 (2-5절)</h3>
        <div class="quote-box">
          "너는 또 여호와의 손의 아름다운 관, 네 하나님의 손의 왕관이 될 것이라 다시는 너를 버림 받은 자라 부르지 아니하며 다시는 네 땅을 황무지라 부르지 아니하고 오직 너를 헵시바라 하며 네 땅을 쁄라라 하리니 이는 여호와께서 너를 기뻐하실 것이며 네 땅이 결혼한 것처럼 될 것임이라" (3-4절)
        </div>
        <p class="sermon-p">이스라엘의 과거는 참혹했습니다. 에스겔 선지자는 예루살렘을, 아무도 돌보지 않아 거리에 버려진 갓난아기와 같다고 묘사했습니다(에스겔 16장). 이름조차 없이 '버림받은 자', '황무지'로 불릴 수밖에 없었던 존재였습니다. 그런데 오늘 본문에서 하나님은 그 백성의 이름을 완전히 바꾸십니다.</p>

        <div class="name-comparison">
          <div class="name-card old">
            <h4>과거의 이름 (세상의 시선)</h4>
            <p>버림받은 자 (아즈바)<br>황무지 (쉐마마)</p>
          </div>
          <div class="name-card new">
            <h4>하나님이 주신 새 이름</h4>
            <p><strong>헵시바</strong> (나의 기쁨이 그에게 있다)<br><strong>쁄라</strong> (결혼한 여인 · 왕관)</p>
          </div>
        </div>

        <p class="sermon-p">성도 여러분, 이 두 이름은 하나님이 우리를 어떻게 보시는지를 보여 주는 안경과 같습니다. 세상은 우리를 능력 없고 부족한 사람, 실패한 인생이라 부를지 모릅니다. 그러나 더 큰 문제는 우리가 스스로 그 이름을 받아들이는 것입니다. 스스로를 향해 "나는 안 된다, 나는 버림받은 사람이다"라고 되뇌이며 살아갑니다. 그러나 오늘 본문은 선언합니다. <strong>우리는 버려진 자가 아니라 여호와의 손에 들린 아름다운 왕관이며, 하나님께서 기뻐하시는 신부입니다.</strong></p>
        <p class="sermon-p" style="margin-bottom:0;">흥미롭게도 '헵시바'라는 이름은 훗날 유다 왕 므낫세의 어머니의 실제 이름이 됩니다(왕하 21:1). 어두운 시대에 한 가정이 자녀에게 '하나님의 기쁨'이라는 이름을 붙여 준 것입니다. 신랑 되신 그리스도와 신부 된 성도의 이 사랑은 요한계시록의 어린양의 혼인 잔치(계 19:7)에서 완성됩니다. 그러므로 이 새벽에 드리는 예배는 언젠가 완성될 그 혼인 잔치를 미리 맛보는 시간입니다.</p>
      </div>

      <!-- 대지 3 -->
      <div class="card reveal">
        <span class="point-badge">셋째 은혜</span>
        <h3 class="point-title">3. 회복된 백성에게 구원의 기치를 들게 하십니다 (10-12절)</h3>
        <div class="quote-box">
          "성문으로 나아가라 나아가라 백성이 올 길을 닦으라 큰 길을 수축하고 수축하라 돌을 제하라 만민을 위하여 기치를 들라 ... 사람들이 너를 일컬어 거룩한 백성이라 여호와께서 구속하신 자라 하겠고 또 너를 일컬어 찾은 바 된 자요 버림 받지 아니한 성읍이라 하리라" (10, 12절)
        </div>
        <p class="sermon-p">사랑받고 회복된 백성에게는 사명이 주어집니다. 바로 <strong>'나아가라'</strong>는 것입니다. 하나님은 그들에게 포로로 잡혀 있던 백성이 돌아올 길을 닦고, 그 길 위에 놓인 돌들을 제하고, 만민을 위하여 구원의 기치를 들라고 명하십니다. 이는 이사야 40장 3절에서 "너희는 광야에서 여호와의 길을 예비하라" 하신 말씀과 같은 사명입니다. 하나님은 구원받은 자를 그냥 두지 않으시고, 다른 사람의 회복을 준비하는 <strong>'길 닦는 자'</strong>로 세우십니다.</p>
        <p class="sermon-p">그리고 기치, 곧 깃발을 들라고 하십니다. 이사야 11장 10절은 장차 오실 그리스도를 가리켜 "만민의 기치로 설 것"이라고 예언합니다. 결국 우리가 드는 기치는 우리 자신의 업적이 아니라 <strong>예수 그리스도 한 분</strong>이십니다. 그분을 높이는 삶이 곧 기치를 드는 삶입니다.</p>
        <p class="sermon-p" style="margin-bottom:0;">12절에서 하나님은 회복된 백성을 다시 세 개의 이름으로 불러 주십니다. <strong>'거룩한 백성', '여호와께서 구속하신 자', '찾은 바 된 자요 버림 받지 아니한 성읍'</strong>입니다. 시작은 버림받은 황무지였으나, 마지막에는 하나님께 찾아진 거룩한 성읍이 되었습니다. 이것이 하나님의 방식이며, 하나님께서 우리에게 쓰고 계신 이야기입니다.</p>
      </div>

      <!-- 결론 -->
      <div class="card reveal" style="border: 1px solid var(--gold-main);">
        <h3 class="point-title" style="text-align: center;">[결론] 오늘 우리가 붙들어야 할 세 가지 결단</h3>
        <p class="sermon-p"><strong>첫째, 기도의 파수꾼으로 서십시오.</strong><br>우리가 실패하고 넘어져도 하나님은 결코 우리를 포기하지 않으시고 일을 멈추지 않으십니다. 우리 가정과 교회와 이 민족의 성벽 위에 서서, 응답이 올 때까지 주야로 부르짖는 기도의 파수꾼이 되시기 바랍니다.</p>
        <p class="sermon-p"><strong>둘째, '헵시바'와 '쁄라'의 정체성으로 살아가십시오.</strong><br>세상이 붙여 준 이름과 스스로 붙여 준 낙심의 이름을 다 내려놓으십시오. 하나님의 손에 들린 아름다운 왕관으로, 하나님의 기쁨이 되는 신부로 오늘을 살아가시기 바랍니다.</p>
        <p class="sermon-p"><strong>셋째, 길을 닦고 구원의 기치를 높이 드십시오.</strong><br>회복된 이 자리에서 걸림돌을 제하며, 우리의 가정과 일터, 만나는 모든 사람에게 그리스도의 구원의 기치가 보이게 하십시오.</p>
        <p class="sermon-p" style="text-align: center; color: var(--gold-light); font-weight: 700; margin-bottom: 0;">오늘 하루, 나를 '헵시바'라 부르시는 주님의 사랑을 품고 담대히 기도하며 승리하는 성도님들이 되시기를 주 예수 그리스도의 이름으로 간절히 축원합니다.</p>
      </div>
    </section>

    <!-- 4. 설교 후 결단 기도문 -->
    <section id="closing-prayer" class="reveal">
      <div class="section-header">
        <span class="section-num">PART 04</span>
        <h2 class="section-title">설교 후 결단 기도문</h2>
      </div>

      <div class="card prayer-card">
        <div class="prayer-text">
          <p>우리를 향한 사랑과 열심을 그치지 아니하시며, 우리를 '헵시바'와 '쁄라'라 부르시는 신실하신 하나님 아버지. 오늘 이 아침, 이사야 62장의 가슴 설레는 사랑의 고백을 통해 고단했던 우리의 영혼을 어루만져 주시고 하늘의 신령한 위로를 더하여 주시니 감사를 드립니다.</p>
          <p>주님, 고백하건대 우리는 세상의 평가와 비교 앞에서 스스로를 버림받은 자로 여겼고, 쉬지 않고 역사하시는 주님의 열심을 잊은 채 낙심하며 지쳐 살았습니다. 그런 우리를 오늘 다시 불러 주시고 새 이름을 주시니, 그 은혜 앞에 머리를 숙입니다.</p>
          <p>우리를 위해 잠잠하지 아니하시고 쉬지 아니하시는 주님의 그 신실하신 열심을 바라봅니다. 오늘 우리도 성벽 위의 파수꾼이 되어 교회를 위해, 가정을 위해, 이 나라와 민족을 위해 쉬지 않고 부르짖는 기도의 파수꾼이 되게 하옵소서. 세상의 가치관으로 나 자신을 평가하지 않게 하시고, 여호와의 손에 들린 아름다운 왕관으로 나를 바라보게 하옵소서.</p>
          <p>오늘 하루 만나는 모든 사람들에게 주님의 사랑을 전하게 하시고, 우리의 일터와 삶의 자리가 주님의 기쁨이 되는 거룩한 성읍이 되게 하옵소서. 특별히 근심과 질병 가운데 지쳐 있는 성도들과 환우들에게 위로와 새 힘을 더하여 주시옵소서. 우리를 기뻐하시는 신랑 되신 예수 그리스도의 이름으로 간절히 기도드리옵나이다. 아멘.</p>
        </div>
      </div>
    </section>

    <!-- 5. 공동 기도 제목과 통성기도문 -->
    <section id="joint-prayer" class="reveal">
      <div class="section-header">
        <span class="section-num">PART 05</span>
        <h2 class="section-title">오늘의 공동 기도 제목 및 통성기도</h2>
      </div>

      <div class="prayer-grid">
        <div class="topic-card">
          <span class="topic-num">PRAYER 01</span>
          <h4 class="topic-title">기쁨과 사랑의 정체성 회복을 위하여</h4>
          <p class="sermon-p" style="margin-bottom:0; font-size:0.95rem;">세상의 비난이나 자책에서 벗어나, 나를 '헵시바'와 '쁄라'라 부르시는 하나님의 절대적인 사랑을 확신하게 하소서.</p>
        </div>
        <div class="topic-card">
          <span class="topic-num">PRAYER 02</span>
          <h4 class="topic-title">쉬지 않는 기도의 파수꾼으로 서기 위하여</h4>
          <p class="sermon-p" style="margin-bottom:0; font-size:0.95rem;">가정과 교회, 이 민족의 성벽 위에 깨어 있는 파수꾼으로 서서, 주님이 역사하실 때까지 쉬지 않고 기도하게 하소서.</p>
        </div>
        <div class="topic-card">
          <span class="topic-num">PRAYER 03</span>
          <h4 class="topic-title">영적 회복과 만민을 향한 기치를 들기 위하여</h4>
          <p class="sermon-p" style="margin-bottom:0; font-size:0.95rem;">무너진 삶의 자리에서 길을 닦고 돌을 제하며, 세상 가운데 구원의 기치를 높이 들게 하소서.</p>
        </div>
        <div class="topic-card">
          <span class="topic-num">PRAYER 04</span>
          <h4 class="topic-title">환우와 지친 성도들의 회복을 위하여</h4>
          <p class="sermon-p" style="margin-bottom:0; font-size:0.95rem;">근심과 질병, 경제적 어려움 가운데 있는 성도들의 가정과 일터를 붙드시고, 그 삶에 새 힘과 회복의 역사가 일어나게 하소서.</p>
        </div>
      </div>

      <div class="cry-prayer-box">
        <span class="point-badge">새벽 합심 통성기도문</span>
        <p class="sermon-p" style="color: #fff;">"오늘 이 아침, 나를 기뻐하시는 하나님의 음성을 듣고 거룩한 기도의 파수꾼으로 바로 서게 해달라고,<br>우리 다 함께 주여 세 번 부르짖고 통성으로 기도합시다!"</p>
        <div class="cry-call">주여! 주여! 주여!</div>
        <div class="prayer-text" style="text-align: left; margin-top: 30px;">
          <p>"우리를 사랑하시되 끝까지 사랑하시며, 우리를 위하여 잠시도 쉬지 아니하시는 전능하신 하나님 아버지! 2026년 10월 16일 금요일 이 거룩한 새벽, 우리를 기도의 자리로 부르시고 이사야 62장의 사랑의 말씀을 들려주시니 진심으로 감사를 드립니다!</p>
          <p>주님! 우리가 얼마나 존귀한 존재인지를 깨닫게 하옵소서! 우리는 더 이상 버림받은 자가 아니라, 주님이 보혈로 사신 아름다운 왕관이며 주님이 기뻐하시는 신부임을 기억하며, 세상 속에서 낙심하지 않고 담대히 서게 하여 주시옵소서!</p>
          <p>주님! 우리를 사랑하시느라 쉬지 않으시는 주님의 열심 앞에, 우리도 파수꾼으로 일어나기를 원합니다! 진리의 성벽 위에 서서 주님이 역사하실 때까지 주야로 부르짖는 기도의 용사가 되게 하시고, 우리의 가정과 교회와 이 나라 민족과 병상에 누운 환우들을 위하여 쉬지 않고 부르짖게 하여 주시옵소서! 오늘 하루의 모든 걸음 속에서 주님의 기쁨이 되게 하시고, 부르짖는 모든 기도가 하늘 보좌에 상달되게 하옵소서. 예수 그리스도의 이름으로 간절히 부르짖어 기도드립니다! 아멘!"</p>
        </div>
      </div>
    </section>

  </main>

  <footer>
    <p>2026년 10월 16일 (금) 새벽기도회 말씀 묵상 자료</p>
    <p style="margin-top: 6px; color: var(--gold-main);">"신랑이 신부를 기뻐함 같이 네 하나님이 너를 기뻐하시리라 (이사야 62:5)"</p>
  </footer>

  <!-- 자바스크립트: 별빛 애니메이션 & 스크롤 인터랙션 -->
  <script>
    // 1. 새벽 별빛 캔버스 배경 애니메이션
    const canvas = document.getElementById('dawn-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.8 + 0.1;
        this.speedY = -(Math.random() * 0.25 + 0.05);
        this.twinkleSpeed = Math.random() * 0.015 + 0.005;
        this.twinkleDir = 1;
      }
      update() {
        this.y += this.speedY;
        this.alpha += this.twinkleSpeed * this.twinkleDir;
        if (this.alpha >= 0.9 || this.alpha <= 0.15) {
          this.twinkleDir *= -1;
        }
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 229, 171, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#d4af37';
        ctx.fill();
      }
    }

    for (let i = 0; i < 85; i++) {
      stars.push(new Star());
    }

    function animateStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      requestAnimationFrame(animateStars);
    }
    animateStars();

    // 2. 스크롤 등장 효과 (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. 상단 스크롤 진행 바 및 우측 네비게이션 활성화
    const progressBar = document.getElementById('progress-bar');
    const sections = document.querySelectorAll('header, section');
    const navDots = document.querySelectorAll('.nav-dot');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';

      let currentSectionId = 'top';
      sections.forEach(sec => {
        const top = sec.offsetTop - 250;
        if (scrollTop >= top) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href') === '#' + currentSectionId) {
          dot.classList.add('active');
        }
      });
    });
  </script>
</body>
</html>