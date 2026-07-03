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
import { buildCharactersMap }  from '@/utils/charUtils'
import { buildFleetsMap }      from '@/utils/fleetUtils'
import { buildFactionsMap }    from '@/utils/factionUtils'

const _GLOB_STAR_DETAIL   = import.meta.glob('/src/data/scenario/*/*/*/stars/starDetail.js')
const _GLOB_PLANET_DETAIL = import.meta.glob('/src/data/scenario/*/*/*/stars/planetDetail.js')
const _GLOB_CHAR_JOBS     = import.meta.glob('/src/data/scenario/*/*/*/characters/charactersJobs.js')
const _GLOB_FLEET_DATA    = import.meta.glob('/src/data/scenario/*/*/*/fleet/fleetData.js')
const _GLOB_FLEET_TRAIT   = import.meta.glob('/src/data/scenario/*/*/*/fleet/fleetTraitData.js')
const _GLOB_CHAR_LIST     = import.meta.glob('/src/data/scenario/*/*/*/characters/charactersData.js')
const _GLOB_CLIQUE_DATA   = import.meta.glob('/src/data/scenario/*/*/*/cliqueData.js')

async function _loadScenarioFiles(scId) {
  const [y, m, s] = scId.split('_')
  const base = `/src/data/scenario/${y}/${m}/${s}`
  const load = (glob, suf) => (glob[`${base}/${suf}`] ?? (() => Promise.resolve(null)))()
  const [sd, pd, cj, cl, cld, fd, ftd] = await Promise.all([
    load(_GLOB_STAR_DETAIL,   'stars/starDetail.js'),
    load(_GLOB_PLANET_DETAIL, 'stars/planetDetail.js'),
    load(_GLOB_CHAR_JOBS,     'characters/charactersJobs.js'),
    load(_GLOB_CHAR_LIST,     'characters/charactersData.js'),
    load(_GLOB_CLIQUE_DATA,   'cliqueData.js'),
    load(_GLOB_FLEET_DATA,    'fleet/fleetData.js'),
    load(_GLOB_FLEET_TRAIT,   'fleet/fleetTraitData.js'),
  ])
  return {
    starDetail:    sd?.STAR_DETAIL             ?? [],
    planetDetail:  pd?.PLANET_DETAIL           ?? [],
    charJobs:      cj?.CHAR_JOBS               ?? null,
    charList:      cl?.CHAR_LIST               ?? null,
    cliqueData:    cld?.CLIQUE_DATA            ?? [],
    fleetData:     fd?.FLEET_DATA              ?? [],
    fleetTraitData:ftd?.FLEET_TRAIT_DATA       ?? [],
  }
}

function buildState(scId, pf, extraData = {}) {
  const sc = SCENARIOS.find(s => s.id === scId) || SCENARIOS[0]
  const {
    starDetail = [], planetDetail = [],
    charJobs = null, charList = null, cliqueData = [],
    fleetData = [],
  } = extraData

  const factions   = buildFactionsMap(sc.factions ?? ['REH', 'FPA', 'PZN'])
  const systems    = buildSystemsMap(starDetail, planetDetail)
  const characters = buildCharactersMap({ charList, scenarioCharJobs: charJobs, fleetData, cliqueData })
  const fleets     = buildFleetsMap(fleetData)

  const resources = {}
  for (const [id, f] of Object.entries(factions)) {
    resources[id] = { gold: f.gold }
  }

  return {
    sc, playerFaction: pf,
    year: sc.year, impYear: sc.year - 309, month: sc.month ?? 1, day: sc.date ?? 1, turn: 1,
    factions, systems, resources, characters, fleets,
    log: [], selectedSystem: null, selectedFleet: null,
    _levyCooldown: 0, _loanBalance: 0, _loanDueTurn: null, _fleetSeq: 10, _truce: {}, _tradeBonus: 0,
    _reserve: 0, _intelligenceFund: 0, _budgetAllocation: null,
    _pendingBattles: [],
    _turnActionTaken: false,
    activeModal: null, gameOver: false, winner: null,
    agendas: [], _agendaSeq: 0,
    playerCharCode: null,
    _pendingOp: null,
    _opActionsUsed: 0,
    _actionSlots: [],
  }
}

