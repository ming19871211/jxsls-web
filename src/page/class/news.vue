<!--班级消息-->
<template>
 <div>
   <publish-header :title="className" @changeType="getType" backName="班级"></publish-header>
   <!--中间内容开始-->
   <div class="container">
     <div class="class-news">
        <!--新消息-->
        <div class="new-info-box text-center" v-show="flagMessage">
          <mt-button @click="openclassmsg()">
            <i class="iconfont" slot="icon">&#xe7b6;</i> {{messageSum}}条评论
          </mt-button>
        </div>
        <!--消息列表-->
        <div class="class-news-list">
          <ul infinite-scroll-immediate-check="true" v-for="(message, index) in messagelist" :key="index">
            <li class="item bg-white border-radius-10 border-grey-d" @click.stop="queryDetail(message.msgId,message.msgType)">
              <mt-cell class="hd border-b-grey-d" v-if="message.msgType==='01'" title="通知">
                <span v-if="user.currRole==1 && headMasterId===message.sendUserId" @click.stop="deleteClassMessage(message.msgId,message.msgType,index)"><i slot="icon" class="iconfont" style="color: #ff7c7c">&#xe635;</i>删除</span>
                <i slot="icon" class="iconfont" style="color: #ff7373">&#xe637;</i>
              </mt-cell>
              <mt-cell class="hd border-b-grey-d" v-if="message.msgType==='03'" title="作业">
                <span v-if="user.currRole==1 && headMasterId===message.sendUserId" @click.stop="deleteClassMessage(message.msgId,message.msgType,index)"><i slot="icon" class="iconfont" style="color: #ff7c7c">&#xe635;</i>删除</span>
                <i slot="icon" class="iconfont" style="color: #fccc77">&#xe655;</i>
              </mt-cell>
              <mt-cell class="hd border-b-grey-d" v-if="message.msgType==='02'" title="成绩">
                <span v-if="user.currRole==1 && headMasterId===message.sendUserId" @click.stop="deleteClassMessage(message.msgId,message.msgType,index)"><i slot="icon" class="iconfont" style="color: #ff7c7c">&#xe635;</i>删除</span>
                <i slot="icon" class="iconfont" style="color: #58beff">&#xe601;</i>
              </mt-cell>
              <mt-cell class="hd border-b-grey-d" v-if="message.msgType==='05'" title="活动">
                <span v-if="user.currRole==1 && headMasterId===message.sendUserId" @click.stop="deleteClassMessage(message.msgId,message.msgType,index)"><i slot="icon" class="iconfont" style="color: #ff7c7c">&#xe635;</i>删除</span>
                <i slot="icon" class="iconfont" style="color: #6ad06c">&#xe6a1;</i>
              </mt-cell>
              <mt-cell class="hd border-b-grey-d" v-if="message.msgType==='04'" title="课表">
                <span v-if="user.currRole==1 && headMasterId===message.sendUserId" @click.stop="deleteClassMessage(message.msgId,message.msgType,index)"><i slot="icon" class="iconfont" style="color: #ff7c7c">&#xe635;</i>删除</span>
                <i slot="icon" class="iconfont" style="color: #f38cf4">&#xe684;</i>
              </mt-cell>
              <mt-cell class="bd"  :title="message.sendUserName+'发布了消息'">
                <img slot="icon" style="width:1.56rem;height:1.56rem;" class="img border-radius-100" v-if="message.sendUserHeadPic != null" :src="message.sendUserHeadPic" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'">
                <div class="time font-size-26"><i slot="icon" class="iconfont">&#xe626;</i>{{message.sendTime|dateconver() }}</div>
              </mt-cell>
              <div class="fd news-image-text">
                   <p>{{message.content|strlen(25)}}</p>
                  <div class="content flex-box">
                     <div class="flex-li overflow-hidden" v-for="(img, index1) in message.preveImgList" v-if="index1<2" :key="index1">
                       <img slot="icon" :src="img" style="width: 300px;height: 300px" @click.stop="showPic(img,message.preveImgList)">
                     </div>
                  </div>
              </div>
            </li>
          </ul>
        </div>
       <div v-show="pagination.noData" class="text-center" @click="queryClassMessageList">加载更多...</div>
     </div>
     <template><div v-show="flag"><no-content msg="Sorry! 暂时还没有数据"></no-content></div></template>
   </div>
   <!--中间内容结束-->
   <footer-menu menuSelected="班级"></footer-menu>
 </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import publishHeader from '@/components/headermenu/publishheader'
