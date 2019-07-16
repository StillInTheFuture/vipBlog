<template>
  <div class="personal-coll">
    <div class="right_content_theme">我的收藏</div>
    <ul class="right_content_info right_content_info_two">
      <li v-for="(item,index) in blogLists" :key="index">
        <router-link :to="'/BlogDetail/'+item.id"  class="collection_title">{{item.blog_type_name}} | {{item.blog_title}}</router-link>
        <span class="collection_cancel" :data-id="item.id" @click="cancelColl($event)">取消</span>
        <span class="collection_time">{{item.ctime}}</span>
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
    name: 'personal-coll',
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
      this.$http.get(this.services+'/profile/collections/',
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
      cancelColl(event){
        var id = event.currentTarget.getAttribute('data-id');
        console.log(id)
        this.$http.delete(this.services+'/profile/collections/?id='+id,
        {
          'headers': {
            Authorization:this.token
          }
        }).then(function(response){
          if(response.status==200){
            this.$message.success(response.body.msg);
            this.reload();
          }
        })
      },
      handleCurrentChange(val) {
        console.log(val);
        let offset = (val-1)*10;
        this.$http.get(this.services+'/profile/collections/?limit=10&offset='+offset,{
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
    margin: 0 auto!important;
    float: none!important;
  }
  .right_content_info li{
    width: 99%;
    height: 20px;
    padding: 20px 1%;
    border-bottom: 1px solid #dddddd;
  }
  .right_content_info li .collection_title{
    display: block;
    float: left;
    text-decoration: none;
    width: 60%;
    height: 20px;
    line-height: 20px;
    font-size: 17px;
    color: #454545;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 1.5px;
  }
  .right_content_info li .collection_cancel{
    float: right!important;
    margin-left: 20px;
    margin-right: 8px;
    font-size: 16px;
    line-height: 20px;
    color: red;
    cursor: pointer;
  }
  .right_content_info li .collection_time{
    float: right!important;
    font-size: 16px;
    line-height: 20px;
    color: #999999;
  }
  .collection_time{
    font-size: 12px!important;
  }
  .paging{
    float: right;
    margin-right:30px;
    padding: 20px 0;
  }
</style>
