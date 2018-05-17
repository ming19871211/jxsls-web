<!--
通用的顶部组件
参数：
  title：标题
  back_router_name：点返回要前往的路由名称
  isback：是否需要返回按钮，取值：yes/no
-->

<template>
  <div>
    <mt-header class="header-menu" :title="title">
      <mt-button slot="left" v-show="isback === 'yes'" @click="handleClose"><i class="iconfont">&#xe79f;</i>返回
      </mt-button>
    </mt-header>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: '这是header'
    }
  },
  props: {
    title: {
      type: String,
      default: '班级'
    },
    backName: {
      type: String,
      default: null
    },
    isback: {
      type: String,
      default: 'yes'
    },
    res: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    handleClose () {
      if (!this.backName) {
        this.$router.back()
      }
      this.$router.push({name: this.backName, params: this.res})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
