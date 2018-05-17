import * as types from '../types'

export default {
  state: {
    footer: sessionStorage.getItem('footer_menu') || '班级'
  },
  mutations: {
    [types.SET_FOOTER_MENU] (state, menu) {
      sessionStorage.setItem('footer_menu', menu)
      state.footer = menu
    },
    [types.CLEAR_FOOTER_MENU] (state) {
      state.footer = '班级'
      sessionStorage.removeItem('footer_menu')
    }
  },
  getters: {
    [types.GET_FOOTER_MENU]: state => {
      return state.footer
    }
  },
  actions: {
    [types.SET_FOOTER_MENU] ({commit}, menu) {
      commit(types.SET_FOOTER_MENU, menu)
    },
    [types.CLEAR_FOOTER_MENU] ({commit}) {
      commit(types.CLEAR_FOOTER_MENU)
    }
  }
}
