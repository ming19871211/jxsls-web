<!--通知详情-->
<template>
<div>
  <class-header></class-header>
  <div>
    <div>ss</div>
    <div>ss</div>
    <file-upload ref="fileUpload" :autoUpload="true" :multiple="true" :maximum="1" :compress="true" :quality="0.7" @next="next" @error="error" @complete="complete" @remove="remove"></file-upload>
    <button @click="upload">上传</button>
  </div>
</div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import classHeader from '@/components/headermenu/backheader'
// import fileUpload from '@/components/file-upload/fileUpload'
import FileUpload from '@/components/file-upload/fileUpload'

export default {
  components: {
    FileUpload,
    classHeader
  },
  data () {
    return {
      files: []
    }
  },
  methods: {
    upload () {
      this.$refs.fileUpload.uploadAll()
    },
    next (res) {
      // console.log('大小：', total.size)
      // console.log('进度：', total.percent)
    },
    error (err) {
      console.log(err)
    },
    complete (file) {
      console.log('完成上传文件.....' + file.name)
      this.files.push(file)
    },
    remove (file) {
      for (let i = 0; i < this.files.length; i++) {
        if (file.id === this.files[i].id) {
          this.files.splice(i, 1)
          break
        }
      }
      console.log('selects files.......')
      console.log(this.files)
    }
  },
  created: function () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
