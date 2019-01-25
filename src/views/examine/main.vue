<template>
  <div class="blog">

    <div class="param">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="时间区间查询">
          <el-date-picker
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
          </el-date-picker>
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
                label="#"
                align="center"
                width="50">
          <template slot-scope="scope">
            {{showIndex(scope.$index)}}
          </template>
        </el-table-column>
        <el-table-column
                prop="type"
                label="类型"
                align="center"
                width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 0">评论</el-tag>
            <el-tag v-else type="success">留言</el-tag>
          </template>
        </el-table-column>
        <el-table-column
                prop="cont"
                label="内容">
        </el-table-column>
        <el-table-column
                prop="user_name"
                label="书写人"
                align="center"
                width="80">
        </el-table-column>
        <el-table-column
                prop="create_time"
                label="评论时间"
                align="center"
                width="160">
          <template slot-scope="scope">
            {{$Tool.formatDate(scope.row.create_time, 'YY年MM月DD日hh点mm')}}
          </template>
        </el-table-column>
        <el-table-column
                prop="is_pass"
                label="状态"
                align="center"
                width="80">
          <template slot-scope="scope">
            <!--is_pass,0.未审核，1.通过，2.未通过-->
            <el-tag v-if="scope.row.is_pass===0">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.is_pass===1">通过</el-tag>
            <el-tag type="danger" v-if="scope.row.is_pass===2">未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column
                label="操作"
                width="230">
          <template slot-scope="scope">
            <a target="_blank" href="###">
              <el-button size="mini">查看原文</el-button>
            </a>
            <span>
              <el-button v-if="scope.row.is_pass===0" size="mini" type="primary" @click="examineFun(scope.row)">审核</el-button>
            </span>
            <el-popover
                    :ref="scope.row.id"
                    placement="top"
                    width="160">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                <el-button type="primary" size="mini" @click="del(scope.row.id)">确定</el-button>
              </div>
              <el-button type="danger" slot="reference" size="mini">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>

      </el-table>

    </div>

    <div class="page">
      <el-pagination
              background
              @size-change="pageSizeFun"
              @current-change="pageIndexFun"
              :current-page="pageIndex"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </div>

    <el-dialog
            title="审核"
            :visible.sync="examineSta"
            width="50%">
      <div class="examine_dig">

        <div class="examine_msg">
          <el-alert
                  title="审核提醒"
                  type="warning"
                  description="请遵循国家对网上发帖、评论的法律条例约束和规范严格审核"
                  close-text="知道了"
                  show-icon>
          </el-alert>
        </div>

        <div class="examine">

          <p>原文:</p>

          <div class="look">
            <a target="_blank" href="###">
              <span>XXX</span>
            </a>
          </div>

          <p>内容:</p>

          <div class="cont" v-html="rowdata.cont">
          </div>

        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="examineSta = false">取 消</el-button>
        <el-button type="danger" @click="submit(2)">不通过</el-button>
        <el-button type="success" @click="submit(1)">通过</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import qs from 'qs';
  export default {
    data() {
      return {
        tableData: [],
        examineSta: false,
        pageIndex:1,
        pageSize:10,
        total:0,
        rowdata:{},
      }
    },
    methods: {
      getData(){
        let postdata={
          pageIndex:this.pageIndex,
          pageSize:this.pageSize,
        };
        this.$Axios.get('/yun/blog/comment_list?'+qs.stringify(postdata)).then(res=>{
          if(res.code===200){
            this.tableData=res.data.list;
            this.total=res.data.total;
          }else{
            this.$message.error(res.message);
          }
        });
      },
      // 序号
      showIndex(index) {
        return index + (this.pageIndex - 1) * this.pageSize + 1;
      },
      // 每页条数改变
      pageSizeFun(val) {
        this.pageSize=val;
        this.getData();
      },
      // 分页改变
      pageIndexFun(val) {
        this.pageIndex=val;
        this.getData();
      },
      del(id){
        let deldata={
          id:id,
          sta :1 ,//是否删除 0:正常 1:删除
        };
        this.$Axios.post('/yun/blog/evaluate_del',deldata).then(res=>{
          if(res.code===200){
            this.$refs[id].doClose();
            this.$message.success(res.message);
            this.getData();
          }
          else{
            this.$message.error(res.message);
          }
        });
      },
      // 打开弹窗 审核
      examineFun(rowdata) {
        this.examineSta = true;
        this.rowdata=rowdata;
      },
      //审核提交
      submit(i){
        let examinedata={
          id: this.rowdata.id,
          sta :i ,//是否通过审核 0:待审核 1:通过 2:未通过
        };
        this.$Axios.post('/yun/blog/evaluate_examine',examinedata).then(res=>{
          if(res.code===200){
            this.examineSta=false;
            this.$message.success(res.message);
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
    .list_img {
      width: 60px;
      height: 60px;
    }
    /deep/ .el-range-separator {
      width: auto;
    }
    .examine_dig {
      .examine_msg {
      }
      .examine {
        margin-top: 10px;
        p {
          font-weight: bold;
        }
        .cont {
          width: 100%;
          height: 300px;
          border: 1px solid #e1e1e1;
          padding: 10px;
          overflow: auto;
        }
        .look {
          a {
            color: #409EFF;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
