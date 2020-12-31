<template>
  <div class="cinema" :style='mystyle'>
    <!--动态设置内联样式  -->
    <ul>
      <li v-for="data in datalist" :key="data.cinemaId" @click="handle(data.cinemaId)">
        <div class='box1 box3'>
          <p>{{data.name}}</p>
          <small>{{data.address}}</small>
        </div>
        <div class="box1 box2">
          <p class="price">￥{{data.lowPrice/100}}起</p>
          <p v-if="parseInt(data.Distance*1000)<1000">{{parseInt(data.Distance*1000)}}m</p>
          <p v-else>{{parseFloat(data.Distance).toFixed(1)}}Km</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      datalist: [],
      mystyle: {
        height: '0'
      }
    }
  },
  methods: {
    handle (id) {
      this.$router.push(`/cinema/${id}`)
    }
  },
  mounted () {
    this.mystyle.height = document.documentElement.clientHeight - 50 + 'px';
    // console.log(this.mystyle.height)
    axios({
      url: `https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=2052335`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607088511970847292489729"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      console.log(res.data);//节点过多优化问题
      this.datalist = res.data.data.cinemas;

      this.$nextTick(() => {//等上方完成才开始调用以下数据
        new BetterScroll('.cinema', {
          click: true, //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
          probeType: 2, //这个属性设置之后可以监听得到了
          mouseWheel: true,
          scrollbar: {//显示scrollbar
            fade: true,
            interactive: false
          }
        })//transition和transform 比原生滚动更加平湖滚动
      });
    })
    // new BetterScroll('.cinema'){//注意别太早更新，因此在调用完DOM后出现

    // }
  }
}
</script>
<style lang="scss" scoped>
.cinema {
  overflow: hidden;
  position: relative; //做个定位防止到头拉出更多空白
  ul {
    li {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      .box3 {
        width: 170px;
      }
      .box2 {
        text-align: right;
      }
      .box1 {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 3px 0;
        }
        small {
          color: #797d82;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 120px;
        }
        .price {
          color: orange;
        }
      }
    }
  }
}
</style>
