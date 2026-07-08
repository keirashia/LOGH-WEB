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
  const allHidden = ref(false)
  const hidden    = ref({})

  // TODO: DB(helpData.js) 로드 후 localStorage set → 여기서 store 세팅으로 확장
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
    writeLS(false, hidden.value)
  }

  function hideThis(id) {
    hidden.value = { ...hidden.value, [id]: true }
    writeLS(allHidden.value, hidden.value)
  }

  return { init, shouldShow, hideAll, showHelp, hideThis, allHidden }
})
