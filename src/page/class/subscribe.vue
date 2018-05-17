<!--班级分享-->
<template>
  <div>
    <class-header v-if="classInfo.clssId!==''" isback='false' title='加入班级'></class-header>
    <class-header v-if="classInfo.clssId===''" isback='false' :title='GLOBAL.title'></class-header>
    <!--中间内容开始-->
    <div class='container-fluid'>
      <div class='class-share'>
        <!--班级信息-->
        <div v-if="classInfo.clssId!==''" class='info'>
          <mt-cell :title='classInfo.clssName' :label='"班级代码：" + classInfo.clssCode'>
            <i class='iconfont'>&#xe633;</i>{{classInfo.schlName}}
          </mt-cell>
        </div>
        <div class='grap'>
          <img src='../../assets/images/add/share_02.gif'>
        </div>
        <!--二维码-->
        <div class='share'>
          <div v-if="classInfo.clssId!==''" class='text'>长按以下二维码，加入班级</div>
          <div v-if="classInfo.clssId===''" class='text'>长按识别二维码，开始体验“{{GLOBAL.title}}”</div>
          <div class="text-center" style="width:100%">
            <img :src="GLOBAL.mpQrCode" style="width:70%">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'

export default {
  components: { classHeader },
  data () {
    return {
      classInfo: {
        'schlName': '',
        'gradeName': '',
        'gradeId': '',
        'indbDate': '',
        'headMasterId': '',
        'headMasterMobile': '',
        'schlId': '',
        'clssState': 0,
        'clssCode': '',
        'clssId': '',
        'modifyTime': null,
        'clssName': '',
        'headMasterName': ''
      }
    }
  },
  computed: {
    // 地址栏参数
    query () {
      return {
        classId: this.$route.query.classId,
        subscribe: this.$route.query.subscribe
      }
    }
  },
  created () {
    var that = this
    if (that.query.classId) {
      // 如果当前用户已经关注了公众号，直接进行跳转到加入班级页面
      if (that.query.subscribe === '1') {
        that.$router.push({ name: '加入班级', query: { classId: that.query.classId } })
        return
      }
      // 查询班级信息
      that.$http.post('/api/classical/queryDetail', {
        clssId: that.query.classId
      }).then(res => {
        if (res !== null && res.code === 0) {
          that.classInfo = res.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
