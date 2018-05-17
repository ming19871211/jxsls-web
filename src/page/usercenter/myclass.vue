<!--我的班级-->
<template>
  <div>
    <class-header backName="我" title="我的班级"></class-header>
    <!--中间内容开始-->
    <div class="container">
      <!--班级列表-->
      <div class="class-index my-class"  v-for="(clss, index) in classes" :key="index">
        <mt-cell :title="clss.gradeName+clss.clssName"  :label="clss.schlName">
          <div class="btn-operate" v-if="clss.teacherRole == 1">
            <mt-button class="x"  @click.native="modifyclass(clss)"><i slot="icon" class="iconfont">&#xe63b;</i>修改</mt-button>
            <mt-button class="z"  @click.native="overclass(clss)"><i slot="icon" class="iconfont">&#xe781;</i>转让</mt-button>
          </div>
          <div class="btn-operate" v-if="clss.teacherRole == 2">
            <mt-button class="t"  @click.native="exitclass(clss)"><i slot="icon" class="iconfont">&#xe626;</i>退出</mt-button>
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
import { MessageBox, Toast } from 'mint-ui'

export default {
  components: {
    classHeader, footerMenu
  },
  data: function () {
    return {
      classes: []
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
    modifyclass: function (values) {
      this.$router.push({name: '修改班级', params: {clssInfo: values}})
    },
    overclass: function (values) {
      this.$router.push({name: '转让班级', params: {clssInfo: values}})
    },
    exitclass: function (values) {
      MessageBox.confirm('确认退出').then(action => {
        this.$http.post('/api/classical/teacherUnbund', {
          classId: values.clssId,
          roleId: this.userInfo.currRole
        }).then(res => {
          if (res !== null && res.code === 0) {
            Toast({
              message: '退出成功',
              position: 'center',
              duration: 5000
            })
            this.init()
          } else if (res === null) {
            this.showMsgBox('后台业务故障')
          } else {
            this.showMsgBox(res.msg)
          }
        })
      })
    },
    init: async function () {
      this.$http.post('/api/classical/teacherClss', {
        roleId: this.userInfo.currRole
      }).then(res => {
        this.classes = res.data
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
