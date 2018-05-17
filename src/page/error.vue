/* 错误提示*/
<template>
  <div>
    <error-header isback='false' :title="code==='0'?'操作完成':'错误提示'"></error-header>
    <div class="container">
      <div class="error-info mint-cell-change">
        <!-- 错误内容 -->
        <div v-if="code!=='0'" class="bd bg-white text-center border-radius-10">
          <i class="iconfont block error-icon">&#xe61d;</i>
          <h3>出错啦</h3>
          <span v-html="msg" style="margin-top:10px"></span>
        </div>
        <div v-if="code==='0'" class="bd bg-white text-center border-radius-10">
          <i class="iconfont block error-icon">&#xe61d;</i>
          <span v-html="msg" style="margin-top:10px"></span>
        </div>
        <div v-show="code!=='0'" class="text-center btn-change">
          <mt-button type="primary" class="btn-green-change bg-grad-green yahei" @click.native="retry">{{btnLabel}}
          </mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import errorHeader from '@/components/headermenu/index'
import { mapActions } from 'vuex'
import global from '../utils/global'

export default {
  components: {
    errorHeader
  },
  data: function () {
    return {
      status: 200,
      code: '-1',
      msg: '服务异常，请稍后重试',
      url: null,
      btnLabel: '重新加载'
    }
  },
  created () {
    this.status = this.$route.query.status
    this.code = this.$route.query.code
    this.msg = this.$route.query.msg
    this.url = this.$route.query.url
    /* console.log('status:' + this.status)
    console.log('code:' + this.code)
    console.log('msg:' + this.msg)
    console.log('url:' + this.url) */
    if (this.$route.query.status == 404) {
      this.msg = '您访问的页面不存在，请刷新'
      this.btnLabel = '返回首页'
    } else if (this.$route.query.status == 401) {
      this.msg = this.msg + '，请重新登录'
      this.btnLabel = '重新登录'
    } else if (this.$route.query.status == 500) {
      this.msg = '服务异常，请稍后重试'
      this.btnLabel = '返回首页'
    } else if (this.$route.query.status == 503) {
      this.msg = '服务异常，请稍后重试'
      this.btnLabel = '返回首页'
    } else {
      if (code !== '0') {
        this.msg = '服务异常，请稍后重试' + '<br/>code: ' + this.code + '<br/>msg: ' + this.msg
        this.btnLabel = '重新登录'
      }
    }
  },
  methods: {
    ...mapActions({
      CLEAR_USER: 'CLEAR_USER'
    }),
    retry: function () {
      if (this.status == 401) {
        this.CLEAR_USER()
      }
      if (process.env.ENV_CONFIG == 'dev') {
        location.href = '/'
      } else {
        if (this.url) {
          location.href = global.serverDomain + 'wechat/forward?moduleUrl=' + encodeURIComponent(this.url)
        } else {
          location.href = global.serverDomain + 'wechat/'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
