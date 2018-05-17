<!--转让班级-->
<template>
  <div>
    <class-header title="转让班级"></class-header>
    <!--中间内容开始-->
    <div class='container-fluid'>
         <div class="over-class bg-white">
           <div class="change-input border-b-grey-d">
             <mt-checklist class="event-edit-checklist" align="right" :max="1"  v-model="value"  :options="options"></mt-checklist>
             <div class="mint-checklist event-edit-checklist none">
               <a class="mint-cell">
                 <div class="mint-cell-wrapper">
                   <div class="mint-cell-title">
                     <label class="mint-checklist-label address-book">
                       <img slot="icon" class="icon-head border-radius-100 text-center" src="../../assets/images/pic/pic_03.jpg">
                       <span class="mint-checkbox is-right">
                         <input type="checkbox" class="mint-checkbox-input" value="0b63298046c811e8b7585254004cbd29">
                         <span class="mint-checkbox-core"></span>
                       </span>
                       <span class="mint-checkbox-label">李嘉测试名字1</span>
                     </label>
                   </div>
                 </div>
               </a>
               <a class="mint-cell">
                 <div class="mint-cell-wrapper">
                   <div class="mint-cell-title">
                     <label class="mint-checklist-label address-book">
                       <img slot="icon" class="icon-head border-radius-100 text-center" src="../../assets/images/pic/pic_03.jpg">
                       <span class="mint-checkbox is-right">
                         <input type="checkbox" class="mint-checkbox-input" value="0b63298046c811e8b7585254004cbd29">
                         <span class="mint-checkbox-core"></span>
                       </span>
                       <span class="mint-checkbox-label">李嘉测试名字1</span>
                     </label>
                   </div>
                 </div>
               </a>
             </div>
           </div>
         </div>
         <div class="text-center btn-change"><mt-button type="primary" class="btn-green-change bg-grad-green yahei" @click.native="overClick">转&nbsp;让</mt-button></div>
        <!--转让弹出-->
        <mt-popup class="popup-over popup-model bg-white border-radius-10" v-model="popupOver"  position="center" modal=false>
          <div class="hd font-size-34 font-color-white">
            <span class="block text-center">转让班级</span>
          </div>
          <div class="bd">
             <div class="title">你正在把</div>
             <div class="object-over border-grey-d border-radius-10 mint-cell-change overflow-hidden">
               <mt-cell :title="classInfo.gradeName+classInfo.clssName"></mt-cell>
               <mt-cell class="font-color-grey" :title="classInfo.schlName"><i class="iconfont font-size-28" slot="icon">&#xe633;</i></mt-cell>
             </div>
            <div class="title">转让给</div>
            <div class="object-over border-grey-d border-radius-10 mint-cell-change overflow-hidden">
              <mt-cell :title="toName"><img class="border-radius-100" slot="icon" :src="toUrl"></mt-cell>
            </div>
          </div>
          <div class="text-center btn-change"><mt-button type="primary" class="btn-green-change bg-grad-green yahei" @click.native="submit">确&nbsp;定</mt-button></div>
        </mt-popup>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected='我'></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import { MessageBox, Toast } from 'mint-ui'

export default {
  components: {
    classHeader, footerMenu
  },
  data: function () {
    return {
      value: [],
      toName: '',
      toUrl: '',
      classInfo: this.$route.params.clssInfo,
      popupOver: false,
      options: []
    }
  },
  created: function () {
    this.$http.post('/api/classical/queryMaterials', {
      clssId: this.classInfo.clssId,
      roleId: '1'
    })
      .then(res => {
        if (res !== null && res.code === 0) {
          var data = res.data
          for (var i = 0; i < data.length; i++) {
            var elemt = {}
            elemt.label = data[i].materialName
            elemt.value = data[i].materialId
            this.options.push(elemt)
          }
        }
      })
  },
  methods: {
    overClick: function () {
      if (!this.checkValue(this.value[0])) {
        return
      }
      this.$http.post('/api/userinfo/findUser', {
        login_hint: 'teacherId',
        username: this.value[0]
      }).then(res => {
        this.toUrl = res.data.avatar
        this.toName = res.data.nickName
      })
      this.popupOver = true
    },
    submit: function () {
      this.$http.post('/api/classical/transferClss', {
        classId: this.classInfo.clssId,
        headMasterId: this.classInfo.headMasterId,
        teacherId: this.value[0],
        className: this.classInfo.clssName
      }).then(res => {
        if (res !== null && res.code === 0) {
          this.$router.push({name: '我的班级'})
        } else if (res === null) {
          this.showMsgBox('后台业务故障')
        } else {
          this.showMsgBox(res.msg)
        }
      })
    },
    checkValue: function (value) {
      if (value == null || value == '') {
        Toast('请选择教师')
        return false
      }
      return true
    },
    showMsgBox: function (value) {
      MessageBox('提示', value)
    }
  }
}

</script>

<style scoped>

</style>
