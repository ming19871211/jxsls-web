import Vue from 'vue'
// 引用路由
import Router from 'vue-router'
// vuex
// 引用路由配置文件
import routes from './routes'
// 微信JSSDK工具
import wxjs from '../utils/wxjs'
import store from '../store'
import Axios from '../utils/axiosPlugin'
import global from '../utils/global'
// 图片延迟加载
import VueLazyImage from 'vue-lazy-images'

Vue.use(Router)
Vue.use(VueLazyImage)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(document.cookie)
  console.log('env:' + process.env.ENV_CONFIG)
  // 初始化微信JS
  wxjs.init({
    currentPath: to.fullPath,
    global: global
  })
  var auth = to.meta.auth
  if (auth) {
    // 根据运行环境，做不同处理 --开发环境
    if (process.env.ENV_CONFIG === 'dev') {
      let idToken = sessionStorage.getItem('authorization')
      let isLogin = Boolean(store.state.user.data.userId) // true用户已登录， false用户未登录
      if (!isLogin || !idToken) {
        // 通过openid换取idtoken
        let openid = to.query.openid
        if (!openid) {
          openid = 'oZziSjt2O30GuolyygITHM8t36Ms'
        }
        Axios.get('/wechat/mockLogin', { params: { 'openid': openid } }).then(idTokenRes => {
          // console.log(idTokenRes)
          sessionStorage.setItem('authorization', idTokenRes.data)
          // 通过idToken获取登录用户信息
          let isLogin = Boolean(store.state.user.data.userId) // true用户已登录， false用户未登录
          if (!isLogin) {
            store.dispatch('LOGIN_USER', function () {
              return next()
            })
          }
        })
      } else {
        return next()
      }
    } else {
      // 根据运行环境，做不同处理 --生产环境
      let idToken = sessionStorage.getItem('authorization')
      let isLogin = Boolean(store.state.user.data.userId) // true用户已登录， false用户未登录
      if (!isLogin || !idToken) {
        // 获取login_token参数
        let loginToken = to.query.login_token
        if (!loginToken) {
          // loginToken为空，路由到错误提示页面
          return next({ path: '/error', query: {code: '-100', msg: 'login_token为空'} })
        } else {
          // 通过login_token进行授权登录获取用户信息
          // console.log('login_token:' + loginToken)
          store.dispatch('LOGIN_USER_BY_LOGIN_TOKEN', {
            loginToken: loginToken,
            callback: function () {
              return next()
            }
          })
        }
      } else {
        return next()
      }
    }
  } else {
    return next()
  }
})
// 使用配置文件规则
export default router
