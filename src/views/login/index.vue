<template>
  <div class="login">
    <div class="title">登录</div>
    <el-form status-icon label-width="100px" :model="LoginFormlist" :rules="rules" ref="LoginForm" >
      <el-form-item label="账号" prop="user">
        <el-input autocomplete="off" v-model="LoginFormlist.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" autocomplete="off" v-model="LoginFormlist.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input type="code" autocomplete="off" v-model="LoginFormlist.code"></el-input>
        <p v-html="servercodehtml"></p><span @click="getcode">刷新</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MD5 from 'js-md5';
  export default {
    data(){
      return{
        LoginFormlist: {
          user: '',
          password: '',
          code: '',
          key:''
        },
        serverkey: '',
        servercodehtml: '',
        rules: {
          user: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          code:[
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
      }
    },

    methods: {
      submitForm() {
        this.$refs.LoginForm.validate((valid) => {
          if (valid) {
            let postdata={
              user:this.LoginFormlist.user,
              password:MD5(this.LoginFormlist.password),
              code:this.LoginFormlist.code,
              key:this.serverkey,
            };
            this.$Axios.post('/yun/blog/login',postdata).then(res=>{
              if(res.code===200){
                this.$message.success('登陆成功');
                this.$router.replace({path: '/admin'});
                let token = res.data.token;
                this.$Axios.setAuthorization(token);
                window.sessionStorage.setItem('token', token);
              }
              else{
                this.$message.error(res.message);
              }
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getcode(){
        this.$Axios.get('/yun/verification/code').then(res=>{
          if(res.code===200){
            this.serverkey=res.data.key;
            this.servercodehtml=res.data.svg;
          }
          else{
            this.$message.error(res.message);
          }
        });
      }
    },
    created(){
      this.getcode();
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/less/theme.less";

  .login {
    width: 300px;
    margin: 300px auto;
    .title {
      color: #666666;
      font-size: 18px;
      font-weight: bold;
      margin: 30px 0 30px 100px;
      width: 200px;
      text-align: center;
    }
    button {
      width: 200px;
    }
  }
</style>
