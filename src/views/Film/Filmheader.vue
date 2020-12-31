<template>
    <div>
        <ul>
            <router-link to='/film/nowplaying' tag='li' activeClass='active'><span>正在上映</span></router-link>
            <router-link to='/film/comingsoon' tag='li' activeClass='active'><span>即将上映</span></router-link>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
ul{
    display: flex;
    margin-bottom: 25px;
    li{
        flex:1;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: gray;
        margin-bottom: 10px;
        span{
            display: inline-block;
        }
    }
}
.active{
    color: red;
    span{
         border-bottom:1px solid red;
    }
}
.fixed{
    z-index: 1;
    position: fixed;
    left: 0;
    top: 40px;
    width: 100%;
    height: 40px;
    // color: white;
    background: rgb(255, 255, 255);
}
</style>