export const useGameStore = defineStore('game', {
  state: () => ({ initialized: false, _preloadedScId: null, _preloadedData: null, lanes: LANES, obstacles: OBSTACLES, ...buildState(0, 'REH') }),

  getters: {
    pRes:      s => s.resources[s.playerFaction],
    pFleets:   s => s.fleets[s.playerFaction] || [],
    pChars:    s => Object.values(s.characters).filter(c => c.faction === s.playerFaction),
    sysCounts: s => {
      const c = { REH: 0, FPA: 0, PZN: 0 }
      Object.values(s.systems).forEach(x => { if (x.faction) c[x.faction] = (c[x.faction] || 0) + 1 })
      return c
    },
    dateStr:   s => `우주력 ${s.year}년 ${s.month}월 / 제국력 ${s.impYear}년`,
    pFaction:  s => s.factions[s.playerFaction] ?? null,
    fColors:   s => Object.fromEntries(Object.values(s.factions).map(f => [f.id, f.color])),
    allFleets: s => {
      const r = []
      Object.entries(s.fleets).forEach(([faction, fl]) => {
        fl.forEach(f => {
          const sys = s.systems[f.location]
          if (sys) r.push({ ...f, faction, sx: sys.x, sy: sys.y })
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
      const data = await _loadScenarioFiles(scId)
      this._preloadedScId  = scId
      this._preloadedData  = data
    },

    async startGame(scId, pf, charCode = null) {
      const extraData = this._preloadedScId === scId && this._preloadedData
        ? this._preloadedData
        : await _loadScenarioFiles(scId)
      const fresh = buildState(scId, pf, extraData)
      Object.assign(this.$state, { initialized: true, ...fresh })
      if (charCode) this.playerCharCode = charCode
      this.addLog(`[${this.factions[pf]?.nameKr ?? pf}] ${fresh.sc.nameKr} 시작.`)
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
      this._supply()
      this._fleetMove()
      this._morale()
      this._construct()
      this._events()
      this._ai()
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
    },

    selectSystem(id)  { this.selectedSystem = id;    this.selectedFleet = null },
    selectFleet(id)   { this.selectedFleet = id;     this.selectedSystem = null },
    openModal(n, p=null) { this.activeModal = { name: n, payload: p } },
    closeModal()      { this.activeModal = null },
    _markAction()     { this._turnActionTaken = true },

    changeTax(sysId, rate) {
      const s = this.systems[sysId]
      if (!s || s.faction !== this.playerFaction) return
      const old = s.tax
      s.tax = Math.max(10, Math.min(80, rate))
      s.morale = Math.max(5, Math.min(100, s.morale - Math.floor((s.tax - old) * 0.5)))
      this.addLog(`[${s.name}] 세율 ${old}% → ${s.tax}%`)
      this._markAction()
    },

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

    deployFleet(fleetId, targetId, opType) {
      const fleet  = this.pFleets.find(f => f.id === fleetId)
      const target = this.systems[targetId]
      if (!fleet || !target || fleet.status !== 'standby') return false

      // 같은 성계: 기존 즉시 처리 유지
      if (fleet.location === targetId) {
        this._battle(fleet, target, opType)
        this._markAction()
        return true
      }

      // 다른 성계: 이동 명령
      fleet.status        = 'moving'
      fleet.moveTarget    = targetId
      fleet.moveTurnsLeft = 2        // TODO: LANES 거리 기반으로 교체
      fleet.target        = targetId
      this.addLog(`[이동] ${fleet.name} → ${target.name} (${fleet.moveTurnsLeft}턴)`)
      this._markAction()
      return true
    },

    applyBattleResult(result) {
      const ctx = this._pendingBattles[0]
      if (!ctx) return

      const attackerFleet = this.pFleets.find(f => f.id === ctx.attackerFleet.id)

      if (result.winner === this.playerFaction) {
        // 아군 승리
        if (attackerFleet) {
          attackerFleet.ships    = Math.max(1000, ctx.attackerFleet.ships - result.attackerLosses)
          attackerFleet.status   = 'standby'
          attackerFleet.target   = null
          attackerFleet.location = ctx.targetSystemId
        }

        // 적 함대에 패배 분배 (각 함대에 균등 분배)
        const perFleet = Math.floor(result.defenderLosses / Math.max(1, ctx.defenderFleets.length))
        ctx.defenderFleets.forEach(df => {
          const factionFleets = this.fleets[df.faction]
          if (!factionFleets) return
          const idx = factionFleets.findIndex(f => f.id === df.id)
          if (idx === -1) return
          const remaining = df.ships - perFleet
          if (remaining <= 1000) {
            this.addLog(`🗡️ [격멸] ${df.name} 전투에서 격멸 → 해산`)
            factionFleets.splice(idx, 1)
          } else {
            factionFleets[idx].ships = remaining
            const friendly = Object.values(this.systems).find(s => s.faction === df.faction)
            if (friendly) factionFleets[idx].location = friendly.id
          }
        })

        // 성계 점령 효과
        const target = this.systems[ctx.targetSystemId]
        const op     = OPERATION_TYPES[ctx.opType]
        if (target && op) {
          const prev = target.faction
          target.faction  = this.playerFaction
          target.defense  = Math.max(5, target.defense  - (op.defDmg   || 0))
          target.morale   = Math.max(5, target.morale   - (op.moraleDmg || 0))
          this.addLog(`✅ [점령] ${target.name} 점령 완료 (${prev || '무소속'} → ${this.playerFaction})`)
        }
        this._victory()

      } else {
        // 아군 패배
        if (attackerFleet) {
          attackerFleet.ships  = Math.max(1000, ctx.attackerFleet.ships - result.attackerLosses)
          attackerFleet.status = 'standby'
          attackerFleet.target = null
          const friendly = Object.values(this.systems).find(s => s.faction === this.playerFaction)
          if (friendly) attackerFleet.location = friendly.id
        }
        this.addLog(`⚠ [패배] 아군함대 패배, ${ctx.attackerFleet.name} 철수`)
      }

      this._pendingBattles.shift()
    },

    // ── 교전 자동 처리 (상세 전투를 보지 않고 결과만 산출) ─────────
    autoResolveBattle() {
      const ctx = this._pendingBattles[0]
      if (!ctx) return null

      const atkShips = ctx.attackerFleet.ships
      const defShips = ctx.defenderFleets.reduce((sum, f) => sum + f.ships, 0)
      const atkChar  = this.characters[ctx.attackerFleet.commander]
      const atkBonus = atkChar ? 0.7 + (atkChar.military || 50) / 100 * 0.6 : 1.0

      const atkPower = atkShips * atkBonus * (0.85 + Math.random() * 0.3)
      const defPower = defShips * (0.85 + Math.random() * 0.3)
      const attackerWins = atkPower >= defPower

      const winnerLossRate = 0.05 + Math.random() * 0.10
      const loserLossRate  = 0.30 + Math.random() * 0.25
      const attackerLosses = Math.floor(atkShips * (attackerWins ? winnerLossRate : loserLossRate))
      const defenderLosses = Math.floor(defShips * (attackerWins ? loserLossRate : winnerLossRate))
      const winner = attackerWins ? ctx.attackerFaction : (ctx.defenderFleets[0]?.faction ?? null)

      const result = { winner, attackerLosses, defenderLosses }
      const sysName = this.systems[ctx.targetSystemId]?.name ?? ctx.targetSystemId
      this.addLog(`⚔ [자동 처리] ${sysName} 전투 결과: ${attackerWins ? '아군 승리' : '아군 패배'} (아군 손실 ${attackerLosses.toLocaleString()}척, 적 손실 ${defenderLosses.toLocaleString()}척)`)
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
          monthlyIncome += Math.floor(s.population * (s.tax / 100) * (s.industry / 100) * 10)
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
      this.addLog(`🚀 [이동] ${fleet.name}: ${from} → ${target.name}`)
      this._markAction()
      return true
    },

    // ── 함대 철수 (출격 중 또는 적 성계에서 철수) ─────────────────
    retreatFleet(fleetId) {
      const fleet = this.pFleets.find(f => f.id === fleetId)
      if (!fleet) return false

      // 가장 가까운 아군 성계로 철수
      const homeSystems = Object.values(this.systems)
        .filter(s => s.faction === this.playerFaction)
      if (!homeSystems.length) return false

      const dest = homeSystems[0]
      fleet.status = 'standby'
      fleet.target = null
      fleet.location = dest.id
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
            this.addLog(`🔍 [정찰] ${sys.name}: 방어 ${sys.defense}% / 산업 ${sys.industry}% / 민심 ${sys.morale}%`)
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
      const tName = this.factions[targetFaction]?.nameKr ?? targetFaction

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
      Object.keys(this.resources).forEach(f => {
        let inc = 0
        Object.values(this.systems).forEach(s => {
          if (s.faction === f) inc += Math.floor(s.population * (s.tax / 100) * (s.industry / 100) * 10)
        })
        let upkeepTotal = 0
        ;(this.fleets[f] || []).forEach(fl => { upkeepTotal += (fl.upkeep || 0) })
        this.resources[f].gold = Math.max(0, this.resources[f].gold + inc - upkeepTotal)
        if (f === this.playerFaction) this.addLog(`[수입] +${inc} / 유지비 -${upkeepTotal} (잔고 ${this.resources[f].gold})`)
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
          const enemies = []
          Object.entries(this.fleets).forEach(([ef, eFleets]) => {
            if (ef === faction) return
            eFleets.filter(f => f.location === fleet.location).forEach(f =>
              enemies.push({ ...f, faction: ef })
            )
          })
          if (enemies.length) {
            fleet.status = 'battle'
            detected.push({
              attackerFleet:   { ...fleet, faction },
              attackerFaction: faction,
              defenderFleets:  enemies,
              targetSystemId:  fleet.location,
              opType:          'OCCUPATION',
            })
            if (faction === this.playerFaction)
              this.addLog(`⚔ [전투] ${fleet.name} — 적 함대 감지`)
          }
        })
      })
      // 성계 ID 순서대로 전술턴 진행
      detected.sort((a, b) => a.targetSystemId.localeCompare(b.targetSystemId))
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
      const bonus = char ? (char.military / 100) * 0.3 : 0
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
        let inc = 0
        Object.values(this.systems).forEach(s => {
          if (s.faction === f) inc += Math.floor(s.population * 0.3 * (s.industry / 100) * 10)
        })
        this.resources[f].gold += inc
        ;(this.fleets[f] || []).forEach(fleet => {
          if (fleet.status !== 'standby' || Math.random() > 0.12) return
          const targets = Object.values(this.systems).filter(s => s.faction !== f && s.faction !== 'PZN')
          if (!targets.length) return
          const t = targets[Math.floor(Math.random() * targets.length)]
          if (Math.random() < 0.5) {
            const prev = t.faction
            t.faction = f
            this.addLog(`⚔️ [AI] ${this.factions[f]?.nameKr ?? f} ${fleet.name}이 ${t.name} 공략! (${prev || '무소속'} → ${f})`)
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
          this.addLog(`🏆 [승리] ${this.factions[f]?.nameKr ?? f} 우주 통일!`)
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
      this.addLog(`🔴 [쿠데타] ${c.name}이(가) ${this.factions[from]?.nameKr ?? from}에서 ${this.factions[targetFaction]?.nameKr ?? targetFaction}으로 이적.`)
      this.openModal('event', {
        title: '쿠데타',
        portrait: c.portrait || '⚔️',
        speaker: c.name,
        desc: `${c.name}이(가) 수수께끼의 세력과 함께 ${this.factions[targetFaction]?.nameKr ?? targetFaction} 측에 합류했습니다.`,
        effect: { morale: -10 },
      })
    },

    triggerDefection(charId, targetFaction) {
      const c = this.characters[charId]
      if (!c) return
      const from = c.faction
      c.faction = targetFaction
      c.jobs = []
      this.addLog(`💫 [이탈] ${c.name}이(가) ${this.factions[targetFaction]?.nameKr ?? targetFaction}으로 이탈.`)
      this.openModal('event', {
        title: '이탈',
        portrait: c.portrait || '🌟',
        speaker: c.name,
        desc: `${c.name}이(가) ${this.factions[from]?.nameKr ?? from}을 떠나 ${this.factions[targetFaction]?.nameKr ?? targetFaction}으로 귀순했습니다.`,
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
      c.isDead = true
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
            c => c.jobs.some(j => j.jobCode === jobId) && c.faction === pf && !c.isDead
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
