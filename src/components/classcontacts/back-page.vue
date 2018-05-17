<template>
  <div>
    <div class="container-fluid"  style="padding-top: 0rem;">
      <div class="course-container">
        <!--发布内容-->
        <div class="event-edit">
          <div class="fd">
            <div class="event-edit-checklist stu" v-show="false">
              <div class="mint-checklist-title">通知对象</div>
            </div>
            <div class="mint-checklist event-edit-checklist">
              <!--<a class="mint-cell" v-for="(item,index) in classList" :key="index" >-->
                <a class="mint-cell">
                <div class="mint-cell-wrapper" >
                  <div class="mint-cell-title">
                    <label class="mint-checklist-label" @click.self="showClassObject">
                       <span class="mint-checkbox">
                         <input :name="material.classId" :checked="checkList.length>0" type="checkbox" class="mint-checkbox-input">
                         <span class="mint-checkbox-core" @click.stop="checkBoxCheck"></span>
                       </span>
                      <span class="mint-checkbox-label" @click.stop="checkBoxCheck">{{material.className}}</span>
                    </label>
                  </div>
                  <div class="mint-cell-value"><span class="font-size-26 font-color-grey">{{checkList.length}}/{{total}}</span></div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!--发布对象-->
        <!-- 全选 -->
        <mt-popup class="change-popup-bottom" v-model="popupObject" position="bottom" modal=false :style="winHeight">
          <div class="notice-object  event-edit-checklist">
            <mt-index-list :height="ulHeight" >
              <a class="mint-cell" >
                <div class="mint-cell-wrapper" >
                  <div class="mint-cell-title">
                    <label class="mint-checklist-label">
                         <span class="mint-checkbox">
                           <input name="checkall" id="checkall" type="checkbox" :checked="checked" class="mint-checkbox-input" @click.native="checkedAll">
                           <span class="mint-checkbox-core"></span>
                         </span>
                      <span class="mint-checkbox-label">全选</span>
                    </label>
                  </div>
                  <div class="mint-cell-value"><span class="font-size-26 font-color-grey">已选：{{checkList.length}}/{{total}}</span></div>
                </div>
              </a>

              <!-- 老师 -->
              <mt-index-section class="tea" index="任课老师" v-show="displayer==='y'">
                <a class="mint-cell" v-for="(tea,index) in teaList" :key="index" >
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                      <label class="mint-checklist-label"  value="">
                         <span class="mint-checkbox">
                           <!--@click="checkedOne(tea.teacherId)"-->
                           <input :name="tea.teacherId" :value="tea.teacherId" type="checkbox" class="mint-checkbox-input" v-model="checkList"  @click.native="checkItem(tea.teacherId)">
                           <span class="mint-checkbox-core"></span>
                         </span>
                        <span class="mint-checkbox-label">
                          <span>{{tea.teacherName.length > 8 ? tea.teacherName.substr(0, 7) : tea.teacherName}}</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </a>
              </mt-index-section>

              <!-- 学生 -->
              <li class="event-edit-checklist stu">
                <div class="mint-checklist-title">学生</div>
              </li>

              <mt-index-section v-for="(item,index) in items" :index="item" :key="index">
                <a class="mint-cell" v-for="(student,index) in stuList" :key="index" v-if="check(student.stdName) === item">
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                      <label class="mint-checklist-label">
                         <span class="mint-checkbox">
                           <!--@click="checkedOne(student.stdId)"-->
                           <input :name="student.stdId" :value="student.stdId" type="checkbox" class="mint-checkbox-input" v-model="checkList" @click.native="checkItem(student.stdId)" >
                           <span class="mint-checkbox-core"></span>
                         </span>
                        <span class="mint-checkbox-label">
                          <span>{{student.stdName.length > 8 ? student.stdName.substr(0, 7) : student.stdName}}</span>
                          <span class="font-size-26 font-color-grey">（学号:{{student.stdNo}}）</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </a>
              </mt-index-section>

              <li class="mint-indexsection-null"></li>

              <div class="mint-tabbar is-fixed text-center btn-change">
                <mt-button type="primary" class="btn-green-change bg-grad-green yahei" @click.native="objectClick">确认对象
                </mt-button>
              </div>
            </mt-index-list>
          </div>
        </mt-popup>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {Pinyin} from '../../utils/ChinesePY'

