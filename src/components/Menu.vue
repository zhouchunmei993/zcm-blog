<template>
  <div class="menu_cont">
    <el-menu
        router
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        :default-active="actives"
        :default-openeds="openeds">
      <el-submenu :key="i" :index="i" v-for="(item, i) in menu" v-if="item.meta && item.meta.isShow && item.children">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{item.meta && item.meta.title}}</span>
        </template>
        <el-menu-item
            :key="index"
            :route="{name: it.name}"
            :index="`${i}-${index}`"
            v-for="(it, index) in item.children"
            v-if="it.meta && it.meta.isShow">
          {{it.meta && it.meta.title}}
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else index="0-0" :route="{name: item.name}">
        <i :class="item.meta.icon"></i>
        <span>{{item.meta && item.meta.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import router from '../router'

  export default {
    data() {
      return {
        menu: router.options.routes[1].children,
        openeds: [],
        actives: '0-0',
      }
    },
    methods: {
      handleOpen(e) {
        this.openeds = [...this.openeds, e];
      },
      handleSelect(e) {
        this.actives = e;
      },
      handleClose(e) {
        this.openeds = this.openeds.filter(item => item !== e);
      },
    },
  }
</script>

<style lang="less" scoped>
  @import "./less/menu.less";
</style>
