# 주보 데이터

주보 PDF(주보pdf.md)의 내용을 구조화한 데이터 폴더입니다. 온라인 주보 생성 등에 재사용할 수 있습니다.

## 파일 규칙

- 파일명: `YYYY-MM-DD_제N호.json` (주보 날짜 기준)

## 스키마

| 필드 | 설명 |
|---|---|
| `church` | 교회 이름 |
| `issue` | 호수 (예: `제41호`) |
| `date` | 주보 날짜 (ISO, `YYYY-MM-DD`) |
| `slogan` | 연간 표어 `{ year, text }` |
| `greeting` | 표지 인사말 |
| `messages` | 표어 아래 다짐/권면 문구 배열 |
| `announcements` | 교회 소식 배열. `{ no, text, event? }`. 행사성 소식은 `event` 또는 `event_date` 포함 |
| `prayer_requests` | 기도 제목 배열 `{ name, title }` |
| `daily_bible_reading` | 주간 통독표. `plan`은 `{ day, date, passage, book, chapters }` |
| `weekly_verse` | 주간 암송구절 `{ reference, text }` |
| `ministry_staff` | 섬기는 분들 `{ role, name, title }` |

## 데이터 출처

원본 텍스트: [[26.10.18주보]] (PDF 인식 결과)
