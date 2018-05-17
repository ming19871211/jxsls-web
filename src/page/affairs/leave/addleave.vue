/* 事务-添加请假 */
<template>
  <div>
    <mt-header class="header-menu" title="添加请假">
      <mt-button slot="left"  @click="handleClose"><i class="iconfont">&#xe79f;</i>返回</mt-button>
      <mt-button slot="right" @click.native="apply">确定</mt-button>
    </mt-header>
    <div class="container-fluid">
      <div class="affairs-leave affairs-add-leave">
        <!--请假内容-->
        <div class="create-form bg-white change-input  mint-cell-change" >
          <div class="input-placeholder-black">
            <mt-field class="border-b-grey-d mint-field-clear-no" label="请假班级" placeholder="请选择" v-model="choseClass" :readonly="true" @click.native="classClick">
              <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
            </mt-field>
            <mt-field class="border-b-grey-d mint-field-clear-no" label="请假学生" placeholder="请选择" v-model="choseStu" :readonly="true" @click.native="stuClick">
              <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
            </mt-field>
            <mt-field class="border-b-grey-d mint-field-clear-no" label="请假类型" placeholder="请选择" v-model="choseLeave" :readonly="true" @click.native="typeClick">
              <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
            </mt-field>
            <!--请假班级-->
            <mt-popup class="change-popup-bottom" v-model="popupClass" position="bottom" modal=false>
              <div class="text-right">
                <mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button>
              </div>
              <picker :slots="slots" value-key="className" @change="onValuesClass"></picker>
            </mt-popup>
            <!--请假学生-->
            <mt-popup class="change-popup-bottom" v-model="popupStu" position="bottom" modal=false>
              <div class="text-right">
                <mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button>
              </div>
              <picker :slots="slots2" value-key="stuName" @change="onValuesStudent"></picker>
            </mt-popup>
            <!--请假类型-->
            <mt-popup class="change-popup-bottom" v-model="popupType" position="bottom" modal=false>
              <div class="text-right">
                <mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button>
              </div>
              <picker :slots="slots3" value-key="leaveName" @change="onValuesLeaveType"></picker>
            </mt-popup>
            <mt-field class="border-b-grey-d mint-field-clear-no" label="告知老师" v-model="leaderName" readonly></mt-field>
            <!-- <mt-field class="border-b-grey-d mint-field-clear-no time-date" label="开始时间" placeholder="年/月/日" type="datetime-local" v-model="leaveStartTime"></mt-field>
            <mt-field class="border-b-grey-d mint-field-clear-no time-date" label="结束时间" placeholder="年/月/日" type="datetime-local" v-model="leaveEndTime"></mt-field> -->
            <mt-cell class="border-b-grey-d mint-field-clear-no mint-field" title="开始时间" @click.native="startTimeSel">
              <span class="mint-field-core">{{leaveStartTime | strtodate}}</span>
              <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
            </mt-cell>
            <datetime-picker
              ref="startTimePicker"
              type="datetime"
              v-model="leaveStartTime"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              hour-format="{value} 时"
              minute-format="{value} 分"
            >
            </datetime-picker>
            <mt-cell class="border-b-grey-d mint-field-clear-no mint-field" title="结束时间" @click.native="endTimeSel">
              <span class="mint-field-core">{{leaveEndTime | strtodate}}</span>
              <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
            </mt-cell>
            <datetime-picker
              ref="endTimePicker"
              type="datetime"
              v-model="leaveEndTime"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              hour-format="{value} 时"
              minute-format="{value} 分"
            >
            </datetime-picker>
          </div>
          <mt-field placeholder="请输入请假事由..." type="textarea" rows="6" v-model="leaveContent"></mt-field>
          <!--发布对象-->
          <file-upload ref="fileUpload" :autoUpload="true" @next="next" @error="error" @complete="complete"></file-upload>
        </div>
      </div>
    </div>
    <footer-menu menuSelected="家长事务"></footer-menu>
  </div>
</template>

<script>
/* eslint-disable indent */

import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import FileUpload from '@/components/file-upload/fileUpload'
import picker from '../../../components/picker/picker'
import datetimePicker from '@/components/datetime-picker'
import {mapGetters} from 'vuex'
import dateUtils from '@/utils/date'

