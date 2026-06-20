# TODO: 보로노이 영역 로직 전면 재설계

## 현재 상태 (문제점)

현재 GalaxyMap.vue의 보로노이 영역 계산은 d3-delaunay 기반이며, 다음 문제를 안고 있다:

- Sargasso 폴리곤 경계와 Voronoi 셀 경계가 정확히 일치하지 않아 **빈 틈(black gap)** 발생
- 내부 팬텀 포인트로 해결 시도 → 팬텀 셀이 Sargasso 밖으로 삐져나가는 문제 발생
- 현재 임시방편: Sargasso 폴리곤을 opacity:1로 위에 덮어 갭을 은폐 중
  - 단점: 국가 Voronoi 영역이 Sargasso 내부까지 뻗어 있음 (시각적으로만 가려짐)

## 원하는 동작

```
FPA 동맹령 | [Sargasso 해저드 패턴] | REH 제국령
```

- 국가 영역과 Sargasso 경계 사이에 빈 공간 없음
- Sargasso 폴리곤 외부로 해저드 패턴이 새어나가지 않음
- 국가 Voronoi 셀이 Sargasso 내부를 침범하지 않음

## 재설계 방향 (검토 후 결정)

### 안 A: Voronoi 셀 폴리곤 클리핑 (권장)
- 각 Voronoi 셀 패스를 Sargasso 폴리곤으로 클리핑 (Sutherland-Hodgman 알고리즘)
- Sargasso 내부에 걸친 국가 셀은 경계에서 잘라냄
- Sargasso 영역은 별도 레이어로 해저드 패턴 렌더링
- 장점: 완전히 정확한 경계 / 단점: 클리핑 연산 구현 필요

### 안 B: Canvas 기반 렌더링으로 전환
- 현재 SVG `<path>` 대신 Canvas에 직접 Voronoi + Sargasso 마스크를 픽셀 단위로 처리
- 배경 Canvas(`bgCvs`)에 별/성운과 함께 영역 색상도 그림
- 장점: 마스킹이 자유로움 / 단점: SVG 상호작용과 레이어 분리 필요

### 안 C: 팬텀 포인트 밀도 극대화
- `SARGASSO_STEP`을 5px 이하로 줄여 Voronoi 경계가 Sargasso 폴리곤과 최대한 근접
- 이후 SVG `clipPath`로 Sargasso 셀을 마스킹
- 장점: 기존 구조 유지 / 단점: 포인트 수 급증으로 성능 저하 우려

## 관련 파일

- `src/components/game/map/GalaxyMap.vue` — 보로노이 계산 및 렌더링
- `src/data/base/stars/starSystemData.js` — OBSTACLES (Sargasso 폴리곤 좌표)

## 참고

- 현재 Sargasso 폴리곤: x≈810~930, 이제르론 회랑(y:220~380), 페잔 회랑(y:680~820)
- 해저드 패턴: `#sargasso-hazard` SVG pattern (흑/황 45° 사선, 20px 단위)
- 국경선 이중선 로직(`borderEdges`)도 Sargasso 경계 처리 시 함께 고려 필요
