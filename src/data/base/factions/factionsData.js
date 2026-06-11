// /src/data/factions/factionsData.js
import { IDEOLOGY_MAP as byCode } from "@/data/base/regime/ideologyData.js";

export default [

  // ── AD 시대 ────────────────────────────────────────────────

  // 북방연합국가
  {
    id: "NOC",
    periodType: "AD",
    period: ["", "2039"],
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
    period: ["", "2039"],
    color: "",
    flag: "",
    currency: "",
    ideology: null,
  },

  // 지구통일정부 (은하연방 성립 이전 지구의 통합 정부)
  {
    id: "GBG",
    periodType: "SE",
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

  // 은하연방
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

  // 은하제국 골덴바움 왕조 (창건: 1 IC = 310 UC, 멸망: 490 IC = 799 UC)
  {
    id: "REH",
    periodType: "RC",
    period: ["", "799"],
    color: "#c0392b",
    flag: "⚔️",
    currency: "제국 마르크",
    ideology: byCode[240],
  },

  // 립슈타트 귀족연합 (488 IC = 797 UC 창설 → 같은 해 해산)
  {
    id: "LIP",
    periodType: "SE",
    period: ["797", "797"],
    color: "",
    flag: "",
    currency: "제국 마르크",
    ideology: byCode[240],
  },

  // 은하제국 정통정부 (Galaktische Reichsregierung der Legitimität)
  {
    id: "GRL",
    periodType: "SE",
    period: ["800", "801"],
    color: "",
    flag: "",
    currency: "",
    ideology: byCode[240],
  },

  // 은하제국 로엔그람 왕조 (1 NIC = 490 IC = 799 UC 창건)
  {
    id: "NRH",
    periodType: "SE",
    period: ["799", ""],
    color: "",
    flag: "",
    currency: "제국 마르크",
    ideology: byCode[240],
  },

  // 자유행성동맹 (218 IC = 527 UC 창건 → 491 IC = 800 UC 해산)
  {
    id: "FPA",
    periodType: "SE",
    period: ["527", "800"],
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

  // 엘 파실 독립정부 (El Facil Revolutionary Government)
  {
    id: "EFR",
    periodType: "SE",
    period: ["796", "796"],
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideology: null,
  },

  // 이제르론 공화정부 (Iserlohn Republic Government)
  {
    id: "IRG",
    periodType: "SE",
    period: ["800", "801"],
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideology: null,
  },

  // 바라트 성계 자치령 (Bharat Star System Autonomous Region)
  {
    id: "BAR",
    periodType: "SE",
    period: ["801", ""],
    color: "#1a6fa8",
    flag: "",
    currency: "동맹 디나르",
    ideology: byCode[100],
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
