<template>
  <div class="blog-list">
    <ul class="list_left">
      <li v-for="(list,index) in lists" :key="index">
        <router-link :to="'/BlogDetail/'+list.id">
          <img :src="list.cover">
          <span class="article_title">{{list.type_name}} | {{list.title}}</span>
          <span class="date">{{list.ctime}}</span>
          <span class="author">作者：{{list.userinfo.nickname}}</span>
          <div class="article_description" v-html="list.content"></div>
          <div class="like">
            <img src="../../static/images/index/nolike.png" alt="">
            <span class="num">{{list.goods}}</span>
           </div>
          <div class="glance">
           <img src="../../static/images/index/glance.png" alt="">
           <span class="num">{{list.view}}</span>
          </div>
          <div class="collect">
            <img src="../../static/images/index/nocollect.png" alt="">
            <span class="num">{{list.collections}}</span>
          </div>
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
    name: 'blog-list',
    data(){
      return{
        services:Global.services,
        lists:[],
        count:null,
        previous:'',
        next:''
      }
    },
    created(){
      this.$http.get('/api/blog/list/').then(function(response){
        if(response.status==200){
          console.log(response)
          this.lists = response.body.data;
          this.count = response.body.count;
          this.previous = response.body.previous;
          this.next = response.body.next;
        }
      })
    },
    methods: {
      handleCurrentChange(val) {
        console.log(val);
        let offset = (val-1)*10;
        this.$http.get(this.services+'/api/blog/list/?limit=10&offset='+offset).then(function(response){
          if(response.status=="200"){
            this.lists = response.body.data;
          }
        })
      }
		},
   
  }
</script>

<style scoped>
  .blog-list{
    width: 795px;
    float: left;
  }
  .list_left li img{
    width:315px;
    height:178px;
  }
  .paging{
    float: right;
    padding-top:20px;
    clear: both
  }
</style>
