<template>
  <div class="blog-header">
    <div class="header">
      <div class="logo">
        <img src="../../static/images/index/logo.png" />
      </div>
      <div class="navigation">
        <ul>
          <li><router-link to="/" exact>首页</router-link></li>
          <li><router-link to="/news" exact>新闻资讯</router-link></li>
          <li><router-link to="/blog" exact>编程学习</router-link></li>
          <li><router-link :to="'/resource/'+id" exact>资源下载</router-link></li>
        </ul>
      </div>

      <p :class="{login_register:true,isShow:!isShow}">
        <router-link to="/login">登录</router-link>
        |
        <router-link to="/register">注册</router-link>
      </p>

      <div :class="{person_box:true,isShow:isShow}" id="person_box">
        <img :src="infoPic" alt="" class="person_head">
        <div class="option-box">
          <div class="person_info" style="display: block;">
            <div class="person_arrow"></div>
            <ul class="person_list">
              <li>
                <div class="person_item">
                  <img src="../../static/images/index/person_img_01.png" alt="" class="">
                  <router-link to="/personal">个人中心</router-link>
                </div>
              </li>
              <li>
                <div class="person_item">
                  <img src="../../static/images/index/person_img_02.png" alt="">
                  <router-link to="/writeBlog">写博客</router-link>

                </div>
              </li>
              <li>
                <div class="person_item">
                  <img src="../../static/images/index/person_img_03.png" alt="">
                  <a href="javascript:" @click="logout">退出</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import Global from '../Global'
  export default {
    name: 'blog-header',
    data(){
      return{
        services:Global.services,
        id:'all',
        token:'',
        isShow:false,
        infoPic:'../../static/images/index/head.jpg'
      }
    },
    created(){
      this.token = this.$cookies.get('token');
      if(this.token){
        this.isShow = true
      }

      //头像
      this.$http.get(this.services+'/profile/info/',{
        'headers': {
          Authorization:this.token
        }
      }).then(function(response){
          // console.log(response)
          if(response.status=="200"){
            var imgUrl = this.services+response.body.data[0].avatar;
            if(imgUrl==this.services+'/media/'){
              return false
            }else{
              this.infoPic = imgUrl
            }
          }
      })


    },
    methods:{
      logout(){
        this.$cookies.remove('token');
        let that = this;
        setTimeout(function () {
          that.$router.push('/login')
        },1000);
      }
    }
  }
</script>

<style scoped>
  .navigation ul li{
    padding:0;
    width: 125px;
    text-align: center;
  }
  .navigation ul li:first-child{
    width:90px;
  }
  .navigation ul li a{
    display: block;
  }
  .navigation .router-link-active{
    background:#2bb9ba;
  }

  .person_box{
    display: none
  }
  .isShow{
    display:block
  }
</style>
