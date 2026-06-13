import { defineStore } from 'pinia'
import {
  FACTIONS, CHARACTERS,
  OPERATION_TYPES, CONSTRUCTION_TYPES, FORTRESS_WEAPONS, DIALOGS
} from '@/data/masterData'
import { SCENARIOS } from '@/data/scenario/scenarioData.js'
import { STAR_SYSTEMS } from '@/data/base/stars/starSystemData'
import { STAR_DETAIL as _DETAIL_SE796_10 } from '@/data/scenario/SE796/10/starDetail'
import { STAR_DETAIL as _DETAIL_SE745_1  } from '@/data/scenario/SE745/01/starDetail'
import { STAR_DETAIL as _DETAIL_SE640_1  } from '@/data/scenario/SE640/01/starDetail'

const _SE796_10_MAP = Object.fromEntries(_DETAIL_SE796_10.map(d => [d.code, d]))

const _SCENARIO_DETAIL_MAP = {
  'SE796_10': _SE796_10_MAP,
  'SE796_11': _SE796_10_MAP,
  'SE796_12': _SE796_10_MAP,
  'SE796_13': _SE796_10_MAP,
  'SE745_1':  Object.fromEntries(_DETAIL_SE745_1.map(d => [d.code, d])),
  'SE640_1':  Object.fromEntries(_DETAIL_SE640_1.map(d => [d.code, d])),
}

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
  const sc = SCENARIOS.find(s => s.id === scId) || SCENARIOS[0]
  const _detailMap = _SCENARIO_DETAIL_MAP[sc.id] || {}
  const systems = {}
  STAR_SYSTEMS.forEach(s => {
    const d = _detailMap[s.code] || {}
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
      { id:'E_1ST',  name:'��1�Դ�',      commander:'MITTERMEYER', ships:15000, maxShips:15000, location:'230058', status:'standby', target:null, upkeep:30 },
      { id:'E_2ND',  name:'��2�Դ�',      commander:'REUENTHAL',   ships:15000, maxShips:15000, location:'230058', status:'standby', target:null, upkeep:30 },
      { id:'E_3RD',  name:'���â���Դ�', commander:'BITTENFELD',  ships:13000, maxShips:13000, location:'230002', status:'standby', target:null, upkeep:26 },
    ],
    FPA: [
      { id:'A_1ST',  name:'��1�Դ�',  commander:'YANG',         ships:15000, maxShips:15000, location:'230006', status:'standby', target:null, upkeep:30 },
      { id:'A_13TH', name:'��13�Դ�', commander:'ATTENBOROUGH', ships:12000, maxShips:12000, location:'230055', status:'standby', target:null, upkeep:24 },
    ],
    PZN: [],
  }
  return {
    sc, playerFaction: pf,
    year: sc.year, impYear: sc.year - 309, month: 1, day: 1, turn: 1,
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
    dateStr:   s => `���ַ� ${s.year}�� ${s.month}�� / ������ ${s.impYear}��`,
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
      const sc = SCENARIOS.find(s => s.id === scId) || SCENARIOS[0]
      this.addLog(`[${FACTIONS[pf]?.name ?? pf}] ${sc.nameKr} 시작.`)
    },

    endTurn() {
      // �ӽ� ¡�� ��ٿ�
      if (this._levyCooldown > 0) this._levyCooldown--
      // ���� ���� ���
      if (this._loanBalance > 0) {
        const remaining = this._loanDueTurn - this.turn
        if (remaining === 1) this.addLog(`?? [����] ���� ���� ���� ��ȯ �����Դϴ�. (${this._loanBalance.toLocaleString()} ��ũ)`)
        if (remaining <= 0) {
          // ��ȯ �Ҵ� ó��
          Object.values(this.systems).forEach(s => { if (s.faction === this.playerFaction) s.morale = Math.max(5, s.morale - 15) })
          this.addLog(`? [����] ��ȯ �Ҵ� �����Դϴ�. ������ �̿� �����ϴ� ��ġ�� ���ϰڽ��ϴ�.`)
          this.resources['PZN'].gold += Math.floor(this._loanBalance * 0.5)
          this._loanBalance = 0; this._loanDueTurn = null
        }
      }
      this._income()
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
      this.addLog(`�������� ${this.year}�� ${this.month}�� ${this.day}�� (�� ${this.turn}) ��������`)
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
      this.addLog(`[${s.name}] ���� ${old}% �� ${s.tax}%`)
    },

    buildConstruction(sysId, type) {
      const s = this.systems[sysId]
      const ct = CONSTRUCTION_TYPES[type]
      if (!s || s.faction !== this.playerFaction || this.pRes.gold < ct.cost || s.underConstruction) return false
      this.pRes.gold -= ct.cost
      s.underConstruction = { type, turnsLeft: ct.turns }
      this.addLog(`[${s.name}] ${ct.name} �Ǽ� ���� (${ct.turns}��)`)
      return true
    },

    deployFleet(fleetId, targetId, opType) {
      const fleet = this.pFleets.find(f => f.id === fleetId)
      const target = this.systems[targetId]
      if (!fleet || !target || fleet.status !== 'standby') return false

      // �ش� ���迡 �ֵ� ���� �� �Դ� ����
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
        // �������� Ʈ����
        this._pendingBattle = {
          attackerFleet:   { ...fleet, faction: this.playerFaction },
          attackerFaction: this.playerFaction,
          defenderFleets,
          targetSystemId:  targetId,
          opType,
        }
        this.addLog(`[���] ${fleet.name} �� ${target.name} ? �� �Դ� �߰�, �������� ����!`)
        return 'tactical'
      }

      // ��� �Դ� ���� �� ��� �ذ�
      this.addLog(`[���] ${fleet.name} �� ${target.name} (${OPERATION_TYPES[opType]?.name})`)
      this._battle(fleet, target, opType)
      return true
    },

    applyBattleResult(result) {
      const ctx = this._pendingBattle
      if (!ctx) return

      const attackerFleet = this.pFleets.find(f => f.id === ctx.attackerFleet.id)

      if (result.winner === this.playerFaction) {
        // �Ʊ� �¸�
        if (attackerFleet) {
          attackerFleet.ships    = Math.max(1000, ctx.attackerFleet.ships - result.attackerLosses)
          attackerFleet.status   = 'standby'
          attackerFleet.target   = null
          attackerFleet.location = ctx.targetSystemId
        }

        // �� �Դ� ���� ���� (�� �Դ뿡 �յ� �й�)
        const perFleet = Math.floor(result.defenderLosses / Math.max(1, ctx.defenderFleets.length))
        ctx.defenderFleets.forEach(df => {
          const factionFleets = this.fleets[df.faction]
          if (!factionFleets) return
          const idx = factionFleets.findIndex(f => f.id === df.id)
          if (idx === -1) return
          const remaining = df.ships - perFleet
          if (remaining <= 1000) {
            this.addLog(`?? [����] ${df.name} �������� �й�� ����`)
            factionFleets.splice(idx, 1)
          } else {
            factionFleets[idx].ships = remaining
            const friendly = Object.values(this.systems).find(s => s.faction === df.faction)
            if (friendly) factionFleets[idx].location = friendly.id
          }
        })

        // ���� ���� ȿ��
        const target = this.systems[ctx.targetSystemId]
        const op     = OPERATION_TYPES[ctx.opType]
        if (target && op) {
          const prev = target.faction
          target.faction  = this.playerFaction
          target.defense  = Math.max(5, target.defense  - (op.defDmg   || 0))
          target.morale   = Math.max(5, target.morale   - (op.moraleDmg || 0))
          this.addLog(`? [����] ${target.name} �������� �¸� (${prev || '�߸�'} �� ${this.playerFaction})`)
        }
        this._victory()

      } else {
        // �Ʊ� �й�
        if (attackerFleet) {
          attackerFleet.ships  = Math.max(1000, ctx.attackerFleet.ships - result.attackerLosses)
          attackerFleet.status = 'standby'
          attackerFleet.target = null
          const friendly = Object.values(this.systems).find(s => s.faction === this.playerFaction)
          if (friendly) attackerFleet.location = friendly.id
        }
        this.addLog(`? [�й�] �������� �й�, ${ctx.attackerFleet.name} ö��`)
      }

      this._pendingBattle = null
    },

    assignChar(charId, post) {
      const c = this.characters[charId]
      if (!c || c.faction !== this.playerFaction) return
      c.currentPost = post
      const dialog = this.playerFaction === 'REH' ? DIALOGS.APPOINTMENT.emperor : ''
      if (dialog) this.addLog(`[Ȳ��] ${dialog}`)
      this.addLog(`[�Ӹ�] ${c.name} �� ${post}`)
    },


    // ���� �ӽ� ¡�� ����������������������������������������������������������������������������������
    emergencyLevy() {
      const res = this.pRes
      const { FINANCE } = require('@/data/masterData')
      const terms = FINANCE.LEVY_TERMS

      if (this._levyCooldown > 0) {
        this.addLog(`? [�ӽ� ¡��] ���� ��� �� (${this._levyCooldown}�� ����)`)
        return false
      }

      // ���� �� ���� ���
      let monthlyIncome = 0
      Object.values(this.systems).forEach(s => {
        if (s.faction === this.playerFaction)
          monthlyIncome += Math.floor(s.population * (s.tax / 100) * (s.industry / 100) * 10)
      })

      const amount = Math.floor(monthlyIncome * terms.RATE)
      res.gold += amount
      this._levyCooldown = terms.COOLDOWN_TURNS

      // �� ���� �ν� �϶�
      Object.values(this.systems).forEach(s => {
        if (s.faction === this.playerFaction)
          s.morale = Math.max(5, s.morale + terms.MORALE_PENALTY)
      })

      const dlg = FINANCE.DIALOGS.EMERGENCY_LEVY
      if (this.playerFaction === 'REH') {
        this.addLog(`[���] ${dlg.empire_prime}`)
        this.addLog(`[Ȳ��] ${dlg.emperor_reply}`)
      }
      this.addLog(dlg.success(amount))
      return true
    },

    // ���� ���� ���� ����������������������������������������������������������������������������������
    takeLoan(amount) {
      const { FINANCE } = require('@/data/masterData')
      const terms = FINANCE.LOAN_TERMS

      if (amount < terms.MIN_AMOUNT || amount > terms.MAX_AMOUNT) {
        this.addLog(`? [����] �ݾ��� ${terms.MIN_AMOUNT}~${terms.MAX_AMOUNT} ��ũ ���̿��� �մϴ�.`)
        return false
      }
      if (this._loanBalance > 0) {
        this.addLog(`? [����] ���� ����(${this._loanBalance.toLocaleString()} ��ũ)�� ���� ��ȯ�ϼ���.`)
        return false
      }

      const totalRepay = Math.floor(amount * (1 + terms.INTEREST_RATE))
      this.pRes.gold += amount
      this._loanBalance = totalRepay
      this._loanDueTurn = this.turn + terms.REPAY_TURNS

      // ���� ����
      this.resources['PZN'].gold += totalRepay - amount

      const dlg = FINANCE.DIALOGS.LOAN
      this.addLog(`[����] ${dlg.phezzan_offer}`)
      if (this.playerFaction === 'REH') this.addLog(`[Ȳ��] ${dlg.empire_accept}`)
      else this.addLog(`[����] ${dlg.alliance_accept}`)
      this.addLog(`?? [����] ${amount.toLocaleString()} ��ũ ����. ��ȯ��: ${totalRepay.toLocaleString()} ��ũ (${terms.REPAY_TURNS}�� ��)`)
      return true
    },

    // ���� ���� ��ȯ ����������������������������������������������������������������������������������
    repayLoan() {
      const { FINANCE } = require('@/data/masterData')
      if (this._loanBalance <= 0) {
        this.addLog('? [��ȯ] ��ȯ�� ������ �����ϴ�.')
        return false
      }
      if (this.pRes.gold < this._loanBalance) {
        this.addLog(`? [��ȯ] �ڱ��� �����մϴ�. (�ʿ�: ${this._loanBalance.toLocaleString()}, ����: ${this.pRes.gold.toLocaleString()})`)
        return false
      }
      this.pRes.gold -= this._loanBalance
      const paid = this._loanBalance
      this._loanBalance = 0
      this._loanDueTurn = null
      this.addLog(`[����] ${FINANCE.DIALOGS.LOAN.repay_confirm}`)
      this.addLog(`? [��ȯ] ${paid.toLocaleString()} ��ũ ��ȯ �Ϸ�.`)
      return true
    },

    // ���� ���� ��� ����������������������������������������������������������������������������������
    allocateBudget(allocations) {
      // allocations: { MILITARY: n, CONSTRUCTION: n, INTELLIGENCE: n, WELFARE: n, RESERVE: n }
      const { FINANCE } = require('@/data/masterData')
      const total = Object.values(allocations).reduce((s, v) => s + v, 0)
      if (total > this.pRes.gold) {
        this.addLog(`? [����] ��� �Ѿ�(${total.toLocaleString()})�� ���� �ڱ�(${this.pRes.gold.toLocaleString()})�� �ʰ��մϴ�.`)
        return false
      }

      // �� �׸� ȿ�� ����
      Object.entries(allocations).forEach(([key, amount]) => {
        if (amount <= 0) return
        switch(key) {
          case 'MILITARY':
            // �Դ� ���� ���� ȸ��
            this.pFleets.forEach(f => { f.ships = Math.min(f.ships * 1.05, f.ships + Math.floor(amount / 100)) })
            break
          case 'WELFARE':
            // �� ���� �ν� ���
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
        this.addLog(`[���] ${dlg.empire_prime}`)
        this.addLog(`[Ȳ��] ${dlg.emperor_reply}`)
      } else {
        this.addLog(`[����] ${dlg.alliance_council}`)
      }
      this.addLog(`? [����] ${dlg.success} (�� ${total.toLocaleString()} ��ũ)`)
      return true
    },


    // ���� �Դ� ���� (�ű� ����) ��������������������������������������������������������
    formFleet(name, commanderId, sizeKey, locationId) {
      const { MILITARY } = require('@/data/masterData')
      const size = MILITARY.FLEET_SIZES[sizeKey]
      if (!size) return false
      if (this.pRes.gold < size.cost) {
        this.addLog(`? [����] �ڱ� ���� (�ʿ�: ${size.cost.toLocaleString()})`)
        return false
      }
      const sys = this.systems[locationId]
      if (!sys || sys.faction !== this.playerFaction) {
        this.addLog('? [����] �Ʊ� ���迡���� ���� �����մϴ�.')
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
      this.addLog(`[����] ${decree}`)
      this.addLog(`? ${dlg.success(name, size.ships)}`)
      return true
    },

    // ���� �Դ� ������ (�Ը� ����) ����������������������������������������������������
    reorganizeFleet(fleetId, newShips) {
      const { MILITARY } = require('@/data/masterData')
      const fleet = this.pFleets.find(f => f.id === fleetId)
      if (!fleet || fleet.status !== 'standby') {
        this.addLog('? [������] ��� ���� �Դ븸 ������ �����մϴ�.')
        return false
      }
      const diff = newShips - fleet.ships
      const cost = Math.abs(Math.floor(diff * 0.02))
      if (diff > 0 && this.pRes.gold < cost) {
        this.addLog(`? [������] �ڱ� ���� (�ʿ�: ${cost.toLocaleString()})`)
        return false
      }
      const before = fleet.ships
      fleet.ships = Math.max(1000, newShips)
      fleet.maxShips = fleet.ships
      fleet.upkeep = Math.floor(fleet.ships / 500)
      if (diff > 0) this.pRes.gold -= cost
      this.addLog(`? ${MILITARY.DIALOGS.REORGANIZE.success(fleet.name, before, fleet.ships)}`)
      return true
    },

    // ���� �Դ� �ػ� ��������������������������������������������������������������������������������
    disbandFleet(fleetId) {
      const { MILITARY } = require('@/data/masterData')
      const idx = this.fleets[this.playerFaction].findIndex(f => f.id === fleetId)
      if (idx === -1) return false
      const fleet = this.fleets[this.playerFaction][idx]
      if (fleet.status === 'deployed') {
        this.addLog('? [�ػ�] ��� ���� �Դ�� �ػ��� �� �����ϴ�.')
        return false
      }
      // �Լ� ���� ��ġ ȯ��
      const refund = Math.floor(fleet.ships * 0.01)
      this.pRes.gold += refund
      this.fleets[this.playerFaction].splice(idx, 1)
      this.addLog(MILITARY.DIALOGS.FORMATION.disband(fleet.name))
      this.addLog(`?? �Լ� ȯ��: ${refund.toLocaleString()} ��ũ`)
      return true
    },

    // ���� �Դ� �̵� (���� �� ����/�̵�) ��������������������������������������
    moveFleet(fleetId, targetSystemId) {
      const fleet = this.pFleets.find(f => f.id === fleetId)
      const target = this.systems[targetSystemId]
      if (!fleet || !target) return false
      if (fleet.status !== 'standby') {
        this.addLog('? [�̵�] ��� ���� �Դ븸 �̵� �����մϴ�.')
        return false
      }
      if (target.faction !== this.playerFaction) {
        this.addLog('? [�̵�] �Ʊ� ����θ� �̵� �����մϴ�. (������ ��� ������ ����ϼ���)')
        return false
      }
      const from = this.systems[fleet.location]?.name || fleet.location
      fleet.location = targetSystemId
      this.addLog(`?? [�̵�] ${fleet.name}: ${from} �� ${target.name}`)
      return true
    },

    // ���� �Դ� ö�� (���� �� �� ���� �Ʊ� ����) ������������������������
    retreatFleet(fleetId) {
      const { MILITARY } = require('@/data/masterData')
      const fleet = this.pFleets.find(f => f.id === fleetId)
      if (!fleet) return false

      // ���� ����� �Ʊ� ����� ö��
      const homeSystems = Object.values(this.systems)
        .filter(s => s.faction === this.playerFaction)
      if (!homeSystems.length) return false

      const dest = homeSystems[0]
      fleet.status = 'standby'
      fleet.target = null
      fleet.location = dest.id
      // ö�� �� �Լ� 10% �ս�
      const loss = Math.floor(fleet.ships * 0.1)
      fleet.ships = Math.max(1000, fleet.ships - loss)

      this.addLog(`[����] ${MILITARY.DIALOGS.RETREAT.order(fleet.name)}`)
      this.addLog(`? ${MILITARY.DIALOGS.RETREAT.complete(fleet.name, dest.name)} (�ս�: ${loss.toLocaleString()}ô)`)
      return true
    },

    // ���� �ڿ� ���� (���� �� ����) ��������������������������������������������������
    transportResources(fromSystemId, toSystemId, itemType, amount) {
      const { MILITARY } = require('@/data/masterData')
      const from = this.systems[fromSystemId]
      const to   = this.systems[toSystemId]
      if (!from || !to) return false
      if (from.faction !== this.playerFaction || to.faction !== this.playerFaction) {
        this.addLog('? [����] �Ʊ� ���� ������ ���� �����մϴ�.')
        return false
      }

      const item = MILITARY.TRANSPORT_ITEMS[itemType]
      const cost = amount * item.costPerUnit

      if (itemType === 'GOLD') {
        if (this.pRes.gold < amount + cost) {
          this.addLog(`? [����] �ڱ� ����`)
          return false
        }
        this.pRes.gold -= (amount + cost)
        // ������ ���� �ݰ��� �߰� (������ ���� ����)
        to.industry = Math.min(100, to.industry + Math.floor(amount / 1000))
      } else if (itemType === 'WELFARE') {
        if (this.pRes.gold < cost) { this.addLog('? [����] �ڱ� ����'); return false }
        this.pRes.gold -= cost
        to.morale = Math.min(100, to.morale + Math.floor(amount / 10))
      } else {
        if (this.pRes.gold < cost) { this.addLog('? [����] �ڱ� ����'); return false }
        this.pRes.gold -= cost
        to.defense = Math.min(100, to.defense + Math.floor(amount / 20))
      }

      // ���� ������ (�� �Դ� ������ 100%)
      const enemyNearby = Object.values(this.fleets)
        .flat()
        .some(f => f.faction !== this.playerFaction && f.location === toSystemId)

      if (enemyNearby && Math.random() < 0.3) {
        this.addLog(`? ${MILITARY.DIALOGS.TRANSPORT.fail}`)
        return false
      }

      this.addLog(`[����] ${MILITARY.DIALOGS.TRANSPORT.order(from.name, to.name, item.name)}`)
      this.addLog(`? ${MILITARY.DIALOGS.TRANSPORT.success(to.name, item.name)}`)
      return true
    },


    // ���� ø�� ���� ��������������������������������������������������������������������������������
    launchIntelOp(targetSystemId, opType, officerId) {
      const { INTEL } = require('@/data/masterData')
      const op  = INTEL.OPERATIONS[opType]
      const sys = this.systems[targetSystemId]
      if (!op || !sys) return false
      if (this.pRes.gold < op.cost) {
        this.addLog(`? [ø��] �ڱ� ���� (�ʿ�: ${op.cost.toLocaleString()})`)
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
            this.addLog(`?? [���] ${sys.name}: ��� ${sys.defense}% / ��� ${sys.industry}% / �ν� ${sys.morale}%`)
            break
          case 'SABOTAGE':
            sys.defense   = Math.max(5,  sys.defense   - 20)
            sys.industry  = Math.max(5,  sys.industry  - 15)
            this.addLog(`?? [�ı�] ${sys.name} �ü� �ı� ����! (��� -20, ��� -15)`)
            break
          case 'AGITATE':
            sys.morale = Math.max(5, sys.morale - 25)
            this.addLog(`?? [����] ${sys.name} �ν� ���� ����! (�ν� -25)`)
            break
          case 'ASSASSIN': {
            // �ش� ������ �� �Դ� ��ɰ� ��ü
            const enemyFleets = Object.values(this.fleets)
              .flat()
              .filter(f => f.location === targetSystemId && f.faction !== this.playerFaction)
            if (enemyFleets.length > 0) {
              const target = enemyFleets[0]
              this.addLog(`??? [�ϻ�] ${sys.name}�� ${CHARACTERS?.[target.commander]?.name || target.commander} ���� ����!`)
              target.commander = null
            } else {
              this.addLog(`??? [�ϻ�] ${sys.name}���� ������ �����߽��ϴ�.`)
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

    // ���� ġ�� ȸ�� ��������������������������������������������������������������������������������
    restoreSecurity(systemId, level, officerId) {
      const { INTEL } = require('@/data/masterData')
      const lvl = INTEL.SECURITY_LEVELS[level]
      const sys = this.systems[systemId]
      if (!lvl || !sys) return false
      if (sys.faction !== this.playerFaction) {
        this.addLog('? [ġ��] �Ʊ� ���迡���� ���� �����մϴ�.')
        return false
      }
      if (this.pRes.gold < lvl.cost) {
        this.addLog(`? [ġ��] �ڱ� ���� (�ʿ�: ${lvl.cost.toLocaleString()})`)
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
      this.addLog(`? ${dlg.success(sys.name)} (�ν� ${lvl.moraleEffect >= 0 ? '+' : ''}${lvl.moraleEffect}, ��� +${lvl.defEffect})`)
      return true
    },

    // ���� ���� ���� ��������������������������������������������������������������������������������
    launchProposal(targetFaction, propType) {
      const { INTEL, FACTIONS } = require('@/data/masterData')
      const prop = INTEL.PROPOSALS[propType]
      if (!prop) return false
      if (this.pRes.gold < prop.cost) {
        this.addLog(`? [����] �ڱ� ���� (�ʿ�: ${prop.cost.toLocaleString()})`)
        return false
      }
      this.pRes.gold -= prop.cost
      const dlg  = INTEL.DIALOGS.PROPOSAL
      const tName = FACTIONS[targetFaction]?.name || targetFaction

      this.addLog(`[���] ${dlg.prime_suggest}`)
      this.addLog(`[����] ${dlg.advisor_reply}`)
      this.addLog(`[Ȳ��/����] ${dlg.emperor_ask(tName)}`)
      this.addLog(`[Ȳ��/����] ${dlg.emperor_reply}`)

      // ���� ���� (������ ����, ���� �� ������ ����)
      const baseRate = targetFaction === 'PZN' ? 0.70 : 0.45
      const success  = Math.random() < baseRate

      if (success) {
        switch (propType) {
          case 'FPA':
            this.addLog(`? ${dlg.success(tName)} ? ���� ü��. ${tName}�� ��а� ������ �����մϴ�.`)
            // �Ͻ��� �Ұ�ħ �÷��� (3��)
            this._truce = this._truce || {}
            this._truce[targetFaction] = this.turn + 3
            break
          case 'TRADE':
            this.addLog(`? ${dlg.success(tName)} ? ��� ���� ü��. ���� 10% ����.`)
            this._tradeBonus = (this._tradeBonus || 0) + 0.10
            break
          case 'SURRENDER':
            // ��� ���� �ν� ���� �϶�
            Object.values(this.systems).forEach(s => {
              if (s.faction === targetFaction) s.morale = Math.max(5, s.morale - 20)
            })
            this.addLog(`? ${dlg.success(tName)} ? �׺� �ǰ� ����. ${tName} �ν� ���� �϶�.`)
            break
          case 'DEFECTION': {
            // �� �̹�� �ι� �ͼ�
            const defector = Object.values(this.characters).find(
              c => c.faction === targetFaction && !c.currentPost
            )
            if (defector) {
              defector.faction = this.playerFaction
              this.addLog(`? ${dlg.success(tName)} ? ${defector.name}�� �ͼ��߽��ϴ�!`)
            } else {
              this.addLog(`? ${dlg.success(tName)} ? �ͼ� ���� ����. (�ͼ� ���� �ι� ����)`)
            }
            break
          }
        }
        return true
      } else {
        this.addLog(`? ${dlg.fail(tName)}`)
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
        if (f === this.playerFaction) this.addLog(`[����] +${inc} / ������ -${upkeepTotal} (�ܰ� ${this.resources[f].gold})`)
      })
    },

    _construct() {
      Object.values(this.systems).forEach(s => {
        if (!s.underConstruction) return
        s.underConstruction.turnsLeft--
        if (s.underConstruction.turnsLeft <= 0) {
          const ct = CONSTRUCTION_TYPES[s.underConstruction.type]
          if (ct?.effect) Object.entries(ct.effect).forEach(([k, v]) => { s[k] = Math.min(100, (s[k] || 0) + v) })
          this.addLog(`[�ϰ�] ${s.name} ${ct.name}`)
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

      // ���� ��� ���
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

      // ��� ���� �ݰ�
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
        this.addLog(`? [����] ${target.name} (${prev || '�߸�'} �� ${this.playerFaction})`)
      } else {
        const loss = Math.floor(fleet.ships * 0.15)
        fleet.ships = Math.max(1000, fleet.ships - loss)
        fleet.status = 'standby'
        fleet.target = null
        this.addLog(DIALOGS.BATTLE.fail_generic(fleet.name, target.name))
        this.addLog(`? [����] �ս�: ${loss.toLocaleString()}ô`)
      }
    },

    _events() {
      if (Math.random() < 0.1) {
        const evs = ['�ݶ��� ���� �Ϸ�.','�о� ���� ø�� �Լ�.','���� �屳 �߰�.','���� ���� �߻�.','���� ������ ���� ����.']
        this.addLog(`?? [�̺�Ʈ] ${evs[Math.floor(Math.random() * evs.length)]}`)
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
            this.addLog(`?? [AI] ${FACTIONS[f].name} ${fleet.name}�� ${t.name} ����! (${prev || '�߸�'} �� ${f})`)
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
          this.addLog(`?? [�¸�] ${FACTIONS[f].name} ���� ����!`)
        }
      })
    },

    // ���� ���丮 �̺�Ʈ ��������������������������������������������������������������������������������
    triggerCoup(charId, targetFaction) {
      const c = this.characters[charId]
      if (!c) return
      const from = c.faction
      c.faction = targetFaction
      c.currentPost = null
      this.addLog(`? [����Ÿ] ${c.name}��(��) ${FACTIONS[from]?.name || from}���� ${FACTIONS[targetFaction]?.name || targetFaction}���� �ͼ�.`)
      this.openModal('event', {
        title: '����Ÿ',
        portrait: c.portrait || '?',
        speaker: c.name,
        desc: `${c.name}��(��) ������ ������ ${FACTIONS[targetFaction]?.name || targetFaction} ������ �շ��߽��ϴ�.`,
        effect: { morale: -10 },
      })
    },

    triggerDefection(charId, targetFaction) {
      const c = this.characters[charId]
      if (!c) return
      const from = c.faction
      c.faction = targetFaction
      c.currentPost = null
      this.addLog(`?? [����] ${c.name}��(��) ${FACTIONS[targetFaction]?.name || targetFaction}���� ����.`)
      this.openModal('event', {
        title: '����',
        portrait: c.portrait || '??',
        speaker: c.name,
        desc: `${c.name}��(��) ${FACTIONS[from]?.name || from}�� ���� ${FACTIONS[targetFaction]?.name || targetFaction}���� �����߽��ϴ�.`,
      })
    },

    triggerResignation(charId) {
      const c = this.characters[charId]
      if (!c) return
      const post = c.currentPost
      c.currentPost = null
      this.addLog(`?? [����] ${c.name}��(��) ${post || '����'}���� ����.`)
      this.openModal('event', {
        title: '����',
        portrait: c.portrait || '??',
        speaker: c.name,
        desc: `${c.name}��(��) ��å�� �����߽��ϴ�.`,
      })
    },

    triggerDeath(charId) {
      const c = this.characters[charId]
      if (!c) return
      c.isDead = true
      c.currentPost = null
      this.addLog(`?? [���] ${c.name} ���.`)
      this.openModal('event', {
        title: '���',
        portrait: c.portrait || '??',
        speaker: '����',
        desc: `${c.name}��(��) ����߽��ϴ�.`,
      })
    },
  },
})