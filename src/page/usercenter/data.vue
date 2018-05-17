<!--个人资料-->
<template>
  <div>
    <edit-header title="个人资料" @edit="editUser"></edit-header>
    <!--中间内容开始-->
    <div class='container-fluid'>
        <!--不可编辑-->
        <div :style="style1">
          <div class="user-data bg-white mint-cell-change">
            <mt-tabbar class="user-images">
              <mt-tab-item id="tab1">
                <img slot="icon" :src="avatarImg" class="border-radius-100" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'">
                <input type="file" id="avatar" style="display:none" @change="uploadFile"/>
                {{userInfo.nickName}}
              </mt-tab-item>
            </mt-tabbar>
            <mt-radio class="gender-radio flex-box text-center mint-radio-change" v-model="value" :options="[{label:'男', value: '1', disabled: true}, {label:'女', value: '2', disabled: true}]"> </mt-radio>
            <div class="create-form change-input border-b-grey-d">
              <mt-field class="border-t-grey-d mint-field-clear-no" label="手机号码" readonly v-model="mobile"></mt-field>
              <mt-field class="border-t-grey-d" label="任教科目" readonly v-model="subject" style="display: none"></mt-field>
            </div>
          </div>
        </div>
        <!--可编辑-->
        <div :style="style2">
          <div class="user-data bg-white mint-cell-change">
            <mt-tabbar class="user-images">
              <mt-tab-item id="tab1">
                <img slot="icon" :src="avatarImg" class="border-radius-100" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'">
                <input type="file" id="avatar" style="display:none" @change="uploadFile"/>
              </mt-tab-item>
            </mt-tabbar>
            <div class="create-form change-input border-b-grey-d">
              <mt-field class="border-t-grey-d" label="姓名" :placeholder="userInfo.nickName" v-model="username"></mt-field>
              <a data-v-87656242="" class="mint-cell mint-field border-t-grey-d">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title">
                    <span class="mint-cell-text">性别</span>
                  </div>
                  <div class="mint-cell-value">
                    <mt-radio class="gender-radio flex-box text-center mint-radio-change" v-model="value" :options="[{label:'男', value: '1'}, {label:'女', value: '2'}]" style="margin-bottom: 0"> </mt-radio>
                  </div>
                </div>
              </a>
              <mt-field class="border-t-grey-d" label="手机号码" placeholder="请输入手机号" v-model="mobile"></mt-field>
              <mt-field class="border-t-grey-d" label="任教科目" placeholder="科目" readonly v-if="userInfo.currRole === 1" v-model="subject" style="display: none"><i class="iconfont font-size-26 font-color-black">&#xe791;</i></mt-field>
            </div>
          </div>
          <div class="text-center btn-change"><mt-button type="primary" class="btn-green-change bg-grad-green yahei" @click.native="submit">保&nbsp;存</mt-button></div>
          <!--科目弹出-->
          <mt-popup class="change-popup-bottom" v-model="popupSubject"  position="bottom" modal=false>
            <picker :slots="slots" value-key="subjectName" @change="onValuesChange"></picker>
          </mt-popup>
        </div>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected='我'></footer-menu>
  </div>
</template>

<script>
import editHeader from '@/components/headermenu/editheader'
import footerMenu from '@/components/footermenu'
import picker from '../../components/picker/picker'
import {mapGetters, mapActions} from 'vuex'
import qiniuUpload from '@/utils/upload'
import { Toast } from 'mint-ui'

