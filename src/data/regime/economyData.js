// src/data/regime/economyData.js
export const ECONOMY_DATA = [
  { code: 20,  name: "자급자족" },
  { code: 60,  name: "봉건경제" },
  { code: 100, name: "자본주의" },
  { code: 140, name: "혼합경제" },
  { code: 180, name: "국가자본주의" },
  { code: 220, name: "사회주의" },
  { code: 260, name: "계획경제" },
  { code: 300, name: "공산주의" },
];

export const ECONOMY_MAP = Object.fromEntries(
  ECONOMY_DATA.map((i) => [i.code, i])
);
