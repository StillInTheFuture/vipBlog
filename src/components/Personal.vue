<template>
  <div class="personal">
    <div class="personal_page">
      <div class="center">

        <div class="title">
          <div class="title_rectangle"></div>
          <div class="title_line"></div>
          <div class="title_name">个人中心</div>
        </div>

        <!-- 左边菜单栏 -->
        <div class="left">
          <ul class="left_nav">
            <li class="left_nav">
              <router-link to="/personal" exact>个人资料</router-link>
            </li>
            <li class="left_nav">
              <router-link to="/personal/blog" exact>我的博客</router-link>
            </li>
            <li class="left_nav">
              <router-link to="/personal/coll" exact>我的收藏</router-link>
            </li>
          </ul>
        </div>
        <!-- 左边菜单栏结束 -->

        <div class="right">
          <div class="right_content">
            <router-view v-if="isRouterAlive"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'personal',
    provide(){
      return{
        reload:this.reload
      }
    },
    data() {
      return {
        isRouterAlive:true,
      }
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
  @import "../../static/style/personal/personal.css";
  .router-link-active{
    background-color: #051827;
    color: #ffffff!important;              
  }
</style>
