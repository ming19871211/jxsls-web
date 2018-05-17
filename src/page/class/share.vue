<!--班级分享-->
<template>
  <div v-show="isInit">
    <!--引导关注弹出层-->
    <mt-popup v-model="shareBlockVisable" class="share-popup" position="top" modal=true>
       <div class="container font-size-34">
         <div class="text-right">
           <img src='../../assets/images/add/guide.png' style="width:1.86rem;height:1.73rem;margin-right:0.7rem">
         </div>
         <div class="text-right font-color-white">
           点击右上角的菜单“●●●”<br/> 发送给好友或者分享朋友圈
         </div>
       </div>
    </mt-popup>
    <class-header isback='yes' backName="班级" title='班级分享'></class-header>
    <!--中间内容开始-->
    <div class='container-fluid'>
      <div class='class-share'>
        <!--班级信息-->
        <div class='info'>
          <mt-cell :title='classInfo.clssName' :label='"班级代码：" + classInfo.clssCode'>
            <i class='iconfont'>&#xe633;</i>{{classInfo.schlName}}
          </mt-cell>
        </div>
        <div class='grap'>
          <img src='../../assets/images/add/share_02.gif'>
        </div>
        <!--二维码-->
        <div class='share'>
          <div class='text'>分享二维码，邀请你的学生和其它任课老师加入！</div>
          <qrcode-vue :value='shareUrl' :size='qrCodeSize' className='qrcode'></qrcode-vue>
          <mt-button type='primary' class='btn-green-change bg-grad-green yahei' @click="share">分&nbsp;&nbsp;享</mt-button>
        </div>
      </div>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected='班级'></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import wxjs from '../../utils/wxjs'
import QrcodeVue from 'qrcode.vue'
import { mapGetters } from 'vuex'

export default {
  components: { classHeader, footerMenu, QrcodeVue },
  data () {
    return {
      isInit: false,
      // 生成分享二维码的URL
      shareUrl: '',
      // 班级明细资料
      classInfo: {
        'schlName': '',
        'gradeName': '',
        'gradeId': '',
        'indbDate': '',
        'headMasterId': '',
        'headMasterMobile': '',
        'schlId': '',
        'clssState': 0,
        'clssCode': '',
        'clssId': '',
        'modifyTime': null,
        'clssName': '',
        'headMasterName': ''
      },
      // 二维码尺寸
      qrCodeSize: 100,
      // 是否显示引导关注的遮罩
      shareBlockVisable: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  },
  created () {
    var that = this
    // 查询班级信息
    that.$http.post('/api/classical/queryDetail', {
      clssId: that.$route.query.classId
    }).then(res => {
      if (res !== null && res.code === 0) {
        that.classInfo = res.data
        // 控制二维码尺寸
        that.qrCodeSize = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * 0.6
        // 拼接二维码链接
        that.shareUrl = that.GLOBAL.webDomain + 'redirect?url=' + encodeURIComponent(that.GLOBAL.serverDomain + 'wechat/forward?moduleUrl=' + encodeURIComponent('class/subscribe?classId=' + that.$route.query.classId))
        // 设置微信分享
        wxjs.init({
          currentPath: that.$route.fullPath,
          global: that.GLOBAL,
          callback: function () {
            let wxShare = {
              // 分享标题
              title: '班级邀请',
              // 分享链接
              link: that.shareUrl,
              // 分享描述
              desc: '“' + that.user.nickName + '”邀请您加入：' + that.classInfo.schlName + '，' + that.classInfo.clssName,
              // 分享图标
              imgUrl: 'http://weixin.wxres.talkedu.cn/group1/M00/00/00/b5d469a1-abde-4f14-8924-e3448caaa1a3.png',
              type: 'link'
            }
            wx.onMenuShareTimeline(wxShare)
            wx.onMenuShareAppMessage(wxShare)
            that.isInit = true
          }
        })
      }
    })
  },
  methods: {
    share () {
      this.shareBlockVisable = true
    }
  }
}
</script>

<style scoped>
.qrcode {
  text-align: center;
  padding: 20px 0px;
}
.mint-popup {
  background: none;
  color: white;
  width: 100%;
  padding-right: 10px;
  padding-top: 10px;
}
</style>
