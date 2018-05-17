<!--通讯录老师详情-->
<template>
  <div>
    <class-header :res="results" title="老师详情" backName="通讯录"></class-header>
    <!--中间内容开始-->
    <div class='container-fluid'>
      <div class="user-data book-tea-details bg-white mint-cell-change">
        <mt-tabbar class="user-images">
          <mt-tab-item id="tab1">
            <img slot="icon" :src="headImg" class="border-radius-100" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'"> {{teacherInfo.teacherName}}
          </mt-tab-item>
        </mt-tabbar>
        <div class="create-form change-input border-b-grey-d input-placeholder-black">
          <mt-field class="border-t-grey-d input-placeholder-black" label="手机号码" readonly :placeholder="teacherInfo.teacherMobile">
            <i class="phone iconfont" @click="phoneCall" v-if="teacherInfo.teacherMobile != null && teacherInfo.teacherMobile != '' ">&#xe69a;</i>
          </mt-field>
          <mt-field class="border-t-grey-d input-placeholder-black" label="任教科目" readonly :placeholder="subjectName"></mt-field>
        </div>
        <div class="text-center btn-change" v-if="teacherInfo.userId !== userInfo.userId && userInfo.currRole === 1">
          <mt-button type="default" class="btn-green-change bg-none yahei" @click.native="exitclass">
            <i class="iconfont font-size-28">&#xe616;</i>&nbsp;删&nbsp;除
          </mt-button>
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
import { mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    classHeader, footerMenu
  },
  data: function () {
    return {
      subjectName: '',
      popupSubject: false,
      teacherInfo: this.$route.params.teacherInfo,
      clssId: this.$route.params.classId,
      results: [{classId: this.$route.params.classId}],
      headImg: ''
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER'
    })
  },
  created: function () {
    this.headImg = this.GLOBAL.ucenterQnDomain + 'headerimg/' + this.$route.params.teacherInfo.userId + '.jpg'
    this.$http.post('/api/dir/getSubject', {
      learnId: null
    })
      .then(res => {
        if (res !== null && res.code === 0) {
          var data = res.data
          for (var i = 0; i < data.length; i++) {
            if (this.teacherInfo.subjectId === data[i].subjectId) {
              this.subjectName = data[i].subjectName
            }
          }
        }
      })
  },
  methods: {
    exitclass: function (values) {
      MessageBox.confirm('确认删除老师').then(action => {
        this.$http.post('/api/classical/teacherUnbund', {
          teacherId: this.teacherInfo.teacherId,
          roleId: this.userInfo.currRole,
          classId: this.clssId
        }).then(res => {
          if (res !== null && res.code === 0) {
            MessageBox.alert('删除成功').then(action => {
              this.$router.push({ name: '通讯录', params: this.results })
            })
          } else if (res === null) {
            this.showMsgBox('后台业务故障')
          } else {
            this.showMsgBox(res.msg)
          }
        })
      })
    },
    phoneCall: function () {
      window.location.href = 'tel:' + this.teacherInfo.teacherMobile
    },
    showMsgBox: function (value) {
      MessageBox('提示', value)
    }
  }
}

</script>

<style scoped>

</style>
