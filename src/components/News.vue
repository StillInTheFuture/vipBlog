<template>
  <div class="news">

    <!-- 二级标题开始 -->
    <div class="title_bg">
      <div class="title_box">
        <p class="p_left">新闻动态</p>
        <div class="title_arrow"></div>
        <p class="p_right"><span>首页</span> / 新闻动态</p>
      </div>
    </div>
    <!-- 二级标题结束 -->

    <div class="list_page">
      <router-view  v-if="isRouterAlive"></router-view>

      <!--热门动态-->
      <div class="hot">
        <p>热门动态</p>
        <ul>
          <li v-for="(hotnews,index) in hotNewsList" :key="index">
            <router-link :to="'/newsDetail/'+hotnews.id" @click.native="refresh">{{hotnews.title}}</router-link>
            <span class="data">{{hotnews.ctime}}</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'news',

    provide(){
      return{
        reload:this.reload
      }
    },


    data(){
      return{
        hotNewsList:[],
        isRouterAlive:true,
      }
    },
    created(){
      this.$http.get('/api/news/hot/').then(function(response){
        if(response.status==200){
          this.hotNewsList =  response.body.data;
        }
      });
    },
    methods:{
      refresh(){
       this.reload();
      },
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true
        });
      },


    }
  }
</script>

<style scoped>


</style>
