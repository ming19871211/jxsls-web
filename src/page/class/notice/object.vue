<!--通知对象-->
<template>
  <div>
    <class-header isback="yes" :res="results" title="通知对象" backName="通知发布"></class-header>

    <!--中间内容开始-->
    <div class="container-fluid">
         <div class="course-container">
           <!--对象内容-->
           <div class="notice-object">
             <mt-index-list>
               <mt-cell title="全选" class="border-t-grey-d" >
                 <input slot="icon" type='checkbox'  @click='checkedAll'>
               </mt-cell>

               <!-- 老师 -->
               <mt-index-section class="tea" index="任课老师">
                 <!--<mt-checklist class="event-edit-checklist" v-model="value"  :options="teaList"></mt-checklist>-->
                 <mt-cell v-for="(tea,index) in teaList" :key="index" :title="tea.stdName" class="border-t-grey-d"  >
                   <input slot="icon" type="checkbox" v-model="checkList" :value="tea.teacherId" style="margin-left: 10px;"/>
                 </mt-cell>
               </mt-index-section>

              <!-- 学生 -->
               <div class="event-edit-checklist stu"><div class="mint-checklist-title">学生</div></div>
               <mt-index-section class="border-b-grey-d" v-for="(item,index) in items" :index="item" :key="index">
                 <!--:title="student.stdName"-->
                 <mt-cell v-for="(student,index) in stuList" :key="index" v-if="check(student.stdName) === item" :title="student.stdName" class="border-t-grey-d"  >
                   <input slot="icon" type="checkbox" v-model="checkList" :value="student.stdId" style="margin-left: 10px;"/>
                 </mt-cell>

               </mt-index-section>
             </mt-index-list>
           </div>
         </div>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected="班级"></footer-menu>
  </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import classHeader from '@/components/headermenu/backheader'
import footerMenu from '@/components/footermenu'
import {mapGetters} from 'vuex'
import {Pinyin} from '../../../utils/ChinesePY'

