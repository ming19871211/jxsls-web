<!--课表列表-->
<template>
  <div>
    <class-header></class-header>
    <!--中间内容开始-->
    <div class="container">
         <div class="course-container">
           <!--列表内容-->
           <div class="course-list change-cell">
                <div class="item  list-change-time bg-white border-grey-d border-radius-10">
                  <mt-cell title="2-17-18年下学期" label="08/12 18:00" class="border-radius-10">
                    <i class="time iconfont">&#xe626;</i>
                    <span class="del"><i slot="icon" class="iconfont" style="color: #ff7c7c">&#xe635;</i>删除</span>
                  </mt-cell>
                  <div class="content border-t-grey-d">
                    <!--课表图片区-->
                    <img src="../../../assets/images/pic/pic_06.jpg" width="100%">
                  </div>
                </div>
               <div class="item  list-change-time bg-white border-grey-d border-radius-10">
                 <mt-cell title="2-17-18年上学期" label="08/12 18:00" class="border-radius-10">
                   <i class="time iconfont">&#xe626;</i>
                   <span class="del"><i slot="icon" class="iconfont" style="color: #ff7c7c">&#xe635;</i>删除</span>
                 </mt-cell>
                 <div class="content border-t-grey-d">
                   <!--课表图片区-->
                   <img src="../../../assets/images/pic/pic_06.jpg" width="100%">
                 </div>
               </div>
           </div>
         </div>
    </div>
    <!--中间内容结束-->
    <footer-menu menuSelected="班级"></footer-menu>
  </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
import classHeader from '@/components/headermenu/classheader'
import footerMenu from '@/components/footermenu'

export default {
  components: {
    classHeader, footerMenu
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
