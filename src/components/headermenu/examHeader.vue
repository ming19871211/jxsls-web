<template>
  <div>
    <mt-header class="header-menu" :title="title">
      <mt-button slot="left" v-show="isback === 'yes'" @click="handleClose"><i class="iconfont">&#xe79f;</i>返回</mt-button>
      <mt-button slot="right" @click="edit">历史成绩</mt-button>
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
    handleClose: function () {
      if (this.backName === null) {
        this.$router.back()
      }
      this.$router.push({name: this.backName, params: this.res})
    },
    edit: function () {
      this.$emit('edit')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
