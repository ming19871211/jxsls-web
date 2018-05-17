<!--加入班级-->
<template>
  <div>
    <mt-header class="header-menu" title="加入班级">
      <mt-button slot="left"  @click="handleClose"><i class="iconfont">&#xe79f;</i>返回</mt-button>
      <mt-button v-show="classInfo.clssId!==''" slot="right" @click.native="formSubmit">绑定</mt-button>
    </mt-header>
    <!--中间内容开始-->
    <div class="container-fluid">
      <!--加入班级内容-->
      <div class="create-class join-class">
        <div class="info">
          <img slot="icon" src="../../assets/images/icon/info-icon.png" style="width: 1.54rem; height: 1rem;">
          <span>请输入有效的班级编码，如若不知，可询问老师。</span>
        </div>
        <div class="join-class-info mint-cell-change">
          <mt-field class="join-class-search border-b-grey-d border-t-grey-d" v-model="classInfo.clssCode" placeholder="输入班级编码" :attr="{ maxlength: 10 }" :disableClear=true @keyup.enter.native="classInfoLoad('')">
            <i class="iconfont font-color-grey" @click="classInfoLoad('')">&#xe61c;</i>
          </mt-field>
          <div v-show="classInfo.clssId!==''" class="class-search-info">
            <div class="item bg-white border-radius-10 overflow-hidden">
              <mt-cell class="name" :title="classInfo.schlName">
                <i slot="icon" class="iconfont">&#xe633;</i>
              </mt-cell>
              <div class="bd overflow-hidden">
                <mt-cell class="grade pull-left border-r-grey-d" :title="classInfo.clssName"></mt-cell>
                <mt-navbar class="role pull-right">
                  <mt-tab-item>
                    <div class="s font-color-black">{{classInfo.gradeName}}</div>
                    <div class="n">年级</div>
                  </mt-tab-item>
                  <mt-tab-item>
                    <div class="s font-color-black">{{classInfo.headMasterName|strlen(5)}}</div>
                    <div class="n">班主任</div>
                  </mt-tab-item>
                </mt-navbar>
              </div>
            </div>
          </div>
        </div>
        <!--老师与家长TAB-->
        <div v-show="classInfo.clssId!==''" class="nav-tabs-change  bg-white border-t-grey-d">
          <mt-navbar v-model="roleId">
            <mt-tab-item id="2">家长</mt-tab-item>
            <mt-tab-item id="1">老师</mt-tab-item>
          </mt-navbar>
          <!-- tab-container -->
          <mt-tab-container v-model="roleId">
            <mt-tab-container-item id="2">
              <!-- 家长 -->
              <div class="create-form mint-cell-change change-input">
                <mt-field class="border-b-grey-d" label="学生姓名" v-model.trim="userName" :attr="{ maxlength: 20 }" placeholder="请输入学生姓名"></mt-field>
                <mt-field class="border-b-grey-d" label="学生性别" v-model="stdSex.text" readonly @click.native="stdSexToggle">
                  <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
                </mt-field>
                <mt-popup class="change-popup-bottom" v-model="stdSexSelect.visable" position="bottom">
                  <div class="text-right">
                    <mt-button size="small" class="bg-none close" @click="stdSexToggle">确定</mt-button>
                  </div>
                  <picker :slots="stdSexSelect.slots" value-key="text" @change="stdSexChange"></picker>
                </mt-popup>
                <mt-field class="border-b-grey-d" label="学生学号" v-model.trim="stdNo" :attr="{ maxlength: 10 }" placeholder="请输入学生学号"></mt-field>
                <mt-field class="border-b-grey-d" label="手机号码" v-model.trim="mobile" :attr="{ maxlength: 11 }" placeholder="请输入手机号码"></mt-field>
                <mt-field class="border-b-grey-d" label="与学生关系" v-model="relation.relationName" readonly @click.native="relationToggle">
                  <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
                </mt-field>
                <mt-popup class="change-popup-bottom" v-model="relationSelect.visable" position="bottom">
                  <div class="text-right">
                    <mt-button size="small" class="bg-none close" @click="relationToggle">确定</mt-button>
                  </div>
                  <picker :slots="relationSelect.slots" valueKey="relationName" @change="relationChange"></picker>
                </mt-popup>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
              <!-- 老师 -->
              <div class="create-form mint-cell-change change-input">
                <mt-field class="border-b-grey-d" label="姓名" v-model.trim="userName" :attr="{ maxlength: 20 }" placeholder="请输入姓名"></mt-field>
                <mt-field class="border-b-grey-d" label="主授科目" v-model="subject.subjectName" readonly @click.native="subjectToggle">
                  <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
                </mt-field>
                <mt-popup class="change-popup-bottom" v-model="subjectSelect.visable" position="bottom">
                  <div class="text-right">
                    <mt-button size="small" class="bg-none close" @click="subjectToggle">确定</mt-button>
                  </div>
                  <picker :slots="subjectSelect.slots" valueKey="subjectName" @change="subjectChange"></picker>
                </mt-popup>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
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
import picker from '../../components/picker/picker'
import { Toast } from 'mint-ui'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { classHeader, footerMenu, picker },
  data () {
    return {
      // 班级详细资料
      classInfo: {
        clssCode: '',
        clssId: '',
        clssName: '',
        clssState: 0,
        gradeId: '',
        gradeName: '',
        headMasterId: '',
        headMasterMobile: '',
        headMasterName: '',
        indbDate: '',
        modifyTime: '',
        schlId: '',
        schlName: ''
      },
      // 当前选择的角色
      roleId: '2',
      // 姓名
      userName: '',
      // 学号
      stdNo: '',
      // 手机号码
      mobile: '',
      // 性别
      stdSex: { relationId: '', relationName: '' },
      // 家长与子女关系
      relation: { relationId: '', relationName: '' },
      // 学科
      subject: { subjectId: '', subjectName: '' },
      // 性别下拉框
      stdSexSelect: {
        visable: false,
        slots: [{ flex: 1, values: [{ text: '男', val: 1 }, { text: '女', val: 2 }], textAlign: 'center' }]
      },
      // 学科下拉框
      subjectSelect: {
        visable: false,
        slots: [{ flex: 1, values: [], textAlign: 'center' }]
      },
      // 与学生关系下拉框
      relationSelect: {
        visable: false,
        slots: [{ flex: 1, values: [], textAlign: 'center' }]
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER',
      material: 'GET_MATERIAL'
    }),
    // 地址栏参数
    query () {
      return {
        classId: this.$route.query.classId
      }
    }
  },
  created () {
    var that = this
    // 读取班级资料
    if (this.query.classId) {
      that.classInfoLoad(this.query.classId)
    }
    // 加载与学生关系列表
    that.relationLoad()
  },
  methods: {
    ...mapActions({
      userLogin: 'LOGIN_USER'
    }),
    handleClose () {
      this.$router.push({name: '班级'})
    },
    // 搜索班级资料
    classInfoLoad (clssId) {
      var that = this
      that.classInfo.clssId = ''
      if (!clssId && that.classInfo.clssCode === '') {
        return
      }
      that.$http.post('/api/classical/queryDetail'
        , {
          clssId: clssId,
          clssCode: that.classInfo.clssCode
        }
      ).then(res => {
        if (res !== null && res.code === 0) {
          if (res.data === null) {
            Toast('班级编码错误')
          } else {
            that.classInfo = res.data
            // 加载学科列表
            that.subjectLoad()
          }
        }
      })
    },
    // 与学生关系列表
    relationLoad () {
      this.$http.post('/api/dir/getRelation').then(res => {
        if (res !== null && res.code === 0) {
          this.relationSelect.slots[0].values = res.data
          if (res.data.length > 0) {
            this.relation = res.data[0]
          } else {
            this.relation = { relationId: '', relationName: '' }
          }
        }
      })
    },
    // 加载学科列表
    subjectLoad () {
      this.$http.post('/api/dir/getSubject', { gradeId: this.classInfo.gradeId })
        .then(res => {
          if (res !== null && res.code === 0) {
            this.subjectSelect.slots[0].values = res.data
            if (res.data.length > 0) {
              this.subject = res.data[0]
            } else {
              this.subject = { subjectId: '', subjectName: '' }
            }
          }
        })
    },
    // 显示/隐藏“学生性别”下拉框
    stdSexToggle () {
      this.stdSexSelect.visable = !this.stdSexSelect.visable
    },
    // 选择“学生性别”
    stdSexChange (picker, values) {
      if (values[0]) {
        this.stdSex = values[0]
      }
    },
    // 显示/隐藏“科目”下拉框
    subjectToggle () {
      this.subjectSelect.visable = !this.subjectSelect.visable
    },
    // 选择“科目”
    subjectChange (picker, values) {
      if (values[0]) {
        this.subject = values[0]
      }
    },
    // 显示/隐藏“与学生关系”下拉框
    relationToggle () {
      this.relationSelect.visable = !this.relationSelect.visable
    },
    // 选择“与学生关系”
    relationChange (picker, values) {
      if (values[0] !== undefined) {
        this.relation = values[0]
      }
    },
    // 表单提交
    formSubmit () {
      var that = this
      var formData = {
        userId: that.user.userId,
        roleId: that.roleId,
        userName: that.userName,
        clssId: that.classInfo.clssId,
        stdNo: that.stdNo,
        stdSex: that.stdSex.val,
        mobile: that.mobile,
        relationId: that.relation.relationId,
        subjectId: that.subject.subjectId
      }
      if (formData.roleId === '2') {
        // 家长信息填写验证
        if (formData.userName === '') {
          Toast('请填写“学生姓名”')
          return
        }
        if (formData.stdNo.length > 0) {
          let cnPattern = /[\W]/
          if (cnPattern.test(formData.stdNo)) {
            Toast('学号只能由字母和数字组成')
            return
          }
        }
        if (formData.mobile.length > 0 && formData.mobile.length !== 11) {
          Toast('请填写正确的“手机号码”')
          return
        }
      } else {
        // 老师信息填写验证
        if (formData.userName === '') {
          Toast('请填写“姓名”')
          return
        }
        if (formData.subjectId === '') {
          Toast('请选择“主授科目”')
          return
        }
      }
      // 提交表单
      var parm = {
        roleId: formData.roleId,
        userName: formData.userName,
        clssId: formData.clssId,
        stdNo: formData.stdNo,
        stdSex: formData.stdSex,
        mobile: formData.mobile,
        relationId: formData.relationId,
        subjectId: formData.subjectId
      }
      that.$http.post('/api/userinfo/applyJoin', parm).then(res => {
        if (res !== null && res.code === 0) {
          let toast = Toast({ message: res.msg, duration: 5000 })
          setTimeout(() => {
            toast.close()
            // 成功加入班级后，跳转到首页
            that.userLogin(function () {
              that.$router.push({ name: '班级' })
            })
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
