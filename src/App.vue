<template>
  <div>
    <!-- 从store.js中直接获取状态 -->
    <!-- <tabbar v-show='this.$store.state.isTabbarShow'> -->
    <tabbar v-show="isTabbarShow">

      <!-- <tabbar v-show="isShow"> -->
      <!-- 计算属性 -->
    </tabbar>
    <router-view></router-view>
    <!-- <input type="text" ref="mytext">
    <button @click="handleAdd()">add</button>
    <ul>
      <li v-for="data in datalist" :key="data.id">
        {{data}} <button @click="handleDel()">del</button>
      </li>
    </ul>
    <navbar>
      <button @click="isShow=!isShow">navbar</button>
    </navbar>
    <sidebar v-show='isShow'>
    </sidebar> -->

  </div>
</template>
<script>
import tabbar from '@/components/Tabbar'
import { mapState } from 'vuex';//ES6导入方式
// import bus from '@/bus'
export default {
  components: {
    tabbar: tabbar,
  },
  data: function () {
    return {
      // isShow: true
    }
  },
  methods: {

  },

  // computed:{
  //   isShow(){
  //     return this.$store.state.isTabbarShow;
  //   }
  // }
  // computed: mapState(['isTabbarShow'])//初级写法，切割状态,数组内为需要访问的状态计算属性名
  computed: {//和初级相比可自定义计算属性
    ...mapState(['isTabbarShow']),//高级写法  ...为展开写法，对象数组皆可用
    //var a =[1,2,3],var b=[4,5,6],[...a,...b,7,8,9]输出1,2,3,4,5,6,7,8,
    ...mapState(['isHeadbarShow'])
  }
  // mapState方法等价于
  // computed:{
  //   isTabbarShow(){
  //     return true; or return false
  //   }
  // }

  //检测store是否传值过来
  // mounted(){
  //   console.log(this.$store)
  // }

  // 中央监听方法
  // beforeMount(){
  //   console.log('从这里开始订阅')
  //   bus.$on('maizuo',(data)=>{//监听
  //     console.log('被通知',data);
  //     this.isShow = data;
  //   })
  // }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
li {
  list-style: none;
}
</style>

