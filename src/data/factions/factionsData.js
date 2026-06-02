// /src/data/factions/factionsData.js
import IDEOLOGIES from "./ideologies.js";

const byCode = Object.fromEntries(IDEOLOGIES.map((i) => [i.code, i]));

/** 세력 관련
 *  20260602
 *  - 수정사항
 *  name -> nameKr로 변경
 *  period -> ['stDate', 'edDate'] 형태의 array로 저장되며, 국가 존속 기간
 *  flag -> png/webp등의 이미지 파일을 제공 예정. ex) ${국가ID}_flag의 형태
 *    이미지 경로는 /src/data/factions/flags
 *  ideologyCode -> 삭제 (ideology와 기능 겹침) byCode의 func는 export 타이밍에 처리해도 될 것 같음
 */

export { IDEOLOGIES };
export default [
  // 신규 추가
  {
    id: "NOC",
    nameKr: "북방연합국가",
    nameJp: "ノーザン・コンドミニアム",
    nameEn: "Northern Condominium",
    periodType: "AD",
    period: ["", "2039"],
    color: "",
    flag: "NOC01.webp",
    currency: "",
    ideology: 99,
    desc: `북아메리카 대륙에 위치한 초강대국. 모티브는 미국이다.
    '이성과 공화정치의 본고장'으로 당시 지구를 양분하던 3대륙 합중국보다 경제적/과학적으로 우위에 있었으나
    13일 전쟁 당시 3대륙 합중국의 열핵병기 세례를 맞고 멸망했다.
    멸망 이후엔 군소 교단국가로 쪼개져 할거하게 된다.`,
  },
  // 신규 추가
  {
    id: "USE",
    nameKr: "3대륙 합중국",
    nameJp: "ユナイテッド・ステーツ・オブ・ユーラブリカ",
    nameEn: "United States of Eurafrica",
    periodType: "AD",
    period: ["", "2039"],
    color: "",
    flag: "",
    currency: "",
    ideologyCode: null,
    ideology: null,
  },
  // 신규 추가
  {
    id: "GBG",
    nameKr: "지구통일정부",
    nameJp: "地球統一政府",
    nameEn: "Global Government",
    color: "",
    flag: "",
    currency: "",
    ideologyCode: null,
    ideology: null,
  },
  {
    id: "",
    nameKr: "시리우스 성계 정부",
    nameJp: "",
    nameEn: "",
    color: "",
    flag: "",
    currency: "",
    ideologyCode: null,
    ideology: null,
  },
  // 신규추가
  {
    id: "",
    nameKr: "은하연방",
    nameJp: "銀河連邦ぎんがれんぽう",
    nameEn: "Galactic Federation",
    color: "",
    flag: "",
    currency: "",
    ideologyCode: null,
    ideology: null,
  },
  // 수정 - 은하제국 분리
  // 은하제국 -> [골덴바움왕조/립슈타트/정통정부/로엔그람왕조]
  {
    id: "REH",
    nameKr: "은하제국 골덴바움 왕조",
    nameJp: "銀河帝国 ゴールデンバウム 王朝",
    nameEn: "Galactic Empire (Goldenbaum-Dynastie)",
    color: "#c0392b",
    flag: "⚔️",
    currency: "제국 마르크",
    ideologyCode: 240,
    ideology: byCode[240],
  },
  {
    id: "LIP",
    nameKr: "립슈타트 귀족연합",
    nameJp: "リップシュタット連盟",
    nameEn: "Lippstadtische Liga",
    color: "",
    flag: "",
    currency: "제국 마르크",
    ideologyCode: 240,
    ideology: byCode[240],
  },
  {
    id: "LIP",
    nameKr: "은하제국 정통정부",
    nameJp: "銀河帝国正統政府",
    nameEn: "Galaktische Reichsregierung der Legitimität",
    color: "",
    flag: "",
    currency: "",
    ideologyCode: 240,
    ideology: byCode[240],
  },
  {
    id: "NRH",
    nameKr: "은하제국 로엔그람 왕조",
    nameJp: "銀河帝国 ローエングラム 王朝",
    nameEn: "Galactic Empire (Lohengramm-Dynastie)",
    color: "",
    flag: "",
    currency: "제국 마르크",
    ideologyCode: 240,
    ideology: byCode[240],
  },
  {
    id: "FPA",
    nameKr: "자유행성동맹",
    nameJp: "自由惑星同盟",
    nameEn: "Free Planets Alliance",
    color: "#2980b9",
    flag: "🛡️",
    currency: "동맹 디나르",
    ideologyCode: 100,
    ideology: byCode[100],
  },
  // 신규 추가
  {
    id: "SMC",
    nameKr: "구국군사회의",
    nameJp: "救国軍事会議",
    nameEn: "National Salvation Military Council",
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideologyCode: null,
    ideology: null,
  },
  // 신규 추가
  {
    id: "",
    nameKr: "엘 파실 독립정부",
    nameJp: "",
    nameEn: "",
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideologyCode: null,
    ideology: null,
  },
  {
    id: "",
    nameKr: "이제르론 공화정부",
    nameJp: "",
    nameEn: "",
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideologyCode: null,
    ideology: null,
  },
  // 신규 추가
  {
    id: "",
    nameKr: "바라트 성계 자치령",
    nameJp: "",
    nameEn: "",
    color: "",
    flag: "",
    currency: "동맹 디나르",
    ideologyCode: null,
    ideology: null,
  },
  {
    id: "PZN",
    nameKr: "페잔 자치령",
    nameJp: "フェザーン自治領",
    nameEn: "Phezzan Dominion",
    color: "#27ae60",
    flag: "💰",
    currency: "페잔 골드",
    ideologyCode: 180,
    ideology: byCode[180],
  },
  {
    id: "EAT",
    nameKr: "지구교",
    nameJp: "地球教",
    nameEn: "Earth Cult",
    color: "#8e44ad",
    flag: "✝️",
    currency: "",
    ideologyCode: null,
    ideology: null,
  },
];
