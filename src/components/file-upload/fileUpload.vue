<template>
  <div>
    <ul class="upload-images overflow-hidden">
      <li class="border-grey-d text-center" v-for="(item,index) in files" :key="index">
        <div>
          <img :src="item.blob">
          <!--mt-progress :value="item.percent" :bar-height="1"></mt-progress-->
        </div>
        <i class="iconfont del" @click="remove(item)">&#xe635;</i>
      </li>
      <li class="border-grey-d text-center" v-show="!((maximum===1 && files.length===1) || (maximum===9 && files.length===9))" >
        <file-upload :multiple="multiple" :maximum="maximum" ref="upload" v-model="files"  @input-file="inputFile" @input-filter="inputFilter">
          <i class="iconfont add">&#xe641;</i>
        </file-upload>
      </li>
    </ul>
    <!--加载遮罩层-->
    <div class="loading-layer" v-show="show">
      <div>
        （{{complete}}/{{files.length}}）
        <mt-spinner type="triple-bounce"></mt-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import fileUpload from 'vue-upload-component'
import qiniuUpload from '@/utils/upload'
import {mapGetters} from 'vuex'
import {Toast} from 'mint-ui'

export default {
  components: {fileUpload},
  data: function () {
    return {
      files: [], // 上传文件列表
      status: false // 上传状态（false:未开始；true：开始上传）
      // isshow: false // 上传图片时显示遮罩
    }
  },
  created () {
  },
  props: {
    // 是否自动上传，默认自动上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 是否可以多选文件，默认多选模式
    multiple: {
      type: Boolean,
      default: true
    },
    // 最大允许上传文件数
    maximum: {
      type: Number,
      default: 9
    },
    // 是否进行压缩上传
    compress: {
      type: Boolean,
      default: true
    },
    // 压缩图片宽度
    compressWidth: {
      type: Number,
      default: 0
    },
    // 压缩图片高度
    compressHeight: {
      type: Number,
      default: 0
    },
    // 图片压缩质量
    quality: {
      type: Number,
      default: 0.7
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    }),
    complete: function () {
      let count = 0
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].success) {
          count++
        }
      }
      return count
    },
    show: function () {
      let isShow = false
      let count = this.files.length
      if (count > 0 && this.getStatus()) {
        let completeFiles = 0
        for (let i = 0; i < this.files.length; i++) {
          if (this.files[i].success || this.files[i].error) {
            completeFiles++
          }
        }
        if (completeFiles === count) {
          this.setStatus(false)
          isShow = false
        } else {
          isShow = true
        }
      }
      return isShow
    }
  },
  methods: {
    // 获取上传状态
    getStatus () {
      return this.status
    },
    // 设置上传状态
    setStatus (status) {
      this.status = status
    },
    // 上传所选文件
    uploadAll () {
      this.setStatus(true)
      for (let i = 0; i < this.files.length; i++) {
        this.uploadFile(this.files[i])
      }
    },
    // 上传文件
    uploadFile: function (file) {
      this.setStatus(true)
      var that = this
      if (!file.success) {
        const observer = {
          next (res) {
            that.$emit('next', res)
          },
          error (err) {
            file.error = err.message
            file.success = false
            that.$emit('error', err)
          },
          complete (res) {
            file.success = true
            file.url = qiniuUpload.getDomain() + '/' + res.key
            that.$emit('complete', file)
          }
        }
        let key = this.user.userId + '/' + this.formatDate(new Date(), 'yyyyMMdd') + '/' + this.uuid() + '.' + this.getFileSuffix(file.name)
        console.log('key:' + key)
        // file.success = true
        // that.$emit('complete', file)
        if (this.compress && (file.file.size / 1024 > 2049)) {
          // 大于2M，进行压缩上传
          this.compressUploadFile(file.file, key, observer)
        } else {
          // 不压缩上传
          qiniuUpload.upload(file.file, key, file.name, observer)
        }
      }
    },
    // 压缩文件上传
    compressUploadFile: function (file, key, observer) {
      // 压缩图片需要的一些元素和对象
      let reader = new FileReader()
      let img = new Image()

      // 缩放图片需要的canvas
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      // 图片压缩质量（0~1之间）
      let quality = this.quality
      console.log('压缩前：' + file.size)
      console.log('图片压缩质量：' + quality)

      img.onload = function () {
        // 图片原始尺寸
        let originWidth = this.width
        let originHeight = this.height
        // 最大尺寸限制
        let maxWidth = this.compressWidth === 0 ? originWidth : this.compressWidth
        let maxHeight = this.compressHeight === 0 ? originHeight : this.compressHeight
        // 目标尺寸
        let targetWidth = originWidth
        let targetHeight = originHeight
        // 图片尺寸超过最大尺寸的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth
            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
          } else {
            targetHeight = maxHeight
            targetWidth = Math.round(maxHeight * (originWidth / originHeight))
          }
        }

        // canvas对图片进行缩放
        canvas.width = targetWidth
        canvas.height = targetHeight

        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight)
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight)

        // canvas转为blob并上传
        canvas.toBlob(function (blob) {
          // 图片上传七牛云
          console.log('压缩后：' + blob.size)
          qiniuUpload.upload(blob, key, file.name, observer)
        }, file.type || 'image/png', quality)
      }

      // 文件base64化，以便获知图片原始尺寸
      reader.onload = function (e) {
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   Read and write
     * @param  Object|undefined   oldFile   Read only
     * @param  Function           prevent   Prevent changing
     * @return undefined
     */
    inputFilter  (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          Toast('不支持的文件格式，请确认文件格式为（jpeg、jpe、gif、png）')
          return prevent()
        }
      }

      if (this.files.length >= this.maximum) {
        Toast('最多只支持上传' + this.maximum + '张）')
        return prevent()
      }

      // Create a blob field
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },

    /**
     * Has changed
     * @param  Object|undefined   newFile   Read only
     * @param  Object|undefined   oldFile   Read only
     * @return undefined
     */
    inputFile (newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  Get the response status code
          console.log('status', newFile.xhr.status)
        }
      }

      if (this.autoUpload) {
        // 自动上传模式
        this.uploadFile(newFile)
      }
      // this.$emit('emitFile', this.files)
    },
    remove (item) {
      for (let i = 0; i < this.files.length; i++) {
        if (item.id === this.files[i].id) {
          this.files.splice(i, 1)
          this.$emit('remove', item)
          break
        }
      }
    },
    uuid () {
      let s = []
      let hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'

      let uuid = s.join('')
      return uuid
    },
    formatDate: function (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    },
    getFileSuffix (filename) {
      let idx1 = filename.lastIndexOf('.')
      let idx2 = filename.length
      return filename.substring(idx1 + 1, idx2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loading-layer{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
  .loading-layer div{
    position: absolute;
    top:50%;
    left: 50%;
    margin-left: -0.945rem;
    margin-top: -0.945rem;
  }
</style>
