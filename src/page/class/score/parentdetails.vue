<!--成绩详情-->
<template>
  <div>
    <exam-header title="学生成绩" @edit="viewList"></exam-header>
    <!--中间内容开始-->
    <div class="container-fluid">
         <div class="score-container">
           <!--条件-->
           <div class="event-edit-checklist stu"><div class="mint-checklist-title">{{examName}}</div></div>
           <!--详情内容-->
           <div class="score-details change-cell">
                <table cellpadding="0" cellspacing="0" width="100%" class="bg-white border-b-grey-d" v-for="(std, index) in stds" :key="index">
                    <tr>
                      <th class="border-t-grey-d border-l-grey-d" width="25%">学生姓名</th>
                      <th class="border-t-grey-d border-l-grey-d" width="25%" style="font-weight: normal">{{std.stdName}}</th>
                      <th class="border-t-grey-d border-l-grey-d" width="25%">学生学号</th>
                      <th class="border-t-grey-d border-l-grey-d" width="25%" style="font-weight: normal">{{std.stdId}}</th>
                    </tr>
                    <tr align="center" v-for="(score,index) in std.scores" :key="index">
                      <td class="border-t-grey-d border-l-grey-d">{{score.subjectName0}}</td>
                      <td class="border-t-grey-d border-l-grey-d">{{score.score0}}</td>
                      <td class="border-t-grey-d border-l-grey-d">{{score.subjectName1}}</td>
                      <td class="border-t-grey-d border-l-grey-d">{{score.score1}}</td>
                    </tr>
                </table>
           </div>
           <template><div v-show="flag"><no-content msg="Sorry! 暂时还没有数据"></no-content></div></template>
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
import picker from '../../../components/picker/picker'
import {mapActions, mapGetters} from 'vuex'
import noContent from '@/components/nocontent'

export default {
  components: {
    examHeader, footerMenu, picker, noContent
  },
  data () {
    return {
      msgId: '',
      classExam: {},
      scores: [],
      stds: [],
      tmpStuId: '',
      examName: '',
      flag: false,
      classId: '',
      tmpStdName: ''
    }
  },
  created () {
    this.msgId = this.$route.query.msgId
    this.tmpStuId = this.$route.query.stuId
    this.tmpStdName = this.$route.query.stuName
    this.init()
  },
  methods: {
    init: function () {
      let that = this
      if (this.tmpStuId != null && this.tmpStuId != '') {
        this.SWITCH_ROLE({
          roleId: 2,
          callback: function () {
            that.queryStudentScores(that.tmpStuId)
          }
        })
      } else {
        this.queryStudentScores(this.material.stuId)
      }
    },
    ...mapActions({
      SET_MATERIAL: 'SET_MATERIAL',
      SWITCH_ROLE: 'SWITCH_ROLE'
    }),
    queryStudentScores: function (value) {
      let that = this
      this.$http.post('/api/exam/score', {
        examId: this.msgId,
        roleId: 2,
        stuId: value
      }).then(res => {
        if (res.code === 0 && res.data.length > 0) {
          this.stds = res.data
          this.examName = res.data[0].examName
          this.classId = res.data[0].classId
          // 获取当前用户下班级信息
          this.$http.post('/api/userinfo/queryMaterial', {roleId: 2}).then(materialRes => {
            that.infos = materialRes.data
            for (var info of that.infos) {
              if (this.classId === info.classId) {
                this.SET_MATERIAL(info)
                break
              }
            }
          })
          this.flag = false
        } else {
          this.flag = true
        }
      })
    },
    viewList: function () {
      if (this.classId != null && this.classId != '') {
        this.$router.push({name: '成绩列表', query: {classId: this.classId}})
      } else {
        this.$router.push({name: '班级消息'})
      }
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

</style>
