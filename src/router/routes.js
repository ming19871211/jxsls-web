// import helloWorld from '@/components/HelloWorld'
// import helloWorld2 from '@/components/HelloWorld2'

const demo = r => require.ensure([], () => r(require('@/demo/demo')), 'demo')
const errorInfo = r => require.ensure([], () => r(require('@/page/error')), 'errorInfo')
const msgInfo = r => require.ensure([], () => r(require('@/page/msgInfo')), 'msgInfo')
const index = r => require.ensure([], () => r(require('@/page/index')), 'index')
const classShare = r => require.ensure([], () => r(require('@/page/class/share')), 'classShare')
const subscribe = r => require.ensure([], () => r(require('@/page/class/subscribe')), 'subscribe')
const classNews = r => require.ensure([], () => r(require('@/page/class/news')), 'classNews')
const addressBook = r => require.ensure([], () => r(require('@/page/addressbook')), 'addressBook')
const bookTeacherDetails = r => require.ensure([], () => r(require('@/page/addressbook/teacherdetails')), 'bookTeacherDetails')
const bookParentDetails = r => require.ensure([], () => r(require('@/page/addressbook/parentdetails')), 'bookParentDetails')
const bookAudit = r => require.ensure([], () => r(require('@/page/addressbook/audit')), 'bookAudit')
const enrollInListTeacher = r => require.ensure([], () => r(require('@/page/affairs/enrollIn/enrollInListTeacher')), 'enrollInListTeacher')
const affairsApplyLeave = r => require.ensure([], () => r(require('@/page/affairs/leave/applyleave')), 'affairsApplyLeave')
const affairsLeaveDetail = r => require.ensure([], () => r(require('@/page/affairs/leave/leavedetail')), 'affairsLeaveDetail')
const affairsParentLeaveDetail = r => require.ensure([], () => r(require('@/page/affairs/leave/parentleavedetail')), 'affairsParentLeaveDetail')
const addLeave = r => require.ensure([], () => r(require('@/page/affairs/leave/addleave')), 'addLeave')
const chatLetter = r => require.ensure([], () => r(require('@/page/affairs/letter/chatletter')), 'chatLetter')
const affairsParentIndex = r => require.ensure([], () => r(require('@/page/affairs/parentindex')), 'affairsParentIndex')
const affairsTeacherIndex = r => require.ensure([], () => r(require('@/page/affairs/teacherindex')), 'affairsTeacherIndex')
const addLetter = r => require.ensure([], () => r(require('@/page/affairs/letter/addletter')), 'addLetter')
const parentLeaveList = r => require.ensure([], () => r(require('@/page/affairs/leave/parentleavelist')), 'parentLeaveList')
const teacherLeaveList = r => require.ensure([], () => r(require('@/page/affairs/leave/teacherLeaveList')), 'teacherLeaveList')
const parentLetterList = r => require.ensure([], () => r(require('@/page/affairs/letter/parentLetterList')), 'parentLetterList')
const teacherLetterList = r => require.ensure([], () => r(require('@/page/affairs/letter/teacherLetterList')), 'teacherLetterList')
const classMseeages = r => require.ensure([], () => r(require('@/page/class/mseeage')), 'classMseeages')
const createClass = r => require.ensure([], () => r(require('@/page/class/create')), 'createClass')
const joinClass = r => require.ensure([], () => r(require('@/page/class/join')), 'joinClass')
const addressSelect = r => require.ensure([], () => r(require('@/page/class/address')), 'addressSelect')
const scoreList = r => require.ensure([], () => r(require('@/page/class/score/index')), 'scoreList')
const scoreDetails = r => require.ensure([], () => r(require('@/page/class/score/details')), 'scoreDetails')
const scoreParentDetails = r => require.ensure([], () => r(require('@/page/class/score/parentdetails')), 'scoreParentDetails')
const scoreUploadBoot = r => require.ensure([], () => r(require('@/page/class/score/uploadboot')), 'scoreUploadBoot')
const courseList = r => require.ensure([], () => r(require('@/page/class/course/index')), 'courseList')
const courseDetails = r => require.ensure([], () => r(require('@/page/class/course/details')), 'courseDetails')
const courseEdit = r => require.ensure([], () => r(require('@/page/class/course/edit')), 'courseEdit')
const eventDetails = r => require.ensure([], () => r(require('@/page/class/event/details')), 'eventDetails')
const eventEdit = r => require.ensure([], () => r(require('@/page/class/event/edit')), 'eventEdit')
const noticeEdit = r => require.ensure([], () => r(require('@/page/class/notice/edit')), 'noticeEdit')
const noticeObject = r => require.ensure([], () => r(require('@/page/class/notice/object')), 'noticeObject')
const noticeDetails = r => require.ensure([], () => r(require('@/page/class/notice/details')), 'noticeDetails')
const homeworkEdit = r => require.ensure([], () => r(require('@/page/class/homework/edit')), 'homeworkEdit')
const homeworkDetails = r => require.ensure([], () => r(require('@/page/class/homework/details')), 'homeworkDetails')
const userCenter = r => require.ensure([], () => r(require('@/page/usercenter')), 'userCenter')
const userHelp = r => require.ensure([], () => r(require('@/page/usercenter/help')), 'userHelp')
const userAbout = r => require.ensure([], () => r(require('@/page/usercenter/about')), 'userAbout')
const userData = r => require.ensure([], () => r(require('@/page/usercenter/data')), 'userData')
const userMyClass = r => require.ensure([], () => r(require('@/page/usercenter/myclass')), 'userMyClass')
const userParentMyClass = r => require.ensure([], () => r(require('@/page/usercenter/parentmyclass')), 'userParentMyClass')
const userModifyClass = r => require.ensure([], () => r(require('@/page/usercenter/modifyclass')), 'userModifyClass')
const userOverClass = r => require.ensure([], () => r(require('@/page/usercenter/overclass')), 'userOverClass')
const test = r => require.ensure([], () => r(require('@/page/class/test')), 'test')
const redirect = r => require.ensure([], () => r(require('@/page/redirect')), 'redirect')

