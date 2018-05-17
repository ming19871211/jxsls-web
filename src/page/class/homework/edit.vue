<!--作业发布-->
<template>
  <div>
    <mt-header class="header-menu" :title="material.className">
      <mt-button slot="left"  @click="handleClose"><i class="iconfont">&#xe79f;</i>返回</mt-button>
      <mt-button slot="right" @click.native="publishHomework">发布</mt-button>
    </mt-header>
    <!--中间内容开始-->
    <div class="container-fluid">
         <div class="course-container change-input">

           <!--发布对象-->
           <contacts  @emitCheckList="getCheckList" displayer="n"></contacts>

           <!--条件-->
           <mt-field class="mint-field-clear-no mint-cell-change" label="选择科目" placeholder="选择科目" :state="subjectState" v-model="subjectName" :readonly="true" @click.native="subjectClick"><i class="iconfont font-size-26 font-color-black">&#xe791;</i></mt-field>
           <!--选择科目-->
           <mt-popup class="change-popup-bottom"  v-model="popupSubject"  position="bottom"  modal=false>
             <div class="text-right"><mt-button size="small" class="bg-none close" @click.native="subjectClickConfirm">确定</mt-button></div>
             <picker :slots="subjects" value-key="subjectName" @change="onValuesSubject"></picker>
           </mt-popup>
           <!--发布内容-->
           <div class="event-edit">
             <div class="bd bg-white mint-cell-change border-b-grey-d">
               <mt-field  class="event-edit-text border-t-grey-d" v-model="content" placeholder="填写作业内容~~" type="textarea" rows="6"></mt-field>
               <file-upload ref="fileUpload" :autoUpload="true" @next="next" @error="error" @complete="complete"  @remove="remove" ></file-upload>
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
import picker from '@/components/picker/picker'
import FileUpload from '@/components/file-upload/fileUpload'
import contacts from '@/components/classcontacts'
import {mapGetters} from 'vuex'

export default {
  components: {
    classHeader, footerMenu, picker, contacts, FileUpload
  },
  data: function () {
    return {
      name: '班级消息',
      winHeight: {
        height: document.documentElement.clientHeight + 'px'
      },
      ulHeight: document.documentElement.clientHeight,
      value: [],
      classId: '',
      popupSelect: false,
      popupSubject: false,
      subjectId: '',
      subjectState: '',
      subjectName: '',
      content: '',
      files: [],
      results: [],
      checkList: [],
      subList: [],
      subjects: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      isChange: false
    }
  },
  created  () {
    this.classId = this.$route.query.classId
    this.getSubject()
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
    selectClick: function () {
      this.popupSelect = true
    },
    subjectClick: function () {
      this.subjectId = this.subjects[0].values[0].subjectId
      this.subjectName = this.subjects[0].values[0].subjectName
      this.popupSubject = true
    },
    subjectClickConfirm: function () {
      this.popupSubject = false
    },
    onValuesSubject: function (picker, values) {
      var that = this
      let vlus = values[0]
      if (vlus) {
        if (that.isChange) {
          that.subjectName = vlus.subjectName
          that.subjectId = vlus.subjectId
          that.subjectState = 'success'
        }
        that.isChange = true
      }
      /* if (vlus && (vlus.subjectId === that.subjectId)) {
        that.subjectName = vlus.subjectName
        that.subjectId = vlus.subjectId
        that.subjectState = 'success'
      } */
    },
    getSubject () {
      var that = this
      that.$http.post('/api/dir/getSubject', {gradeId: that.material.gradeId}).then(res => {
        if (res !== null && res.code === 0) {
          that.subList = res.data
          that.subList.forEach(function (itm, index) {
            that.subjects[0].values.push(itm)
          })
          that.subjectId = that.material.subjectId
          that.subjectName = that.material.subjectName
          that.subjectState = 'success'
        }
      })
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
      // console.log('that.checkList', that.checkList)
    },

    //  发布作业
    publishHomework () {
      var that = this
      var pictures = []
      var imgs = ''

      if (that.content.length === 0) {
        this.$toast({
          message: '作业内容不能为空!',
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
        subjectId: that.subjectId,
        subjectName: that.subjectName,
        content: that.content,
        pictures: imgs,
        publisherId: that.user.userId,
        publisherName: that.user.nickName,
        publishHeadPic: that.user.avatar,
        userList: JSON.stringify(that.checkList),
        preveImgList: imgs
      }
      that.$http.post('/api//homework/publish', params).then(res => {
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
  .change-input .mint-field .mint-cell-title {
    text-align: left;
  }
</style>
