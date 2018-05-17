/* 事务-私信 */
<template>
  <div class="body overflow-y-auto" :style="winHeight">
    <class-header  :title="title" :backName="letterBackName"></class-header>
    <div class="container-fluid">
      <div class="affairs-letter">
        <!--私信内容-->
        <div class="affairs-letter-l">
          <div class="line"></div>
          <img class="border-radius-100" :src="headImg" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'">
        </div>
        <div class="affairs-letter-content" style="margin-bottom:100px">
          <div v-show="!pagination.noData" class="text-center" @click="messageListLoad">查看更多...</div>
          <div v-for="(item,index) in messageList" :key="index">
            <div v-if="item.sendUserId!==user.userId">
              <div class="time overflow-hidden">
                <div class="l pull-left">{{item.sendTime|moment("MM-DD")}}</div>
                <div class="c pull-left border-radius-100">
                  <div class="border-radius-100"></div>
                </div>
                <div class="r pull-left">{{item.sendTime|moment("HH:mm:ss")}}</div>
              </div>
              <div class="dope l overflow-hidden mint-cell-change">
                <mt-cell class="border-grey-d border-radius-10" :title="item.sendContent"></mt-cell>
              </div>
            </div>
            <div v-if="item.sendUserId===user.userId">
              <div class="time overflow-hidden">
                <div class="l pull-left">{{item.sendTime|moment("MM-DD")}}</div>
                <div class="c pull-left border-radius-100">
                  <div class="border-radius-100"></div>
                </div>
                <div class="r pull-left">{{item.sendTime|moment("HH:mm:ss")}}</div>
              </div>
              <div class="dope r overflow-hidden mint-cell-change">
                <mt-cell class="border-grey-d border-radius-10 pull-right" :title="item.sendContent"></mt-cell>
              </div>
            </div>
          </div>
        </div>
        <!--私信输入框-->
        <div class="evaluate-input private-letter">
          <div class="border-grey-d bg-white border-radius-10 flex-box mint-cell-change">
            <mt-field  placeholder="添加回复~" class="text-input border-radius-10 mint-field-clear-no" v-model="sendContent"></mt-field>
            <mt-button type="default" class="btn-send bg-grad-green font-color-white font-size-30" @click="sendMessage">发&nbsp;送</mt-button>
          </div>
        </div>
      </div>
    </div>
    <footer-menu menuSelected="事务"></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import { mapGetters } from 'vuex'

export default {
  components: { classHeader, footerMenu },
  data: function () {
    return {
      winHeight: {
        height: document.documentElement.clientHeight + 'px'
      },
      title: '',
      headImg: '',
      // 消息列表分页信息
      pagination: {
        noData: false,
        pageSize: 10,
        pageIndex: 1
      },
      // 消息列表
      messageList: [],
      // 要发送的消息文本
      sendContent: '',
      letterBackName: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    }),
    // 地址栏参数列表
    query () {
      return {
        chatId: this.$route.query.chatId,
        senderName: this.$route.query.senderName,
        senderUserId: this.$route.query.senderUserId,
        receiverName: this.$route.query.receiverName,
        receiverUserId: this.$route.query.receiverUserId,
        letterFlag: this.$route.query.letterFlag
      }
    }
  },
  created () {
    var that = this
    that.messageListLoad()
    that.title = that.query.senderName ? that.query.senderName : that.query.receiverName
    that.headImg = that.GLOBAL.ucenterQnDomain + 'headerimg/' + (that.query.senderName ? that.query.senderUserId : that.query.receiverUserId) + '.jpg'
    if (that.query.letterFlag === 1) {
      that.letterBackName = '老师私信列表'
    } else {
      that.letterBackName = '家长私信列表'
    }
  },
  methods: {
    // 加载消息列表
    messageListLoad () {
      var that = this
      that.$http.post('/api/chat/viewList', {
        chatId: that.query.chatId,
        pageNo: that.pagination.pageIndex,
        pageSize: that.pagination.pageSize
      }).then(res => {
        if (res === null || res.code !== 0) { return null }
        for (var i = 0; i < res.data.list.length; i++) {
          // console.log(JSON.stringify(res.data.list[i].sendTime))
          try { res.data.list[i].sendTime = new Date(res.data.list[i].sendTime.replace(/-/g, '/')) } catch (e) { continue }
          that.messageList.unshift(res.data.list[i])
        }
        that.pagination.noData = res.data.list.length < that.pagination.pageSize
        that.pagination.pageIndex++
      })
    },
    // 发送消息
    sendMessage () {
      var that = this
      if (that.sendContent.length > 500) {
        Toast('消息内容请保持在500字以内')
        return
      }
      that.$http.post('/api/chat/message/send', {
        chatId: that.query.chatId,
        sendUserId: that.user.userId,
        sendContent: that.sendContent
      }).then(res => {
        if (res === null || res.code !== 0) { return null }
        that.messageList.push({
          chatId: that.query.chatId,
          sendUserId: that.user.userId,
          sendContent: that.sendContent,
          sendTime: new Date()
        })
        that.sendContent = ''
      })
    }
  }
}
</script>

<style scoped>
.body {
  background: rgb(255, 255, 255);
}
</style>
