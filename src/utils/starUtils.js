// 경로: src/utils/starUtils.js
// ================================================================
//  starUtils.js — 성계·행성 데이터 유틸리티
//  수정: 2026-06-28
//
//  ■ 사용 범위
//    게임 전 (로비·백과사전·초기화):
//      buildSystemsMap(), fncGet*(), 맵·상수 사용 가능.
//    게임 중:
//      gameStore.state(systems 등)만 사용.
//      이 파일의 함수·맵을 인게임 로직에서 호출하지 말 것.
//      → 게임 중 성계 정보는 gameStore.systems[starCode]로 접근.
//
//  ※ 컴포넌트·스토어에서 data 파일을 직접 import 하지 말 것.
//
//  의존 데이터 파일 (외부에서 직접 import 금지):
//    starSystemData.js    → STAR_SYSTEMS, OBSTACLES
//    planetsData.js       → PLANETS
//    laneData.js          → LANES
//    planetDetailTrait.js → PLANET_TRAITS
// ================================================================

import { STAR_SYSTEMS, OBSTACLES } from '@/data/base/stars/starSystemData'
import { PLANETS }                 from '@/data/base/stars/planetsData'
import { LANES }                   from '@/data/base/stars/laneData'
import { PLANET_TRAITS }           from '@/data/base/stars/planetDetailTrait'
import { BUILDING_MAP }            from '@/data/base/buildingData'

// ================================================================
//  raw 데이터 re-export
// ================================================================
export { STAR_SYSTEMS, OBSTACLES }
export { PLANETS }
export { LANES }
export { PLANET_TRAITS }

// ================================================================
//  성계 타입별 기본 스탯
//  buildSystemsMap에서 타입에 따라 기본값으로 사용
// ================================================================
export const STAR_TYPE_DEFAULTS = {
  capital:   { population: 200, industry: 90, defense: 80 },
  fortress:  { population: 30,  industry: 60, defense: 95 },
  frontier:  { population: 40,  industry: 40, defense: 55 },
  contested: { population: 10,  industry: 20, defense: 25 },
  noble:     { population: 70,  industry: 55, defense: 50 },
  normal:    { population: 60,  industry: 50, defense: 45 },
  neutral:   { population: 50,  industry: 40, defense: 40 },
}

// ================================================================
//  pre-built 조회 맵
// ================================================================

/** STAR_MAP: { [starCode]: star } */
export const STAR_MAP = Object.fromEntries(STAR_SYSTEMS.map(s => [s.code, s]))

/**
 * PLANET_MAP: { [starCode]: Planet[] }
 * 성계 코드 → 해당 성계 행성 배열
 */
export const PLANET_MAP = (() => {
  const map = {}
  for (const p of PLANETS) {
    ;(map[p.starCode] ??= []).push(p)
  }
  return map
})()

/**
 * PLANET_CODE_MAP: { [planetCode]: Planet }
 */
export const PLANET_CODE_MAP = Object.fromEntries(PLANETS.map(p => [p.code, p]))

/**
 * PLANET_TRAIT_MAP: { [planetCode]: PlanetTraitEntry[] }
 * 행성 코드 → 트레잇 목록
 */
export const PLANET_TRAIT_MAP = (() => {
  const map = {}
  for (const t of PLANET_TRAITS) {
    ;(map[t.planetCode] ??= []).push(t)
  }
  return map
})()

// ================================================================
//  다국어 이름 접근자
// ================================================================

/**
 * planetName(planet, lang?)
 * 행성의 다국어 이름 반환. name이 배열이면 lang 우선, 없으면 Kr, 그것도 없으면 ''.
 */
export function planetName(planet, lang = 'Kr') {
  if (!planet) return ''
  if (Array.isArray(planet.name)) {
    return planet.name.find(n => n.code === lang)?.context
        ?? planet.name.find(n => n.code === 'Kr')?.context
        ?? ''
  }
  return planet.nameKr ?? planet.nameEn ?? ''
}

/**
 * starName(star, lang?)
 * 성계의 다국어 이름 반환.
 */
export function starName(star, lang = 'Kr') {
  if (!star) return ''
  if (lang === 'En') return star.nameEn ?? star.nameKr ?? ''
  if (lang === 'Jp') return star.nameJp ?? star.nameKr ?? ''
  return star.nameKr ?? star.nameEn ?? ''
}

// ================================================================
//  성계 faction 결정
// ================================================================

/**
 * resolveStarFaction(planets)
 * 행성 목록의 faction 다수결로 성계 faction 결정.
 * 동률이면 null 반환.
 *
 * @param {{ faction: string|null }[]} planets
 * @returns {string|null}
 */
