<!--一键创班-->
<template>
  <div>
    <mt-header class="header-menu">
      <mt-button slot="left"  @click="handleClose"><i class="iconfont">&#xe79f;</i>返回</mt-button>
      <mt-button slot="right" @click.native="submit">确定</mt-button>
    </mt-header>
    <!--中间内容开始-->
    <div class="container-fluid">
      <!--创建内容-->
      <div class="create-class">
        <div class="info">
          <img slot="icon" src="../../assets/images/icon/info-icon.png" style="width: 1.54rem; height: 1rem;">
          <span>完成表单填写，即可快速创建班级！</span>
        </div>
        <div class="create-form change-input">
          <mt-cell :title="province.areaName + '-' + city.areaName + '-' + area.areaName" readOnly="true" @click.native="provClick">
            <i slot="icon" class="iconfont icons">&#xe633;</i>
            <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
          </mt-cell>
          <mt-field label="姓名" class="mint-field-clear-no" placeholder="请输入用户名" :state="usernameState" v-model="username"></mt-field>
          <mt-field label="学校名称" class="mint-field-clear-no disabled-bg-white" placeholder="请输入学校名称" :state="schoolNameState" v-model="schoolName" disabled @click.native="showSearchSchool()"></mt-field>
          <div class="page-search" :style="searchStyle">
            <mt-search v-model="schoolValue" placeholder="输入学校名称" @click.native="closeSearch" cancel-text="清除">
              <mt-cell v-for="(item,index) in searchResult" :title="item" @click.native="chooseValue(item)" :key="index"></mt-cell>
            </mt-search>
          </div>
          <mt-field label="年级" class="mint-field-clear-no" placeholder="选择年级" :state="gradeState" v-model="gradeName" :readonly="true" @click.native="gradeClick"><i class="iconfont font-size-26 font-color-black">&#xe791;</i></mt-field>
          <mt-field label="班级" class="mint-field-clear-no" placeholder="请输入班级" :state="classNameState" v-model="className"></mt-field>
          <mt-field label="任教科目" class="mint-field-clear-no" placeholder="选择科目" :state="subjectState" v-model="subjectName" :readonly="true" @click.native="subjectClick"><i class="iconfont font-size-26 font-color-black">&#xe791;</i></mt-field>
        </div>
        <mt-popup class="change-popup-bottom" v-model="popupGrade" position="bottom" modal=false>
          <div class="text-right"><mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button></div>
          <picker :slots="slots" value-key="gradeName" @change="onValuesGrade"></picker>
        </mt-popup>
        <mt-popup class="change-popup-bottom" v-model="popupSubject" position="bottom" modal=false>
          <div class="text-right"><mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button></div>
          <picker :slots="slots2" value-key="subjectName" @change="onValuesSubject"></picker>
        </mt-popup>
        <mt-popup class="change-popup-bottom" v-model="popupProv" position="bottom" modal=false>
          <div class="text-right"><mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button></div>
          <div class="clearfix">
            <div class="province pickerWrapper">
              <picker :slots="areaSelect.lstProvince" value-key="areaName" @change="provinceChange"></picker>
            </div>
            <div class="city pickerWrapper">
              <picker :slots="areaSelect.lstCity" value-key="areaName" @change="cityChange"></picker>
            </div>
            <div class="area pickerWrapper">
              <picker :slots="areaSelect.lstArea" value-key="areaName" @change="areaChange"></picker>
            </div>
          </div>
        </mt-popup>
      </div>
    </div>
    <div class="box-container" :style="searchStyle" onclick="toggleBox"></div>
    <!--中间内容结束-->
    <footer-menu menuSelected="班级"></footer-menu>
  </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import picker from '../../components/picker/picker'
import wxjs from '../../utils/wxjs'
import global from '../../utils/global'
import { MessageBox, Toast } from 'mint-ui'
import { mapActions } from 'vuex'

