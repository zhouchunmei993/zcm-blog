<template>
  <div>

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="类型1" value="shanghai"></el-option>
          <el-option label="类型12" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内容">

        <div id="editor">
          <mavon-editor ref="mavon" @imgAdd="imgAdd" :boxShadow="false" codeStyle="monokai-sublime" style="height: 100%"
                        v-model="cont"></mavon-editor>
        </div>

      </el-form-item>

      <el-form-item label="标签">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="标签啊" name="type"></el-checkbox>
          <el-checkbox label="标签啊" name="type"></el-checkbox>
          <el-checkbox label="标签啊" name="type"></el-checkbox>
          <el-checkbox label="标签啊" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="自定义发布时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
      </el-form-item>
      <el-form-item label="允许评论">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button type="primary" @click="onSubmit">存为草稿</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {

    components: {
      mavonEditor,
    },
    data() {
      return {
        form: {},
        cont: ''
      }
    },
    methods: {
      onSubmit() {
        console.log(this.cont);
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
      }
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
