<template>
<div class="news_list">
  <ul class="list_left">
      <li v-for="(news,index) in newsLists" :key="index">
        <router-link :to="'/newsDetail/'+news.id">
          <img :src="news.cover">
          <span class="article_title">{{news.title}}</span>
          <span class="author">作者：{{news.userinfo.nickname}}</span>
          <span class="date">{{news.ctime}}</span>
          <div class="article_description" v-html="news.content"></div>
          <div class="like">
            <img src="../../static/images/index/nolike.png" alt="">
            <span class="num">{{news.goods}}</span>
          </div>
          <div class="glance">
             <img src="../../static/images/index/glance.png" alt="">
             <span class="num">{{news.view}}</span>
          </div>
          <!-- 评论 -->
          <!-- <div class="like">
            <span class="num">{{news.comments}}</span>
          </div> -->
        </router-link>
      </li>
  </ul>
  <div class="paging">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="total,prev, pager, next"
        :total="count">
      </el-pagination>
	</div>
</div>
</template>

<script>
  import Global from '../Global'
  export default {
    name: 'list_left',
    data(){
      return{
        services:Global.services,
        newsLists:[],
        count:null,
        previous:'',
        next:''
      }
    },
    created(){
      this.$http.get('/api/news/list').then(function(response){
        if(response.status==200){
          this.newsLists = response.body.data;
          this.count = response.body.count;
          this.previous = response.body.previous;
          this.next = response.body.next;
        }
      });
    },
    methods: {
      handleCurrentChange(val) {
        console.log(val);
        let offset = (val-1)*10;
        this.$http.get(this.services+'/api/news/list/?limit=10&offset='+offset).then(function(response){
          if(response.status=="200"){
            this.newsLists = response.body.data;
          }
        })
      }
		},
  }
</script>

<style scoped>
  .list_left li img{
    width:315px;
    height:178px;
  }
  .list_page .list_left{
    min-height:0;
  }
  .paging{
    float: right;
    padding-top:20px;
    clear: both
  }
  .news_list{
    width: 795px;
    float:left;
  }

</style>
