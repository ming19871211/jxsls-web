/* 家长事务列表*/
<template>
  <div>
    <class-header isback='false' title="家长事务"></class-header>
    <div class="container-fluid">
      <div class="affairs-index">
        <!-- 家长私信 -->
        <div class="parent-affairs-list user-center">
          <div class="bd  mint-cell-change">
            <mt-cell title="我的私信" class="bg-white border-radius-10 border-grey-d class-index" @click.native="letterClick">
              <div v-show="letterRedDot>0" class="spot iconfont font-color-red">&#xe608;</div>
              <i class="iconfont icon1" slot="icon">&#xe7b9;</i></mt-cell>
            <mt-cell title="我的请假" class="bg-white border-radius-10 border-grey-d class-index" @click.native="leaveClick">
              <div v-show="leaveRedDot>0" class="spot iconfont font-color-red">&#xe608;</div>
              <i class="iconfont icon1" slot="icon">&#xe7b6;</i>
            </mt-cell>
          </div>
        </div>
      </div>
    </div>
    <footer-menu menuSelected="家长事务"></footer-menu>
  </div>
</template>

<script>
import classHeader from '@/components/headermenu/index'
import footerMenu from '@/components/footermenu'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    classHeader, footerMenu
  },
  data: function () {
    return {}
  },
  methods: {
    ...mapActions({
      REMOVE_MSG_BY_CONDITION: 'REMOVE_MSG_BY_CONDITION'
    }),
    letterClick: function () {
      this.REMOVE_MSG_BY_CONDITION({roleId: [this.user.currRole], msgType: ['7']})
      this.$router.push({name: '家长私信列表'})
    },
    leaveClick: function () {
      this.REMOVE_MSG_BY_CONDITION({roleId: [this.user.currRole], msgType: ['8']})
      this.$router.push({name: '家长请假列表'})
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    }),
    letterRedDot () {
      return this.$store.getters.GET_MSG_BY_CONDITION({roleId: [this.user.currRole], msgType: ['7']})
    },
    leaveRedDot () {
      return this.$store.getters.GET_MSG_BY_CONDITION({roleId: [this.user.currRole], msgType: ['8']})
    }
  }
}
</script>

<style scoped>

</style>
