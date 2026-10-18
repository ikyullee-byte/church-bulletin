<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2026. 10. 18 주일 말씀 묵상 및 성경공부 - 원종제일교회</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Noto Sans KR', sans-serif; }
        .serif-title { font-family: 'Noto Serif KR', serif; }
        .check-custom:checked + span { text-decoration: line-through; color: #9ca3af; }
    </style>
</head>
<body class="bg-stone-100 text-stone-800 leading-relaxed">

    <!-- [상단 네비게이션 & 띠 배너] -->
    <div id="top-notice-bar" class="sticky top-0 z-50 bg-slate-900 text-white px-4 py-3 shadow-md border-b border-slate-800">
        <div class="max-w-4xl mx-auto flex items-center justify-between gap-2 text-xs sm:text-sm">
            <a href="index.html" class="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-3 py-1.5 rounded-lg transition border border-slate-700 shrink-0">
                &larr; 스마트 주보로 돌아가기
            </a>
            <div class="flex items-center gap-2 truncate">
                <span id="bar-badge" class="bg-emerald-400 text-slate-950 font-bold px-2 py-0.5 rounded text-xs shrink-0">열람 가능</span>
                <span class="hidden sm:inline truncate">[10/18 주일예배] <strong>신앙의 본질: 느후스단을 부수라</strong></span>
            </div>
        </div>
    </div>

    <div class="max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
        
        <!-- 1. 공통 헤더 -->
        <header class="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg mb-8">
            <div class="flex flex-wrap items-center gap-2 text-amber-400 text-sm font-medium mb-3">
                <span>2026년 10월 18일 주일 오전예배</span>
                <span>•</span>
                <span>오순절 후 스물두 번째 주일</span>
            </div>
            <h1 class="serif-title text-2xl sm:text-4xl font-bold leading-snug mb-2">
                신앙의 본질: 은혜의 유산이 우상이 될 때
            </h1>
            <p class="text-slate-300 text-lg sm:text-xl font-light mb-6">
                — 느후스단을 부수라 —
            </p>
            <div class="border-t border-slate-700 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-slate-300">
                <div><strong class="text-white">본문:</strong> 열왕기하 18장 1~8절 (핵심요절: 4절, 6절)</div>
                <div><strong class="text-white">설교:</strong> 이성결 목사 (원종제일교회)</div>
            </div>
        </header>

        <!-- 2. 오후 1시 이전 대기 화면 (Lock Screen) -->
        <div id="lock-screen" class="hidden bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-stone-200 text-center my-8">
            <div class="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
                ⛪
            </div>
            <span class="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                예배 집중 및 말씀 묵상 안내
            </span>
            <h2 class="serif-title text-2xl sm:text-3xl font-bold text-slate-900 mt-4 mb-3">
                주일 오후 1시부터 열람하실 수 있습니다
            </h2>
            <p class="text-stone-600 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                성도님들의 온전한 주일 오전예배 집중을 위해, 설교 핵심 리뷰와 구역 성경공부·주간 실천 가이드는 <strong>오전예배 및 친교가 마무리되는 오후 1시 정각</strong>에 자동으로 공개됩니다.
            </p>

            <div class="bg-stone-50 border border-stone-200 rounded-xl p-5 max-w-md mx-auto mb-8">
                <p class="text-xs text-stone-500 font-medium mb-2">공개까지 남은 시간 (2026. 10. 18 13:00 기준)</p>
                <div id="countdown-timer" class="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight font-mono">
                    계산 중...
                </div>
            </div>

            <div class="bg-amber-50/60 border border-amber-200/80 rounded-xl p-5 max-w-xl mx-auto text-left text-sm text-stone-700">
                <p class="font-bold text-amber-900 mb-1">🙏 예배로 부름 (시편 62:5-6, 8)</p>
                <p class="leading-relaxed">
                    "나의 영혼아 잠잠히 하나님만 바라라 무릇 나의 소망이 그로부터 나오는도다 오직 그만이 나의 반석이시요 나의 구원이시요 나의 요새이시니 내가 흔들리지 아니하리로다. 백성들아 시시로 그를 의지하고 그의 앞에 마음을 토하라 하나님은 우리의 피난처시로다"
                </p>
            </div>
        </div>

        <!-- 3. 본문 콘텐츠 -->
        <main id="main-content">
            
            <!-- 본문 말씀 박스 -->
            <section class="bg-amber-50/80 border-l-4 border-amber-600 p-5 rounded-r-xl mb-10 text-stone-700 text-sm sm:text-base shadow-sm">
                <p class="font-semibold text-amber-900 mb-2">📖 오늘의 핵심 말씀 (열왕기하 18:4, 6)</p>
                <p class="mb-2">"그가 여러 산당들을 제거하며 주상을 깨뜨리며 아세라 목상을 찍으며 모세가 만들었던 놋뱀을 이스라엘 자손이 이때까지 향하여 분향하므로 그것을 부수고 <strong>느후스단</strong>이라 일컬었더라"</p>
                <p>"곧 그가 <strong>여호와께 연합하여</strong> 그에게서 떠나지 아니하고 여호와께서 모세에게 명령하신 계명을 지켰더라"</p>
            </section>

            <!-- 설교 리뷰 -->
            <section class="mb-12">
                <div class="flex items-center gap-2 mb-6">
                    <span class="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Sermon Review</span>
                    <h2 class="serif-title text-2xl font-bold text-slate-900">말씀 핵심 리뷰</h2>
                </div>

                <div class="bg-white rounded-xl p-6 shadow-sm border border-stone-200 mb-6">
                    <p class="text-stone-600 mb-4">
                        우리를 보시며 손주 재롱을 보듯 기쁨을 이기지 못하시는(습 3:17) 하나님 아버지의 눈빛을 잊어버릴 때, 우리 마음에는 내일에 대한 불안이 찾아옵니다. 불안한 시대는 눈에 보이는 '부적'을 찾지만, 히스기야 왕은 위기 앞에서 오히려 가짜 안전장치들을 부수고 신앙의 본질(근본)로 돌아갔습니다.
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div class="bg-stone-50 p-5 rounded-lg border border-stone-200">
                            <div class="text-amber-700 font-bold text-sm mb-1">첫째 교훈</div>
                            <h3 class="font-bold text-lg text-slate-900 mb-2">은혜의 통로가 우상으로 변할 때</h3>
                            <p class="text-sm text-stone-600">
                                출애굽 광야에서 생명을 살렸던 '모세의 놋뱀'도 은혜 주신 하나님을 잊어버리자 미신적인 부적으로 전락했습니다. 불안할 때마다 만지는 손끝의 '말랑이'나, 과거의 은혜·직분·습관적 예배를 부적처럼 의지하는 마음을 점검해야 합니다.
                            </p>
                        </div>
                        <div class="bg-stone-50 p-5 rounded-lg border border-stone-200">
                            <div class="text-amber-700 font-bold text-sm mb-1">둘째 교훈</div>
                            <h3 class="font-bold text-lg text-slate-900 mb-2">‘느후스단(놋조각)’이라 선포하라</h3>
                            <p class="text-sm text-stone-600">
                                히스기야는 700년 된 성물이라도 하나님 자리를 대신하자 산산조각(카타트) 내고 '느후스단(한낱 구리 조각)'이라 선포했습니다. 세상의 안전망과 물질은 도구일 뿐 구원자가 아닙니다. 하나님보다 더 의지하던 가짜 부적을 깨뜨리는 용기가 필요합니다.
                            </p>
                        </div>
                        <div class="bg-stone-50 p-5 rounded-lg border border-stone-200">
                            <div class="text-amber-700 font-bold text-sm mb-1">셋째 교훈</div>
                            <h3 class="font-bold text-lg text-slate-900 mb-2">진짜 근본: 연합(다바크)과 충성</h3>
                            <p class="text-sm text-stone-600">
                                가짜를 부순 빈자리를 하나님과 강력하게 딱 붙어 있는 연합(다바크)으로 채웠습니다. 십자가에서 몸을 깨뜨리신 진짜 실체 예수 그리스도를 붙들고, 말씀과 기도의 기본기(근본) 위에 내가 선 작은 자리에서 주님께 하듯 충성할 때 참된 형통이 임합니다.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 비교 표 -->
                <div class="overflow-x-auto bg-white rounded-xl shadow-sm border border-stone-200">
                    <table class="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr class="bg-slate-800 text-white">
                                <th class="p-3 sm:p-4 font-semibold border-b border-slate-700">구분</th>
                                <th class="p-3 sm:p-4 font-semibold border-b border-slate-700">민수기 21장 (광야의 구원)</th>
                                <th class="p-3 sm:p-4 font-semibold border-b border-slate-700">열왕기하 18장 (700년 후 변질)</th>
                                <th class="p-3 sm:p-4 font-semibold border-b border-slate-700 bg-amber-700">히스기야의 개혁 (본질 회복)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-200 text-stone-700">
                            <tr>
                                <td class="p-3 sm:p-4 font-bold bg-stone-50">놋뱀의 의미</td>
                                <td class="p-3 sm:p-4">하나님의 약속을 바라보게 하는 은혜의 통로(표지판)</td>
                                <td class="p-3 sm:p-4">그 자체로 복을 주고 재앙을 막아준다고 믿는 부적(우상)</td>
                                <td class="p-3 sm:p-4 font-medium text-slate-900">은혜가 떠난 한낱 구리 파편, ‘느후스단(놋조각)’</td>
                            </tr>
                            <tr>
                                <td class="p-3 sm:p-4 font-bold bg-stone-50">구원의 능력</td>
                                <td class="p-3 sm:p-4">"그것을 보면 살리라" 하신 하나님의 말씀</td>
                                <td class="p-3 sm:p-4">놋뱀 앞에 습관처럼 바치는 사람의 향 연기(분향)</td>
                                <td class="p-3 sm:p-4 font-medium text-slate-900">가짜 부적을 부수고 오직 하나님께 딱 붙어 있음(연합)</td>
                            </tr>
                            <tr>
                                <td class="p-3 sm:p-4 font-bold bg-stone-50">오늘의 적용</td>
                                <td class="p-3 sm:p-4">예수님의 십자가 사랑을 믿고 순종하는 살아있는 믿음</td>
                                <td class="p-3 sm:p-4">예배와 헌금을 액운 막는 보험처럼 여김, 세상 안전망 의지</td>
                                <td class="p-3 sm:p-4 font-medium text-amber-900 bg-amber-50/50">미신적 태도를 버리고 말씀·기도·작은 충성의 ‘근본’ 회복</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 성경공부 및 구역 나눔 교재 -->
            <section class="mb-12">
                <div class="flex items-center gap-2 mb-6">
                    <span class="bg-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Bible Study</span>
                    <h2 class="serif-title text-2xl font-bold text-slate-900">성경공부 및 구역 모임 나눔지</h2>
                </div>

                <div class="bg-white rounded-xl p-6 shadow-sm border border-stone-200 space-y-6">
                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 class="font-bold text-slate-800 mb-3">🔍 성경 원어 돋보기</h3>
                        <ul class="space-y-2 text-sm text-stone-700">
                            <li>• <strong>카타르 (분향하다, 4절):</strong> 일시적인 행위가 아니라, 습관적이고 지속적으로 향 연기를 피워 올리며 복을 비는 미신적 숭배 행위를 뜻합니다.</li>
                            <li>• <strong>카타트 (부수다, 4절):</strong> 대장장이가 망치로 쇠를 내리쳐 원래 형태를 알아볼 수 없도록 완전히 가루로 빻아버리는 단호한 결단을 의미합니다.</li>
                            <li>• <strong>느후스단 (놋조각, 4절):</strong> '놋/구리(네호셰트)'에 경멸의 접미사를 붙여 "이것은 신령한 뱀이 아니라 그저 차가운 구리 조각일 뿐이다"라고 본질을 폭로한 선언입니다.</li>
                            <li>• <strong>다바크 (연합하여, 6절):</strong> 가죽과 가죽을 강력한 아교로 붙여 떼어내면 살점이 찢어질 만큼 완전히 밀착된 상태(창 2:24 부부의 한 몸 이룸)를 뜻합니다.</li>
                        </ul>
                    </div>

                    <div class="space-y-4">
                        <h3 class="font-bold text-lg text-slate-900 border-b pb-2">💬 말씀과 삶 나눔 질문</h3>
                        <div class="p-4 rounded-lg bg-stone-50">
                            <p class="font-bold text-slate-800 mb-1">질문 1. [마음 열기]</p>
                            <p class="text-sm text-stone-600">요즘 내 마음을 가장 불안하게 만드는 일은 무엇입니까? 마음이 복잡하거나 답답할 때 내가 습관적으로 찾거나 의지하는 나만의 '말랑이(작은 위안거리)'가 있다면 함께 나누어 봅시다.</p>
                        </div>
                        <div class="p-4 rounded-lg bg-stone-50">
                            <p class="font-bold text-slate-800 mb-1">질문 2. [말씀 깊이 보기 - 느후스단]</p>
                            <p class="text-sm text-stone-600">모세의 놋뱀은 하나님이 명하신 귀한 성물이었지만, 백성들이 하나님 대신 놋뱀 자체를 의지하자 우상이 되었습니다. 오늘날 우리가 하나님과의 인격적인 교제 없이 '부적'이나 '보험 증권'처럼 의지하기 쉬운 종교적 습관이나 세상의 안전장치(물질, 건강, 자녀 등)는 무엇입니까?</p>
                        </div>
                        <div class="p-4 rounded-lg bg-stone-50">
                            <p class="font-bold text-slate-800 mb-1">질문 3. [말씀 적용하기 - 다바크와 근본]</p>
                            <p class="text-sm text-stone-600">히스기야는 놋뱀을 부순 자리를 '하나님과의 연합(다바크)'과 '계명 순종'으로 채웠습니다. 세상의 화려한 유행이나 조급한 속도에 휩쓸리지 않고, 이번 한 주간 내가 다시 회복해야 할 신앙의 기본기(근본)와 정성을 다해 충성해야 할 '작은 자리'는 어디입니까?</p>
                        </div>
                        <div class="p-4 rounded-lg bg-stone-50">
                            <p class="font-bold text-slate-800 mb-1">질문 4. [복음의 핵심]</p>
                            <p class="text-sm text-stone-600">광야의 놋뱀은 그림자였고, 진짜 실체는 십자가에서 우리 죄를 대신해 스스로 몸을 깨뜨리신 예수 그리스도이십니다(요 3:14~15). 내 인생의 운전대를 예수님께 온전히 맡길 때 누리게 되는 평안에 대해 함께 이야기해 봅시다.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 주간 묵상 및 삶의 실천 가이드 -->
            <section class="mb-12">
                <div class="flex items-center gap-2 mb-6">
                    <span class="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Action Plan</span>
                    <h2 class="serif-title text-2xl font-bold text-slate-900">한 주간의 묵상과 실천</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                        <h3 class="font-bold text-lg text-slate-900 mb-4">✅ 이번 주간 나의 실천 체크리스트 (클릭해 보세요)</h3>
                        <div class="space-y-3 text-sm">
                            <label class="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" class="check-custom mt-1 w-4 h-4 accent-emerald-700 rounded">
                                <span><strong>내 안의 '느후스단' 이름 부르기:</strong> 불안할 때 하나님보다 먼저 찾던 세상 안전장치 앞에서 "이것은 한낱 놋조각일 뿐이다, 나의 구원은 오직 주님이시다" 선포하기</span>
                            </label>
                            <label class="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" class="check-custom mt-1 w-4 h-4 accent-emerald-700 rounded">
                                <span><strong>신앙의 '근본' 회복하기:</strong> 매일 정해진 시간, 투박하더라도 말씀 한 장을 소리 내어 읽고 주님께 마음을 토하는 기도 시간 갖기 (시 62:8)</span>
                            </label>
                            <label class="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" class="check-custom mt-1 w-4 h-4 accent-emerald-700 rounded">
                                <span><strong>작은 자리에서 '충성' 다하기:</strong> 가정의 가사일, 일터의 업무, 교회의 보이지 않는 봉사 자리에서 "주님께 하듯"(골 3:23) 기쁨과 정성으로 섬기기</span>
                            </label>
                            <label class="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" class="check-custom mt-1 w-4 h-4 accent-emerald-700 rounded">
                                <span><strong>인생의 운전대 맡기기:</strong> 세상의 빠른 속도와 비교하며 조급해질 때마다 "주님, 제 인생의 방향과 운전대를 주님께 맡깁니다" 고백하기</span>
                            </label>
                        </div>
                    </div>

                    <div class="bg-emerald-950 text-emerald-50 rounded-xl p-6 shadow-sm">
                        <h3 class="font-bold text-lg text-white mb-4">🙏 함께 모으는 중보기도</h3>
                        <ul class="space-y-3 text-sm text-emerald-100/90 leading-relaxed">
                            <li>
                                <strong class="text-amber-300">• 신앙의 본질 회복을 위해:</strong>
                                우리 원종제일교회 모든 성도가 습관적인 종교생활을 벗어버리고, 살아계신 하나님 아버지께 딱 붙어 살아가는(다바크) 참된 믿음의 용기를 갖도록
                            </li>
                            <li>
                                <strong class="text-amber-300">• 환우들의 치유와 회복을 위해:</strong>
                                병상에서 주님의 긍휼을 바라보는 <strong>한용희 권사님, 박성심 권사님</strong>께 여호와 라파 치료의 광선을 비추어 주사 속히 회복되어 성전의 마당을 밟게 하시도록
                            </li>
                            <li>
                                <strong class="text-amber-300">• 다음 세대의 비상을 위해:</strong>
                                교회의 소망인 <strong>임선우 군</strong>과 다음 세대에게 다니엘의 절개와 요셉의 명철, 다윗의 담대함을 부어주셔서 시대를 살리는 믿음의 거장으로 서도록
                            </li>
                            <li>
                                <strong class="text-amber-300">• 사회의 안전과 이웃의 치유를 위해:</strong>
                                불안하고 상처 입은 이 땅을 불쌍히 여겨 주시고, 인천 구월동 사건으로 다친 피해자들과 중환자실의 청년을 주님의 못 자국 난 손으로 어루만져 살려주시도록
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 마무리 기도문 -->
            <footer class="bg-white border border-stone-200 rounded-xl p-6 text-center shadow-sm">
                <p class="serif-title font-bold text-slate-800 mb-2">함께 드리는 결단의 기도</p>
                <p class="text-sm text-stone-600 max-w-2xl mx-auto italic mb-6">
                    "우리를 위해 십자가에서 친히 몸을 깨뜨리신 주님, 내일이 두려워 붙잡고 있던 세상의 헛된 놋조각들을 오늘 십자가 아래 다 내려놓습니다. 세상의 빠른 속도를 부러워하지 않고 내 인생의 운전대를 주님께 온전히 맡겨드리오니, 이번 한 주간도 말씀과 기도의 자리에서 주님과 딱 붙어 동행하게 하옵소서. 예수님의 이름으로 기도합니다. 아멘."
                </p>
                <a href="index.html" class="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition">
                    &larr; 스마트 주보 메인으로 돌아가기
                </a>
            </footer>

        </main>
    </div>

    <script>
        // 2026년 10월 18일 오후 1시(13:00:00) 기준 자동 공개 타이머
        const unlockTime = new Date("2026-10-18T13:00:00+09:00").getTime();

        function checkLockStatus() {
            const now = new Date().getTime();
            const lockScreen = document.getElementById('lock-screen');
            const mainContent = document.getElementById('main-content');
            const barBadge = document.getElementById('bar-badge');
            const timerEl = document.getElementById('countdown-timer');

            if (now < unlockTime) {
                // 오후 1시 이전: 잠금 화면 표시
                lockScreen.classList.remove('hidden');
                mainContent.classList.add('hidden');
                barBadge.innerText = "오후 1시 공개";
                barBadge.className = "bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-xs shrink-0";

                const diff = unlockTime - now;
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                timerEl.innerText = 
                    String(hours).padStart(2, '0') + "시간 " + 
                    String(minutes).padStart(2, '0') + "분 " + 
                    String(seconds).padStart(2, '0') + "초";
            } else {
                // 오후 1시 이후: 본문 전체 공개
                lockScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                barBadge.innerText = "열람 가능";
                barBadge.className = "bg-emerald-400 text-slate-950 font-bold px-2 py-0.5 rounded text-xs shrink-0";
            }
        }

        checkLockStatus();
        setInterval(checkLockStatus, 1000);
    </script>
</body>
</html>