export function resolveStarFaction(planets) {
  if (!planets?.length) return null
  const cnt = {}
  for (const p of planets) {
    if (p.faction) cnt[p.faction] = (cnt[p.faction] || 0) + 1
  }
  const sorted = Object.entries(cnt).sort((a, b) => b[1] - a[1])
  if (!sorted.length) return null
  if (sorted.length === 1 || sorted[0][1] > (sorted[1]?.[1] ?? 0)) return sorted[0][0]
  return null
}

// ================================================================
//  초기화 빌더
// ================================================================

/**
 * buildPlanetFactionMap(planetDetail)
 * 시나리오 planetDetail 배열 → { [planetCode]: faction } 맵 생성.
 *
 * @param {{ code: string, faction: string }[]} planetDetail
 * @returns {{ [planetCode: string]: string }}
 */
export function buildPlanetFactionMap(planetDetail = []) {
  const map = {}
  for (const p of planetDetail) {
    if (p.code && p.faction) map[p.code] = p.faction
  }
  return map
}

/**
 * buildSystemsMap(starDetail, planetDetail)
 * 성계·행성 초기 상태 맵 생성. gameStore의 systems{} 초기값으로 사용.
 *
 * @param {{ code: string, morale?: number, tax?: number, traits?: object[] }[]} starDetail
 * @param {{ code: string, faction: string }[]} planetDetail
 * @returns {{ [starCode: string]: object }}
 */
export function buildSystemsMap(starDetail = [], planetDetail = []) {
  const detailMap       = Object.fromEntries(starDetail.map(d => [d.code, d]))
  const planetFactionMap = buildPlanetFactionMap(planetDetail)

  const systems = {}
  for (const s of STAR_SYSTEMS) {
    const d       = detailMap[s.code] ?? {}
    const base    = PLANET_MAP[s.code] ?? []

    const planets = base.map(p => {
      const nameKr  = planetName(p, 'Kr')
      const nameEn  = planetName(p, 'En')
      const faction = planetFactionMap[p.code] ?? p.faction ?? null
      return { ...p, nameKr, nameEn, faction }
    })

    const faction = resolveStarFaction(planets)

    // TODO: planetDetailTrait.js에 FORTIFIED 트레잇이 채워진 뒤 트레잇 기반으로 재구현.
    const fortress = null

    // planetsData 기반 집계
    const totalPop = planets.reduce((sum, p) => sum + (p.pops?.unit ?? 0), 0)
    const totalIndustry = planets.reduce((sum, p) =>
      sum + (p.buildings?.details ?? [])
        .filter(d => d.active)
        .reduce((s, d) => s + ((BUILDING_MAP[d.b_id]?.effects?.industry ?? 0) * d.count), 0)
    , 0)
    const totalDefense = planets.reduce((sum, p) =>
      sum + (p.buildings?.details ?? [])
        .filter(d => d.active)
        .reduce((s, d) => s + ((BUILDING_MAP[d.b_id]?.effects?.defense ?? 0) * d.count), 0)
    , 0)

    const defaults = STAR_TYPE_DEFAULTS[s.type] ?? STAR_TYPE_DEFAULTS.normal

    systems[s.code] = {
      id:               s.code,
      code:             s.code,
      name:             s.nameKr,
      nameEn:           s.nameEn,
      type:             s.type,
      x:                s.x,
      y:                s.y,
      desc:             s.desc,
      faction,
      fortress,
      planets,
      morale:           d.morale  ?? 60,
      tax:              d.tax     ?? 0,
      traits:           d.traits  ?? [],
      underConstruction: null,
      population: totalPop      || defaults.population,
      industry:   totalIndustry || defaults.industry,
      defense:    totalDefense  || defaults.defense,
    }
  }
  return systems
}

// ================================================================
//  성계 조회 함수
// ================================================================

/**
 * fncGetStarInfo(starCode)
 * 성계 마스터 데이터 반환.
 */
export function fncGetStarInfo(starCode) {
  const star = STAR_MAP[starCode] ?? null
  if (!star) return { error: `성계 코드 없음: ${starCode}` }
  return { data: { ...star } }
}

/**
 * fncGetPlanetsByStar(starCode)
 * 성계 소속 행성 목록 반환.
 */
export function fncGetPlanetsByStar(starCode) {
  const planets = PLANET_MAP[starCode]
  if (!planets?.length) return { data: [] }
  return { data: planets.map(p => ({ ...p })) }
}

/**
 * fncGetPlanetInfo(planetCode)
 * 행성 마스터 데이터 반환.
 */
export function fncGetPlanetInfo(planetCode) {
  const planet = PLANET_CODE_MAP[planetCode] ?? null
  if (!planet) return { error: `행성 코드 없음: ${planetCode}` }
  return { data: { ...planet } }
}

/**
 * fncGetPlanetTraits(planetCode)
 * 행성에 부착된 트레잇 목록 반환.
 */
export function fncGetPlanetTraits(planetCode) {
  const traits = PLANET_TRAIT_MAP[planetCode] ?? []
  return { data: [...traits] }
}
