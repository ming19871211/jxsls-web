export default {
  // 网站标题
  title: '优班掌',
  // 服务端域名
  serverDomain: process.env.SERVER_DOMAIN,
  // 前端域名
  webDomain: process.env.WEB_DOMAIN,
  // 用户中心七牛域名
  ucenterQnDomain: process.env.UCENTER_QNDOMAIN,
  // 手拉手七牛域名
  jxslsQnDomain: process.env.JXSLS_QNDOMAIN,
  // 公众号ID
  mpId: process.env.MP_ID,
  // 公众号二维码地址
  mpQrCode: process.env.MP_QR_CODE,
  // 默认微信分享配置
  wxShare: {
    // 分享标题
    title: '优班掌',
    // 分享链接
    link: process.env.WEB_DOMAIN + 'redirect?url=' + encodeURI(process.env.SERVER_DOMAIN + 'wechat/forward?moduleUrl=class%2Fsubscribe'),
    // 分享描述
    desc: '致力于打造更优秀的班级管理平台！',
    // 分享图标
    imgUrl: 'http://weixin.wxres.talkedu.cn/group1/M00/00/00/b5d469a1-abde-4f14-8924-e3448caaa1a3.png'
  }
}
