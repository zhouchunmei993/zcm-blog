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
                label="序号"
                type="index"
                :index="indexMethod"
                width="180">
        </el-table-column>
        <el-table-column
                label="首图"
                width="180">
          <template slot-scope="scope">
            <img style="width: 50px;height: 50px;" :src="scope.row.img" alt="">
          </template>
        </el-table-column>
        <el-table-column
                prop="title"
                label="标题">
        </el-table-column>
        <el-table-column
                prop="tag_name"
                label="标签">
        </el-table-column>
        <el-table-column
                prop="user_name"
                label="作者">
        </el-table-column>
        <el-table-column
                prop="create_time"
                label="创建时间">
        </el-table-column>
        <el-table-column
                label="是否为草稿">
          <template slot-scope="scope">
            <span v-if="scope.row.is_draft===1">是</span>
            <span v-if="scope.row.is_draft===0">否</span>
          </template>
        </el-table-column>
        <el-table-column
                label="操作">
          <template slot-scope="scope">
            <router-link to="/###">
              <el-button
                      type="text"
                      size="small">
                查看
              </el-button>
            </router-link>

            <router-link :to="'/admin/blog/edit/?id='+scope.row.id">
              <el-button
                      type="text"
                      size="small">
                编辑
              </el-button>
            </router-link>
            <el-button
                    @click="isdel(scope.row.id,scope.row.is_draft)"
                    type="text"
                    size="small">
              删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>


    </div>

    <div class="page">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import qs from 'qs'
  export default {
    data() {
      return {
        tableData: [],
        pageIndex:1,
        pageSize:10,
        total:0,
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize=val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.pageIndex=val;
        this.getData();
      },
      indexMethod(index) {
        return (index+1)+(this.pageIndex-1)*this.pageSize;
      },
      getData(){
        let postdata={
          pageIndex:this.pageIndex,
          pageSize:this.pageSize,
        };
        this.$Axios.get('/yun/blog/server_list?'+qs.stringify(postdata)).then(res=>{
          if(res.code===200){
            this.tableData=res.data.list;
            this.total=res.data.total;
          }else{
            this.$message.error(res.message);
          }
        });
      },
      isdel(id,draft) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRow(id,draft);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteRow(id,draft){
        let deldata={
          id:id,
          sta:1,
          draft:draft,
        };
        this.$Axios.post('/yun/blog/blog_status',deldata).then(res=>{
          if(res.code===200){
            this.$message.success('删除成功');
            this.getData();
          }
          else{
            this.$message.error(res.message);
          }
        });
      },
    },
    created(){
      this.getData();
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
