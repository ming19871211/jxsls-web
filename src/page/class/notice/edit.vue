<!--通知发布-->
<keep-alive></keep-alive>
<template>
  <div>
    <mt-header class="header-menu" :title="material.className">
      <mt-button slot="left"  @click="handleClose"><i class="iconfont">&#xe79f;</i>返回</mt-button>
      <mt-button slot="right" @click.native="pushNotice">发布</mt-button>
    </mt-header>
    <!--中间内容开始-->
    <div class="container-fluid">
         <div class="course-container">

           <!--发布对象-->
           <contacts  @emitCheckList="getCheckList"></contacts>

           <!--发布内容-->
           <div class="event-edit">
                <div class="bd bg-white mint-cell-change border-b-grey-d">
                  <mt-field  class="event-edit-text" v-model="content" placeholder="填写通知内容~~" type="textarea" rows="6"></mt-field>
                  <file-upload ref="fileUpload" :autoUpload="true" @next="next" @error="error" @complete="complete" @remove="remove"></file-upload>
                </div>
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
import FileUpload from '@/components/file-upload/fileUpload'
import contacts from '@/components/classcontacts'
import {mapGetters} from 'vuex'

export default {
  components: {
    classHeader,
    FileUpload,
    footerMenu,
    contacts
  },
  created: function () {
    // debugger
    this.classId = this.$route.query.classId
    this.roleId = this.user.currRole
  },
  data: function () {
    return {
      name: '班级消息',
      winHeight: {
        height: document.documentElement.clientHeight + 'px'
      },
      ulHeight: document.documentElement.clientHeight,
      checkList: [],
      roleId: '',
      classId: '',
      stdName: '',
      content: '',
      files: [],
      results: []
    }
  },

  methods: {
    handleClose () {
      this.$router.push('/class/news')
    },
    upload () {
      this.$refs.fileUpload.uploadFile()
    },
    next (res) {
    },
    error (res) {
      this.$toast('上传发生错误!')
    },
    complete (file) {
      this.files.push(file)
    },
    remove (file) {
      for (let i = 0; i < this.files.length; i++) {
        if (file === this.files[i]) {
          this.files.splice(i, 1)
          break
        }
      }
    },

    // 子组件返回的获取对象列表
    getCheckList: function (results) {
      let that = this
      that.checkList = []
      for (let item of results.entries()) {
        item[1].forEach(function (itm, idx) {
          that.checkList.push(itm)
        })
      }
    },

    // 发布通知
    pushNotice: function () {
      // debugger
      var that = this
      var pictures = []
      var imgs = ''

      if (that.content.length === 0) {
        this.$toast({
          message: '通知内容不能为空!',
          position: 'middle',
          duration: 1500
        })
        return
      }

      if (that.checkList.length === 0) {
        this.$toast({
          message: '请选择发布对象!',
          position: 'middle',
          duration: 1500
        })
        return
      }

      if (that.files.length > 0) {
        that.files.forEach(function (itm, idx) {
          pictures.push({img: itm.url})
        })
        imgs = JSON.stringify(pictures)
      }
      var params = {
        title: '',
        content: that.content,
        pictures: imgs,
        publisherId: that.user.userId,
        publisherName: that.user.nickName,
        publishHeadPic: that.user.avatar,
        userList: JSON.stringify(that.checkList)
      }

      that.$http.post('/api/notice/publish', params).then(res => {
        if (res.code === 0) {
          this.$toast({
            message: '发布成功',
            position: 'middle',
            duration: 1000
          })
          this.$router.push('/class/news')
        } else {
          this.$toast('发布失败!')
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER',
      material: 'GET_MATERIAL'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mint-cell-change {
  }
</style>