import footerMenu from '@/components/footermenu'
import noContent from '@/components/nocontent'
import {mapGetters} from 'vuex'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    publishHeader, footerMenu, noContent
  },
  data () {
    return {
      messagelist: [],
      className: '',
      msgType: '',
      flag: false,
      flagMessage: false,
      messageSum: 0,
      pagination: {
        noData: false,
        pageSize: 10,
        pageIndex: 1
      },
      headMasterId: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER',
      material: 'GET_MATERIAL'
    })
  },
  created () {
    console.log(this.material)
    this.className = this.material.className
    this.headMasterId = this.material.userId
    this.msgType = this.$route.query.msgType
    console.log(this.$route.query)
    this.queryClassMessageList()
    this.queryCommentData()
  },
  methods: {
    openclassmsg () {
      this.$router.push({name: '新消息'})
    },
    queryClassMessageList: function () {
      var that = this
      that.$http.post('/api/class/queryClassMessageList', {
        classId: that.material.classId,
        receiveRoleId: that.user.currRole,
        msgType: that.msgType,
        pageNo: that.pagination.pageIndex,
        pageSize: that.pagination.pageSize
      }).then(res => {
        console.log(res.data)
        if (res === null || res.code !== 0) { return null }
        for (var i = 0; i < res.data.list.length; i++) {
          res.data.list[i].sendUserHeadPic = this.GLOBAL.ucenterQnDomain + 'headerimg/' + res.data.list[i].sendUserId + '.jpg'
          that.messagelist.push(res.data.list[i])
        }
        if (that.messagelist.length === 0) {
          that.flag = true
        } else {
          that.flag = false
        }
        that.pagination.noData = res.data.list.length === that.pagination.pageSize
        that.pagination.pageIndex++
      })
    },
    queryCommentData: function () {
      var that = this
      this.$http.post('/api/activity/getComment', {
        classId: that.material.classId
      }).then(res => {
        if (res === null || res.code !== 0) { return null }
        if (res.data != null && res.data.length > 0) {
          that.flagMessage = true
          that.messageSum = res.data.length
        }
      })
    },
    deleteClassMessage: function (msgId, msgType, itemIndex) {
      MessageBox.confirm('确认删除么').then(action => {
        if (msgType === '01') { // 通知
          this.$http.post('/api/notice/del', {
            noticeId: msgId,
            noticeUserId: this.user.userId
          }).then(res => {
            console.log(res.msg)
            this.messagelist.splice(itemIndex, 1)
          })
        } else if (msgType === '02') { // 成绩
          this.$http.post('/api/exam/del', {
            examId: msgId
          }).then(res => {
            console.log(res.msg)
            this.messagelist.splice(itemIndex, 1)
          })
        } else if (msgType === '03') { // 作业
          this.$http.post('/api/homework/del', {
            homeWorkId: msgId,
            homeworkUserId: this.user.userId
          }).then(res => {
            console.log(res.msg)
            this.messagelist.splice(itemIndex, 1)
          })
        } else if (msgType === '04') { // 课表
          this.$http.post('/api/timetab/del', {
            timeTabId: msgId,
            roleId: this.user.currRole
          }).then(res => {
            console.log(res.msg)
            this.messagelist.splice(itemIndex, 1)
          })
        } else if (msgType === '05') { // 活动
          this.$http.post('/api/activity/del', {
            activityId: msgId,
            classId: this.material.classId
          }).then(res => {
            console.log(res.msg)
            this.messagelist.splice(itemIndex, 1)
          })
        }
      })
    },
    queryDetail: function (msgId, msgType) {
      if (msgType === '01') { // 通知
        this.$router.push({name: '通知详情', query: {msgId: msgId}})
      } else if (msgType === '02' && this.user.currRole === 1) { // 成绩
        this.$router.push({name: '成绩详情', query: {msgId: msgId}})
      } else if (msgType === '02' && this.user.currRole === 2) { // 成绩
        this.$router.push({name: '家长成绩详情', query: {msgId: msgId}})
      } else if (msgType === '03') { // 作业
        this.$router.push({name: '作业详情', query: {msgId: msgId}})
      } else if (msgType === '04') { // 课表
        this.$router.push({name: '课表详情', query: {msgId: msgId}})
      } else if (msgType === '05') { // 活动
        this.$router.push({name: '活动详情', query: {msgId: msgId}})
      }
    },
    getType (type) {
      this.msgType = type
      this.pagination.pageIndex = 1
      this.pagination.pageSize = 10
      this.messagelist = []
      this.queryClassMessageList()
    },
    showPic (imgUrl, preveImgList) {
      var attachImages = []
      var size = preveImgList.length
      if (size >= 2) {
        attachImages.push(preveImgList[0])
        attachImages.push(preveImgList[1])
      } else {
        attachImages.push(preveImgList[0])
      }
      wx.previewImage({
        current: imgUrl, // 当前显示图片的http链接
        urls: attachImages // 需要预览的图片http链接列表
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
