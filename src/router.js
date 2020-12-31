import Vue from 'vue'
import Router from 'vue-router'
import Film from '@/views/Film'
import Center from '@/views/Center'
import Cinema from '@/views/Cinema'
import Test from '@/views/Test1'
import CinemaDetail from '@/views/Cinema/CinemaDetail'
import Detail from '@/views/Detail'
import Login from '@/views/Login'
import City from '@/views/City'


import Nowplaying from '@/views/Film/Nowplaying'
import Comingsoon from '@/views/Film/Comingsoon'
Vue.use(Router)//注册路由插件

const auth = {
    isLogin () {
        return false;
    }
}
// export default new Router({
//     mode:'history',
//     base:ProcessingInstruction.env.BASE_URL,
//     routes:[{
//         path:'/',
//         name:'home',
//         component:Home
//         },
//         {
//             pash:'/about',
//             name:'about',
//             component:()=>import('./views/About.vue')
//          }
//     ]
// })

const router = new Router({
    //vue中history查找文档
    mode: 'history',//默认hash，路径带#,history缺点是会向后端发起请求，会出现404错误,后端需要判断不是后端任何路径，应该返回一个index页面。
    // mode:'history',
    // base:ProcessingInstruction.env.BASE_URL,
    // routes:[{//将来多少路径对应组件关系
    //     path:'/',
    //     name:'home',
    //     component:Home
    //     },
    //     {
    //         pash:'/about',
    //         name:'about',
    //         component:()=>import('./views/About.vue')
    //      }
    // ]
    routes: [//如猫眼影院
        {
            path: '/film',
            component: Film,
            children: [{
                path: 'nowplaying',
                component: Nowplaying
            },
            {
                path: 'comingsoon',
                component: Comingsoon
            },
            {
                path: '',
                redirect: '/film/nowplaying'
            }
            ]
        },
        {
            path: '/Cinema',
            component: Cinema,
        },
        {
            path: '/Cinema/:myid',
            component: CinemaDetail
        }
        ,
        {
            path: '/center',
            component: Center
        },
        {
            path: '/detail/:myid',//:表动态路由只要/后有东西就行,：后不跟信息，此路径无效
            name: 'detail',//起好名字后可以用名字来代替路径跳转
            component: Detail,
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/city',
            component: City
        },
        {
            path: '/test',
            component: Test
        },
        {
            path: '*',//*表其他路径
            redirect: '/film'
        }
    ]
})
//全局守卫 所有路由都要盘查,内部什么都不写就会被卡主
// router.beforeEach((to,from,next)=>{
// console.log(to)
// if(to.path==='/center'){
//     console.log('盘查')
//     if(auth.isLogin()){
//         // console.log(1);
//         next();
//     }else{
//         // console.log(2);
//         next('/login');
//     }
// }else{
//     next();
// }
// })
export default router