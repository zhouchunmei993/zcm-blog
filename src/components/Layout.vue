<template>
  <div>
    <app-header/>
    <div class="app_content">
      <div class="app_menu">
        <app-menu/>
      </div>
      <div class="app_center">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from './Header';
  import AppMenu from './Menu';

  export default {
    components: {
      AppHeader,
      AppMenu,
    },
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/less/theme.less";
  .app_content {
    display: flex;
    height: calc(100vh - 60px);
    .app_menu {
      height: 100%;
      width: 252px;
      background-color: #ffffff;
      /deep/ .el-menu {
        height: 100%;
      }
    }
    .app_center {
      width: 100%;
      height: 100%;
      flex: 1;
      padding: 20px;
      display: flex;
      flex-direction: column;
      overflow: auto;
      .app_crumbs {
        height: 34px;
        margin-bottom: 10px;
      }
    }
    .app_bar {
      height: 100%;
      width: 48px;
      background-color: rgba(102, 102, 102, 0.1);
    }
  }
</style>
