<template>
  <div class="blog">

    <div class="param">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input placeholder="关键字"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-select placeholder="标签">
            <el-option label="标签1" value="shanghai"></el-option>
            <el-option label="标签2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="list">

      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            prop="date"
            label="CPU内核模型"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="CPU频率(GHz)"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="CPU执行模式">
        </el-table-column>
      </el-table>

    </div>

    <div class="page">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>
    </div>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/less/theme.less";

  .blog {
    .param {
      border-bottom: 1px solid #f1f1f1;
    }
    .list {
      margin-top: 22px;
    }
    .page {
      text-align: right;
      margin-top: 22px;
    }
  }
</style>