export default {
  components: {
    editHeader, footerMenu, picker
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER'
    })
  },
  created: function () {
    this.init()
  },
  data: function () {
    return {
      popupSubject: false,
      username: '',
      avatarImg: '',
      style1: '',
      style2: {display: 'none'},
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      flag: 0,
      value: '',
      mobile: '',
      subject: '',
      subjectId: '',
      tempList: []
    }
  },
  methods: {
    subjectClick: function () {
      this.popupSubject = true
    },
    onValuesChange (picker, values) {
      if (values[0]) {
        if (this.flag === 0) {
          // this.subject = '体育'
          this.flag = 1
        } else {
          this.subject = values[0].subjectName
          this.subjectId = values[0].subjectId
        }
      }
    },
    init () {
      var that = this
      that.avatarImg = that.userInfo.avatar
      that.value = that.userInfo.sex
      that.mobile = that.userInfo.mobile
      that.username = that.userInfo.nickName
      that.$http.post('/api/dir/getSubject', {
        learnId: null
      })
        .then(res => {
          if (res !== null && res.code === 0) {
            that.tempList = res.data
            var leanNameList = []
            this.$http.post('/api/dir/getLearn').then(res => {
              var leanList = res.data
              for (var j = 0; j < that.tempList.length; j++) {
                for (var m = 0; m < leanList.length; m++) {
                  if (that.tempList[j].learnId === leanList[m].learnId) {
                    var tmpObj = {}
                    tmpObj.subjectId = that.tempList[j].subjectId
                    tmpObj.subjectName = leanList[m].learnName + '-' + that.tempList[j].subjectName
                    leanNameList.push(tmpObj)
                  }
                }
              }
              that.slots[0].values = leanNameList
              that.$http.post('/api/classical/studClss', {
                roleId: that.userInfo.currRole
              }).then(res => {
                var listP = leanNameList
                var subjId = res.data.subjectId
                for (var i = 0; i < listP.length; i++) {
                  if (subjId === listP[i].subjectId) {
                    that.subject = listP[i].subjectName
                    break
                  }
                }
              })
            })
          }
        })
    },
    submit: function () {
      if (!this.checkValue()) {
        return
      }
      if (this.userInfo.currRole === 1) {
        this.$http.post('/api/userinfo/teacherInfoUpdate', {
          sex: this.value,
          mobile: this.mobile,
          // subjectId: this.subjectId,
          nickName: this.username
        }).then(res => {
          if (res !== null && res.code === 0) {
            Toast({
              message: '修改成功',
              position: 'center',
              duration: 5000
            })
            this.LOGIN_USER()
          } else if (res === null) {
            Toast({
              message: '后台业务故障',
              position: 'center',
              duration: 5000
            })
          } else {
            Toast({
              message: res.msg,
              position: 'center',
              duration: 5000
            })
          }
          this.style1 = ''
          this.style2 = {display: 'none'}
        })
      }
      if (this.userInfo.currRole === 2) {
        this.$http.post('/api/userinfo/parentInfoUpdate', {
          sex: this.value,
          mobile: this.mobile,
          nickName: this.username
        }).then(res => {
          if (res !== null && res.code === 0) {
            Toast({
              message: '修改成功',
              position: 'center',
              duration: 5000
            })
            this.LOGIN_USER()
          } else if (res === null) {
            Toast({
              message: '后台业务故障',
              position: 'center',
              duration: 5000
            })
          } else {
            Toast({
              message: res.msg,
              position: 'center',
              duration: 5000
            })
          }
          this.style1 = ''
          this.style2 = {display: 'none'}
        })
      }
    },
    checkValue: function () {
      if (this.mobile.length > 0 && this.mobile.length !== 11) {
        Toast('请填写正确的“手机号码”')
        return false
      }
      return true
    },
    ...mapActions({
      LOGIN_USER: 'LOGIN_USER'
    }),
    avatarClick: function () {
      let file = document.getElementById('avatar')
      file.click()
    },
    uploadFile: function () {
      let fileObj = document.getElementById('avatar')
      var that = this
      let file = fileObj.files[0]
      let key = this.userInfo.userId + '/' + this.formatDate(new Date(), 'yyyyMMdd') + '/' + this.uuid() + '.' + this.getFileSuffix(file.name)
      const observer = {
        next (res) {
          console.log(res)
        },
        error (err) {
          Toast('上传发生错误')
          console.log(err)
        },
        complete (res) {
          console.log(res)
          that.avatarImg = qiniuUpload.getDomain() + '/' + res.key
        }
      }
      qiniuUpload.upload(file, key, file.name, observer)
    },
    uuid () {
      let s = []
      let hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'

      let uuid = s.join('')
      return uuid
    },
    formatDate: function (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    },
    getFileSuffix (filename) {
      let idx1 = filename.lastIndexOf('.')
      let idx2 = filename.length
      return filename.substring(idx1 + 1, idx2)
    },
    editUser () {
      this.style2 = ''
      this.style1 = {display: 'none'}
    }
  }
}

</script>

<style scoped>

</style>
