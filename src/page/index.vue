<template>
  <div>
    <header-menu @add="addClass"></header-menu>
    <div class="header-popup">
      <mt-popup class="popup-screen join" v-model="popupVisible" position="top" popup-transition="popup-fade">
        <mt-cell @click.native="createClass"><i class="iconfont" style="color: #44c09e">&#xe644;</i>创建班级
        </mt-cell>
        <mt-cell @click.native="joinClass"><i class="iconfont"
                                              style="color: #ff7373">&#xe9f2;</i>加入班级
        </mt-cell>
      </mt-popup>
    </div>
    <!--中间内容开始-->
    <div class="container">
      <!--班级列表-->
      <div class="class-index" v-for="(info, index) in infos" :key="index">
        <div @click="openclassmsg(index)">
          <mt-cell :title=" info.showLabel" :label="info.schName">
            <div v-show="info.status !== '0' && info.classRedDot>0" class="spot iconfont font-color-red">&#xe608;</div>
            <div class="audit font-color-red" v-show="info.status === '0'">审核中</div>
            <div class="code iconfont" @click.stop="openshare(index)">&#xe613;</div>
          </mt-cell>
        </div>
      </div>
    </div>
    <!--中间内容结束-->
    <!--没有班级信息-->
    <div class="no-prompt text-center" v-show="initClassVisible">
      <img src="../assets/images/add/no-sj.png" style="width:6.52rem; height: 6.52rem">
      <div class="text">您当前还没有加入班级！</div>
      <div class="text-center btn-change">
        <mt-button @click.native="createClass" type="primary" class="btn-green-change bg-grad-green yahei">创建班级
        </mt-button>
        <mt-button @click.native="joinClass" type="primary" class="btn-white-change bg-white yahei">加入班级
        </mt-button>
      </div>
    </div>
    <footer-menu menuSelected="班级"></footer-menu>
  </div>
</template>

<script>
import headerMenu from '@/components/headermenu/classheader'
import footerMenu from '@/components/footermenu'
import container from '@/components/container'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    headerMenu, footerMenu, container
  },
  data () {
    return {
      infos: [],
      popupVisible: false,
      initClassVisible: false,
      selected: '',
      roleId: '1'
    }
  },
  created () {
    // 初始化页面
    this.init()
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  },
  methods: {
    ...mapActions({
      SET_MATERIAL: 'SET_MATERIAL',
      SET_USER: 'SET_USER',
      REMOVE_MSG_BY_CONDITION: 'REMOVE_MSG_BY_CONDITION'
    }),
    init () {
      // console.log(this.user.currRole)
      // 如果存在角色信息，进行班级资料数据拉取
      if (this.user.currRole) {
        // 获取当前用户下班级信息
        this.$http.post('/api/userinfo/queryMaterial', {roleId: this.user.currRole}).then(materialRes => {
          // console.log(materialRes.data)
          this.infos = materialRes.data
          for (var info of this.infos) {
            info.classRedDot = this.$store.getters.GET_MSG_BY_CONDITION({roleId: [this.user.currRole], msgType: ['1', '2', '3', '4', '5'], classId: [info.classId]})
            if (info.teacherId) {
              if (info.headMasterId === info.teacherId) {
                info.showLabel = info.className + '  ' + '(班主任)'
              } else {
                info.showLabel = info.className + '  ' + '(' + info.subjectName + '老师)'
              }
            } else {
              info.showLabel = info.stuName + '  ' + info.className
            }
          }
        })
      } else {
        this.initClassVisible = true
      }
    },
    openclassmsg: function (index) {
      let material = this.infos[index]
      if (material.status !== '0') {
        // 把选择的资料信息写入vuex
        this.SET_MATERIAL(this.infos[index])
        this.REMOVE_MSG_BY_CONDITION({roleId: [this.user.currRole], msgType: ['1', '2', '3', '4', '5'], classId: [this.infos[index].classId]})
        this.$router.push({name: '班级消息'})
      }
    },
    openshare: function (index) {
      // 把选择的资料信息写入vuex
      this.$router.push({name: '班级分享', query: {classId: this.infos[index].classId}})
    },
    addClass () {
      this.popupVisible = true
    },
    createClass () {
      this.popupVisible = false
      this.$router.push({name: '一键创班'})
    },
    joinClass () {
      this.popupVisible = false
      this.$router.push({name: '加入班级'})
    }
  }
}

</script>
<style scoped>

</style>
