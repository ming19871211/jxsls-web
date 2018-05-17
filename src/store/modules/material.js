import Vue from 'vue'
import * as types from '../types'

export default {
  state: {
    data: JSON.parse(sessionStorage.getItem('material')) || {}
  },
  mutations: {
    [types.SET_MATERIAL] (state, material) {
      sessionStorage.setItem('material', JSON.stringify(material))
      state.data = Object.assign({}, state.data, material)
    },
    [types.CLEAR_MATERIAL] (state) {
      Object.keys(state.data).forEach(k => Vue.delete(state.data, k))
      sessionStorage.removeItem('material')
    }
  },
  getters: {
    [types.GET_MATERIAL]: state => {
      return state.data
    }
  },
  actions: {
    [types.SET_MATERIAL] ({commit}, material) {
      commit(types.SET_MATERIAL, material)
    },
    [types.CLEAR_MATERIAL] ({commit}) {
      commit(types.CLEAR_MATERIAL)
    }
  }
}
