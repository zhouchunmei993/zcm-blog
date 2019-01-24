<template>
  <div class="admin">

    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>服务器状态</span>
          </div>
          <div>
            <p>运行状态：  <span v-if="constants==='0'">正常</span> <span v-if="constants==='1'">不正常</span></p>
            <p>服务器发行版本：{{release }}</p>
            <p>Node.js编译运行系统平台：{{platform}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>服务器信息</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="getdata">刷新</el-button>
          </div>
          <div>
            <el-row :gutter="24">
              <el-col :span="12">
                <p>服务器主机名：{{hostname }}</p>
                <p>操作系统：{{type }}</p>
                <p>服务器总内存数：{{totalmem }}</p>
                <p>服务器可用内存数：{{freemem }}</p>
              </el-col>
              <el-col :span="12" style="text-align: center">
                <el-progress type="circle" :percentage="percentage"></el-progress>
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
                  prop="model"
                  label="CPU内核模型"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="speed"
                  label="CPU频率(GHz)"
                  width="180">
              </el-table-column>
              <el-table-column
                  label="CPU执行模式">
                <template slot-scope="scope">
                  <span>{{scope.row.times}}</span>
                </template>
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
        tableData: [],
        freemem:'',//服务器可用内存数
        hostname :'',//服务器主机名
        release :'',//服务器发行版本
        type :'',//操作系统
        constants:'',//运行状态 0正常 1不正常
        platform :'',//Node.js编译时的操作系统平台
        totalmem:'',//系统内存总数
        percentage:0,
      }
    },
    methods:{
      getdata(){
        this.$Axios.get('/yun/blog/sys').then(res=>{
          if(res.code===200){
            this.tableData=res.data.cpu;
            this.freemem=res.data.freemem;
            this.hostname=res.data.hostname;
            this.release=res.data.release;
            this.type=res.data.type;
            this.constants=res.data.constants;
            this.platform=res.data.platform;
            this.totalmem=res.data.totalmem;

            let aaa = res.data.freemem.split("M");
            let bbb = res.data.totalmem.split("M");
            this.percentage=(aaa[0]/bbb[0]).toFixed(2);
            console.log(aaa[0]);
            console.log(bbb[0]);
            console.log(this.percentage);

          }else{
            this.$message.error(res.message);
          }
        });
      }
    },
    created(){
      this. getdata();
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/less/theme.less";
  .admin {
    padding: 40px 80px;
  }
</style>
