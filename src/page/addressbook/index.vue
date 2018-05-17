<!--通讯录主页-->
<template>
  <div>
    <class-header isback='false' title="通讯录"></class-header>
    <!--中间内容开始-->
    <div class="container-fluid">
      <div class="course-container">
        <!--对象内容-->
        <div class="notice-object address-book mint-cell-change">
          <!--新消息-->
          <div class="new-info-box text-center" v-if="auditStyle === 1 && userInfo.currRole === 1">
            <mt-button @click="openclassmsg()">
              <i class="iconfont" slot="icon">&#xe7b6;</i> 您收到新的审核消息
            </mt-button>
          </div>
          <mt-field class="input-placeholder-black change-input border-t-grey-d border-b-grey-d mint-field-clear-no" readonly :placeholder="defaultClass" v-model="className" @click.native="gradeClassClick"><i class="iconfont font-size-26 font-color-black">&#xe791;</i></mt-field>
          <mt-index-list>
            <mt-index-section class="tea" index="★ 任课老师">
              <mt-cell v-for="(teacher,index) in teachers" class="border-t-grey-d" :title="teacher.teacherName.length > 8 ? teacher.teacherName.substr(0, 7) : teacher.teacherName" :key="index" @click.native="teacherDetailClick(teacher)">
                <img slot="icon" class="icon-head border-radius-100 text-center" :src="teacher.headImg" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'">
              </mt-cell>
            </mt-index-section>
            <div class="event-edit-checklist stu border-b-grey-d"><div class="mint-checklist-title">学生</div></div>
            <mt-index-section class="border-b-grey-d" v-for="(item,index) in items" :index="item" :key="index">
              <mt-cell class="border-t-grey-d" v-for="(student,index) in students" :key="index" :title="(student.stdName.length > 8 ? student.stdName.substr(0, 7) : student.stdName)+ (student.stdNo == null? '': ' (学号:'+student.stdNo+')')" v-if="check(student.stdName) === item" @click.native="studentDetailClick(student)"></mt-cell>
            </mt-index-section>
          </mt-index-list>
        </div>
        <!--选择班级弹出-->
        <mt-popup class="change-popup-bottom"  v-model="popupGradeClass"  position="bottom"  modal=false>
          <div class="text-right"><mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button></div>
          <picker :slots="slots" value-key="className" @change="onValuesChange"></picker>
          <!--<picker :slots="slots" @change="onValuesChange"></picker>-->
        </mt-popup>
      </div>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected="通讯录"></footer-menu>
  </div>
</template>
<script>
/* eslint-disable no-trailing-spaces */
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import picker from '../../components/picker/picker'
import fileUpload from '../../components/file-upload/fileUpload'
import {mapActions, mapGetters} from 'vuex'
import {Pinyin} from '../../utils/ChinesePY'

