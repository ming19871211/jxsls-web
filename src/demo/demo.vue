<template>
  <div>
    <mt-picker :slots="slots" itemHeight="88" @change="onValuesChange"></mt-picker>
   <div class="mint-cell-change container change-input">
<mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
     <a data-v-0a15e0b4="" class="mint-cell mint-field">
       <div class="mint-cell-left"></div>
       <div class="mint-cell-wrapper">
         <div class="mint-cell-title">
           <span class="mint-cell-text">生日</span>
         </div>
         <div class="mint-cell-value">
           <input placeholder="请输入生日" type="date" class="mint-field-core1">
           <div class="mint-field-clear" style="display: none;">
             <i class="mintui mintui-field-error"></i>
           </div>
           <span class="mint-field-state is-default">
             <i class="mintui mintui-field-default"></i>
           </span>
           <div class="mint-field-other"></div>
         </div>
       </div>
       <div class="mint-cell-right"></div>
     </a>
   </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    }
  },
  created () {
    Toast({
      message: 'Upload Complete',
      position: 'bottom',
      duration: -1
    })
  },
  methods: {

  }
}
</script>
<style scoped>
  .mint-field-core1 {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: 0;
    line-height: 1.6;
    font-size: inherit;
    width: 100%;
    height: 1.9rem;
  }

</style>
