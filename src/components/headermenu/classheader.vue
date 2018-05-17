<template>
  <div>
    <mt-header class="header-menu" :title="title">
      <mt-button slot="right" @click="add"><i class="iconfont add">&#xe641;</i></mt-button>
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
      default: ''
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
      if (!this.backName) {
        this.$router.back()
      }
      this.$router.push({name: this.backName, params: this.res})
    },
    add: function () {
      this.$emit('add')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
