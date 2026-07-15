// A* 경로 탐색 — 전술 맵 타일 기반
import { TERRAIN } from '@/data/base/tactical/tacticalData'

/**
 * astar(sx, sy, gx, gy, maxCost, tileAt, mapW, mapH, blockedUnits, selfUnitId)
 * 반환: { x, y }[] 경로 배열 (start 포함) or null (불가)
 *
 * maxCost: 이동력 상한 (speed). 이 범위 내 경로만 탐색.
 */
export function astar(sx, sy, gx, gy, maxCost, tileAt, mapW, mapH, blockedUnits, selfUnitId) {
  if (sx === gx && sy === gy) return [{ x: sx, y: sy }]

  const blocked = new Set(
    (blockedUnits ?? [])
      .filter(u => u.unitId !== selfUnitId && u.status === 'active' && !(u.x === gx && u.y === gy))
      .map(u => `${u.x},${u.y}`)
  )

  const key  = (x, y) => `${x},${y}`
  const h    = (x, y) => Math.abs(x - gx) + Math.abs(y - gy)

  // gScore, fScore: Map<string, number>
  const gScore = new Map()
  const fScore = new Map()
  const parent = new Map()
  const open   = new Set()
  const closed = new Set()

  const sk = key(sx, sy)
  gScore.set(sk, 0)
  fScore.set(sk, h(sx, sy))
  parent.set(sk, null)
  open.add(sk)

  while (open.size > 0) {
    // open 중 f 최솟값 노드 선택
    let curKey = null
    let minF   = Infinity
    for (const k of open) {
      const f = fScore.get(k) ?? Infinity
      if (f < minF) { minF = f; curKey = k }
    }
    open.delete(curKey)
    closed.add(curKey)

    const [cx, cy] = curKey.split(',').map(Number)

    if (cx === gx && cy === gy) {
      // 경로 역추적
      const path = []
      let k = curKey
      while (k !== null) {
        const [px, py] = k.split(',').map(Number)
        path.unshift({ x: px, y: py })
        k = parent.get(k)
      }
      return path
    }

    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = cx + dx, ny = cy + dy
      if (nx < 0 || nx >= mapW || ny < 0 || ny >= mapH) continue
      const nk = key(nx, ny)
      if (closed.has(nk)) continue
      const terrKey = tileAt(nx, ny)?.terrain ?? 'SPACE'
      const terr    = TERRAIN[terrKey]
      if (!terr?.passable) continue
      if (blocked.has(nk)) continue
      const stepCost = 1 / (terr.moveMod ?? 1)
      const ng = (gScore.get(curKey) ?? 0) + stepCost
      if (ng > maxCost + 0.01) continue
      if (ng < (gScore.get(nk) ?? Infinity)) {
        gScore.set(nk, ng)
        fScore.set(nk, ng + h(nx, ny))
        parent.set(nk, curKey)
        open.add(nk)
      }
    }
  }

  return null
}
