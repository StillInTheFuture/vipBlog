<template>
  <div class="newsdetail">
    <div class="detail">
      <span class="title">{{news.title}}</span>
      <p class="time">{{news.ctime}}</p>
      <span class="author">作者：{{news.userinfo.nickname}}</span>
      <div class="line"></div>
      <div class="pic">
        <img :src="news.cover"/>
      </div>
      <div class="text" v-html="news.content"></div>

      <div :class="{like:true, liked:isLiked}" @click="liked">
        <!-- <img src="../../static/images/index/nolike.png" alt=""> -->
        <span class="num">{{news.goods}}</span>
      </div>

      <div class="glance">
        <img src="../../static/images/index/glance.png" alt="">
        <span class="num">{{news.view}}</span>
      </div>

      <!-- 评论数 -->
      <!-- <div class="collect">
        <span class="num">{{news.comments}}</span>
      </div> -->

    </div>
  </div>

</template>

<script>
import Global from '../Global'
  export default {
    name: 'news-detail',
    data(){
      return{
        services:Global.services,
        id:this.$route.params.id,
        token:null,
        news:{
          userinfo:{
            nickname:''
          }
        },
        isLiked:false,
      }
    },
    created(){
      this.token = this.$cookies.get('token');

      this.$http.get('/api/news/list/?id='+this.id).then(function(response){
        if(response.status==200){
          this.news = response.body.data[0];
        }
      })

      if(this.token){
        this.operation();
      }

    },


    methods:{
      liked(){
        if(this.token){
         if(this.isLiked==true){
            this.$message.warning("你已点过赞");
            return false
          }else{
            this.$http.get('/api/news/good/?news='+this.id,
            {
              'headers': {
                Authorization:this.token
              }
            }).then(function(response){
              console.log(response)
              if(response.status==200){
                this.$message.success(response.body.msg);
                this.isLiked = true;
                this.news.goods = response.body.goods;
              }
            })
          }
        }else{
          this.$message.warning('请先登录')
          let that = this;
          setTimeout(function () {
            that.$router.push('/login')
          },3000)
        } 

      },
      operation(){
        // 判断用户是否有点赞过
        var that = this;
        this.$http.get('/api/news/is_operation/?news='+this.id,
          {
            'headers': {
              Authorization:this.token
            }
          }
          ).then(function(response){
            //没有登录
            if(response.status==201){
              if(response.body.status=="110"){
                this.$message.warning(response.body.msg);
                setTimeout(function () {
                  that.$router.push('/login')
                },3000)
              }
            }
            //登录
            else if(response.status==200){
              //0代表没有，1代表已点过赞
              if(response.body.data.good==0){
                this.isLiked = false;
              }else{
                this.isLiked = true;
              }
            }
        })

      }
    }

  }
</script>

<style scoped>
.like{
  background: url('./../../static/images/index/nolike.png') no-repeat;
  background-size: auto 20px;
  
}
.liked{
   background: url('./../../static/images/index/like.png') no-repeat;
    background-size: auto 20px;
}
.pic{
  margin-top:70px;
}

</style>
