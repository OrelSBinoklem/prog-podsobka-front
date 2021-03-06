import Cookies from 'js-cookie'
import * as types from './mutation-types'

// state
export const state = () => ({
  locale: process.env.appLocale,
  locales: {
    en: 'EN',
    'zh-CN': '中文',
    ru: 'RU'
  }
})

// getters
export const getters = {
  locale: state => state.locale,
  locales: state => state.locales
}

// mutations
export const mutations = {
  [types.SET_LOCALE] (state, { locale }) {
    state.locale = locale
  }
}

// actions
export const actions = {
  setLocale ({ commit }, { locale }) {
    commit(types.SET_LOCALE, { locale })

    Cookies.set('locale', locale, { expires: 365 })
  }
}
