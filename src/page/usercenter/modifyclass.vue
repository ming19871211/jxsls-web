<!--修改班级-->
<template>
  <div>
    <class-header title="修改班级"></class-header>
    <!--中间内容开始-->
    <div class='container-fluid'>
         <div class="modify-class bg-white mint-cell-change">
           <div class="create-form change-input border-b-grey-d">
             <mt-field class="border-t-grey-d" label="班级标识" :placeholder="classInfo.clssCode" :readonly="true"></mt-field>
             <mt-field class="border-t-grey-d" label="学校名称" :placeholder="classInfo.schlName" :readonly="true"></mt-field>
             <mt-field v-if="tchRole == 1" class="border-t-grey-d mint-field-clear-no" label="年级" :placeholder="classInfo.gradeName" :readonly="true" v-model="gradeName" @click.native="gradeClick"><i class="iconfont font-size-26 font-color-black">&#xe791;</i></mt-field>
             <mt-field v-if="tchRole == 2" class="border-t-grey-d mint-field-clear-no" label="年级" :placeholder="classInfo.gradeName" :readonly="true" v-model="gradeName" ></mt-field>
             <mt-field v-if="tchRole == 1" class="border-t-grey-d" label="班级" placeholder="请输入班级名称" v-model="className"></mt-field>
             <mt-field v-if="tchRole == 2" class="border-t-grey-d" label="班级" placeholder="请输入班级名称" :readonly="true" v-model="className"></mt-field>
           </div>
         </div>
         <div class="text-center btn-change"><mt-button type="primary" class="btn-green-change bg-grad-green yahei" @click.native="submit">确&nbsp;定</mt-button></div>
        <!--年级弹出-->
        <mt-popup class="change-popup-bottom" v-model="popupGrade"  position="bottom" modal=false>
           <div class="text-right"><mt-button size="small" class="bg-none close" @click.native="gradeClickConfirm">确定</mt-button></div>
           <picker :slots="slots" value-key="gradeName"  @change="onValuesChange"></picker>
        </mt-popup>
        <mt-popup class="change-popup-bottom" v-model="popupSubject" position="bottom" modal=false>
          <div class="text-right"><mt-button size="small" class="bg-none close" @click.native="gradeClickConfirm">确定</mt-button></div>
          <picker :slots="slots2" value-key="subjectName" @change="onValuesSubject"></picker>
        </mt-popup>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected='我'></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import picker from '../../components/picker/picker'
import {mapGetters} from 'vuex'
import { MessageBox, Toast } from 'mint-ui'

export default {
  components: {
    classHeader, footerMenu, picker
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER'
    })
  },
  data: function () {
    return {
      classInfo: this.$route.params.clssInfo,
      popupGrade: false,
      popupSubject: false,
      gradeId: '',
      className: '',
      gradeName: '',
      tchRole: '',
      flag: 0,
      flag2: 0,
      subjectName: '',
      subjectId: '',
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      slots2: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  created: function () {
    this.className = this.classInfo.clssName
    this.tchRole = this.classInfo.teacherRole
    this.subjectName = this.classInfo.subjectName
    this.subjectId = this.classInfo.subjectId
    this.$http.post('/api/dir/getGrades')
      .then(res => {
        if (res !== null && res.code === 0) {
          this.slots[0].values = res.data
          this.gradeName = this.classInfo.gradeName
          this.gradeId = this.classInfo.gradeId
          this.querySubject()
        }
      })
  },
  methods: {
    gradeClick: function () {
      this.popupGrade = true
    },
    subjectClick: function () {
      this.popupSubject = true
    },
    gradeClickConfirm: function () {
      this.popupGrade = false
      this.popupGrade = false
    },
    onValuesChange (picker, values) {
      if (values[0]) {
        if (this.flag === 0) {
          // this.subject = '体育'
          this.flag = 1
        } else {
          this.gradeId = values[0].gradeId
          this.gradeName = values[0].gradeName
        }
      }
    },
    onValuesSubject (picker, values) {
      if (values[0]) {
        if (this.flag2 === 0) {
          // this.subject = '体育'
          this.flag2 = 1
        } else {
          this.subjectName = values[0].subjectName
          this.subjectId = values[0].subjectId
        }
      }
    },
    submit: function () {
      if (!this.checkValue()) {
        return
      }
      this.$http.post('/api/classical/modifyClss', {
        classId: this.classInfo.clssId,
        schlId: this.classInfo.schlId,
        className: this.className,
        gradeId: this.gradeId,
        roleId: this.userInfo.currRole
      }).then(res => {
        if (res !== null && res.code === 0) {
          this.$router.push({name: '我的班级'})
        } else if (res === null) {
          this.showMsgBox('后台业务故障')
        } else {
          this.showMsgBox(res.msg)
        }
      })
    },
    querySubject: function () {
      this.$http.post('/api/dir/getSubject', {
        learnId: null,
        gradeId: this.gradeId
      }).then(res => {
        if (res !== null && res.code === 0) {
          this.slots2[0].values = res.data
        }
      })
    },
    showMsgBox: function (value) {
      MessageBox('提示', value)
    },
    checkValue: function () {
      if (this.className == null || this.className == '') {
        Toast('请填写正确的“班级名称”')
        return false
      }
      return true
    }
  }
}

</script>

<style scoped>

</style>
