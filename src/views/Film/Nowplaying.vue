<template>
  <div>
    <ul class="wrap" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="data in this.$store.state.nowPlayingList" :key="data.filmId" @click="handleChangePage(data.filmId)">
        <a>
          <span class="span1">
            <img :src="data.poster" alt="">
          </span>
          <span class="span2">
            <span class='span_name'>{{data.name}}<span class='item'>{{data.item.name}}</span></span>
            <span v-if='data.grade' class="span">观众评分: <span>{{data.grade}}</span></span>
            <span v-else class="span">暂无评分</span>
            <!-- 数据格式化：自定义函数 或者 使用vue过滤器 -->
            <span v-if='data.actors' class="span">主演:{{data.actors | actorfilter}}</span>
            <span v-else class="span">暂无主演</span>
            <span class="span">{{data.nation}}|{{data.runtime}}分钟</span>
            <span></span>
          </span>
          <span class="span1">
            <a>购票</a>
          </span>
        </a>

      </li>
      <div v-show="isShow">正在加载中。。。</div>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
Vue.filter('actorfilter', function (data) {
  // console.log(data);
  //for循环  or map方法
  // var list = [1,2,3]
  // var newlist = list.map(item=>`kerwin${item}`)
  // console.log(newlist);
  var newlist = data.map(item => item.name);
  //console.log(newlist);
  //console.log(newlist.join(' '))
  return newlist.join(' ');;
})
export default {
  data () {
    return {
      // datalist:[]
      loading: false,
      isShow: true,
    }
  },
  mounted () {
    // axios.get('https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=4291647')
    // .then(res=>{console.log(res.data)})
    //注意网站是否需要额外字段解释，否则无法拿到数据
    //由于是字段阻隔，因此不需要axios解析，直接axios内部闯入字段。
    // axios({
    //     url:'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=4291647',
    //     headers:{
    //        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607088511970847292489729","bc":"110100"}',
    //         'X-Host': 'mall.film-ticket.film.list'
    //     }
    // }).then(res=>{
    //     // console.log(res.data);
    //     this.datalist = res.data.data.films;
    //     })

    if (this.$store.state.nowPlayingList.length === 0) {
      this.$store.dispatch('getNowPlayingListActions')
    } else {
      console.log('二次nowplaying')
    }
  },
  methods: {
    handleChangePage (id) {
      // console.log(id)
      //编程时导航  路径跳转
      this.$router.push(`/detail/${id}`)
      //命名跳转
      // this.$router.push({name:'detail',params:{myid:id}})
    },
    loadMore () {
      console.log('到底了')
      this.loading = true;//禁用   
      if (this.$store.state.nowPlayingList.length === this.$store.state.nowTotal) {
        this.isShow = false;
        return;
      } else {
        if (this.$store.state.nowCurrent > 1) {
          this.$store.dispatch('getNowPlayingListActions')
        }
      }
      setTimeout(() => {
        // let last = this.list[this.list.length - 1];
        // for (let i = 1; i <= 10; i++) {
        // this.list.push(last + i);
        // }
        this.loading = false;
      }, 2500);
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  height: 100vh;
  overflow-y: auto;
}
ul {
  li {
    margin-bottom: 10px;
    a {
      display: flex;
      flex-direction: row;
      .span1 {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        img {
          width: 100%;
        }
        a {
          color: red;
          border: 1px solid red;
          margin: 0 auto;
          padding: 3px 5px;
        }
      }
      .span2 {
        flex: 3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .span {
          overflow-x: hidden;
          margin: 2px 10px;
          font-size: 12px;
          opacity: 0.5;
          filter: alpha(opacity=50);
          span {
            color: orange;
            font-weight: 500;
          }
        }
        .span_name {
          margin: 4px 10px;
          font-size: 16px;
          font-weight: 500;
          opacity: 1;
          filter: alpha(opacity=100);
          .item {
            font-size: 13px;
            margin: auto 5px;
            background: gray;
            color: white;
          }
        }
      }
    }
  }
}
</style>