<template>
  <div>
      <div class="no-content">
           <img class="msg-img" src="../../assets/images/add/no-content.png">
           <div class="msg-text">{{msg}}</div>
      </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {

    }
  },
  created () {
    console.log('msg:', this.msg)
  },
  props: {
    msg: {
      type: String,
      default: 'Sorry! 暂时还没有数据'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .no-content{
    text-align: center;
    padding: 4.5rem 0;
  }
  .no-content .msg-img{
    width:7.32rem;
    height:9.26rem;
    margin: 0 auto;
  }
  .msg-text{
    margin-top: 0.42rem;
  }
</style>
