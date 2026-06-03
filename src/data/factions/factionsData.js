// /src/data/factions/factionsData.js
import IDEOLOGIES from "./ideologies.js";

const byCode = Object.fromEntries(IDEOLOGIES.map((i) => [i.code, i]));

export { IDEOLOGIES };
export default [

  // ── AD 시대 ────────────────────────────────────────────────

  // 북방연합국가
  {
    id: "NOC",
    periodType: "AD",
    period: ["2039", "2039"],
    color: "",
    flag: "NOC01.webp",
    currency: "",
    ideology: null,
    desc: `북아메리카 대륙에 위치한 초강대국. 모티브는 미국이다.
    '이성과 공화정치의 본고장'으로 당시 지구를 양분하던 3대륙 합중국보다 경제적/과학적으로 우위에 있었으나
    13일 전쟁 당시 3대륙 합중국의 열핵병기 세례를 맞고 멸망했다.
    멸망 이후엔 군소 교단국가로 쪼개져 할거하게 된다.`,
  },

  // 3대륙 합중국
  {
    id: "USE",
    periodType: "AD",
    period: ["2039", "2039"],
    color: "",
    flag: "",
    currency: "",
    ideology: null,
  },

  // 지구통일정부
  {
    id: "GBG",
    periodType: "AD",
    period: ["", ""],
    color: "",
    flag: "",
    currency: "",
    ideology: null,
  },

  // 시리우스 성계 정부
  {
    id: "SIR",
    periodType: "AD",
    period: ["", ""],
    color: "",
    flag: "",
    currency: "",
    ideology: null,
  },

  // 은하연방 (TODO: id 미정)
  {
    id: "GAF",
    periodType: "AD",
    period: ["", ""],
    color: "",
    flag: "",
    currency: "",
    ideology: null,
  },

  // ── RC / SE 시대 ───────────────────────────────────────────

  // 은하제국 골덴바움 왕조
  {
    id: "REH",
    periodType: "RC",
    period: ["", ""],
    color: "#c0392b",
    flag: "⚔️",
    currency: "제국 마르크",
    ideology: byCode[240],
  },

  // 립슈타트 귀족연합
  {
    id: "LIP",
    periodType: "SE",
    period: ["796", "797"],
    color: "",
    flag: "",
    currency: "제국 마르크",
    ideology: byCode[240],
  },

  // 은하제국 정통정부 (TODO: id 미정 — LIP 중복으로 임시 LGT 사용)
  {
    id: "LGT",
    periodType: "SE",
    period: ["800", "801"],
    color: "",
    flag: "",
    currency: "",
    ideology: byCode[240],
  },

  // 은하제국 로엔그람 왕조
  {
    id: "NRH",
    periodType: "SE",
    period: ["800", ""],
    color: "",
    flag: "",
    currency: "제국 마르크",
    ideology: byCode[240],
  },

  // 자유행성동맹
  {
    id: "FPA",
    periodType: "SE",
    period: ["527", "799"],
    color: "#2980b9",
    flag: "🛡️",
    currency: "동맹 디나르",
    ideology: byCode[100],
  },

  // 구국군사회의
  {
    id: "SMC",
    periodType: "SE",
    period: ["766", "766"],
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideology: byCode[160],
  },

  // 엘 파실 독립정부 (TODO: id 미정)
  {
    id: "",
    periodType: "SE",
    period: ["796", "796"],
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideology: null,
  },

  // 이제르론 공화정부 (TODO: id 미정)
  {
    id: "",
    periodType: "SE",
    period: ["800", "801"],
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideology: null,
  },

  // 바라트 성계 자치령 (TODO: id 미정)
  {
    id: "",
    periodType: "SE",
    period: ["", ""],
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideology: null,
  },

  // 페잔 자치령
  {
    id: "PZN",
    periodType: "SE",
    period: ["150", "800"],
    color: "#27ae60",
    flag: "💰",
    currency: "페잔 골드",
    ideology: byCode[180],
  },

  // 지구교
  {
    id: "EAT",
    periodType: "AD",
    period: ["", ""],
    color: "#8e44ad",
    flag: "✝️",
    currency: "",
    ideology: byCode[85],
  },

];
