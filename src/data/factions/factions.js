import IDEOLOGIES from './ideologies.js'

const byCode = Object.fromEntries(IDEOLOGIES.map(i => [i.code, i]))

export { IDEOLOGIES }

export default [
  { id: 'REH', name: '은하제국',     nameJp: '銀河帝国',           nameEn: 'Galactic Empire',       color: '#c0392b', flag: '⚔️',  currency: '제국 마르크', ideologyCode: 240, ideology: byCode[240] },
  { id: 'FPA', name: '자유행성동맹', nameJp: '自由惑星同盟',        nameEn: 'Free Planets Alliance', color: '#2980b9', flag: '🛡️', currency: '동맹 디나르', ideologyCode: 100, ideology: byCode[100] },
  { id: 'PZN', name: '페잔 자치령',  nameJp: 'フェザーン自治領',    nameEn: 'Phezzan Dominion',      color: '#27ae60', flag: '💰',  currency: '페잔 골드',  ideologyCode: 180, ideology: byCode[180] },
  { id: 'EAT', name: '지구교',       nameJp: '地球教',              nameEn: 'Earth Cult',            color: '#8e44ad', flag: '✝️',  currency: '',           ideologyCode: null, ideology: null },
  { id: 'RAG', name: '라그랑그룹',   nameJp: 'ラグランスグループ',  nameEn: 'Lagrange Group',        color: '#e67e22', flag: '🕵️', currency: '',           ideologyCode: null, ideology: null },
]
