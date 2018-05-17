import Vue from 'vue'
import * as types from '../types'
import Axios from '../../utils/axiosPlugin'

export default {
  state: {
    data: JSON.parse(sessionStorage.getItem('user')) || {}
  },
  mutations: {
    [types.SET_USER] (state, user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      state.data = Object.assign({}, state.data, user)
    },
    [types.CLEAR_USER] (state) {
      Object.keys(state.data).forEach(k => Vue.delete(state.data, k))
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('authorization')
    }
  },
  getters: {
    [types.GET_USER]: state => {
      return state.data
    }
  },
  actions: {
    [types.SET_USER] ({commit}, user) {
      commit(types.SET_USER, user)
    },
    [types.CLEAR_USER] ({commit}) {
      commit(types.CLEAR_USER)
    },
    [types.LOGIN_USER] ({commit}, callback) {
      Axios.post('/api/userinfo/getUserInfo').then(userRes => {
        commit(types.SET_USER, userRes.data)
        this.dispatch(types.GET_REMOTER_MSG, userRes.data.currRole)
        callback && callback()
      })
    },
    [types.LOGIN_USER_BY_LOGIN_TOKEN] ({commit}, tokenObj) {
      let loginToken = tokenObj.loginToken
      let callback = tokenObj.callback
      Axios.post('/wechat/login', {login_token: loginToken}).then(loginTokenRes => {
        let authorization = loginTokenRes.data
        sessionStorage.setItem('authorization', authorization)
        this.dispatch(types.LOGIN_USER, callback)
      })
    },
    [types.SWITCH_ROLE] ({commit}, tokenObj) {
      let roleId = tokenObj.roleId
      let callback = tokenObj.callback
      Axios.post('/api/userinfo/switchRole', {roleId: roleId}).then(roleRes => {
        this.dispatch(types.LOGIN_USER, callback)
      })
    }
  }
}
