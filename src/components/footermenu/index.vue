<!--suppress ALL -->
<template>
  <div>
    <!--导航-->
    <mt-tabbar fixed class="footer-menu" v-show="user.currRole != null" v-model="selected">
      <mt-tab-item id="班级">
        <div v-show="classRedDot>0" class="spot iconfont font-color-red">&#xe608;</div>
        <div class="icon"><i class="iconfont bj"></i></div>
        <div class="name">班级</div>
      </mt-tab-item>
      <mt-tab-item id="通讯录">
        <div v-show="bookRedDot>0" class="spot iconfont font-color-red">&#xe608;</div>
        <div class="icon"><i class="iconfont txl"></i></div>
        <div class="name">通讯录</div>
      </mt-tab-item>
      <mt-tab-item id="老师事务" v-show="user.currRole === 1">
        <div v-show="affairsRedDot>0" class="spot iconfont font-color-red">&#xe608;</div>
        <div class="icon"><i class="iconfont sw"></i></div>
        <div class="name">事务</div>
      </mt-tab-item>
      <mt-tab-item id="家长事务" v-show="user.currRole === 2">
        <div v-show="affairsRedDot>0" class="spot iconfont font-color-red">&#xe608;</div>
        <div class="icon"><i class="iconfont sw"></i></div>
        <div class="name">事务</div>
      </mt-tab-item>
      <mt-tab-item id="我">
        <div class="icon"><i class="iconfont w"></i></div>
        <div class="name">我</div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'footmenu',
  data () {
    return {
      selected: this.menuSelected
    }
  },
  created () {
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    }),
    classRedDot () {
      return this.$store.getters.GET_MSG_BY_CONDITION({roleId: [this.user.currRole], msgType: ['1', '2', '3', '4', '5']})
    },
    bookRedDot () {
      return this.$store.getters.GET_MSG_BY_CONDITION({roleId: [this.user.currRole], msgType: ['6']})
    },
    affairsRedDot () {
      return this.$store.getters.GET_MSG_BY_CONDITION({roleId: [this.user.currRole], msgType: ['7', '8']})
    }
  },
  props: {
    menuSelected: {
      type: String,
      default: '班级'
    }
  },
  watch: {
    selected: function (val, oldValue) {
      // this.SET_FOOTER_MENU(val)
      this.$router.push({
        name: this.selected
      })
    }
    /* footer: function (val, oldValue) {
      this.selected = val
    } */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
