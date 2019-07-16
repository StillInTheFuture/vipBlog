<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  @import '../static/style/index/index.css';
  canvas{z-index:-1;position:absolute;}
</style>
