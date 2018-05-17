<template>
  <div></div>
</template>

<script>
export default {
  date () {
    return {}
  },
  created () {
    window.location = this.$route.query.url
  }
}
</script>
