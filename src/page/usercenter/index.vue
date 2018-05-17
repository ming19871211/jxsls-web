<!--个人中心-->
<template>
  <div>
    <class-header isback="no" title="个人中心"></class-header>
    <!--中间内容开始-->
    <div class='container-fluid'>
         <div class="user-center">
              <div class="hd bg-green mint-cell-change">
                <img slot="icon" class="img border-radius-100 pull-left" :src="userInfo.avatar" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'">
                <div class="info pull-left" v-if="userInfo.currRole === 1">
                     <div class="name">
                       <div class="text pull-left overflow-hidden"><input type="text" :placeholder="userInfo.nickName" v-model="nickName" readonly/></div>
                     </div>
                     <div class="font-size-26">身份：老师</div>
                </div>
                <div class="info pull-left" v-if="userInfo.currRole === 2">
                     <div class="name">
                       <div class="text pull-left overflow-hidden"><input type="text" :placeholder="userInfo.nickName" readonly/></div>
                     </div>
                     <div class="font-size-26">身份：家长</div>
                </div>
                <mt-button type="primary" class="border-radius-10" @click.native="roleClick" v-if="size === 2"><i class="iconfont font-size-26">&#xe621;</i>&nbsp;切换角色</mt-button>
              </div>
              <div class="bd  mint-cell-change">
                <mt-cell title="我的班级" class="bg-white border-radius-10 border-grey-d" @click.native="classClick"><i class="iconfont icon1"  slot="icon">&#xe9f4;</i></mt-cell>
                <mt-cell title="个人资料" class="bg-white border-radius-10 border-grey-d" @click.native="dataClick"><i class="iconfont icon2"  slot="icon">&#xe9f2;</i></mt-cell>
                <mt-cell title="帮助与反馈" class="bg-white border-radius-10 border-grey-d" @click.native="helpClick"><i class="iconfont icon3"  slot="icon">&#xe9f5;</i></mt-cell>
                <mt-cell title="关于优班掌" class="bg-white border-radius-10 border-grey-d" @click.native="aboutClick"><i class="iconfont icon4"  slot="icon">&#xe9f3;</i></mt-cell>
              </div>
         </div>
        <!--切换角色弹出-->
        <mt-popup class="popup-role popup-model bg-white border-radius-10"  v-model="popupRole"  position="center"  modal=false>
          <div class="hd font-size-34 font-color-white">
            <span class="block">切换角色</span>
          </div>
          <div class="bd">
            <mt-tabbar class="bg-none" v-model="selected">
              <mt-tab-item id="tab1">
                <img slot="icon" src="../../assets/images/add/img-teacher.png">
                老师身份
              </mt-tab-item>
              <mt-tab-item id="tab2">
                <img slot="icon" src="../../assets/images/add/img-parent.png">
                家长身份
              </mt-tab-item>
            </mt-tabbar>
            <mt-radio class="mint-cell-change flex-box mint-radio-change" v-model="value"  :options="[{label:'老师', value: '1'}, {label:'家长', value:'2'}]"></mt-radio>
          </div>
          <div class="text-center btn-change"><mt-button type="primary" class="btn-green-change bg-grad-green yahei" @click.native="submit">确&nbsp;定</mt-button></div>
        </mt-popup>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected='我'></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import {mapGetters, mapActions} from 'vuex'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    classHeader, footerMenu
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER'
    })
  },
  created: function () {
    this.init()
  },
  data: function () {
    return {
      popupRole: false,
      selected: '',
      value: '',
      nickName: '',
      roleList: [],
      size: 0
    }
  },
  methods: {
    ...mapActions({
      SWITCH_ROLE: 'SWITCH_ROLE'
    }),
    roleClick: function () {
      this.value = this.userInfo.currRole.toString()
      this.popupRole = true
    },
    classClick: function () {
      if (this.userInfo.currRole === 1) {
        this.$router.push({name: '我的班级'})
      }
      if (this.userInfo.currRole === 2) {
        this.$router.push({name: '家长我的班级'})
      }
    },
    dataClick: function () {
      this.$router.push({name: '个人资料'})
    },
    helpClick: function () {
      this.$router.push({name: '帮助与反馈'})
    },
    aboutClick: function () {
      this.$router.push({name: '关于我们'})
    },
    init: function () {
      this.$http.post('/api/userinfo/findUserRoleInfo')
        .then(res => {
          this.roleList = res.data
          this.size = res.data.length
        })
    },
    changeNickName: function (values) {
      if (values === '' || values === null) {
        return
      }
      this.$http.post('/api/userinfo/teacherInfoUpdate', {
        nickName: values
      }).then(res => {
        if (res !== null && res.code === 0) {
          this.LOGIN_USER()
        } else if (res === null) {
          this.showMsgBox('后台业务故障')
        } else {
          this.showMsgBox(res.msg)
        }
      })
    },
    submit: function () {
      let that = this
      this.SWITCH_ROLE({
        roleId: that.value,
        callback: function () {
          that.popupRole = false
        }
      })
      /* this.$http.post('/api/userinfo/switchRole', {
        roleId: this.value
      })
        .then(res => {
          if (res !== null && res.code === 0) {
            this.popupRole = false
            this.LOGIN_USER()
          } else if (res === null) {
            this.showMsgBox('后台业务故障')
          } else {
            this.showMsgBox(res.msg)
          }
        }) */
    },
    showMsgBox: function (value) {
      MessageBox('提示', value)
    }
  }
}
</script>

<style scoped>

</style>
