<template>
  <div>
    <ul class="wrap" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="data in this.$store.state.comingList" :key="data.filmId" @click="handleChangePage(data.filmId)">
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
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { InfiniteScroll } from 'mint-ui';
export default {
  data () {
    return {
      loading: false,
    }
  },
  computed: {//跟mapState一样两种方法，this.$store.getters.方法名
    //或...mpGetters展开([方法名])
    ...mapGetters(['comingListGetter'])
  },
  mounted () {
    // if(store中list.length==0){
    //     ajax
    // }else{
    //     缓存数据
    // }
    console.log(this.$store.state)
    if (this.$store.state.comingList.length === 0) {//减轻对后端的压力
      //异步数据
      this.$store.dispatch('getComingListAction');
    } else {
      console.log(this.$store)
    }
  },
  methods: {
    handleChangePage (id) {
      // console.log(id)
      //编程时导航  路径跳转
      this.$router.push(`/detail/${id}/cinema`)
      //命名跳转
      // this.$router.push({name:'detail',params:{myid:id}})
    },
    loadMore () {
      console.log('到底了')
      this.loading = true;
      if (this.$store.state.comingList.length === this.$store.state.comingTotal) {
        return;
      } else {
        if (this.$store.state.commingCurrent > 1) {
          this.$store.dispatch('getComingListAction');
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
