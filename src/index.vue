<template>
  <div>
    index


    <box :title="title" :log="getlog"></box>
    <box></box>



  </div>
</template>

<script>
  import box from './components/box'
  export default {
    components:{
      box
    },
    data(){
      return{
        title:'我的按钮'
      }
    },
    methods:{
      getlog(){
        alert("log");
      }
    },
    created(){
      this.$Tool.aaa();
    }
  }
</script>

<style scoped lang="less"></style>
