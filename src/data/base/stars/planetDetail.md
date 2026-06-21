// // ================================================================
// //  base/stars/planetDetail.js — 행성 기본 데이터
// //  ※ name/faction은 LOGH-WEB 프로젝트 기준 (게임 DB 이름과 차이 있을 수 있음)
// //  ※ 주석 데이터 출처: 은하영웅전설 IV EX 에디터 (RC 487 시나리오 상태)
// //  ※ econMax=최대경제력  defCur=현재방어력  defBase=방어기지수  garrison=주둔기지수
// //  ※ TODO: 미수집 → 에디터에서 해당 행성 직접 확인 필요
// //  ※ 게임DB없음 → 원작 소설 기준 추가 항목 (게임 원본에 없음)
// // ================================================================

// export const PLANET_DETAIL = [

//   // ── REH 은하제국 ───────────────────────────────────────────────

//   // 230001 알멘트푸벨
//   { code: '230001P01', starCode: '230001', name: '바텐-도라흐',     faction: 'REH' },
//   // econMax=2100 defCur=3500 defBase=5 garrison=0 | 지지율=78

//   // 230002 알테너 (가이에스부르크 요새 성계)
//   { code: '230002P01', starCode: '230002', name: '가이에스부르크',   faction: 'REH' },
//   // econMax=0 defCur=-15536 defBase=90 garrison=5 | 지지율=93 ※요새
//   { code: '230002P02', starCode: '230002', name: '헤세-카셀',        faction: 'REH' },
//   // TODO: 미수집

//   // 230003 암릿처
//   { code: '230003P01', starCode: '230003', name: '클라인겔트',       faction: 'REH' },
//   // econMax=750 defCur=3500 defBase=5 garrison=0 | 지지율=68
//   { code: '230003P02', starCode: '230003', name: '도벨그',           faction: 'REH' },
//   // econMax=600 defCur=3500 | 지지율=68
//   { code: '230003P03', starCode: '230003', name: '모르겐',           faction: 'REH' },
//   // econMax=750 defCur=3500 | 지지율=68

//   // 230008 보덴
//   { code: '230008P01', starCode: '230008', name: '보르소른',         faction: 'REH' },
//   // econMax=900 defCur=3500 | 지지율=75
//   { code: '230008P02', starCode: '230008', name: '빌로스트',         faction: 'REH' },
//   // econMax=900 defCur=3500 | 지지율=75
//   { code: '230008P03', starCode: '230008', name: '알비스',           faction: 'REH' },
//   // econMax=900 defCur=3500 | 지지율=75
//   { code: '230008P04', starCode: '230008', name: '단크',             faction: 'REH' },
//   // 게임DB없음 (원작 소설 기준)

//   // 230009 브라운슈바이크
//   { code: '230009P01', starCode: '230009', name: '톤도르프',         faction: 'REH' },
//   // econMax=1800 defCur=3500 defBase=5 garrison=1 | 지지율=83
//   { code: '230009P02', starCode: '230009', name: '베스타란트',       faction: 'REH' },
//   // TODO: 미수집

//   // 230012 에크하르트
//   { code: '230012P01', starCode: '230012', name: '자크스-코프르크',  faction: 'REH' },
//   // econMax=1200 defCur=3500 defBase=5 garrison=0 | 지지율=63

//   // 230014 아이젠헤르츠
//   { code: '230014P01', starCode: '230014', name: '베스트파리아',     faction: 'REH' },
//   // econMax=750 defCur=3500 defBase=5 garrison=0 | 지지율=68
//   { code: '230014P02', starCode: '230014', name: '디사우',           faction: 'REH' },
//   // econMax=750 defCur=3500 | 지지율=68

//   // 230015 아이젠후트
//   { code: '230015P01', starCode: '230015', name: '다룸슈타트',       faction: 'REH' },
//   // econMax=2400 defCur=3500 defBase=5 garrison=0 | 지지율=74

//   // 230019 프레이아
//   { code: '230019P01', starCode: '230019', name: '렌텐베르크',       faction: 'REH' },
//   // econMax=0 defCur=30000 | 지지율=91 ※요새
//   { code: '230019P02', starCode: '230019', name: '니플헤임',         faction: 'REH' },
//   // econMax=2250 defCur=6000 defBase=10 garrison=0 | 지지율=91

//   // 230021 하안
//   { code: '230021P01', starCode: '230021', name: '자르펠트',         faction: 'REH' },
//   // econMax=1500 defCur=3500 defBase=5 garrison=0 | 지지율=62

