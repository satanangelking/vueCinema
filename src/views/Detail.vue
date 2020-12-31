<template>
  <div v-if='filminfo'>
    <!-- 小心数据提前被渲染，提前渲染的数据为空 -->
    <div class="content">
      <div class="header">
        <img :src="filminfo.poster" class="poster" alt="">
        <h2>{{filminfo.name}} <span>{{filminfo.item.name}}</span></h2>
        <p>{{filminfo.category}}</p>
        <p>xx-xx-xx上映</p>
        <p>{{filminfo.nation}}|{{filminfo.runtime}}</p>
        <p class="introduce" v-if='isActive'>{{filminfo.synopsis}}</p>
        <p class="introduce-open" v-else>{{filminfo.synopsis}}</p>
        <p style="text-align:center" @click="handle">↓</p>
      </div>

      <p class="split">演员列表<span>全部({{filminfo.actors.length}})</span></p>
      <siwper preview='3' class='actors' myclass='actors'>
        <div class="swiper-slide" v-for="data in filminfo.actors" :key="data.name">
          <img :src="data.avatarAddress" alt="">
          <p>{{data.name}}</p>
          <small>{{data.role}}</small>
        </div>
      </siwper>

      <p class="split">剧照 <span>全部({{filminfo.photos.length}})</span></p>
      <siwper preview='4' class='photos' myclass='photos'>
        <div class="swiper-slide" v-for="data in filminfo.photos" :key="data">
          <img :src='data' alt="">
        </div>
      </siwper>
    </div>
    <Purchaseitem>
      <div @click="purchase(filminfo.filmId)">选座购票</div>
    </Purchaseitem>
  </div>
</template>
<script>
import axios from 'axios';
import Purchaseitem from '@/views/Detail/Purchaseitem'
import siwper from './Detail/Detailswiper'
import bus from '@/bus'//与APP同一个bus
import { HIDE_TABBAR_MUTATION, SHOW_TABBAR_MUTATION } from '@/type'

import { MessageBox } from 'mint-ui';
export default {
  props: ['id'],
  components: {
    siwper,
    Purchaseitem
  },
  data () {
    return {
      filminfo: null,
      isActive: true
      // myStyle:{
      //     height:document.documentElement.clientHeight,
      // }
    }
  },
  methods: {
    handle () {
      this.isActive = !this.isActive
    },
    purchase (id) {
      this.$router.push(`/detail/${id}`);
    }
  },
  beforeMount () {
    // console.log('hideTabbar','发消息了');
    // bus.$emit('maizuo',false)
    // this.$store.state.isTabbarShow=false;
    this.$store.commit(HIDE_TABBAR_MUTATION, false)
  }
  ,
  mounted () {
    // this.myStyle.height = document.documentElement.clientHeight+50+'px';
    console.log();
    console.log('要id获取详情信息', this.$route.params.myid)//两种传参方式
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.myid}&k=9115717`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607088511970847292489729","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data)
      this.filminfo = res.data.data.film;
      if (!this.filminfo.isSale) {
        MessageBox({
          title: '提示',
          message: '没有排期，看看其他电影',
          showCancelButton: true
        }).then(res => {
          // console.log(res);
          if (res == 'confirm') {
            this.$router.push(`/Film/Nowplaying`)//回到首页
          }
        })
      }
    })
  },
  beforeDestroy () {
    // console.log('showtabbar')
    // bus.$emit('maizuo',true)
    // this.$store.state.isTabbarShow=true;//在store处监听修改，不能直接修改

    this.$store.commit(SHOW_TABBAR_MUTATION, true)//第一个参数为mutation名字
  }
}
</script>
<style lang="scss" scoped>
div {
  position: relative;
  overflow: hidden;
}
.poster {
  width: 100%;
}
img {
  width: 100%;
  vertical-align: center;
}
.split {
  padding-top: 40px;
  padding-bottom: 10px;
}
.swiper-slide {
  img {
    height: 100px;
  }
}
.content {
  margin-bottom: 50px;
}
.introduce {
  line-height: 24px;
  height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
