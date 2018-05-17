<!--活动详情-->
<template>
  <div class="container-fluid">
    <class-header title="活动详情" backName="班级消息"></class-header>
    <!--中间内容开始-->
    <div class="container-fluid">
         <div class="course-container">
           <!--详情内容-->
           <div class="event-details bg-white  mint-cell-change border-b-grey-d">
             <mt-cell class="bd title-img-list"  :title="titile">
               <img slot="icon" class="img border-radius-100" :src="activity.publishHeadPic" onerror="this.src='http://weixin.wxres.talkedu.cn/group1/M00/00/00/51ccc598-c8f3-4ae7-b24d-34c5c95361a1.jpg'">
               <div class="font-size-26"><i slot="icon" class="iconfont">&#xe626;</i>{{activity.publishTime }}</div>
             </mt-cell>
             <div class="fd news-image-text">
               <mt-cell :title="activity.content"></mt-cell>
               <div class="details-content"  v-for="(img, index) in activity.preveImgList" :key="index">
                 <div>
                   <!--<img slot="icon" :src="img" width="100%">-->
                   <img slot="icon" :src="img" :placeholder="img" style="width: 400px;height: 400px" @click.stop="showPic(img,activity.preveImgList)"/>
                 </div>
               </div>
             </div>
             <div class="event-likes text-right">
                  <span @click="praise()"><i class="iconfont">&#xe6bf;</i>&nbsp;点赞（{{praiseSum }}）</span>
                  <span v-if="activity.commentStatus===1"><i class="iconfont">&#xe6ad;</i>&nbsp;评论（{{commentSum }}）</span>
             </div>
             <div class="evaluate-content border-radius-10">
                  <div class="personnel-likes">
                    <i class="iconfont">&#xe6bf;</i>&nbsp;<span v-for="(praise, index) in praiseList" :key="index">{{praise.userName+','}}</span>等{{praiseSum }}人觉得赞
                  </div>
                  <ul>
                    <li v-for="(comment, index) in commentList" :key="index" class="font-size-26">
                      <mt-tab-container  v-model="selected">
                        <mt-tab-container-item>
                        <span class="name"><i class="iconfont">&#xe6ad;</i>&nbsp;{{comment.userName}}：</span>
                        <span class="con font-color-black">{{comment.content}}</span>
                        <mt-badge size="small" color="#ccc" v-show="true" v-if="flagUserId ===comment.userId"><span @click="deleteComment(comment.id,activity.publisherId,activity.classId)" class="font-size-22">删除</span></mt-badge>
                        </mt-tab-container-item>
                      </mt-tab-container>
                    </li>
                  </ul>
                  <div class="edit-evaluate" v-show="false"><i class="iconfont">&#xe6a6;</i>&nbsp;编辑评论</div>
             </div>
           </div>
         </div>
    </div>
    <!--中间内容结束-->
    <div class="evaluate-input">
      <div class="border-grey-d bg-white border-radius-10 flex-box mint-cell-change" v-if="activity.commentStatus===1">
        <mt-field  placeholder="输入评论内容~" class="text-input border-radius-10 mint-field-clear-no" v-model="commentContent" @focus.native.capture="focus" @blur.native.capture="blur"></mt-field>
        <mt-button type="default" class="btn-send bg-grad-green font-color-white" @click="comment(activity.publisherId,activity.classId)">发&nbsp;送</mt-button>
      </div>
    </div>
    <!-- <footer-menu menuSelected="班级"></footer-menu> -->
  </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import noContent from '@/components/nocontent'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    classHeader, footerMenu, noContent
  },
  data: function () {
    return {
      msgId: '',
      infos: [],
      classId: '',
      titile: '',
      roleId: '',
      activity: {},
      commentContent: '',
      flagUserId: '',
      commentSum: '0',
      praiseSum: '0',
      praiseList: [],
      commentList: []
    }
  },
  created () {
    let that = this
    that.msgId = that.$route.query.msgId
    /** 根据班级ID判断是否从模板消息进入还是从班级消息列表进入**/
    that.classId = that.$route.query.classId
    that.roleId = that.$route.query.roleId
    if (that.classId != null && that.classId != '') {
      if (that.roleId != null && that.roleId != '') {
        // 获取当前用户下班级信息
        this.$http.post('/api/userinfo/queryMaterial', {roleId: that.roleId}).then(materialRes => {
          that.infos = materialRes.data
          for (var info of that.infos) {
            if (this.classId === info.classId) {
              this.SET_MATERIAL(info)
              break
            }
          }
        })

        this.SWITCH_ROLE({
          roleId: that.roleId,
          callback: function () {
            that.queryDetail(that.roleId)
          }
        })
      }
    } else {
      that.queryDetail(this.user.currRole)
    }
  },
  methods: {
    ...mapActions({
      SET_MATERIAL: 'SET_MATERIAL',
      SWITCH_ROLE: 'SWITCH_ROLE'
    }),
    showPic (imgUrl, preveImgList) {
      wx.previewImage({
        current: imgUrl, // 当前显示图片的http链接
        urls: preveImgList // 需要预览的图片http链接列表
      })
    },
    focus () {
      console.log(1)
      this.interval = setInterval(function () {
        document.body.scrollTop = document.body.scrollHeight
      }, 500)
    },
    blur () {
      console.log(2)
      clearInterval(this.interval)
    },
    queryDetail: function (currRole) {
      this.$http.post('/api/activity/view', {
        activityId: this.msgId,
        readRoleId: currRole
      }).then(res => {
        if (res === null || res.code !== 0) {
          return null
        }
        this.activity = res.data
        this.titile = this.activity.publisherName + '发布了活动'
        this.activity.publishHeadPic = this.GLOBAL.ucenterQnDomain + 'headerimg/' + this.activity.publisherId + '.jpg'
        this.commentSum = this.activity.commentSum
        this.praiseSum = this.activity.praiseSum
        this.praiseList = this.activity.praiseList
        this.commentList = this.activity.commentList
        this.flagUserId = this.user.userId
      })
    },
    praise: function () {
      this.$http.post('/api/activity/praise', {
        activityId: this.msgId,
        praiseUserName: this.user.nickName
      }).then(res => {
        console.log(res.data)
        this.queryDetail()
      })
    },
    deleteComment: function (id, publisherId, classId) {
      this.$http.post('/api/activity/delComment', {
        id: id,
        classId: classId,
        publisherId: publisherId
      }).then(res => {
        console.log(res.data)
        this.queryDetail()
      })
    },
    comment: function (publiserId, classId) {
      if (this.commentContent === '') {
        this.$toast('请输入评论内容')
        return
      }
      this.$http.post('/api/activity/comment', {
        activityId: this.msgId,
        publiserId: publiserId,
        classId: classId,
        commentUserName: this.user.nickName,
        content: this.commentContent
      }).then(res => {
        this.commentContent = ''
        this.queryDetail()
      })
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  }
}
</script>

<style scoped>
  .container-fluid .container-fluid{
    padding-top: 0;
    padding-bottom: 1.91rem;
  }
  .evaluate-content ul li .con{
    word-break: break-all;
  }
</style>
