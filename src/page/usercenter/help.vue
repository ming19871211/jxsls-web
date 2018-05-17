<!--帮助与反馈-->
<template>
  <div>
    <class-header title="帮助与反馈"></class-header>
    <!--中间内容开始-->
    <div class='container-fluid'>
        <div class="user-help mint-cell-change">
             <div class="help-content">
               <h5 class="font-normal mint-custom-title">常见问题</h5>
               <mt-cell class="border-b-grey-d" title="“优班掌”是什么？" @click.native="helpClick1">
                 <i class="iconfont huo" slot="icon">&#xe6a0;</i>
                 <i class="iconfont font-color-grey">&#xe603;</i>
               </mt-cell>
               <mt-cell class="border-b-grey-d" title="老师如何创建班级？" @click.native="helpClick2">
                 <i class="iconfont huo" slot="icon">&#xe6a0;</i>
                 <i class="iconfont font-color-grey">&#xe603;</i>
               </mt-cell>
               <mt-cell class="border-b-grey-d" title="如何邀请其他人加入班级？" @click.native="helpClick3">
                 <i class="iconfont huo" slot="icon">&#xe6a0;</i>
                 <i class="iconfont font-color-grey">&#xe603;</i>
               </mt-cell>
               <mt-cell class="border-b-grey-d" title="怎样才能加入班级？" @click.native="helpClick4">
                 <i class="iconfont huo" slot="icon">&#xe6a0;</i>
                 <i class="iconfont font-color-grey">&#xe603;</i>
               </mt-cell>
               <mt-cell class="border-b-grey-d" title="填写加入班级信息后仍未进入班级?" @click.native="helpClick5">
                 <i class="iconfont huo" slot="icon">&#xe6a0;</i>
                 <i class="iconfont font-color-grey">&#xe603;</i>
               </mt-cell>
               <mt-cell class="border-b-grey-d" title="如何将已有班级注销？" @click.native="helpClick6">
                 <i class="iconfont huo" slot="icon">&#xe6a0;</i>
                 <i class="iconfont font-color-grey">&#xe603;</i>
               </mt-cell>
             </div>
             <div class="help-feedback">
                <h5 class="font-normal mint-custom-title">您的意见或问题</h5>
                <mt-field class="text-area border-t-grey-d border-b-grey-d" placeholder="请输入您的意见或问题?" type="textarea" rows="6" v-model="content"></mt-field>
             </div>
             <div class="text-center btn-change"><mt-button type="primary" class="btn-green-change bg-grad-green yahei" @click.native="submit">提&nbsp;交</mt-button></div>
        </div>
        <!--内容弹出1-->
        <mt-popup class="popup-help bg-white" v-model="popupHelp1"  position="top"  modal=false>
          <div class="text-center"><mt-button class="border-radius-100" type="default" @click.native="helpClickClose1"><i class="iconfont font-size-34">&#xe62d;</i></mt-button></div>
          <div class="content font-size-26">
          “优班掌”是以辅助班主任日常工作为核心功能的班级管理工具。围绕班级事务搭建高效、便捷的家校沟通桥梁，实现家校共育，帮助每一个孩子成为最棒的自己。
          </div>
        </mt-popup>
        <!--内容弹出2-->
        <mt-popup class="popup-help bg-white" v-model="popupHelp2"  position="top"  modal=false>
          <div class="text-center"><mt-button class="border-radius-100" type="default" @click.native="helpClickClose2"><i class="iconfont font-size-34">&#xe62d;</i></mt-button></div>
          <div class="content font-size-26">
            (1)进入“优班掌”公众号，点击底部“一键创班”功能键进入创班页面，完成表单填写，即可创建班级；<br>(2)进入“优班掌”班级页面，点击右上角“+”号，选择“创建班级”，完成表单填写，即可创建班级。
          </div>
        </mt-popup>
        <!--内容弹出3-->
        <mt-popup class="popup-help bg-white" v-model="popupHelp3"  position="top"  modal=false>
          <div class="text-center"><mt-button class="border-radius-100" type="default" @click.native="helpClickClose3"><i class="iconfont font-size-34">&#xe62d;</i></mt-button></div>
          <div class="content font-size-26">
          进入“优班掌”班级页面，点击班级列表二维码标识进入分享页面，生成班级二维码分享给班级学生和任课老师，邀请加入班级。
          </div>
        </mt-popup>
        <!--内容弹出4-->
        <mt-popup class="popup-help bg-white" v-model="popupHelp4"  position="top"  modal=false>
          <div class="text-center"><mt-button class="border-radius-100" type="default" @click.native="helpClickClose4"><i class="iconfont font-size-34">&#xe62d;</i></mt-button></div>
          <div class="content font-size-26">
          (1)家长/任课老师扫描班级二维码，填写身份信息，通过班主任老师审核后即可加入班级；
          <br>
          (2)家长/任课老师进入班级页面，点击右上角“+”号，选择“加入班级”，填写对应班级代码和身份信息，通过班主任老师审核即可加入班级。
          </div>
        </mt-popup>
        <!--内容弹出5-->
        <mt-popup class="popup-help bg-white" v-model="popupHelp5"  position="top"  modal=false>
          <div class="text-center"><mt-button class="border-radius-100" type="default" @click.native="helpClickClose5"><i class="iconfont font-size-34">&#xe62d;</i></mt-button></div>
          <div class="content font-size-26">
          通过扫码或班级代码申请加入班级，需等待班主任老师审核。请您填写孩子的真实姓名和正确学号，便于班主任老师审核。若等待时间过长，您可联系老师进行审核。
          </div>
        </mt-popup>
        <!--内容弹出6-->
        <mt-popup class="popup-help bg-white" v-model="popupHelp6"  position="top"  modal=false>
          <div class="text-center"><mt-button class="border-radius-100" type="default" @click.native="helpClickClose6"><i class="iconfont font-size-34">&#xe62d;</i></mt-button></div>
          <div class="content font-size-26">
          目前班级创建后无法注销，班主任老师可进行名下班级转让。
          <br>
          转让方法：进入教师个人中心，点击“我的班级”，选择 “转让”进入转让班级流程，可将班级转让给其他任课老师。
          </div>
        </mt-popup>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected='我'></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import {mapGetters} from 'vuex'
