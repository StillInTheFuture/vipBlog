<template>
  <div class="resource-download">

    <!-- 二级标题开始 -->
    <div class="title_bg">
      <div class="title_box">
        <p class="p_left">资源下载</p>
        <div class="title_arrow"></div>
        <p class="p_right"><span>首页</span> / 资源下载</p>
      </div>
    </div>
    <!-- 二级标题结束 -->

    <div class="list_page">

      <div class="download">

        <div class="down_content" v-for="(resource,index) in resourceList" :key="index">
          <img :src="resource.cover" >
          <span class="title">{{resource.title}}</span>
          <span class="download"> 分类：{{resource.type_name}}</span>
          <span class="browse">时间：{{resource.ctime}}</span>
          <span class="author">提供者：{{resource.userinfo.nickname}}</span>
          <!-- <span class="time">时间：{{resource.ctime}}</span> -->
          <div class="data_down" @click="isLogin">
            <a :href="resource.file">
              <img src="../../static/images/index/download_02.png" alt="">
              <span class="text">资源下载</span>
            </a>
            <!-- 遮罩 -->
            <div class="mask" v-if="isMask"></div>
          </div>
        </div>

      </div>
      <div class="paging">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="total,prev, pager, next"
          :total="count">
        </el-pagination>
      </div>


      <div class="hot">
        <p>热门下载</p>
        <ul>
          <!-- services+item.file -->
          <li v-for="(item,index) in hotResource" :key="index">
            <a href="javascript:" @click ="jump(item.file)" >{{item.title}}</a>
            <span class="data">{{item.ctime}}</span>
          </li>
        </ul>
      </div>


    </div>
  </div>

</template>

<script>
 import Global from '../Global'
  export default {
    name: 'resource-download',
    data(){
      return{
        id:this.$route.params.id,
        services:Global.services,
        resourceList:[],
        hotResource:[],
        listUrl:'',
        token:this.$cookies.get('token'),
        isMask: true,
        count:null,
        previous:'',
        next:''

      }
    },
    created(){

      if(this.id=='all'){
        this.listUrl = '/api/resources/list'
      }else{
        this.listUrl = '/api/resources/list?type='+this.id
      }

      this.$http.get(this.listUrl).then(function(response){
        if(response.status==200){
          this.resourceList = response.body.data;
          this.count = response.body.count;
          this.previous = response.body.previous;
          this.next = response.body.next;

        }
      })

      this.$http.get('/api/resources/hot/').then(function(response){
        console.log(response)
        if(response.status==200){
          this.hotResource = response.body.data;
        }
      })
      //判断是否登录（资源）
      // {
      //   if(!this.token){
      //   // this.isMask = true;
      //   this.$message.warning('请先登录');
      //   let that = this;
      //   // setTimeout(function () {
      //   //   that.$router.push('/login')
      //   // },3000)
      //   }else{
      //     this.isMask = false
      //   }
      // }

    },
    methods: {
      handleCurrentChange(val) {
        let offset = (val-1)*10;
        this.$http.get(this.services+'/api/resources/list/?limit=10&offset='+offset).then(function(response){
          if(response.status=="200"){
            this.resourceList = response.body.data;
          }
        })
      },
      isLogin(){
        if(!this.token){
          this.isMask = true;
          this.$message.warning('请先登录');
          let that = this;
          setTimeout(function () {
            that.$router.push('/login')
          },3000)
        }else{
          this.isMask = false
        }
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
		},
  }
</script>

<style scoped>
  .down_content{
    margin-bottom:20px;
    position: relative;
  }
  .data_down{
    position: relative;
  }
  .data_down .mask{
    position: absolute;
    width: 120px;
    height: 50px;
    z-index: 99;
  }
  .paging{
    width: 795px;
    float: left;
  }
  .paging .el-pagination{
    float: right;
  }
  .hot{
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
