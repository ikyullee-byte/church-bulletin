<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#ffffff">
    <title>원종제일교회 · 주일 주보</title>

    <!-- External Resources -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap');

        /* ============================================================
           DESIGN TOKENS — 모노크롬 시스템 (라이트 / 다크 자동 전환)
           ============================================================ */
        :root {
            --canvas: #F5F5F6;
            --paper: #FFFFFF;
            --soft: #FAFAFA;
            --chip: #F4F4F5;
            --ink: #09090B;
            --ink-2: #3F3F46;
            --ink-3: #71717A;
            --ink-4: #A1A1AA;
            --line: rgba(9, 9, 11, 0.08);
            --line-2: rgba(9, 9, 11, 0.16);
            --header: rgba(255, 255, 255, 0.78);
            --stamp-bg: rgba(255, 255, 255, 0.88);
            --shadow: 0 24px 50px -32px rgba(9, 9, 11, 0.42);
            --r: 24px;
            --ease: cubic-bezier(0.22, 1, 0.36, 1);
        }
        body.dark-mode {
            --canvas: #060607;
            --paper: #0D0D0F;
            --soft: #121215;
            --chip: #1B1B1F;
            --ink: #FAFAFA;
            --ink-2: #D4D4D8;
            --ink-3: #A1A1AA;
            --ink-4: #6B6B73;
            --line: rgba(250, 250, 250, 0.10);
            --line-2: rgba(250, 250, 250, 0.20);
            --header: rgba(13, 13, 15, 0.72);
            --stamp-bg: rgba(13, 13, 15, 0.88);
            --shadow: 0 24px 50px -30px rgba(0, 0, 0, 0.95);
        }

        /* ============================================================
           BASE
           ============================================================ */
        * { -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; scroll-padding-top: 5.5rem; }
        body {
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
            background: var(--canvas);
            color: var(--ink);
            letter-spacing: -0.035em;
            overflow-x: hidden;
            transition: background-color .4s var(--ease), color .4s var(--ease);
        }
        .serif { font-family: 'Gowun Batang', ui-serif, Georgia, serif; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--line-2); border-radius: 99px; }

        /* 글자 크기 모드 */
        body.large-text { font-size: 1.08rem; }
        body.large-text .tl .k { font-size: 1.02rem; }
        body.large-text .tl .v { font-size: .95rem; }
        body.large-text .verse-lg { font-size: clamp(1.3rem, 2.6vw, 1.7rem); }
        body.large-text .gcap { font-size: 13.5px; }

        /* 스크롤 진행 바 */
        #progress {
            position: fixed; top: 0; left: 0; height: 2px; width: 0;
            background: var(--ink); z-index: 300; transition: width .12s linear;
        }

        /* ============================================================
           HEADER
           ============================================================ */
        .site-header {
            position: sticky; top: 0; z-index: 100;
            background: var(--header);
            backdrop-filter: saturate(180%) blur(22px);
            -webkit-backdrop-filter: saturate(180%) blur(22px);
            border-bottom: 1px solid var(--line);
        }
        .logo-img { filter: grayscale(1) contrast(1.05); }
        .nav-link {
            font-size: 12px; font-weight: 800; letter-spacing: 0.02em;
            color: var(--ink-3); position: relative; padding: 4px 0;
            transition: color .25s var(--ease);
        }
        .nav-link::after {
            content: ''; position: absolute; left: 0; bottom: -2px; height: 1.5px; width: 0;
            background: var(--ink); transition: width .3s var(--ease);
        }
        .nav-link:hover { color: var(--ink); }
        .nav-link:hover::after { width: 100%; }
        .icon-btn {
            width: 38px; height: 38px; border-radius: 999px;
            border: 1px solid var(--line-2); background: var(--paper);
            display: inline-flex; align-items: center; justify-content: center;
            color: var(--ink-2);
            transition: transform .25s var(--ease), color .25s, border-color .25s;
        }
        .icon-btn:hover { color: var(--ink); border-color: var(--ink); transform: translateY(-1px); }
        .icon-btn:active { transform: scale(.94); }

        /* ============================================================
           HERO
           ============================================================ */
        .hero {
            position: relative; overflow: hidden;
            background: var(--paper);
            border-bottom: 1px solid var(--line);
        }
        .hero-grid {
            position: absolute; inset: 0;
            background-image:
                linear-gradient(var(--line) 1px, transparent 1px),
                linear-gradient(90deg, var(--line) 1px, transparent 1px);
            background-size: 58px 58px;
            -webkit-mask-image: radial-gradient(125% 95% at 50% 0%, #000 15%, transparent 82%);
            mask-image: radial-gradient(125% 95% at 50% 0%, #000 15%, transparent 82%);
        }
        .hero-ghost {
            position: absolute; left: -1vw; bottom: -1.5vw;
            font-size: 21vw; font-weight: 900; letter-spacing: -0.07em; line-height: 0.78;
            color: var(--ink); opacity: 0.045; white-space: nowrap; pointer-events: none;
        }
        .hero-title {
            font-size: clamp(3rem, 12.5vw, 7.5rem);
            font-weight: 900; line-height: 0.9; letter-spacing: -0.065em; color: var(--ink);
        }
        .hero-inner { position: relative; z-index: 10; }
        .chip {
            display: inline-flex; align-items: center; gap: 7px;
            padding: 8px 14px; border-radius: 999px;
            border: 1px solid var(--line-2); background: var(--paper);
            font-size: 11.5px; font-weight: 800; color: var(--ink-2); white-space: nowrap;
        }
        .chip b { color: var(--ink); font-variant-numeric: tabular-nums; }

        /* TICKER */
        .ticker { overflow: hidden; background: var(--paper); border-bottom: 1px solid var(--line); }
        .ticker-track {
            display: flex; gap: 46px; width: max-content; padding: 13px 0;
            animation: marquee 36s linear infinite;
        }
        .ticker-item {
            font-size: 11px; font-weight: 800; letter-spacing: 0.22em;
            text-transform: uppercase; color: var(--ink-3); white-space: nowrap;
        }
        .ticker-item i { color: var(--ink-4); margin-right: 12px; font-size: 9px; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ============================================================
           공통 컴포넌트
           ============================================================ */
        .section { padding-top: 4.25rem; }
        .sec-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 20px; }
        .sec-num { font-size: 11px; font-weight: 900; letter-spacing: 0.18em; color: var(--ink-4); font-variant-numeric: tabular-nums; }
        .sec-title { font-size: 1.3rem; font-weight: 900; letter-spacing: -0.045em; color: var(--ink); }
        .sec-line { flex: 1; height: 1px; background: var(--line); }

        .label {
            font-size: 10px; font-weight: 900; letter-spacing: 0.22em;
            text-transform: uppercase; color: var(--ink-3);
        }
        .surface {
            background: var(--paper); border: 1px solid var(--line); border-radius: var(--r);
            transition: border-color .3s var(--ease), transform .3s var(--ease), box-shadow .3s var(--ease);
        }
        .surface-hover:hover { border-color: var(--line-2); transform: translateY(-2px); box-shadow: var(--shadow); }

        .btn-ink {
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            background: var(--ink); color: var(--paper);
            font-size: 12.5px; font-weight: 800; padding: 13px 22px; border-radius: 999px;
            transition: transform .25s var(--ease), opacity .25s;
        }
        .btn-ink:hover { transform: translateY(-1px); opacity: .92; }
        .btn-ink:active { transform: scale(.97); }
        .btn-line {
            display: inline-flex; align-items: center; gap: 8px;
            border: 1px solid var(--line-2); background: var(--paper); color: var(--ink);
            font-size: 12.5px; font-weight: 800; padding: 12px 20px; border-radius: 999px;
            transition: transform .25s var(--ease), border-color .25s;
        }
        .btn-line:hover { border-color: var(--ink); transform: translateY(-1px); }
        .btn-mini {
            display: inline-flex; align-items: center; gap: 6px;
            font-size: 10.5px; font-weight: 800; letter-spacing: 0.05em;
            padding: 6px 11px; border-radius: 999px;
            border: 1px solid var(--line-2); background: var(--paper); color: var(--ink);
            transition: all .22s var(--ease);
        }
        .btn-mini:hover { background: var(--ink); color: var(--paper); border-color: var(--ink); }
        .btn-mini:active { transform: scale(.95); }

        /* ============================================================
           말씀 · 은혜 온도 · 통독
           ============================================================ */
        .verse-lg { font-size: clamp(1.15rem, 2.4vw, 1.5rem); line-height: 1.9; font-weight: 700; color: var(--ink); word-break: keep-all; }
        .temp-num { font-size: clamp(3rem, 10vw, 4.5rem); font-weight: 900; letter-spacing: -0.07em; line-height: 1; font-variant-numeric: tabular-nums; }
        .meter { height: 8px; border-radius: 99px; background: var(--chip); border: 1px solid var(--line); overflow: hidden; }
        .meter-fill { height: 100%; width: 0; background: var(--ink); border-radius: 99px; transition: width 2.2s var(--ease); }

        .daycell {
            border: 1px solid var(--line); border-radius: 16px; background: var(--soft);
            padding: 13px 8px; text-align: center;
            transition: border-color .25s, background-color .25s;
        }
        .daycell .d { font-size: 10px; font-weight: 900; letter-spacing: 0.06em; color: var(--ink-3); }
        .daycell .d span { opacity: .45; margin-left: 3px; font-variant-numeric: tabular-nums; }
        .daycell .r { margin-top: 7px; font-size: 11px; font-weight: 800; color: var(--ink); letter-spacing: -0.03em; }
        .daycell.is-sun .d { color: var(--ink-2); }
        .daycell.is-today { background: var(--ink); border-color: var(--ink); }
        .daycell.is-today .d, .daycell.is-today .r { color: var(--paper); }
        .daycell.is-today .d span { opacity: .6; }

        /* ============================================================
           예배 — 세그먼트 탭 + 타임라인
           ============================================================ */
        .seg {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px;
            padding: 4px; border-radius: 999px; background: var(--chip);
            border: 1px solid var(--line); margin-bottom: 14px;
        }
        .seg-btn {
            display: flex; flex-direction: column; align-items: center; gap: 1px;
            padding: 10px 4px; border-radius: 999px;
            font-size: 12px; font-weight: 800; color: var(--ink-3);
            transition: all .28s var(--ease);
        }
        .seg-btn em { font-style: normal; font-size: 10px; font-weight: 800; letter-spacing: 0.06em; opacity: .8; font-variant-numeric: tabular-nums; }
        .seg-btn.is-active { background: var(--paper); color: var(--ink); box-shadow: 0 6px 18px -12px rgba(9, 9, 11, .5); }

        .panel { overflow: hidden; }
        .panel-head {
            display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
            padding: 26px 24px 22px; border-bottom: 1px solid var(--line); background: var(--soft);
        }
        .panel-title { font-size: clamp(1.4rem, 3.4vw, 1.9rem); font-weight: 900; letter-spacing: -0.05em; color: var(--ink); }
        .panel-sub { margin-top: 7px; font-size: 12px; font-weight: 700; color: var(--ink-3); }
        .panel-body { padding: 8px 24px 22px; }
        .panel-foot {
            padding: 14px 24px; border-top: 1px solid var(--line);
            font-size: 11px; font-weight: 600; color: var(--ink-4); text-align: center; background: var(--soft);
        }

        .tl {
            display: grid; grid-template-columns: 2rem 1fr auto; gap: 14px;
            align-items: start; padding: 15px 2px; border-bottom: 1px solid var(--line);
            transition: background-color .25s var(--ease);
        }
        .tl:last-child { border-bottom: none; }
        .tl:hover { background: rgba(9, 9, 11, .02); }
        body.dark-mode .tl:hover { background: rgba(255, 255, 255, .03); }
        .tl .n { font-size: 10px; font-weight: 900; color: var(--ink-4); font-variant-numeric: tabular-nums; padding-top: 3px; }
        .tl .k { font-size: 14.5px; font-weight: 800; color: var(--ink); }
        .tl .k small { display: block; margin-top: 4px; font-size: 11.5px; font-weight: 700; color: var(--ink-3); letter-spacing: -0.02em; }
        .tl .k .btn-mini { margin-top: 9px; }
        .tl .v { font-size: 13px; font-weight: 700; color: var(--ink-2); text-align: right; white-space: nowrap; }

        .poster {
            margin: 26px 0; padding: 40px 22px; border-radius: 22px;
            background: var(--ink); color: var(--paper); text-align: center;
        }
        .poster .label { color: var(--paper); opacity: .55; }
        .poster-title { margin-top: 12px; font-size: clamp(1.35rem, 4vw, 2rem); font-weight: 700; letter-spacing: -0.04em; word-break: keep-all; }
        .poster-by { margin-top: 14px; font-size: 12.5px; font-weight: 800; opacity: .7; }

        /* 참석 도장 */
        .stamp {
            position: absolute; top: 18px; right: 18px; width: 74px; height: 74px;
            border-radius: 999px; border: 3px solid var(--ink); color: var(--ink);
            display: flex; align-items: center; justify-content: center;
            font-size: 13px; font-weight: 900; line-height: 1.15; text-align: center;
            background: var(--stamp-bg); backdrop-filter: blur(3px);
            transform: rotate(-12deg) scale(1); opacity: 0; pointer-events: none; z-index: 60;
        }
        .stamp-animate { animation: stampIn .6s forwards cubic-bezier(.34, 1.56, .64, 1); }
        @keyframes stampIn {
            0% { opacity: 0; transform: rotate(-12deg) scale(3); }
            100% { opacity: .92; transform: rotate(-12deg) scale(1); }
        }

        /* ============================================================
           소식
           ============================================================ */
        .news-item {
            display: flex; gap: 16px; padding: 16px 4px; border-bottom: 1px solid var(--line);
            transition: padding-left .3s var(--ease);
        }
        .news-item:last-child { border-bottom: none; }
        .news-item:hover { padding-left: 10px; }
        .news-item .num {
            flex: none; width: 26px; height: 26px; border-radius: 999px;
            border: 1px solid var(--line-2); color: var(--ink-3);
            display: flex; align-items: center; justify-content: center;
            font-size: 10.5px; font-weight: 900; font-variant-numeric: tabular-nums;
        }
        .news-item:hover .num { background: var(--ink); color: var(--paper); border-color: var(--ink); }
        .news-item p { font-size: 13.5px; font-weight: 600; color: var(--ink-2); line-height: 1.75; }

        .sched-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--line); }
        .sched-item:last-child { border-bottom: none; }
        .sched-item i { color: var(--ink-3); font-size: 13px; margin-top: 4px; }
        .sched-item p { font-size: 13.5px; font-weight: 700; color: var(--ink-2); line-height: 1.7; }
        .sched-item strong { color: var(--ink); font-weight: 900; }

        .names { font-size: 15px; font-weight: 900; color: var(--ink); line-height: 2; word-break: keep-all; }
        .names span { color: var(--ink-4); margin: 0 8px; font-weight: 400; }

        /* ============================================================
           갤러리 — 스냅 캐러셀
           ============================================================ */
        .gallery {
            display: grid; grid-auto-flow: column; grid-auto-columns: 80%;
            gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory;
            padding: 2px 2px 8px; scrollbar-width: none;
        }
        .gallery::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) { .gallery { grid-auto-columns: 31%; } }
        .gcard {
            scroll-snap-align: start; background: var(--paper); border: 1px solid var(--line);
            border-radius: 20px; padding: 10px;
            transition: border-color .3s var(--ease), transform .3s var(--ease), box-shadow .3s var(--ease);
        }
        .gcard:hover { border-color: var(--line-2); transform: translateY(-3px); box-shadow: var(--shadow); }
        .gcard .ph { position: relative; width: 100%; aspect-ratio: 4 / 3; border-radius: 14px; overflow: hidden; background: var(--chip); }
        .gcard img { width: 100%; height: 100%; object-fit: cover; cursor: zoom-in; transition: transform .8s var(--ease); }
        .gcard:hover img { transform: scale(1.05); }
        .gcap { margin-top: 12px; font-size: 12.5px; font-weight: 700; color: var(--ink-2); text-align: center; letter-spacing: -0.02em; }

        /* ============================================================
           안내 링크
           ============================================================ */
        .link-row {
            display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px;
            padding: 20px 22px; border: 1px solid var(--line); border-radius: 18px;
            background: var(--paper); transition: all .3s var(--ease);
        }
        .link-row:hover { border-color: var(--ink); transform: translateX(3px); }
        .link-row .idx { font-size: 10.5px; font-weight: 900; letter-spacing: 0.16em; color: var(--ink-4); }
        .link-row:hover .idx { color: var(--ink); }
        .link-row h4 { font-size: 15px; font-weight: 800; color: var(--ink); }

        /* ============================================================
           FOOTER
           ============================================================ */
        .foot-mark {
            font-size: clamp(2.6rem, 12vw, 7rem); font-weight: 900; letter-spacing: -0.07em;
            line-height: .85; color: transparent;
            -webkit-text-stroke: 1px var(--line-2); text-stroke: 1px var(--line-2);
        }

        /* ============================================================
           DOCK
           ============================================================ */
        .dock {
            position: fixed; left: 50%; bottom: calc(18px + env(safe-area-inset-bottom));
            transform: translateX(-50%); z-index: 150;
            display: flex; align-items: center; gap: 4px; padding: 7px;
            border-radius: 999px; border: 1px solid var(--line-2);
            background: var(--header);
            backdrop-filter: saturate(180%) blur(22px);
            -webkit-backdrop-filter: saturate(180%) blur(22px);
            box-shadow: var(--shadow);
        }
        .dock-btn {
            display: flex; flex-direction: column; align-items: center; gap: 3px;
            width: 78px; padding: 7px 0; border-radius: 999px;
            color: var(--ink-3); font-size: 9.5px; font-weight: 900; letter-spacing: 0.04em;
            transition: color .25s, background-color .25s;
        }
        .dock-btn i { font-size: 15px; }
        .dock-btn:hover { color: var(--ink); background: var(--chip); }
        .dock-btn:active { transform: scale(.94); }
        .dock-main {
            width: 52px; height: 52px; border-radius: 999px; flex: none;
            background: var(--ink); color: var(--paper);
            display: flex; align-items: center; justify-content: center; font-size: 19px;
            box-shadow: 0 14px 28px -14px rgba(0, 0, 0, .55);
            transition: transform .3s var(--ease);
        }
        .dock-main:hover { transform: translateY(-2px) scale(1.03); }
        .dock-main:active { transform: scale(.95); }

        /* ============================================================
           MODAL / BOTTOM SHEET
           ============================================================ */
        .modal {
            position: fixed; inset: 0; z-index: 200; display: none;
            align-items: flex-end; justify-content: center;
            background: rgba(9, 9, 11, .55); backdrop-filter: blur(8px);
        }
        .modal.active { display: flex; animation: fadeIn .3s var(--ease); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .sheet {
            position: relative; background: var(--paper); width: 100%; max-width: 42rem;
            max-height: 90vh; border-radius: 28px 28px 0 0; border: 1px solid var(--line);
            display: flex; flex-direction: column; overflow: hidden;
            animation: sheetUp .45s var(--ease);
        }
        .sheet-wide { max-width: 64rem; }
        @keyframes sheetUp { from { transform: translateY(30px); opacity: .5; } to { transform: translateY(0); opacity: 1; } }
        .grabber { width: 40px; height: 4px; border-radius: 99px; background: var(--line-2); margin: 10px auto 0; flex: none; }
        .sheet-head {
            display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
            padding: 20px 24px 16px; border-bottom: 1px solid var(--line);
        }
        .sheet-title { font-size: 1.3rem; font-weight: 900; letter-spacing: -0.045em; color: var(--ink); }
        .sheet-body { overflow-y: auto; padding: 22px 24px; }
        .sheet-foot { padding: 14px 24px calc(18px + env(safe-area-inset-bottom)); border-top: 1px solid var(--line); }
        @media (min-width: 768px) {
            .modal { align-items: center; padding: 24px; }
            .sheet { border-radius: 28px; max-height: 84vh; }
            .sheet-foot { padding-bottom: 18px; }
            .grabber { display: none; }
        }

        .scripture p { font-size: 15.5px; font-weight: 500; line-height: 1.95; color: var(--ink-2); margin-bottom: 20px; word-break: keep-all; }
        .scripture sup { font-size: 10.5px; font-weight: 900; color: var(--ink-3); margin-right: 7px; letter-spacing: 0.04em; }
        .divider-dash { height: 1px; border-top: 1px dashed var(--line-2); margin: 22px 0; }

        /* ============================================================
           1년 통독표
           ============================================================ */
        .bible-scroll { overflow: auto; max-height: 62vh; border: 1px solid var(--line); border-radius: 18px; background: var(--paper); }
        .btable { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 12px; min-width: 900px; }
        .btable th {
            position: sticky; top: 0; z-index: 20; background: var(--soft); color: var(--ink);
            font-weight: 900; padding: 14px 8px; border-bottom: 1px solid var(--line-2);
        }
        .btable td {
            padding: 12px 5px; text-align: center; color: var(--ink-2);
            border-bottom: 1px solid var(--line); border-right: 1px solid var(--line);
        }
        .btable .day-col {
            position: sticky; left: 0; z-index: 10; width: 52px;
            font-weight: 900; color: var(--ink); background: var(--soft);
            border-right: 1px solid var(--line-2);
        }
        .btable .is-today-cell { background: var(--ink); color: var(--paper); font-weight: 900; }

        /* ============================================================
           만나 스크래치 카드
           ============================================================ */
        .scratch-wrap { position: relative; overflow: hidden; border-radius: 22px; }
        #scratch-canvas {
            position: absolute; inset: 0; width: 100%; height: 100%;
            z-index: 20; border-radius: 22px; cursor: crosshair; touch-action: none;
        }
        .manna-icon {
            width: 60px; height: 60px; border-radius: 999px; margin: 0 auto 24px;
            border: 1px solid var(--line-2); background: var(--soft); color: var(--ink-2);
            display: flex; align-items: center; justify-content: center; font-size: 21px;
        }

        /* ============================================================
           애니메이션 / 유틸
           ============================================================ */
        .reveal-on-scroll {
            opacity: 0; transform: translateY(26px);
            transition: opacity .9s var(--ease), transform .9s var(--ease);
        }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
        /* 반응형 노출 제어 (Tailwind display 유틸과 충돌하지 않도록 자체 정의) */
        .only-desktop { display: none; }
        @media (min-width: 640px) { .only-desktop { display: inline-flex; } }
        .only-mobile { display: inline-flex; }
        @media (min-width: 640px) { .only-mobile { display: none; } }
        .hair-top { border-top: 1px solid var(--line); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            .ticker-track { animation: none; }
            .reveal-on-scroll { opacity: 1; transform: none; transition: none; }
        }
    </style>
