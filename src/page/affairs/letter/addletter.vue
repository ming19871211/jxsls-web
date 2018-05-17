/* 事务-添加私信 */
<template>
  <div>
    <mt-header class="header-menu" title="发送私信">
      <mt-button slot="left"  @click="handleClose"><i class="iconfont">&#xe79f;</i>返回</mt-button>
      <mt-button slot="right" @click.native="chatTeacher">发送</mt-button>
    </mt-header>
    <div class="container-fluid">
      <div class="affairs-leave">
        <!-- 请假内容 -->
        <div class="create-form bg-white change-input mint-cell-change">
          <mt-field class="border-b-grey-d mint-field-clear-no" label="选择班级" placeholder="请选择对话班级..." :readonly="true" v-model="choseClass" @click.native="classClick">
            <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
          </mt-field>
          <mt-field class="border-b-grey-d mint-field-clear-no" label="选择老师" placeholder="请选择对话老师..." :readonly="true" v-model="choseTeacher" @click.native="teaClick">
            <i class="iconfont font-size-26 font-color-black">&#xe791;</i>
          </mt-field>
          <mt-field placeholder="请输入私信内容" type="textarea" rows="6" v-model="sendContent"></mt-field>
        </div>
        <!--选择班级-->
        <mt-popup class="change-popup-bottom" v-model="popupClass" position="bottom" modal=false>
          <div class="text-right">
            <mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button>
          </div>
          <picker :slots="slots" value-key="className" @change="onValuesClass"></picker>
        </mt-popup>
        <!--选择老师-->
        <mt-popup class="change-popup-bottom" v-model="popupTea" position="bottom" modal=false>
          <div class="text-right">
            <mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button>
          </div>
          <picker :slots="slots2" value-key="teacherName" @change="onValuesTeacher"></picker>
        </mt-popup>
      </div>
    </div>
    <footer-menu menuSelected="私信"></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import picker from '../../../components/picker/picker'
import { mapGetters } from 'vuex'

export default {
  components: {
    classHeader, footerMenu, picker
  },
  data: function () {
    return {
      popupClass: false,
      popupTea: false,
      classIdValue: '',
      className: '',
      teacherIdValue: '',
      teacherName: '',
      sendContent: '',
      teacherArray: [],
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
      choseClass: '',
      choseTeacher: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  },
  created () {
    console.log(this.user)
    this.queryUserClassList() /** 根据用户角色查找班级列表**/
  },
  methods: {
    handleClose () {
      this.$router.push({name: '家长私信列表'})
    },
    classClick: function () {
      this.popupClass = true
    },
    teaClick: function () {
      this.popupTea = true
    },
    subjectClickConfirm: function () {
      this.popupClass = false
      this.popupTea = false
    },
    onValuesClass (picker, values) {
      if (values[0]) {
        this.classIdValue = values[0].classId
        this.className = values[0].className
        this.choseClass = this.className
        this.slots2[0].values = []
        this.queryTeacherList(this.classIdValue)
        /** 将默认的老师列表的数据进行默认赋值**/
        if (this.slots2[0].values.length > 0) {
          this.teacherIdValue = this.slots2[0].values[0].teacherIdValue
          this.choseTeacher = this.slots2[0].values[0].teacherName
        }
      }
    },
    onValuesTeacher (picker, values) {
      if (values[0]) {
        this.teacherIdValue = values[0].teacherIdValue
        this.choseTeacher = values[0].teacherName
        this.choseTeacher = this.choseTeacher
      }
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
            /** 获取班级信息去重复数据**/
            if (classIdArray.indexOf(classList[i].classId) === -1) {
              this.slots[0].values.push(classEntity)
              classIdArray.push(classList[i].classId)
            }
          }
        }
        /** 将默认的第一个班级的数据进行默认赋值**/
        if (this.slots[0].values.length > 0) {
          this.classIdValue = this.slots[0].values[0].classId
          this.className = this.slots[0].values[0].className
          this.choseClass = this.className
          this.queryTeacherList(this.classIdValue)
        }
        /** 将默认的老师列表的数据进行默认赋值**/
        if (this.slots2[0].values.length > 0) {
          this.teacherIdValue = this.slots2[0].values[0].teacherIdValue
          this.choseTeacher = this.slots2[0].values[0].teacherName
        }
      })
    },
    queryTeacherList: function (classId) {
      this.$http.post('/api/classical/queryMaterials', {
        clssId: classId,
        roleId: '1'
      }).then(res => {
        var teacherList = res.data
        console.log(teacherList)
        for (var i = 0; i < teacherList.length; i++) {
          var teacherEntity = {
            teacherIdValue: teacherList[i].materialId,
            teacherName: teacherList[i].materialName
          }
          if (this.teacherArray.indexOf(teacherList[i].materialId) === -1) {
            this.slots2[0].values.push(teacherEntity)
            this.teacherArray.push(teacherList[i].materialId)
          }
        }
      })
    },
    chatTeacher: function () {
      if (this.classIdValue === '') {
        this.$toast('请选择班级')
        return
      }
      if (this.teacherIdValue === '') {
        this.$toast('请选择老师')
        return
      }
      if (this.sendContent === '') {
        this.$toast('请输入发送内容')
        return
      }
      this.$http.post('/api/chat/toTeacher', {
        classId: this.classIdValue,
        className: this.className,
        sendContent: this.sendContent,
        teacherId: this.teacherIdValue
      }).then(res => {
        if (res.code === 1) {
          this.$toast(res.msg)
        } else {
          this.$router.push({ name: '家长私信列表' })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
