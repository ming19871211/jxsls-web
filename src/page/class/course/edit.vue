<!--课表发布-->
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
           <div class="course-edit bg-white  mint-cell-change border-b-grey-d">
             <mt-field placeholder="课表标题" v-model="content" class="title border-b-grey-d"></mt-field>
             <file-upload ref="fileUpload" :maximum="1" :multiple="false"  :autoUpload="true" @next="next" @error="error" @complete="complete" @remove="remove"></file-upload>
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
  data () {
    return {
      name: '班级消息',
      content: '',
      files: []
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
    },
    complete (fileUrl) {
      this.files.push(fileUrl)
    },
    remove (file) {
      for (let i = 0; i < this.files.length; i++) {
        if (file === this.files[i]) {
          this.files.splice(i)
          break
        }
      }
    },

    // 获取子组件传递的文件数组
    getFile (files) {
      // debugger
      this.files = []
      this.files = files
    },

    // submit
    submit () {
      // debugger
      var that = this
      var pictures = []
      var imgs = ''

      if (!that.content || that.content.length === 0) {
        this.$toast({
          message: '课表标题不能为空哦!',
          position: 'middle',
          duration: 1000
        })
        return
      }

      if (that.files.length > 0) {
        that.files.forEach(function (itm, idx) {
          pictures.push({img: itm.url})
        })
        imgs = JSON.stringify(pictures)
      } else {
        this.$toast({
          message: '图片不能为空哦!',
          position: 'middle',
          duration: 1000
        })
        return
      }

      var params = {
        title: '',
        classId: that.material.classId,
        className: that.material.className,
        timeTabName: that.content,
        publisherId: that.user.userId,
        publisherName: that.user.nickName,
        classicalPictures: imgs,
        publishHeadPic: that.user.avatar || ''
      }

      // console.log('params;', params)
      that.$http.post('/api/timetab/upload', params).then(res => {
        if (res.code === 0) {
          this.$toast({
            message: '发布成功',
            position: 'middle',
            duration: 1000
          })

          setTimeout(() => {
            this.$router.push('/class/news')
          }, 1000)
        } else {
          this.$toast({
            message: '发布失败',
            position: 'middle',
            duration: 1000
          })
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

</style>
