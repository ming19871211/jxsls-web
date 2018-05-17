'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  API_ROOT: '"http://jxsls.uther.talkedu.cn"',
  SERVER_DOMAIN: '"http://jxsls.uther.talkedu.cn/"',
  WEB_DOMAIN: '"http://jxsls-web.uther.talkedu.cn/"',
  UCENTER_QNDOMAIN: '"http://p5h1tg383.bkt.clouddn.com/"',
  JXSLS_QNDOMAIN: '"http://p72em5e0e.bkt.clouddn.com/"',
  MP_ID: '5569',
  MP_QR_CODE: '"http://weixin.wxres.talkedu.cn/group1/M00/00/00/74d8bf18-d432-4a98-b8f8-53238644a63f.jpg"'
})
