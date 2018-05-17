import * as qiniu from 'qiniu-js'
import Axios from './axiosPlugin'

let domain = ''

/**
 * 七牛文件上传
 * （res数据描述）：res 参数是一个带有 total 字段的 object，包含loaded、total、percent三个属性
 * total.loaded: number，已上传大小，单位为字节
 * total.total: number，本次上传的总量控制信息，单位为字节，注意这里的 total 跟文件大小并不一致
 * total.percent: number，当前上传进度，范围：0～100
 * @param token
 * @param file 文件对象
 * @param key 文件资源名
 * @param filename 原文件名称
 * @param observer 用来设置上传过程的监听函数，有三个属性 next、error、complete:
 * @param next 监听上传中回调函数next(res)
 * @param error 监听上传错误回调函数error(res)
 * @param complete 监听上传成功回调函数complete(res)
 */
function upload (file, key, filename, observer) {
  Axios.post('/api/qiniu/token').then(res => {
    // debugger
    let token = res.data.upToken
    domain = res.data.domain

    let putExtra = {
      fname: '',
      params: {},
      mimeType: [] || null
    }
    let config = {
      useCdnDomain: true,
      region: qiniu.region.z2
    }

    var observable = qiniu.upload(file, key, token, putExtra, config)
    var subscription = observable.subscribe(observer) // 上传开始
    //var subscription = observable.subscribe(next, error, complete) // 这样传参形式也可以
  })
}

function getUploadFileUrl () {
  let config = {
    useCdnDomain: true,
    region: qiniu.region.z2
  }

  var requestUrl = qiniu.getUploadUrl(config)
}

function getDomain () {
  return domain
}

export default {upload, getDomain}
