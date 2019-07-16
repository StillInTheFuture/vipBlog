<template>
  <div class="register">

    <dl class="admin_login">
      <dt>
        <img src="../../static/images/index/logo_04.png" alt="">
      </dt>
      <dt style="margin-top:-80px;">
        <strong>博客注册平台</strong>
      </dt>
      <dd class="ver_icon" >
        <input type="text" placeholder="邮箱账号" class="login_txtbx" v-model="email"/>
      </dd>
      <dd class="email_icon" >
        <input type="text" placeholder="动态验证码" class="login_txtbx" v-model="code"/>
        <img :src="codeImg" alt="" class="img" @click="getCode">
      </dd>
      <dd class="user_icon" >
        <input type="text" placeholder="用户名" class="login_txtbx" v-model="username"/>
      </dd>
      <dd class="pwd_icon">
        <input type="password" placeholder="密码" class="login_txtbx" v-model="psw"/>
      </dd>
      <dd class="pwd_icon">
        <input type="password" placeholder="确认密码" class="login_txtbx" v-model="psw1"/>
      </dd>
      <dd>
        <input type="button" value="注册" class="submit_btn" @click="register"/>
      </dd>
      <dd>
        <span>已有账号？ <router-link to="/login">去登录</router-link></span>
      </dd>
    </dl>

  </div>
</template>

<script>
  import '../../static/js/index/Particleground.js'
  import Global from '../Global'
  export default {
    name: 'register',
    data(){
      return{
        services:Global.services,
        hashkey:'',
        codeImg:'',
        email:'',
        code:'',
        username:'',
        psw:'',
        psw1:'',
      };
    },
    created(){
     this.getCode()
    },
    mounted(){
      //粒子背景特效
      $('.register').particleground({
        dotColor: '#28a3cb',
        lineColor: '#28a3cb'
      });
    },
    methods:{
      //获取验证码
      getCode:function () {
        var that = this;
        this.$http.get(that.services+'/refresh_captcha/').then(function(response){
          that.hashkey = response.data.data.hashkey;
          that.codeImg = that.services+response.data.data.image_url;
        });
      },
      //注册
      register:function () {
        var re=/^\w+@[a-z0-9]+\.[a-z]+$/i;
        if(this.email==null||this.email==""){
          this.$message.warning('请输入邮箱');
          return;
        }else if(!re.test(this.email)){
          this.$message.warning('请输入合法邮箱');
          return;
        }
        if(this.code==null||this.code==""){
          this.$message.warning('请输入验证码');
          return;
        }
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
        if(this.psw1==null||this.psw1==""){
          this.$message.warning('请再次输入密码');
          return;
        }else if(this.psw1!=this.psw){
          this.$message.warning('两次输入密码不一致');
          return;
        }
        var that=this;
        this.$http.post(
          that.services+'/register/',
          {
            'email':that.email,
            'username':that.username,
            'passwd':that.psw,
            'repasswd':that.psw1,
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
          if(response.body.status==200){
            that.$message.success('注册成功');
            setTimeout(function () {
              that.$router.push('/login')
            },3000);
          }else{
            this.$message.error(response.body.msg);
          }
        });
      }
    }
  }
</script>

<style scoped>
  @import "../../static/style/index/login_register.css";
  .register{
    box-sizing: border-box;
    padding-top:1px;
    height:100vh;
  }
</style>
