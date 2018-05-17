<!--成绩上传引导-->
<template>
  <div>
    <exam-header title="成绩上传引导" @edit="viewList"></exam-header>
    <!--中间内容开始-->
    <div class="container">
         <div class="upload-boot bg-white border-radius-10">
             <img src="../../../assets/images/add/cj_03.jpg" width="100%">
             <img src="../../../assets/images/add/cj_05.jpg" width="100%">
             <img src="../../../assets/images/add/cj_06.jpg" width="100%">
             <img src="../../../assets/images/add/cj_07.jpg" width="100%">
             <img src="../../../assets/images/add/cj_08.jpg" width="100%">
         </div>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected="班级"></footer-menu>
  </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import examHeader from '@/components/headermenu/examHeader'
import footerMenu from '@/components/footermenu'
import {mapGetters} from 'vuex'

export default {
  components: {
    examHeader, footerMenu
  },
  data () {
    return {
      classId: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    viewList: function () {
      if (this.classId != null && this.classId != '') {
        this.$router.push({name: '成绩列表', query: {classId: this.classId}})
      } else {
        this.$router.push({name: '班级消息'})
      }
    },
    init: function () {
      this.classId = this.material.classId
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER',
      material: 'GET_MATERIAL'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload-boot{
  padding: 0.54rem 0
}
</style>
