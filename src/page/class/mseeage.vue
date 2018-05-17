<!--新消息-->
<template>
 <div>
   <class-header></class-header>
   <!--中间内容开始-->
   <div class="container">
     <!--新消息内容-->
     <div class="class-mseeage">
          <div class="item mint-cell-change bg-white border-radius-10 border-grey-d" v-for="(message, index) in messages" :key="index">
             <i class="iconfont icons font-color-white block border-radius-100 text-center">&#xe628;</i>
             <mt-cell title="您收到1条活动评论" :label="message.content" @click.native="queryDetail(message.activityId)">
                <div class="time arial"><i class="iconfont">&#xe626;</i>{{message.time}}</div>
             </mt-cell>
          </div>
     </div>
   </div>
   <!--中间内容结束-->
   <footer-menu menuSelected="班级"></footer-menu>
 </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import {mapGetters} from 'vuex'

export default {
  components: {
    classHeader, footerMenu
  },
  data () {
    return {
      messages: []
    }
  },
  computed: {
    ...mapGetters({
      material: 'GET_MATERIAL'
    })
  },
  created () {
    this.queryCommentData()
  },
  methods: {
    queryCommentData: function () {
      var that = this
      this.$http.post('/api/activity/getComment', {
        classId: that.material.classId
      }).then(res => {
        if (res === null || res.code !== 0) { return null }
        for (var i = 0; i < res.data.length; i++) {
          that.messages.push(res.data[i])
        }
      })
    },
    queryDetail: function (msgId) {
      console.log(this.material.classId)
      this.$http.post('/api/activity/delCommentForRedis', {
        activityId: msgId,
        classId: this.material.classId
      }).then(res => {
        console.log(res.code)
      })
      this.$router.push({name: '活动详情', query: {msgId: msgId}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
