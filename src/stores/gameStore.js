import { defineStore } from 'pinia'
import {
  FINANCE, MILITARY, INTEL,
  OPERATION_TYPES, CONSTRUCTION_TYPES, FORTRESS_WEAPONS, DIALOGS
} from '@/data/masterData'
import {
  AGENDA_ACTIONS, APPROVAL_CHAINS, AGENDA_EXPIRE_TURNS
} from '@/data/base/agenda/agendaData'
import { SCENARIOS }           from '@/data/scenario/scenarioData.js'
import { buildSystemsMap, OBSTACLES, LANES } from '@/utils/starUtils'
import { BUILDING_MAP } from '@/data/base/buildingData'
import { buildCharactersMap }  from '@/utils/charUtils'
import { buildFleetsMap }          from '@/utils/fleetUtils'
import { buildFactionsMap }        from '@/utils/factionUtils'
import { resolveSupremeCommander } from '@/utils/battleUtils'

const _fkr = f => f?.name?.find(e => e.code === 'Kr')?.context

const _GLOB_STAR_DETAIL   = import.meta.glob('/src/data/scenario/*/*/*/stars/starDetail.js')
const _GLOB_PLANET_DETAIL = import.meta.glob('/src/data/scenario/*/*/*/stars/planetDetail.js')
const _GLOB_CHAR_JOBS     = import.meta.glob('/src/data/scenario/*/*/*/characters/charactersJobs.js')
const _GLOB_FLEET_DATA    = import.meta.glob('/src/data/scenario/*/*/*/fleet/fleetData.js')
const _GLOB_FLEET_TRAIT   = import.meta.glob('/src/data/scenario/*/*/*/fleet/fleetTraitData.js')
const _GLOB_CHAR_LIST     = import.meta.glob('/src/data/scenario/*/*/*/characters/charactersData.js')
const _GLOB_CLIQUE_DATA   = import.meta.glob('/src/data/scenario/*/*/*/cliqueData.js')
const _GLOB_OP_PROPOSE    = import.meta.glob('/src/data/scenario/*/*/*/opProposeData.js')

async function _loadScenarioFiles(scId) {
  const [y, m, s] = scId.split('_')
  const base = `/src/data/scenario/${y}/${m}/${s}`
  const load = (glob, suf) => (glob[`${base}/${suf}`] ?? (() => Promise.resolve(null)))()
  const [sd, pd, cj, cl, cld, fd, ftd, op] = await Promise.all([
    load(_GLOB_STAR_DETAIL,   'stars/starDetail.js'),
    load(_GLOB_PLANET_DETAIL, 'stars/planetDetail.js'),
    load(_GLOB_CHAR_JOBS,     'characters/charactersJobs.js'),
    load(_GLOB_CHAR_LIST,     'characters/charactersData.js'),
    load(_GLOB_CLIQUE_DATA,   'cliqueData.js'),
    load(_GLOB_FLEET_DATA,    'fleet/fleetData.js'),
    load(_GLOB_FLEET_TRAIT,   'fleet/fleetTraitData.js'),
    load(_GLOB_OP_PROPOSE,    'opProposeData.js'),
  ])
  return {
    starDetail:     sd?.STAR_DETAIL             ?? [],
    planetDetail:   pd?.PLANET_DETAIL           ?? [],
    charJobs:       cj?.CHAR_JOBS               ?? null,
    charList:       cl?.CHAR_LIST               ?? null,
    cliqueData:     cld?.CLIQUE_DATA            ?? [],
    fleetData:      fd?.FLEET_DATA              ?? [],
    fleetTraitData: ftd?.FLEET_TRAIT_DATA       ?? [],
    opProposeData:  op?.OP_PROPOSE_DATA         ?? [],
  }
}

function buildInitialAgendas(opProposeData = []) {
  let seq = 0
  return opProposeData.map(op => {
    seq++
    const typeLabel = op.opType === 'attack' ? '공격' : '방어'
    return {
      id:             `AGD_${String(seq).padStart(4, '0')}`,
      category:       'military',
      action:         'op_propose',
      title:          `${op.targetName} ${typeLabel}작전`,
      payload:        {
        ...op,
        intel: op.intel ?? { hasIntel: false, expiresAt: null, exposed: false },
      },
      registeredBy:   null,
      registeredTurn: 0,
      status:         'approved',
    }
  })
}

function buildState(scId, pf, extraData = {}, options = {}) {
  const sc = SCENARIOS.find(s => s.id === scId) || SCENARIOS[0]
  const {
    starDetail = [], planetDetail = [],
    charJobs = null, charList = null, cliqueData = [],
    fleetData = [], opProposeData = [],
  } = extraData

  const factions   = buildFactionsMap(sc.factions ?? ['REH', 'FPA', 'PZN'])
  const systems    = buildSystemsMap(starDetail, planetDetail)
  const characters = buildCharactersMap({
    charList,
    scenarioCharJobs: charJobs,
    fleetData,
    cliqueData,
    scenarioYearType: sc.yearType ?? null,
    scenarioYear:     sc.year     ?? null,
    scenarioMonth:    sc.month    ?? 1,
    scenarioDay:      sc.date     ?? 1,
  })
  const fleets     = buildFleetsMap(fleetData)

  const resources = {}
  for (const [id, f] of Object.entries(factions)) {
    resources[id] = { gold: f.gold }
  }

  return {
    sc, playerFaction: pf,
    year: sc.year, impYear: sc.year - 309, month: sc.month ?? 1, day: sc.date ?? 1, turn: 1,
    factions, systems, resources, characters, fleets, cliques: cliqueData,
    log: [], selectedSystem: null, selectedFleet: null,
    _levyCooldown: 0, _loanBalance: 0, _loanDueTurn: null, _fleetSeq: 10, _truce: {}, _tradeBonus: 0,
    _reserve: 0, _intelligenceFund: 0, _budgetAllocation: null, _intelMap: {},
    tacticalPhase: options.tacticalPhase ?? 'normal',  // 'detail'|'normal'|'simple'
    _pendingBattles: [],
    _tacticalResume: null,   // 전술전투 중단 스냅샷 (24hr 전략 페이즈 대기 시 저장)
    _turnActionTaken: false,
    activeModal: null, gameOver: false, winner: null,
    agendas: buildInitialAgendas(opProposeData), _agendaSeq: opProposeData.length,
    playerCharCode: null,
    _pendingOp: null,
    _opActionsUsed: 0,
    _actionSlots: [],
  }
}

