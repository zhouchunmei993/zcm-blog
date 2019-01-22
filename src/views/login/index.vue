<template>
  <div class="login">
    <div class="title">登录</div>
    <el-form status-icon label-width="100px">
      <el-form-item label="账号" prop="user">
        <el-input autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {

    methods: {
      submitForm() {
        this.$router.replace({path: '/admin'})
      },
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
