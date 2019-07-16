<template>
 <div class="personal-blog">

   <div class="right_content_theme">我的博客</div>
   <ul class="right_content_info right_content_info_one">
      <li v-for="(item,index) in blogLists" :key="index">
        <!-- <a href="javascript:;"></a> -->
        <router-link :to="'/BlogDetail/'+item.id"  class="article_title">{{item.type_name}} | {{item.title}}</router-link>
        <span class="article_time">{{item.ctime}}</span>
        <span class="article_read">
          <img src="../../static/images/personal/read.png" alt=""><span class="read_number">{{item.view}}</span>
        </span>
        <span class="article_comment">
          <img src="../../static/images/index/nolike.png" alt=""><span class="comment_number">{{item.goods}}</span>
        </span>
        <div class="delete_blog" @click="deleteBlog($event)" :data-id="item.id"></div>
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
    name: 'personal-blog',
    inject:['reload'],
    data() {
      return {
        services:Global.services,
        token:'',
        blogLists:[],
        count:null,
        previous:'',
        next:''
      }
    },
    created(){
      this.token = this.$cookies.get('token');
      this.$http.get(this.services+'/profile/blog/',
        {
          'headers': {
            Authorization:this.token
          }
        }).then(function(response){
           console.log(response)
           if(response.status==200){
              this.blogLists = response.body.data;
              this.count = response.body.count;
              this.previous = response.body.previous;
              this.next = response.body.next;
           }else if(response.body.status=='110'){
            this.$message.warning(response.body.msg);
            var that = this;
            setTimeout(function () {
              that.$router.push('/login')
            },3000);  
           }
            
      })


    },
    methods:{
      deleteBlog(event){
        var id = event.currentTarget.getAttribute('data-id');
        this.$http.delete(this.services+'/profile/blog/?id='+id,
        {
          'headers': {
            Authorization:this.token
          }
        }).then(function(response){
          if(response.status==200){
            this.$message.success(response.body.msg)
            this.reload();
          }else if(response.body.status=='110'){
            this.$message.warning(response.body.msg);
            var that = this;
            setTimeout(function () {
              that.$router.push('/login')
            },3000);
          }
      })
      },
      handleCurrentChange(val) {
        console.log(val);
        let offset = (val-1)*10;
        this.$http.get(this.services+'/profile/blog/?limit=10&offset='+offset,{
          'headers': {
            Authorization:this.token
          }
        }).then(function(response){
          // console.log(response)
          if(response.status==200){
            this.blogLists = response.body.data;
          }else if(response.status==201){
            this.$message.warning(response.body.msg);
            let that = this;
            setTimeout(function () {
              that.$router.push('/login')
            },3000)
          }
        })
      }
    }
  }
</script>
<style scoped>
@import "../../static/style/personal/personal.css";
.right_content_info{
  width: 96%!important;
  /* height: 880px!important; */
  margin: 0 auto!important;
  float:none!important;
}
.right_content_info li {
  width: 99%;
  height: 66px;
  padding-top: 20px;
  padding-left: 1%;
  border-bottom: 1px solid #dddddd;
  position: relative;
}
.right_content_info li .article_title {
  display: block;
  text-decoration: none;
  width: 80%;
  height: 20px;
  line-height: 20px;
  font-size: 17px;
  color: #454545;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 1.5px;
}
.right_content_info li .article_title:hover {
  color: #051827;
}
.right_content_info li .article_time {
  display: block;
  float: left;
  margin-top: 10px;
  font-size: 12px;
  color: #999999;
}
.right_content_info li .article_read img {
  display: block;
  float: left;
  margin-top: 9px;
  margin-left: 20px;
  width: 18px;
  height: 17px;
}
.right_content_info li .article_read .read_number {
  display: block;
  float: left;
  margin-top: 10px;
  margin-left: 4px;
  font-size: 12px;
  color: #999999;
}
.right_content_info li .article_comment img {
  display: block;
  float: left;
  margin-top: 11px;
  margin-left: 20px;
  width: 18px;
  height: 17px;
}
.right_content_info li .article_comment .comment_number {
  display: block;
  float: left;
  margin-top: 10px;
  margin-left: 4px;
  font-size: 12px;
  color: #999999;
}
.delete_blog{
  position: absolute;
  right:10px;
  top: 20px;
  width: 20px;
  height: 20px;
  background: url(../../static/images/personal/delete.png) no-repeat;
  background-size: 20px;
  cursor: pointer;
}
.paging{
  margin:20px 30px 20px 0;
  float: right;
}
</style>
