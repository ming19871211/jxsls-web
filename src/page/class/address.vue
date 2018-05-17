<!--地区选择-->
<template>
 <div>
   <publish-header></publish-header>
   <!--中间内容开始-->
   <div class="container-fluid">
     <!--地区内容-->
     <div class="address-select">
       <mt-index-section class="change-cell border-b-grey-d" index="您当前所在地区">
         <mt-cell class="border-t-grey-d" title="湖南省-长沙市-岳麓区"><i slot="icon" class="iconfont icons">&#xe633;</i></mt-cell>
       </mt-index-section>
       <div class="cell-address change-cell border-b-grey-d border-t-grey-d">
         <mt-cell title="选择地区" value="湖南省"></mt-cell>
       </div>
       <div class="cell-address-content change-cell">
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
         <mt-cell title="长沙市" class=" border-b-grey-d"><i class="iconfont">&#xe7bc;</i></mt-cell>
       </div>
     </div>
   </div>
   <!--中间内容结束-->
   <footer-menu menuSelected="班级"></footer-menu>
 </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import publishHeader from '@/components/headermenu/publishheader'
import footerMenu from '@/components/footermenu'
export default {
  components: {
    publishHeader, footerMenu
  },
  data: function () {
    return {

    }
  },
  created: function () {
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
