/* 事务-家长请假列表 */
<template>
  <div>
    <class-header isback='yes' @add="addLeave" title="请假列表" backName="家长事务"></class-header>
    <div class="container">
       <div class="affairs-index">
         <!-- 学生请假 -->
         <div class="class-mseeage stu-leave list-change-time" v-for="(leave, index) in leavelist" :key="index">
           <div class="item mint-cell-change bg-white border-radius-10 border-grey-d" @click.stop="leaveView(leave.id)">
             <i class="icons s font-color-white block border-radius-100 text-center" v-if="leave.leaveType===1">事假</i>
             <i class="icons j font-color-white block border-radius-100 text-center" v-if="leave.leaveType===2">病假</i>
             <i class="icons q font-color-white block border-radius-100 text-center" v-if="leave.leaveType===3">其它</i>
             <mt-cell :title="leave.stuName.length > 8 ? leave.stuName.substr(0, 7) : leave.stuName" :label="leave.submitTime">
               <i class="time iconfont">&#xe626;</i>
               <span slot="icon" class="list-grade-lable block pull-left">{{leave.className}}</span>
             </mt-cell>
             <div class="state d" v-if="leave.leaveReplyStatus===0"></div>
             <div class="state t" v-if="leave.leaveReplyStatus===1"></div>
             <div class="state b" v-if="leave.leaveReplyStatus===2"></div>
           </div>
         </div>
         <div v-show="pagination.noData" class="text-center" @click="queryLeaveList">加载更多...</div>
       </div>
       <template><div v-show="flag"><no-content msg="Sorry! 暂时还没有数据"></no-content></div></template>
    </div>
    <footer-menu menuSelected="家长事务"></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/backheader'
import footerMenu from '@/components/footermenu'
import noContent from '@/components/nocontent'
import {mapGetters} from 'vuex'

export default {
  components: {
    classHeader, footerMenu, noContent
  },
  data: function () {
    return {
      selected: '2',
      classId: '',
      className: '',
      teacherId: '',
      flag: false,
      pagination: {
        noData: false,
        total: 0,
        pageSize: 5,
        pageIndex: 1
      },
      leavelist: []
    }
  },
  created () {
    this.queryLeaveList()
  },
  methods: {
    queryLeaveList: function () {
      var that = this
      this.$http.post('/api/leave/viewList', {
        roleId: that.user.currRole,
        pageNo: that.pagination.pageIndex,
        pageSize: that.pagination.pageSize
      }).then(res => {
        if (res === null || res.code !== 0) { return null }
        for (var i = 0; i < res.data.list.length; i++) {
          that.leavelist.push(res.data.list[i])
        }
        if (that.leavelist.length === 0) {
          this.flag = true
        }
        that.pagination.total = res.data.total
        that.pagination.noData = res.data.list.length === that.pagination.pageSize
        that.pagination.pageIndex++
      })
    },
    leaveView: function (leaveId) {
      this.$router.push({name: '家长请假详情', query: {leaveId: leaveId}})
    },
    addLeave: function () {
      this.$router.push({name: '添加请假'})
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  }
}
</script>

<style scoped>

</style>
