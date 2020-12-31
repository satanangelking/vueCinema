<template>
  <div class="purchase-item">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.purchase-item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: orange;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
