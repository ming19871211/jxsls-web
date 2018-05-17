<template>
  <div>
    <mt-header class="header-menu" :title="title">
      <mt-button slot="left" @click="handleClose"><i class="iconfont">&#xe79f;</i>返回</mt-button>
      <div slot="right">
        <mt-button class="screen" @click.native="screenClick"><i class="iconfont">&#xe695;</i></mt-button>
        <mt-button v-if="user.currRole===1" class="release" @click.native="releaseClick"><i class="iconfont">&#xe62f;</i></mt-button>
      </div>
    </mt-header>
    <div class="header-popup">

      <mt-popup class="popup-screen" v-model="popupVisiblescreen" position="top" popup-transition="popup-fade">
        <mt-cell  @click.native="chose( '')"><i class="iconfont" style="color: #44c09e">&#xe644;</i>全部</mt-cell>
        <mt-cell  @click.native="chose( '01')"><i class="iconfont" style="color: #ff7373">&#xe637;</i>通知</mt-cell>
        <mt-cell  @click.native="chose( '03')"><i class="iconfont" style="color: #fccc77">&#xe625;</i>作业</mt-cell>
        <mt-cell  @click.native="chose( '04')"><i class="iconfont" style="color: #f38cf4">&#xe684;</i>课表</mt-cell>
        <mt-cell  @click.native="chose( '02')"><i class="iconfont" style="color: #58beff">&#xe601;</i>成绩</mt-cell>
        <mt-cell  @click.native="chose( '05')"><i class="iconfont" style="color: #6ad06c">&#xe6a1;</i>活动</mt-cell>

      </mt-popup>
      <mt-popup class="popup-release" v-model="popupVisible1release" position="top" popup-transition="popup-fade" v-if="user.currRole===1">
        <!-- is-link  :to = "{path: '/class/notice/edit',params: {classId: classId}}" @click.native="toPage('notice')" -->
        <mt-cell  :to="{path: '/class/notice/edit',query: {classId: classId}}" ><i class="iconfont" style="color: #ff7373; border-color: #ff7373;">&#xe637;</i>
          <div>通知</div>
        </mt-cell>
        <mt-cell  :to="{path: '/class/homework/edit',query: {classId: classId}}" ><i class="iconfont" style="color: #fccc77; border-color: #fccc77;">&#xe625;</i>
          <div>作业</div>
        </mt-cell>
        <mt-cell  :to="{path: '/class/course/edit',query: {classId: classId}}"><i class="iconfont" style="color: #f38cf4; border-color: #f38cf4;">&#xe684;</i>
          <div>课表</div>
        </mt-cell>
       <mt-cell  :to="{path: '/class/score/uploadboot',query: {classId: classId}}"><i class="iconfont" style="color: #58beff; border-color: #58beff;">&#xe601;</i>
          <div>成绩</div>
        </mt-cell>
        <mt-cell  :to="{path: '/class/event/edit',query: {classId: classId}}"><i class="iconfont" style="color: #6ad06c; border-color: #6ad06c;">&#xe6a1;</i>
          <div>活动</div>
        </mt-cell>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data: function () {
    return {
      msg: '组件',
      popupVisiblescreen: false,
      popupVisible1release: false
    }
  },
  props: {
    title: {
      type: String,
      default: '班级'
    },
    backName: {
      type: String,
      default: ''
    },
    classId: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClose: function () {
      if (!this.backName) {
        this.$router.back()
      }
      this.$router.push({name: this.backName})
    },
    add: function () {
      console.log('增加')
    },
    screenClick: function () {
      this.popupVisiblescreen = true
    },
    releaseClick: function () {
      this.popupVisible1release = true
    },
    toPage: function (type) {
      // debugger
      if (type === 'notice') {
        this.$router.push({path: '/class/notice/edit', query: {classId: this.classId}})
      }
    },
    chose: function (msgType) {
      this.$emit('changeType', msgType)
      this.popupVisiblescreen = false
    }
  },
  create () {
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
