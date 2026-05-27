import { defineStore } from 'pinia'
import {
  FACTIONS, CHARACTERS, SCENARIOS,
  OPERATION_TYPES, CONSTRUCTION_TYPES, FORTRESS_WEAPONS, DIALOGS
} from '@/data/masterData'
import { STAR_SYSTEMS } from '@/data/stars/starSystemData'
import { STAR_DETAIL }  from '@/data/scenarios/S01/starDetail'

const _DETAIL_MAP = Object.fromEntries(STAR_DETAIL.map(d => [d.code, d]))

const _DEFAULTS = {
  capital:   { population: 200, industry: 90, defense: 80 },
  fortress:  { population: 30,  industry: 60, defense: 95 },
  frontier:  { population: 40,  industry: 40, defense: 55 },
  contested: { population: 10,  industry: 20, defense: 25 },
  noble:     { population: 70,  industry: 55, defense: 50 },
  normal:    { population: 60,  industry: 50, defense: 45 },
  neutral:   { population: 50,  industry: 40, defense: 40 },
}

function buildState(scId, pf) {
  const sc = SCENARIOS[scId] || SCENARIOS[0]
  const systems = {}
  STAR_SYSTEMS.forEach(s => {
    const d = _DETAIL_MAP[s.code] || {}
    systems[s.code] = {
      id:               s.code,
      code:             s.code,
      name:             s.nameKr,
      nameEn:           s.nameEn,
      type:             s.type,
      x:                s.x,
      y:                s.y,
      desc:             s.desc,
      faction:          d.faction ?? null,
      morale:           d.morale  ?? 60,
      tax:              d.tax     ?? 0,
      traits:           d.traits  ?? [],
      underConstruction: null,
      ...(_DEFAULTS[s.type] ?? _DEFAULTS.normal),
    }
  })
  const resources = {
    REH:   { gold: 5000 },
    FPA: { gold: 4500 },
    PZN:  { gold: 8000 },
  }
  const characters = {}
  Object.values(CHARACTERS).forEach(c => {
    characters[c.id] = { ...c, currentPost: null }
  })
  const fleets = {
    REH: [
      { id:'E_1ST',  name:'제1함대',      commander:'MITTERMEYER', ships:15000, maxShips:15000, location:'230058', status:'standby', target:null, upkeep:30 },
      { id:'E_2ND',  name:'제2함대',      commander:'REUENTHAL',   ships:15000, maxShips:15000, location:'230058', status:'standby', target:null, upkeep:30 },
      { id:'E_3RD',  name:'흑색창기함대', commander:'BITTENFELD',  ships:13000, maxShips:13000, location:'230002', status:'standby', target:null, upkeep:26 },
    ],
    FPA: [
      { id:'A_1ST',  name:'제1함대',  commander:'YANG',         ships:15000, maxShips:15000, location:'230006', status:'standby', target:null, upkeep:30 },
      { id:'A_13TH', name:'제13함대', commander:'ATTENBOROUGH', ships:12000, maxShips:12000, location:'230055', status:'standby', target:null, upkeep:24 },
    ],
    PZN: [],
  }
  return {
    sc, playerFaction: pf,
    year: sc.year, impYear: sc.impYear, month: 1, turn: 1,
    systems, resources, characters, fleets,
    log: [], selectedSystem: null, selectedFleet: null,
    _levyCooldown: 0, _loanBalance: 0, _loanDueTurn: null, _fleetSeq: 10, _truce: {}, _tradeBonus: 0,
    _reserve: 0, _intelligenceFund: 0, _budgetAllocation: null,
    _pendingBattle: null,
    activeModal: null, gameOver: false, winner: null,
  }
}

