<template>
    <div>
        <router-link to="/city">地区</router-link>
        <p>影院</p>
        <router-link to='/cinema'>搜索</router-link>
    </div>
</template>

<style lang="scss" scoped>
    div{
        display: flex;
        justify-content: space-around;
    }
    .fixed{
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 40px;
    // color: white;
    background: rgb(255, 255, 255);
}
</style>
