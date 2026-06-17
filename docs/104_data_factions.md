# 세력 / 정치 / 이념 데이터
> 분류: 데이터
> 경로: `docs/104_data_factions.md`
> 상위: [100_DATA.md](100_DATA.md)
> 최종 수정: 2026-06-17

---

## 파일 목록

```
src/data/base/factions/
├── factionsData.js    세력 마스터 (기본값)
└── factionName.js     세력 다국어 이름

src/data/base/regime/
├── ideologyData.js    이념 코드 체계 (code 1~255)
├── economyData.js     경제 체제 코드
└── regimeData.js      이념+경제 조합 → 국가 타이틀/수치 보정
```

---

## factionsData.js — 세력 마스터

### 스키마

```js
{
  id:          "REH",          // 세력 코드 (3자리)
  periodType:  "RC",           // "AD" | "RC" | "SE"
  period:      ["", "799"],    // [창건 UC년, 소멸 UC년] (빈값=불명/현존)
  color:       "#c0392b",      // 세력 대표색 (CSS)
  flag:        "⚔️",           // 기함 이모지 또는 이미지 파일명
  currency:    "제국 마르크",
  ideology:    byCode[240],    // ideologyData.js IDEOLOGY_MAP 참조
  desc:        `...`,          // 세력 설명
}
```

### 세력 목록

| id | 이름 (Kr) | 시대 | 존속 (UC) | 게임 대상 |
|---|---|---|---|---|
| NOC | 북방연합국가 | AD | ~2039 | ✗ |
| USE | 3대륙 합중국 | AD | ~2039 | ✗ |
| GBG | 지구통일정부 | SE | — | ✗ |
| SIR | 시리우스 성계 정부 | AD | — | ✗ |
| GAF | 은하연방 | AD | — | ✗ |
| **REH** | **은하제국 (골덴바움)** | RC | ~799 | **✅** |
| LIP | 립슈타트 귀족연합 | SE | 797~797 | ✗ |
| GRL | 은하제국 정통정부 | SE | 800~801 | ✗ |
| NRH | 은하제국 (로엔그람) | SE | 799~ | ✗ |
| **FPA** | **자유행성동맹** | SE | 527~800 | **✅** |
| SMC | 구국군사회의 | SE | 766~766 | ✗ |
| EFR | 엘 파실 독립정부 | SE | 796~796 | ✗ |
| IRG | 이제르론 공화정부 | SE | 800~801 | ✗ |
| BAR | 바라트 성계 자치령 | SE | 801~ | ✗ |
| **PZN** | **페잔 자치령** | SE | 682~800 | **✅** |
| EAT | 지구교 | AD | — | ✗ |

> 게임 대상: 플레이어/AI가 운영하는 3대 세력 (REH/FPA/PZN)

---

## factionName.js — 다국어 이름

```js
{ factionId:'REH', lang:'Kr', name:'은하제국',   shortName:'제국'   }
{ factionId:'REH', lang:'En', name:'Galactic Empire', shortName:'Empire' }
{ factionId:'REH', lang:'Jp', name:'銀河帝国',   shortName:'帝国'   }
```

lang: `"Kr"` | `"En"` | `"Jp"`

> ⚠️ RAG(라그랑그룹)는 factionName.js에만 존재하고 factionsData.js 미등록 — 추후 통합 필요

---

## ideologyData.js — 이념 코드

```js
{ code: 100, system: "공화", name: "민주공화제" }
{ code: 240, system: "군주", name: "전제군주제" }
{ code: 180, system: "혼합", name: "혼합체제"   }
```

| system | code 범위 | 대표 이념 |
|---|---|---|
| 없음 | 1~8 | 무정부주의, 아나키즘 |
| 공화 | 15~160 | 직접민주주의 → 군정 |
| 혼합 | 180 | 혼합체제 |
| 군주 | 195~255 | 근대군주제 → 절대왕정 |

**게임 내 주요 세력 이념:**
- REH: code=240 (전제군주제)
- FPA: code=100 (민주공화제)
- PZN: code=180 (혼합체제)

`IDEOLOGY_MAP` = code → 객체 Map (factionsData.js에서 `byCode[240]` 형태로 import)

---

## regimeData.js — 이념+경제 조합 규칙

이념 코드(ideologyCode) + 경제 코드(economyCode) 조합으로 국가 타이틀·리더 칭호·수치 보정 결정.

```js
{
  ideologyRange: [100, 100],       // 이념 코드 범위
  economyRange:  [100, 140],       // 경제 코드 범위
  factionTitle:  { kr:'자유민주공화국', en:'Liberal Democratic Republic', jp:'自由民主共和国' },
  leaderTitle:   { kr:'대통령', en:'President', jp:'大統領' },
  taxRate:       { min:10, max:40 },
  growth:        +0.1,             // 경제 성장 보정
  loyalty:       +0.1,             // 충성도 보정
  military:      0,                // 군사력 보정
}
```

---

## TODO

- [ ] RAG(라그랑그룹) factionsData.js 등록
- [ ] AD 시대 세력 (NOC/USE 등) desc 입력
- [ ] economyData.js 스키마 문서화 (현재 미기록)
- [ ] regimeData.js 전체 조합 표 정리
