/* 通讯录审核 */
<template>
  <div>
    <class-header title="审核"></class-header>
    <div class="container-fluid">
       <div class="book-audit">
         <!--审核列表-->
         <div class="event-edit-checklist">
           <div class="mint-checklist-title font-color-red"><i class="iconfont font-size-30">&#xe60e;</i>&nbsp;待审核{{auditNum}}人</div>
         </div>
         <div class="class-mseeage book-audit-content border-t-grey-d">
           <div class="item mint-cell-change bg-white border-b-grey-d" v-for="(auditInfo, index) in auditInfos" v-if="auditInfo.roleId === 2" :key="index">
             <img class="icons block border-radius-100 text-center" src="../../assets/images/pic/pic_03.jpg">
             <mt-cell :title="auditInfo.userName+(auditInfo.relationId=='01'?'爸爸':'妈妈')" :label="'学号：'+ (auditInfo.stdNo == null? '' : auditInfo.stdNo)">
               <span slot="icon" class="list-grade-lable block pull-left">{{auditInfo.className}}</span>
               <div class="state text-right">
                 <mt-button class="pull-right block bg-none border-grey-d j" type="default" @click.native="passClick(auditInfo)"><i class="iconfont">&#xe602;</i>&nbsp;通过</mt-button>
                 <mt-button class="pull-right block bg-none border-grey-d t" type="default" @click.native="rejectClick(auditInfo)"><i class="iconfont">&#xe62d;</i>&nbsp;拒绝</mt-button>
               </div>
             </mt-cell>
           </div>
           <div class="item mint-cell-change bg-white border-b-grey-d" v-for="(auditInfo, index) in auditInfos" v-if="auditInfo.roleId === 1" :key="index">
             <img class="icons block border-radius-100 text-center" src="../../assets/images/pic/pic_03.jpg">
             <mt-cell :title="auditInfo.userName" label="老师">
               <span slot="icon" class="list-grade-lable block pull-left">{{auditInfo.className}}</span>
               <div class="state text-right">
                 <mt-button class="pull-right block bg-none border-grey-d j" type="default" @click.native="passClick(auditInfo)"><i class="iconfont">&#xe602;</i>&nbsp;通过</mt-button>
                 <mt-button class="pull-right block bg-none border-grey-d t" type="default" @click.native="rejectClick(auditInfo)"><i class="iconfont">&#xe62d;</i>&nbsp;拒绝</mt-button>
               </div>
             </mt-cell>
           </div>
         </div>
       </div>
    </div>
    <footer-menu menuSelected="通讯录"></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    classHeader, footerMenu
  },
  data: function () {
    return {
      auditInfos: [],
      auditNum: 0
    }
  },
  computed: {
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      this.$http.post('/api/classical/classJoinQueryByUser').then(res => {
        this.auditInfos = res.data
        this.auditNum = (res.data.length == null ? 0 : res.data.length)
      })
    },
    passClick: function (values) {
      MessageBox.confirm('确认通过').then(action => {
        this.$http.post('/api/userinfo/auditUser', {
          joinId: values.id,
          auditStatus: 1,
          roleId: values.roleId,
          auditId: values.userId,
          classId: values.classId
        }).then(res => {
          if (res !== null && res.code === 0) {
            this.init()
          } else if (res === null) {
            this.showMsgBox('后台业务故障')
          } else {
            this.showMsgBox(res.msg)
          }
        })
      })
    },
    rejectClick: function (values) {
      MessageBox.confirm('确认拒绝').then(action => {
        this.$http.post('/api/userinfo/auditUser', {
          joinId: values.id,
          auditStatus: 0,
          roleId: values.roleId,
          auditId: values.userId,
          classId: values.classId
        }).then(res => {
          if (res !== null && res.code === 0) {
            this.init()
          } else if (res === null) {
            this.showMsgBox('后台业务故障')
          } else {
            this.showMsgBox(res.msg)
          }
        })
      })
    },
    showMsgBox: function (value) {
      MessageBox('提示', value)
    }
  }
}
</script>

<style scoped>

</style>