</head>
<body id="top">

    <div id="progress" aria-hidden="true"></div>

    <!-- ================= NAVIGATION ================= -->
    <nav class="site-header">
        <div class="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
            <a href="#top" class="flex items-center gap-3 shrink-0">
                <img src="https://ikyullee-byte.github.io/TEST01/logo.png" alt="원종제일교회" class="logo-img h-8 w-auto">
                <span class="hidden sm:block leading-none">
                    <span class="block text-[13px] font-black tracking-tight">원종제일교회</span>
                    <span class="block mt-1 text-[9px] font-black tracking-[0.2em] uppercase" style="color:var(--ink-4)">Wonjong First</span>
                </span>
            </a>

            <div class="hidden md:flex items-center gap-7">
                <a href="#word" class="nav-link">말씀</a>
                <a href="#services" class="nav-link">예배</a>
                <a href="#news" class="nav-link">소식</a>
                <a href="#gallery" class="nav-link">갤러리</a>
                <a href="#guide" class="nav-link">안내</a>
            </div>

            <div class="flex items-center gap-2 shrink-0">
                <button class="icon-btn" onclick="document.body.classList.toggle('large-text')" aria-label="글자 크기 조절">
                    <span class="text-[11px] font-black tracking-tight">가+</span>
                </button>
                <button class="icon-btn" onclick="toggleDark(this)" aria-label="다크 모드 전환">
                    <i class="fas fa-moon text-[12px]"></i>
                </button>
            </div>
        </div>
    </nav>

    <!-- ================= HERO ================= -->
    <header class="hero">
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="hero-ghost" aria-hidden="true">WONJONG FIRST</div>

        <div class="hero-inner mx-auto max-w-6xl px-5 pt-14 pb-12 md:pt-20 md:pb-16">
            <p class="label">2026 · 주일 주보 &nbsp;/&nbsp; Sunday Bulletin</p>

            <h1 class="hero-title mt-6">주일 예배</h1>

            <div class="mt-7 flex items-center gap-4">
                <span class="h-px flex-1" style="background:var(--line-2)"></span>
                <span class="text-[11px] font-black tracking-[0.3em] uppercase" style="color:var(--ink-4)">No. 42</span>
            </div>

            <div class="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p class="text-[17px] font-black tracking-tight" style="color:var(--ink)">2026. 10. 18</p>
                    <p class="mt-2 text-[12.5px] font-bold" style="color:var(--ink-3)">오순절 후 스물두 번째 주일</p>
                    <p class="serif mt-4 text-[15px] font-bold leading-relaxed" style="color:var(--ink-2)">십자가로 완성하신 충분한 사랑과 은혜</p>
                </div>

                <div class="flex flex-wrap gap-2 md:justify-end">
                    <span class="chip">주일 오전 <b>11:00</b></span>
                    <span class="chip">주일 오후 <b>13:15</b></span>
                    <span class="chip">수요 <b>19:00</b></span>
                </div>
            </div>

            <div class="mt-9 flex flex-wrap gap-3">
                <button onclick="openMannaModal()" class="btn-ink">
                    <i class="fas fa-gift text-[12px]"></i>오늘의 만나
                </button>
                <button onclick="openBibleModal()" class="btn-line">
                    <i class="fas fa-book-open text-[12px]"></i>1년 통독표
                </button>
                <a href="#services" class="btn-line">
                    예배 순서 <i class="fas fa-arrow-down text-[11px]"></i>
                </a>
            </div>
        </div>
    </header>

    <!-- ================= TICKER ================= -->
    <div class="ticker" aria-hidden="true">
        <div class="ticker-track" id="ticker-track">
            <span class="ticker-item"><i class="fas fa-cross"></i>오직 주께서 각 사람에게 나눠 주신 대로 하나님이 각 사람을 부르신 그대로 행하라</span>
            <span class="ticker-item"><i class="fas fa-church"></i>경기도 부천시 오정구 원종로36번길20</span>
            <span class="ticker-item"><i class="fas fa-cross"></i>고린도전서 7:17</span>
            <span class="ticker-item"><i class="fas fa-dove"></i>주일 오전 11:00 · 오후 13:15 · 수요 19:00</span>
        </div>
    </div>

    <main class="mx-auto max-w-6xl px-5">

        <!-- ================= 01 말씀 ================= -->
        <section id="word" class="section reveal-on-scroll">
            <div class="sec-head">
                <span class="sec-num">01</span>
                <h2 class="sec-title">이번 주 말씀</h2>
                <span class="sec-line"></span>
                <button onclick="openBibleModal()" class="btn-mini only-desktop">통독표 전체보기 <i class="fas fa-arrow-right text-[9px]"></i></button>
            </div>

            <div class="grid gap-4 lg:grid-cols-12">
                <!-- 말씀 카드 -->
                <article class="surface p-7 md:p-10 lg:col-span-7">
                    <div class="flex items-center gap-3">
                        <span class="label">Scripture</span>
                        <span class="h-px flex-1" style="background:var(--line)"></span>
                    </div>
                    <p class="serif verse-lg mt-7">“오직 주께서 각 사람에게 나눠 주신 대로 하나님이 각 사람을 부르신 그대로 행하라 내가 모든 교회에서 이와 같이 명하노라”</p>
                    <div class="mt-8 flex items-center justify-between gap-4">
                        <p class="text-[12.5px] font-black tracking-[0.18em] uppercase" style="color:var(--ink)">고린도전서 7:17</p>
                        <button onclick="openMannaModal()" class="btn-mini">말씀 만나 긁기 <i class="fas fa-hand-pointer text-[9px]"></i></button>
                    </div>
                </article>

                <!-- 은혜 온도 -->
                <article class="surface p-7 md:p-8 lg:col-span-5 flex flex-col justify-between">
                    <div class="flex items-start justify-between">
                        <p class="label">Church Temperature</p>
                        <i class="fas fa-temperature-half text-[13px]" style="color:var(--ink-4)"></i>
                    </div>
                    <div class="mt-8">
                        <div class="temp-num" id="temp-num">0°</div>
                        <div class="meter mt-7"><div id="grace-thermometer" class="meter-fill"></div></div>
                        <div class="mt-3 flex items-center justify-between text-[10.5px] font-black tracking-wider" style="color:var(--ink-4)">
                            <span>0°</span>
                            <span>목표 100°</span>
                        </div>
                    </div>
                    <p class="mt-8 text-[12px] font-bold leading-relaxed" style="color:var(--ink-3)">함께 모여 예배할수록 교회의 온도가 올라갑니다.</p>
                </article>

                <!-- 주간 통독 -->
                <article class="surface p-6 md:p-8 lg:col-span-12">
                    <div class="mb-5 flex items-center justify-between gap-4">
                        <p class="label">이번 주 통독 · Daily Reading</p>
                        <button onclick="openBibleModal()" class="btn-mini only-mobile">전체보기</button>
                    </div>
                    <div id="weekly-bible-grid" class="grid grid-cols-4 md:grid-cols-8 gap-2"></div>
                </article>
            </div>
        </section>

        <!-- ================= 02 예배 ================= -->
        <section id="services" class="section reveal-on-scroll">
            <div class="sec-head">
                <span class="sec-num">02</span>
                <h2 class="sec-title">예배 순서</h2>
                <span class="sec-line"></span>
            </div>

            <div class="seg" role="tablist" aria-label="예배 선택">
                <button class="seg-btn is-active" role="tab" aria-selected="true" onclick="switchService('svc-morning', this)">주일 오전<em>11:00</em></button>
                <button class="seg-btn" role="tab" aria-selected="false" onclick="switchService('svc-afternoon', this)">주일 오후<em>13:15</em></button>
                <button class="seg-btn" role="tab" aria-selected="false" onclick="switchService('svc-wed', this)">수요 예배<em>19:00</em></button>
            </div>

            <!-- 주일 오전 -->
            <div id="svc-morning" class="panel surface">
                <div id="stamp-morning" class="stamp">예배<br>참석</div>
                <div class="panel-head">
                    <div>
                        <p class="label">Sunday Morning Worship</p>
                        <h3 class="panel-title mt-2.5">주일 오전 예배</h3>
                        <p class="panel-sub">집례 이성결 목사 · 오순절 후 스물두 번째 주일</p>
                    </div>
                    <button onclick="checkAttendance(this, 'morning')" class="btn-line shrink-0"><i class="fas fa-check text-[11px]"></i>출석 체크</button>
                </div>
                <div class="panel-body">
                    <div class="tl"><span class="n">01</span><span class="k">오르겐 연주</span><span class="v">반주자</span></div>
                    <div class="tl"><span class="n">02</span><span class="k">예배 선포</span><span class="v">집례자</span></div>
                    <div class="tl"><span class="n">03</span><span class="k">*찬송<small>9장</small></span><span class="v">다같이</span></div>
                    <div class="tl"><span class="n">04</span><span class="k">*통성 기도<small>주님여 이 손을</small></span><span class="v">다같이</span></div>
                    <div class="tl"><span class="n">05</span><span class="k">*성시 교독<small>81번</small></span><span class="v">집례자와 회중</span></div>
                    <div class="tl"><span class="n">06</span><span class="k">*신앙 고백<small>사도신경</small></span><span class="v">다같이</span></div>
                    <div class="tl"><span class="n">07</span><span class="k">찬송<small>165장</small></span><span class="v">다같이</span></div>
                    <div class="tl"><span class="n">08</span><span class="k">대표 기도</span><span class="v">김성래 안수집사</span></div>
                    <div class="tl">
                        <span class="n">09</span>
                        <span class="k">성경 봉독
                            <small>에베소서 2:12-14, 19-22</small>
                            <button onclick="openScriptureModal()" class="btn-mini"><i class="fas fa-book-open text-[9px]"></i>본문 읽기</button>
                        </span>
                        <span class="v">이성결 목사</span>
                    </div>
                    <div class="tl"><span class="n">10</span><span class="k">찬양</span><span class="v">찬양대</span></div>

                    <div class="poster">
                        <p class="label">Sermon</p>
                        <h4 class="poster-title serif">“십자가로 충분한 은혜”</h4>
                        <p class="poster-by">이성결 목사</p>
                    </div>

                    <div class="tl"><span class="n">11</span><span class="k">찬송<small>304장</small></span><span class="v">다같이</span></div>
                    <div class="tl"><span class="n">12</span><span class="k">봉헌 기도</span><span class="v">이성결 목사</span></div>
                    <div class="tl"><span class="n">13</span><span class="k">교회 소식</span><span class="v">집례자</span></div>
                    <div class="tl"><span class="n">14</span><span class="k">새신자 소개</span><span class="v">집례자</span></div>
                    <div class="tl"><span class="n">15</span><span class="k">*송영<small>좋으신 하나님</small></span><span class="v">다같이</span></div>
                    <div class="tl"><span class="n">16</span><span class="k">*축도</span><span class="v">이성결 목사</span></div>
                </div>
                <p class="panel-foot">*는 일어서서, 불편하신 성도님들은 앉으셔서 예배를 드립니다.</p>
            </div>

            <!-- 주일 오후 -->
            <div id="svc-afternoon" class="panel surface hidden">
                <div id="stamp-afternoon" class="stamp">예배<br>참석</div>
                <div class="panel-head">
                    <div>
                        <p class="label">Sunday Afternoon Worship</p>
                        <h3 class="panel-title mt-2.5">주일 오후 예배</h3>
                        <p class="panel-sub">사회 이성결 목사</p>
                    </div>
                    <button onclick="checkAttendance(this, 'afternoon')" class="btn-line shrink-0"><i class="fas fa-check text-[11px]"></i>출석 체크</button>
                </div>
                <div class="panel-body">
                    <div class="tl"><span class="n">01</span><span class="k">찬양 인도</span><span class="v">찬양단</span></div>
                    <div class="tl"><span class="n">02</span><span class="k">기도 인도</span><span class="v">이서영 집사</span></div>
                    <div class="tl">
                        <span class="n">03</span>
                        <span class="k">성경 봉독
                            <small>요한복음 15:1-8</small>
                            <button onclick="openAfternoonScriptureModal()" class="btn-mini"><i class="fas fa-book-open text-[9px]"></i>본문 읽기</button>
                        </span>
                        <span class="v">사회자</span>
                    </div>
                    <div class="tl"><span class="n">04</span><span class="k">특송</span><span class="v">자원자</span></div>

                    <div class="poster">
                        <p class="label">Sermon</p>
                        <h4 class="poster-title serif">“주님은 포도나무 나는 가지입니다”</h4>
                        <p class="poster-by">이성결 목사</p>
                    </div>

                    <div class="tl"><span class="n">05</span><span class="k">교회 소식</span><span class="v">사회자</span></div>
                    <div class="tl"><span class="n">06</span><span class="k">축도</span><span class="v">이성결 목사</span></div>
                </div>
            </div>

            <!-- 수요 예배 -->
            <div id="svc-wed" class="panel surface hidden">
                <div id="stamp-wednesday" class="stamp">예배<br>참석</div>
                <div class="panel-head">
                    <div>
                        <p class="label">Wednesday Bible Study</p>
                        <h3 class="panel-title mt-2.5">수요 성서강해</h3>
                        <p class="panel-sub">사회 이성결 목사</p>
                    </div>
                    <button onclick="checkAttendance(this, 'wednesday')" class="btn-line shrink-0"><i class="fas fa-check text-[11px]"></i>출석 체크</button>
                </div>
                <div class="panel-body">
                    <div class="tl"><span class="n">01</span><span class="k">찬양</span><span class="v">다같이</span></div>
                    <div class="tl"><span class="n">02</span><span class="k">기도</span><span class="v">변지민 권사</span></div>

                    <div class="poster">
                        <p class="label">Sermon</p>
                        <h4 class="poster-title serif">“수요 예배 설교”</h4>
                        <p class="poster-by">이성결 목사</p>
                    </div>

                    <div class="tl"><span class="n">03</span><span class="k">주기도문</span><span class="v">다같이</span></div>
                </div>
                <p class="panel-foot">주기도문으로 예배를 마칩니다.</p>
            </div>
        </section>

        <!-- ================= 03 소식 ================= -->
        <section id="news" class="section reveal-on-scroll">
            <div class="sec-head">
                <span class="sec-num">03</span>
                <h2 class="sec-title">교회 소식</h2>
                <span class="sec-line"></span>
            </div>

            <div class="grid gap-4 lg:grid-cols-12">
                <!-- 주요 모임 -->
                <article class="surface surface-hover p-7 lg:col-span-5 flex flex-col justify-between">
                    <div class="flex items-start justify-between">
                        <p class="label">모임 안내</p>
                        <span class="chip"><i class="fas fa-bullhorn text-[10px]"></i>오늘</span>
                    </div>
                    <h4 class="mt-6 text-[19px] font-black tracking-tight" style="color:var(--ink)">기관장 회의</h4>
                    <p class="mt-3 text-[13.5px] font-semibold leading-relaxed" style="color:var(--ink-2)">
                        오늘 오후 예배 후, 기관장 회의가 있습니다.<br>모든 기관장님들의 참석을 바랍니다.
                    </p>
                </article>

                <!-- 교역자 일정 -->
                <article class="surface p-7 lg:col-span-7">
                    <div class="flex items-center justify-between">
                        <p class="label">Pastoral Schedule</p>
                        <i class="fas fa-calendar-check text-[13px]" style="color:var(--ink-4)"></i>
                    </div>
                    <h4 class="mt-5 text-[17px] font-black tracking-tight" style="color:var(--ink)">교역자 주간 일정</h4>
                    <div class="mt-4">
                        <div class="sched-item">
                            <i class="fas fa-circle text-[5px] mt-2.5"></i>
                            <p><strong>담임목사</strong> · 10월 12-13일 부천지방회 교역자 수련회 참석</p>
                        </div>
                        <div class="sched-item">
                            <i class="fas fa-circle text-[5px] mt-2.5"></i>
                            <p><strong>원로목사님 사모님</strong> · 10월 14일(수) 장흥성결교회 예배 인도 <span style="color:var(--ink-4)">(기도 부탁드립니다)</span></p>
                        </div>
                    </div>
                </article>

                <!-- 일반 소식 -->
                <article class="surface p-7 lg:col-span-7">
                    <p class="label">알림</p>
                    <div class="mt-4">
                        <div class="news-item">
                            <span class="num">1</span>
                            <p>예배 30분 전에 나오셔서 기도로 준비하시며 친절한 모습으로 인사를 나누시기를 바랍니다.</p>
                        </div>
                        <div class="news-item">
                            <span class="num">2</span>
                            <p>수요예배에 적극적인 참여를 부탁 드립니다.</p>
                        </div>
                        <div class="news-item">
                            <span class="num">3</span>
                            <p>10월 예배위원들은 기도로 준비하시기 바랍니다.</p>
                        </div>
                    </div>
                </article>

                <!-- 새신자 환영 -->
                <article class="surface p-7 lg:col-span-5 flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                        <p class="label">새신자 환영</p>
                        <i class="fas fa-handshake text-[13px]" style="color:var(--ink-4)"></i>
                    </div>
                    <p class="names mt-6">정순자<span>|</span>조향지<span>|</span>김병기<span>|</span>김기혜</p>
                    <p class="mt-5 text-[11.5px] font-bold tracking-wider" style="color:var(--ink-3)">주님의 이름으로 환영합니다!</p>
                </article>

                <!-- 환우 기도 -->
                <article class="surface p-7 lg:col-span-12">
                    <div class="flex items-center justify-between">
                        <p class="label">환우를 위한 기도</p>
                        <i class="fas fa-hands-praying text-[13px]" style="color:var(--ink-4)"></i>
                    </div>
                    <p class="names mt-6">임선우 어린이<span>|</span>한용희 권사님<span>|</span>박성심 권사님</p>
                    <p class="mt-5 text-[11.5px] font-bold tracking-wider" style="color:var(--ink-3)">위하여 함께 기도해 주시기 바랍니다.</p>
                </article>
            </div>
        </section>

        <!-- ================= 04 갤러리 ================= -->
        <section id="gallery" class="section reveal-on-scroll">
            <div class="sec-head">
                <span class="sec-num">04</span>
                <h2 class="sec-title">은혜의 순간</h2>
                <span class="sec-line"></span>
                <span class="hidden sm:block text-[10.5px] font-black tracking-widest uppercase" style="color:var(--ink-4)">좌우로 넘겨보세요</span>
            </div>

            <div class="gallery">
                <figure class="gcard">
                    <div class="ph">
                        <img src="https://ikyullee-byte.github.io/TEST01/retreat2026.jpg" alt="청년부 리트릿" loading="lazy" decoding="async" onclick="openImage(this)" onerror="this.src='https://via.placeholder.com/800x600/F1F5F9/64748B?text=Youth+Retreat'">
                    </div>
                    <figcaption class="gcap">은혜와 비전 가득했던 청년부 리트릿 ⛺</figcaption>
                </figure>

                <figure class="gcard">
                    <div class="ph">
                        <img src="https://ikyullee-byte.github.io/TEST01/summer2026.jpg" alt="여름성경학교" loading="lazy" decoding="async" onclick="openImage(this)" onerror="this.src='https://via.placeholder.com/800x600/F1F5F9/64748B?text=Photo+Upload+Here'">
                    </div>
                    <figcaption class="gcap">은혜 충만했던 주일학교 여름성경학교 ☀️</figcaption>
                </figure>

                <figure class="gcard">
                    <div class="ph">
                        <img src="https://ikyullee-byte.github.io/TEST01/choir2026.jpg" alt="성가대 모임" loading="lazy" decoding="async" onclick="openImage(this)" onerror="this.src='https://via.placeholder.com/800x600/F1F5F9/64748B?text=Photo+Upload+Here'">
                    </div>
                    <figcaption class="gcap">아름다운 찬양의 교제, 성가대 모임 🎶</figcaption>
                </figure>

                <figure class="gcard">
                    <div class="ph">
                        <img src="https://ikyullee-byte.github.io/TEST01/hyodo2026.jpg" alt="효도관광" loading="lazy" decoding="async" onclick="openImage(this)" onerror="this.src='https://via.placeholder.com/800x600/F1F5F9/64748B?text=Photo+Upload+Here'">
                    </div>
                    <figcaption class="gcap">은혜로운 효도관광 다녀왔습니다 🌸</figcaption>
                </figure>

                <figure class="gcard">
                    <div class="ph">
                        <img src="https://ikyullee-byte.github.io/TEST01/outdoor2026.jpg" alt="야외예배" loading="lazy" decoding="async" onclick="openImage(this)" onerror="this.src='https://via.placeholder.com/800x600/F1F5F9/64748B?text=Photo+Upload+Here'">
                    </div>
                    <figcaption class="gcap">기쁨 넘쳤던 전교회 야외예배 🌳</figcaption>
                </figure>
            </div>
        </section>

        <!-- ================= 05 안내 ================= -->
        <section id="guide" class="section reveal-on-scroll">
            <div class="sec-head">
                <span class="sec-num">05</span>
                <h2 class="sec-title">안내</h2>
                <span class="sec-line"></span>
            </div>

            <div class="grid gap-4 lg:grid-cols-12">
                <div class="lg:col-span-8 space-y-3">
                    <a href="#" class="link-row">
                        <span class="idx">01</span>
                        <h4>교회 소개</h4>
                        <i class="fas fa-arrow-right text-[12px]" style="color:var(--ink-4)"></i>
                    </a>
                    <a href="https://ikyullee-byte.github.io/wjnotice/" target="_blank" rel="noopener" class="link-row">
                        <span class="idx">02</span>
                        <h4>40주년 역사관</h4>
                        <i class="fas fa-arrow-up-right-from-square text-[12px]" style="color:var(--ink-4)"></i>
                    </a>
                    <a href="https://ikyullee-byte.github.io/worship/" target="_blank" rel="noopener" class="link-row">
                        <span class="idx">03</span>
                        <h4>찬양단 아카이브</h4>
                        <i class="fas fa-arrow-up-right-from-square text-[12px]" style="color:var(--ink-4)"></i>
                    </a>
                </div>

                <article class="surface p-7 lg:col-span-4 flex flex-col justify-between">
                    <div>
                        <p class="label">Online Offering</p>
                        <h4 class="mt-4 text-[17px] font-black tracking-tight" style="color:var(--ink)">온라인 헌금 안내</h4>
                        <p class="mt-3 text-[12.5px] font-bold leading-relaxed" style="color:var(--ink-3)">농협 · 원종제일교회</p>
                        <p class="mt-5 font-mono text-[19px] font-black tracking-tight" style="color:var(--ink)">302-1765-3728-91</p>
                    </div>
                    <button onclick="openGiveModal()" class="btn-ink mt-8 w-full">
                        <i class="fas fa-hand-holding-heart text-[12px]"></i>헌금 안내 보기
                    </button>
                </article>
            </div>
        </section>

        <!-- ================= FOOTER ================= -->
        <footer class="mt-20 hair-top pt-14 pb-40">
            <p class="foot-mark" aria-hidden="true">WONJONG FIRST</p>
            <div class="mt-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p class="text-[13px] font-black tracking-tight" style="color:var(--ink)">원종제일교회</p>
                    <p class="mt-2 text-[12px] font-semibold" style="color:var(--ink-3)">경기도 부천시 오정구 원종로36번길20</p>
                    <p class="mt-1 text-[12px] font-semibold" style="color:var(--ink-3)">주일 오전 11:00 · 오후 13:15 · 수요 19:00</p>
                </div>
                <div class="flex items-center gap-4">
                    <a href="#top" class="btn-mini">맨 위로 <i class="fas fa-arrow-up text-[9px]"></i></a>
                    <span class="text-[10.5px] font-black tracking-widest uppercase" style="color:var(--ink-4)">© 2026. All rights reserved.</span>
                </div>
            </div>
        </footer>
    </main>

    <!-- ================= DOCK ================= -->
    <div class="dock">
        <button onclick="openBibleModal()" class="dock-btn" aria-label="1년 통독표">
            <i class="fas fa-book-open"></i>통독표
        </button>
        <button onclick="openMannaModal()" class="dock-main" aria-label="오늘의 만나">
            <i class="fas fa-gift"></i>
        </button>
        <button onclick="openGiveModal()" class="dock-btn" aria-label="온라인 헌금">
            <i class="fas fa-won-sign"></i>온라인 헌금
        </button>
    </div>

    <!-- ================= MODALS ================= -->
    <!-- 오전 본문 (에베소서 2:12-14, 19-22) -->
    <div id="scriptureModal" class="modal" onclick="closeScriptureModal()">
        <div class="sheet" onclick="event.stopPropagation()">
            <div class="grabber"></div>
            <div class="sheet-head">
                <div>
                    <p class="label">Scripture</p>
                    <h3 class="sheet-title mt-2">에베소서 2장</h3>
                </div>
                <button class="icon-btn" onclick="closeScriptureModal()" aria-label="닫기"><i class="fas fa-xmark text-[13px]"></i></button>
            </div>
            <div class="sheet-body scripture">
                <p><sup>12</sup>그 때에 너희는 그리스도 밖에 있었고 이스라엘 나라 밖의 사람이라 약속의 언약들에 대하여는 외인이요 세상에서 소망이 없고 하나님도 없는 자이더니</p>
                <p><sup>13</sup>이제는 전에 멀리 있던 너희가 그리스도 예수 안에서 그리스도의 피로 가까워졌느니라</p>
                <p><sup>14</sup>그는 우리의 화평이신지라 둘로 하나를 만드사 원수 된 것 곧 중간에 막힌 담을 자기 육체로 허시고</p>
                <div class="divider-dash"></div>
                <p><sup>19</sup>그러므로 이제부터 너희는 외인도 아니요 나그네도 아니요 오직 성도들과 동일한 시민이요 하나님의 권속이라</p>
                <p><sup>20</sup>너희는 사도들과 선지자들의 터 위에 세우심을 입은 자라 그리스도 예수께서 친히 모퉁잇돌이 되셨느니라</p>
                <p><sup>21</sup>그의 안에서 건물마다 서로 연결하여 주 안에서 성전이 되어 가고</p>
                <p><sup>22</sup>너희도 성령 안에서 하나님이 거하실 처소가 되기 위하여 그리스도 예수 안에서 함께 지어져 가느니라</p>
            </div>
            <div class="sheet-foot">
                <button onclick="closeScriptureModal()" class="btn-ink w-full">아멘, 닫기</button>
            </div>
        </div>
    </div>

    <!-- 오후 본문 (요한복음 15:1-8) -->
    <div id="afternoonScriptureModal" class="modal" onclick="closeAfternoonScriptureModal()">
        <div class="sheet" onclick="event.stopPropagation()">
            <div class="grabber"></div>
            <div class="sheet-head">
                <div>
                    <p class="label">Scripture</p>
                    <h3 class="sheet-title mt-2">요한복음 15:1-8</h3>
                </div>
                <button class="icon-btn" onclick="closeAfternoonScriptureModal()" aria-label="닫기"><i class="fas fa-xmark text-[13px]"></i></button>
            </div>
            <div class="sheet-body scripture">
                <p><sup>1</sup>나는 참포도나무요 내 아버지는 농부라</p>
                <p><sup>2</sup>무릇 내게 붙어 있어 열매를 맺지 아니하는 가지는 아버지께서 그것을 제거해 버리시고 무릇 열매를 맺는 가지는 더 열매를 맺게 하려 하여 그것을 깨끗하게 하시느니라</p>
                <p><sup>3</sup>너희는 내가 일러준 말로 이미 깨끗하여졌으니</p>
                <p><sup>4</sup>내 안에 거하라 나도 너희 안에 거하리라 가지가 포도나무에 붙어 있지 아니하면 스스로 열매를 맺을 수 없음 같이 너희도 내 안에 있지 아니하면 그러하리라</p>
                <p><sup>5</sup>나는 포도나무요 너희는 가지라 그가 내 안에, 내가 그 안에 거하면 사람이 열매를 많이 맺나니 나를 떠나서는 너희가 아무 것도 할 수 없음이라</p>
                <p><sup>6</sup>사람이 내 안에 거하지 아니하면 가지처럼 밖에 버려져 마르나니 사람들이 그것을 모아다가 불에 던져 사르느니라</p>
                <p><sup>7</sup>너희가 내 안에 거하고 내 말이 너희 안에 거하면 무엇이든지 원하는 대로 구하라 그리하면 이루리라</p>
                <p><sup>8</sup>너희가 열매를 많이 맺으면 내 아버지께서 영광을 받으실 것이요 너희는 내 제자가 되리라</p>
            </div>
            <div class="sheet-foot">
                <button onclick="closeAfternoonScriptureModal()" class="btn-ink w-full">아멘, 닫기</button>
            </div>
        </div>
    </div>

    <!-- 1년 통독표 -->
    <div id="bibleModal" class="modal" onclick="closeBibleModal()">
        <div class="sheet sheet-wide" onclick="event.stopPropagation()">
            <div class="grabber"></div>
            <div class="sheet-head">
                <div>
                    <p class="label">Bible Reading Plan</p>
                    <h3 class="sheet-title mt-2">1년 1독 전체 일정표</h3>
                </div>
                <button class="icon-btn" onclick="closeBibleModal()" aria-label="닫기"><i class="fas fa-xmark text-[13px]"></i></button>
            </div>
            <div class="sheet-body pt-4">
                <div class="bible-scroll">
                    <table class="btable">
                        <thead id="bible-head"></thead>
                        <tbody id="bible-full-body"></tbody>
                    </table>
                </div>
            </div>
            <div class="sheet-foot">
                <button onclick="closeBibleModal()" class="btn-line w-full">닫기</button>
            </div>
        </div>
    </div>

    <!-- 오늘의 만나 (스크래치) -->
    <div id="mannaModal" class="modal" onclick="closeMannaModal()">
        <div class="sheet" style="max-width:26rem" onclick="event.stopPropagation()">
            <div class="grabber"></div>
            <div class="scratch-wrap p-10 pt-6 text-center">
                <div class="manna-icon"><i class="fas fa-seedling"></i></div>
                <p class="label">Today's Manna</p>
                <p id="manna-text" class="serif mt-6 text-[16px] font-bold leading-relaxed" style="color:var(--ink)">“말씀을 긁어보세요!”</p>
                <p id="manna-ref" class="mt-6 text-[12px] font-black tracking-[0.15em] uppercase opacity-0 transition-opacity duration-1000" style="color:var(--ink-3)">-</p>
                <button onclick="closeMannaModal()" class="btn-line mt-8 w-full">아멘, 닫기</button>
                <canvas id="scratch-canvas"></canvas>
            </div>
        </div>
    </div>

    <!-- 온라인 헌금 -->
    <div id="giveModal" class="modal" onclick="closeGiveModal()">
        <div class="sheet" style="max-width:24rem" onclick="event.stopPropagation()">
            <div class="grabber"></div>
            <div class="p-9 text-center">
                <div class="manna-icon"><i class="fas fa-hand-holding-heart"></i></div>
                <p class="label">Online Offering</p>
                <h3 class="sheet-title mt-3">온라인 헌금 안내</h3>

                <div class="mt-8 rounded-[20px] border p-7" style="border-color:var(--line); background:var(--soft)">
                    <p class="font-mono text-[21px] font-black tracking-tight select-all" style="color:var(--ink)">302-1765-3728-91</p>
                    <p class="mt-3 text-[12px] font-bold tracking-wide" style="color:var(--ink-3)">농협 · 원종제일교회</p>
                </div>

                <button onclick="closeGiveModal()" class="btn-ink mt-8 w-full">닫기</button>
            </div>
        </div>
    </div>

    <script>
        /* ===== 1년 1독 데이터 (원본 유지) ===== */
        const fullBibleData = [["창1-3","레7-9","신20-22","삼하1-3","대상19-21","욥16-18","시100-104","사13-15","렘40-42","호10-14","눅4-6","고전7-9"],["창4-7","레10-12","신23-25","삼하4-6","대상22-24","욥19-21","시105-108","사16-18","렘43-45","욜1-3","눅7-9","고전10-12"],["창8-11","레13-15","신26-28","삼하7-9","대상25-27","욥22-24","시109-113","사19-21","렘46-48","암1-3","눅10-12","고전13-16"],["창12-14","레16-18","신29-31","삼하10-12","대상28-29","욥25-27","시114-118","사22-24","렘49-50","암4-6","눅13-15","고후1-3"],["창15-17","레19-21","신32-34","삼하13-15","대하1-3","욥28-30","시119:1","사25-27","렘51-52","암7-9","눅16-18","고후4-6"],["창18-20","레22-24","수1-3","삼하16-18","대하4-6","욥31-33","시119:89","사28-30","애1-3","옵-욘4","눅19-21","고후7-9"],["창21-24","레25-27","수4-7","삼하19-21","대하7-9","욥34-36","시120-125","사31-33","애4-5","미1-3","눅22-24","고후10-13"],["창25-27","민1-3","수8-9","삼하22-24","대하10-12","욥37-39","시126-131","사34-36","겔1-3","미4-7","요1-3","갈1-3"],["창28-30","민4-6","수10-12","왕상1-3","대하13-15","욥40-42","시132-137","사37-39","겔4-6","나1-합3","요4-6","갈4-6"],["창31-33","민7-9","수13-15","왕상4-6","대하16-18","시1-4","시138-143","사40-42","겔7-9","습1-학2","요7-9","엡1-3"],["창34-36","민10-12","수16-18","왕상7-9","대하19-21","시5-8","시144-150","사43-45","겔10-12","슥1-3","요10-12","엡4-6"],["창37-39","민13-15","수19-21","왕상10-12","대하22-24","시9-14","잠1-3","사46-48","겔13-15","슥4-6","요13-15","빌1-4"],["창40-42","민16-18","수22-24","왕상13-15","대하25-27","시15-18","잠4-6","사49-51","겔16-18","슥7-9","요16-18","골1-4"],["창43-45","민19-21","삿1-3","왕상16-18","대하28-30","시19-22","잠7-9","사52-54","겔19-21","슥10-14","요19-21","살전1-5"],["창46-48","민22-24","삿4-6","왕상19-21","대하31-33","시23-27","잠10-12","사55-57","겔19-21","슥10-14","요19-21","살전1-5"],["창49-출1","민25-27","삿7-9","왕상22-왕2","대하34-36","시28-32","잠13-15","사58-60","겔25-27","마1-3","행4-6","딤전1-6"],["출2-4","민28-30","삿10-12","왕하3-5","스1-3","시33-36","잠16-18","사61-63","겔28-30","마4-6","행7-9","딤후1-4"],["출5-7","민31-33","삿13-15","왕하6-8","스4-6","시37-41","잠19-21","사64-66","겔31-33","마7-9","행10-12","딛1-몬1"],["출8-10","민34-36","삿16-18","왕하9-11","스7-10","시42-46","잠22-24","렘1-3","겔34-36","마10-12","행13-15","히1-4"],["출11-13","신1-2","삿19-21","왕하12-14","느1-3","시47-51","잠25-27","렘4-6","겔37-39","마13-15","행16-18","히5-8"],["출14-16","신3-4","룻1-4","왕하15-17","느4-6","시52-56","잠28-31","렘7-9","겔40-42","마16-18","행19-21","히9-13"],["출17-19","신5-6","삼상1-3","왕하18-20","느7-9","시57-61","전1-3","렘10-12","겔43-45","마19-21","행22-24","약1-5"],["출20-22","신7-8","삼상4-6","왕하21-23","느10-13","시62-66","전4-6","렘13-15","겔46-48","마22-24","행25-28","벧전-벧후"],["출23-25","신9-10","삼상7-9","왕하24-25","에1-3","시67-71","전7-9","렘16-18","단1-3","마25-27","롬1-3","요일-유"],["출26-28","신11-12","삼상10-12","대상1-3","에4-7","시72-76","전10-12","렘19-21","단4-6","마28-막2","롬4-6","계1-3"],["출29-31","신13-14","삼상13-15","대상4-6","에8-10","시77-80","아1-4","레22-24","단7-9","막3-5","롬7-9","계4-6"],["출32-34","신15-16","삼상16-18","대상7-9","욥1-3","시81-85","아5-8","레25-27","단10-12","막6-8","롬10-12","계7-9"],["출35-37","신17-19","삼상19-21","대상10-12","욥4-6","시86-89","사1-3","레28-30","호1-3","막9-11","롬13-16","계10-12"],["출38-40","-","삼상22-24","대상13-15","욥7-9","시90-94","사4-6","레31-33","호4-6","막12-14","고전1-3","계13-15"],["레1-3","-","삼상25-27","대상16-18","욥10-12","시95-99","사7-9","레34-36","호7-9","막15-16","고전4-6","계16-18"],["레4-6","-","삼상28-31","-","욥13-15","-","사10-12","레37-39","-","눅1-3","-","계19-22"]];

        /* ===== 초기화 ===== */
        document.addEventListener('DOMContentLoaded', () => {
            const now = new Date();
            buildTicker();
            initWeeklyBible(now);
            initFullBibleTable(now);
            initScratchCanvas();
            initScrollAnimations();
            initProgressBar();

            setTimeout(() => {
                const targetTemp = 98;
                document.getElementById('grace-thermometer').style.width = targetTemp + '%';
                animateCounter('temp-num', targetTemp);
            }, 700);
        });

        /* 티커 무한 루프 (내용 2배 복제) */
        function buildTicker() {
            const track = document.getElementById('ticker-track');
            track.innerHTML += track.innerHTML;
        }

        /* 스크롤 진행 바 */
        function initProgressBar() {
            const bar = document.getElementById('progress');
            const update = () => {
                const el = document.documentElement;
                const max = el.scrollHeight - el.clientHeight;
                bar.style.width = (max > 0 ? (el.scrollTop / max) * 100 : 0) + '%';
            };
            window.addEventListener('scroll', update, { passive: true });
            window.addEventListener('resize', update);
            update();
        }

        /* 스크롤 등장 애니메이션 */
        function initScrollAnimations() {
            if (!('IntersectionObserver' in window)) {
                document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
                return;
            }
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        }

        /* 예배 탭 전환 */
        function switchService(id, btn) {
            document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
            document.getElementById(id).classList.remove('hidden');
            document.querySelectorAll('.seg-btn').forEach(b => {
                b.classList.remove('is-active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-selected', 'true');
        }

        /* 다크 모드 전환 */
        function toggleDark(btn) {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            btn.querySelector('i').className = isDark ? 'fas fa-sun text-[12px]' : 'fas fa-moon text-[12px]';
        }

        /* 갤러리 원본 보기 */
        function openImage(img) {
            window.open(img.currentSrc || img.src, '_blank', 'noopener');
        }

        /* 이번 주 통독 그리드 */
        function initWeeklyBible(now) {
            const grid = document.getElementById('weekly-bible-grid');
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            const dayNames = ['주일', '월', '화', '수', '목', '금', '토', '주일'];
            grid.innerHTML = '';
            for (let i = 0; i < 8; i++) {
                const d = new Date(startOfWeek);
                d.setDate(startOfWeek.getDate() + i);
                const isToday = d.toDateString() === now.toDateString();
                const row = fullBibleData[d.getDate() - 1];
                const reading = (row && row[d.getMonth()]) || '자유통독';
                grid.innerHTML += `<div class="daycell ${isToday ? 'is-today' : ''} ${(i === 0 || i === 7) ? 'is-sun' : ''}">
                    <div class="d">${dayNames[i]}<span>${d.getDate()}</span></div>
                    <div class="r">${reading === '-' ? '쉼' : reading}</div></div>`;
            }
        }

        /* 1년 통독 전체 표 */
        function initFullBibleTable(now) {
            const head = document.getElementById('bible-head');
            const body = document.getElementById('bible-full-body');
            head.innerHTML = `<tr><th class="day-col">일</th>${Array.from({ length: 12 }, (_, i) => `<th>${i + 1}월</th>`).join('')}</tr>`;

            body.innerHTML = '';
            fullBibleData.forEach((row, idx) => {
                const tr = document.createElement('tr');
                let rowHtml = `<td class="day-col">${idx + 1}</td>`;
                row.forEach((cell, mIdx) => {
                    const isToday = (idx + 1 === now.getDate() && mIdx === now.getMonth());
                    rowHtml += `<td class="${isToday ? 'is-today-cell' : ''}">${cell === '-' ? '' : cell}</td>`;
                });
                tr.innerHTML = rowHtml;
                body.appendChild(tr);
            });
        }

        /* 숫자 카운터 */
        function animateCounter(id, target) {
            const el = document.getElementById(id);
            let current = 0;
            const timer = setInterval(() => {
                if (current >= target) {
                    clearInterval(timer);
                    el.innerText = target + '°';
                    return;
                }
                el.innerText = current + '°';
                current += 2;
            }, 16);
        }

        /* 모달 열기/닫기 */
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
                t: "오직 주께서 각 사람에게 나눠 주신 대로 하나님이 각 사람을 부르신 그대로 행하라 내가 모든 교회에서 이와 같이 명하노라",
                r: "고린도전서 7:17"
            };
            document.getElementById('manna-text').innerText = `“${pick.t}”`;
            document.getElementById('manna-ref').innerText = `- ${pick.r} -`;
            document.getElementById('manna-ref').style.opacity = '0';
            document.getElementById('mannaModal').classList.add('active');
            resetScratch();
        }
        function closeMannaModal() { document.getElementById('mannaModal').classList.remove('active'); }

        /* 출석 체크 */
        function checkAttendance(btn, id) {
            btn.style.display = 'none';
            document.getElementById(`stamp-${id}`).classList.add('stamp-animate');
            confetti({
                particleCount: 110, spread: 75, origin: { y: 0.7 },
                colors: ['#09090B', '#3F3F46', '#A1A1AA', '#E4E4E7']
            });
        }

        /* 만나 스크래치 카드 */
        let canvas, ctx, isDrawing = false;

        function initScratchCanvas() {
            canvas = document.getElementById('scratch-canvas');
            ctx = canvas.getContext('2d');
            canvas.addEventListener('mousedown', () => isDrawing = true);
            canvas.addEventListener('mousemove', scratch);
            canvas.addEventListener('mouseup', () => isDrawing = false);
            canvas.addEventListener('mouseleave', () => isDrawing = false);
            canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
            canvas.addEventListener('touchmove', scratch, { passive: false });
            canvas.addEventListener('touchend', () => isDrawing = false);
        }

        function resetScratch() {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            const dark = document.body.classList.contains('dark-mode');
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, dark ? '#3A3A42' : '#E7E7EA');
            gradient.addColorStop(1, dark ? '#202027' : '#C6C6CD');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = dark ? '#A1A1AA' : '#71717A';
            ctx.font = 'bold 15px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('여기를 동전으로 긁어보세요', canvas.width / 2, canvas.height / 2);

            ctx.globalCompositeOperation = 'destination-out';
        }

        function scratch(e) {
            if (!isDrawing) return;
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
            const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

            ctx.beginPath();
            ctx.arc(x, y, 38, 0, Math.PI * 2);
            ctx.fill();

            document.getElementById('manna-ref').style.opacity = '1';
        }
    </script>
</body>
</html>
