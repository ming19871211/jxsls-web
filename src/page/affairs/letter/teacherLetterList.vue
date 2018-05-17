/* 事务-老师私信列表 */
<template>
  <div>
    <class-header isback='yes' title="我的私信" backName="老师事务"></class-header>
    <div class="container">
      <div class="affairs-index">
        <!-- 私信列表 -->
        <div class="class-mseeage parent-letter">
          <div v-for="(item,index) in chatList" v-bind:key="index" @click="toChatLetter(item)" class="item mint-cell-change bg-white border-radius-10 border-grey-d">
            <img class="icons block border-radius-100 text-center" :src="item.headImg" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'">
            <mt-cell :title="item.senderName|strlen(8)" :label="item.sendContent">
              <span slot="icon" class="list-grade-lable block pull-left">{{item.className}}</span>
              <div class="time arial">
                <i class="iconfont">&#xe626;</i>&nbsp;{{item.sendTime}}</div>
            </mt-cell>
          </div>
          <div v-show="pagination.noData" class="text-center" @click="chatListLoad">加载更多...</div>
        </div>
        <template>
          <div v-show="isInit && chatList.length === 0">
            <no-content msg="Sorry! 暂时还没有数据"></no-content>
          </div>
        </template>
      </div>
    </div>
    <footer-menu menuSelected="老师事务"></footer-menu>
  </div>
</template>
<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import noContent from '@/components/nocontent'
import { mapGetters } from 'vuex'

export default {
  components: { classHeader, footerMenu, noContent },
  data () {
    return {
      // 页面是否已经初始化完毕
      isInit: false,
      // 分页信息
      pagination: {
        noData: false,
        pageSize: 5,
        pageIndex: 1
      },
      // 列表数据
      chatList: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  },
  created () {
    this.chatListLoad()
  },
  methods: {
    // 加载私信列表
    chatListLoad () {
      var that = this
      that.$http.post('/api/chat/list', {
        receiverUserId: that.user.userId,
        pageNo: that.pagination.pageIndex,
        pageSize: that.pagination.pageSize
      }).then(res => {
        if (res === null || res.code !== 0) { return null }
        for (var i = 0; i < res.data.list.length; i++) {
          res.data.list[i].headImg = that.GLOBAL.ucenterQnDomain + 'headerimg/' + res.data.list[i].senderUserId + '.jpg'
          that.chatList.push(res.data.list[i])
          // console.log(JSON.stringify(res.data.list[i]))
        }
        that.pagination.noData = res.data.list.length === that.pagination.pageSize
        that.pagination.pageIndex++
        that.isInit = true
      })
    },
    toChatLetter (item) {
      // 重定向到私信对话页面
      this.$router.push({ name: '私信对话', query: { chatId: item.id, senderName: item.senderName, senderUserId: item.senderUserId, letterFlag: 1 } })
    }
  }
}
</script>