export const useGameStore = defineStore('game', {
  state: () => ({ initialized: false, ...buildState(0, 'REH') }),

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
    pFaction:  s => FACTIONS[s.playerFaction],
    fColors:   () => { const m = {}; Object.values(FACTIONS).forEach(f => { m[f.id] = f.color }); return m },
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
    startGame(scId, pf) {
      const fresh = buildState(scId, pf)
      Object.assign(this.$state, { initialized: true, ...fresh })
      this.addLog(`[${FACTIONS[pf].name}] ${SCENARIOS[scId].name} 시작.`)
    },

    endTurn() {
      // 임시 징수 쿨다운
      if (this._levyCooldown > 0) this._levyCooldown--
      // 차관 만기 경고
      if (this._loanBalance > 0) {
        const remaining = this._loanDueTurn - this.turn
        if (remaining === 1) this.addLog(`⚠️ [페잔] 다음 턴이 차관 상환 기일입니다. (${this._loanBalance.toLocaleString()} 마크)`)
        if (remaining <= 0) {
          // 상환 불능 처리
          Object.values(this.systems).forEach(s => { if (s.faction === this.playerFaction) s.morale = Math.max(5, s.morale - 15) })
          this.addLog(`❌ [페잔] 상환 불능 상태입니다. 페잔은 이에 상응하는 조치를 취하겠습니다.`)
          this.resources['PZN'].gold += Math.floor(this._loanBalance * 0.5)
          this._loanBalance = 0; this._loanDueTurn = null
        }
      }
      this._income()
      this._construct()
      this._events()
      this._ai()
      this.month++
      if (this.month > 12) { this.month = 1; this.year++; this.impYear++ }
      this.turn++
      this._victory()
      this.addLog(`──── ${this.year}년 ${this.month}월 (턴 ${this.turn}) ────`)
    },

    selectSystem(id)  { this.selectedSystem = id;    this.selectedFleet = null },
    selectFleet(id)   { this.selectedFleet = id;     this.selectedSystem = null },
    openModal(n, p=null) { this.activeModal = { name: n, payload: p } },
    closeModal()      { this.activeModal = null },

    changeTax(sysId, rate) {
      const s = this.systems[sysId]
      if (!s || s.faction !== this.playerFaction) return
      const old = s.tax
      s.tax = Math.max(10, Math.min(80, rate))
      s.morale = Math.max(5, Math.min(100, s.morale - Math.floor((s.tax - old) * 0.5)))
      this.addLog(`[${s.name}] 세율 ${old}% → ${s.tax}%`)
    },

    buildConstruction(sysId, type) {
      const s = this.systems[sysId]
      const ct = CONSTRUCTION_TYPES[type]
      if (!s || s.faction !== this.playerFaction || this.pRes.gold < ct.cost || s.underConstruction) return false
      this.pRes.gold -= ct.cost
      s.underConstruction = { type, turnsLeft: ct.turns }
      this.addLog(`[${s.name}] ${ct.name} 건설 시작 (${ct.turns}턴)`)
      return true
    },

    deployFleet(fleetId, targetId, opType) {
      const fleet = this.pFleets.find(f => f.id === fleetId)
      const target = this.systems[targetId]
      if (!fleet || !target || fleet.status !== 'standby') return false

      // 해당 성계에 주둔 중인 적 함대 수집
      const defenderFleets = []
      Object.entries(this.fleets).forEach(([faction, fleets]) => {
        if (faction !== this.playerFaction) {
          fleets.filter(f => f.location === targetId).forEach(f => {
            defenderFleets.push({ ...f, faction })
          })
        }
      })

      fleet.status = 'deployed'
      fleet.target = targetId

      if (defenderFleets.length > 0) {
        // 전술전투 트리거
        this._pendingBattle = {
          attackerFleet:   { ...fleet, faction: this.playerFaction },
          attackerFaction: this.playerFaction,
          defenderFleets,
          targetSystemId:  targetId,
          opType,
        }
        this.addLog(`[출격] ${fleet.name} → ${target.name} — 적 함대 발견, 전술전투 개시!`)
        return 'tactical'
      }

      // 방어 함대 없음 → 즉시 해결
      this.addLog(`[출격] ${fleet.name} → ${target.name} (${OPERATION_TYPES[opType]?.name})`)
      this._battle(fleet, target, opType)
      return true
    },

    applyBattleResult(result) {
      const ctx = this._pendingBattle
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

        // 적 함대 피해 적용 (각 함대에 균등 분배)
        const perFleet = Math.floor(result.defenderLosses / Math.max(1, ctx.defenderFleets.length))
        ctx.defenderFleets.forEach(df => {
          const factionFleets = this.fleets[df.faction]
          if (!factionFleets) return
          const idx = factionFleets.findIndex(f => f.id === df.id)
          if (idx === -1) return
          const remaining = df.ships - perFleet
          if (remaining <= 1000) {
            this.addLog(`💥 [격파] ${df.name} 전술전투 패배로 격파`)
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
          this.addLog(`✅ [점령] ${target.name} 전술전투 승리 (${prev || '중립'} → ${this.playerFaction})`)
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
        this.addLog(`❌ [패배] 전술전투 패배, ${ctx.attackerFleet.name} 철수`)
      }

      this._pendingBattle = null
    },

    assignChar(charId, post) {
      const c = this.characters[charId]
      if (!c || c.faction !== this.playerFaction) return
      c.currentPost = post
      const dialog = this.playerFaction === 'REH' ? DIALOGS.APPOINTMENT.emperor : ''
      if (dialog) this.addLog(`[황제] ${dialog}`)
      this.addLog(`[임명] ${c.name} → ${post}`)
    },


    // ── 임시 징수 ─────────────────────────────────────────
    emergencyLevy() {
      const res = this.pRes
      const { FINANCE } = require('@/data/masterData')
      const terms = FINANCE.LEVY_TERMS

      if (this._levyCooldown > 0) {
        this.addLog(`❌ [임시 징수] 재사용 대기 중 (${this._levyCooldown}턴 남음)`)
        return false
      }

      // 현재 월 수입 계산
      let monthlyIncome = 0
      Object.values(this.systems).forEach(s => {
        if (s.faction === this.playerFaction)
          monthlyIncome += Math.floor(s.population * (s.tax / 100) * (s.industry / 100) * 10)
      })

      const amount = Math.floor(monthlyIncome * terms.RATE)
      res.gold += amount
      this._levyCooldown = terms.COOLDOWN_TURNS

      // 전 성계 민심 하락
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
      return true
    },

    // ── 페잔 차관 ─────────────────────────────────────────
    takeLoan(amount) {
      const { FINANCE } = require('@/data/masterData')
      const terms = FINANCE.LOAN_TERMS

      if (amount < terms.MIN_AMOUNT || amount > terms.MAX_AMOUNT) {
        this.addLog(`❌ [차관] 금액은 ${terms.MIN_AMOUNT}~${terms.MAX_AMOUNT} 마크 사이여야 합니다.`)
        return false
      }
      if (this._loanBalance > 0) {
        this.addLog(`❌ [차관] 기존 차관(${this._loanBalance.toLocaleString()} 마크)을 먼저 상환하세요.`)
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
      this.addLog(`📋 [차관] ${amount.toLocaleString()} 마크 수령. 상환액: ${totalRepay.toLocaleString()} 마크 (${terms.REPAY_TURNS}턴 내)`)
      return true
    },

    // ── 차관 상환 ─────────────────────────────────────────
    repayLoan() {
      const { FINANCE } = require('@/data/masterData')
      if (this._loanBalance <= 0) {
        this.addLog('❌ [상환] 상환할 차관이 없습니다.')
        return false
      }
      if (this.pRes.gold < this._loanBalance) {
        this.addLog(`❌ [상환] 자금이 부족합니다. (필요: ${this._loanBalance.toLocaleString()}, 보유: ${this.pRes.gold.toLocaleString()})`)
        return false
      }
      this.pRes.gold -= this._loanBalance
      const paid = this._loanBalance
      this._loanBalance = 0
      this._loanDueTurn = null
      this.addLog(`[페잔] ${FINANCE.DIALOGS.LOAN.repay_confirm}`)
      this.addLog(`✅ [상환] ${paid.toLocaleString()} 마크 상환 완료.`)
      return true
    },

    // ── 예산 배분 ─────────────────────────────────────────
    allocateBudget(allocations) {
      // allocations: { MILITARY: n, CONSTRUCTION: n, INTELLIGENCE: n, WELFARE: n, RESERVE: n }
      const { FINANCE } = require('@/data/masterData')
      const total = Object.values(allocations).reduce((s, v) => s + v, 0)
      if (total > this.pRes.gold) {
        this.addLog(`❌ [예산] 배분 총액(${total.toLocaleString()})이 보유 자금(${this.pRes.gold.toLocaleString()})을 초과합니다.`)
        return false
      }

      // 각 항목 효과 적용
      Object.entries(allocations).forEach(([key, amount]) => {
        if (amount <= 0) return
        switch(key) {
          case 'MILITARY':
            // 함대 전력 소폭 회복
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
      return true
    },


    // ── 함대 편성 (신규 생성) ────────────────────────────
    formFleet(name, commanderId, sizeKey, locationId) {
      const { MILITARY } = require('@/data/masterData')
      const size = MILITARY.FLEET_SIZES[sizeKey]
      if (!size) return false
      if (this.pRes.gold < size.cost) {
        this.addLog(`❌ [편성] 자금 부족 (필요: ${size.cost.toLocaleString()})`)
        return false
      }
      const sys = this.systems[locationId]
      if (!sys || sys.faction !== this.playerFaction) {
        this.addLog('❌ [편성] 아군 성계에서만 편성 가능합니다.')
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
      this.addLog(`[명령] ${decree}`)
      this.addLog(`✅ ${dlg.success(name, size.ships)}`)
      return true
    },

    // ── 함대 재편성 (규모 변경) ──────────────────────────
    reorganizeFleet(fleetId, newShips) {
      const { MILITARY } = require('@/data/masterData')
      const fleet = this.pFleets.find(f => f.id === fleetId)
      if (!fleet || fleet.status !== 'standby') {
        this.addLog('❌ [재편성] 대기 중인 함대만 재편성 가능합니다.')
        return false
      }
      const diff = newShips - fleet.ships
      const cost = Math.abs(Math.floor(diff * 0.02))
      if (diff > 0 && this.pRes.gold < cost) {
        this.addLog(`❌ [재편성] 자금 부족 (필요: ${cost.toLocaleString()})`)
        return false
      }
      const before = fleet.ships
      fleet.ships = Math.max(1000, newShips)
      fleet.maxShips = fleet.ships
      fleet.upkeep = Math.floor(fleet.ships / 500)
      if (diff > 0) this.pRes.gold -= cost
      this.addLog(`✅ ${MILITARY.DIALOGS.REORGANIZE.success(fleet.name, before, fleet.ships)}`)
      return true
    },

    // ── 함대 해산 ────────────────────────────────────────
    disbandFleet(fleetId) {
      const { MILITARY } = require('@/data/masterData')
      const idx = this.fleets[this.playerFaction].findIndex(f => f.id === fleetId)
      if (idx === -1) return false
      const fleet = this.fleets[this.playerFaction][idx]
      if (fleet.status === 'deployed') {
        this.addLog('❌ [해산] 출격 중인 함대는 해산할 수 없습니다.')
        return false
      }
      // 함선 절반 가치 환급
      const refund = Math.floor(fleet.ships * 0.01)
      this.pRes.gold += refund
      this.fleets[this.playerFaction].splice(idx, 1)
      this.addLog(MILITARY.DIALOGS.FORMATION.disband(fleet.name))
      this.addLog(`💰 함선 환급: ${refund.toLocaleString()} 마크`)
      return true
    },

    // ── 함대 이동 (성계 간 수송/이동) ───────────────────
    moveFleet(fleetId, targetSystemId) {
      const fleet = this.pFleets.find(f => f.id === fleetId)
      const target = this.systems[targetSystemId]
      if (!fleet || !target) return false
      if (fleet.status !== 'standby') {
        this.addLog('❌ [이동] 대기 중인 함대만 이동 가능합니다.')
        return false
      }
      if (target.faction !== this.playerFaction) {
        this.addLog('❌ [이동] 아군 성계로만 이동 가능합니다. (공격은 출격 명령을 사용하세요)')
        return false
      }
      const from = this.systems[fleet.location]?.name || fleet.location
      fleet.location = targetSystemId
      this.addLog(`🚀 [이동] ${fleet.name}: ${from} → ${target.name}`)
      return true
    },

    // ── 함대 철수 (전투 중 → 인접 아군 성계) ────────────
    retreatFleet(fleetId) {
      const { MILITARY } = require('@/data/masterData')
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

      this.addLog(`[명령] ${MILITARY.DIALOGS.RETREAT.order(fleet.name)}`)
      this.addLog(`✅ ${MILITARY.DIALOGS.RETREAT.complete(fleet.name, dest.name)} (손실: ${loss.toLocaleString()}척)`)
      return true
    },

    // ── 자원 수송 (성계 → 성계) ─────────────────────────
    transportResources(fromSystemId, toSystemId, itemType, amount) {
      const { MILITARY } = require('@/data/masterData')
      const from = this.systems[fromSystemId]
      const to   = this.systems[toSystemId]
      if (!from || !to) return false
      if (from.faction !== this.playerFaction || to.faction !== this.playerFaction) {
        this.addLog('❌ [수송] 아군 성계 간에만 수송 가능합니다.')
        return false
      }

      const item = MILITARY.TRANSPORT_ITEMS[itemType]
      const cost = amount * item.costPerUnit

      if (itemType === 'GOLD') {
        if (this.pRes.gold < amount + cost) {
          this.addLog(`❌ [수송] 자금 부족`)
          return false
        }
        this.pRes.gold -= (amount + cost)
        // 목적지 성계 금고에 추가 (인프라 투자 개념)
        to.industry = Math.min(100, to.industry + Math.floor(amount / 1000))
      } else if (itemType === 'WELFARE') {
        if (this.pRes.gold < cost) { this.addLog('❌ [수송] 자금 부족'); return false }
        this.pRes.gold -= cost
        to.morale = Math.min(100, to.morale + Math.floor(amount / 10))
      } else {
        if (this.pRes.gold < cost) { this.addLog('❌ [수송] 자금 부족'); return false }
        this.pRes.gold -= cost
        to.defense = Math.min(100, to.defense + Math.floor(amount / 20))
      }

      // 수송 성공률 (적 함대 없으면 100%)
      const enemyNearby = Object.values(this.fleets)
        .flat()
        .some(f => f.faction !== this.playerFaction && f.location === toSystemId)

      if (enemyNearby && Math.random() < 0.3) {
        this.addLog(`❌ ${MILITARY.DIALOGS.TRANSPORT.fail}`)
        return false
      }

      this.addLog(`[명령] ${MILITARY.DIALOGS.TRANSPORT.order(from.name, to.name, item.name)}`)
      this.addLog(`✅ ${MILITARY.DIALOGS.TRANSPORT.success(to.name, item.name)}`)
      return true
    },


    // ── 첩보 작전 ────────────────────────────────────────
    launchIntelOp(targetSystemId, opType, officerId) {
      const { INTEL } = require('@/data/masterData')
      const op  = INTEL.OPERATIONS[opType]
      const sys = this.systems[targetSystemId]
      if (!op || !sys) return false
      if (this.pRes.gold < op.cost) {
        this.addLog(`❌ [첩보] 자금 부족 (필요: ${op.cost.toLocaleString()})`)
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
            this.addLog(`📊 [기밀] ${sys.name}: 방어 ${sys.defense}% / 산업 ${sys.industry}% / 민심 ${sys.morale}%`)
            break
          case 'SABOTAGE':
            sys.defense   = Math.max(5,  sys.defense   - 20)
            sys.industry  = Math.max(5,  sys.industry  - 15)
            this.addLog(`💣 [파괴] ${sys.name} 시설 파괴 성공! (방어 -20, 산업 -15)`)
            break
          case 'AGITATE':
            sys.morale = Math.max(5, sys.morale - 25)
            this.addLog(`📣 [선동] ${sys.name} 민심 교란 성공! (민심 -25)`)
            break
          case 'ASSASSIN': {
            // 해당 성계의 적 함대 사령관 교체
            const enemyFleets = Object.values(this.fleets)
              .flat()
              .filter(f => f.location === targetSystemId && f.faction !== this.playerFaction)
            if (enemyFleets.length > 0) {
              const target = enemyFleets[0]
              this.addLog(`🗡️ [암살] ${sys.name}의 ${CHARACTERS?.[target.commander]?.name || target.commander} 제거 성공!`)
              target.commander = null
            } else {
              this.addLog(`🗡️ [암살] ${sys.name}에서 요인을 제거했습니다.`)
            }
            break
          }
        }
        return true
      } else {
        this.addLog(dlg.fail)
        return false
      }
    },

    // ── 치안 회복 ────────────────────────────────────────
    restoreSecurity(systemId, level, officerId) {
      const { INTEL } = require('@/data/masterData')
      const lvl = INTEL.SECURITY_LEVELS[level]
      const sys = this.systems[systemId]
      if (!lvl || !sys) return false
      if (sys.faction !== this.playerFaction) {
        this.addLog('❌ [치안] 아군 성계에서만 실행 가능합니다.')
        return false
      }
      if (this.pRes.gold < lvl.cost) {
        this.addLog(`❌ [치안] 자금 부족 (필요: ${lvl.cost.toLocaleString()})`)
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
      return true
    },

    // ── 제안 공작 ────────────────────────────────────────
    launchProposal(targetFaction, propType) {
      const { INTEL, FACTIONS } = require('@/data/masterData')
      const prop = INTEL.PROPOSALS[propType]
      if (!prop) return false
      if (this.pRes.gold < prop.cost) {
        this.addLog(`❌ [공작] 자금 부족 (필요: ${prop.cost.toLocaleString()})`)
        return false
      }
      this.pRes.gold -= prop.cost
      const dlg  = INTEL.DIALOGS.PROPOSAL
      const tName = FACTIONS[targetFaction]?.name || targetFaction

      this.addLog(`[재상] ${dlg.prime_suggest}`)
      this.addLog(`[고문] ${dlg.advisor_reply}`)
      this.addLog(`[황제/의장] ${dlg.emperor_ask(tName)}`)
      this.addLog(`[황제/의장] ${dlg.emperor_reply}`)

      // 성공 판정 (페잔은 높음, 교전 중 세력은 낮음)
      const baseRate = targetFaction === 'PZN' ? 0.70 : 0.45
      const success  = Math.random() < baseRate

      if (success) {
        switch (propType) {
          case 'FPA':
            this.addLog(`✅ ${dlg.success(tName)} — 동맹 체결. ${tName}은 당분간 공격을 자제합니다.`)
            // 일시적 불가침 플래그 (3턴)
            this._truce = this._truce || {}
            this._truce[targetFaction] = this.turn + 3
            break
          case 'TRADE':
            this.addLog(`✅ ${dlg.success(tName)} — 통상 조약 체결. 수입 10% 증가.`)
            this._tradeBonus = (this._tradeBonus || 0) + 0.10
            break
          case 'SURRENDER':
            // 상대 성계 민심 대폭 하락
            Object.values(this.systems).forEach(s => {
              if (s.faction === targetFaction) s.morale = Math.max(5, s.morale - 20)
            })
            this.addLog(`✅ ${dlg.success(tName)} — 항복 권고 수락. ${tName} 민심 대폭 하락.`)
            break
          case 'DEFECTION': {
            // 적 미배속 인물 귀순
            const defector = Object.values(this.characters).find(
              c => c.faction === targetFaction && !c.currentPost
            )
            if (defector) {
              defector.faction = this.playerFaction
              this.addLog(`✅ ${dlg.success(tName)} — ${defector.name}이 귀순했습니다!`)
            } else {
              this.addLog(`✅ ${dlg.success(tName)} — 귀순 공작 성공. (귀순 가능 인물 없음)`)
            }
            break
          }
        }
        return true
      } else {
        this.addLog(`❌ ${dlg.fail(tName)}`)
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
      ['REH','FPA','PZN'].forEach(f => {
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

      // 원본 대사 출력
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

      // 요새 무기 반격
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
        this.addLog(`✅ [점령] ${target.name} (${prev || '중립'} → ${this.playerFaction})`)
      } else {
        const loss = Math.floor(fleet.ships * 0.15)
        fleet.ships = Math.max(1000, fleet.ships - loss)
        fleet.status = 'standby'
        fleet.target = null
        this.addLog(DIALOGS.BATTLE.fail_generic(fleet.name, target.name))
        this.addLog(`❌ [실패] 손실: ${loss.toLocaleString()}척`)
      }
    },

    _events() {
      if (Math.random() < 0.1) {
        const evs = ['반란군 진압 완료.','밀약 협상 첩보 입수.','신진 장교 발견.','보급 차질 발생.','페잔 상인의 제안 도착.']
        this.addLog(`📰 [이벤트] ${evs[Math.floor(Math.random() * evs.length)]}`)
      }
    },

    _ai() {
      ['REH','FPA','PZN'].filter(f => f !== this.playerFaction).forEach(f => {
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
            this.addLog(`⚠️ [AI] ${FACTIONS[f].name} ${fleet.name}이 ${t.name} 점령! (${prev || '중립'} → ${f})`)
          }
        })
      })
    },

    _victory() {
      const counts = this.sysCounts
      const total = Object.values(this.systems).length
      Object.keys(FACTIONS).forEach(f => {
        if ((counts[f] || 0) >= Math.ceil(total * 0.7)) {
          this.gameOver = true
          this.winner = f
          this.addLog(`🏆 [승리] ${FACTIONS[f].name} 우주 통일!`)
        }
      })
    },

    // ── 스토리 이벤트 ────────────────────────────────────────
    triggerCoup(charId, targetFaction) {
      const c = this.characters[charId]
      if (!c) return
      const from = c.faction
      c.faction = targetFaction
      c.currentPost = null
      this.addLog(`⚡ [쿠데타] ${c.name}이(가) ${FACTIONS[from]?.name || from}에서 ${FACTIONS[targetFaction]?.name || targetFaction}으로 귀순.`)
      this.openModal('event', {
        title: '쿠데타',
        portrait: c.portrait || '⚡',
        speaker: c.name,
        desc: `${c.name}이(가) 정변을 일으켜 ${FACTIONS[targetFaction]?.name || targetFaction} 진영에 합류했습니다.`,
        effect: { morale: -10 },
      })
    },

    triggerDefection(charId, targetFaction) {
      const c = this.characters[charId]
      if (!c) return
      const from = c.faction
      c.faction = targetFaction
      c.currentPost = null
      this.addLog(`🚶 [망명] ${c.name}이(가) ${FACTIONS[targetFaction]?.name || targetFaction}으로 망명.`)
      this.openModal('event', {
        title: '망명',
        portrait: c.portrait || '🚶',
        speaker: c.name,
        desc: `${c.name}이(가) ${FACTIONS[from]?.name || from}을 떠나 ${FACTIONS[targetFaction]?.name || targetFaction}으로 망명했습니다.`,
      })
    },

    triggerResignation(charId) {
      const c = this.characters[charId]
      if (!c) return
      const post = c.currentPost
      c.currentPost = null
      this.addLog(`📜 [사임] ${c.name}이(가) ${post || '현직'}에서 사임.`)
      this.openModal('event', {
        title: '사임',
        portrait: c.portrait || '📜',
        speaker: c.name,
        desc: `${c.name}이(가) 직책을 사임했습니다.`,
      })
    },

    triggerDeath(charId) {
      const c = this.characters[charId]
      if (!c) return
      c.isDead = true
      c.currentPost = null
      this.addLog(`💀 [사망] ${c.name} 사망.`)
      this.openModal('event', {
        title: '사망',
        portrait: c.portrait || '💀',
        speaker: '전령',
        desc: `${c.name}이(가) 사망했습니다.`,
      })
    },
  },
})