export default {
  components: {
    classHeader, footerMenu
  },
  data: function () {
    return {
      items: [],
      checked: false,
      checkList: [],
      clzzObj: {
        'stds': [
          {
            'stdId': '39b121622e6511e8983f002523cb1e01',
            'stdName': '廖明凯1',
            'schlId': '281e9a2c2dad11e8983f002523cb1e01',
            'schlName': '伏口中学',
            'clssId': '27b5a3f62dae11e8983f002523cb1e01',
            'clssName': '220班',
            'stdSex': '',
            'birthday': null,
            'stdNo': '',
            'icCardNo': '',
            'indbDate': '2018-03-23 14:42:12',
            'modifyTime': '2018-03-23 15:20:32',
            'sourceType': null,
            'userId': null,
            'relationId': null,
            'parents': [
              {
                'userId': '63c11ba62e6d11e8983f002523cb1e01',
                'nickName': 'saaa',
                'mobile': '15115807490',
                'unionId': null,
                'relationId': '01'
              },
              {
                'userId': 'fee9c2862e4a11e8983f002523cb1e01',
                'nickName': '廖永建',
                'mobile': '15115807490',
                'unionId': null,
                'relationId': '01'
              }
            ]
          },
          {
            'stdId': '316a7e032f1211e8983f002523cb1e01',
            'stdName': '夏晓华',
            'schlId': '281e9a2c2dad11e8983f002523cb1e01',
            'schlName': '伏口中学',
            'clssId': '27b5a3f62dae11e8983f002523cb1e01',
            'clssName': '220班',
            'stdSex': null,
            'birthday': null,
            'stdNo': null,
            'icCardNo': null,
            'indbDate': '2018-03-24 11:20:23',
            'modifyTime': null,
            'sourceType': null,
            'userId': null,
            'relationId': null,
            'parents': [
              {
                'userId': 'fee9c2862e4a11e8983f002523cb1e01',
                'nickName': '廖永建',
                'mobile': '15115807490',
                'unionId': null,
                'relationId': '01'
              }
            ]
          },
          {
            'stdId': '83f21e1a2f1211e8983f002523cb1e01',
            'stdName': '夏娜娜',
            'schlId': '281e9a2c2dad11e8983f002523cb1e01',
            'schlName': '伏口中学',
            'clssId': '27b5a3f62dae11e8983f002523cb1e01',
            'clssName': '220班',
            'stdSex': null,
            'birthday': null,
            'stdNo': null,
            'icCardNo': null,
            'indbDate': '2018-03-24 11:22:41',
            'modifyTime': null,
            'sourceType': null,
            'userId': null,
            'relationId': null,
            'parents': []
          },
          {
            'stdId': '9eb9ca4f2f1211e8983f002523cb1e01',
            'stdName': '测试学生',
            'schlId': '281e9a2c2dad11e8983f002523cb1e01',
            'schlName': '伏口中学',
            'clssId': '27b5a3f62dae11e8983f002523cb1e01',
            'clssName': '220班',
            'stdSex': null,
            'birthday': null,
            'stdNo': null,
            'icCardNo': null,
            'indbDate': '2018-03-24 11:23:26',
            'modifyTime': null,
            'sourceType': null,
            'userId': null,
            'relationId': null,
            'parents': [
              {
                'userId': null,
                'nickName': null,
                'mobile': null,
                'unionId': null,
                'relationId': '01'
              }
            ]
          }
        ],
        'teachers': [
          {
            'teacherId': '83f21e1a2f1211e8983f002523cb1e011',
            'teacherName': '夏娜娜33',
            'schlId': '281e9a2c2dad11e8983f002523cb1e01',
            'schlName': '伏口中学',
            'clssId': '27b5a3f62dae11e8983f002523cb1e01',
            'clssName': '220班',
            'stdSex': null,
            'birthday': null,
            'stdNo': null,
            'icCardNo': null,
            'indbDate': '2018-03-24 11:22:41',
            'modifyTime': null,
            'sourceType': null,
            'userId': null,
            'relationId': null,
            'parents': []
          },
          {
            'teacherId': '83f21e1a2f1211e8983f002523cb1e0111',
            'teacherName': '夏娜娜4444',
            'schlId': '281e9a2c2dad11e8983f002523cb1e01',
            'schlName': '伏口中学',
            'clssId': '27b5a3f62dae11e8983f002523cb1e01',
            'clssName': '220班',
            'stdSex': null,
            'birthday': null,
            'stdNo': null,
            'icCardNo': null,
            'indbDate': '2018-03-24 11:22:41',
            'modifyTime': null,
            'sourceType': null,
            'userId': null,
            'relationId': null,
            'parents': []
          }
        ]
      },
      clssId: '',
      stdName: '',
      stuList: [],
      teaList: [],
      roles: {student: '', teacher: ''},
      value: [],
      results: []
    }
  },
  created () {
    this.initData()
  },
  beforeRouteLeave: function (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = true
    // object 跳转到 edit 时，让 edit缓存，即不刷新
    next()
  },
  methods: {
    initData: function () {
      var that = this
      // debugger
      var obj = that.$route.params.item
      if (obj) {
        that.clssId = obj.clssId
        // this.getClassMembers()
      }

      that.teaList = that.clzzObj.teachers
      var studs = that.clzzObj.stds
      if (studs && studs.length > 0) {
        that.stuList = studs
        for (var i = 0; i < studs.length; i++) {
          // 根据学生姓氏首字母转换字母排序列表
          var a = that.check(studs[i].stdName)
          if (that.items.indexOf(a) <= 0) {
            that.items.push(a)
          }
        }
        that.items.sort()
      }
    },

    // 班级通讯录 String clssId, String stdName
    getClassMembers () {
      var that = this
      that.$http.post('/api/classical/classBook', {classId: that.clssId, stdName: that.stdName}).then(res => {
        this.clzzObj = res.data
      })
    },

    // 获取姓氏拼音首字母
    check: function (values) {
      if (values && values !== 'undefined') {
        return Pinyin.GetJP(values.toString().toUpperCase()).substring(0, 1)
      } else {
        return ''
      }
    },

    checkedAll: function () {
      var _this = this

      // 实现反选
      if (_this.checked) {
        _this.checkList = []
      } else {
        // 实现全选
        _this.checkList = []
        _this.stuList.forEach(function (item, index) {
          if (index > 0) {
            _this.checkList.push(item.stdId)
            var obj = {receiveUserId: item.stdId, receiveRoleId: 1, receiveUserName: item.stdName, classId: item.clssId}
            _this.results.push(obj)
          }
        })
        _this.teaList.forEach(function (item, index) {
          if (index > 0) {
            _this.checkList.push(item.teacherId)
            var obj = {receiveUserId: item.teacherId, receiveRoleId: 2, receiveUserName: item.teacherName, classId: item.clssId}
            _this.results.push(obj)
          }
        })
      }
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
        // debugger
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
  .mint-cell-change {
  }
</style>
