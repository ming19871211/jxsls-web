<!--成绩列表-->
<template>
  <div>
    <class-header backName="班级消息" :title="'历史成绩  (' + className + ')'"></class-header>
    <!--中间内容开始-->
    <div class="container-fluid">
         <div class="score-container">
           <!--列表内容-->
           <div class="score-list list-change-time change-cell">
             <mt-cell :title="exam.examName" :label="exam.publishTime" class="border-grey-d border-radius-10" v-for="(exam, index) in exams" :key="index" @click.native="infoClick(exam.id)">
               <i class="time iconfont">&#xe626;</i>
             </mt-cell>
           </div>
         </div>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected="班级"></footer-menu>
  </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import picker from '../../../components/picker/picker'
import {mapGetters} from 'vuex'

export default {
  components: {
    classHeader, footerMenu, picker
  },
  data () {
    return {
      exams: [],
      msgId: '',
      className: ''
    }
  },
  created () {
    this.classId = this.$route.query.classId
    this.init()
  },
  methods: {
    init: function () {
      this.$http.post('/api/exam/viewList', {
        classId: this.classId
      }).then(res => {
        this.exams = res.data
        this.className = res.data[0].className
      })
    },
    infoClick: function (values) {
      if (this.user.currRole === 1) { 
        this.$router.push({name: '成绩详情', query: {msgId: values}})
      } else if (this.user.currRole === 2) { 
        this.$router.push({name: '家长成绩详情', query: {msgId: values}})
      }
    }
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
