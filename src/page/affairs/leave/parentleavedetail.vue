/* 家长事务-请假详情 */
<!--suppress ALL -->
<template>
  <div>
    <class-header title="学生请假" backName="家长请假列表"></class-header>
    <div class="container-fluid" style="margin-bottom: 5rem">
       <div class="affairs-leave">
         <!--请假内容-->
         <div class="create-form change-input input-placeholder-black mint-cell-change">
           <mt-field class="border-b-grey-d mint-field-clear-no" label="班级" :value="leave.className" readonly></mt-field>
           <mt-field class="border-b-grey-d mint-field-clear-no" label="请假人" :value="leave.stuName" readonly></mt-field>
           <mt-field class="border-b-grey-d mint-field-clear-no" label="请假类型" :value="leave.leaveName" readonly></mt-field>
           <mt-field class="border-b-grey-d mint-field-clear-no" label="开始时间" :value="leave.leaveStartTime|moment('YYYY-MM-DD HH:mm')" readonly></mt-field>
           <mt-field class="border-b-grey-d mint-field-clear-no" label="结束时间" :value="leave.leaveEndTime|moment('YYYY-MM-DD HH:mm')" readonly></mt-field>
           <a data-v-7fcdea9e="" class="mint-cell reason mint-field is-textarea">
             <div class="mint-cell-wrapper">
               <div class="mint-cell-title">
                 <span class="mint-cell-text">请假理由</span>
               </div>
               <div class="mint-cell-value">
                 <div class="mint-field-core">
                   {{leave.leaveContent}}
                   <img :src="img" width="100%" v-for="(img,index) in leave.preveImgList" :key="index">
                 </div>
               </div>
             </div>
           </a>
         </div>
         <!--标记状态-->
         <div class="lable-state">
              <!--拒绝状态-->
              <img src="../../../assets/images/icon/icon-bh.png" v-if="leave.leaveReplyStatus===2">
              <!--已同意状态-->
              <img src="../../../assets/images/icon/icon-ty.png" v-if="leave.leaveReplyStatus===1">
              <!--待处理状态-->
              <img src="../../../assets/images/icon/icon-dcl.png" v-if="leave.leaveReplyStatus===0">
         </div>
         <!--请假操作状态-->
         <div class="leave-operate-text change-input mint-cell-change border-b-grey-d">
              <!--拒绝状态-->
              <mt-cell class="exp text-center" v-if="leave.leaveReplyStatus===2" title="已拒绝请假" :label="leave.leaveReplyContent"></mt-cell>
              <!--已同意状态-->
              <mt-cell class="exp text-center" v-if="leave.leaveReplyStatus===1" title="已同意请假" :label="leave.leaveReplyContent"></mt-cell>
              <!--待审核状态-->
              <mt-cell class="exp text-center" v-if="leave.leaveReplyStatus===0" title="待班主任审核"></mt-cell>
         </div>
       </div>
    </div>
    <footer-menu menuSelected="家长事务"></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    classHeader, footerMenu
  },
  data: function () {
    return {
      value: [],
      leaveId: '',
      sumday: '',
      leave: {},
      replyStatus: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  },
  created () {
    let that = this
    this.SWITCH_ROLE({
      roleId: 2,
      callback: function () {
        that.leaveId = that.$route.query.leaveId
        that.queryLeaveDetail()
      }
    })
  },
  methods: {
    ...mapActions({
      SWITCH_ROLE: 'SWITCH_ROLE'
    }),
    queryLeaveDetail: function () {
      this.$http.post('/api/leave/view', {
        leaveId: this.leaveId
      }).then(res => {
        console.log(res.data)
        if (res === null || res.code !== 0) { return null }
        this.leave = res.data
        try { this.leave.leaveStartTime = new Date(this.leave.leaveStartTime.replace(/-/g, '/').split('.')[0]) } catch (e) {}
        try { this.leave.leaveEndTime = new Date(this.leave.leaveEndTime.replace(/-/g, '/').split('.')[0]) } catch (e) {}
      })
    },
    dateDiff: function (sDate1, sDate2) {
      var aDate, oDate1, oDate2, iDays
      aDate = sDate1.split('-')
      oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) /* 转换为12-18-2002格式 */
      aDate = sDate2.split('-')
      oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) // 把相差的毫秒数转换为天数
      return iDays
    }
  }
}
</script>

<style scoped>

</style>
