<template>
  <div class="personal-info">


    <div class="right_content_theme">个人资料</div>

    <!-- 头像 -->
    <div class="right_content_head info_pic">
       <el-upload
            class="avatar-uploader"
            :action="services+coverImgUrl"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="mask" v-if="isReadOnly"></div>
    </div>
    <!-- 头像结束 -->

    <!-- 个人信息 -->
    <ul class="right_content_info">

      <li>&nbsp;&nbsp;&nbsp;&nbsp;用户名:
        <input type="text" v-model="userInfo.username" readonly/>
      </li>
      <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;昵称:
        <input type="text" v-model="userInfo.nickname" :readonly="isReadOnly" :class="{inputBorder:!isReadOnly}"/>
      </li>
      <li>真实姓名:
        <input type="text" v-model="userInfo.realname" :readonly="isReadOnly" :class="{inputBorder:!isReadOnly}"/>
      </li>
      <li>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;性别:
        <el-radio v-model="userInfo.gender" label="1" :disabled="isReadOnly">男</el-radio>
        <el-radio v-model="userInfo.gender" label="2" :disabled="isReadOnly">女</el-radio>
      </li>
      <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出生:
         <el-date-picker v-model="userInfo.birth" type="date" placeholder="选择日期"   format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd" :readonly="isReadOnly"></el-date-picker>
      </li>
      <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电话:
        <input type="text" v-model="userInfo.tel" :readonly="isReadOnly" :class="{inputBorder:!isReadOnly}"/>
      </li>
      <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱:
        <input type="text" v-model="userInfo.email" :readonly="isReadOnly" :class="{inputBorder:!isReadOnly}"/>
        <span class="enail_status">({{email_status}})</span>
        <!-- <input type="button" value="去绑定" @click="goBind" /> -->
        <button  @click="goBind" v-if="isBind">去绑定</button>
      </li>
      <li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简介:</span>
        <textarea :class="{brief_word:true,inputBorder:!isReadOnly}" v-model="userInfo.introduction" :readonly="isReadOnly" ></textarea>
      </li>
      <p :class="{modify:true,displayN:!isReadOnly}" @click="changeInfo">修改资料</p>
      <button :class="{submit:true,displayN:isReadOnly}" @click="submitInfo">提交</button>
    </ul>
    <!-- 个人信息结束 -->


  </div>
</template>

