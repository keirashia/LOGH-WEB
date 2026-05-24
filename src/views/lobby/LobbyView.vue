<template>
  <div class="lobby-wrap">
    <canvas ref="cvs" class="starfield"/>
    <div class="lobby-layout">
      <header class="lobby-hdr">
        <button class="btn" @click="$router.push('/')">← 타이틀</button>
        <div class="hdr-center">
          <span class="serif gold" style="font-size:18px;letter-spacing:2px">로비</span>
          <span class="dim mono" style="font-size:11px">{{ auth.username }}</span>
        </div>
        <div class="hdr-right">
          <button class="btn" @click="$router.push('/encyclopedia')">📖 사전</button>
          <button class="btn" @click="$router.push('/tutorial')">🎓 튜토리얼</button>
          <button v-if="auth.isAdmin" class="btn btn-red" @click="$router.push('/admin')">⚙️ 관리자</button>
        </div>
      </header>

      <!-- 멀티/싱글 선택 -->
      <div class="mode-select" v-if="!mode">
        <button class="mode-btn" @click="mode='multi'">
          <span class="mb-icon">🌌</span>
          <span class="mb-title serif">멀티플레이</span>
          <span class="mb-desc dim">시즌 서버에 접속하여 다른 플레이어와 대결</span>
        </button>
        <button class="mode-btn" @click="mode='single'">
          <span class="mb-icon">⚔️</span>
          <span class="mb-title serif">싱글플레이</span>
          <span class="mb-desc dim">AI와 대결하거나 역사를 재현</span>
        </button>
      </div>

      <!-- 싱글 → 시나리오 선택 -->
      <div class="single-area" v-if="mode==='single'">
        <button class="back-btn btn" @click="mode=null">← 뒤로</button>
        <div class="sc-body">
          <div class="sc-list">
            <button v-for="sc in SCENARIOS" :key="sc.id"
                    class="sc-item" :class="{ active: selSc?.id===sc.id }"
                    @click="selSc=sc; selFac=sc.recommend">
              <div class="mono dim" style="font-size:10px;letter-spacing:2px">SCN.{{ String(sc.id).padStart(2,'0') }}</div>
              <div class="serif" style="font-size:13px;margin:3px 0">{{ sc.name }}</div>
              <div class="mono dim" style="font-size:10px">우주력 {{ sc.year }}년</div>
            </button>
          </div>
          <div class="sc-detail panel" v-if="selSc">
            <div class="serif gold" style="font-size:20px">{{ selSc.name }}</div>
            <div class="mono dim" style="font-size:11px">우주력 {{ selSc.year }}년 / 제국력 {{ selSc.impYear }}년</div>
            <p class="dim" style="font-size:12px;line-height:1.8;margin-top:4px">{{ selSc.desc }}</p>
            <div class="dim" style="font-size:11px;letter-spacing:1px;margin-top:8px">세력 선택</div>
            <div class="fs-grid">
              <button v-for="(f,fid) in FACTIONS" :key="fid"
                      class="fs-btn" :class="{ ['sel-'+fid]: selFac===fid }"
                      @click="selFac=fid">
                <span style="font-size:20px">{{ f.flag }}</span>
                <span class="serif" style="font-size:11px">{{ f.name }}</span>
                <span class="dim" style="font-size:9px;font-family:var(--font-mono)">{{ f.ideology }}</span>
              </button>
            </div>
            <div class="leader-row" v-if="leader">
              <span style="font-size:28px">{{ leader.portrait }}</span>
              <div>
                <div class="serif">{{ leader.name }}</div>
                <div class="dim" style="font-size:10px">{{ leader.rank }}</div>
                <div class="mono dim" style="font-size:10px;font-style:italic;margin-top:2px">"{{ leader.quote }}"</div>
              </div>
            </div>
            <button class="btn btn-gold start-btn serif" :disabled="!selFac" @click="startSingle">
              ⚔️ 게임 시작
            </button>
          </div>
          <div class="sc-empty panel" v-else>
            <span class="dim serif">← 시나리오를 선택하세요</span>
          </div>
        </div>
      </div>

      <!-- 멀티 → 시즌 선택 (Phase3 대비 껍데기) -->
      <div class="multi-area" v-if="mode==='multi'">
        <button class="back-btn btn" @click="mode=null">← 뒤로</button>
        <div class="multi-inner">
          <div class="season-card panel" v-for="s in season.seasons" :key="s.id">
            <div class="sc-badge" :class="s.status">{{ s.status==='active'?'진행 중':'종료' }}</div>
            <div class="serif gold" style="font-size:18px">역사 {{ s.id }}기</div>
            <div class="mono dim" style="font-size:11px">시작: {{ s.startDate }}</div>
            <div class="mono dim" style="font-size:11px" v-if="s.winner">승리: {{ s.winner }}</div>
            <button class="btn btn-blue" style="margin-top:10px;width:100%;justify-content:center"
                    :disabled="s.status!=='active'" @click="joinSeason(s.id)">
              {{ s.status==='active' ? '접속' : '역사 보기' }}
            </button>
          </div>
          <div class="multi-notice dim">
            <span>🔧 멀티플레이 서버는 준비 중입니다.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { useAuthStore }  from '@/stores/authStore'
