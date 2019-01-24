<template>
  <div>

    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="markdown">

        <div id="editor">
          <mavon-editor ref="mavon" @imgAdd="imgAdd" :boxShadow="false" @change="change" codeStyle="monokai-sublime" style="height: 100%"
                        v-model="form.markdown"></mavon-editor>
        </div>

      </el-form-item>

      <el-form-item label="标签" prop="tag_id">
        <el-radio-group v-model="form.tag_id">
          <el-radio v-for="item in tagList" :label="item.id"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="自定义发布时间" prop="time">
        <el-date-picker
                v-model="form.time"
                type="datetime"
                placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="允许评论">
        <el-switch v-model="form.is_evaluate"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(0)">发布</el-button>
        <el-button type="primary" @click="onSubmit(1)">存为草稿</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  //is_draft 1.草稿
  //is_evaluate 0允许评论 1不允许
  export default {

    components: {
      mavonEditor,
    },
    data() {
      return {
        id:'',
        form: {
          title:'',
          markdown:'',
          content:'',
          tag_id:'',
          is_evaluate:true,
          img:'',
          is_draft:0,
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          tag_id:[
            {required: true, message: '请选择标签', trigger: 'blur'}
          ],
          time:[
            {required: true, message: '请选择时间', trigger: 'blur'}
          ]
        },
        tagList:[],
      }
    },
    methods: {
      onSubmit(i) {

        this.form.is_evaluate===true ? this.form.is_evaluate=0 : this.form.is_evaluate=1;
        let postdata={
          id:this.id,
          title : this.form.title,
          content : this.form.content,
          markdown : this.form.markdown,
          img : this.form.img,
          tag_id: this.form.tag_id,
          is_draft : i,
          is_evaluate : this.form.is_evaluate,
          u_id:5,
        };

        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$Axios.post('/yun/blog/edit',postdata).then(res=>{
              if(res.code===200){
                this.$message.success('发布成功');
                this.$router.replace({path: '/admin/blog'});

              }else{
                this.$message.error(res.message);
                return false;
              }
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      imgAdd(name, file) {
        console.log(file);
        let formdata = new FormData();
        formdata.append('file', file);
        this.$Axios.post('/yun/oss/upload', formdata, '', {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$refs.mavon.$img2Url(name, `${res.data.url}?x-oss-process=style/bstu.cn`);
          }
        })
      },
      getdata(){//修改，获取id的内容


        this.$Axios.get('/yun/blog/detail?id='+this.id).then(res=>{
          console.log(res);
          this.form=res.data;
          this.form.is_evaluate=!res.data.is_evaluate;
        });

      },
      gettag(){//获取标签
        this.$Axios.get('/yun/blog/tag_list').then(res=>{
          this.tagList=res.data.list;
        });
      },
      change(value,render){
        this.form.markdown=value;
        this.form.content=render;
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
    },
    created(){
      if(this.$route.query.id){
        this.id = this.$route.query.id;
        this.getdata();
      }

      this.gettag();
    }

  }
</script>

<style lang="less" scoped>
  @import "~@/assets/less/theme.less";

  #editor {
    width: 100%;
    height: 580px;
    margin: 0;
    /*/deep/ .v-note-op {*/
    /*box-shadow: none;*/
    /*border: 1px solid #e0e0e0;*/
    /*}*/
    /*/deep/ .v-note-panel {*/
    /*box-shadow: none;*/
    /*border: 1px solid #e0e0e0;*/
    /*margin-top: -1px;*/
    /*}*/
  }
</style>
