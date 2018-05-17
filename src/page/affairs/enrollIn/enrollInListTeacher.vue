<template>
  <div>
    <back-header title="活动报名" @add="add"></back-header>
    <div class="container-fluid">
      aaaa
    </div>
    <footer-menu menuSelected="老师事务"></footer-menu>
  </div>
</template>
<script>
import backHeader from '@/components/headermenu/backheader'
import footerMenu from '@/components/footermenu'
export default {
  components: {
    backHeader, footerMenu
  },
  data () {
    return {}
  },
  methods: {
    add () {
      alert('11')
    }
  }
}
</script>
