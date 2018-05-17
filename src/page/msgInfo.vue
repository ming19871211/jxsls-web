<template>
  <div>
    <error-header isback='false' title="扫码登录"></error-header>
    <div class="container">
      <div class="error-info mint-cell-change">
        <div class="bd text-center border-radius-10">
          <img src="http://weixin.wxres.talkedu.cn/group1/M00/00/00/ca26f892-4698-4b3b-bd83-1bbdb5557f68.png" class="msginfo-img" />
          <h3>登录二维码识别完成</h3>
        </div>
        <div class="text-center btn-change">
          <mt-button type="primary" class="btn-green-change bg-grad-green yahei" @click.native="closeWin">
            确定
          </mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import errorHeader from '@/components/headermenu/index'

export default {
  components: {
    errorHeader
  },
  data () {
    return {}
  },
  computed: {
  },
  created () {
  },
  methods: {
    closeWin () {
      wx.closeWindow()
    }
  }
}
</script>

<style scoped>
  .msginfo-img{
    width: 6.52rem;
    height:6.52rem;
  }
  .error-info h3{
    margin-top: 0.42rem;
    font-weight: normal;
    font-size: 0.65rem;
    color: #919191;
  }
</style>
