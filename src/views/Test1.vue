<template>
  <el-table ref="table" border stripe highlight-current-row :data="tableData5" style="width: 800px;">

    <el-table-column type="expand" width="1">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
  </el-table>
</template>
 
 <script>
export default {
  data () {
    return {
      tableData5: [{
        id: '1',
        name: '好滋好味鸡蛋仔1',
        desc: '荷兰优质淡奶，奶香浓而不腻1',
      }, {
        id: '2',
        name: '好滋好味鸡蛋仔2',
        desc: '荷兰优质淡奶，奶香浓而不腻2',
      }, {
        id: '3',
        name: '好滋好味鸡蛋仔3',
        desc: '荷兰优质淡奶，奶香浓而不腻3',
      }, {
        id: '4',
        name: '好滋好味鸡蛋仔4',
        desc: '荷兰优质淡奶，奶香浓而不腻4',
      }]
    };
  },
  methods: {
    toogleExpand (row) {
      let $table = this.$refs.table;
      $table.toggleRowExpansion(row)
    }
  }
}
</script>