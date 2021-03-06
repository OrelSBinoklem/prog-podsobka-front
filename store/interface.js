import Cookies from 'js-cookie'
import _ from 'lodash'
import * as types from './mutation-types'

// state
export const state = () => ({
  menuCollapsed: String(Cookies.get('interface.menu.collapsed')) === 'true',
  priorityCopyTypeCode: appHelper.isJsonString(Cookies.get('interface.priorityCopyTypeCode')) && JSON.parse(Cookies.get('interface.priorityCopyTypeCode')) || {},
  hashGroups: {},
  navHashes: [],
  filterPlugins: appHelper.isJsonString(Cookies.get('interface.filterPlugins')) && JSON.parse(Cookies.get('interface.filterPlugins')) || {},
  filterMenuNavPlugins: Cookies.get('interface.filterMenuNavPlugins') || null,
  filterCatsMenuNavPlugins: appHelper.isJsonString(Cookies.get('interface.filterCatsMenuNavPlugins')) && JSON.parse(Cookies.get('interface.filterCatsMenuNavPlugins')) || [],
  cardsOrListPlugins: 'cards',
  curListCategory: null,
  showTour: appHelper.isJsonString(Cookies.get('interface.showTour')) && JSON.parse(Cookies.get('interface.showTour')) || {},
})

// getters
export const getters = {
  menuCollapsed: (state) => {return state.menuCollapsed},
  priorityCopyTypeCode: (state) => {return state.priorityCopyTypeCode},
  hashGroups: (state) => {return state.hashGroups},
  navHashes: (state) => {return state.navHashes},

  filterPlugins: (state) => {return state.filterPlugins},
  filterMenuNavPlugins: (state) => {return state.filterMenuNavPlugins},
  filterCatsMenuNavPlugins: (state) => {return state.filterCatsMenuNavPlugins},
  cardsOrListPlugins: (state) => {return state.cardsOrListPlugins},
  curListCategory: (state) => {return state.curListCategory},
  showTour: (state) => (slug) => {return state.showTour[slug]},
}

// mutations
export const mutations = {
  [types.SET_MENU_COLLAPSED] (state, collapsed) {
    state.menuCollapsed = collapsed
    Cookies.set('interface.menu.collapsed', collapsed, { expires: 7 })
  },

  [types.SET_PRIORITY_COPY_TYPE_CODE_STATE] (state, payload) {
    state.priorityCopyTypeCode = payload
    Cookies.set('interface.priorityCopyTypeCode', JSON.stringify(payload), { expires: 7 })
  },

  [types.SET_HASH_GROUPS] (state, payload) {
    state.hashGroups = payload
  },

  [types.SET_NAV_HASHES] (state, payload) {
    state.navHashes = payload
  },

  [types.SET_FILTER_PLUGINS] (state, filterPlugins) {
    state.filterPlugins = filterPlugins;
    Cookies.set('interface.filterPlugins', JSON.stringify(filterPlugins), { expires: 7 })
  },

  [types.SET_PARAMS_FILTER_PLUGINS] (state, data) {
    _.merge(state.filterPlugins, data)
    Cookies.set('interface.filterPlugins', JSON.stringify(state.filterPlugins), { expires: 7 })
  },

  [types.SET_FILTER_MENU_NAV_PLUGINS] (state, cat) {
    state.filterMenuNavPlugins = cat;
    Cookies.set('interface.filterMenuNavPlugins', cat, { expires: 7 })
  },

  [types.SET_FILTER_CATS_MENU_NAV_PLUGINS] (state, cat) {
    state.filterCatsMenuNavPlugins = cat;
    Cookies.set('interface.filterCatsMenuNavPlugins', JSON.stringify(cat), { expires: 7 })
  },

  [types.SET_CARDS_OR_LIST_PLUGINS] (state, cardsOrListPlugins) {
    state.cardsOrListPlugins = cardsOrListPlugins;
  },

  [types.SET_CUR_LIST_CATEGORY_PLUGINS] (state, curListCategory) {
    state.curListCategory = curListCategory;
  },

  [types.SET_SHOW_VTOUR] (state, payload) {
    state.showTour[payload.slug] = payload.show;
    Cookies.set('interface.showTour', JSON.stringify(state.showTour), { expires: 7 })
  },
}

// actions
export const actions = {
  saveMenuCollapsed            ({ commit, dispatch }, payload) {commit(types.SET_MENU_COLLAPSED, payload)},
  savePriorityCopyTypeCode     ({ commit, dispatch }, payload) {commit(types.SET_PRIORITY_COPY_TYPE_CODE_STATE, payload)},
  setHashGroups                ({ commit, dispatch }, payload) {commit(types.SET_HASH_GROUPS, payload)},
  setNavHashes                 ({ commit, dispatch }, payload) {commit(types.SET_NAV_HASHES, payload)},
  saveFilterPlugins            ({ commit, dispatch }, payload) {commit(types.SET_FILTER_PLUGINS, payload)},
  saveParamsFilterPlugins      ({ commit, dispatch }, payload) {commit(types.SET_PARAMS_FILTER_PLUGINS, payload)},
  saveFilterMenuNavPlugins     ({ commit, dispatch }, payload) {commit(types.SET_FILTER_MENU_NAV_PLUGINS, payload)},
  saveFilterCatsMenuNavPlugins ({ commit, dispatch }, payload) {commit(types.SET_FILTER_CATS_MENU_NAV_PLUGINS, payload)},
  saveCardsOrListPlugins       ({ commit, dispatch }, payload) {commit(types.SET_CARDS_OR_LIST_PLUGINS, payload)},
  saveCurListCategory          ({ commit, dispatch }, payload) {commit(types.SET_CUR_LIST_CATEGORY_PLUGINS, payload)},
  saveShowTour                 ({ commit, dispatch }, payload) {commit(types.SET_SHOW_VTOUR, payload)},
}
