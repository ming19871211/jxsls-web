<!--我的班级-->
<template>
  <div>
    <class-header backName="我" title="我的班级"></class-header>
    <!--中间内容开始-->
    <div class="container">
      <!--班级列表-->
      <div class="class-index my-class">
        <mt-cell :title="clss.className" :label="'绑定孩子：'+ clss.stdName" v-for="(clss, index) in classes" :key="index">
          <div class="address font-size-22"><i class="iconfont font-size-22">&#xe633;</i>&nbsp;{{clss.schlName+clss.clssName}}</div>
          <div class="btn-operate" style="bottom: 0rem;">
            <mt-button class="x" @click.native="unbundClick(clss)"><i slot="icon" class="iconfont">&#xe629;</i>解绑</mt-button>
          </div>
        </mt-cell>
      </div>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected='我'></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import {mapGetters} from 'vuex'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    classHeader, footerMenu
  },
  data: function () {
    return {
      classes: [],
      stuInfos: {}
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER'
    })
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      this.$http.post('/api/classical/studClss', {
        roleId: this.userInfo.currRole
      }).then(res => {
        this.stuInfos = res.data
        if (this.stuInfos != null && this.stuInfos.stdList != null) {
          this.classes = this.stuInfos.stdList
          return
        }
        this.classes = []
      })
    },
    unbundClick: function (values) {
      MessageBox.confirm('确认解绑学生').then(action => {
        this.$http.post('/api/classical/studUnbund', {
          parentId: this.userInfo.userId,
          stdId: values.stdId
        }).then(res => {
          if (res !== null && res.code === 0) {
            MessageBox.alert('解绑成功').then(action => {
              this.init()
            })
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
