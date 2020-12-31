<template>
  <div>

    <!-- <mt-button type="default">default</mt-button>
    <mt-button type="primary">primary</mt-button>
    <mt-button type="danger">danger</mt-button> -->
    <h1>21</h1>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>

</template>
<script>
import { Button } from 'mint-ui';
export default {
  // beforeRouteEnter(to,from,next){//三种类型，Enter,Update,Leave
  //     //在渲染该组件的对应路由被cofirm前调用
  //     //不能获取组件实例“this”，因当守卫执行前，组件实例还未创建
  //     if(false){
  //         next();
  //     }else{
  //         console.log('局部盘查')
  //         next('/login');
  //     }
  // }
  components: {

  },
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1'
        }]
      }]
      ,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick (data) {
      console.log(data);
    }
  }
}
</script>
<style>
.tree .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.tree .el-icon-caret-right:before {
  content: "\E602";
  font-size: 18px;
}
.tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
  content: "\E63c";
  font-size: 18px;
}
</style>
