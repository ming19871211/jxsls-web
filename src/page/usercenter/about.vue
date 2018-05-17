<!--关于我们-->
<template>
  <div>
    <class-header title="关于我们"></class-header>
    <!--中间内容开始-->
    <div class='container-fluid'>
        <div class="user-help mint-cell-change">
             <div class="help-content">
               <h5 class="font-normal mint-custom-title">联系我们</h5>
               <mt-cell class="border-b-grey-d" title="联系地址：长沙市桐梓坡西路298号">
                 <i class="iconfont huo" slot="icon">&#xe78f;</i>
               </mt-cell>
               <mt-cell class="border-b-grey-d" title="联系电话：0731-88799888">
                 <i class="iconfont huo" slot="icon">&#xe78f;</i>
               </mt-cell>
               <mt-cell class="border-b-grey-d" title="版本号：优班掌1.0">
                 <i class="iconfont huo" slot="icon">&#xe78f;</i>
               </mt-cell>
             </div>
        </div>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected='我'></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import {mapGetters} from 'vuex'

export default {
  components: {
    classHeader, footerMenu
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER'
    })
  },
  methods: {
  }
}

</script>

<style scoped>

</style>