export default {
  components: {
    classHeader, footerMenu, picker, fileUpload
  },
  data: function () {
    return {
      popupGradeClass: false,
      defaultClass: '',
      className: '',
      value: [],
      files: [],
      teachers: [],
      students: [],
      auditStyle: 0,
      // items: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      items: [],
      test: 0,
      flag: 0,
      tempClssId: '',
      auditList: [],
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
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
    ...mapActions({
      REMOVE_MSG_BY_CONDITION: 'REMOVE_MSG_BY_CONDITION'
    }),
    gradeClassClick: function () {
      this.popupGradeClass = true
    },
    subjectClickConfirm: function () {
      this.popupGradeClass = false
    },
    onValuesChange (picker, values) {
      if (values[0]) {
        if (this.flag === 0) {
          this.flag = 1
          return
        }
        this.className = values[0].className
        this.tempClssId = values[0].classId
        this.queryBook(this.tempClssId)
      }
    },
    queryBook: function (values) {
      this.$http.post('/api/classical/classBook', {
        clssId: values
      }).then(res => {
        var tchData = res.data.teachers
        this.teachers = []
        for (var m = 0; m < tchData.length; m++) {
          tchData[m].headImg = this.GLOBAL.ucenterQnDomain + 'headerimg/' + tchData[m].userId + '.jpg'
          this.teachers.push(tchData[m])
        }
        this.students = res.data.stds
        this.items = []
        for (var i = 0; i < this.students.length; i++) {
          var a = this.check(this.students[i].stdName)
          this.items.push(a)
        }
        var tmpJson = {}
        var tempRes = []
        for (var j = 0; j < this.items.length; j++) {
          if (!tmpJson[this.items[j]]) {
            tempRes.push(this.items[j])
            tmpJson[this.items[j]] = 1
          }
        }
        this.items = tempRes
        this.items.sort()
      })
    },
    init () {
      if (this.userInfo.currRole === 1) {
        this.$http.post('/api/classical/teacherClss', {
          roleId: this.userInfo.currRole
        }).then(res => {
          var classes = res.data
          this.tempClssId = res.data[0].clssId
          this.defaultClass = classes[0].gradeName + classes[0].clssName
          if (this.$route.params[0] == null || this.$route.params[0].classId == null) {
            this.queryBook(this.tempClssId)
          }
          for (var i = 0; i < classes.length; i++) {
            var data = {}
            data.classId = classes[i].clssId
            data.className = classes[i].gradeName + classes[i].clssName
            if (this.$route.params[0] != null && this.$route.params[0].classId != null && this.$route.params[0].classId === classes[i].clssId) {
              this.tempClssId = classes[i].clssId
              this.defaultClass = classes[i].gradeName + classes[i].clssName
              this.queryBook(this.tempClssId)
            }
            this.slots[0].values.push(data)
          }
          this.$http.post('/api/classical/classJoinQueryByUser', {
            // clssId: this.tempClssId
          })
            .then(res => {
              if (res.code === 0 && res.data.length > 0) {
                this.auditStyle = 1
                this.auditList = res.data
              }
            })
        })
      }
      if (this.userInfo.currRole === 2) {
        this.$http.post('/api/classical/studClss', {
          roleId: this.userInfo.currRole
        }).then(res => {
          var classes = res.data.stdList
          this.tempClssId = classes[0].clssId
          this.defaultClass = classes[0].clssName
          var tmpList = []
          if (this.$route.params[0] == null || this.$route.params[0].classId == null) {
            this.queryBook(classes[0].clssId)
          }
          for (var i = 0; i < classes.length; i++) {
            var data = {}
            data.classId = classes[i].clssId
            data.className = classes[i].clssName
            if (this.$route.params[0] != null && this.$route.params[0].classId != null && this.$route.params[0].classId === classes[i].clssId) {
              this.tempClssId = classes[i].clssId
              this.defaultClass = classes[i].clssName
              this.queryBook(this.tempClssId)
            }
            tmpList.push(data)
          }
          var tmpJson = {}
          var res2 = []
          for (var m = 0; m < tmpList.length; m++) {
            if (!tmpJson[tmpList[m].classId]) {
              res2.push(tmpList[m])
              tmpJson[tmpList[m].classId] = 1
            }
          }
          this.slots[0].values = res2
        })
      }
    },
    check: function (values) {
      return Pinyin.GetJP(values.toString().toUpperCase()).substring(0, 1)
    },
    teacherDetailClick: function (values) {
      this.$router.push({name: '通讯录老师详情', params: {teacherInfo: values, classId: this.tempClssId}})
    },
    studentDetailClick: function (values) {
      this.$router.push({name: '通讯录家长详情', params: {studentInfo: values, classId: this.tempClssId}})
    },
    openclassmsg: function () {
      this.REMOVE_MSG_BY_CONDITION({roleId: this.userInfo.currRole, msgType: ['6']})
      this.$router.push({name: '通讯录审核'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mint-cell-change {
  }
</style>