<script>
  import Global from '../Global'
  export default {
    name: 'personal-info',
    data() {
      return {
        services:Global.services,
        token:'',
        userInfo:{
          avatar: '',
          birth: '',
          email: '',
          email_status: '',
          gender: '',
          introduction: '',
          nickname: '',
          realname: '',
          tel: '',
        },
        email_status:'',
        isReadOnly:true,
        imageUrl: '',
        coverImgUrl:'/util/uploadImg/',
        isBind:true
      }
    },
    created(){
      this.token = this.$cookies.get('token');
      this.$http.get(this.services+'/profile/info/',
        {
          'headers': {
            Authorization:this.token
          }
        }).then(function(response){
          if(response.status==200){
            this.userInfo = response.body.data[0];
            if(this.userInfo.gender=='男'){
              this.userInfo.gender='1'
            }else if(this.userInfo.gender=='女'){
              this.userInfo.gender='2'
            }
            this.imageUrl = this.services + this.userInfo.avatar;
            this.userInfo.avatar = this.userInfo.avatar.replace("/media/","");
            this.email_status = this.userInfo.email_status;
            if(this.email_status!='未绑定'){
              this.isBind=false
            }
            // console.log(this.userInfo.avatar)
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
      changeInfo(){
        this.isReadOnly = false;
        this.isBind=false
      },
       //修改头像
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false
        }  
        //上传
        let formData = new FormData();
        formData.append("img", file);
        this.$http.post(this.services+this.coverImgUrl,formData,
        ).then(function(response){
          // console.log(response)
          if(response.status==200){
            this.$message.success(response.body.msg);
            this.imageUrl = this.services+response.body.data.path;
            this.userInfo.avatar = response.body.data.img;
            // console.log(this.imageUrl);
            // console.log(this.userInfo.avatar)
            // console.log(response.body.data.img)
          }else{
            this.$message.error(response.body.msg);
          }
        })      
      },
      submitInfo(){
        var re=/^\w+@[a-z0-9]+\.[a-z]+$/i;
        if(this.userInfo.nickname==null||this.userInfo.nickname==""){
          this.$message.warning('昵称不为空');
          return;
        }
        if(this.userInfo.realname==null||this.userInfo.realname==""){
          this.$message.warning('请输入真实姓名');
          return;
        }
        if(this.userInfo.gender==null||this.userInfo.gender==""){
          this.$message.warning('请选择性别');
          return;
        }
        if(this.userInfo.birth==null||this.userInfo.birth==""){
          this.$message.warning('请选择出生日期');
          return;
        }
        if(this.userInfo.tel==null||this.userInfo.tel==""){
          this.$message.warning('手机号码不为空');
          return;
        }else if(!(/^1[3456789]\d{9}$/.test(this.userInfo.tel))){
          this.$message.warning('请输入正确的手机号码');
          return;
        }
        if(this.userInfo.email==null||this.userInfo.email==""){
          this.$message.warning('请输入邮箱');
          return;
        }else if(!re.test(this.userInfo.email)){
          this.$message.warning('请输入合法邮箱');
          return;
        }
        if(this.userInfo.introduction==null||this.userInfo.introduction==""){
          this.$message.warning('请输入个人介绍');
          return;
        }

        this.userInfo.email_status = 0;
        // console.log(this.userInfo.avatar)
        this.isBind=true
        this.$http.post(
          this.services+'/profile/info/',this.userInfo,
          {
            'headers': {
              'Content-Type': 'application/json',
              'Authorization':this.token
            },
          }
        ).then(function(response){
          // console.log(response)
          if(response.status==200){
            this.$message.success(response.body.msg);
            this.isReadOnly = true;
            this.$router.go(0)
          }

        })

      },
      goBind(){
        this.$http.get(this.services+'/sendemail/',
        {
          'headers': {
            Authorization:this.token
          }
        }).then(function(response){
          console.log(response)
          if(response.status==200){
            this.$message.success(response.body.msg)
          }else if(response.status==201){
            this.$message.warning(response.body.msg);
            let that = this;
            setTimeout(function () {
              that.$router.push('/login')
            },3000);
          }
        })
      }


    }
  
  }
</script>
<style scoped>
  @import "../../static/style/personal/personal.css";
  .brief_word{
    resize: none;
  }
  .inputBorder{
    border:1px solid #999!important;
  }
  .displayN{
    display: none;
  }
  .right_content_info{
    padding-bottom: 40px;
  }
  .submit{
    position: absolute;
    bottom: 0;
    right:50%;
    width: 80px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    background-color: #051827;
    border-radius: 5px;
    border:none;
    outline: none;
  }
  .info_pic{  
    margin:20px 20px 0 40px!important;
    width: 95px!important;
    height: 95px!important;
    background:#eee;
    position: relative;
  }
  .mask{
    position: absolute;
    top:0;
    left: 0;
    width: 95px;
    height: 95px;
    z-index: 9;
  }
  .avatar-uploader-icon{
    display:block!important;
    width: 95px!important;
    height: 95px!important;
    line-height: 95px!important;
  }
  .avatar{
    width: 95px;
    height: 95px;
  }
  .enail_status{
    float: none!important;
    font-size: 12px;
    color:#f00;
    line-height: 30px;
  }
  .brief_word{
    border: none;
  }
  .enail_status + button{
    width: 60px;
    height: 30px;
    background-color: #051827;
    color: #ffffff;
    border: none;
    border-radius: 4px;
  }
</style>

