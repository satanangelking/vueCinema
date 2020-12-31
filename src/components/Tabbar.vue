<template>
  <nav>
    <ul>
      <router-link to="/film" tag='li' activeClass='myactive'>
        <i class="iconfont icon-form"></i>
        <!-- iconfont小图标 -->
        film
      </router-link>
      <router-link to="/cinema" tag='li' activeClass='myactive'>
        <i class="iconfont icon-form"></i>
        cinema
      </router-link>
      <router-link to="/center" tag='li' activeClass='myactive'>
        <i class="iconfont icon-form"></i>
        center
      </router-link>
      <!-- <li><router-link to="/film">film</router-link></li>
            <li><router-link to="/cinema">cinema</router-link></li>
            <li><router-link to="/center">center</router-link></li> -->
    </ul>
  </nav>
</template>
<script>
export default {
  methods: {
    sendMsgToFilm: function () {
      this.$emit('listenToTabbarEvent', 'this message is from child');
    }
  }
}
</script>

<style lang="scss" scoped>
.myactive {
  color: blue;
}
nav {
  z-index: 1;
  width: 100%;
  height: 50px;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  ul {
    display: flex;
    li {
      flex: 1;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