export default {
  props: {
    classId: {
      type: String,
      default: ''
    },
    stdName: {
      type: String,
      default: ''
    },
    displayer: {
      type: String,
      default: 'y' // y: 显示，n：不显示
    }
  },
  data: function () {
    return {
      winHeight: {
        height: document.documentElement.clientHeight + 'px'
      },
      ulHeight: document.documentElement.clientHeight,
      items: [],
      total: 0,
      checked: true,
      checkList: [],
      clzzObj: {},
      stuList: [],
      teaList: [],
      results: [],
      popupObject: false,
      subjectName: ''
    }
  },
  created () {
    this.subjectName = this.material.subjectName
    this.getClassMembers()
  },
  methods: {
    // 根据学生姓氏首字母转换字母排序列表
    initData: function (stuList) {
      var that = this
      if (stuList && stuList.length > 0) {
        stuList.forEach(function (item, index) {
          var a = that.check(item.stdName)
          if (that.items.indexOf(a) <= 0) {
            that.items.push(a)
          }
        })
        that.items.sort()
      }
    },

    // 班级通讯录
    getClassMembers () {
      var that = this
      that.$http.post('/api/classical/classBook', {clssId: that.material.classId, stdName: that.stdName}).then(res => {
        if (res.code === 0) {
          that.clzzObj = res.data
          that.stuList = res.data.stds
          if (that.displayer === 'y') {
            that.teaList = res.data.teachers
          }
          that.total = (that.stuList.length + that.teaList.length)
          that.initData(that.stuList)
          that.defaultCheckAll()
        }
      })
    },

    // 获取姓氏拼音首字母
    check (values) {
      if (values && values !== 'undefined') {
        return Pinyin.GetJP(values.toString().toUpperCase()).substring(0, 1)
      } else {
        return ''
      }
    },

    // 显示班级对象页面
    showClassObject () {
      // alert('showClassObject')
      var that = this
      if (that.clzzObj) {
        if (that.total === that.checkList.length) {
          that.checked = true
        } else {
          that.checked = false
        }
        that.popupObject = true
      } else {
        this.$toast('该班级暂无成员!')
      }
    },

    objectClick () {
      this.pullResult()
      // this.checkList = []
      this.popupObject = false
    },

    checkItem (id) {
      let idIndex = this.checkList.indexOf(id)
      if (idIndex >= 0) {
        // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
        this.checkList.splice(idIndex, 1)
      } else {
        // 选中该checkbox
        this.checkList.push(id)
      }
    },
    checkedAll: function () {
      // alert('checkedAll')
      var _this = this
      // 实现反选
      if (_this.checked) {
        _this.checkList = []
      } else {
        // 实现全选
        _this.checkList = []
        _this.stuList.forEach(function (item, index) {
          _this.checkList.push(item.stdId)
        })

        _this.teaList.forEach(function (item, index) {
          _this.checkList.push(item.teacherId)
        })
      }
    },

    defaultCheckAll () {
      var _this = this
      // 实现全选
      _this.checkList = []
      _this.stuList.forEach(function (item, index) {
        _this.checkList.push(item.stdId)
      })

      _this.teaList.forEach(function (item, index) {
        _this.checkList.push(item.teacherId)
      })

      _this.pullResult()
    },

    // 选择对象的checkbox 全选事件
    checkBoxCheck () {
      this.checkedAll()
      this.pullResult()
    },

    pullResult () {
      let that = this
      that.results = []
      that.checkList.forEach(function (itm, idx) {
        that.stuList.forEach(function (item, index) {
          if (item.stdId === itm && item.parents) {
            item.parents.forEach(function (iter, idx_) {
              var obj = {
                receiveUserId: iter.userId,
                receiveRoleId: 2, // 家长角色
                receiveUserName: iter.nickName || '',
                classId: that.material.classId
              }
              that.results.push(obj)
            })
          }
        })

        that.teaList.forEach(function (item, index) {
          if (item.teacherId === itm) {
            var obj = {
              receiveUserId: item.userId,
              receiveRoleId: 1, // 教师角色
              receiveUserName: item.teacherName,
              classId: that.material.classId
            }
            that.results.push(obj)
          }
        })
      })
      // console.log('results:', this.results)
      this.$emit('emitCheckList', that.results)
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER',
      material: 'GET_MATERIAL'
    })
  },

  // 深度 watcher
  watch: {
    'checkList': {
      handler: function (val, oldVal) {
        if (val.length === (this.stuList.length + this.teaList.length)) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mint-indexsection-null{
     height: 4rem;
  }
</style>
