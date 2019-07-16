<template>
  <div class="home">
    <blog-header></blog-header>
    <router-view></router-view>
   <blog-footer></blog-footer>
  </div>
</template>


<script>
  import BlogHeader from './BlogHeader'
  import BlogFooter from './BlogFooter'

  export default {
    name: 'home',
    components:{
      BlogHeader,BlogFooter
    },


  }
</script>


<style scoped>
</style>
