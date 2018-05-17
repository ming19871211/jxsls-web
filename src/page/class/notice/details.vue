<!--通知详情-->
<template>
  <div>
    <class-header title="通知详情" backName="班级消息"></class-header>
    <!--中间内容开始-->
    <div class="container-fluid">
         <div class="course-container">
           <!--详情内容-->
           <div class="notice-details  mint-cell-change">
                <div class="notice-details-content  bg-white border-b-grey-d">
                  <mt-cell class="bd title-img-list"  :title="title">
                    <img slot="icon" class="img border-radius-100" :src="notice.publishHeadPic" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'">
                    <div class="font-size-26"><i slot="icon" class="iconfont">&#xe626;</i>{{notice.publishTime }}</div>
                  </mt-cell>
                  <div class="fd news-image-text">
                    <p>{{notice.content }}</p>
                    <div class="details-content" v-for="(img, index) in notice.preveImgList" :key="index">
                      <div>
                        <!--<img slot="icon" :src="img" width="100%">-->
                        <img slot="icon" :src="img" :placeholder="img" style="width: 400px;height: 400px" @click.stop="showPic(img,notice.preveImgList)"/>
                      </div>
                    </div>
                  </div>
                  <div class="text-center btn-change" v-if="this.user.currRole===1 && this.user.userId===notice.publisherId">
                    <mt-button @click.native="noticeAgain" type="primary" class="btn-green-change bg-grad-green yahei">再次通知未读人员</mt-button>
                  </div>
                </div>
                <div class="notice-details-tab nav-tabs-change bg-white border-t-grey-d" v-if="this.user.currRole===1 && this.user.userId===notice.publisherId">
                  <mt-navbar v-model="selected">
                    <mt-tab-item id="1">未读人员({{readNotUserSum}}人)</mt-tab-item>
                    <mt-tab-item id="2">已读人员({{readUserSum}}人)</mt-tab-item>
                  </mt-navbar>
                  <!-- tab-container -->
                  <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                      <mt-cell class="border-b-grey-d mint-cell-change" :title="(recNoUser.receiveUserName.length>8 ? recNoUser.receiveUserName.substr(0, 7) : recNoUser.receiveUserName)"
                               v-for="(recNoUser, index) in notice.notRecUserList" :key="index"></mt-cell>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                      <mt-cell class="border-b-grey-d mint-cell-change" :title="(recUser.receiveUserName.length>8 ? recUser.receiveUserName.substr(0, 7) : recUser.receiveUserName)"
                               v-for="(recUser, index)  in notice.recUserList" :key="index"></mt-cell>
                    </mt-tab-container-item>
                  </mt-tab-container>
                </div>
           </div>
         </div>
    </div>
    <template><div v-show="flag"><no-content msg="Sorry! 数据被删除喽"></no-content></div></template>
    <!--中间内容结束-->
    <footer-menu menuSelected="班级"></footer-menu>
  </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import noContent from '@/components/nocontent'
import {mapActions, mapGetters} from 'vuex'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    classHeader, footerMenu, noContent
  },
  data: function () {
    return {
      selected: '1',
      msgId: '',
      title: '',
      infos: [],
      classId: '',
      roleId: '',
      flag: false,
      notice: {},
      readUserSum: '0',
      readNotUserSum: '0'
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  },
  created () {
    let that = this
    that.msgId = that.$route.query.msgId
    /** 根据班级ID判断是否从模板消息进入还是从班级消息列表进入**/
    that.classId = that.$route.query.classId
    that.roleId = that.$route.query.roleId
    if (that.classId != null && that.classId != '') {
      if (that.roleId != null && that.roleId != '') {
        // 获取当前用户下班级信息
        this.$http.post('/api/userinfo/queryMaterial', {roleId: that.roleId}).then(materialRes => {
          that.infos = materialRes.data
          for (var info of that.infos) {
            if (this.classId === info.classId) {
              this.SET_MATERIAL(info)
              break
            }
          }
        })

        this.SWITCH_ROLE({
          roleId: that.roleId,
          callback: function () {
            that.queryDetail(that.roleId)
          }
        })
      }
    } else {
      that.queryDetail(this.user.currRole)
    }
  },
  methods: {
    ...mapActions({
      SET_MATERIAL: 'SET_MATERIAL',
      SWITCH_ROLE: 'SWITCH_ROLE'
    }),
    showPic (imgUrl, preveImgList) {
      wx.previewImage({
        current: imgUrl, // 当前显示图片的http链接
        urls: preveImgList // 需要预览的图片http链接列表
      })
    },
    queryDetail: function (currRole) {
      this.$http.post('/api/notice/view', {
        noticeId: this.msgId,
        readRoleId: currRole
      }).then(res => {
        if (res === null || res.code !== 0) {
          return null
        }
        this.notice = res.data
        this.title = this.notice.publisherName + '发布了通知'
        this.notice.publishHeadPic = this.GLOBAL.ucenterQnDomain + 'headerimg/' + this.notice.publisherId + '.jpg'
        this.readUserSum = this.notice.recUserList.length
        this.readNotUserSum = this.notice.notRecUserList.length
      })
    },
    // 再次通知未读人员
    noticeAgain () {
      MessageBox.confirm('确定再次发布?').then(action => {
        this.$http.post('/api/notice/noticeUnread', {noticeId: this.msgId}).then(res => {
          if (res.code === 0) {
            this.$toast({
              message: '已经通知未读人员!',
              position: 'middle',
              duration: 1000
            })
            // this.$router.push('/class/news')
          } else {
            this.$toast('通知失败!')
          }
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