export const useGameStore = defineStore('game', {
  state: () => ({ initialized: false, isLoading: false, _preloadedScId: null, _preloadedData: null, lanes: LANES, obstacles: OBSTACLES, ...buildState(0, 'REH') }),

  getters: {
    pRes:      s => s.resources[s.playerFaction],
    pFleets:   s => s.fleets[s.playerFaction] || [],
    pChars:    s => Object.values(s.characters).filter(c => c.faction === s.playerFaction),
    sysCounts: s => {
      const c = { REH: 0, FPA: 0, PZN: 0 }
      Object.values(s.systems).forEach(x => { if (x.faction) c[x.faction] = (c[x.faction] || 0) + 1 })
      return c
    },
    dateStr:   s => `우주력 ${s.year}년 ${s.month}월 ${s.day}일 / 제국력 ${s.impYear}년`,
    pFaction:  s => s.factions[s.playerFaction] ?? null,
    fColors:   s => Object.fromEntries(Object.values(s.factions).map(f => [f.id, f.color])),
    allFleets: s => {
      const r = []
      Object.entries(s.fleets).forEach(([faction, fl]) => {
        fl.forEach(f => {
          if (f.parentFlt) return  // 분함대는 전략맵에서 모함대에 합산 표기
          const sys = s.systems[f.location]
          if (!sys) return
          const childShips = fl.filter(c => c.parentFlt === f.id)
                               .reduce((sum, c) => sum + (c.ships ?? 0), 0)
          r.push({ ...f, ships: f.ships + childShips, faction, sx: sys.x, sy: sys.y })
        })
      })
      return r
    },
    playerChar:  s => s.playerCharCode ? (s.characters[s.playerCharCode] ?? null) : null,
    selSysObj:   s => s.selectedSystem ? s.systems[s.selectedSystem] : null,
    selFleetObj: s => {
      if (!s.selectedFleet) return null
      for (const [faction, fleets] of Object.entries(s.fleets)) {
        const f = fleets.find(x => x.id === s.selectedFleet)
        if (f) return { ...f, faction }
      }
      return null
    },
  },

  actions: {
    async preloadScenario(scId) {
      if (this._preloadedScId === scId) return
      this.isLoading = true
      const data = await _loadScenarioFiles(scId)
      this._preloadedScId  = scId
      this._preloadedData  = data
      this.isLoading = false
    },

    async startGame(scId, pf, charCode = null, options = {}) {
      const extraData = this._preloadedScId === scId && this._preloadedData
        ? this._preloadedData
        : await _loadScenarioFiles(scId)
      const fresh = buildState(scId, pf, extraData, options)
      Object.assign(this.$state, { initialized: true, ...fresh })
      if (charCode) this.playerCharCode = charCode
      this.addLog(`[${(_fkr(this.factions[pf]) ?? pf)}] ${fresh.sc.name?.find(e => e.code === 'Kr')?.context ?? fresh.sc.id} 시작.`)
      this._checkInitialEncounters()
    },

    endTurn() {
      // 임시 징세 쿨다운
      if (this._levyCooldown > 0) this._levyCooldown--
      // 페잔 차관 처리
      if (this._loanBalance > 0) {
        const remaining = this._loanDueTurn - this.turn
        if (remaining === 1) this.addLog(`⚠ [차관] 다음 턴에 차관 상환 기일입니다. (${this._loanBalance.toLocaleString()} 마크)`)
        if (remaining <= 0) {
          // 상환 불능 처리
          Object.values(this.systems).forEach(s => { if (s.faction === this.playerFaction) s.morale = Math.max(5, s.morale - 15) })
          this.addLog(`⚠ [차관] 상환 불능 상태입니다. 페잔이 이에 상응하는 조치를 취하겠습니다.`)
          this.resources['PZN'].gold += Math.floor(this._loanBalance * 0.5)
          this._loanBalance = 0; this._loanDueTurn = null
        }
      }
      this._opActionsUsed = 0
      this._actionSlots   = []
      this._processAgendas()
      this._income()
      this._food()
      this._supply()
      this._fleetMove()
      this._morale()
      this._construct()
      this._events()
      this._ai()

      // 전술턴 대기열이 있으면 모두 처리될 때까지 턴 종료(날짜 증가·승리 판정)를 보류
      // (전투 해소는 applyBattleResult()에서 큐 소진 시 _finishTurn() 호출로 이어짐)
      if (this._pendingBattles.length === 0) this._finishTurn()
    },

    // ── 턴의 종료 (모든 전술턴 처리 완료 후 수행) ──────────────────
    _finishTurn() {
      const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      this.day++
      if (this.day > DAYS_IN_MONTH[this.month - 1]) {
        this.day = 1
        this.month++
        if (this.month > 12) { this.month = 1; this.year++; this.impYear++ }
      }
      this.turn++
      this._victory()
      this.addLog(`은하력 ${this.year}년 ${this.month}월 ${this.day}일 (턴 ${this.turn}) 시작합니다`)
      this._turnActionTaken = false
      this._checkInitialEncounters()
      // 플레이어 인물이 전투 중인 함대 소속이면 해당 턴 행동력 전부 소진
      const _pChar = this.playerCharCode ? this.characters[this.playerCharCode] : null
      if (_pChar?.fleetCode) {
        const _pFleet = this.pFleets.find(f => f.id === _pChar.fleetCode)
        if (_pFleet?.status === 'battle') {
          this._opActionsUsed = 3
          this._actionSlots   = []
        }
      }
    },

    selectSystem(id)  { this.selectedSystem = id;    this.selectedFleet = null },
    selectFleet(id)   { this.selectedFleet = id;     this.selectedSystem = null },
    openModal(n, p=null) { this.activeModal = { name: n, payload: p } },
    closeModal()      { this.activeModal = null },
    _markAction()     { this._turnActionTaken = true },

    // changeTax: 성계별 세율 조정 — 국가 단위 defaultTax 전환으로 일시 비활성화
    // changeTax(sysId, rate) { ... },

    buildConstruction(sysId, type) {
      const s = this.systems[sysId]
      const ct = CONSTRUCTION_TYPES[type]
      if (!s || s.faction !== this.playerFaction || this.pRes.gold < ct.cost || s.underConstruction) return false
      this.pRes.gold -= ct.cost
      s.underConstruction = { type, turnsLeft: ct.turns }
      this.addLog(`[${s.name}] ${ct.name} 건설 시작 (${ct.turns}턴)`)
      this._markAction()
      return true
    },

    buildBuilding(sysId, planetCode, bldId) {
      const sys    = this.systems[sysId]
      const planet = sys?.planets?.find(p => p.code === planetCode)
      const bld    = BUILDING_MAP[bldId]
      if (!sys || !planet || !bld || !bld.buildable) return false
      if (planet.faction !== this.playerFaction) return false
      if (this.pRes.gold < (bld.buildCost ?? 0)) return false

      const details = planet.buildings?.details ?? []
      const totalCount = details.filter(d => d.b_id === bldId).reduce((s, d) => s + d.count, 0)
      if (totalCount >= bld.maxCount) return false

      if (bld.slotCost > 0) {
        const usedSlots = details.reduce((sum, d) => sum + (BUILDING_MAP[d.b_id]?.slotCost ?? 1) * d.count, 0)
        if (usedSlots + bld.slotCost > (planet.buildings?.maxSize ?? 0)) return false
      }

      this.pRes.gold -= bld.buildCost
      details.push({
        b_id:        bldId,
        count:       1,
        active:      false,
        construct:   bld.buildTime,
        bldName:     bld.name.find(n => n.code === 'Kr')?.context ?? bldId,
        bldCategory: bld.category,
      })
      const bldName = bld.name.find(n => n.code === 'Kr')?.context ?? bldId
      const sysName = _fkr(sys.name) ?? sysId
      this.addLog(`[${sysName}] ${bldName} 건설 시작 (${bld.buildTime}턴)`)
      this._markAction()
      return true
    },

    deployFleet(fleetId, targetId, opType) {
      const fleet  = this.pFleets.find(f => f.id === fleetId)
      const target = this.systems[targetId]
      if (!fleet || !target || fleet.status !== 'standby') return false

      // 같은 성계: 적 함대 유무에 따라 분기
      if (fleet.location === targetId) {
        const enemies = this._enemiesAt(this.playerFaction, targetId)
        if (enemies.length) {
          // 적 함대 존재 → 전술 전투 큐 등록
          fleet.status = 'battle'
          const existing = this._pendingBattles.find(b => b.locationId === targetId && !b._handled)
          if (existing) {
            if (!existing.attackerFleets.find(f => f.id === fleet.id))
              existing.attackerFleets.push(this._snapFleet(fleet, this.playerFaction))
          } else {
            const sysName = this.systems[targetId]?.name ?? targetId
            const atkSnaps = [this._snapFleet(fleet, this.playerFaction)]
            const defSnaps = enemies.map(e => this._snapFleet(e, e.faction))
            this._pendingBattles.push({
              locationId:        targetId,
              playerFaction:     this.playerFaction,
              attackerFaction:   this.playerFaction,
              defenderFaction:   enemies[0].faction,
              attackerFleets:    atkSnaps,
              defenderFleets:    defSnaps,
              attackerSupCmd:    resolveSupremeCommander(atkSnaps, this.characters),
              defenderSupCmd:    resolveSupremeCommander(defSnaps, this.characters),
              attackerObjective: null,
              defenderObjective: null,
              opType,
              hasIntel:  this._hasIntel(targetId),
              _handled:  false,
              _notified: false,
            })
            this.addLog(`⚔ [교전] ${fleet.name} — ${sysName} 교전 개시`)
          }
        } else {
          // 적 함대 없음 → 즉시 작전 처리
          this._battle(fleet, target, opType)
        }
        this._markAction()
        return true
      }

      // 다른 성계: 이동 명령
      fleet.status        = 'moving'
      fleet.moveTarget    = targetId
      fleet.moveTurnsLeft = 2        // TODO: LANES 거리 기반으로 교체
      fleet.target        = targetId
      this._syncSubFleets(fleet.id, fleet.faction, {
        status: 'moving', moveTarget: targetId, moveTurnsLeft: 2, target: targetId,
      })
      this.addLog(`[이동] ${fleet.name} → ${target.name} (${fleet.moveTurnsLeft}턴)`)
      this._markAction()
      return true
    },

    // ── 24hr 전술 전투 중단 → 전략 페이즈 진입 ──────────────────
    // 전술 뷰에서 호출. 현재 유닛 상태를 스냅샷으로 저장하고
    // 즉시 특수 이벤트를 발화한 뒤 라우터가 /game으로 전환한다.
    pauseTacticalForStrategic(snapshot) {
      this._tacticalResume = snapshot
      const ctx = this._pendingBattles[0]
      if (ctx) {
        ctx._midBattlePaused = true
        ctx._handled         = true   // battleConfirm 재표시 방지
        ctx._notified        = true
      }
      // 전략 레이어 이벤트 즉시 발화
      this._events()
      this.addLog('⏸ 전술 전투 중단 — 전략 페이즈')
    },

    clearTacticalResume() {
      this._tacticalResume = null
      const ctx = this._pendingBattles[0]
      if (ctx?._midBattlePaused) {
        ctx._midBattlePaused = false
        ctx._handled         = true
        ctx._notified        = true
      }
    },

    applyBattleResult(result) {
      const ctx = this._pendingBattles[0]
      if (!ctx) return

      const atkWins = result.winner === ctx.attackerFaction
      const totalAtkSnap = ctx.attackerFleets.reduce((s, f) => s + f.ships, 0)
      const totalDefSnap = ctx.defenderFleets.reduce((s, f) => s + f.ships, 0)

      // ── 공격 측 함대 결과 반영 ─────────────────────────────────
      ctx.attackerFleets.forEach(snap => {
        const live = this.fleets[snap.faction]?.find(f => f.id === snap.id)
        if (!live) return
        const share = totalAtkSnap > 0 ? snap.ships / totalAtkSnap : 1 / ctx.attackerFleets.length
        live.ships  = Math.max(1000, live.ships - Math.floor(result.attackerLosses * share))
        live.status = 'standby'
        live.target = null
        if (atkWins) {
          live.location = ctx.locationId
        } else {
          const safe = this._nearestFriendlySystem(ctx.locationId, snap.faction)
          if (safe) live.location = safe.id
        }
      })

      // ── 방어 측 함대 결과 반영 ─────────────────────────────────
      ctx.defenderFleets.forEach(snap => {
        const fFleets = this.fleets[snap.faction]
        if (!fFleets) return
        const idx = fFleets.findIndex(f => f.id === snap.id)
        if (idx === -1) return
        const share     = totalDefSnap > 0 ? snap.ships / totalDefSnap : 1 / ctx.defenderFleets.length
        const loss      = Math.floor(result.defenderLosses * share)
        const remaining = fFleets[idx].ships - loss
        if (remaining <= 1000) {
          this.addLog(`🗡️ [격멸] ${snap.name} 격멸 → 해산`)
          fFleets.splice(idx, 1)
        } else {
          fFleets[idx].ships  = remaining
          fFleets[idx].status = 'standby'
          if (atkWins) {
            const safe = this._nearestFriendlySystem(ctx.locationId, snap.faction)
            if (safe) fFleets[idx].location = safe.id
          }
        }
      })

      // ── 성계 점령 효과 (공격측 승리 시) ──────────────────────
      if (atkWins) {
        const target = this.systems[ctx.locationId]
        const op     = OPERATION_TYPES[ctx.opType]
        if (target && op) {
          const prev = target.faction
          target.faction = ctx.attackerFaction
          target.defense = Math.max(5, target.defense - (op.defDmg    || 0))
          target.morale  = Math.max(5, target.morale  - (op.moraleDmg || 0))
          this.addLog(`✅ [점령] ${target.name} (${prev || '무소속'} → ${ctx.attackerFaction})`)
        }
      } else {
        if (ctx.attackerFaction === this.playerFaction)
          this.addLog(`⚠ [패배] 아군 함대 철수`)
      }

      this._pendingBattles.shift()
      if (this._pendingBattles.length === 0) this._finishTurn()
    },

    // ── 교전 자동 처리 ────────────────────────────────────────────
    autoResolveBattle() {
      const ctx = this._pendingBattles[0]
      if (!ctx) return null

      const totalAtkShips = ctx.attackerFleets.reduce((s, f) => s + f.ships, 0)
      const totalDefShips = ctx.defenderFleets.reduce((s, f) => s + f.ships, 0)

      // 공격 측 최우수 사령관 보너스
      const atkBonus = ctx.attackerFleets.reduce((best, f) => {
        const c      = this.characters[f.commander]
        const rating = c ? 0.7 + (c.statCmd ?? 50) / 100 * 0.6 : 1.0
        return Math.max(best, rating)
      }, 0.7)

      const atkPower     = totalAtkShips * atkBonus * (0.85 + Math.random() * 0.3)
      const defPower     = totalDefShips * (0.85 + Math.random() * 0.3)
      const attackerWins = atkPower >= defPower

      const winnerLossRate = 0.05 + Math.random() * 0.10
      const loserLossRate  = 0.30 + Math.random() * 0.25
      const attackerLosses = Math.floor(totalAtkShips * (attackerWins ? winnerLossRate : loserLossRate))
      const defenderLosses = Math.floor(totalDefShips * (attackerWins ? loserLossRate  : winnerLossRate))
      const winner = attackerWins ? ctx.attackerFaction : ctx.defenderFaction

      const sysName = this.systems[ctx.locationId]?.name ?? ctx.locationId
      const atkLabel = ctx.attackerFleets.map(f => f.name).join('+')
      this.addLog(`⚔ [자동] ${sysName} — ${attackerWins ? '아군 승리' : '아군 패배'} (${atkLabel} 손실 ${attackerLosses.toLocaleString()}척 / 적 손실 ${defenderLosses.toLocaleString()}척)`)

      const result = { winner, attackerLosses, defenderLosses }
      this.applyBattleResult(result)
      return result
    },

    assignChar(charId, post) {
      const c = this.characters[charId]
      if (!c || c.faction !== this.playerFaction) return
      if (!c.jobs.some(j => j.jobCode === post)) c.jobs.unshift({ charCode: charId, jobCode: post })
      const dialog = this.playerFaction === 'REH' ? DIALOGS.APPOINTMENT.emperor : ''
      if (dialog) this.addLog(`[황제] ${dialog}`)
      this.addLog(`[임명] ${c.name} → ${post}`)
      this._markAction()
    },


    // ── 임시 징세 ─────────────────────────────────────────────────
    emergencyLevy() {
      const res = this.pRes
      const terms = FINANCE.LEVY_TERMS

      if (this._levyCooldown > 0) {
        this.addLog(`⚠ [임시 징세] 쿨다운 중 (${this._levyCooldown}턴 남음)`)
        return false
      }

      // 월 수입 계산
      let monthlyIncome = 0
      Object.values(this.systems).forEach(s => {
        if (s.faction === this.playerFaction)
          monthlyIncome += Math.floor(s.population * ((this.factions[this.playerFaction]?.defaultTax ?? 0) / 100) * (s.industry / 100) * 10)
      })

      const amount = Math.floor(monthlyIncome * terms.RATE)
      res.gold += amount
      this._levyCooldown = terms.COOLDOWN_TURNS

      // 전 성계 민심 저하
      Object.values(this.systems).forEach(s => {
        if (s.faction === this.playerFaction)
          s.morale = Math.max(5, s.morale + terms.MORALE_PENALTY)
      })

      const dlg = FINANCE.DIALOGS.EMERGENCY_LEVY
      if (this.playerFaction === 'REH') {
        this.addLog(`[재상] ${dlg.empire_prime}`)
        this.addLog(`[황제] ${dlg.emperor_reply}`)
      }
      this.addLog(dlg.success(amount))
      this._markAction()
      return true
    },

    // ── 페잔 차관 ─────────────────────────────────────────────────
    takeLoan(amount) {
      const terms = FINANCE.LOAN_TERMS

      if (amount < terms.MIN_AMOUNT || amount > terms.MAX_AMOUNT) {
        this.addLog(`⚠ [차관] 금액은 ${terms.MIN_AMOUNT}~${terms.MAX_AMOUNT} 마크 사이여야 합니다.`)
        return false
      }
      if (this._loanBalance > 0) {
        this.addLog(`⚠ [차관] 기존 차관(${this._loanBalance.toLocaleString()} 마크)을 먼저 상환하세요.`)
        return false
      }

      const totalRepay = Math.floor(amount * (1 + terms.INTEREST_RATE))
      this.pRes.gold += amount
      this._loanBalance = totalRepay
      this._loanDueTurn = this.turn + terms.REPAY_TURNS

      // 페잔 수익
      this.resources['PZN'].gold += totalRepay - amount

      const dlg = FINANCE.DIALOGS.LOAN
      this.addLog(`[페잔] ${dlg.phezzan_offer}`)
      if (this.playerFaction === 'REH') this.addLog(`[황제] ${dlg.empire_accept}`)
      else this.addLog(`[의장] ${dlg.alliance_accept}`)
      this.addLog(`💰 [차관] ${amount.toLocaleString()} 마크 수령. 상환액: ${totalRepay.toLocaleString()} 마크 (${terms.REPAY_TURNS}턴 내)`)
      this._markAction()
      return true
    },

    // ── 차관 상환 ─────────────────────────────────────────────────
    repayLoan() {
      if (this._loanBalance <= 0) {
        this.addLog('⚠ [상환] 상환할 차관이 없습니다.')
        return false
      }
      if (this.pRes.gold < this._loanBalance) {
        this.addLog(`⚠ [상환] 자금이 부족합니다. (필요: ${this._loanBalance.toLocaleString()}, 보유: ${this.pRes.gold.toLocaleString()})`)
        return false
      }
      this.pRes.gold -= this._loanBalance
      const paid = this._loanBalance
      this._loanBalance = 0
      this._loanDueTurn = null
      this.addLog(`[페잔] ${FINANCE.DIALOGS.LOAN.repay_confirm}`)
      this.addLog(`✅ [상환] ${paid.toLocaleString()} 마크 상환 완료.`)
      this._markAction()
      return true
    },

    // ── 예산 배분 ─────────────────────────────────────────────────
    allocateBudget(allocations) {
      // allocations: { MILITARY: n, CONSTRUCTION: n, INTELLIGENCE: n, WELFARE: n, RESERVE: n }
      const total = Object.values(allocations).reduce((s, v) => s + v, 0)
      if (total > this.pRes.gold) {
        this.addLog(`⚠ [예산] 배분 합계(${total.toLocaleString()})가 보유 자금(${this.pRes.gold.toLocaleString()})을 초과합니다.`)
        return false
      }

      // 각 항목 효과 적용
      Object.entries(allocations).forEach(([key, amount]) => {
        if (amount <= 0) return
        switch(key) {
          case 'MILITARY':
            // 함대 전투력 소폭 회복
            this.pFleets.forEach(f => { f.ships = Math.min(f.ships * 1.05, f.ships + Math.floor(amount / 100)) })
            break
          case 'WELFARE':
            // 전 성계 민심 상승
            Object.values(this.systems).forEach(s => {
              if (s.faction === this.playerFaction)
                s.morale = Math.min(100, s.morale + Math.floor(amount / 500))
            })
            break
          case 'INTELLIGENCE':
            this._intelligenceFund = (this._intelligenceFund || 0) + amount
            break
          case 'RESERVE':
            this._reserve = (this._reserve || 0) + amount
            break
        }
      })

      this.pRes.gold -= total
      this._budgetAllocation = allocations

      const dlg = FINANCE.DIALOGS.BUDGET
      if (this.playerFaction === 'REH') {
        this.addLog(`[재상] ${dlg.empire_prime}`)
        this.addLog(`[황제] ${dlg.emperor_reply}`)
      } else {
        this.addLog(`[의장] ${dlg.alliance_council}`)
      }
      this.addLog(`✅ [예산] ${dlg.success} (총 ${total.toLocaleString()} 마크)`)
      this._markAction()
      return true
    },


    // ── 함대 편성 (비용 차감) ─────────────────────────────────────
    formFleet(name, commanderId, sizeKey, locationId) {
      const size = MILITARY.FLEET_SIZES[sizeKey]
      if (!size) return false
      if (this.pRes.gold < size.cost) {
        this.addLog(`⚠ [편성] 자금 부족 (필요: ${size.cost.toLocaleString()})`)
        return false
      }
      const sys = this.systems[locationId]
      if (!sys || sys.faction !== this.playerFaction) {
        this.addLog('⚠ [편성] 아군 성계에서만 편성 가능합니다.')
        return false
      }
      this._fleetSeq++
      const id = `${this.playerFaction[0]}_F${this._fleetSeq}`
      const fleet = {
        id, name, commander: commanderId,
        ships: size.ships, maxShips: size.ships,
        location: locationId, status: 'standby',
        target: null, upkeep: size.upkeep,
      }
      this.fleets[this.playerFaction].push(fleet)
      this.pRes.gold -= size.cost
      const dlg = MILITARY.DIALOGS.FORMATION
      const decree = this.playerFaction === 'REH' ? dlg.empire_decree(name) : dlg.alliance_decree(name)
      this.addLog(`[편성] ${decree}`)
      this.addLog(`✅ ${dlg.success(name, size.ships)}`)
      this._markAction()
      return true
    },

    // ── 함대 재편성 (척수 변경) ───────────────────────────────────
    reorganizeFleet(fleetId, newShips) {
      const fleet = this.pFleets.find(f => f.id === fleetId)
      if (!fleet || fleet.status !== 'standby') {
        this.addLog('⚠ [재편성] 대기 중인 함대만 재편성 가능합니다.')
        return false
      }
      const diff = newShips - fleet.ships
      const cost = Math.abs(Math.floor(diff * 0.02))
      if (diff > 0 && this.pRes.gold < cost) {
        this.addLog(`⚠ [재편성] 자금 부족 (필요: ${cost.toLocaleString()})`)
        return false
      }
      const before = fleet.ships
      fleet.ships = Math.max(1000, newShips)
      fleet.maxShips = fleet.ships
      fleet.upkeep = Math.floor(fleet.ships / 500)
      if (diff > 0) this.pRes.gold -= cost
      this.addLog(`✅ ${MILITARY.DIALOGS.REORGANIZE.success(fleet.name, before, fleet.ships)}`)
      this._markAction()
      return true
    },

    // ── 함대 해산 ─────────────────────────────────────────────────
    disbandFleet(fleetId) {
      const idx = this.fleets[this.playerFaction].findIndex(f => f.id === fleetId)
      if (idx === -1) return false
      const fleet = this.fleets[this.playerFaction][idx]
      if (fleet.status !== 'standby') {
        this.addLog('⚠ [해산] 대기 중인 함대만 해산할 수 있습니다.')
        return false
      }
      // 잔여 함선 보상 환급
      const refund = Math.floor(fleet.ships * 0.01)
      this.pRes.gold += refund
      this.fleets[this.playerFaction].splice(idx, 1)
      this.addLog(MILITARY.DIALOGS.FORMATION.disband(fleet.name))
      this.addLog(`💰 잔여 환급: ${refund.toLocaleString()} 마크`)
      this._markAction()
      return true
    },

    // ── 함대 이동 (아군 성계 간 자유이동) ─────────────────────────
    moveFleet(fleetId, targetSystemId) {
      const fleet = this.pFleets.find(f => f.id === fleetId)
      const target = this.systems[targetSystemId]
      if (!fleet || !target) return false
      if (fleet.status !== 'standby') {
        this.addLog('⚠ [이동] 대기 중인 함대만 이동 가능합니다.')
        return false
      }
      if (target.faction !== this.playerFaction) {
        this.addLog('⚠ [이동] 아군 성계로만 이동 가능합니다. (출격은 작전 메뉴를 이용하세요)')
        return false
      }
      const from = this.systems[fleet.location]?.name || fleet.location
      fleet.location = targetSystemId
      this._syncSubFleets(fleet.id, fleet.faction, { location: targetSystemId })
      this.addLog(`🚀 [이동] ${fleet.name}: ${from} → ${target.name}`)
      this._markAction()
      return true
    },

    // ── 가장 가까운 아군 성계 탐색 (직선거리 기준) ─────────────────
    _nearestFriendlySystem(fromId, faction) {
      const homes = Object.values(this.systems).filter(s => s.faction === faction)
      if (!homes.length) return null
      const from = this.systems[fromId]
      if (!from) return homes[0]
      return homes.reduce((a, b) =>
        Math.hypot(a.x - from.x, a.y - from.y) <= Math.hypot(b.x - from.x, b.y - from.y) ? a : b
      )
    },

    // ── 함대 철수 (출격 중 또는 적 성계에서 철수) ─────────────────
    retreatFleet(fleetId) {
      const fleet = this.pFleets.find(f => f.id === fleetId)
      if (!fleet) return false

      // 가장 가까운 아군 성계로 철수 (현재 위치 기준 직선거리)
      const dest = this._nearestFriendlySystem(fleet.location, this.playerFaction)
      if (!dest) return false

      fleet.status = 'standby'
      fleet.target = null
      fleet.location = dest.id
      this._syncSubFleets(fleet.id, fleet.faction, { status: 'standby', target: null, location: dest.id })
      // 철수 시 함선 10% 손실
      const loss = Math.floor(fleet.ships * 0.1)
      fleet.ships = Math.max(1000, fleet.ships - loss)

      this.addLog(`[철수] ${MILITARY.DIALOGS.RETREAT.order(fleet.name)}`)
      this.addLog(`✅ ${MILITARY.DIALOGS.RETREAT.complete(fleet.name, dest.name)} (손실: ${loss.toLocaleString()}척)`)
      this._markAction()
      return true
    },

    // ── 자원 수송 (아군 성계 간 이동) ─────────────────────────────
    transportResources(fromSystemId, toSystemId, itemType, amount) {
      const from = this.systems[fromSystemId]
      const to   = this.systems[toSystemId]
      if (!from || !to) return false
      if (from.faction !== this.playerFaction || to.faction !== this.playerFaction) {
        this.addLog('⚠ [수송] 아군 성계 간에만 수송 가능합니다.')
        return false
      }

      const item = MILITARY.TRANSPORT_ITEMS[itemType]
      const cost = amount * item.costPerUnit

      if (itemType === 'GOLD') {
        if (this.pRes.gold < amount + cost) {
          this.addLog(`⚠ [수송] 자금 부족`)
          return false
        }
        this.pRes.gold -= (amount + cost)
        // 목적지 산업 소폭 증가 (자금으로 시설 투자)
        to.industry = Math.min(100, to.industry + Math.floor(amount / 1000))
      } else if (itemType === 'WELFARE') {
        if (this.pRes.gold < cost) { this.addLog('⚠ [수송] 자금 부족'); return false }
        this.pRes.gold -= cost
        to.morale = Math.min(100, to.morale + Math.floor(amount / 10))
      } else {
        if (this.pRes.gold < cost) { this.addLog('⚠ [수송] 자금 부족'); return false }
        this.pRes.gold -= cost
        to.defense = Math.min(100, to.defense + Math.floor(amount / 20))
      }

      // 적 함대 인근 시 30% 확률로 수송 실패
      const enemyNearby = Object.values(this.fleets)
        .flat()
        .some(f => f.faction !== this.playerFaction && f.location === toSystemId)

      if (enemyNearby && Math.random() < 0.3) {
        this.addLog(`⚠ ${MILITARY.DIALOGS.TRANSPORT.fail}`)
        return false
      }

      this.addLog(`[수송] ${MILITARY.DIALOGS.TRANSPORT.order(from.name, to.name, item.name)}`)
      this.addLog(`✅ ${MILITARY.DIALOGS.TRANSPORT.success(to.name, item.name)}`)
      this._markAction()
      return true
    },


    // ── 첩보 작전 ─────────────────────────────────────────────────
    launchIntelOp(targetSystemId, opType, officerId) {
      const op  = INTEL.OPERATIONS[opType]
      const sys = this.systems[targetSystemId]
      if (!op || !sys) return false
      if (this.pRes.gold < op.cost) {
        this.addLog(`⚠ [첩보] 자금 부족 (필요: ${op.cost.toLocaleString()})`)
        return false
      }
      const officer = this.characters[officerId]
      const intBonus = officer ? (officer.intelligence / 100) * 0.3 : 0
      const successRate = Math.min(0.95, op.successBase + intBonus)
      this.pRes.gold -= op.cost

      const dlg = INTEL.DIALOGS.SPY
      const orderFn = this.playerFaction === 'REH' ? dlg.empire_order : dlg.alliance_order
      const replyMsg = this.playerFaction === 'REH' ? dlg.empire_reply : dlg.alliance_reply
      if (officer) {
        this.addLog(`[${officer.name}] ${orderFn(officer.name)}`)
        this.addLog(`[${officer.name}] ${replyMsg}`)
      }
      this.addLog(dlg.start)

      const success = Math.random() < successRate

      if (success) {
        switch (opType) {
          case 'SPY':
            this.addLog(dlg.success(sys.name))
            this.addLog(`🔍 [정찰] ${sys.name}: 방어 ${sys.defense} / 산업 ${sys.industry} / 민심 ${sys.morale}`)
            this._intelMap[targetSystemId] = this.turn + 3
            break
          case 'SABOTAGE':
            sys.defense   = Math.max(5,  sys.defense   - 20)
            sys.industry  = Math.max(5,  sys.industry  - 15)
            this.addLog(`💣 [파괴] ${sys.name} 시설 파괴 완료! (방어 -20, 산업 -15)`)
            break
          case 'AGITATE':
            sys.morale = Math.max(5, sys.morale - 25)
            this.addLog(`📣 [선동] ${sys.name} 민심 교란 완료! (민심 -25)`)
            break
          case 'ASSASSIN': {
            // 해당 성계의 적 함대 지휘관 교체
            const enemyFleets = Object.values(this.fleets)
              .flat()
              .filter(f => f.location === targetSystemId && f.faction !== this.playerFaction)
            if (enemyFleets.length > 0) {
              const target = enemyFleets[0]
              const victim = this.characters[target.commander]
              const victimName = victim?.name?.find(e => e.code === 'Kr')?.context ?? victim?.code ?? target.commander
              this.addLog(`🗡️ [암살] ${sys.name}의 ${victimName} 암살 성공!`)
              target.commander = null
            } else {
              this.addLog(`🗡️ [암살] ${sys.name}에서 대상을 찾지 못했습니다.`)
            }
            break
          }
        }
        this._markAction()
        return true
      } else {
        this.addLog(dlg.fail)
        this._markAction()
        return false
      }
    },

    // ── 치안 회복 ─────────────────────────────────────────────────
    restoreSecurity(systemId, level, officerId) {
      const lvl = INTEL.SECURITY_LEVELS[level]
      const sys = this.systems[systemId]
      if (!lvl || !sys) return false
      if (sys.faction !== this.playerFaction) {
        this.addLog('⚠ [치안] 아군 성계에서만 가능합니다.')
        return false
      }
      if (this.pRes.gold < lvl.cost) {
        this.addLog(`⚠ [치안] 자금 부족 (필요: ${lvl.cost.toLocaleString()})`)
        return false
      }
      this.pRes.gold -= lvl.cost
      sys.morale  = Math.max(5,   Math.min(100, sys.morale  + lvl.moraleEffect))
      sys.defense = Math.min(100, sys.defense + lvl.defEffect)

      const officer = this.characters[officerId]
      const dlg = INTEL.DIALOGS.SECURITY
      const orderFn = this.playerFaction === 'REH' ? dlg.empire_order : dlg.alliance_order
      const replyMsg = this.playerFaction === 'REH' ? dlg.empire_reply : dlg.alliance_reply
      if (officer) {
        this.addLog(`[${officer.name}] ${orderFn(officer.name, sys.name)}`)
        this.addLog(`[${officer.name}] ${replyMsg}`)
      }
      this.addLog(`✅ ${dlg.success(sys.name)} (민심 ${lvl.moraleEffect >= 0 ? '+' : ''}${lvl.moraleEffect}, 방어 +${lvl.defEffect})`)
      this._markAction()
      return true
    },

    // ── 제안 공작 ─────────────────────────────────────────────────
    launchProposal(targetFaction, propType) {
      const prop = INTEL.PROPOSALS[propType]
      if (!prop) return false
      if (this.pRes.gold < prop.cost) {
        this.addLog(`⚠ [공작] 자금 부족 (필요: ${prop.cost.toLocaleString()})`)
        return false
      }
      this.pRes.gold -= prop.cost
      const dlg  = INTEL.DIALOGS.PROPOSAL
      const tName = (_fkr(this.factions[targetFaction]) ?? targetFaction)

      this.addLog(`[재상] ${dlg.prime_suggest}`)
      this.addLog(`[고문] ${dlg.advisor_reply}`)
      this.addLog(`[황제/의장] ${dlg.emperor_ask(tName)}`)
      this.addLog(`[황제/의장] ${dlg.emperor_reply}`)

      // 성공 판정 (페잔은 우호적, 적국은 낮은 확률)
      const baseRate = targetFaction === 'PZN' ? 0.70 : 0.45
      const success  = Math.random() < baseRate

      if (success) {
        switch (propType) {
          case 'FPA':
            this.addLog(`✅ ${dlg.success(tName)} ← 불가침 체결. ${tName}와의 교전이 중단됩니다.`)
            // 임시 불가침 플래그 (3턴)
            this._truce = this._truce || {}
            this._truce[targetFaction] = this.turn + 3
            break
          case 'TRADE':
            this.addLog(`✅ ${dlg.success(tName)} ← 통상 조약 체결. 수입 10% 증가.`)
            this._tradeBonus = (this._tradeBonus || 0) + 0.10
            break
          case 'SURRENDER':
            // 적국 전 성계 민심 급격 저하
            Object.values(this.systems).forEach(s => {
              if (s.faction === targetFaction) s.morale = Math.max(5, s.morale - 20)
            })
            this.addLog(`✅ ${dlg.success(tName)} ← 항복 권고 성공. ${tName} 민심 급격 저하.`)
            break
          case 'DEFECTION': {
            // 적 이탈 인물 귀순
            const defector = Object.values(this.characters).find(
              c => c.faction === targetFaction && !c.jobs.length
            )
            if (defector) {
              defector.faction = this.playerFaction
              this.addLog(`✅ ${dlg.success(tName)} ← ${defector.name}이 귀순했습니다!`)
            } else {
              this.addLog(`✅ ${dlg.success(tName)} ← 귀순 성공. (귀순 가능 인물 없음)`)
            }
            break
          }
        }
        this._markAction()
        return true
      } else {
        this.addLog(`⚠ ${dlg.fail(tName)}`)
        this._markAction()
        return false
      }
    },

    addSystem(name, x, y) {
      const id = `SYS_${Date.now()}`
      this.systems[id] = {
        id, name, faction: null, type: 'normal',
        x, y, population: 50, industry: 50, defense: 30,
        morale: 70, tax: 30, underConstruction: null,
        isGateway: false, fortress: null,
      }
    },

    removeSystem(id) {
      delete this.systems[id]
    },

    addLog(msg) {
      this.log.unshift({ msg, turn: this.turn, month: this.month })
      if (this.log.length > 300) this.log.pop()
    },

    _income() {
      const BASE_POP_INCOME    = 1
      const CORRIDOR_TAX_RATE  = 0.08   // 페잔 회랑 통행세율
      const PHEZZAN_CODE       = '230042'

      // Pass 1: 세력별 행성 수입 계산 (세율: faction.defaultTax)
      const planetIncome = {}
      Object.keys(this.resources).forEach(f => {
        const tax = (this.factions[f]?.defaultTax ?? 0) / 100
        let inc = 0
        Object.values(this.systems).forEach(sys => {
          if (sys.faction !== f) return
          for (const planet of (sys.planets ?? [])) {
            if (planet.faction !== f) continue
            let multiplier = 1.0
            for (const d of (planet.buildings?.details ?? [])) {
              if (!d.active) continue
              const bonus = BUILDING_MAP[d.b_id]?.effects?.incomeBonus
              if (bonus != null) multiplier += bonus * d.count
            }
            inc += Math.floor((planet.pops?.unit ?? 0) * BASE_POP_INCOME * Math.max(0, multiplier) * tax)
          }
        })
        planetIncome[f] = inc
      })

      // Pass 2: 페잔 회랑 통행세 (페잔 성계가 PZN 소유일 때만)
      let corridorTax = 0
      if (this.systems[PHEZZAN_CODE]?.faction === 'PZN') {
        const corridorBase = (planetIncome['REH'] ?? 0) + (planetIncome['FPA'] ?? 0)
        corridorTax = Math.floor(corridorBase * CORRIDOR_TAX_RATE)
        planetIncome['PZN'] = (planetIncome['PZN'] ?? 0) + corridorTax
      }

      // Pass 3: 수입 적용 + 유지비
      Object.keys(this.resources).forEach(f => {
        let upkeepTotal = 0
        ;(this.fleets[f] || []).forEach(fl => { upkeepTotal += (fl.upkeep || 0) })
        const inc = planetIncome[f] ?? 0
        this.resources[f].gold = Math.max(0, this.resources[f].gold + inc - upkeepTotal)
        if (f === this.playerFaction) {
          if (f === 'PZN' && corridorTax > 0) {
            const base = inc - corridorTax
            this.addLog(`[수입] 행성 +${base} / 회랑세 +${corridorTax} / 유지비 -${upkeepTotal} (잔고 ${this.resources[f].gold})`)
          } else {
            this.addLog(`[수입] +${inc} / 유지비 -${upkeepTotal} (잔고 ${this.resources[f].gold})`)
          }
        }
      })
    },

    _food() {
      const POP_PER_FOOD  = 5    // food 5당 pops ±1

      Object.keys(this.resources).forEach(f => {
        const taxRate = (this.factions[f]?.defaultTax ?? 0) / 100
        let factionFoodGold = 0

        Object.values(this.systems).forEach(sys => {
          if (sys.faction !== f) return

          const planets = (sys.planets ?? []).filter(p => p.faction === f)
          if (!planets.length) return

          // ── 성계 food 생산 합산 ──────────────────────────────────
          let foodTotal = 0
          const planetFood = []   // 행성별 생산량 (분배 계산용)
          for (const planet of planets) {
            const jobMap = {}
            for (const j of (planet.pops?.jobs ?? [])) {
              if (!jobMap[j.b_id]) jobMap[j.b_id] = {}
              jobMap[j.b_id][j.job_code] = (jobMap[j.b_id][j.job_code] ?? 0) + j.unit
            }
            let fp = 0
            for (const d of (planet.buildings?.details ?? [])) {
              if (!d.active) continue
              const bld = BUILDING_MAP[d.b_id]
              if (!bld?.effects?.food) continue
              const reqFarmer = bld.reqPop?.find(r => r.code === 'FARMER')?.unit ?? 0
              const staffed = reqFarmer === 0
                ? d.count
                : Math.min(Math.floor((jobMap[d.b_id]?.['FARMER'] ?? 0) / reqFarmer), d.count)
              fp += bld.effects.food * staffed
            }
            planetFood.push(fp)
            foodTotal += fp
          }

          // ── 세율 로직: food → gold ───────────────────────────────
          const taxedFood  = Math.floor(foodTotal * taxRate)
          const morale     = sys.morale ?? 70
          factionFoodGold += Math.floor(taxedFood * 0.8 * (morale / 100))
          const foodForSys = foodTotal - taxedFood

          // ── 성계 인구 소비 ───────────────────────────────────────
          const sysPops   = planets.reduce((s, p) => s + (p.pops?.unit ?? 0), 0)
          const totalPops = sysPops || 1   // 0 나누기 방지
          const balance   = foodForSys - sysPops

          if (balance >= 0) {
            // ── 흑자: surplus × 0.8 → credit 분배 + 인구 증가 ────
            const creditPool = Math.floor(balance * 0.8)
            const popGain    = Math.floor(balance / POP_PER_FOOD)
            for (let i = 0; i < planets.length; i++) {
              const planet = planets[i]
              const ratio  = (planet.pops?.unit ?? 0) / totalPops
              planet.assets.credit = (planet.assets.credit ?? 0) + Math.floor(creditPool * ratio)
              if (popGain > 0 && planet.pops) {
                planet.pops.unit += Math.floor(popGain * ratio)
              }
            }
          } else {
            // ── 적자: deficit × 1.2 → credit 차감, 부족 시 인구 감소
            const deficit      = -balance
            const purchaseCost = Math.floor(deficit * 1.2)
            let   unpurchased  = deficit   // credit으로 충당 못한 food량

            for (let i = 0; i < planets.length; i++) {
              const planet    = planets[i]
              const ratio     = (planet.pops?.unit ?? 0) / totalPops
              const planetCost = Math.floor(purchaseCost * ratio)
              const creditAvail = planet.assets.credit ?? 0

              if (creditAvail >= planetCost) {
                planet.assets.credit -= planetCost
                unpurchased -= Math.floor(deficit * ratio)
              } else {
                // credit으로 커버 가능한 food량
                const covered = Math.floor(creditAvail / 1.2)
                planet.assets.credit = 0
                unpurchased -= covered
              }
            }

            // credit 미달로 구매 못한 food → 인구 감소
            const popDecay = Math.floor(Math.max(0, unpurchased) / POP_PER_FOOD)
            if (popDecay > 0) {
              for (let i = 0; i < planets.length; i++) {
                const planet = planets[i]
                const ratio  = (planet.pops?.unit ?? 0) / totalPops
                const decay  = Math.floor(popDecay * ratio)
                if (decay > 0 && planet.pops) {
                  planet.pops.unit = Math.max(0, planet.pops.unit - decay)
                  if (f === this.playerFaction)
                    this.addLog(`⚠ [기근] ${planet.name?.find(n => n.code === 'Kr')?.context ?? planet.code} 인구 -${decay}`)
                }
              }
            }
          }
        })

        this.resources[f].gold += factionFoodGold
        if (f === this.playerFaction && factionFoodGold > 0)
          this.addLog(`[식량세] +${factionFoodGold} gold`)
      })
    },

    _supply() {
      Object.entries(this.fleets).forEach(([faction, fleets]) => {
        fleets.forEach(fleet => {
          const isAlly = this.systems[fleet.location]?.faction === faction

          if (fleet.status === 'resupply') {
            fleet.supply = Math.min(100, (fleet.supply ?? 100) + 20)
            if (fleet.supply >= 100) fleet.status = 'standby'
          } else if (isAlly && fleet.status === 'standby') {
            fleet.supply = Math.min(100, (fleet.supply ?? 100) + 10)
          } else if (!isAlly) {
            fleet.supply = Math.max(0, (fleet.supply ?? 100) - 5)
          }

          if (faction === this.playerFaction && (fleet.supply ?? 100) <= 30)
            this.addLog(`⚠ [보급] ${fleet.name} 보급 부족 (${fleet.supply})`)
        })
      })
    },

    // ── 동일 성계 내 적 함대 탐지 (공용) ─────────────────────────
    _enemiesAt(faction, locationId) {
      const enemies = []
      Object.entries(this.fleets).forEach(([ef, eFleets]) => {
        if (ef === faction) return
        eFleets.filter(f => f.location === locationId).forEach(f =>
          enemies.push({ ...f, faction: ef })
        )
      })
      return enemies
    },

    // 전투 컨텍스트용 함대 스냅샷 생성
    _snapFleet(fleet, faction) {
      return {
        id:        fleet.id,
        name:      fleet.name,
        ships:     fleet.ships,
        commander: fleet.commander ?? null,
        faction:   faction ?? fleet.faction,
        formation: fleet.formation ?? null,
        locPos:    fleet.locPos ?? null,
      }
    },

    // ── 시나리오 시작 / 턴 시작 시 이미 조우 중인 함대 감지 ─────
    // _pendingBattles 스키마:
    //   { locationId, attackerFaction, defenderFaction,
    //     attackerFleets: [snap], defenderFleets: [snap],
    //     attackerSupCmd: charCode|null,   // 공격측 총사령관
    //     defenderSupCmd: charCode|null,   // 방어측 총사령관
    //     attackerObjective: string|null,  // 시작 페이즈에서 설정
    //     defenderObjective: string|null,
    //     opType, _handled, _notified }
    _checkInitialEncounters() {
      // 24hr 중단 중인 전투의 위치는 중복 전투 생성 방지
      const pausedLocations = new Set(
        this._pendingBattles.filter(b => b._midBattlePaused).map(b => b.locationId)
      )
      const done = new Set()
      this.pFleets.forEach(fleet => {
        if (pausedLocations.has(fleet.location)) return
        if (done.has(fleet.location)) return
        const enemies = this._enemiesAt(this.playerFaction, fleet.location)
        if (!enemies.length) return
        done.add(fleet.location)

        // 같은 성계의 모든 아군 함대를 참전으로 표시
        const allied = this.pFleets.filter(f => f.location === fleet.location)
        allied.forEach(f => { f.status = 'battle' })

        const sysName  = this.systems[fleet.location]?.name ?? fleet.location
        const atkSnaps = allied.map(f => this._snapFleet(f, this.playerFaction))
        const defSnaps = enemies.map(e => this._snapFleet(e, e.faction))
        this._pendingBattles.push({
          locationId:        fleet.location,
          playerFaction:     this.playerFaction,
          attackerFaction:   this.playerFaction,
          defenderFaction:   enemies[0].faction,
          attackerFleets:    atkSnaps,
          defenderFleets:    defSnaps,
          attackerSupCmd:    resolveSupremeCommander(atkSnaps, this.characters),
          defenderSupCmd:    resolveSupremeCommander(defSnaps, this.characters),
          attackerObjective: null,
          defenderObjective: null,
          opType:            'OCCUPATION',
          hasIntel:          this._hasIntel(fleet.location),
          _handled:          false,
          _notified:         false,
        })
        this.addLog(`⚔ [조우] ${sysName} — 아군 ${allied.length}개 함대 vs 적 ${enemies.length}개 함대`)
      })
      this._pendingBattles.sort((a, b) => a.locationId.localeCompare(b.locationId))
    },

    // 해당 성계에 대한 첩보 유효 여부 (SPY 작전 성공 후 3턴간 유효)
    _hasIntel(systemId) {
      const exp = this._intelMap?.[systemId]
      return exp != null && exp > this.turn
    },

    // 모함대 이동 시 분함대 상태 일괄 동기화
    _syncSubFleets(parentId, faction, updates) {
      const factionFleets = this.fleets[faction] ?? []
      factionFleets
        .filter(f => f.parentFlt === parentId)
        .forEach(f => Object.assign(f, updates))
    },

    _fleetMove() {
      const detected = []
      Object.entries(this.fleets).forEach(([faction, fleets]) => {
        fleets.forEach(fleet => {
          if (fleet.status !== 'moving') return
          fleet.moveTurnsLeft = Math.max(0, (fleet.moveTurnsLeft ?? 0) - 1)
          if (fleet.moveTurnsLeft > 0) return

          // 도착
          fleet.location   = fleet.moveTarget
          fleet.moveTarget = null
          fleet.status     = 'standby'
          const sysName = this.systems[fleet.location]?.name ?? fleet.location
          if (faction === this.playerFaction)
            this.addLog(`[도착] ${fleet.name} → ${sysName}`)

          // 적 함대 감지 → 전투
          const enemies = this._enemiesAt(faction, fleet.location)
          if (enemies.length) {
            fleet.status = 'battle'
            const sysName = this.systems[fleet.location]?.name ?? fleet.location
            // 같은 성계에 이미 생성 중인 전투가 있으면 합류, 없으면 신규 생성
            const existing = detected.find(b => b.locationId === fleet.location)
            if (existing) {
              if (!existing.attackerFleets.find(f => f.id === fleet.id))
                existing.attackerFleets.push(this._snapFleet(fleet, faction))
            } else {
              const defSnaps = enemies.map(e => this._snapFleet(e, e.faction))
              detected.push({
                locationId:        fleet.location,
                playerFaction:     this.playerFaction,
                attackerFaction:   faction,
                defenderFaction:   enemies[0].faction,
                attackerFleets:    [this._snapFleet(fleet, faction)],
                defenderFleets:    defSnaps,
                attackerSupCmd:    null,   // 루프 완료 후 확정
                defenderSupCmd:    resolveSupremeCommander(defSnaps, this.characters),
                attackerObjective: null,
                defenderObjective: null,
                opType:            'OCCUPATION',
                hasIntel:          this._hasIntel(fleet.location),
                _handled:          false,
                _notified:         false,
              })
              if (faction === this.playerFaction)
                this.addLog(`⚔ [전투] ${fleet.name} — ${sysName} 적 함대 조우`)
              else if (enemies.some(e => e.faction === this.playerFaction))
                this.addLog(`⚔ [AI 침공] ${(_fkr(this.factions[faction]) ?? faction)} — ${sysName} 침공!`)
            }
          }
        })
      })
      // 공격측 총사령관 확정 (다중 함대 합류 후)
      detected.forEach(b => {
        b.attackerSupCmd = resolveSupremeCommander(b.attackerFleets, this.characters)
      })
      // 성계 ID 순서대로 전술턴 진행
      detected.sort((a, b) => a.locationId.localeCompare(b.locationId))
      this._pendingBattles.push(...detected)
    },

    _morale() {
      Object.entries(this.fleets).forEach(([faction, fleets]) => {
        fleets.forEach(fleet => {
          const isAlly = this.systems[fleet.location]?.faction === faction
          if (fleet.status === 'standby' && isAlly)
            fleet.moral = Math.min(100, (fleet.moral ?? 100) + 5)
          if (fleet.status === 'damaged')
            fleet.moral = Math.max(0, (fleet.moral ?? 100) - 10)
          if ((fleet.supply ?? 100) < 30)
            fleet.moral = Math.max(0, (fleet.moral ?? 100) - 5)
        })
      })
    },

    _construct() {
      Object.values(this.systems).forEach(s => {
        if (!s.underConstruction) return
        s.underConstruction.turnsLeft--
        if (s.underConstruction.turnsLeft <= 0) {
          const ct = CONSTRUCTION_TYPES[s.underConstruction.type]
          if (ct?.effect) Object.entries(ct.effect).forEach(([k, v]) => { s[k] = Math.min(100, (s[k] || 0) + v) })
          this.addLog(`[완공] ${s.name} ${ct.name}`)
          s.underConstruction = null
        }
      })
    },

    _battle(fleet, target, opType) {
      const op = OPERATION_TYPES[opType]
      if (!op) return
      const char = this.characters[fleet.commander]
      const bonus = char ? (char.statCmd ?? 50) / 100 * 0.3 : 0
      const defMod = (target.defense / 100) * 0.4
      const success = Math.random() < Math.min(0.95, op.successRate + bonus - defMod)

      // 작전 명령 대사
      const opDialogs = {
        SURRENDER_DEMAND: DIALOGS.BATTLE.surrender_cmd,
        PRECISION_BOMB:   DIALOGS.BATTLE.precision_cmd,
        CARPET_BOMB:      DIALOGS.BATTLE.carpet_cmd,
        GROUND_ASSAULT:   DIALOGS.BATTLE.ground_cmd,
        OCCUPATION:       DIALOGS.BATTLE.occupy_cmd,
        AGITATION:        DIALOGS.BATTLE.agitation_cmd,
      }
      const cmdFn = opDialogs[opType]
      if (cmdFn) this.addLog(`[${char?.name || fleet.name}] ${cmdFn(target.name)}`)

      // 요새 방어 반격
      if (target.fortress && FORTRESS_WEAPONS[target.fortress]) {
        const fw = FORTRESS_WEAPONS[target.fortress]
        const fortDmg = Math.floor(fleet.ships * fw.dmgRatio)
        fleet.ships = Math.max(1000, fleet.ships - fortDmg)
        this.addLog(DIALOGS.BATTLE.fortress_hit(fw.weapon, fortDmg.toLocaleString()))
      }

      if (success) {
        const prev = target.faction
        target.faction = this.playerFaction
        target.defense = Math.max(5, target.defense - op.defDmg)
        target.morale  = Math.max(5, target.morale  - op.moraleDmg)
        fleet.status = 'standby'
        fleet.location = target.id
        fleet.target = null
        const okFns = {
          SURRENDER_DEMAND: DIALOGS.BATTLE.surrender_ok,
          PRECISION_BOMB:   DIALOGS.BATTLE.precision_ok,
          CARPET_BOMB:      DIALOGS.BATTLE.precision_ok,
          GROUND_ASSAULT:   DIALOGS.BATTLE.ground_ok,
          OCCUPATION:       DIALOGS.BATTLE.occupy_ok,
          AGITATION:        DIALOGS.BATTLE.agitation_ok,
        }
        const okFn = okFns[opType]
        if (okFn) this.addLog(okFn(target.name))
        this.addLog(`✅ [점령] ${target.name} (${prev || '무소속'} → ${this.playerFaction})`)
      } else {
        const loss = Math.floor(fleet.ships * 0.15)
        fleet.ships = Math.max(1000, fleet.ships - loss)
        fleet.status = 'standby'
        fleet.target = null
        this.addLog(DIALOGS.BATTLE.fail_generic(fleet.name, target.name))
        this.addLog(`⚠ [패배] 손실: ${loss.toLocaleString()}척`)
      }
    },

    _events() {
      if (Math.random() < 0.1) {
        const evs = ['반란군 진압 완료.','첩보 자금 확보.','외교 제안.','군사 침공.','내부 분열 발생.']
        this.addLog(`⚠️ [이벤트] ${evs[Math.floor(Math.random() * evs.length)]}`)
      }
    },

    _ai() {
      Object.keys(this.factions).filter(f => f !== this.playerFaction).forEach(f => {
        // 수입은 _income()에서 전 세력 일괄 처리 — 여기서 중복 계산하지 않음

        ;(this.fleets[f] || []).forEach(fleet => {
          if (fleet.status !== 'standby' || Math.random() > 0.15) return
          const targets = Object.values(this.systems).filter(s => s.faction !== f && s.faction !== 'PZN')
          if (!targets.length) return
          const target = targets[Math.floor(Math.random() * targets.length)]

          // 함대 이동
          fleet.location = target.id

          // 해당 성계의 적 함대 확인
          const enemies = this._enemiesAt(f, target.id)
          if (enemies.length) {
            // 플레이어/동맹 함대와 조우 → 전투 대기열 등록
            fleet.status = 'battle'
            const existing = this._pendingBattles.find(b => b.locationId === target.id && !b._handled)
            if (existing) {
              if (!existing.attackerFleets.find(af => af.id === fleet.id))
                existing.attackerFleets.push(this._snapFleet(fleet, f))
            } else {
              const aiAtkSnaps = [this._snapFleet(fleet, f)]
              const aiDefSnaps = enemies.map(e => this._snapFleet(e, e.faction))
              this._pendingBattles.push({
                locationId:        target.id,
                playerFaction:     this.playerFaction,
                attackerFaction:   f,
                defenderFaction:   enemies[0].faction,
                attackerFleets:    aiAtkSnaps,
                defenderFleets:    aiDefSnaps,
                attackerSupCmd:    resolveSupremeCommander(aiAtkSnaps, this.characters),
                defenderSupCmd:    resolveSupremeCommander(aiDefSnaps, this.characters),
                attackerObjective: null,
                defenderObjective: null,
                opType:            'OCCUPATION',
                hasIntel:          this._hasIntel(target.id),
                _handled:          false,
                _notified:         false,
              })
              if (enemies.some(e => e.faction === this.playerFaction))
                this.addLog(`⚔ [AI 침공] ${(_fkr(this.factions[f]) ?? f)} ${fleet.name} — ${target.name} 침공!`)
            }
          } else {
            // 무방비 성계 → _battle()로 즉시 처리
            this._battle(fleet, target, 'OCCUPATION')
          }
        })
      })
    },

    _victory() {
      const counts = this.sysCounts
      const total = Object.values(this.systems).length
      Object.keys(this.factions).forEach(f => {
        if ((counts[f] || 0) >= Math.ceil(total * 0.7)) {
          this.gameOver = true
          this.winner = f
          this.addLog(`🏆 [승리] ${(_fkr(this.factions[f]) ?? f)} 우주 통일!`)
        }
      })
    },

    // ── 스토리 이벤트 ──────────────────────────────────────────────
    triggerCoup(charId, targetFaction) {
      const c = this.characters[charId]
      if (!c) return
      const from = c.faction
      c.faction = targetFaction
      c.jobs = []
      this.addLog(`🔴 [쿠데타] ${c.name}이(가) ${(_fkr(this.factions[from]) ?? from)}에서 ${(_fkr(this.factions[targetFaction]) ?? targetFaction)}으로 이적.`)
      this.openModal('event', {
        title: '쿠데타',
        portrait: c.portrait || '⚔️',
        speaker: c.name,
        desc: `${c.name}이(가) 수수께끼의 세력과 함께 ${(_fkr(this.factions[targetFaction]) ?? targetFaction)} 측에 합류했습니다.`,
        effect: { morale: -10 },
      })
    },

    triggerDefection(charId, targetFaction) {
      const c = this.characters[charId]
      if (!c) return
      const from = c.faction
      c.faction = targetFaction
      c.jobs = []
      this.addLog(`💫 [이탈] ${c.name}이(가) ${(_fkr(this.factions[targetFaction]) ?? targetFaction)}으로 이탈.`)
      this.openModal('event', {
        title: '이탈',
        portrait: c.portrait || '🌟',
        speaker: c.name,
        desc: `${c.name}이(가) ${(_fkr(this.factions[from]) ?? from)}을 떠나 ${(_fkr(this.factions[targetFaction]) ?? targetFaction)}으로 귀순했습니다.`,
      })
    },

    triggerResignation(charId) {
      const c = this.characters[charId]
      if (!c) return
      const post = c.jobs[0]?.jobCode ?? null
      c.jobs = []
      this.addLog(`📝 [사직] ${c.name}이(가) ${post || '미직위'}에서 사직.`)
      this.openModal('event', {
        title: '사직',
        portrait: c.portrait || '📝',
        speaker: c.name,
        desc: `${c.name}이(가) 직책을 사임했습니다.`,
      })
    },

    triggerDeath(charId) {
      const c = this.characters[charId]
      if (!c) return
      c.charStatus = 'dead'
      c.jobs = []
      this.addLog(`💀 [사망] ${c.name} 사망.`)
      this.openModal('event', {
        title: '사망',
        portrait: c.portrait || '💀',
        speaker: '시스템',
        desc: `${c.name}이(가) 사망했습니다.`,
      })
    },

    holdOp(data)     { this._pendingOp = data },
    clearHeldOp()    { this._pendingOp = null },
    useActionSlot(label, agendaId = null) {
      if (this._pendingBattles.length > 0) return
      if (this._opActionsUsed >= 3) return
      this._actionSlots.push({ label, agendaId })
      this._opActionsUsed++
    },
    cancelActionSlot(idx) {
      const slot = this._actionSlots[idx]
      if (!slot) return
      if (slot.agendaId) this.cancelAgenda(slot.agendaId)
      this._actionSlots.splice(idx, 1)
      this._opActionsUsed = Math.max(0, this._opActionsUsed - 1)
    },

    // ── 의안 등록 ─────────────────────────────────────────────────
    registerAgenda(action, payload = {}, registeredBy = null) {
      const def = AGENDA_ACTIONS[action]
      if (!def) return null
      const seq = String(++this._agendaSeq).padStart(4, '0')
      const id = `AGD_${seq}`
      this.agendas.push({
        id,
        category:       def.category,
        action,
        title:          payload.title || def.label,
        payload,
        registeredBy,
        registeredTurn: this.turn,
        status:         'pending',
      })
      this.addLog(`[의안] ${def.label} 등록`)
      this._markAction()
      return id
    },

    // ── 의안 취소 ─────────────────────────────────────────────────
    cancelAgenda(agendaId) {
      const idx = this.agendas.findIndex(a => a.id === agendaId && a.status === 'pending')
      if (idx === -1) return false
      this.agendas.splice(idx, 1)
      return true
    },

    // ── 의안 처리 (턴 종료 시 호출) ────────────────────────────────
    _processAgendas() {
      const pf = this.playerFaction
      const chain = APPROVAL_CHAINS[pf] || {}
      const categories = Object.keys(chain)

      categories.forEach(cat => {
        const pending = this.agendas.filter(a => a.category === cat && a.status === 'pending')
        if (!pending.length) return

        // 결재권자 탐색: 체인 순서대로 공석 건너뜀
        let approverChar = null
        for (const jobId of (chain[cat] || [])) {
          approverChar = Object.values(this.characters).find(
            c => c.jobs.some(j => j.jobCode === jobId) && c.faction === pf && c.charStatus !== 'dead'
          )
          if (approverChar) break
        }
        if (!approverChar) return

        // 활성 의안 수: politics / 10 (최소 1)
        const activeCount = Math.max(1, Math.floor((approverChar.politics || 50) / 10))

        // 친밀도 기준 정렬 (TODO: 친밀도 시스템 구현 전까지 등록 순서)
        const sorted = [...pending].sort((a, b) => a.registeredTurn - b.registeredTurn)
        const active = sorted.slice(0, activeCount)
        if (!active.length) return

        // 활성 의안 중 1건 처리
        this._executeAgenda(active[0])
      })

      // 만료 처리
      this.agendas.forEach(a => {
        if (a.status === 'pending' && (this.turn - a.registeredTurn) >= AGENDA_EXPIRE_TURNS) {
          a.status = 'expired'
          this.addLog(`[의안 만료] ${a.title}`)
        }
      })

      // 처리 완료/만료 의안 정리 (최근 30건까지 보관)
      const done = this.agendas.filter(a => a.status !== 'pending')
      const keep = done.slice(0, 30)
      this.agendas = [...this.agendas.filter(a => a.status === 'pending'), ...keep]
    },

    // ── 의안 실행 ─────────────────────────────────────────────────
    _executeAgenda(agenda) {
      agenda.status = 'approved'
      const { action, payload } = agenda

      if (action === 'fleet_deploy') {
        this.deployFleet(payload.fleetId, payload.targetStar, payload.opType)
      } else if (action === 'fleet_transport') {
        this.transportResources(payload.fromStar, payload.toStar, payload.itemType, payload.amount)
      } else if (action === 'fleet_reorganize') {
        this.reorganizeFleet(payload.fleetId, payload.newShips)
      } else if (action === 'fleet_disband') {
        this.disbandFleet(payload.fleetId)
      } else if (action === 'budget_alloc') {
        this.allocateBudget(payload.allocations)
      } else if (action === 'appoint') {
        this.assignChar(payload.charId, payload.jobId)
      } else if (action === 'dismiss') {
        const c = this.characters[payload.charId]
        if (c) { c.jobs = []; this.addLog(`[인사] ${c.name} 해임`) }
      } else if (action === 'intel_spy' || action === 'intel_counter' || action === 'intel_special') {
        this.launchIntelOp(payload.targetStar, payload.opType, payload.officerId)
      }
      // TODO: planet_develop, ship_design, ship_build, research_* 구현 예정

      this.addLog(`[결재] ${agenda.title} 처리 완료`)
    },
  },
})
