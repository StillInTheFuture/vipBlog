<template>
  <div class="blog-list">
    <div class="news">

      <!-- 二级标题开始 -->
      <div class="title_bg">
        <div class="title_box">
          <p class="p_left">编程学习</p>
          <div class="title_arrow"></div>
          <p class="p_right"><span>首页</span> / 编程学习</p>
        </div>
      </div>
      <!-- 二级标题结束 -->

      <div class="list_page">
        <router-view  v-if="isRouterAlive"></router-view>

        <!--热门动态-->
        <div class="hot">
          <p>热门博客</p>
          <ul>
            <li v-for="(item,index) in hotBlog" :key="index">
               <router-link :to="'/BlogDetail/'+item.id" @click.native="refresh">{{item.title}}</router-link>
            <span class="data">{{item.ctime}}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'blog-list',
     provide(){
      return{
        reload:this.reload
      }
    },
    data(){
      return{
        hotBlog:[],
        isRouterAlive:true,
      }
    },
    created(){
      this.$http.get('/api/blog/hot/').then(function(response){
        if(response.status==200){
          this.hotBlog =  response.body.data;
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