import { useSeasonStore } from '@/stores/seasonStore'
import { SCENARIOS, FACTIONS, CHARACTERS } from '@/data/masterData'

const router = useRouter()
const route  = useRoute()
const game   = useGameStore()
const auth   = useAuthStore()
const season = useSeasonStore()

const cvs    = ref(null)
const mode   = ref(route.query.mode || null)
const selSc  = ref(null)
const selFac = ref(null)
let aid = null

watch(() => route.query.mode, (value) => {
  mode.value = value || null
})

const leader = computed(() => {
  if (!selFac.value) return null
  return CHARACTERS[FACTIONS[selFac.value].leader]
})

function startSingle() {
  if (!selSc.value || !selFac.value) return
  game.startGame(selSc.value.id, selFac.value)
  router.push('/game')
}

function joinSeason(id) {
  // Phase3 구현
  alert('멀티플레이 서버 준비 중입니다.')
}

onMounted(() => {
  const c = cvs.value, ctx = c.getContext('2d')
  let w = c.width = innerWidth, h = c.height = innerHeight
  const stars = Array.from({length:200},()=>({
    x:Math.random()*w,y:Math.random()*h,r:Math.random()*1+.1,tw:Math.random()*Math.PI*2,sp:Math.random()*.2+.02,
  }))
  function draw() {
    ctx.fillStyle='#020508';ctx.fillRect(0,0,w,h)
    stars.forEach(s=>{
      s.tw+=.01;s.x-=s.sp;if(s.x<0){s.x=w;s.y=Math.random()*h}
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
      ctx.fillStyle=`rgba(200,220,255,${.12+Math.sin(s.tw)*.2})`;ctx.fill()
    })
    aid=requestAnimationFrame(draw)
  }
  draw()
  onUnmounted(()=>cancelAnimationFrame(aid))
})
</script>

<style scoped>
.lobby-wrap{position:relative;width:100%;height:100vh;overflow:hidden}
.starfield{position:absolute;inset:0;z-index:0}
.lobby-layout{position:relative;z-index:1;display:flex;flex-direction:column;height:100%;padding:14px 18px;gap:12px}
.lobby-hdr{display:flex;align-items:center;gap:12px;flex-shrink:0}
.hdr-center{display:flex;align-items:center;gap:10px;margin:0 auto}
.hdr-right{display:flex;gap:7px;margin-left:auto}
/* 모드 선택 */
.mode-select{flex:1;display:flex;align-items:center;justify-content:center;gap:24px}
.mode-btn{display:flex;flex-direction:column;align-items:center;gap:10px;padding:32px 40px;background:var(--bg3);border:1px solid var(--bd);border-radius:var(--r);cursor:pointer;transition:all .2s;min-width:200px}
.mode-btn:hover{background:var(--bgh);border-color:var(--bdg);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.4)}
.mb-icon{font-size:44px}
.mb-title{font-size:18px;letter-spacing:2px}
.mb-desc{font-size:11px;text-align:center;line-height:1.6;max-width:160px}
/* 싱글 영역 */
.single-area{flex:1;display:flex;flex-direction:column;gap:10px;overflow:hidden}
.back-btn{align-self:flex-start}
.sc-body{display:flex;gap:12px;flex:1;overflow:hidden}
.sc-list{width:190px;flex-shrink:0;display:flex;flex-direction:column;gap:6px;overflow-y:auto}
.sc-item{text-align:left;padding:11px;background:var(--bg3);border:1px solid var(--bd);border-radius:var(--r);cursor:pointer;transition:all .15s}
.sc-item:hover{background:var(--bgh)}
.sc-item.active{border-color:var(--tg);background:rgba(212,170,96,.08)}
.sc-detail,.sc-empty{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:12px}
.sc-empty{align-items:center;justify-content:center;font-size:16px}
.fs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
.fs-btn{display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 4px;border:1px solid var(--bd);border-radius:var(--r);background:var(--bg4);cursor:pointer;transition:all .15s}
.fs-btn.sel-EMPIRE{border-color:var(--empire);background:rgba(192,57,43,.18)}
.fs-btn.sel-ALLIANCE{border-color:var(--alliance);background:rgba(41,128,185,.18)}
.fs-btn.sel-PHEZZAN{border-color:var(--phezzan);background:rgba(39,174,96,.18)}
.leader-row{display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg4);border-radius:var(--r)}
.start-btn{width:100%;justify-content:center;padding:12px;font-size:15px;letter-spacing:2px;margin-top:auto}
/* 멀티 영역 */
.multi-area{flex:1;display:flex;flex-direction:column;gap:10px;overflow:hidden}
.multi-inner{display:flex;gap:14px;flex-wrap:wrap;overflow-y:auto;padding:4px}
.season-card{padding:18px;min-width:200px;position:relative}
.sc-badge{font-size:10px;font-family:var(--font-mono);padding:2px 8px;border-radius:3px;display:inline-block;margin-bottom:8px}
.sc-badge.active{background:rgba(39,174,96,.2);color:var(--phezzan)}
.sc-badge.ended{background:rgba(100,100,100,.2);color:var(--t2)}
.multi-notice{padding:20px;font-size:12px;text-align:center;width:100%}
</style>