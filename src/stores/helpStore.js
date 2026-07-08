import { defineStore } from 'pinia'
import { ref } from 'vue'

const LS_KEY = 'logh_help_seen'

function readLS() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? 'null') ?? { allHidden: false, hidden: {} }
  } catch { return { allHidden: false, hidden: {} } }
}

function writeLS(allHidden, hidden) {
  localStorage.setItem(LS_KEY, JSON.stringify({ allHidden, hidden }))
}

export const useHelpStore = defineStore('help', () => {
  // store 생성 시 localStorage에서 즉시 초기화
  const _s        = readLS()
  const allHidden = ref(_s.allHidden ?? false)
  const hidden    = ref(_s.hidden    ?? {})

  // TODO: DB(helpData.js) 로드 후 localStorage set → store 갱신으로 확장
  function init() {
    const s = readLS()
    allHidden.value = s.allHidden ?? false
    hidden.value    = s.hidden    ?? {}
  }

  function shouldShow(id) {
    return !allHidden.value && !hidden.value[id]
  }

  function hideAll() {
    allHidden.value = true
    writeLS(true, hidden.value)
  }

  function showHelp() {
    allHidden.value = false
    hidden.value    = {}
    writeLS(false, {})
  }

  function hideThis(id) {
    hidden.value = { ...hidden.value, [id]: true }
    writeLS(allHidden.value, hidden.value)
  }

  return { init, shouldShow, hideAll, showHelp, hideThis, allHidden }
})
