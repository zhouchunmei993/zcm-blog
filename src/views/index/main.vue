<template>
  <div class="admin">

    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>服务器状态</span>
          </div>
          <div>
            <p>运行状态：  服务器出现错误</p>
            <p>服务器发行版本：</p>
            <p>Node.js编译运行系统平台：</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>服务器信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
          </div>
          <div>
            <el-row :gutter="24">
              <el-col :span="12">
                <p>服务器主机名：</p>
                <p>操作系统：</p>
                <p>服务器总内存数：</p>
                <p>服务器可用内存数：</p>
              </el-col>
              <el-col :span="12" style="text-align: center">
                <el-progress type="circle" :percentage="25"></el-progress>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top: 20px">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>CPU信息</span>
          </div>
          <div>
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
        </el-card>
      </el-col>
    </el-row>

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
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/less/theme.less";
  .admin {
    padding: 40px 80px;
  }
</style>
