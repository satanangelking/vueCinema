import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {HIDE_TABBAR_MUTATION,SHOW_TABBAR_MUTATION} from '@/type'
//全局状态管理， 来管理非父子通信 以防多人联合开发其通信使用冲突
Vue.use(Vuex)

export default new Vuex.Store({
    // state:{//自定义的共享状态
    //     aab:true
    // },
    state: {
        isTabbarShow:true,
        isHeadbarShow:true,
        comingList:[],
        nowPlayingList:[],
        nowCurrent:1,
        nowTotal:1,
        commingCurrent:1,
        comingTotal:1,
     },

    getters:{//该方法默认上方state里面已经传过来了,getters作用过滤原数据其中的部分数据
        comingListGetter(state){
            return state.comingList.filter((item,index)=>index<3)
        }
    },
        
    mutations:{//监听  唯一修改状态位置
        // HideMaiZuoTabbar(state,data){//方法名为commit第一个参数，data名为第二个参数， state为当前目录下的state(头上)
        //     // console.log('HideMaiZuoTabbar')
        //     state.isTabbarShow = data;
        // },//两种书写方法
        [HIDE_TABBAR_MUTATION](state,data){//方法名为commit第一个参数，data名为第二个参数， state为当前目录下的state(头上)
            // console.log('HideMaiZuoTabbar')
            state.isTabbarShow = data;
        },
        [SHOW_TABBAR_MUTATION](state,data){//方法名为commit第一个参数，data名为第二个参数， state为当前目录下的state(头上)
            // console.log('HideMaiZuoTabbar')
            state.isTabbarShow = data;
        },
        comingListMutation(state,data){
            // console.log(state);
            state.comingList = [...state.comingList,...data.films];
            state.comingTotal = data.total;
        },
        nowPlayingListMutation(state,data){
            // console.log(data);
            state.nowPlayingList = [...state.nowPlayingList,...data.films];
            state.nowTotal = data.total;
            // console.log(state.nowPlayingList.length)
        }
    },
    actions:{   //亦可同步，只是一个监控作呕也能够，
                //异步 1判断store有无数据，没有ajax(action->mutations->state)
                //  2有数据，直接从store取数据渲染，不用再次向后端取数据,避免了多次访问，减少重复访问，并且保证已经请求过的仍然缓存于NetWOork上
            getComingListAction(store){//vuex调用的时候自动传store过去
                // console.log(store.state.comingList.length+'+'+store.state.comingTotle)
                axios({
                    url:`https://m.maizuo.com/gateway?cityId=110100&pageNum=${store.state.commingCurrent}&pageSize=10&type=2&k=2994974`,
                    headers:{
                        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607088511970847292489729","bc":"440300"}',
                        'X-Host': 'mall.film-ticket.film.list'
                    }
                }).then(res=>{
                    
                    // console.log(store.state.commingCurrent);
                    // console.log(res.data);
                    // console.log(store);
                    store.state.commingCurrent++;
                    store.commit('comingListMutation',res.data.data)
                   })
            },
            getNowPlayingListActions(store){
                // console.log(store.state.nowPlayingList.length+"+"+store.state.nowTotal)
                axios({
                    url:`https://m.maizuo.com/gateway?cityId=110100&pageNum=${store.state.nowCurrent}&pageSize=10&type=1&k=4291647`,
                    headers:{
                        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607088511970847292489729","bc":"110100"}',
                        'X-Host': 'mall.film-ticket.film.list'
                    }
                }).then(res=>{
                    // console.log(res.data);
                    store.state.nowCurrent++;
                    console.log(store.state.nowCurrent)
                    store.commit('nowPlayingListMutation',res.data.data);
                })
            }
    }
})
// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     isTabbarShow:false,
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
