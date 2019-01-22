<template>
  <div>
      <button @click="log">{{title}}</button>


  </div>
</template>

<script>

  export default {
    props:{
      title:{
        type:String,
        default:'没有按钮名'
      },
      log:{
        type:Function,
        default:()=>{
          alert("没有点击事件");
        }
      }
    },
    data(){
      return{

      }
    },
  }
</script>

<style scoped lang="less"></style>
