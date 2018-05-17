<!--班级内容-->
<template>
  <!--中间内容开始-->
  <div class="container">
    <!--班级列表-->
    <div class="class-index">
      <div @click="openclassmsg(1)">
        <mt-cell title="三年级12班（班主任）" label="麓谷中心小学">
          <div class="spot iconfont font-color-red">&#xe608;</div>
          <div class="code iconfont" @click.stop="openshare(2)">&#xe613;</div>
        </mt-cell>
      </div>
      <div @click="openclassmsg(1)">
        <mt-cell title="一年级12班（数学老师）" label="麓谷中心小学">
          <div class="spot iconfont font-color-red">&#xe608;</div>
          <div class="audit font-color-red">审核中</div>
          <div class="code iconfont o" @click.stop="openshare(2)">&#xe613;</div>
        </mt-cell>
      </div>
      <div @click="openclassmsg(1)">
        <mt-cell title="一年级12班（数学老师）" label="麓谷中心小学">
          <div class="spot iconfont font-color-red">&#xe608;</div>
          <div class="audit font-color-red">审核中</div>
          <div class="code iconfont b" @click.stop="openshare(2)">&#xe613;</div>
        </mt-cell>
      </div>
    </div>
  </div>
  <!--中间内容结束-->
</template>

<script>
export default {
  data () {
    return {
      msg: '这是content'
    }
  },
  methods: {
    openclassmsg: function (classId) {
      this.$router.push({name: '班级消息', query: {classId: classId}})
    },
    openshare: function (classId) {
      this.$router.push({name: '班级分享', query: {classId: classId}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
