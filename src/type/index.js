export const HIDE_TABBAR_MUTATION = 'hide'
export const SHOW_TABBAR_MUTATION = 'show'
//为了区分同一个对象中由两个相同key值，因此将Mutation归纳在一起
//如果冲突了 只要在此处将VALUE值更新就行。

// var name ='key'
// var obj ={
//     name:'aaa'
// }
// console.log(obj)//输出{name:aaaa}

// var name ='key'
// var obj ={
//     [name]:'aaa'//ES6规范，[key],将括号里的name当作变量对待
// }
// console.log(obj)//输出{name:key}