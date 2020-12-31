<template>
  <div class="swiper-container filmswiper">
    <div class="swiper-wrapper">
        <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination film-swiper-pagination" ></div>
  </div>
</template>
<script>

import Swiper from 'swiper/bundle' // js
import 'swiper/swiper-bundle.min.css'//css文件
export default {
  props:['preview','myclass'],//为了保证组件swiper复用，需要区分哪块区域
  mounted () {
    // console.log(this.myclass);
    /* eslint-disable no-new */
    new Swiper('.'+this.myclass, {
      // direction: 'vertical'
      // loop: true,
      // autoplay: {
      //   delay: 2000
      // },
      // 如果需要分页器
      slidesPerView: this.preview,
      spaceBetween: this.myclass==='actors'?20:10,
      freeMode: true,
    })
  }
}
</script>
<style lang="scss" scoped>
img{
  width: 100%;
}
</style>
