<template>
  <div>
    <headbar :class="isFixed?'fixed':''"></headbar>
    <!-- 组件初始化过早因为temp创建后swiper就加载了, DEEP算法原理，key值一变与原始不同，因此调用DOM删除原来，创建新的-->
    <swiper :key='looplist.length' ref='myswiper'>
      <!-- swiper自带css与js -->
      <div class='swiper-slide' v-for='data in looplist' :key="data.filmId">
        <img :src="data.poster" alt="" @click="handleChangePage(data.filmId)">
      </div>
    </swiper>
    <!-- 组件加class也能加 -->
    <filmheader :class="isFixed?'fixed':''"></filmheader>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import swiper from '@/views/Film/Swiper'
import filmheader from '@/views/Film/Filmheader'
import headbar from '@/components/Headbar'

import { Indicator } from 'mint-ui';
export default {
  components: {
    swiper,
    filmheader,
    headbar,
  },
  data: function () {
    return {
      looplist: [],
      isFixed: false
    }
  },
  mounted () {//ajax请求  监听事件\
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
    axios({
      url: 'https://m.maizuo.com/gateway',
      params: {
        cityId: 110100,
        pageNum: 1,
        pageSize: 10,
        type: 2,
        k: 534223
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607088511970847292489729","bc":"110100"}'
        , 'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data);
      this.looplist = res.data.data.films
      Indicator.close();
    }),
      window.onscroll = this.handleScroll;
  },
  beforeDestroy () {
    // console.log('beforedestroy')
    window.onscroll = null;
  },
  methods: {//tabbar置顶
    handleScroll () {
      // console.log(1111)
      //能拿到原生组件对象，只差一点就能拿到DOM节点
      // console.log(document.documentElement.scrollTop,this.$refs.myswiper.$el.offsetHeight);
      //     if(滚动距离>=轮播高度){

      //     }else{

      //     }
      if (document.documentElement.scrollTop >= this.$refs.myswiper.$el.offsetHeight) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    handleChangePage (id) {
      // console.log(id)
      //编程时导航  路径跳转
      this.$router.push(`/detail/${id}`)
      //命名跳转
      // this.$router.push({name:'detail',params:{myid:id}})
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper-slide {
  img {
    width: 100%;
    height: 400px;
  }
}
.content {
  padding-bottom: 20px;
}
</style>