//   // 230022 알테나 (이제르론 요새 성계)
//   { code: '230022P01', starCode: '230022', name: '이제르론',         faction: 'REH' },
//   // econMax=0 defCur=-10536 defBase=100 garrison=5 | 지지율=93 ※요새

//   // 230024 요툰하임
//   { code: '230024P01', starCode: '230024', name: '로스바흐',         faction: 'REH' },
//   // econMax=1800 defCur=3500 defBase=5 garrison=0 | 지지율=73

//   // 230025 (미등록 성계)
//   { code: '230025P01', starCode: '230025', name: '',                 faction: 'REH' },
//   // 게임DB없음

//   // 230026 카스트로프
//   { code: '230026P01', starCode: '230026', name: '카스트로프',       faction: 'REH' },
//   // 게임DB없음 (원작 소설 기준)
//   { code: '230026P02', starCode: '230026', name: '라파트',           faction: 'REH' },
//   // 게임DB없음 (원작 소설 기준)
//   { code: '230026P03', starCode: '230026', name: '케니히그라흐',     faction: 'REH' },
//   // econMax=3750 defCur=3500 defBase=5 garrison=0 | 지지율=92

//   // 230027 (미등록 성계)
//   { code: '230027P01', starCode: '230027', name: '',                 faction: 'REH' },
//   // 게임DB없음

//   // 230028 키포이져
//   { code: '230028P01', starCode: '230028', name: '가르미슈',         faction: 'REH' },
//   // econMax=0 defCur=30000 | 지지율=81 ※요새 (게임명: 가슈미르)
//   { code: '230028P02', starCode: '230028', name: '스루즈헤임',       faction: 'REH' },
//   // econMax=1500 defCur=6000 defBase=10 garrison=0 | 지지율=81
//   { code: '230028P03', starCode: '230028', name: '가랴르호른',       faction: 'REH' },
//   // econMax=1350 defCur=6000 | 지지율=81

//   // 230030 리히텐라데
//   { code: '230030P01', starCode: '230030', name: '에르힌겐',         faction: 'REH' },
//   // econMax=4800 defCur=3500 defBase=5 garrison=0 | 지지율=88

//   // 230031 (미등록 성계)
//   { code: '230031P01', starCode: '230031', name: '',                 faction: 'REH' },
//   // 게임DB없음

//   // 230032 리텐하임
//   { code: '230032P01', starCode: '230032', name: '퀴스트린',         faction: 'REH' },
//   // econMax=1800 defCur=6000 defBase=10 garrison=1 | 지지율=78
//   { code: '230032P02', starCode: '230032', name: '에르뮐',           faction: 'REH' },
//   // TODO: 미수집 (게임명: 에크뮐)

//   // 230038 마르바흐
//   { code: '230038P01', starCode: '230038', name: '민덴',             faction: 'REH' },
//   // econMax=3300 defCur=3500 defBase=5 garrison=0 | 지지율=81

//   // 230039 마린도르프
//   { code: '230039P01', starCode: '230039', name: '테레젠슈타트',     faction: 'REH' },
//   // econMax=2700 defCur=3500 defBase=5 garrison=0 | 지지율=86

//   // 230040 (미등록 성계)
//   { code: '230040P01', starCode: '230040', name: '',                 faction: 'REH' },
//   // 게임DB없음

//   // 230044 포르겐 ※ 기존 하펜→게임 원본(뤼겐/야반하르/반스테이드)으로 수정
//   { code: '230044P01', starCode: '230044', name: '뤼겐',             faction: 'REH' },
//   // econMax=600 defCur=3500 defBase=5 garrison=0 | 지지율=70
//   { code: '230044P02', starCode: '230044', name: '야반하르',         faction: 'REH' },
//   // econMax=600 defCur=3500 | 지지율=70
//   { code: '230044P03', starCode: '230044', name: '반스테이드',       faction: 'REH' },
//   // econMax=600 defCur=3500 | 지지율=70

//   // 230048 샤헨
//   { code: '230048P01', starCode: '230048', name: '슈바르츠부르크',   faction: 'REH' },
//   // econMax=1800 defCur=3500 defBase=5 garrison=0 | 지지율=68

//   // 230050 샨타우
//   { code: '230050P01', starCode: '230050', name: '에스링그',         faction: 'REH' },
//   // TODO: 미수집
//   { code: '230050P02', starCode: '230050', name: '크네스도르프',     faction: 'REH' },
//   // TODO: 미수집
//   { code: '230050P03', starCode: '230050', name: '폰트노이',         faction: 'REH' },
//   // econMax=1500 defCur=3500 defBase=5 garrison=0 | 지지율=98

