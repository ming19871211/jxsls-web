<!--活动发布-->
<template>
  <div>
    <mt-header class="header-menu" :title="material.className">
      <mt-button slot="left"  @click="handleClose"><i class="iconfont">&#xe79f;</i>返回</mt-button>
      <mt-button slot="right" @click.native="submit">发布</mt-button>
    </mt-header>
    <!--中间内容开始-->
    <div class="container-fluid">
         <div class="course-container">
           <!--发布内容-->
           <div class="event-edit">
                <div class="bd bg-white mint-cell-change border-b-grey-d">
                  <mt-cell class="event-edit-off" title="允许评论"><mt-switch v-model="status"></mt-switch></mt-cell>
                  <mt-field v-model="content" class="event-edit-text border-t-grey-d" placeholder="写下你的班级活动记录吧~~" type="textarea" rows="6"></mt-field>
                  <file-upload ref="fileUpload" :autoUpload="true" @next="next" @error="error" @complete="complete"  @remove="remove"></file-upload>
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
import {mapGetters} from 'vuex'

export default {
  components: {
    classHeader, footerMenu, FileUpload
  },
  data: function () {
    return {
      name: '班级消息',
      content: '',
      files: [],
      status: true
    }
  },
  created () {
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
    complete (fileUrl) {
      this.files.push(fileUrl)
    },
    remove (file) {
      for (let i = 0; i < this.files.length; i++) {
        if (file === this.files[i]) {
          this.files.splice(i, 1)
          break
        }
      }
    },

    // submit
    submit: function () {
      var that = this
      if (!that.content || that.content.length === 0) {
        that.$toast('活动内容不能为空哦')
        return
      }

      var pictures = []
      var imgs = ''
      if (that.files.length > 0) {
        that.files.forEach(function (itm, idx) {
          pictures.push({img: itm.url})
        })
        imgs = JSON.stringify(pictures)
      }

      var params = {
        title: '',
        classId: that.material.classId,
        className: that.material.className,
        content: that.content,
        pictures: imgs,
        publisherId: that.user.userId || '',
        publisherName: that.user.nickName || '',
        commentStatus: (that.status ? 1 : 0)
      }
      // console.log(JSON.stringify(params))
      // debugger
      that.$http.post('/api/activity/publish', params).then(res => {
        if (res && res.code === 0) {
          this.$toast({
            message: '发布成功',
            position: 'middle',
            duration: 1000
          })
          this.$router.push('/class/news')
        } else if (res.code === 3 || res.code === 4) {
          this.$toast(res.msg)
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
