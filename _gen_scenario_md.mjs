import { SCENARIOS } from './src/data/scenarios/scenario.js'
import fs from 'fs'
import path from 'path'

const BASE = './public/img/scenarios'

for (const sc of SCENARIOS) {
  const seq = sc.id.split('_')[1]
  const dir = path.join(BASE, `${sc.yearType}${sc.year}`, seq)
  fs.mkdirSync(dir, { recursive: true })

  const factions = sc.factions.length
    ? sc.factions.map(f => f === 'REH' ? '제국' : f === 'FPA' ? '동맹' : f === 'PHZ' ? '페잔' : f).join(', ')
    : '없음'

  const appearances = sc.appearances.length
    ? sc.appearances.map(a => `- ${a}`).join('\n')
    : '- 없음'

  const descBlocks = sc.desc.map(d => {
    const libs = d.libs?.length ? d.libs.map(l => `  - ${l}`).join('\n') : '  - 없음'
    const text = (d.text || '').replace(/\s+/g, ' ').trim()
    return `### desc[${d.index}]
- image: ${d.image || '(없음 — 파일 추가 시 "01.webp" 형식으로 입력)'}
- effect: ${d.effect}
- libs:
${libs}

${text}`
  }).join('\n\n---\n\n')

  const impYear = sc.yearType === 'SE' ? `帝国暦 ${sc.year - 309}年` : ''
  const yearLine = sc.yearType === 'SE'
    ? `SE ${sc.year}년 (제국력 ${sc.year - 309}년)${sc.month ? ' ' + sc.month + '월' : ''}`
    : `${sc.yearType} ${sc.year}년${sc.month ? ' ' + sc.month + '월' : ''}`

  const content = `# ${sc.nameKr}
${sc.nameEn ? `> ${sc.nameEn}` : ''}
${sc.nameJp ? `> ${sc.nameJp}` : ''}

## 기본 정보

| 항목 | 값 |
|---|---|
| id | ${sc.id} |
| 연도 | ${yearLine} |
| 세력 | ${factions} |
| 태그 | ${sc.tags.join(', ')} |
| 플레이 가능 | ${sc.useYn ? '✅' : '❌'} |
| 오픈 포인트 | ${sc.openPt} |

## 출처

${appearances}

## 이미지 경로

\`public/img/scenarios/${sc.yearType}${sc.year}/${seq}/\`

## desc

${descBlocks}
`.trimStart()

  const filename = `${sc.nameKr}.md`
  fs.writeFileSync(path.join(dir, filename), content, 'utf8')
}

console.log(`✅ ${SCENARIOS.length}개 md 파일 생성 완료`)
