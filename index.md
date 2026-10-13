<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>원종제일교회 스마트 주보</title>
    
    <!-- External Resources -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;800;900&display=swap');
        
        html { scroll-behavior: smooth; scroll-padding-top: 5rem; }
        body { 
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif; 
            -webkit-tap-highlight-color: transparent; 
            background-color: #FAFAFA; /* 모노크롬 페이퍼 배경 */
            color: #334155; 
            letter-spacing: -0.03em;
            overflow-x: hidden;
        }

        /* 프리미엄 UI 요소 */
        .premium-card { 
            background: #FFFFFF;
            border-radius: 32px;
            box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.07);
            border: 1px solid rgba(15, 23, 42, 0.06);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-card:hover {
            box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.20);
            transform: translateY(-2px);
        }
        
        .pb-safe { padding-bottom: calc(9rem + env(safe-area-inset-bottom)); }
        
        .glass-nav { 
            background: rgba(255, 255, 255, 0.85); 
            backdrop-filter: saturate(180%) blur(20px); 
            -webkit-backdrop-filter: saturate(180%) blur(20px);
            border-bottom: 1px solid rgba(15, 23, 42, 0.07);
            transition: all 0.3s; 
        }

        .glass-dock {
            background: rgba(255, 255, 255, 0.9); 
            backdrop-filter: saturate(180%) blur(25px); 
            -webkit-backdrop-filter: saturate(180%) blur(25px);
            border: 1px solid rgba(15, 23, 42, 0.06);
            box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.20);
        }

        /* 스크롤 페이드인 애니메이션 */
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* 헤더 배경 애니메이션 */
        .animated-gradient {
            background-size: 200% 200%;
            animation: gradientMove 8s ease infinite;
        }
        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        body.large-text { font-size: 1.15rem; }
        body.large-text h3 { font-size: 1.35rem; }
        body.large-text p, body.large-text .worship-row { font-size: 1.05rem; }
        body.large-text .worship-row { padding: 24px 0; }

        /* 다크 모드 (모노크롬 그라파이트) */
        body.dark-mode { background-color: #0B0F14 !important; color: #F1F5F9 !important; }
        body.dark-mode .premium-card { background-color: #161B22 !important; border-color: #2A313C !important; box-shadow: 0 20px 40px -15px rgba(0,0,0,0.6); }
        body.dark-mode .glass-nav, body.dark-mode .glass-dock { background: rgba(22, 27, 34, 0.85) !important; border-color: rgba(42, 49, 60, 0.6) !important; }
        body.dark-mode [class*="bg-slate-50"], body.dark-mode [class*="bg-slate-100"], body.dark-mode [class*="bg-white"] { background-color: #161B22 !important; color: #E2E8F0 !important; border-color: #2A313C !important;}
        body.dark-mode [class*="bg-[#FAFAFA]"] { background-color: #161B22 !important; border-color: #2A313C !important; }
        body.dark-mode td { background-color: #161B22 !important; border-color: #2A313C !important; }
        body.dark-mode .day-cell-fixed { background-color: #0B0F14 !important; color: #F1F5F9 !important; border-right-color: #475569 !important; }
        body.dark-mode .today-cell-highlight { background-color: #2A313C !important; color: #FFFFFF !important; outline-color: #94A3B8; }

        /* 예배 순서 리스트 */
        .worship-row { 
            display: grid; 
            grid-template-columns: 1fr 1.3fr 1fr; 
            border-bottom: 1px solid rgba(15, 23, 42, 0.08); 
            padding: 18px 0; 
            font-size: 0.95rem; 
            align-items: center;
            transition: background-color 0.2s ease;
        }
        .worship-row:hover { background-color: rgba(15, 23, 42, 0.04); border-radius: 12px; padding-left: 10px; padding-right: 10px; margin-left: -10px; margin-right: -10px;}
        body.dark-mode .worship-row { border-bottom-color: #2A313C; }
        body.dark-mode .worship-row:hover { background-color: rgba(42, 49, 60, 0.5); }
        .worship-row:last-child { border-bottom: none; }
        .worship-row span:nth-child(2) { text-align: center; font-weight: 800; color: #0F172A; }
        body.dark-mode .worship-row span:nth-child(2) { color: #F1F5F9; }
        .worship-row span:nth-child(3) { text-align: right; color: #64748B; font-weight: 600; }
        body.dark-mode .worship-row span:nth-child(3) { color: #CBD5E1; }

        /* 1년 통독표 */
        .bible-scroll-container { max-height: 70vh; overflow-y: auto; overflow-x: auto; border-radius: 24px; border: 1px solid #E5E7EB; }
        .bible-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 12px; min-width: 900px; }
        .bible-table th { background: #F1F5F9; color: #0F172A; padding: 16px 8px; position: sticky; top: 0; z-index: 20; font-weight: 800; }
        .bible-table td { border-bottom: 1px solid #F1F5F9; border-right: 1px solid #F1F5F9; padding: 14px 4px; text-align: center; }
        .day-cell-fixed { font-weight: 800; width: 50px; position: sticky; left: 0; z-index: 10; color: #0F172A; border-right: 2px solid #E5E7EB; background: #F8FAFC;}
        .today-cell-highlight { background-color: #E2E8F0 !important; font-weight: 900; color: #0F172A !important; box-shadow: inset 0 0 0 2px #0F172A; z-index: 15; position: relative;}

        /* 모달 팝업 */
        .modal { display: none; position: fixed; z-index: 1000; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); align-items: center; justify-content: center; padding: 20px; }
        .modal.active { display: flex; animation: modalFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes modalFadeIn { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

        /* 스탬프 애니메이션 */
        .stamp-effect { position: absolute; top: 20px; right: 20px; color: #0F172A; border: 4px solid #0F172A; border-radius: 50%; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 15px; transform: rotate(-15deg); opacity: 0; pointer-events: none; z-index: 50; background: rgba(255,255,255,0.9); backdrop-filter: blur(2px);}
        .stamp-animate { animation: stampIn 0.6s forwards cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes stampIn { 0% { transform: scale(3) rotate(-15deg); opacity: 0; } 100% { transform: scale(1) rotate(-15deg); opacity: 0.9; } }

        /* 스크래치 캔버스 */
        #scratch-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 20; border-radius: 32px; cursor: crosshair; touch-action: none; }

        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
    </style>
</head>
<body class="pb-safe">

    <!-- Navigation -->
    <nav class="glass-nav sticky top-0 z-[100] px-6 py-3.5 flex justify-between items-center">
        <img src="https://ikyullee-byte.github.io/TEST01/logo.png" alt="Logo" class="h-10 w-auto opacity-90 drop-shadow-sm">
        <div class="flex gap-3">
            <button onclick="document.body.classList.toggle('large-text')" class="w-10 h-10 bg-slate-100/50 border border-slate-300 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-800 active:scale-95 transition-all shadow-sm"><i class="fas fa-search-plus"></i></button>
            <button onclick="document.body.classList.toggle('dark-mode')" class="w-10 h-10 bg-slate-100/50 border border-slate-300 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-800 active:scale-95 transition-all shadow-sm"><i class="fas fa-moon"></i></button>
        </div>
    </nav>

    <!-- Header (모노크롬 에디토리얼 테마) -->
    <header class="h-[28vh] relative flex flex-col items-center justify-center overflow-hidden premium-card mx-5 mt-5 border-none animated-gradient bg-gradient-to-br from-[#FFFFFF] via-[#F1F5F9] to-[#E2E8F0]">
        <div class="absolute opacity-30 blur-[1px] text-5xl" style="left: 10%; top: 20%; animation: floatUp 7s ease-in-out infinite;">✝️</div>
        <div class="absolute opacity-20 text-4xl" style="right: 15%; top: 30%; animation: floatUp 6s ease-in-out infinite 1.5s;">🕊️</div>
        <div class="absolute opacity-30 text-4xl" style="left: 20%; bottom: 15%; animation: floatUp 5s ease-in-out infinite 2s;">❤️</div>
        <div class="absolute opacity-[0.03] text-8xl" style="right: 5%; bottom: -15%;"><i class="fas fa-church text-slate-900"></i></div>
        
        <div class="text-center relative z-20 space-y-3">
            <span class="inline-block bg-white text-slate-800 text-[10px] font-black tracking-[0.35em] py-1.5 px-4 rounded-full shadow-sm border border-slate-200 uppercase">Graceful Sunday</span>
            <h1 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight drop-shadow-sm">주일 예배</h1>
            <p class="text-[13px] font-bold text-slate-900 mt-2">2026.10.18 <span class="text-slate-700 mx-1">|</span> 오순절 후 스물두 번째 주일</p>
        </div>
    </header>

    <main class="container mx-auto px-5 py-10 space-y-10">

        <!-- 은혜 온도 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 reveal-on-scroll">
            <div class="bg-gradient-to-br from-slate-900 to-slate-600 premium-card p-8 flex items-center justify-between text-white border-none shadow-lg shadow-slate-300/50">
                <div>
                    <span class="text-[10px] font-bold text-slate-200 tracking-widest uppercase mb-2 block">Grace of the Cross</span>
                    <h3 class="text-lg font-extrabold text-white leading-snug">십자가로 완성하신<br>충분한 사랑과 은혜! ✝️</h3>
                </div>
                <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 backdrop-blur-sm">
                    <i class="fas fa-cross text-2xl text-white"></i>
                </div>
            </div>
            
            <div class="premium-card p-7 flex items-center gap-6 relative overflow-hidden border-slate-200">
                <div class="absolute -right-6 -top-6 w-24 h-24 bg-slate-100 rounded-full blur-2xl opacity-80"></div>
                <div class="flex flex-col items-center z-10">
                    <div class="relative w-4 h-24 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
                        <div id="grace-thermometer" class="absolute bottom-0 w-full bg-gradient-to-t from-slate-900 to-slate-400 transition-all duration-[2.5s] rounded-full" style="height: 0%"></div>
                    </div>
                    <i class="fas fa-sun text-slate-500 mt-3 text-[10px] opacity-80"></i>
                </div>
                <div class="flex-1 z-10">
                    <h3 class="font-bold text-slate-900 text-xs tracking-wider uppercase mb-1">Church Temperature</h3>
                    <div class="flex items-end justify-between mt-1">
                        <span class="text-5xl font-black text-slate-800 tracking-tighter" id="temp-num">0°</span>
                        <span class="text-[10px] font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">목표 100°</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 고급스러운 퀵 링크 -->
        <section class="reveal-on-scroll">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#" class="premium-card p-6 flex items-center justify-between group hover:border-slate-500">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 transition-colors group-hover:bg-slate-100 group-hover:text-slate-800"><i class="fas fa-church"></i></div>
                        <h3 class="font-bold text-slate-700 text-sm">교회 소개</h3>
                    </div>
                    <i class="fas fa-chevron-right text-slate-300 group-hover:text-slate-700 transition-all group-hover:translate-x-1"></i>
                </a>
                <a href="https://ikyullee-byte.github.io/wjnotice/" target="_blank" class="premium-card p-6 flex items-center justify-between group hover:border-slate-400">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 transition-colors group-hover:bg-slate-100 group-hover:text-slate-700"><i class="fas fa-history"></i></div>
                        <h3 class="font-bold text-slate-700 text-sm">40주년 역사관</h3>
                    </div>
                    <i class="fas fa-chevron-right text-slate-300 group-hover:text-slate-700 transition-all group-hover:translate-x-1"></i>
                </a>
                <a href="https://ikyullee-byte.github.io/worship/" target="_blank" class="premium-card p-6 flex items-center justify-between group hover:border-slate-500">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 transition-colors group-hover:bg-slate-100 group-hover:text-slate-800"><i class="fas fa-compact-disc"></i></div>
                        <h3 class="font-bold text-slate-700 text-sm">찬양단 아카이브</h3>
                    </div>
                    <i class="fas fa-chevron-right text-slate-300 group-hover:text-slate-700 transition-all group-hover:translate-x-1"></i>
                </a>
            </div>
        </section>

        <!-- 이번주 말씀 (고린도전서 7:17) -->
        <section id="bible-section" class="reveal-on-scroll">
            <div class="flex items-center mb-6 ml-2 font-black text-xl text-slate-800 tracking-tight">
                <span class="w-1.5 h-1.5 bg-slate-900 rounded-full mr-3 ring-4 ring-slate-200"></span>이번 주 말씀 및 통독
            </div>
            <div class="premium-card p-8 md:p-10 border-t-[6px] border-t-slate-500">
                <div class="text-center mb-10 pb-8 border-b border-slate-100">
                    <p class="text-[16px] font-bold text-slate-700 leading-loose px-2 break-keep tracking-tight">
                        오직 주께서 각 사람에게 나눠 주신 대로 하나님이 각 사람을 부르신 그대로 행하라 내가 모든 교회에서 이와 같이 명하노라
                    </p>
                    <p class="text-[13px] font-extrabold text-slate-800 mt-5 tracking-widest uppercase">고린도전서 7:17</p>
                </div>
                
                <div>
                    <div class="flex justify-between items-center mb-6">
                        <div class="font-bold text-slate-500 text-xs"><i class="fas fa-calendar-alt text-slate-300 mr-2"></i>매일 성경 읽기</div>
                        <button onclick="openBibleModal()" class="text-[11px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition-colors border border-slate-200">1년 통독표 전체보기 <i class="fas fa-arrow-right ml-1 opacity-50"></i></button>
                    </div>
                    <div class="grid grid-cols-4 sm:grid-cols-8 gap-3" id="weekly-bible-grid"></div>
                </div>
            </div>
        </section>

        <!-- ✝️ 주일 오전 예배 -->
        <section id="morning-service" class="reveal-on-scroll">
            <div class="premium-card overflow-hidden relative border-slate-200">
                <div id="stamp-morning" class="stamp-effect" style="color: #0F172A; border-color: #0F172A;">예배<br>참석</div>
                <div class="bg-gradient-to-r from-slate-100 to-white p-10 text-center relative border-b border-slate-200">
                    <button onclick="checkAttendance(this, 'morning')" class="absolute top-6 right-6 bg-white hover:bg-slate-50 text-[10px] font-bold px-4 py-2.5 rounded-full active:scale-95 transition-all border border-slate-300 text-slate-800 shadow-sm flex items-center gap-2">
                        <i class="fas fa-check text-slate-500"></i>출석체크
                    </button>
                    <span class="inline-block bg-white text-slate-800 text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full mb-4 border border-slate-200 shadow-sm">오전 11:00</span>
                    <h2 class="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">주일 오전 예배</h2>
                    <p class="text-xs font-semibold mt-3 text-slate-500">집례: 이성결 목사 <span class="mx-2 opacity-30">|</span> 오순절 후 스물두 번째 주일</p>
                </div>
                <div class="p-8 md:p-12">
                    <div class="worship-row"><span>오르겐연주</span><span></span><span>반 주 자</span></div>
                    <div class="worship-row"><span>예배선포</span><span></span><span>집 례 자</span></div>
                    <div class="worship-row"><span>*찬 송</span><span>9장</span><span>다 같 이</span></div>
                    <div class="worship-row"><span>*통성기도</span><span>주님여 이 손을</span><span>다 같 이</span></div>
                    <div class="worship-row"><span>*성시교독</span><span>81번</span><span>집례자와 회중</span></div>
                    <div class="worship-row"><span>*신앙고백</span><span>사도신경</span><span>다 같 이</span></div>
                    <div class="worship-row"><span>찬 송</span><span>165장</span><span>다 같 이</span></div>
                    
                    <div class="worship-row"><span>대표기도</span><span></span><span class="font-extrabold text-slate-800">김성래 안수집사</span></div>
                    
                    <div class="worship-row">
                        <span>성경봉독</span>
                        <span class="flex flex-col items-center gap-2.5 mt-1">
                            <span class="font-bold text-center text-[13px]">에베소서<br>2:12-14, 19-22</span>
                            <button onclick="openScriptureModal()" class="bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-[10px] font-bold px-3.5 py-1.5 rounded-lg active:scale-95 transition-all flex items-center shadow-sm mt-1">
                                <i class="fas fa-book-open mr-1.5"></i>본문 읽기
                            </button>
                        </span>
                        <span>이성결 목사</span>
                    </div>
                    
                    <div class="worship-row"><span>찬 양</span><span></span><span>찬 양 대</span></div>

                    <div class="py-12 my-8 bg-gradient-to-b from-slate-100/50 to-white rounded-[28px] text-center border border-slate-200 relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                        <p class="text-[9px] font-black text-slate-700 mb-3 tracking-[0.2em] uppercase">Sermon</p>
                        <h3 class="text-2xl md:text-3xl font-black text-slate-800 break-keep mt-1">"십자가로 충분한 은혜"</h3>
                        <p class="text-[13px] font-bold text-slate-800 mt-4">이성결 목사</p>
                    </div>

                    <div class="worship-row"><span>찬 송</span><span>304장</span><span>다 같 이</span></div>
                    <div class="worship-row"><span>봉헌기도</span><span></span><span class="font-bold text-slate-800">이성결 목사</span></div>
                    <div class="worship-row"><span>교회소식</span><span></span><span>집 례 자</span></div>
                    <div class="worship-row"><span>새신자 소개</span><span></span><span>집 례 자</span></div>
                    <div class="worship-row"><span>*송 영</span><span>좋으신 하나님</span><span>다 같 이</span></div>
                    <div class="worship-row border-none pt-6 font-extrabold text-lg"><span>*축 도</span><span></span><span class="text-slate-800">이성결 목사</span></div>
                </div>
                <div class="bg-slate-50 py-5 text-center text-[11px] text-slate-400 font-medium">(*는 일어서서, 불편하신 성도님들은 앉으셔서 예배를 드립니다.)</div>
            </div>
        </section>

        <!-- 🍇 주일 오후 예배 -->
        <section id="afternoon-service" class="reveal-on-scroll">
            <div class="premium-card overflow-hidden relative border-slate-300">
                <div id="stamp-afternoon" class="stamp-effect" style="color: #0F172A; border-color: #0F172A;">예배<br>참석</div>
                
                <div class="bg-gradient-to-r from-slate-100 to-white p-10 text-center relative border-b border-slate-300 overflow-hidden">
                    <div class="absolute -right-4 -top-4 opacity-[0.04] text-8xl"><i class="fas fa-seedling text-slate-900"></i></div>
                    
                    <button onclick="checkAttendance(this, 'afternoon')" class="absolute top-6 right-6 bg-white hover:bg-slate-200 text-[10px] font-bold px-4 py-2.5 rounded-full active:scale-95 transition-all border border-slate-400 text-slate-800 shadow-sm flex items-center gap-2 z-10">
                        <i class="fas fa-check text-slate-700"></i>출석체크
                    </button>
                    
                    <span class="inline-block bg-white text-slate-800 text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full mb-4 border border-slate-300 relative z-10 shadow-sm">오후 1:15</span>
                    <h2 class="text-2xl md:text-3xl font-black text-slate-800 tracking-tight relative z-10">주일 오후 예배</h2>
                    <p class="text-xs font-semibold mt-3 text-slate-800 relative z-10">사회: 이성결 목사</p>
                </div>
                
                <div class="p-8 md:p-12">
                    <div class="worship-row"><span>찬양인도</span><span></span><span class="font-bold text-slate-900">찬 양 단</span></div>
                    <div class="worship-row"><span>기도인도</span><span></span><span class="font-extrabold text-slate-800">이서영 집사</span></div>
                    
                    <div class="worship-row">
                        <span>성경봉독</span>
                        <span class="flex flex-col items-center gap-2.5 mt-1">
                            <span class="font-bold text-center">요한복음 15:1-8</span>
                            <button onclick="openAfternoonScriptureModal()" class="bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 text-[10px] font-bold px-3.5 py-1.5 rounded-lg active:scale-95 transition-all flex items-center shadow-sm">
                                <i class="fas fa-book-open mr-1.5"></i>본문 읽기
                            </button>
                        </span>
                        <span class="font-bold text-slate-700">사 회 자</span>
                    </div>

                    <div class="worship-row"><span>특 송</span><span></span><span class="font-bold text-slate-900">자 원 자</span></div>
                    
                    <div class="py-12 my-8 bg-white rounded-[28px] text-center border border-slate-300 shadow-[0_4px_20px_-10px_rgba(15,23,42,0.12)] relative">
                        <p class="text-[9px] font-black text-slate-700 mb-3 tracking-[0.2em] uppercase">Sermon</p>
                        <h3 class="text-xl md:text-2xl font-black text-slate-800 break-keep mt-1">"주님은 포도나무 나는 가지입니다"</h3>
                        <p class="text-[13px] font-bold text-slate-800 mt-4">이성결 목사</p>
                    </div>
                    
                    <div class="worship-row"><span>교회소식</span><span></span><span class="font-bold text-slate-700">사 회 자</span></div>
                    <div class="worship-row border-none pt-6 font-extrabold text-lg"><span>축 도</span><span></span><span class="text-slate-800">이성결 목사</span></div>
                </div>
            </div>
        </section>

        <!-- 수요 성서 강해 -->
        <section id="wednesday-service" class="reveal-on-scroll">
            <div class="premium-card overflow-hidden relative border-slate-100">
                <div id="stamp-wednesday" class="stamp-effect" style="color: #0F172A; border-color: #0F172A;">예배<br>참석</div>
                <div class="bg-gradient-to-r from-slate-100 to-white p-10 text-center relative border-b border-slate-200">
                    <button onclick="checkAttendance(this, 'wednesday')" class="absolute top-6 right-6 bg-white hover:bg-slate-100 text-[10px] font-bold px-4 py-2.5 rounded-full active:scale-95 transition-all border border-slate-300 text-slate-700 shadow-sm flex items-center gap-2">
                        <i class="fas fa-check text-slate-500"></i>출석체크
                    </button>
                    <span class="inline-block bg-white text-slate-700 text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full mb-4 border border-slate-200 shadow-sm">오후 7:00</span>
                    <h2 class="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">수요 성서강해</h2>
                    <p class="text-xs font-semibold mt-3 text-slate-700">사회: 이성결 목사</p>
                </div>
                <div class="p-8 md:p-12">
                    <div class="worship-row"><span>찬 양</span><span></span><span>다 같 이</span></div>
                    <div class="worship-row"><span>기 도</span><span></span><span class="font-extrabold text-slate-800">변지민 권사</span></div>
                    
                    <div class="py-12 my-8 bg-white rounded-[28px] text-center border border-slate-100 shadow-[0_4px_20px_-10px_rgba(15,23,42,0.10)]">
                        <p class="text-[9px] font-black text-slate-500 mb-3 tracking-[0.2em] uppercase">Sermon</p>
                        <h3 class="text-xl md:text-2xl font-black text-slate-800 break-keep mt-1">"수요 예배 설교"</h3>
                        <p class="text-[13px] font-bold text-slate-700 mt-4">이성결 목사</p>
                    </div>
                    <p class="text-center text-[12px] font-medium text-slate-400 mt-8 tracking-wide">주기도문으로 예배를 마칩니다</p>
                </div>
            </div>
        </section>

        <!-- 📸 단체사진 갤러리 섹션 (기존 사진 유지) -->
        <section id="gallery-section" class="reveal-on-scroll">
            <div class="flex items-center mb-6 ml-2 font-black text-xl text-slate-800 tracking-tight">
                <span class="w-1.5 h-1.5 bg-slate-900 rounded-full mr-3 ring-4 ring-slate-200"></span>은혜의 순간
            </div>
            
            <div class="premium-card p-6 md:p-8 relative bg-white border-slate-100">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <p class="text-[9px] font-black text-slate-700 mb-1.5 tracking-[0.2em] uppercase">Gallery</p>
                        <h3 class="text-xl font-black text-slate-800">함께 나눈 기쁨의 시간들 📸</h3>
                    </div>
                </div>
                
                <div class="space-y-6">
                    <!-- 청년부 리트릿 -->
                    <div class="w-full bg-white p-3 rounded-2xl shadow-[0_10px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-100 transform hover:-translate-y-1 transition-transform duration-500 cursor-pointer group">
                        <div class="relative w-full h-56 sm:h-72 bg-slate-100 rounded-xl overflow-hidden">
                            <img src="https://ikyullee-byte.github.io/TEST01/retreat2026.jpg" alt="청년부 리트릿 사진" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="this.src='https://via.placeholder.com/800x600/F1F5F9/64748B?text=Youth+Retreat+Photo'">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                                <i class="fas fa-expand text-white text-xl drop-shadow-md"></i>
                            </div>
                        </div>
                        <p class="text-[13px] text-slate-600 mt-4 mb-1 font-bold text-center tracking-wide">은혜와 비전 가득했던 청년부 리트릿 ⛺</p>
                    </div>

                    <!-- 주일학교 여름성경학교 -->
                    <div class="w-full bg-white p-3 rounded-2xl shadow-[0_10px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-100 transform hover:-translate-y-1 transition-transform duration-500 cursor-pointer group">
                        <div class="relative w-full h-56 sm:h-72 bg-slate-100 rounded-xl overflow-hidden">
                            <img src="https://ikyullee-byte.github.io/TEST01/summer2026.jpg" alt="여름성경학교 사진" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="this.src='https://via.placeholder.com/800x600/F1F5F9/64748B?text=Photo+Upload+Here'">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                                <i class="fas fa-expand text-white text-xl drop-shadow-md"></i>
                            </div>
                        </div>
                        <p class="text-[13px] text-slate-600 mt-4 mb-1 font-bold text-center tracking-wide">은혜 충만했던 주일학교 여름성경학교 ☀️</p>
                    </div>

                    <!-- 성가대 모임 -->
                    <div class="w-full bg-white p-3 rounded-2xl shadow-[0_10px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-100 transform hover:-translate-y-1 transition-transform duration-500 cursor-pointer group">
                        <div class="relative w-full h-56 sm:h-72 bg-slate-100 rounded-xl overflow-hidden">
                            <img src="https://ikyullee-byte.github.io/TEST01/choir2026.jpg" alt="성가대 모임 사진" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="this.src='https://via.placeholder.com/800x600/F1F5F9/64748B?text=Photo+Upload+Here'">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                                <i class="fas fa-expand text-white text-xl drop-shadow-md"></i>
                            </div>
                        </div>
                        <p class="text-[13px] text-slate-600 mt-4 mb-1 font-bold text-center tracking-wide">아름다운 찬양의 교제, 성가대 모임 🎶</p>
                    </div>

                    <!-- 효도관광 -->
                    <div class="w-full bg-white p-3 rounded-2xl shadow-[0_10px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-100 transform hover:-translate-y-1 transition-transform duration-500 cursor-pointer group">
                        <div class="relative w-full h-56 sm:h-72 bg-slate-100 rounded-xl overflow-hidden">
                            <img src="https://ikyullee-byte.github.io/TEST01/hyodo2026.jpg" alt="효도관광 사진" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="this.src='https://via.placeholder.com/800x600/F1F5F9/64748B?text=Photo+Upload+Here'">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                                <i class="fas fa-expand text-white text-xl drop-shadow-md"></i>
                            </div>
                        </div>
                        <p class="text-[13px] text-slate-600 mt-4 mb-1 font-bold text-center tracking-wide">은혜로운 효도관광 다녀왔습니다 🌸</p>
                    </div>

                    <!-- 야외예배 -->
                    <div class="w-full bg-white p-3 rounded-2xl shadow-[0_10px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-100 transform hover:-translate-y-1 transition-transform duration-500 cursor-pointer group">
                        <div class="relative w-full h-56 sm:h-72 bg-slate-100 rounded-xl overflow-hidden">
                            <img src="https://ikyullee-byte.github.io/TEST01/outdoor2026.jpg" alt="야외예배 사진" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="this.src='https://via.placeholder.com/800x600/F1F5F9/64748B?text=Photo+Upload+Here'">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                                <i class="fas fa-expand text-white text-xl drop-shadow-md"></i>
                            </div>
                        </div>
                        <p class="text-[13px] text-slate-600 mt-4 mb-1 font-bold text-center tracking-wide">기쁨 넘쳤던 전교회 야외예배 🌳</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 💡 교회 소식 -->
        <section id="church-news" class="reveal-on-scroll">
            <div class="flex items-center mb-6 ml-2 font-black text-xl text-slate-800 tracking-tight">
                <span class="w-1.5 h-1.5 bg-slate-900 rounded-full mr-3 ring-4 ring-slate-200"></span>교회 소식
            </div>
            <div class="premium-card p-8 space-y-4">
                
                <!-- 📅 주요 모임 안내 박스 -->
                <div class="bg-[#FAFAFA] p-5 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm mb-6">
                    <i class="fas fa-users-cog text-slate-700 text-3xl mb-3"></i>
                    <h4 class="font-bold text-[15px] text-slate-800 mb-1">기관장 회의</h4>
                    <p class="text-[13px] font-medium text-slate-600 break-keep"><strong>오늘 오후 예배 후</strong><br>기관장 회의가 있습니다. 모든 기관장님들의 참석을 바랍니다.</p>
                </div>

                <!-- 📖 담임목사/원로목사 일정 배너 -->
                <div class="bg-gradient-to-br from-slate-100 to-white p-6 rounded-[24px] border border-slate-200 mb-8 shadow-sm relative overflow-hidden text-slate-900 group cursor-default">
                    <div class="absolute -right-2 -top-2 opacity-[0.05] text-8xl group-hover:scale-110 transition-transform duration-700"><i class="fas fa-calendar-check text-slate-900"></i></div>
                    <div class="relative z-10">
                        <p class="text-[10px] font-black text-slate-500 tracking-widest mb-1.5 uppercase">Pastoral Schedule</p>
                        <h4 class="font-black text-[17px] mb-3 text-slate-900 tracking-tight">교역자 주간 일정</h4>
                        <ul class="text-[13.5px] font-bold text-slate-800 space-y-3 break-keep">
                            <li class="flex items-start gap-2">
                                <i class="fas fa-check-circle text-slate-500 mt-0.5"></i>
                                <div><strong>담임목사:</strong> 10월 12-13일 부천지방회 교역자 수련회 참석</div>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-check-circle text-slate-500 mt-0.5"></i>
                                <div><strong>원로목사님 사모님:</strong> 10월 14일(수) 장흥성결교회 예배 인도 (기도 부탁드립니다)</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- 일반 소식 리스트 -->
                <div class="flex gap-5 p-4 bg-[#FAFAFA] rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
                    <span class="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-[12px] font-black text-slate-300 group-hover:text-slate-700 border border-slate-100 shadow-sm shrink-0 transition-colors">1</span>
                    <p class="text-[14px] font-medium leading-relaxed text-slate-600 mt-1">예배 30분 전에 나오셔서 기도로 준비하시며 친절한 모습으로 인사를 나누시기를 바랍니다.</p>
                </div>
                <div class="flex gap-5 p-4 bg-[#FAFAFA] rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
                    <span class="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-[12px] font-black text-slate-300 group-hover:text-slate-700 border border-slate-100 shadow-sm shrink-0 transition-colors">2</span>
                    <p class="text-[14px] font-medium leading-relaxed text-slate-600 mt-1">수요예배에 적극적인 참여를 부탁 드립니다.</p>
                </div>
                <div class="flex gap-5 p-4 bg-[#FAFAFA] rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
                    <span class="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-[12px] font-black text-slate-300 group-hover:text-slate-700 border border-slate-100 shadow-sm shrink-0 transition-colors">3</span>
                    <p class="text-[14px] font-medium leading-relaxed text-slate-600 mt-1">10월 예배위원들은 기도로 준비하시기 바랍니다.</p>
                </div>

                <!-- 새신자 환영 위젯 -->
                <div class="mt-8 mb-6 pt-4 border-t border-slate-100">
                    <div class="bg-gradient-to-r from-slate-100 to-white p-6 rounded-[24px] border border-slate-200/50 flex flex-col items-center">
                        <i class="fas fa-handshake text-slate-500 text-2xl mb-2"></i>
                        <p class="text-[13px] font-bold text-slate-800 uppercase tracking-widest mb-3">새신자 환영</p>
                        <p class="text-[15px] font-black text-slate-700 text-center leading-loose">
                            정순자 <span class="text-slate-300 mx-1">|</span> 조향지 <span class="text-slate-300 mx-1">|</span> 김병기 <span class="text-slate-300 mx-1">|</span> 김기혜
                        </p>
                        <p class="text-[11px] text-slate-700 mt-3 font-semibold tracking-wider">주님의 이름으로 환영합니다!</p>
                    </div>
                </div>

                <!-- 중보기도 위젯 -->
                <div class="mt-6 pt-4 border-t border-slate-100">
                    <div class="flex items-center gap-2 mb-4 ml-1">
                        <i class="fas fa-praying-hands text-slate-500"></i>
                        <span class="text-[13px] font-bold text-slate-700 uppercase tracking-wide">환우를 위한 기도</span>
                    </div>
                    <div class="bg-gradient-to-r from-slate-100 to-white p-8 rounded-[24px] border border-slate-200/50">
                        <p class="text-[15px] font-bold text-slate-700 leading-loose text-center">
                            임선우 어린이 <span class="mx-2 text-slate-300">|</span> 한용희 권사님<br>박성심 권사님<br>
                            <span class="text-[11px] text-slate-500 mt-4 block font-semibold tracking-wider">위하여 함께 기도해 주시기 바랍니다.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <footer class="mt-12 py-24 px-6 text-center pb-48 border-t border-slate-200/50">
        <h3 class="font-black text-slate-300 text-xl mb-2 tracking-tight uppercase">Wonjong First</h3>
        <p class="text-[12px] font-medium text-slate-400">경기도 부천시 오정구 원종로36번길20</p>
        <div class="mt-10 text-[10px] text-slate-300 font-bold uppercase tracking-widest">&copy; 2026. All rights reserved.</div>
    </footer>

    <!-- 세련된 글라스 둥근 Bottom Dock -->
    <div class="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-dock rounded-[32px] flex justify-around items-center py-4 px-6 z-[100]">
        <button onclick="openBibleModal()" class="flex flex-col items-center text-slate-400 hover:text-slate-800 active:scale-90 transition-all w-16">
            <i class="fas fa-book-open text-xl mb-1.5 transition-transform"></i>
            <span class="text-[9px] font-bold tracking-wide">통독표</span>
        </button>
        <button onclick="openMannaModal()" class="relative -mt-10 bg-slate-800 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_15px_30px_-10px_rgba(30,41,59,0.5)] border-4 border-white hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(30,41,59,0.6)] active:scale-95 transition-all group">
            <i class="fas fa-gift text-2xl group-hover:scale-110 transition-transform"></i>
        </button>
        <button onclick="openGiveModal()" class="flex flex-col items-center text-slate-400 hover:text-slate-800 active:scale-90 transition-all w-16">
            <i class="fas fa-won-sign text-xl mb-1.5 transition-transform"></i>
            <span class="text-[9px] font-bold tracking-wide">온라인헌금</span>
        </button>
    </div>

    <!-- Modals (우아한 모달) -->
    <!-- 🌿 오전 성경 본문 모달 (에베소서 2:12-14, 19-22) -->
    <div id="scriptureModal" class="modal" onclick="closeScriptureModal()">
        <div class="premium-card w-full max-w-lg p-10 flex flex-col max-h-[85vh]" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-8 pb-6 border-b border-slate-100">
                <div>
                    <span class="text-[10px] font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg mb-3 inline-block border border-slate-200 uppercase tracking-widest">Scripture</span>
                    <h3 class="font-black text-2xl text-slate-800 tracking-tight">에베소서 2장</h3>
                </div>
                <button onclick="closeScriptureModal()" class="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 transition-colors"><i class="fas fa-times"></i></button>
            </div>
            <div class="overflow-y-auto pr-4 space-y-6 text-slate-700 text-[16px] font-medium leading-[1.9]">
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">12</sup>그 때에 너희는 그리스도 밖에 있었고 이스라엘 나라 밖의 사람이라 약속의 언약들에 대하여는 외인이요 세상에서 소망이 없고 하나님도 없는 자이더니</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">13</sup>이제는 전에 멀리 있던 너희가 그리스도 예수 안에서 그리스도의 피로 가까워졌느니라</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">14</sup>그는 우리의 화평이신지라 둘로 하나를 만드사 원수 된 것 곧 중간에 막힌 담을 자기 육체로 허시고</p>
                <div class="my-4 border-t border-dashed border-slate-200"></div>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">19</sup>그러므로 이제부터 너희는 외인도 아니요 나그네도 아니요 오직 성도들과 동일한 시민이요 하나님의 권속이라</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">20</sup>너희는 사도들과 선지자들의 터 위에 세우심을 입은 자라 그리스도 예수께서 친히 모퉁잇돌이 되셨느니라</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">21</sup>그의 안에서 건물마다 서로 연결하여 주 안에서 성전이 되어 가고</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">22</sup>너희도 성령 안에서 하나님이 거하실 처소가 되기 위하여 그리스도 예수 안에서 함께 지어져 가느니라</p>
            </div>
            <button onclick="closeScriptureModal()" class="w-full mt-10 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-[20px] font-bold active:scale-95 transition-all shadow-lg">아멘, 닫기</button>
        </div>
    </div>

    <!-- 💧 오후 성경 본문 모달 (요한복음 15:1-8) -->
    <div id="afternoonScriptureModal" class="modal" onclick="closeAfternoonScriptureModal()">
        <div class="premium-card w-full max-w-lg p-10 flex flex-col max-h-[85vh]" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-8 pb-6 border-b border-slate-100">
                <div>
                    <span class="text-[10px] font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg mb-3 inline-block border border-slate-300 uppercase tracking-widest">Scripture</span>
                    <h3 class="font-black text-2xl text-slate-800 tracking-tight">요한복음 15:1-8</h3>
                </div>
                <button onclick="closeAfternoonScriptureModal()" class="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 transition-colors"><i class="fas fa-times"></i></button>
            </div>
            <div class="overflow-y-auto pr-4 space-y-6 text-slate-700 text-[16px] font-medium leading-[1.9]">
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">1</sup>나는 참포도나무요 내 아버지는 농부라</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">2</sup>무릇 내게 붙어 있어 열매를 맺지 아니하는 가지는 아버지께서 그것을 제거해 버리시고 무릇 열매를 맺는 가지는 더 열매를 맺게 하려 하여 그것을 깨끗하게 하시느니라</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">3</sup>너희는 내가 일러준 말로 이미 깨끗하여졌으니</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">4</sup>내 안에 거하라 나도 너희 안에 거하리라 가지가 포도나무에 붙어 있지 아니하면 스스로 열매를 맺을 수 없음 같이 너희도 내 안에 있지 아니하면 그러하리라</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">5</sup>나는 포도나무요 너희는 가지라 그가 내 안에, 내가 그 안에 거하면 사람이 열매를 많이 맺나니 나를 떠나서는 너희가 아무 것도 할 수 없음이라</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">6</sup>사람이 내 안에 거하지 아니하면 가지처럼 밖에 버려져 마르나니 사람들이 그것을 모아다가 불에 던져 사르느니라</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">7</sup>너희가 내 안에 거하고 내 말이 너희 안에 거하면 무엇이든지 원하는 대로 구하라 그리하면 이루리라</p>
                <p><sup class="text-slate-500 font-bold mr-2 text-xs">8</sup>너희가 열매를 많이 맺으면 내 아버지께서 영광을 받으실 것이요 너희는 내 제자가 되리라</p>
            </div>
            <button onclick="closeAfternoonScriptureModal()" class="w-full mt-10 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-[20px] font-bold active:scale-95 transition-all shadow-lg">아멘, 닫기</button>
        </div>
    </div>

    <!-- 1년 통독표 모달 -->
    <div id="bibleModal" class="modal" onclick="closeBibleModal()">
        <div class="premium-card w-full max-w-5xl p-8 flex flex-col" onclick="event.stopPropagation()">
            <div class="flex justify-between items-center mb-6">
                <h3 class="font-black text-2xl text-slate-800 tracking-tight">1년 1독 전체 일정표</h3>
                <button onclick="closeBibleModal()" class="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 transition-colors"><i class="fas fa-times"></i></button>
            </div>
            <div class="bible-scroll-container">
                <table class="bible-table">
                    <thead id="bible-head"></thead>
                    <tbody id="bible-full-body"></tbody>
                </table>
            </div>
            <button onclick="closeBibleModal()" class="w-full mt-8 py-4 bg-slate-100 text-slate-600 rounded-[20px] font-bold hover:bg-slate-200 active:scale-95 transition-all">닫기</button>
        </div>
    </div>

    <!-- 만나 스크래치 모달 -->
    <div id="mannaModal" class="modal" onclick="closeMannaModal()">
        <div class="premium-card w-full max-w-sm p-12 text-center relative overflow-hidden" onclick="event.stopPropagation()">
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-2xl mb-8 border border-slate-100 shadow-sm"><i class="fas fa-seedling"></i></div>
                <p id="manna-text" class="text-[17px] font-bold text-slate-700 italic mb-6 leading-relaxed break-keep">"말씀을 긁어보세요!"</p>
                <p id="manna-ref" class="text-sm font-extrabold text-slate-800 mb-10 opacity-0 transition-opacity duration-1000">-</p>
                <button onclick="closeMannaModal()" class="w-full py-4.5 bg-slate-100 text-slate-600 rounded-[20px] font-bold hover:bg-slate-200 active:scale-95 transition-all">아멘, 닫기 🙏</button>
            </div>
            <canvas id="scratch-canvas"></canvas>
        </div>
    </div>

    <!-- 헌금 안내 모달 -->
    <div id="giveModal" class="modal" onclick="closeGiveModal()">
        <div class="premium-card w-full max-w-sm p-12 text-center" onclick="event.stopPropagation()">
            <div class="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-8 border border-slate-100 shadow-sm"><i class="fas fa-hand-holding-heart"></i></div>
            <h3 class="text-2xl font-black text-slate-800 mb-8 tracking-tight">온라인 헌금 안내</h3>
            <div class="bg-[#FAFAFA] p-8 rounded-[24px] border border-slate-100 mb-10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                <p class="text-[22px] font-black tracking-wider text-slate-700 select-all font-mono">302-1765-3728-91</p>
                <p class="text-[13px] font-bold text-slate-400 mt-3 tracking-wide">농협 <span class="mx-2">|</span> 원종제일교회</p>
            </div>
            <button onclick="closeGiveModal()" class="w-full py-4.5 bg-slate-800 hover:bg-slate-700 text-white rounded-[20px] font-bold active:scale-95 transition-all shadow-lg">닫기</button>
        </div>
    </div>

    <script>
        const fullBibleData = [["창1-3","레7-9","신20-22","삼하1-3","대상19-21","욥16-18","시100-104","사13-15","렘40-42","호10-14","눅4-6","고전7-9"],["창4-7","레10-12","신23-25","삼하4-6","대상22-24","욥19-21","시105-108","사16-18","렘43-45","욜1-3","눅7-9","고전10-12"],["창8-11","레13-15","신26-28","삼하7-9","대상25-27","욥22-24","시109-113","사19-21","렘46-48","암1-3","눅10-12","고전13-16"],["창12-14","레16-18","신29-31","삼하10-12","대상28-29","욥25-27","시114-118","사22-24","렘49-50","암4-6","눅13-15","고후1-3"],["창15-17","레19-21","신32-34","삼하13-15","대하1-3","욥28-30","시119:1","사25-27","렘51-52","암7-9","눅16-18","고후4-6"],["창18-20","레22-24","수1-3","삼하16-18","대하4-6","욥31-33","시119:89","사28-30","애1-3","옵-욘4","눅19-21","고후7-9"],["창21-24","레25-27","수4-7","삼하19-21","대하7-9","욥34-36","시120-125","사31-33","애4-5","미1-3","눅22-24","고후10-13"],["창25-27","민1-3","수8-9","삼하22-24","대하10-12","욥37-39","시126-131","사34-36","겔1-3","미4-7","요1-3","갈1-3"],["창28-30","민4-6","수10-12","왕상1-3","대하13-15","욥40-42","시132-137","사37-39","겔4-6","나1-합3","요4-6","갈4-6"],["창31-33","민7-9","수13-15","왕상4-6","대하16-18","시1-4","시138-143","사40-42","겔7-9","습1-학2","요7-9","엡1-3"],["창34-36","민10-12","수16-18","왕상7-9","대하19-21","시5-8","시144-150","사43-45","겔10-12","슥1-3","요10-12","엡4-6"],["창37-39","민13-15","수19-21","왕상10-12","대하22-24","시9-14","잠1-3","사46-48","겔13-15","슥4-6","요13-15","빌1-4"],["창40-42","민16-18","수22-24","왕상13-15","대하25-27","시15-18","잠4-6","사49-51","겔16-18","슥7-9","요16-18","골1-4"],["창43-45","민19-21","삿1-3","왕상16-18","대하28-30","시19-22","잠7-9","사52-54","겔19-21","슥10-14","요19-21","살전1-5"],["창46-48","민22-24","삿4-6","왕상19-21","대하31-33","시23-27","잠10-12","사55-57","겔19-21","슥10-14","요19-21","살전1-5"],["창49-출1","민25-27","삿7-9","왕상22-왕2","대하34-36","시28-32","잠13-15","사58-60","겔25-27","마1-3","행4-6","딤전1-6"],["출2-4","민28-30","삿10-12","왕하3-5","스1-3","시33-36","잠16-18","사61-63","겔28-30","마4-6","행7-9","딤후1-4"],["출5-7","민31-33","삿13-15","왕하6-8","스4-6","시37-41","잠19-21","사64-66","겔31-33","마7-9","행10-12","딛1-몬1"],["출8-10","민34-36","삿16-18","왕하9-11","스7-10","시42-46","잠22-24","렘1-3","겔34-36","마10-12","행13-15","히1-4"],["출11-13","신1-2","삿19-21","왕하12-14","느1-3","시47-51","잠25-27","렘4-6","겔37-39","마13-15","행16-18","히5-8"],["출14-16","신3-4","룻1-4","왕하15-17","느4-6","시52-56","잠28-31","렘7-9","겔40-42","마16-18","행19-21","히9-13"],["출17-19","신5-6","삼상1-3","왕하18-20","느7-9","시57-61","전1-3","렘10-12","겔43-45","마19-21","행22-24","약1-5"],["출20-22","신7-8","삼상4-6","왕하21-23","느10-13","시62-66","전4-6","렘13-15","겔46-48","마22-24","행25-28","벧전-벧후"],["출23-25","신9-10","삼상7-9","왕하24-25","에1-3","시67-71","전7-9","렘16-18","단1-3","마25-27","롬1-3","요일-유"],["출26-28","신11-12","삼상10-12","대상1-3","에4-7","시72-76","전10-12","렘19-21","단4-6","마28-막2","롬4-6","계1-3"],["출29-31","신13-14","삼상13-15","대상4-6","에8-10","시77-80","아1-4","레22-24","단7-9","막3-5","롬7-9","계4-6"],["출32-34","신15-16","삼상16-18","대상7-9","욥1-3","시81-85","아5-8","레25-27","단10-12","막6-8","롬10-12","계7-9"],["출35-37","신17-19","삼상19-21","대상10-12","욥4-6","시86-89","사1-3","레28-30","호1-3","막9-11","롬13-16","계10-12"],["출38-40","-","삼상22-24","대상13-15","욥7-9","시90-94","사4-6","레31-33","호4-6","막12-14","고전1-3","계13-15"],["레1-3","-","삼상25-27","대상16-18","욥10-12","시95-99","사7-9","레34-36","호7-9","막15-16","고전4-6","계16-18"],["레4-6","-","삼상28-31","-","욥13-15","-","사10-12","레37-39","-","눅1-3","-","계19-22"]];

        document.addEventListener('DOMContentLoaded', () => {
            const now = new Date();
            initWeeklyBible(now);
            initFullBibleTable(now);
            initScratchCanvas();
            initScrollAnimations();
            
            setTimeout(() => {
                const targetTemp = 98; 
                document.getElementById('grace-thermometer').style.height = targetTemp + '%';
                animateCounter('temp-num', targetTemp);
            }, 800);
        });

        // 우아한 스크롤 등장 애니메이션
        function initScrollAnimations() {
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal-on-scroll').forEach(section => {
                observer.observe(section);
            });
        }

        function initFullBibleTable(now) {
            const head = document.getElementById('bible-head');
            const body = document.getElementById('bible-full-body');
            head.innerHTML = `<tr><th class="day-cell-fixed">일</th>${Array.from({length:12}, (_,i)=>`<th>${i+1}월</th>`).join('')}</tr>`;
            
            body.innerHTML = '';
            fullBibleData.forEach((row, idx) => {
                const tr = document.createElement('tr');
                let rowHtml = `<td class="day-cell-fixed">${idx+1}</td>`;
                row.forEach((cell, mIdx) => {
                    const isToday = (idx+1 === now.getDate() && mIdx === now.getMonth());
                    rowHtml += `<td class="${isToday ? 'today-cell-highlight' : ''}">${cell === '-' ? '' : cell}</td>`;
                });
                tr.innerHTML = rowHtml;
                body.appendChild(tr);
            });
        }

        function initWeeklyBible(now) {
            const grid = document.getElementById('weekly-bible-grid');
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay()); 
            const dayNames = ['주일', '월', '화', '수', '목', '금', '토', '주일'];
            grid.innerHTML = '';
            for(let i=0; i<8; i++) {
                const d = new Date(startOfWeek);
                d.setDate(startOfWeek.getDate() + i);
                const isToday = d.toDateString() === now.toDateString();
                const reading = fullBibleData[d.getDate()-1][d.getMonth()] || "자유통독";
                grid.innerHTML += `<div class="p-2 rounded-xl text-center flex flex-col justify-center border ${isToday ? 'border-slate-300 bg-slate-100 shadow-sm' : 'border-slate-100 bg-[#FAFAFA]'}">
                    <div class="text-[10px] font-extrabold ${isToday ? 'text-slate-800' : (i===0||i===7?'text-slate-700':'text-slate-400')} mb-1.5 uppercase tracking-wide">${dayNames[i]}<span class="opacity-50 ml-0.5">${d.getDate()}</span></div>
                    <div class="font-bold text-slate-600 text-[10px] tracking-tighter">${reading}</div></div>`;
            }
        }

        function openScriptureModal() { document.getElementById('scriptureModal').classList.add('active'); }
        function closeScriptureModal() { document.getElementById('scriptureModal').classList.remove('active'); }
        function openAfternoonScriptureModal() { document.getElementById('afternoonScriptureModal').classList.add('active'); }
        function closeAfternoonScriptureModal() { document.getElementById('afternoonScriptureModal').classList.remove('active'); }
        function openBibleModal() { document.getElementById('bibleModal').classList.add('active'); }
        function closeBibleModal() { document.getElementById('bibleModal').classList.remove('active'); }
        function openGiveModal() { document.getElementById('giveModal').classList.add('active'); }
        function closeGiveModal() { document.getElementById('giveModal').classList.remove('active'); }
        
        function openMannaModal() { 
            const pick = {
                t:"오직 주께서 각 사람에게 나눠 주신 대로 하나님이 각 사람을 부르신 그대로 행하라 내가 모든 교회에서 이와 같이 명하노라", 
                r:"고린도전서 7:17"
            };
            document.getElementById('manna-text').innerText = `"${pick.t}"`;
            document.getElementById('manna-ref').innerText = `- ${pick.r} -`;
            document.getElementById('manna-ref').style.opacity = '0'; 
            document.getElementById('mannaModal').classList.add('active'); 
            resetScratch(); 
        }
        function closeMannaModal() { document.getElementById('mannaModal').classList.remove('active'); }
        function checkAttendance(btn, id) { btn.style.display = 'none'; document.getElementById(`stamp-${id}`).classList.add('stamp-animate'); confetti({particleCount: 100, spread: 70, origin: { y: 0.7 }, colors: ['#0F172A', '#64748B', '#CBD5E1']}); }
        
        function animateCounter(id, target) {
            let current = 0; const el = document.getElementById(id);
            const interval = setInterval(() => { 
                if(current >= target) {
                    clearInterval(interval);
                    el.innerText = target + '°';
                    return;
                }
                el.innerText = current + '°'; 
                current += 2; 
            }, 15);
        }

        let canvas, ctx, isDrawing = false;
        function initScratchCanvas() {
            canvas = document.getElementById('scratch-canvas'); ctx = canvas.getContext('2d');
            canvas.addEventListener('mousedown', () => isDrawing = true);
            canvas.addEventListener('mousemove', scratch);
            canvas.addEventListener('mouseup', () => isDrawing = false);
            canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive: false});
            canvas.addEventListener('touchmove', scratch, {passive: false});
        }
        function resetScratch() {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width; canvas.height = rect.height;
            // 고급스러운 매트 실버 커버
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#E2E8F0');
            gradient.addColorStop(1, '#CBD5E1'); 
            ctx.fillStyle = gradient; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#64748B';
            ctx.font = 'bold 16px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('여기를 동전으로 긁어보세요 ✨', canvas.width / 2, canvas.height / 2);
            
            ctx.globalCompositeOperation = 'destination-out';
        }
        
        function scratch(e) {
            if(!isDrawing) return; e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
            const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
            
            const radius = 40;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();

            document.getElementById('manna-ref').style.opacity = '1';
        }
    </script>
</body>
</html>