import { MessageBox, Toast } from 'mint-ui'

export default {
  components: {
    classHeader, footerMenu
  },
  data: function () {
    return {
      content: '',
      popupHelp1: false,
      popupHelp2: false,
      popupHelp3: false,
      popupHelp4: false,
      popupHelp5: false,
      popupHelp6: false
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER'
    })
  },
  methods: {
    helpClick1: function () {
      this.popupHelp1 = true
    },
    helpClick2: function () {
      this.popupHelp2 = true
    },
    helpClick3: function () {
      this.popupHelp3 = true
    },
    helpClick4: function () {
      this.popupHelp4 = true
    },
    helpClick5: function () {
      this.popupHelp5 = true
    },
    helpClick6: function () {
      this.popupHelp6 = true
    },
    helpClickClose1: function () {
      this.popupHelp1 = false
    },
    helpClickClose2: function () {
      this.popupHelp2 = false
    },
    helpClickClose3: function () {
      this.popupHelp3 = false
    },
    helpClickClose4: function () {
      this.popupHelp4 = false
    },
    helpClickClose5: function () {
      this.popupHelp5 = false
    },
    helpClickClose6: function () {
      this.popupHelp6 = false
    },
    submit: function () {
      if (!this.checkValue()) {
        return
      }
      this.$http.post('/api/question/add', {
        content: this.content,
        userName: this.userInfo.nickName
      }).then(res => {
        if (res !== null && res.code === 0) {
          this.showMsgBox('您的问题我们会及时反馈给您，感谢您的支持！')
          this.content = ''
        } else if (res === null) {
          this.showMsgBox('后台业务故障')
        } else {
          this.showMsgBox(res.msg)
        }
      })
    },
    checkValue: function () {
      if (this.content == null || this.content == '') {
        Toast('请填写意见内容')
        return false
      }
      return true
    },
    showMsgBox: function (value) {
      MessageBox('提示', value)
    }
  }
}

</script>

<style scoped>

</style>
