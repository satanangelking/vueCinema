<template>
  <div id='cinema-detail'>
    <div class="name">
      <p>{{cinema.name}}</p>
    </div>
    <div class="service">
      <div v-for="data in cinema.services" :key="data.name">{{data.name}}</div>
    </div>
    <div class="address">{{cinema.address}}</div>
    <div>
      <ul>
        <li v-for="data in film" :key="data.filmId">
          <img :src="data.poster" alt="">
          <p>{{data.name}} <span>{{data.grade}}</span></p>
          <p>{{description(data.category,data.runtime,data.director)}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: [
    'id'
  ],
  data () {
    return {
      cinema: {},
      film: [],
    }
  },
  computed: {
    description () {
      return function (category, runtime, director) {
        return category + '|' + runtime + '|' + director
      }
    }
  },
  mounted () {
    console.log('要id获取详情信息', this.$route.params.myid)
    axios({
      url: `https://m.maizuo.com/gateway/?cinemaId=${this.$route.params.myid}&k=3377040`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607088511970847292489729","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.info'
      }
    }).then(res => {
      // console.log(res.data.data.cinema)
      this.cinema = res.data.data.cinema
      // console.log(this.cinema)
      // console.log(this.cinema.logoUrl)
    });
    axios({
      url: `https://m.maizuo.com/gateway/?cinemaId=${this.$route.params.myid}&k=5749991`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607088511970847292489729","bc":"440300"}',
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
      // console.log(res.data.data.films)
      this.film = res.data.data.films
    });
    axios({
      url: `https://m.maizuo.com/gateway/?filmId=4836&cinemaId=${this.$route.params.myid}&date=1608134400&k=2527240`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607088511970847292489729","bc":"440300"}',
        'X-Host': 'mall.film-ticket.schedule.list'
      }
    }).then(res => {
      console.log(res.data)
    })
  }
}
</script>
<style lang="scss" scoped>
#cinema-detail {
  .name {
    text-align: center;
    height: 44px;
    p {
      font-size: 17px;
    }
  }
  .service {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    div {
      border: 1px solid orange;
      color: orange;
      padding: 1px 4px;
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .address {
    margin-left: 30px;
  }
}
</style>
