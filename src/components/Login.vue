<template>
  <div class="login">

    <dl class="admin_login">
      <dt>
        <img src="../../static/images/index/logo_04.png">
      </dt>
      <dt style="margin-top:-80px;">
        <strong>博客登录平台</strong>
      </dt>
      <dd class="user_icon" >
        <input type="text" placeholder="账号" class="login_txtbx" v-model="username" required/>
      </dd>
      <dd class="pwd_icon">
        <input type="password" placeholder="密码" class="login_txtbx" v-model="psw" required/>
      </dd>
      <dd class="val_icon">
        <div class="checkcode">
          <input type="text" id="J_codetext" placeholder="验证码" maxlength="4" class="login_txtbx" v-model="code" required>
          <img :src="codeImg" alt="" class="img" @click="getCode">
        </div>
      </dd>
      <dd>
        <input type="button" value="登陆" class="submit_btn" @click="Login"/>
      </dd>
      <dd>
        <!-- <span style="float:left;"><router-link to="/reset">忘记密码？</router-link></span> -->
        <span>还没有账号？<router-link to="/register">立即注册</router-link></span>
      </dd>
    </dl>

  </div>
</template>

<script>
  import '../../static/js/index/Particleground.js'
  import Global from '../Global'
  export default {
    name: 'login',
    data(){
      return{
        services:Global.services,
        hashkey:'',
        codeImg:'',
        username:'',
        psw:'',
        code:'',
      }
    },
    methods:{
      getCode:function () {
        var that = this;
        this.$http.get(that.services+'/refresh_captcha/').then(function(response){
          that.hashkey = response.data.data.hashkey;
          that.codeImg = that.services+response.data.data.image_url;
        });
      },
      Login:function () {
        if(this.username==null||this.username==""){
            this.$message.warning('请输入用户名');
            return;
        }else if(this.username.length<6){
            this.$message.warning('请输入不少于6位数的用户名');
            return;
        }
        if(this.psw==null||this.psw==""){
            this.$message.warning('请输入密码');
            return;
        }else if(this.psw.length<6){
            this.$message.warning('请输入不少于6位数的密码');
            return;
        }
        if(this.code==null||this.code==""){
            this.$message.warning('请输入验证码');
            return;
        }
        var that=this;
        this.$http.post(
          that.services+'/login/',
          {
            'username':that.username,
            'passwd':that.psw,
            'captcha':that.code,
            'captchaHashkey':that.hashkey,
          },
          {
            'emulateJSON':true,
            'headers': {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        ).then(function(response){
          var that = this;
          console.log(response)
          if(response.body.status==200){
            that.$message.success('登录成功');
            this.$cookies.set('token',response.body.token) 
            setTimeout(function () {
              that.$router.push('/')
            },3000);
          }else{
            that.$message.error(response.body.msg);
          }
        });
      }
    },
    created(){
     this.getCode();
    },
    mounted(){
      //粒子背景特效
      $('.login').particleground({
        dotColor: '#28a3cb',
        lineColor: '#28a3cb'
      });
    },
  }
</script>

<style scoped>
  @import "../../static/style/index/login_register.css";
  .login{
    box-sizing: border-box;
    padding-top:1px;
    height:100vh;
  }
</style>
