<!--成绩详情-->
<template>
  <div>
    <exam-header title="成绩" @edit="viewList"></exam-header>
    <!--中间内容开始-->
    <div class="container-fluid">
         <div class="score-container">
           <!--条件-->
           <mt-field class="score-select" placeholder="科目选择" v-model="subject" readonly  @click.native="selectClick"><i class="iconfont font-size-26 font-color-black">&#xe791;</i></mt-field>
           <!--详情内容-->
           <div class="score-details change-cell">
                <table cellpadding="0" cellspacing="0" width="100%" class="bg-white border-b-grey-d">
                    <tr>
                      <th class="border-t-grey-d border-l-grey-d">学生排名</th>
                      <th class="border-t-grey-d border-l-grey-d">学生姓名</th>
                      <th class="border-t-grey-d border-l-grey-d">学生成绩</th>
                    </tr>
                    <tr align="center" v-for="(score,index) in scores" :key="index">
                      <td class="border-t-grey-d border-l-grey-d">{{index+1}}</td>
                      <td class="border-t-grey-d border-l-grey-d">{{score.stuName}}</td>
                      <td class="border-t-grey-d border-l-grey-d">{{score.scores}}</td>
                    </tr>
                </table>
           </div>
           <!--弹出选择-->
           <mt-popup class="change-popup-bottom" v-model="popupSelect" position="bottom">
             <div class="text-right"><mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button></div>
             <picker :slots="slots" @change="onValuesSelect"></picker>
           </mt-popup>
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
import {mapGetters} from 'vuex'
export default {
  components: {
    examHeader, footerMenu, picker
  },
  data () {
    return {
      subject: '',
      msgId: '',
      popupSelect: false,
      slots: [
        {
          flex: 1,
          values: [''],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      scores: [],
      flag: '0',
      classId: '',
      className: ''
    }
  },
  created () {
    this.msgId = this.$route.query.msgId
    this.querySubjectName()
    this.queryExamInfo()
  },
  methods: {
    selectClick: function () {
      if (this.subject == '' || this.subject == null) {
        this.subject = this.slots[0].values[0]
        this.queryStudentScores(this.subject)
      }
      this.popupSelect = true
      this.flag = '1'
    },
    subjectClickConfirm: function () {
      this.popupSelect = false
    },
    onValuesSelect: function (picker, values) {
      if (this.flag === '1') {
        this.subject = values[0]
        this.queryStudentScores(values[0])
      }
    },
    querySubjectName: function () {
      this.$http.post('/api/exam/scoreSubjectName', {
        examId: this.msgId
      }).then(res => {
        this.$set(this.slots[0], 'values', res.data)
        if (res !== null && res.code === 0 && res.data !== null) {
          this.queryStudentScores(res.data[0])
          this.subject = res.data[0]
        }
      })
    },
    queryStudentScores: function (subjectName) {
      this.$http.post('/api/exam/score', {
        examId: this.msgId,
        subjectName: subjectName,
        sort: 'desc',
        roleId: this.user.currRole
      }).then(res => {
        if (res.code === 0 && res.data.scores.length > 0) {
          this.scores = res.data.scores
        }
      })
    },
    queryExamInfo: function () {
      this.$http.post('/api/exam/viewList', {
        examId: this.msgId
      }).then(res => {
        this.classId = res.data[0].classId
        this.className = res.data[0].className
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
