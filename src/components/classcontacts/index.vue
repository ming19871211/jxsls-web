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
                <a class="mint-cell" v-for="(item,index) in clssList" :key="index">
                <div class="mint-cell-wrapper" >
                  <div class="mint-cell-title">
                    <label class="mint-checklist-label" @click.self="showCheckedObject(item.clssId)">
                       <span class="mint-checkbox">
                         <!--v-model="checkClassIds"-->
                         <input :name="item.clssId" :value="item.clssId"  v-model="checkClassIds" type="checkbox" class="mint-checkbox-input">
                         <span class="mint-checkbox-core" @click.stop="checkBoxCheck(item.clssId)"></span>
                       </span>
                      <span class="mint-checkbox-label" @click.stop="checkBoxCheck(item.clssId)">{{item.clssName}}</span>
                    </label>
                  </div>
                  <div class="mint-cell-value"><span class="font-size-26 font-color-grey">{{checkSizeMap.get(item.clssId)}}/{{totalMap.get(item.clssId)}}</span></div>
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
                           <input name="checkall" id="checkall" type="checkbox" :checked="checked" class="mint-checkbox-input" @click="checkedAll(classId)">
                           <span class="mint-checkbox-core"></span>
                         </span>
                      <span class="mint-checkbox-label">全选</span>
                    </label>
                  </div>
                  <div class="mint-cell-value"><span class="font-size-26 font-color-grey">已选：{{checkList.length}}/{{total}}</span></div>
                </div>
              </a>

              <!-- 老师 -->
              <mt-index-section class="tea" index="任课老师" v-if="displayer==='y'">
                <a class="mint-cell" v-for="(tea,index) in clzzObj.teachers" :key="index" >
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
                <a class="mint-cell" v-for="(student,index) in clzzObj.stds" :key="index" v-if="check(student.stdName) === item">
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
      items: [], // sort name list
      classId: '',
      total: 0,
      checked: true,
      classChecked: true,
      clssList: [],
      checkClassIds: [],
      checkList: [],
      clzzObj: {},
      results: [],
      popupObject: false,
      subjectName: '',
      classMap: new Map(), // store class data by classid
      checkedMap: new Map(), // selected class data
      checkSizeMap: new Map(), // selected each class data size
      totalMap: new Map(), // each class data size
      checkedListMap: new Map() // checked checkList
    }
  },
  created () {
    this.classId = this.material.classId
    this.subjectName = this.material.subjectName
    this.getClassList()
  },
  mounted () {
  },
  methods: {
    // 获取姓氏拼音首字母
    check (values) {
      if (values && values !== 'undefined') {
        return Pinyin.GetJP(values.toString().toUpperCase()).substring(0, 1)
      } else {
        return ''
      }
    },

    // 根据学生姓氏首字母转换字母排序列表
    initSortItem: function (stuList) {
      var that = this
      that.items = []
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

    // 班级List
    getClassList () {
      var that = this
      that.$http.post('/api/classical/teacherClss', {roleId: that.user.currRole}).then(res => {
        if (res.code === 0) {
          that.clssList = res.data
          res.data.forEach(function (item, index) {
            // 获取班级成员
            that.$http.post('/api/classical/classBook', {clssId: item.clssId, stdName: null}).then(res => {
              if (res.code === 0) {
                let total = res.data.stds.length
                // y: 不显示老师
                let obj = {}
                console.log('that.displayer', that.displayer)
                if (that.displayer === 'n') {
                  obj = {stds: res.data.stds, teachers: []}
                  console.log('obj', obj)
                  that.classMap.set(item.clssId, obj) // 存每个class的data
                } else {
                  obj = res.data
                  total += res.data.teachers.length
                  that.total = total
                  that.classMap.set(item.clssId, (res.data)) // 存每个class的data
                }
                that.totalMap.set(item.clssId, total) // 存每个class 的 total
                that.checkSizeMap.set(item.clssId, 0) // 存某个class被选中的size
                if (that.classId === item.clssId) {
                  that.clzzObj = obj
                  that.defaultCheckAll(that.classId) // 默认这个classid 被选中
                }
              }
            })
          })
        }
        that.printLog()
      })
    },

    printLog () {
      console.log('this.totalMap', this.totalMap)
    },

    // 显示被选班级成员列表
    showCheckedObject (clssId) {
      var that = this
      that.classId = ''
      that.classId = clssId
      that.total = 0
      // 班级对象列表
      that.clzzObj = []
      that.clzzObj = that.classMap.get(clssId)
      that.total = (that.clzzObj.stds.length + that.clzzObj.teachers.length)
      if (that.clzzObj) {
        that.initSortItem(that.clzzObj.stds)
        if (that.checkClassIds.indexOf(clssId) == -1) {
          that.checkClassIds.push(clssId)
        }

        // 已选对象数组
        that.checkList = []
        that.checkList = that.checkedListMap.get(clssId)
        if (that.checkList) {
          if (that.total === that.checkList.length) {
            that.checked = true
          } else {
            that.checked = false
          }
        } else {
          that.defaultCheckAll(clssId)
        }
        that.popupObject = true
      } else {
        that.$toast('该班级暂无成员!')
      }
    },

    // 确认按钮
    objectClick () {
      this.pullResult(this.classId)
      // this.checkList = []
      this.popupObject = false
      this.clzzObj = []
      // this.checkList = []
      this.results = []
      // this.classId = ''
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

    checkedAll: function (classId) {
      var _this = this

      // 实现反选
      if (_this.checked) {
        _this.checkList = []
      } else {
        // 实现全选
        _this.checkList = []
        _this.clzzObj.stds.forEach(function (item, index) {
          _this.checkList.push(item.stdId)
        })

        _this.clzzObj.teachers.forEach(function (item, index) {
          _this.checkList.push(item.teacherId)
        })
      }
    },

    defaultCheckAll (classId) {
      var _this = this
      // 实现全选
      _this.checkList = []
      _this.clzzObj.stds.forEach(function (item, index) {
        _this.checkList.push(item.stdId)
      })

      _this.clzzObj.teachers.forEach(function (item, index) {
        _this.checkList.push(item.teacherId)
      })
      _this.pullResult(classId)
    },

    // 选择对象的checkbox 全选事件
    checkBoxCheck (clssId) {
      let that = this
      that.classId = clssId
      that.results = []
      that.clzzObj = []
      that.clzzObj = that.classMap.get(clssId)
      if (that.checkClassIds.indexOf(clssId) == -1) {
        that.checkClassIds.push(clssId)
        that.defaultCheckAll(clssId)
        that.classChecked = true
      } else {
        that.classChecked = false
        that.checkList = []
        that.checkedListMap.set(clssId, that.checkList)
        that.pullResult(clssId)
      }
    },

    pullResult (clssId) {
      let that = this
      that.results = []
      that.checkList.forEach(function (itm, idx) {
        that.clzzObj.stds.forEach(function (item, index) {
          if (item.stdId === itm && item.parents) {
            item.parents.forEach(function (iter, idx_) {
              var obj = {
                receiveUserId: iter.userId,
                receiveRoleId: 2, // 家长角色
                receiveUserName: iter.nickName || '',
                classId: clssId
              }
              that.results.push(obj)
            })
          }
        })

        that.clzzObj.teachers.forEach(function (item, index) {
          if (item.teacherId === itm) {
            var obj = {
              receiveUserId: item.userId,
              receiveRoleId: 1, // 教师角色
              receiveUserName: item.teacherName,
              classId: clssId
            }
            that.results.push(obj)
          }
        })
      })
      that.checkedMap.set(clssId, that.results)
      that.checkedListMap.set(clssId, that.checkList)
      that.checkSizeMap.set(clssId, that.checkList.length)
      that.handleCheckClassMap(clssId)
      // console.log('that.checkedMap', that.checkedMap)
      this.$emit('emitCheckList', that.checkedMap)
    },

    handleCheckClassMap (classId) {
      let that = this
      if (that.checkList.length > 0) {
        if (that.checkClassIds.indexOf(classId) == -1) {
          that.checkClassIds.push(classId)
        }
      } else {
        // not selected anyone class object
        that.checkClassIds.forEach(function (itm, idex) {
          if (classId === itm) {
            that.checkClassIds.splice(idex, 1)
          }
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER',
      material: 'GET_MATERIAL'
    }),
    getTotal: function (val) {
      if (this.totalMap) {
        return this.totalMap.get(val)
      }
      return 0
    }
  },

  // 深度 watcher
  watch: {
    'checkList': {
      handler: function (val, oldVal) {
        if (val.length === this.total) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      deep: true
    }
  },
  filters: {
    getSize: function (value) {
      if (this.totalMap) {
        return this.totalMap.get(value)
      }
      return 0
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
