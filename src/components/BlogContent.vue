<template>
  <div class="blog-content">

    <div class="index_page">

      <!-- 轮播 -->
      <div class="play">
        <div class="play_main" id="play_main">
          <ul class="play_photo">
            <li class="play_photo_item" v-for="(bannerImg,index) in bannerImgs" :key="index">
              <img :src="bannerImg.img" />
            </li>
          </ul>
        </div>
      </div>
      <!-- 轮播结束 -->

      <!-- 新闻中心 -->
      <div class="new">
        <div class="center">
          <div class="new_title">新闻中心</div>
          <ul class="new_main">
            <li class="new_item" v-for="(news,index) in newsLists" :key="index">
              <img :src="news.cover" alt="" class="new_item_photo" />
              <div class="new_item_info">{{news.type_name}} | {{news.title}}</div>
              <div class="new_item_details">
                <router-link :to="'/newsDetail/'+news.id">了解详情</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 新闻中心结束 -->

      <!-- 编程学习 -->
      <div class="programming">
        <div class="center">
          <div class="programming_title">编程学习</div>
          <!--博客类型-->
          <ul class="programming_label">
            <li class="programming_label_item" @click="changeTab($event)" v-for="(type,index) in blogType" :key="index" :data-id="type.id">
              <a href="javascript:">{{type.name}}</a>
            </li>
          </ul>
          <div class="programming_content">
            <!-- 博客列表轮播 -->
              <swiper :options="swiperOption">
                <swiper-slide  v-for='(blog,index) of thisBlogList' :key="index">
                  <img :src="blog.cover" />
                  <div>
                    <div>{{blog.title}}</div>
                    <router-link :to="'/blogDetail/'+blog.id">了解详情</router-link>
                  </div>
                </swiper-slide>
              </swiper>
              
          </div>
        </div>
      </div>
      <!-- 编程学习结束 -->

      <!-- 资源 -->
      <div class="resources">
        <div class="center">
          <div class="resources_title">资源</div>
          <div class="resources_main">
            <div class="resources_left">
              <div class="resources_content_title">
                <div class="resources_content_name">
                 {{resource[0].name}}
                </div>
                <router-link :to="'/resource/'+resource[0].id" class="resources_content_more">more+</router-link>
              </div>
              <ul class="resources_content_list">
                <li class="resources_content_item" v-for="(list,index) in resource[0].list" :key="index">
                  <div class="resources_content_spot"></div>
                  <a href="javascript:" @click ="jump(list.file)" class="resources_content_info">{{list.title}}</a>
                </li>
              </ul>
            </div>
            <div class="resources_right">
              <div class="resources_content_title">
                <div class="resources_content_name">{{resource[1].name}}</div>
                <router-link :to="'/resource/'+resource[1].id" class="resources_content_more">more+</router-link>
              </div>
              <ul class="resources_content_list">
                <li class="resources_content_item" v-for="(list,index) in resource[1].list" :key="index">
                  <div class="resources_content_spot"></div>
                  <a href="javascript:" @click ="jump(list.file)" class="resources_content_info">{{list.title}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 资源结束 -->
    </div>

  </div>
</template>


<script>
  import '../../static/js/index/ft-carousel.min.js'
  import Global from '../Global'
  export default {
    name: 'blog-content',
    data:function () {
      return{
        services:Global.services,
        token:this.$cookies.get('token'),
        bannerImgs:[],
        newsLists:[],
        blogType:[],
        thisBlogList:[],
        test:null,
        resource:[
          {
            name:'',
            id:null,
            list:[]
          },
          {
            name:'',
            id:null,
            list:[]
          }
        ],
        //博客列表轮播
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          autoplay:1500
        }
      }
    },
    created(){

      //轮播
      this.$http.get('/api/carousel').then(function(response){
        if(response.status==200){
          this.bannerImgs = response.body.data;
        }
      }).then(function(){
        $("#play_main").FtCarousel();
      });

      //新闻
      this.$http.get('/api/news/list').then(function(response){
        if(response.status==200){
          this.newsLists = response.body.data.slice(0,4)
        }
      });
     
      //博客类型
      this.$http.get('/api/blog/type/').then(function(response){
        if(response.status==200){
          this.blogType = response.body.data.slice(0,6)
        }
      });

      //博客列表
      this.$http.get('/api/blog/list').then(function(response){
        if(response.status==200){
          this.thisBlogList = response.body.data;
        }
      })

      //资源
      this.$http.get('/api/resources/type/').then(function(response){
        if(response.status==200){
          var data;
          data = response.body.data.slice(0,2);
          this.resource[0].id = data[0].id;
          this.resource[0].name = data[0].name;
          this.resource[1].id = data[1].id;
          this.resource[1].name = data[1].name;
        }
      })
      .then(function(){
        //资源分类1
        this.$http.get('/api/resources/list/?type='+this.resource[0].id)
        .then(
          function(response){
            // console.log(response)
            this.resource[0].list = response.body.data;
          }
        ),
        //资源分类2
        this.$http.get('/api/resources/list/?type='+this.resource[1].id)
        .then(
          function(response){
            this.resource[1].list = response.body.data;
          }
        )
      });
    },
    methods:{
      changeTab:function (e) {
        var _this = e.currentTarget;
        $(_this).addClass('selected').siblings('li').removeClass('selected');
        var typeId = e.currentTarget.dataset.id;
        this.$http.get('/api/blog/list?type='+typeId).then(function(response){
          if(response.status==200){
            this.thisBlogList = response.body.data;
          }
        })
      },
      jump(a){
        console.log(a);
        if(!this.token){
          this.$message.warning('请先登录');
          let that = this;
          setTimeout(function () {
            that.$router.push('/login')
          },3000)
        }else{
          window.location.href = this.services+a;
        }
      }
    }
  }
</script>


<style scoped>
  .programming_label_item a{
    display: block;
  }
  /* 博客轮播 */
  .swiper-inner {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 330px;
    height: 335px;
    background-color: #ffffff;
  }
  .swiper-slide >img{
    width:100%;
    height:222px;
  }
  .swiper-slide >div >div{
    width: 270px;
    font-size: 18px;
    text-align: center;
    margin: 20px auto 18px auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .swiper-slide >div >a{
    display: block;
    margin: 0 auto;
    width: 100px;
    height: 31px;
    font-size: 16px;
    color: #ffffff;
    background-color: #0364c5;
    text-align: center;
    line-height: 31px;
  }

</style>
