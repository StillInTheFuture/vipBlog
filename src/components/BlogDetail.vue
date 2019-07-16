<template>
  <div>
    <div class="detail">
      <span class="title">{{blog.type_name}} | {{blog.title}}</span>
      <p class="time">{{blog.ctime}}</p>
      <span class="author">作者：{{blog.userinfo.nickname}}</span>
      <div class="line"></div>
      <div class="pic">
        <img :src="blog.cover"/>
      </div>
      <div class="text" v-html="blog.content">
      </div>

      <!-- 点赞 -->
      <div :class="{like:true, liked:isLiked}" @click="liked">
        <span class="num">{{blog.goods}}</span>
      </div>
      <div class="glance">
        <img src="../../static/images/index/glance.png" alt="">
        <span class="num">{{blog.view}}</span>
      </div>
      <!-- 收藏 -->
      <div :class="{collect:true, collected:isCollected}" @click="collected">
        <span class="num">{{blog.collections}}</span>
      </div>

          
    </div>
  </div>

</template>

<script>
  import Global from '../Global'
  export default {
    name: 'blog-detail',
    data(){
      return{
        services:Global.services,
        id:this.$route.params.id,
        blog:{
          userinfo:{
            nickname:''
          }
        },
        token:'',
        isLiked:false,
        isCollected:false,
      }
    },
    created(){
        this.$http.get('/api/blog/list?id='+this.id).then(function(response){
          if(response.status==200){
            this.blog = response.body.data[0];
          }
        })
        this.token = this.$cookies.get('token');

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
              this.$http.get('/api/blog/good/?blog='+this.id,
                {
                  'headers': {
                    Authorization:this.token
                  }
                }).then(function(response){
                  // console.log(response)
                  if(response.status==200){
                    this.$message.success(response.body.msg);
                    this.isLiked = true;
                    this.blog.goods = response.body.goods;
                    // this.reload();
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
      collected(){
        if(this.token){
         if(this.isCollected==true){
            this.$message.warning("你已收藏过");
            return false
          }else{
            this.$http.get('/api/blog/collection/?blog='+this.id,
              {
                'headers': {
                  Authorization:this.token
                }
              }).then(function(response){
                console.log(response)
                if(response.status==200){
                  this.$message.success(response.body.msg);
                  this.isCollected = true;
                  this.blog.collections = response.body.collections;
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
        this.$http.get('/api/blog/is_operation/?blog='+this.id,
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
                this.isLiked = false
              }else{
                this.isLiked = true
              }
              //收藏
              if(response.body.data.collection==0){
               this.isCollected = false
              }else{
                this.isCollected = true
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
.blogdetail{
  display: none;
}
.collect{
  background: url('./../../static/images/index/nocollect.png') no-repeat;
   background-size: auto 20px;
}
.collected{
   background: url('./../../static/images/index/becollect.png') no-repeat;
   background-size: auto 20px;
}
.pic{
  margin-top:70px;
}


</style>
