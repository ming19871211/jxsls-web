import Vue from 'vue'
import * as types from '../types'
import Axios from '../../utils/axiosPlugin'

export default {
  state: {
    data: JSON.parse(localStorage.getItem('msg')) || []
    // data: [{msgId: 1, msgType: 1, classId: '195521cd46c311e8b7585254004cbd29'}, {msgId: 1, msgType: 2, classId: 'a0d4242349f311e880f6525400d2b3f9'}]
  },
  mutations: {
    [types.SET_MSG] (state, msgList) {
      state.data = msgList
      localStorage.setItem('msg', JSON.stringify(state.data))
    },
    [types.APPEND_MSG] (state, msgList) {
      state.data = state.data.concat(msgList)
      localStorage.setItem('msg', JSON.stringify(state.data))
    },
    [types.CLEAR_MSG] (state) {
      Object.keys(state.data).forEach(k => Vue.delete(state.data, k))
      localStorage.removeItem('msg')
    },
    [types.REMOVE_MSG_BY_CONDITION] (state, condition) {
      let msgList = []
      var keyLength = Object.keys(condition).length
      for (var data of state.data) {
        let count = 0
        Object.keys(condition).forEach((key, i) => {
          let values = condition[key]
          let flag = false
          values.every((value) => {
            if (data[key] == value) {
              flag = true
              return false
            }
          })
          if (flag) {
            count++
          }
        })
        if (count != keyLength) {
          msgList.push(data)
        }
      }
      state.data = msgList
      localStorage.setItem('msg', JSON.stringify(msgList))
    }
  },
  getters: {
    [types.GET_MSG]: state => {
      return state.data
    },
    [types.GET_MSG_BY_CONDITION]: (state, getters) => (condition) => {
      let msgList = []
      var keyLength = Object.keys(condition).length
      for (var data of state.data) {
        let count = 0
        Object.keys(condition).forEach((key, i) => {
          let values = condition[key]
          let flag = false
          values.every((value) => {
            if (data[key] == value) {
              flag = true
              return false
            }
          })
          if (flag) {
            count++
          }
        })
        if (count == keyLength) {
          msgList.push(data)
        }
      }
      return msgList.length
    }
  },
  actions: {
    [types.SET_MSG] ({commit}, msg) {
      commit(types.SET_MSG, msg)
    },
    [types.CLEAR_MSG] ({commit}) {
      commit(types.CLEAR_MSG)
    },
    [types.REMOVE_MSG_BY_CONDITION] ({commit}, condition) {
      commit(types.REMOVE_MSG_BY_CONDITION, condition)
    },
    [types.GET_REMOTER_MSG] ({commit}, roleId) {
      console.log('GET_REMOTER_MSG')
      // 初始化消息数据，清理掉过期的消息
      let exp = 1000 * 60 * 60 * 24 * 30 // 默认有效期30天
      let data = localStorage.getItem('msg') || '[]'
      let msgList = JSON.parse(data)
      let currentTime = new Date().getTime()
      msgList = msgList.filter(item => item.expTime < (currentTime - exp))
      commit(types.SET_MSG, msgList)
      // 获取新红点消息
      Axios.post('/api/redDot/query', {roleId: roleId}).then(msgRes => {
        console.log(msgRes)
        // 设置新拉取消息的时间
        if (msgRes.data && msgRes.data.length > 0) {
          for (let i = 0; i < msgRes.data.length; i++) {
            msgRes.data.roleId = roleId
            msgRes.data.expTime = new Date().getTime()
          }
          commit(types.APPEND_MSG, msgRes.data)
        }
      })
    }
  }
}