//   // 230056 트라바흐
//   { code: '230056P01', starCode: '230056', name: '호포키르히',       faction: 'REH' },
//   // econMax=1950 defCur=3500 defBase=5 garrison=0 | 지지율=88
//   { code: '230056P02', starCode: '230056', name: '비텐베르크',       faction: 'REH' },
//   // TODO: 미수집

//   // 230058 발할라 (제국 수도)
//   { code: '230058P01', starCode: '230058', name: '오딘',             faction: 'REH' },
//   // econMax=4950 defCur=3500 defBase=5 garrison=18 | 지지율=93
//   { code: '230058P02', starCode: '230058', name: '아스가르즈',       faction: 'REH' },
//   // econMax=1800 defCur=6000 | 지지율=93
//   { code: '230058P03', starCode: '230058', name: '유그드라실',       faction: 'REH' },
//   // TODO: 미수집

//   // 230059 바르텐베르크
//   { code: '230059P01', starCode: '230059', name: '브렌하임',         faction: 'REH' },
//   // econMax=1200 defCur=3500 defBase=5 garrison=0 | 지지율=72
//   { code: '230059P02', starCode: '230059', name: '카르슈타트',       faction: 'REH' },
//   // econMax=1200 defCur=3500 | 지지율=72

//   // 230062 빌렌슈타인 ※ 야반하르는 포르겐(230044) 소속 — 이 항목에서 제거
//   { code: '230062P01', starCode: '230062', name: '레오폴트슈타트',   faction: 'REH' },
//   // econMax=1800 defCur=3500 defBase=5 garrison=0 | 지지율=81
//   { code: '230062P02', starCode: '230062', name: '그라츠',           faction: 'REH' },
//   // econMax=1500 defCur=3500 | 지지율=81

//   // 230066 리히텐부르크 (페잔 회랑 제국쪽 출구)
//   { code: '230066P01', starCode: '230066', name: '',                 faction: 'REH' },
//   // 게임DB없음

//   // 230067 뮈켄베르거
//   { code: '230067P01', starCode: '230067', name: '',                 faction: 'REH' },
//   // 게임DB없음

//   // 230069 테라 (지구)
//   { code: '230069P01', starCode: '230069', name: '지구',             faction: 'REH' },
//   // 게임DB없음

//   // ── FPA 자유행성동맹 ───────────────────────────────────────────

//   // 230004 아레스하임
//   { code: '230004P01', starCode: '230004', name: '탄므즈',           faction: 'FPA' },
//   // econMax=150 defCur=1000 defBase=0 garrison=0 | 지지율=95

//   // 230005 아스타테
//   { code: '230005P01', starCode: '230005', name: '아트라-하시스',    faction: 'FPA' },
//   // econMax=45 defCur=1000 defBase=0 garrison=0 | 지지율=62
//   { code: '230005P02', starCode: '230005', name: '아스페륀',         faction: 'FPA' },
//   // TODO: 미수집
//   { code: '230005P03', starCode: '230005', name: '우가리트',         faction: 'FPA' },
//   // TODO: 미수집

//   // 230006 바라트 (동맹 수도)
//   { code: '230006P01', starCode: '230006', name: '하이네센',         faction: 'FPA' },
//   // econMax=9750 defCur=11000 defBase=20 garrison=18 | 지지율=98
//   { code: '230006P02', starCode: '230006', name: '테르누젠',         faction: 'FPA' },
//   // TODO: 미수집
//   { code: '230006P03', starCode: '230006', name: '스리나가르',       faction: 'FPA' },
//   // TODO: 미수집 (게임명: 시뤼나갈)

//   // 230007 바라투르프
//   { code: '230007P01', starCode: '230007', name: '프르샤-스쿠타',    faction: 'FPA' },
//   // econMax=150 defCur=1000 defBase=0 garrison=0 | 지지율=96

//   // 230010 다곤
//   { code: '230010P01', starCode: '230010', name: '카프튜랑카',       faction: 'FPA' },
//   // econMax=150 defCur=1500 defBase=1 garrison=1 | 지지율=95

//   // 230011 도리아
//   { code: '230011P01', starCode: '230011', name: '델모퓌라이',       faction: 'FPA' },
//   // econMax=600 defCur=11000 | 지지율=65
//   { code: '230011P02', starCode: '230011', name: '보이오이아',       faction: 'FPA' },
//   // econMax=600 defCur=3500 defBase=5 garrison=0 | 지지율=65