export default {
  components: {
    classHeader, footerMenu, picker, wxjs, global
  },
  data: function () {
    return {
      titleName: '',
      init: false,
      province: { areaName: '', areaCode: '' },
      city: { areaName: '', areaCode: '' },
      area: { areaName: '', areaCode: '' },
      usernameState: '',
      schoolNameState: '',
      classNameState: '',
      username: '',
      schoolName: '',
      gradeId: '',
      gradeName: '',
      gradeState: '',
      className: '',
      subjectId: '',
      subjectState: '',
      subjectName: '',
      popupGrade: false,
      popupSubject: false,
      popupProv: false,
      flag: 0,
      schoolValue: '',
      searchStyle: '',
      defaultResult: [],
      searchResult: [],
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
      ],
      areaSelect: {
        visable: false,
        lstProvince: [{ values: [], textAlign: 'center' }],
        lstCity: [{ values: [], textAlign: 'center' }],
        lstArea: [{ values: [], textAlign: 'center' }]
      }
    }
  },
  created: function () {
    var that = this
    this.$http.post('/api/dir/getGrades')
      .then(res => {
        if (res !== null && res.code === 0) {
          this.slots[0].values = res.data
        }
      })
    wxjs.init({
      currentPath: that.$route.fullPath,
      global: global,
      callback: function () {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            that.$http.post('/api/dir/getLocation', {
              lat: latitude,
              lng: longitude
            }).then(res => {
              var p = res.data.province
              var c = res.data.city
              var a = res.data.district
              // 拿省列表
              that.areaLoad(0, function (res) {
                that.areaSelect.lstProvince[0].values = res.data
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].areaName === p) {
                    that.province = res.data[i]
                    break
                  }
                }
                // 拿市列表
                that.areaLoad(that.province.areaCode, function (res) {
                  that.areaSelect.lstCity[0].values = res.data
                  for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].areaName === c) {
                      that.city = res.data[i]
                      break
                    }
                  }
                  // 拿区域列表
                  that.areaLoad(that.city.areaCode, function (res) {
                    that.areaSelect.lstArea[0].values = res.data
                    for (var i = 0; i < res.data.length; i++) {
                      if (res.data[i].areaName === a) {
                        that.area = res.data[i]
                        break
                      }
                    }
                    // 拿学校列表
                    that.searchSchool(that.area.areaCode)
                  })
                })
              })
            })
          },
          fail: function (res) {
            alert('fail:' + JSON.stringify(res))
            // 拿省列表
            that.areaLoad(0, function (res) {
              that.areaSelect.lstProvince[0].values = res.data
              that.province = res.data[0]
              // 拿市列表
              that.areaLoad(that.province.areaCode, function (res) {
                that.areaSelect.lstCity[0].values = res.data
                that.city = res.data[0]
                // 拿区域列表
                that.areaLoad(that.city.areaCode, function (res) {
                  that.areaSelect.lstArea[0].values = res.data
                  that.area = res.data[0]
                })
              })
            })
          },
          cancel: function (res) {
            alert('cancel:' + JSON.stringify(res))
            // 拿省列表
            that.areaLoad(0, function (res) {
              that.areaSelect.lstProvince[0].values = res.data
              that.province = res.data[0]
              // 拿市列表
              that.areaLoad(that.province.areaCode, function (res) {
                that.areaSelect.lstCity[0].values = res.data
                that.city = res.data[0]
                // 拿区域列表
                that.areaLoad(that.city.areaCode, function (res) {
                  that.areaSelect.lstArea[0].values = res.data
                  that.area = res.data[0]
                })
              })
            })
          }
        })
      }
    })
  },
  methods: {
    handleClose () {
      this.$router.push({name: '班级'})
    },
    gradeClick: function () {
      this.popupGrade = true
    },
    subjectClick: function () {
      this.popupSubject = true
    },
    subjectClickConfirm: function () {
      this.popupSubject = false
      this.popupGrade = false
      this.popupProv = false
    },
    provClick: function () {
      this.popupProv = true
    },
    onValuesGrade (picker, values) {
      if (values[0]) {
        this.$http.post('/api/dir/getSubject', {
          learnId: null,
          gradeId: values[0].gradeId
        }).then(res => {
          if (res !== null && res.code === 0) {
            this.slots2[0].values = res.data
          }
        })
        this.gradeId = values[0].gradeId
        this.gradeName = values[0].gradeName
        this.gradeState = 'success'
      }
    },
    onValuesSubject (picker, values) {
      if (values[0]) {
        this.subjectName = values[0].subjectName
        this.subjectId = values[0].subjectId
        this.subjectState = 'success'
      }
    },
    provinceChange (picker, values) {
      var that = this
      if (values[0] && that.init) {
        that.province = values[0]
        that.areaLoad(values[0].areaCode, function (res) {
          that.areaSelect.lstCity[0].values = res.data
        })
      }
    },
    cityChange (picker, values) {
      var that = this
      if (values[0] && that.init) {
        that.city = values[0]
        that.areaLoad(values[0].areaCode, function (res) {
          that.areaSelect.lstArea[0].values = res.data
        })
      }
    },
    areaChange (picker, values) {
      var that = this
      if (values[0] && !that.init) {
        that.init = true
        return
      }
      if (values[0] && that.init) {
        that.area = values[0]
        // 查询学校
        this.searchSchool(that.area.areaCode)
      }
    },
    submit: function () {
      var that = this
      if (!this.checkValue()) {
        this.showMsgBox('信息未填写正确')
        return
      }
      this.$http.post('/api/userinfo/addClssInfo', {
        userName: this.username,
        schlName: this.schoolName,
        gradeId: this.gradeId,
        clssName: this.className,
        province: this.province.areaCode,
        city: this.city.areaCode,
        cnty: this.area.areaCode,
        subjectId: this.subjectId
      }).then(res => {
        if (res !== null && res.code === 0) {
          Toast({
            message: '创建班级成功',
            position: 'center',
            duration: 5000
          })
          this.LOGIN_USER(function () {
            that.$router.push({name: '班级'})
          })
        } else if (res === null) {
          this.showMsgBox('后台业务故障')
        } else {
          this.showMsgBox(res.msg)
        }
      })
    },
    getUsernameState: function () {
      this.usernameState = ''
      if (this.username !== null && this.username !== '') {
        this.usernameState = 'success'
      }
    },
    getSchoolNameState: function () {
      this.schoolNameState = ''
      if (this.schoolName !== null && this.schoolName !== '') {
        this.schoolNameState = 'success'
      }
    },
    getClassNameState: function () {
      this.classNameState = ''
      if (this.className !== null && this.className !== '') {
        this.classNameState = 'success'
      }
    },
    showMsgBox: function (value) {
      MessageBox('提示', value)
    },
    areaLoad (parentCode, callback) {
      this.$http.post('/api/dir/getAreas', {
        parentCode: parentCode
      }).then(res => {
        if (callback) {
          callback(res)
        }
      })
    },
    checkValue: function () {
      if (this.username == null || this.username == '') {
        this.usernameState = 'error'
      } else if (this.username.length > 10) {
        this.usernameState = 'error'
        Toast({
          message: '用户姓名长度不能超过10',
          position: 'center',
          duration: 3000
        })
      }
      if (this.schoolName == null || this.schoolName == '') {
        this.schoolNameState = 'error'
      } else if (this.schoolName.length > 30) {
        this.schoolNameState = 'error'
        Toast({
          message: '学校名字长度不能超过30',
          position: 'center',
          duration: 3000
        })
      }
      if (this.className == null || this.className == '') {
        this.classNameState = 'error'
      } else if (this.className.length > 20) {
        this.classNameState = 'error'
        Toast({
          message: '班级名字长度不能超过30',
          position: 'center',
          duration: 3000
        })
      }
      if (this.usernameState == 'success' && this.schoolNameState == 'success' && this.classNameState == 'success') {
        return true
      }
      return false
    },
    ...mapActions({
      LOGIN_USER: 'LOGIN_USER'
    }),
    showSearchSchool () {
      this.searchStyle = {display: 'block'}
    },
    searchSchool (value) {
      this.$http.post('/api/dir/getSchool', {
        areaCode: value
      }).then(res => {
        if (res !== null && res.code === 0) {
          if (res.data.length > 0) {
            this.defaultResult = []
            var tmpSchlList = res.data
            for (var i = 0; i < tmpSchlList.length; i++) {
              this.defaultResult.push(tmpSchlList[i].schlName)
            }
          } else {
            Toast({
              message: '查找不到学校',
              position: 'center',
              duration: 1000
            })
          }
        } else if (res === null) {
          this.showMsgBox('后台业务故障')
        } else {
          this.showMsgBox(res.msg)
        }
      })
    },
    chooseValue (value) {
      this.schoolValue = value
      this.schoolName = value
      this.searchStyle = {display: 'none'}
    },
    closeSearch (e) {
      var a = e.target.className
      if (a == 'mint-search' || a == 'mint-search-list') {
        this.searchStyle = {display: 'none'}
        this.schoolName = this.schoolValue
      }
    }
  },
  watch: {
    username: function () {
      this.getUsernameState()
    },
    schoolName: function () {
      this.getSchoolNameState()
    },
    className: function () {
      this.getClassNameState()
    },
    schoolValue: function () {
      this.searchResult = this.defaultResult.filter(schoolValue => new RegExp(this.schoolValue, 'i').test(schoolValue))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.linkage {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  left: 0;
  overflow: hidden;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.pickerWrapper {
  width: 33.3%;
  float: left;
}
.page-search{
   position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: none;
 }
.page-search >>> .mint-searchbar{
  padding: 0.32rem 0.42rem;
}
.page-search >>> .mint-searchbar-inner{
  height: 1.22rem;
  padding: 0.105rem  0.21rem;
  border-radius: 0.21rem;
}
.page-search >>> .mintui-search,.page-search >>> .mint-searchbar-core{
  font-size:0.56rem;
  padding-right: 0.21rem;
}
.page-search >>> .mintui-search,.page-search >>> .mint-searchbar-core::-webkit-search-cancel-button{
  display: none;
}
.page-search >>> .mint-search-list{
  padding-top: 2.06rem;
}
.page-search >>> .mint-cell-wrapper{
  background-image: linear-gradient(180deg, transparent, transparent 50%, transparent 50%);
  border-bottom: 0.021rem solid #d9d9d9;
}
.box-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  display: none
}
</style>
