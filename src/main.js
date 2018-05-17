// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store/'
import AxiosPlugin from './utils/axiosPlugin.js'
import Pub from './assets/js/hotcss.js'
import global from './utils/global'

// 开发环境下引入vconsole，便于移动端调试
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
  const Vconsole = require('vconsole')
  const vConsole = new Vconsole()
  console.log(vConsole)
}

Vue.use(MintUI)
Vue.prototype.$http = AxiosPlugin
Vue.prototype.GLOBAL = global
Vue.use(Pub)
Vue.config.productionTip = false
Vue.use(require('vue-moment'))

// 注册全局过滤器
Vue.filter('strlen', function (value, maxLength) {
  if (!value) { return '' }
  if (value.length <= maxLength) {
    return value
  } else {
    return value.substring(0, maxLength) + '...'
  }
})
Vue.filter('strtodate', function (value) {
  if (!value) { return '' }
  var timestamps = Date.parse(new Date(value)) / 1000
  var date = new Date(timestamps * 1000)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() < 10 ? `0${date.getDate()} ` : `${date.getDate()} `
  let h = date.getHours() < 10 ? `0${date.getHours()}:` : `${date.getHours()}:`
  let m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
  return Y + M + D + h + m
})
Vue.filter('dateconver', function (publishTime) {
  var date = new Date(publishTime.replace(/-/g, '/').split('.')[0])
  var timeMill = parseInt(date.getTime() / 1000)
  var minute
  var hour
  var day
  var timeNow = parseInt(new Date().getTime() / 1000)
  var d
  d = timeNow - timeMill
  day = parseInt(d / 86400)
  hour = parseInt(d / 3600)
  minute = parseInt(d / 60)
  if (day > 0 && day < 4) {
    return day + '天前'
  } else if (day <= 0 && hour > 0) {
    return hour + '小时前'
  } else if (hour <= 0 && minute > 0) {
    return minute + '分钟前'
  } else if (hour <= 0 && minute <= 0) {
    return '刚刚'
  } else {
    return publishTime
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
