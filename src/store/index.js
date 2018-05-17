import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import material from './modules/material'
import msg from './modules/msg'
import menu from './modules/menu'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    material,
    user,
    msg,
    menu
  }
})