//   // 230013 엘류세라
//   { code: '230013P01', starCode: '230013', name: '악타이온',         faction: 'FPA' },
//   // econMax=2250 defCur=3500 defBase=5 garrison=0 | 지지율=83

//   // 230016 엘곤
//   { code: '230016P01', starCode: '230016', name: '샴프르',           faction: 'FPA' },
//   // econMax=1500 defCur=3500 defBase=5 garrison=0 | 지지율=76
//   { code: '230016P02', starCode: '230016', name: '보프-마나프',      faction: 'FPA' },
//   // econMax=900 defCur=3500 | 지지율=76
//   { code: '230016P03', starCode: '230016', name: '메헤라브',         faction: 'FPA' },
//   // econMax=1200 defCur=3500 | 지지율=76

//   // 230017 엘-파실
//   { code: '230017P01', starCode: '230017', name: '엘-파실',          faction: 'FPA' },
//   // econMax=900 defCur=3500 defBase=5 garrison=1 | 지지율=73
//   { code: '230017P02', starCode: '230017', name: '에스트레마도라',   faction: 'FPA' },
//   // TODO: 미수집

//   // 230018 파이어자드
//   { code: '230018P01', starCode: '230018', name: '우가리트',         faction: 'FPA' },
//   // econMax=150 defCur=1500 defBase=1 garrison=0 | 지지율=97
//   { code: '230018P02', starCode: '230018', name: '라트보트',         faction: 'FPA' },
//   // econMax=150 defCur=1500 | 지지율=97

//   // 230020 간다르바
//   { code: '230020P01', starCode: '230020', name: '우르바시',         faction: 'FPA' },
//   // econMax=1350 defCur=3500 defBase=5 garrison=0 | 지지율=73
//   { code: '230020P02', starCode: '230020', name: '프라바스',         faction: 'FPA' },
//   // econMax=1350 defCur=3500 | 지지율=73

//   // 230023 잠시드
//   { code: '230023P01', starCode: '230023', name: '다프테-잠시드',    faction: 'FPA' },
//   // econMax=2250 defCur=3500 defBase=5 garrison=0 | 지지율=88
//   { code: '230023P02', starCode: '230023', name: '카퍼',             faction: 'FPA' },
//   // TODO: 미수집

//   // 230029 (미등록 성계)
//   { code: '230029P01', starCode: '230029', name: '',                 faction: 'FPA' },
//   // 게임DB없음

//   // 230033 로포덴
//   { code: '230033P01', starCode: '230033', name: '키베론',           faction: 'FPA' },
//   // econMax=450 defCur=6000 defBase=10 garrison=0 | 지지율=86
//   { code: '230033P02', starCode: '230033', name: '루드밀라',         faction: 'FPA' },
//   // TODO: 미수집

//   // 230034 룬비니
//   { code: '230034P01', starCode: '230034', name: '카스티리오네',     faction: 'FPA' },
//   // econMax=150 defCur=1500 defBase=1 garrison=0 | 지지율=98

//   // 230035 뤼카스
//   { code: '230035P01', starCode: '230035', name: '비트리아',         faction: 'FPA' },
//   // econMax=2250 defCur=3500 defBase=5 garrison=0 | 지지율=78

//   // 230036 (미등록 성계)
//   { code: '230036P01', starCode: '230036', name: '',                 faction: 'FPA' },
//   // 게임DB없음

//   // 230037 마르-아데타
//   { code: '230037P01', starCode: '230037', name: '파프라비',         faction: 'FPA' },
//   // econMax=150 defCur=1500 defBase=1 garrison=0 | 지지율=97

//   // 230041 팔란티아
//   { code: '230041P01', starCode: '230041', name: '케르코포르타',     faction: 'FPA' },
//   // econMax=150 defCur=1500 defBase=1 garrison=0 | 지지율=97

//   // 230043 포레비트
//   { code: '230043P01', starCode: '230043', name: '루지아나',         faction: 'FPA' },
//   // econMax=150 defCur=6000 defBase=10 garrison=0 | 지지율=73

//   // 230045 라이갈
//   { code: '230045P01', starCode: '230045', name: '마그-토레드',      faction: 'FPA' },
//   // econMax=2400 defCur=3500 defBase=5 garrison=0 | 지지율=72