// 配置路由
export default [
  {
    path: '/demo/demo',
    name: '测试1',
    component: demo
  },
  {
    path: '/error',
    name: '错误信息',
    component: errorInfo
  },
  {
    path: '/msgInfo',
    name: '通用信息显示',
    component: msgInfo
  },
  {
    path: '/',
    name: '班级',
    meta: {
      auth: true
    },
    component: index
  },
  {
    path: '/class/share',
    name: '班级分享',
    meta: {
      auth: true
    },
    component: classShare
  },
  {
    path: '/class/subscribe',
    name: '引导关注',
    meta: {
      auth: true
    },
    component: subscribe
  },
  {
    path: '/class/news',
    name: '班级消息',
    meta: {
      auth: true
    },
    component: classNews
  },
  {
    path: '/class/mseeage',
    name: '新消息',
    meta: {
      auth: true
    },
    component: classMseeages
  },
  {
    path: '/class/create',
    name: '一键创班',
    meta: {
      auth: true
    },
    component: createClass
  },
  {
    path: '/class/join',
    name: '加入班级',
    meta: {
      auth: true
    },
    component: joinClass
  },
  {
    path: '/class/address',
    name: '地区选择',
    meta: {
      auth: true
    },
    component: addressSelect
  },
  {
    path: '/class/score/index',
    name: '成绩列表',
    meta: {
      auth: true
    },
    component: scoreList
  },
  {
    path: '/class/score/details',
    name: '成绩详情',
    meta: {
      auth: true
    },
    component: scoreDetails
  },
  {
    path: '/class/score/parentdetails',
    name: '家长成绩详情',
    meta: {
      auth: true
    },
    component: scoreParentDetails
  },
  {
    path: '/class/score/uploadboot',
    name: '成绩上传引导',
    meta: {
      auth: true
    },
    component: scoreUploadBoot
  },
  {
    path: '/class/course/index',
    name: '课表列表',
    meta: {
      auth: true
    },
    component: courseList
  },
  {
    path: '/class/course/details',
    name: '课表详情',
    meta: {
      auth: true
    },
    component: courseDetails
  },
  {
    path: '/class/course/edit',
    name: '课表发布',
    meta: {
      auth: true
    },
    component: courseEdit
  },
  {
    path: '/class/event/details',
    name: '活动详情',
    meta: {
      auth: true
    },
    component: eventDetails
  },
  {
    path: '/class/event/edit',
    name: '活动发布',
    meta: {
      auth: true
    },
    component: eventEdit
  },
  {
    path: '/class/notice/edit',
    name: '通知发布',
    meta: {
      auth: true
    },
    component: noticeEdit
  },
  {
    path: '/class/notice/object',
    name: '通知对象',
    meta: {
      auth: true
    },
    component: noticeObject
  },
  {
    path: '/class/notice/details',
    name: '通知详情',
    meta: {
      auth: true
    },
    component: noticeDetails
  },
  {
    path: '/class/homework/edit',
    name: '作业发布',
    meta: {
      auth: true
    },
    component: homeworkEdit
  },
  {
    path: '/class/homework/details',
    name: '作业详情',
    meta: {
      auth: true
    },
    component: homeworkDetails
  },
  {
    path: '/addressbook',
    name: '通讯录',
    meta: {
      auth: true
    },
    component: addressBook
  },
  {
    path: '/addressbook/teacherdetails',
    name: '通讯录老师详情',
    meta: {
      auth: true
    },
    component: bookTeacherDetails
  },
  {
    path: '/addressbook/parentdetails',
    name: '通讯录家长详情',
    meta: {
      auth: true
    },
    component: bookParentDetails
  },
  {
    path: '/addressbook/audit',
    name: '通讯录审核',
    meta: {
      auth: true
    },
    component: bookAudit
  },
  {
    path: '/affairs/parentindex',
    name: '家长事务',
    meta: {
      auth: true
    },
    component: affairsParentIndex
  },
  {
    path: '/affairs/teacherindex',
    name: '老师事务',
    meta: {
      auth: true
    },
    component: affairsTeacherIndex
  },
  {
    path: '/affairs/leave/parentleavelist',
    name: '家长请假列表',
    meta: {
      auth: true
    },
    component: parentLeaveList
  },
  {
    path: '/affairs/leave/teacherLeaveList',
    name: '家长向老师请假列表',
    meta: {
      auth: true
    },
    component: teacherLeaveList
  },
  {
    path: '/affairs/enrollIn/enrollInListTeacher',
    name: '老师活动报名列表',
    meta: {
      auth: true
    },
    component: enrollInListTeacher
  },
  {
    path: '/affairs/leave/applyleave',
    name: '请假批复',
    meta: {
      auth: true
    },
    component: affairsApplyLeave
  },
  {
    path: '/affairs/leave/leavedetail',
    name: '请假详情',
    meta: {
      auth: true
    },
    component: affairsLeaveDetail
  },
  {
    path: '/affairs/leave/parentleavedetail',
    name: '家长请假详情',
    meta: {
      auth: true
    },
    component: affairsParentLeaveDetail
  },
  {
    path: '/affairs/leave/addLeave',
    name: '添加请假',
    meta: {
      auth: true
    },
    component: addLeave
  },
  {
    path: '/affairs/letter/chatletter',
    name: '私信对话',
    meta: {
      auth: true
    },
    component: chatLetter
  },
  {
    path: '/affairs/letter/addletter',
    name: '添加私信',
    meta: {
      auth: true
    },
    component: addLetter
  },
  {
    path: '/affairs/letter/parentLetterList',
    name: '家长私信列表',
    meta: {
      auth: true
    },
    component: parentLetterList
  },
  {
    path: '/affairs/letter/teacherLetterList',
    name: '老师私信列表',
    meta: {
      auth: true
    },
    component: teacherLetterList
  },
  {
    path: '/userCenter',
    name: '我',
    meta: {
      auth: true
    },
    component: userCenter
  },
  {
    path: '/userCenter/help',
    name: '帮助与反馈',
    meta: {
      auth: true
    },
    component: userHelp
  },
  {
    path: '/userCenter/about',
    name: '关于我们',
    meta: {
      auth: true
    },
    component: userAbout
  },
  {
    path: '/userCenter/data',
    name: '个人资料',
    meta: {
      auth: true
    },
    component: userData
  },
  {
    path: '/usercenter/myclass',
    name: '我的班级',
    meta: {
      auth: true
    },
    component: userMyClass
  },
  {
    path: '/usercenter/parentmyclass',
    name: '家长我的班级',
    meta: {
      auth: true
    },
    component: userParentMyClass
  },
  {
    path: '/userCenter/modifyclass',
    name: '修改班级',
    meta: {
      auth: true
    },
    component: userModifyClass
  },
  {
    path: '/userCenter/overclass',
    name: '转让班级',
    meta: {
      auth: true
    },
    component: userOverClass
  },
  {
    path: '/class/test',
    name: 'test',
    meta: {
      auth: true
    },
    component: test
  },
  {
    path: '/redirect',
    name: '页面重定向',
    component: redirect
  }
]
