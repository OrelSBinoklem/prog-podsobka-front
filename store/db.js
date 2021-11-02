import Cookies from 'js-cookie'
import * as types from './mutation-types'
import _ from "lodash";

const qs = require('qs');

// state
export const state = () => ({
  categories: null,
  categoriesPublic: null,
  categoriesPublicTree: null,

  taxPublicPPMM: null
})

// getters
export const getters = {
  categories: state => state.categories,
  categoriesPublic: state => state.categoriesPublic,
  categoriesPublicTree: state => (slug = null) => {
    if(!!slug) {
      let partRootCat = _.find(state.categoriesPublic, {slug});
      return !!partRootCat && !!partRootCat.children && !!partRootCat.children.length ? partRootCat.children : null;
    } else {
      return state.categoriesPublic;
    }
  },

  taxPublicPPMM: state => state.taxPublicPPMM,
}

// mutations
export const mutations = {
  [types.REFRESH_CATEGORIES] (state, payload) {
    state.categories = payload
  },

  [types.REFRESH_CATEGORIES_PUBLIC] (state, payload) {
    state.categoriesPublic = payload
  },

  [types.REFRESH_CATEGORIES_PUBLIC_TREE] (state, payload) {
    state.categoriesPublicTree = payload
  },

  [types.LOAD_TAX_PUBLIC_PPMM] (state, payload) {
    state.taxPublicPPMM = payload
  },
}

// actions
export const actions = {
  async loadCategories ({ commit, state }) {
    if(state.categories === null) {
      let response = await this.$axios.get('/admin/categories')
      commit(types.REFRESH_CATEGORIES, response.data)
    }
  },

  async refreshCategories ({ commit }, payload) {
    let response = await this.$axios.get('/admin/categories')
    commit(types.REFRESH_CATEGORIES, response.data)
  },

  loadCategoriesPublic: _.throttle(async function ({ commit, state }, payload) {
    if(state.categoriesPublic === null) {
      let response = await this.$axios.get('/categories');
      commit(types.REFRESH_CATEGORIES_PUBLIC, response.data);
      commit(types.REFRESH_CATEGORIES_PUBLIC_TREE, appHelper.flatToTree(response.data));
    }
  }, 1000),

  refreshCategoriesPublic: _.throttle(async ({ commit }, payload) => {
    let response = await this.$axios.get('/categories')
    commit(types.REFRESH_CATEGORIES_PUBLIC, response.data);
    commit(types.REFRESH_CATEGORIES_PUBLIC_TREE, appHelper.flatToTree(response.data));
  }, 1000),

  loadTaxPublicPPMM: _.throttle(async function ({ commit, state }, payload) {
    let nedeedLoad = false;
    if(state.taxPublicPPMM === null) {
      nedeedLoad = true;
    } else {
      let existsTypesMaterials = true;
      for(let type in payload)
        if( !(type in state.taxPublicPPMM) ) {
          existsTypesMaterials = false;
          break;
        }
      if(!existsTypesMaterials)
        nedeedLoad = true;
    }

    if(nedeedLoad) {
      let response = await this.$axios
        .get('/content/get-all-tax-ppmm', {
          params: {'material-slugs': payload},
          'paramsSerializer': function(params) {
            return qs.stringify(params)
          },
        });

      let data = response.data;

      //Нормализуем категории и тэги в материалах
      _.values(data).forEach((el) => {
        _.values(el).forEach((el) => {
          el.tags = _.keyBy(el.tags, 'slug')
          el.categories = _.keyBy(el.categories, 'slug')
        })
      });

      commit(types.LOAD_TAX_PUBLIC_PPMM, data);
    }
  }, 1000),
}