//   // 230046 란테마리오
//   { code: '230046P01', starCode: '230046', name: '라티고스트',       faction: 'FPA' },
//   // econMax=150 defCur=3500 defBase=5 garrison=0 | 지지율=84
//   { code: '230046P02', starCode: '230046', name: '스벤트비트',       faction: 'FPA' },
//   // econMax=150 defCur=6000 | 지지율=84
//   { code: '230046P03', starCode: '230046', name: '야로비트',         faction: 'FPA' },
//   // econMax=150 defCur=3500 | 지지율=84

//   // 230047 리오-베르데
//   { code: '230047P01', starCode: '230047', name: '아로요-드-모리노', faction: 'FPA' },
//   // econMax=2550 defCur=3500 | 지지율=92
//   { code: '230047P02', starCode: '230047', name: '카시나',           faction: 'FPA' },
//   // econMax=2550 defCur=3500 defBase=5 garrison=0 | 지지율=92

//   // 230049 샨다르아
//   { code: '230049P01', starCode: '230049', name: '알에리스',         faction: 'FPA' },
//   // econMax=150 defCur=1500 defBase=1 garrison=0 | 지지율=95

//   // 230051 시바
//   { code: '230051P01', starCode: '230051', name: '미트라',           faction: 'FPA' },
//   // TODO: 미수집
//   { code: '230051P02', starCode: '230051', name: '지비에',           faction: 'FPA' },
//   // econMax=1800 defCur=3500 defBase=5 garrison=0 | 지지율=79

//   // 230052 슈팔라
//   { code: '230052P01', starCode: '230052', name: '에레키슈갈',       faction: 'FPA' },
//   // econMax=150 defCur=1500 defBase=1 garrison=0 | 지지율=99

//   // 230053 타나투스 (포로수용소 에코니아)
//   { code: '230053P01', starCode: '230053', name: '에코니아',         faction: 'FPA' },
//   // econMax=2400 defCur=3500 defBase=5 garrison=0 | 지지율=84
//   { code: '230053P02', starCode: '230053', name: '마스지드',         faction: 'FPA' },
//   // econMax=2400 defCur=3500 | 지지율=84

//   // 230054 타실리
//   { code: '230054P01', starCode: '230054', name: '파라스',           faction: 'FPA' },
//   // econMax=900 defCur=11000 defBase=20 garrison=0 | 지지율=78

//   // 230055 티아메트
//   { code: '230055P01', starCode: '230055', name: '라므',             faction: 'FPA' },
//   // econMax=75 defCur=1000 defBase=0 garrison=0 | 지지율=65
//   { code: '230055P02', starCode: '230055', name: '안샤르',           faction: 'FPA' },
//   // TODO: 미수집
//   { code: '230055P03', starCode: '230055', name: '레그니처',         faction: 'FPA' },
//   // 게임DB없음 (원작 소설 기준)
//   { code: '230055P04', starCode: '230055', name: '카프체란카',       faction: 'FPA' },
//   // 게임DB없음 (원작 소설 기준)

//   // 230057 트리플라
//   { code: '230057P01', starCode: '230057', name: '팔머랜드',         faction: 'FPA' },
//   // econMax=1800 defCur=3500 defBase=5 garrison=0 | 지지율=81

//   // 230060 밴플리트
//   { code: '230060P01', starCode: '230060', name: '카토르브러',       faction: 'FPA' },
//   // econMax=150 defCur=1000 defBase=0 garrison=0 | 지지율=93

//   // 230061 버밀리온
//   { code: '230061P01', starCode: '230061', name: '몽마라유',         faction: 'FPA' },
//   // econMax=1200 defCur=3500 defBase=5 garrison=0 | 지지율=79

//   // 230063 케림
//   { code: '230063P01', starCode: '230063', name: '네프티스',         faction: 'FPA' },
//   // econMax=2700 defCur=6000 defBase=10 garrison=0 | 지지율=87
//   { code: '230063P02', starCode: '230063', name: '이제크온',         faction: 'FPA' },
//   // TODO: 미수집

//   // 230065 샤텐부르크 (페잔 회랑 동맹쪽 출구)
//   { code: '230065P01', starCode: '230065', name: '',                 faction: 'FPA' },
//   // 게임DB없음

//   // 230068 포르세티
//   { code: '230068P01', starCode: '230068', name: '네페르카프타흐',   faction: 'FPA' },
//   // econMax=150 defCur=1500 defBase=1 garrison=0 | 지지율=96

//   // ── PZN 페잔 자치령 ────────────────────────────────────────────

//   // 230042 페잔
//   { code: '230042P01', starCode: '230042', name: '페잔',             faction: 'PZN' },
//   // econMax=18000 defCur=1000 defBase=0 garrison=12 | 지지율=100

// ]
