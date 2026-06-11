// starMaps index — 전체 성계 세부맵 import
// 사용: import { getStarMap } from "@/data/base/stars/maps/index.js"

import { STAR_MAP as ALMENTPUVEL } from './230001_ALMENTPUVEL.js'
import { STAR_MAP as ALTENER } from './230002_ALTENER.js'
import { STAR_MAP as AMLITZER } from './230003_AMLITZER.js'
import { STAR_MAP as ARESHYUM } from './230004_ARESHYUM.js'
import { STAR_MAP as ASTADE } from './230005_ASTADE.js'
import { STAR_MAP as BAARAT } from './230006_BAARAT.js'
import { STAR_MAP as BARATULF } from './230007_BARATULF.js'
import { STAR_MAP as BODEN } from './230008_BODEN.js'
import { STAR_MAP as BRUNSCHWEIG } from './230009_BRUNSCHWEIG.js'
import { STAR_MAP as DAGON } from './230010_DAGON.js'
import { STAR_MAP as DOSORIA } from './230011_DOSORIA.js'
import { STAR_MAP as ECKHART } from './230012_ECKHART.js'
import { STAR_MAP as ECRUSHYLA } from './230013_ECRUSHYLA.js'
import { STAR_MAP as EISENHERZ } from './230014_EISENHERZ.js'
import { STAR_MAP as EISENHUT } from './230015_EISENHUT.js'
import { STAR_MAP as ELGON } from './230016_ELGON.js'
import { STAR_MAP as ELPACIL } from './230017_ELPACIL.js'
import { STAR_MAP as FIREZIERD } from './230018_FIREZIERD.js'
import { STAR_MAP as FREYA } from './230019_FREYA.js'
import { STAR_MAP as GANDHARVA } from './230020_GANDHARVA.js'
import { STAR_MAP as HAN } from './230021_HAN.js'
import { STAR_MAP as ISERLOHN } from './230022_ISERLOHN.js'
import { STAR_MAP as JAMSID } from './230023_JAMSID.js'
import { STAR_MAP as JOTUNHEIM } from './230024_JOTUNHEIM.js'
import { STAR_MAP as KAPCHE_LANKA } from './230025_KAPCHE_LANKA.js'
import { STAR_MAP as KASTROP } from './230026_KASTROP.js'
import { STAR_MAP as KERUM } from './230027_KERUM.js'
import { STAR_MAP as KIPOIZER } from './230028_KIPOIZER.js'
import { STAR_MAP as LEGNICA } from './230029_LEGNICA.js'
import { STAR_MAP as LICHTENLADE } from './230030_LICHTENLADE.js'
import { STAR_MAP as LIPPSTADT } from './230031_LIPPSTADT.js'
import { STAR_MAP as LITTENHEIM } from './230032_LITTENHEIM.js'
import { STAR_MAP as LOPODEN } from './230033_LOPODEN.js'
import { STAR_MAP as LUNVINI } from './230034_LUNVINI.js'
import { STAR_MAP as LUYKAS } from './230035_LUYKAS.js'
import { STAR_MAP as LUYKAS_FPA } from './230036_LUYKAS_FPA.js'
import { STAR_MAP as MARADEITA } from './230037_MARADEITA.js'
import { STAR_MAP as MARBACH } from './230038_MARBACH.js'
import { STAR_MAP as MARIENDORF } from './230039_MARIENDORF.js'
import { STAR_MAP as NEUE_LAND } from './230040_NEUE_LAND.js'
import { STAR_MAP as PALANTIA } from './230041_PALANTIA.js'
import { STAR_MAP as PHEZZAN } from './230042_PHEZZAN.js'
import { STAR_MAP as PHOREVIT } from './230043_PHOREVIT.js'
import { STAR_MAP as PORGEN } from './230044_PORGEN.js'
import { STAR_MAP as RAIGAR } from './230045_RAIGAR.js'
import { STAR_MAP as RANTEMARIO } from './230046_RANTEMARIO.js'
import { STAR_MAP as RIOPUERDE } from './230047_RIOPUERDE.js'
import { STAR_MAP as SHACHEN } from './230048_SHACHEN.js'
import { STAR_MAP as SHANDARA } from './230049_SHANDARA.js'
import { STAR_MAP as SHANDOW } from './230050_SHANDOW.js'
import { STAR_MAP as SHIVA } from './230051_SHIVA.js'
import { STAR_MAP as SPAHLA } from './230052_SPAHLA.js'
import { STAR_MAP as TANATOS } from './230053_TANATOS.js'
import { STAR_MAP as TASIRI } from './230054_TASIRI.js'
import { STAR_MAP as TIAMAT } from './230055_TIAMAT.js'
import { STAR_MAP as TRABAH } from './230056_TRABAH.js'
import { STAR_MAP as TRIPOLA } from './230057_TRIPOLA.js'
import { STAR_MAP as VALHALLA } from './230058_VALHALLA.js'
import { STAR_MAP as VANDENBERG } from './230059_VANDENBERG.js'
import { STAR_MAP as VANFLEET } from './230060_VANFLEET.js'
import { STAR_MAP as VERMILION } from './230061_VERMILION.js'
import { STAR_MAP as VILLENSTEIN } from './230062_VILLENSTEIN.js'

export const STAR_MAPS = [
  ALMENTPUVEL,
  ALTENER,
  AMLITZER,
  ARESHYUM,
  ASTADE,
  BAARAT,
  BARATULF,
  BODEN,
  BRUNSCHWEIG,
  DAGON,
  DOSORIA,
  ECKHART,
  ECRUSHYLA,
  EISENHERZ,
  EISENHUT,
  ELGON,
  ELPACIL,
  FIREZIERD,
  FREYA,
  GANDHARVA,
  HAN,
  ISERLOHN,
  JAMSID,
  JOTUNHEIM,
  KAPCHE_LANKA,
  KASTROP,
  KERUM,
  KIPOIZER,
  LEGNICA,
  LICHTENLADE,
  LIPPSTADT,
  LITTENHEIM,
  LOPODEN,
  LUNVINI,
  LUYKAS,
  LUYKAS_FPA,
  MARADEITA,
  MARBACH,
  MARIENDORF,
  NEUE_LAND,
  PALANTIA,
  PHEZZAN,
  PHOREVIT,
  PORGEN,
  RAIGAR,
  RANTEMARIO,
  RIOPUERDE,
  SHACHEN,
  SHANDARA,
  SHANDOW,
  SHIVA,
  SPAHLA,
  TANATOS,
  TASIRI,
  TIAMAT,
  TRABAH,
  TRIPOLA,
  VALHALLA,
  VANDENBERG,
  VANFLEET,
  VERMILION,
  VILLENSTEIN,
]

export const STAR_MAP_INDEX = Object.fromEntries(STAR_MAPS.map(m => [m.id, m]))

// 빠른 조회
export function getStarMap(id) { return STAR_MAP_INDEX[id] ?? null }
export function getStarMapByCode(code) { return STAR_MAPS.find(m => m.code === code) ?? null }