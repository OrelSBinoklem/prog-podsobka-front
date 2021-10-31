import Cookies from 'js-cookie'
import { cookieFromRequest } from '~/utils'

export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        const locale = cookieFromRequest(req, 'locale')
        if (locale) {
            commit('lang/SET_LOCALE', { locale })
        }
    },

    nuxtClientInit ({ commit, getters }) {
        const locale = Cookies.get('locale')
        if (locale && !getters['lang/locale']) {
            commit('lang/SET_LOCALE', { locale })
        }
    }
}
