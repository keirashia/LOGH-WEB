// /src/data/factions/factionsData.js
import { IDEOLOGY_MAP as byCode } from "@/data/base/regime/ideologyData.js";
import { ECONOMY_MAP as byEconCode } from "@/data/base/regime/economyData.js";
import { getRegime } from "@/data/base/regime/regimeData.js";

// ⚠️ 2026-06-24 개편: 기존 ideology(이념 단독) 필드만으로는 economy(경제체제) 정보가
//   없어 regimeData.js의 getRegime()을 활용할 수 없었음. economy 필드를 신규 추가하고,
//   ideology+economy 조합으로 regime(taxRate/taxType/factionTitle 등)을 함께 노출함.
//   regime은 매번 getRegime()으로 파생 계산하며 별도 저장하지 않음(computed 패턴 유지).
//
//   economy 코드 산정 근거:
//     REH/LIP/GRL/NRH: 60(봉건경제) — cliqueData.js의 로엔그람파 tender.econ=60과 일치시킴
//     FPA/BAR:         100(자본주의) — 민주공화제 표준 경제체제
//     SMC:             220(사회주의) — 군정 체제, 통제경제 성향
//     PZN:             180(국가자본주의) — 혼합체제 자치령, 무역 중심지 특성 반영
//     EAT:             100(자본주의) — 신권정치 자체는 economy 전범위 허용이라 임시 대표값
//   ※ 위 economy 값은 모두 1차 추정치이며, 추후 각 정권의 실제 경제 운영 방식에 맞춰
//     재검토 필요 (TODO).