export default {
  components: {
    classHeader, footerMenu, FileUpload, picker, datetimePicker
  },
  data: function () {
    return {
      popupClass: false,
      popupStu: false,
      popupType: false,
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot',
          textAlign: 'center'
        }
      ],
      slots2: [
        {
          flex: 1,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        }
      ],
      slots3: [
        {
          flex: 1,
          values: [{ leaveIdValue: '1', leaveName: '事假' }, { leaveIdValue: '2', leaveName: '病假' }, {leaveIdValue: '3', leaveName: '其他'}],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      stuEntityOptions: [],
      files: [],
      classIdValue: '',
      className: '',
      stuIdValue: '',
      stuName: '',
      leaveIdValue: '',
      leaderDetail: {},
      leaderId: '',
      leaderName: '',
      leaveContent: '',
      leaveStartTime: new Date(),
      leaveEndTime: new Date(+(new Date()) + 100000),
      choseClass: '',
      choseStu: '',
      choseLeave: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  },
  created: function () {
    console.log(this.user)
    this.queryUserClassList() /** 根据用户角色查找班级列表**/
    this.choseLeave = '事假'
    this.leaveIdValue = '1'
  },
  methods: {
    handleClose () {
      this.$router.push({name: '家长请假列表'})
    },
    startTimeSel () {
      this.$refs.startTimePicker.open()
    },
    endTimeSel () {
      this.$refs.endTimePicker.open()
    },
    classClick: function () {
      this.popupClass = true
    },
    stuClick: function () {
      this.popupStu = true
    },
    typeClick: function () {
      this.popupType = true
    },
    subjectClickConfirm: function () {
      this.popupClass = false
      this.popupStu = false
      this.popupType = false
    },
    onValuesClass (picker, values) {
      if (values[0]) {
        this.classIdValue = values[0].classId
        this.className = values[0].className
        this.choseClass = this.className
        /** 找对应的学生信息**/
        this.slots2[0].values = []
        for (var i = 0; i < this.stuEntityOptions.length; i++) {
          if (this.classIdValue === this.stuEntityOptions[i].classId) {
            let stuEntity = {
              stuId: this.stuEntityOptions[i].stuId,
              stuName: this.stuEntityOptions[i].stuName
            }
            this.slots2[0].values.push(stuEntity)
          }
        }
        /** 获取到默认的第一个学生的学生ID和学生姓名进行赋值**/
        if (this.slots2[0].values.length > 0) {
          this.stuIdValue = this.slots2[0].values[0].stuId
          this.stuName = this.slots2[0].values[0].stuName
          /** 将初始设置model**/
          this.choseStu = this.stuName
        }
        this.queryLeaderDetails(this.classIdValue)
      }
    },
    onValuesStudent (picker, values) {
      if (values[0]) {
        this.stuIdValue = values[0].stuId
        this.stuName = values[0].stuName
      }
    },
    onValuesLeaveType (picker, values) {
      if (values[0]) {
        this.leaveIdValue = values[0].leaveIdValue
        this.choseLeave = values[0].leaveName
      }
    },
    upload () {
      this.$refs.fileUpload.uploadFile()
    },
    next (res) {
      let total = res.total
      console.log('大小：', total.size)
      console.log('进度：', total.percent)
    },
    error (err) {
      console.log(err)
    },
    complete (fileUrl) {
      console.log('fileUrl:', fileUrl)
      this.files.push(fileUrl)
      console.log(this.files)
    },
    // 获取子组件传递的文件数组
    getFile (files) {
      // debugger
      console.log(files)
      this.files = []
      this.files = files
    },
    queryLeaderDetails: function (classId) {
      this.$http.post('/api/classical/queryDetail', {
        clssId: classId
      }).then(res => {
        console.log(res.data)
        this.leaderDetail = res.data
        this.leaderId = this.leaderDetail.headMasterId
        this.leaderName = this.leaderDetail.headMasterName
      })
    },
    queryUserClassList: function () {
      this.$http.post('/api/userinfo/queryMaterial', {
        roleId: this.user.currRole
      }).then(res => {
        var classList = res.data
        var classIdArray = []
        for (var i = 0; i < classList.length; i++) {
          /** 判断加入班级信息是否已经审核**/
          if (classList[i].status === '1') {
            let classEntity = {
              classId: classList[i].classId,
              className: classList[i].className
            }
            let stuEntity = {
              classId: classList[i].classId,
              stuId: classList[i].stuId,
              stuName: classList[i].stuName
            }
            this.stuEntityOptions.push(stuEntity)
            /** 获取班级信息去重复数据**/
            if (classIdArray.indexOf(classList[i].classId) === -1) {
              this.slots[0].values.push(classEntity)
              classIdArray.push(classList[i].classId)
            }
          }
        }
        if (this.slots[0].values.length > 0) {
          /** 获取默认第一个班级的班级名称和班级ID进行赋值**/
          this.classIdValue = this.slots[0].values[0].classId
          this.className = this.slots[0].values[0].className
          /** 将初始设置model**/
          this.choseClass = this.className
          for (var j = 0; j < this.stuEntityOptions.length; j++) {
            if (this.stuEntityOptions[j].classId === this.classIdValue) {
              let stuEntity = {
                stuId: this.stuEntityOptions[j].stuId,
                stuName: this.stuEntityOptions[j].stuName
              }
              this.slots2[0].values.push(stuEntity)
            }
          }
          /** 获取到默认的第一个学生的学生ID和学生姓名进行赋值**/
          if (this.slots2[0].values.length > 0) {
            this.stuIdValue = this.slots2[0].values[0].stuId
            this.stuName = this.slots2[0].values[0].stuName
            /** 将初始设置model**/
            this.choseStu = this.stuName
          }
          this.queryLeaderDetails(this.classIdValue)
        }
      })
    },
    dateDiff: function (sDate1, sDate2) {
      var dateFrom = new Date(sDate1.replace(/-/g, '/'))
      var dateTo = new Date(sDate2.replace(/-/g, '/'))
      var diff = dateTo.valueOf() - dateFrom.valueOf()
      var diffDay = parseFloat(diff / (1000 * 60 * 60 * 24))
      return diffDay
    },
    /**
     * @return {boolean}
     */
    CompareDate: function (d1, d2) {
      var dateFrom = new Date(d1)
      var dateTo = new Date(d2)
      var diff = dateTo.valueOf() - dateFrom.valueOf()
      if (diff > 0) {
        return true
      }
      return false
    },
    CompareStartTime: function (d1) {
      var datenow = new Date()
      var date1 = new Date(d1)
      var diff = datenow.valueOf() - date1.valueOf()
      if (diff > 0) {
        return true
      }
      return false
    },
    apply: function () {
      console.log(dateUtils.formatDateTime)
      var that = this
      var pictures = []
      var imgs = ''
      if (that.files.length > 0) {
        that.files.forEach(function (itm, idx) {
          pictures.push({img: itm.url})
        })
        imgs = JSON.stringify(pictures)
      }
      var leaveName = '事假'
      if (that.leaveIdValue === '2') { leaveName = '病假' } else if (that.leaveIdValue === '3') {
        leaveName = '其他'
      }
      if (that.classIdValue === '') {
        this.$toast('请选择班级')
        return
      }
      if (that.stuIdValue === '') {
        this.$toast('请选择学生')
        return
      }
      if (that.leaveStartTime === null || that.leaveStartTime === '') {
        this.$toast('输入开始时间')
        return
      }
      if (that.leaveEndTime === null || that.leaveEndTime === '') {
        this.$toast('输入结束时间')
        return
      }
      if (that.leaveContent === null || that.leaveContent === '') {
        this.$toast('输入请假事由')
        return
      }
      if (that.CompareDate(that.leaveStartTime, that.leaveEndTime) === false) {
        this.$toast('结束时间必须大于开始时间')
        return
      }

      this.$http.post('/api/leave/apply', {
        classId: that.classIdValue,
        className: that.className,
        stuId: that.stuIdValue,
        stuName: that.stuName,
        leaveType: that.leaveIdValue,
        leaveName: leaveName,
        leaveStartTime: dateUtils.formatDateTime(that.leaveStartTime),
        leaveEndTime: dateUtils.formatDateTime(that.leaveEndTime),
        leaveContent: that.leaveContent,
        leavePictures: imgs,
        teacherId: that.leaderId,
        teacherName: that.leaderName
      }).then(res => {
        console.log(res.data)
        if (res.code === 0) that.$router.push({name: '家长请假列表'})
      })
    }
  },
  watch: {
    leaveEndTime: {
      handler: function (val, oldval) {
        if (this.leaveStartTime != null) {
          if (this.leaveStartTime != '') {
              let falg = this.CompareDate(this.leaveStartTime, val)
              if (falg === false) {
                this.$toast('结束时间必须大于开始时间')
              }
            }
          }
        }
      },
      deep: true// 对象内部的属性监听，也叫深度监听
    }
}
</script>

<style scoped>
  .input-placeholder-black >>> .picker-items{
    width: 100%;
  }
  .input-placeholder-black >>> .mint-cell-wrapper{
    font-size: 0.65rem;
    padding: 0 0.54rem;
    line-height: 1.86rem;
  }
</style>
