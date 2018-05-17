<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted () {
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    window.onresize = () => {
      const nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight
      const footerElement = document.querySelector('.footer-menu.mint-tabbar')
      if (clientHeight > nowClientHeight) {
        footerElement.style.display = 'none'
      } else {
        footerElement.style.display = 'flex'
      }
    }
  }
}
</script>

<style>
  @import 'assets/css/app.css';
  /* 引入公共样式 */
  @import 'assets/css/style.css'; /* 引入自定义样式 */
</style>
