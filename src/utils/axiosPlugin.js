/* eslint-disable space-before-function-paren,prefer-promise-reject-errors */
import axios from 'axios'
import qs from 'qs'
import {Indicator, Toast} from 'mint-ui'

export const Axios = axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 3000,
  responseType: 'json',
  retry: 2,
  retryDelay: 100,
  withCredentials: true // 是否允许带cookie
})

// POST传参序列化(添加请求拦截器)
// 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
  Open()
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  let idToken = sessionStorage.getItem('authorization')
  if (idToken) {
    config.headers.authorization = idToken
  }
  return config
}, error => {
  Close()
  Toast(error.msg)
  return Promise.reject(error).catch(error => {
    return {code: '-1', msg: error, data: ''}
  })
})

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {
  // 判断idToken是否有更新
  let idToken = sessionStorage.getItem('authorization')
  if (res.headers.authorization && idToken != res.headers.authorization) {
    // console.log('old-authorization:' + sessionStorage.getItem('authorization'))
    sessionStorage.setItem('authorization', res.headers.authorization)
    // console.log('new-authorization:' + sessionStorage.getItem('authorization'))
  }
  Close()
  if (res.data) {
    if (res.data.code !== '0' && res.data.code !== 0) {
      Toast(res.data.msg)
    }
  } else {
    console.log(res)
    location.href = '/error?status=200&code=-1&msg=' + JSON.stringify(res)
  }
  return Promise.resolve(res.data)
}, error => {
  Close()
  console.log(error)
  // 网络断开
  if(error.message.indexOf('Network Error') != -1){
    return Toast('网络异常，请检查您的网络')
  }
  // 超时重试
  if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1){
    var config = error.config
    // error内的config.data会变成string类型，这里要转换成json对象为后续重试
    config.data = qs.parse(config.data)
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
      console.log('重试次数:' + config.__retryCount)
      return Toast('请求超时')
    }
    // Increase the retry count
    config.__retryCount += 1;
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve()
      }, config.retryDelay || 1)
    })
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
      // console.log(config)
      return Axios(config)
    })
  }
  if (error.response && error.response.status) {
    Toast('token已经失效')
    let url = location.pathname + location.search
    // console.log(url)
    location.href = '/error?url=' + encodeURIComponent(url) + '&status=' + error.response.status + '&code=' + error.response.data.code + '&msg=' + (error.response.data.msg ? error.response.data.msg : JSON.stringify(error))
  } else {
    location.href = '/error?status=-100&code=-100&msg=' + JSON.stringify(error)
  }
  return Promise.reject({code: '-1', msg: error, data: ''}).catch(error => {
    return {code: '-1', msg: error, data: ''}
  })
})

let count = 0
export function Open() {
  if (count < 1) {
    Indicator.open({
      spinnerType: 'fading-circle'
    })
  }
  count++
}

export function Close() {
  if (count > 0) {
    count--
  }
  if (count <= 0) Indicator.close()
}

export default Axios
// 将 Axios 实例添加到Vue的原型对象上
/* export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {value: Axios})
  }
} */