const FACTIONS_RAW = [

  // ── AD 시대 ────────────────────────────────────────────────

  // 북방연합국가
  {
    id: "NOC",
    periodType: "AD",
    period: ["", "2039"],
    color: "",
    flag: "NOC01.webp",
    currency: "",
    ideologyCode: null,
    economyCode: null,
    defaultTax: null,
    desc: `북아메리카 대륙에 위치한 초강대국. 모티브는 미국이다.
    '이성과 공화정치의 본고장'으로 당시 지구를 양분하던 3대륙 합중국보다 경제적/과학적으로 우위에 있었으나
    13일 전쟁 당시 3대륙 합중국의 열핵병기 세례를 맞고 멸망했다.
    멸망 이후엔 군소 교단국가로 쪼개져 할거하게 된다.`,
  },

  // 3대륙 합중국
  {
    id: "USE",
    periodType: "AD",
    period: ["", "2039"],
    color: "",
    flag: "",
    currency: "",
    ideologyCode: null,
    economyCode: null,
    defaultTax: null,
  },

  // 지구통일정부 (은하연방 성립 이전 지구의 통합 정부)
  {
    id: "GBG",
    periodType: "SE",
    period: ["", ""],
    color: "",
    flag: "",
    currency: "",
    ideologyCode: null,
    economyCode: null,
    defaultTax: null,
  },

  // 시리우스 성계 정부
  {
    id: "SIR",
    periodType: "AD",
    period: ["", ""],
    color: "",
    flag: "",
    currency: "",
    ideologyCode: null,
    economyCode: null,
    defaultTax: null,
  },

  // 은하연방
  {
    id: "GAF",
    periodType: "AD",
    period: ["", ""],
    color: "",
    flag: "",
    currency: "",
    ideologyCode: null,
    economyCode: null,
    defaultTax: null,
  },

  // ── RC / SE 시대 ───────────────────────────────────────────

  // 은하제국 골덴바움 왕조 (창건: 1 IC = 310 UC, 멸망: 490 IC = 799 UC)
  {
    id: "REH",
    periodType: "RC",
    period: ["", "799"],
    color: "#8a8a9a",
    flag: "⚔️",
    currency: "제국 마르크",
    ideologyCode: 240,
    economyCode: 60, // TODO: 1차 추정치(봉건경제), cliqueData.js 로엔그람파 tender.econ과 일치
    defaultTax: 70,  // regime:제국 taxRate(30~70) 중앙값
  },

  // 립슈타트 귀족연합 (488 IC = 797 UC 창설 → 같은 해 해산)
  {
    id: "LIP",
    periodType: "SE",
    period: ["797", "797"],
    color: "",
    flag: "",
    currency: "제국 마르크",
    ideologyCode: 240,
    economyCode: 60, // TODO: 1차 추정치
    defaultTax: 70,  // regime:제국 taxRate(30~70) 중앙값
  },

  // 은하제국 정통정부 (Galaktische Reichsregierung der Legitimität)
  {
    id: "GRL",
    periodType: "SE",
    period: ["800", "801"],
    color: "",
    flag: "",
    currency: "",
    ideologyCode: 240,
    economyCode: 60, // TODO: 1차 추정치
    defaultTax: 50,  // regime:제국 taxRate(30~70) 중앙값
  },

  // 은하제국 로엔그람 왕조 (1 NIC = 490 IC = 799 UC 창건)
  {
    id: "NRH",
    periodType: "SE",
    period: ["799", ""],
    color: "",
    flag: "",
    currency: "제국 마르크",
    ideologyCode: 240,
    economyCode: 60, // TODO: 1차 추정치
    defaultTax: 50,  // regime:제국 taxRate(30~70) 중앙값
  },

  // 자유행성동맹 (218 IC = 527 UC 창건 → 491 IC = 800 UC 해산)
  {
    id: "FPA",
    periodType: "SE",
    period: ["527", "800"],
    color: "#2980b9",
    flag: "🛡️",
    currency: "동맹 디나르",
    ideologyCode: 100,
    economyCode: 100, // TODO: 1차 추정치(자본주의)
    defaultTax: 25,   // regime:자유민주공화국 taxRate(10~40) 중앙값
  },

  // 구국군사회의
  {
    id: "SMC",
    periodType: "SE",
    period: ["766", "766"],
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideologyCode: 160,
    economyCode: 220, // TODO: 1차 추정치(사회주의, 군정 통제경제 성향)
    defaultTax: 62,   // regime:혁명공화국 taxRate(40~85) 중앙값
  },

  // 엘 파실 독립정부 (El Facil Revolutionary Government)
  {
    id: "EFR",
    periodType: "SE",
    period: ["796", "796"],
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideologyCode: null,
    economyCode: null,
    defaultTax: null,
  },

  // 이제르론 공화정부 (Iserlohn Republic Government)
  {
    id: "IRG",
    periodType: "SE",
    period: ["800", "801"],
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideologyCode: null,
    economyCode: null,
    defaultTax: null,
  },

  // 바라트 성계 자치령 (Bharat Star System Autonomous Region)
  {
    id: "BAR",
    periodType: "SE",
    period: ["801", ""],
    color: "#1a6fa8",
    flag: "",
    currency: "동맹 디나르",
    ideologyCode: 100,
    economyCode: 100, // TODO: 1차 추정치
    defaultTax: 25,   // regime:자유민주공화국 taxRate(10~40) 중앙값
    desc: `시바 성역 회전 이후 율리안 민츠와 라인하르트 폰 로엔그람의 회담을 통해 SE 801년 성립된 민주공화주의 자치령.
    이제르론 요새의 반환을 조건으로 바라트 성계의 내정자치권을 얻었으며, 양 웬리가 꿈꾸었던 민주주의의 씨앗을 이어받았다.
    약 100여 년간 존속하며 은하 전역에 민주공화정이 다시 꽃피우는 토대가 되었다.`,
  },

  // 페잔 자치령 (373 IC = 682 UC 창건 → 491 IC = 800 UC 병합)
  {
    id: "PZN",
    periodType: "SE",
    period: ["682", "800"],
    color: "#27ae60",
    flag: "💰",
    currency: "페잔 골드",
    ideologyCode: 180,
    economyCode: 180, // TODO: 1차 추정치(국가자본주의, 무역 중심지 특성)
    defaultTax: 32,   // regime:자치령 taxRate(15~50) 중앙값
  },

  // 지구교
  {
    id: "EAT",
    periodType: "AD",
    period: ["", ""],
    color: "#8e44ad",
    flag: "✝️",
    currency: "",
    ideologyCode: 85,
    economyCode: 100, // TODO: 1차 추정치(임시 대표값, 신권정치는 economy 전범위 허용)
    defaultTax: 50,   // regime:신정국가 taxRate(30~70) 중앙값
  },

];

// ideologyCode/economyCode → ideology/economy/regime 파생 필드를 부여하여 최종 export
// (regime은 항상 getRegime()으로 매번 계산하는 computed 값, 별도 저장 없음)
const FACTIONS = FACTIONS_RAW.map((f) => ({
  ...f,
  ideology: f.ideologyCode != null ? byCode[f.ideologyCode] : null,
  economy:  f.economyCode  != null ? byEconCode[f.economyCode] : null,
  get regime() {
    if (f.ideologyCode == null || f.economyCode == null) return null
    return getRegime(f.ideologyCode, f.economyCode)
  },
}))

export default FACTIONS
