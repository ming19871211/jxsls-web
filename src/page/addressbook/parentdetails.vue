<!--通讯录家长详情-->
<template>
  <div>
    <class-header :res="results" title="家长详情" backName="通讯录"></class-header>
    <!--中间内容开始-->
    <div class='container-fluid'>
         <div class="book-parent-details mint-cell-change">
           <div class="create-form bg-white change-input border-b-grey-d input-placeholder-black">
             <mt-field label="学生姓名" class="mint-field-clear-no p-detail-flag" :value="studentInfo.stdName" v-model="stdName" :readonly="false" @change="submitName()" focus><i class="iconfont" @click="changeName()" v-if="showIcon">&nbsp;&nbsp;&#xe678;</i></mt-field>
             <mt-field label="学生学号" :value="studentInfo.stdNo" readonly></mt-field>
           </div>
           <div class="container class-mseeage list">
             <div class="item mint-cell-change bg-white border-radius-10 border-grey-d" v-for="(parent, index) in parents" :key="index">
               <img class="icons block border-radius-100 text-center" :src="parent.headImg" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'">
               <mt-cell :title="parent.nickName + '(' +(parent.relationId == '01'? '爸爸': '妈妈') + ')'" :label="userInfo.currRole == 1?'手机号码': ''" >
                 <div class="time font-size-26" @click="exitClass(parent)" v-if="userInfo.currRole === 1"><i class="iconfont font-size-30">&#xe635;</i>&nbsp;删除</div>
                 <div class="tel pull-left arial font-color-black" v-if="userInfo.currRole === 1">{{parent.mobile}}</div>
                 <i class="phone iconfont" @click="phoneCall(parent.mobile)" v-if="userInfo.currRole === 1 && parent.mobile != null && parent.mobile != ''">&#xe69a;</i>
               </mt-cell>
             </div>
           </div>
         </div>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected='通讯录'></footer-menu>
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
      flag: true,
      showIcon: false,
      stdName: this.$route.params.studentInfo.stdName,
      popupSubject: false,
      studentInfo: this.$route.params.studentInfo,
      parents: [],
      results: [{classId: this.$route.params.classId}],
      clssId: this.$route.params.classId
    }
  },
  created: function () {
    var data = this.studentInfo.parents
    for (var i = 0; i < data.length; i++) {
      data[i].headImg = this.GLOBAL.ucenterQnDomain + 'headerimg/' + data[i].userId + '.jpg'
      this.parents.push(data[i])
      if (data[i].userId == this.userInfo.userId) {
        this.showIcon = true
      }
    }
    if (this.userInfo.currRole == 1) {
      this.showIcon = true
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER'
    })
  },
  methods: {
    exitClass: function (values) {
      MessageBox.confirm('确认删除学生' + values.nickName + '的家长').then(action => {
        this.$http.post('/api/classical/studUnbund', {
          parentId: values.userId,
          stdId: this.studentInfo.stdId,
          classId: this.clssId,
          roleId: this.userInfo.currRole
        }).then(res => {
          if (res !== null && res.code === 0) {
            MessageBox.alert('删除成功').then(action => {
              this.$router.push({name: '通讯录', params: this.results})
            })
          } else if (res === null) {
            this.showMsgBox('后台业务故障')
          } else {
            this.showMsgBox(res.msg)
          }
        })
      })
    },
    phoneCall: function (values) {
      window.location.href = 'tel:' + values
    },
    showMsgBox: function (value) {
      MessageBox('提示', value)
    },
    changeName (e) {
      this.flag = false
      document.documentElement.querySelector('.p-detail-flag .mint-field-core').focus()
    },
    submitName () {
      this.$http.post('/api/classical/stdInfoUpdate', {
        stdId: this.studentInfo.stdId,
        clssId: this.clssId,
        stdName: this.stdName,
        roleId: this.userInfo.currRole
      }).then(res => {
        if (res !== null && res.code === 0) {
          this.flag = true
          Toast('修改成功')
        } else if (res === null) {
          this.showMsgBox('后台业务故障')
        } else {
          this.showMsgBox(res.msg)
        }
      })
    }
  }
}

</script>

<style scoped>
.iconfont {
    font-size: 0.6rem;
}
</style>
