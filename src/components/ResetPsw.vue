<template>
  <div class="reset-psw">
    <div class="reset_box">
      <div class="lock_title">
        <span>找回密码</span>
      </div>
      <div class="confirm">
        <div class="block">
          <p>1.确认账号</p>
        </div>
        <div class="arrow"></div>
      </div>
      <div class="reset">
        <div class="re_arrow"></div>
        <div class="re_block">
          <p>2.重置密码</p>
        </div>
      </div>
      <div class="ipt_box">
        <p>请填写您的邮箱账号：</p>
        <input type="text" placeholder="请输入您的邮箱" class="email_txt">
        <input type="button" value="获取验证码" class="email_btn">
        <input type="text" placeholder="请输入验证码" class="verify">
        <input type="button" value="下一步"  class="next" @click="nextBtn">
      </div>
      <div class="ret_pwd">
        <p>邮箱：<input type="text" placeholder="请输入您的邮箱" class="email_txt"></p>
        <p>新密码：<input type="password" placeholder="请输入您的新密码" class="password"></p>
        <p>确认密码：<input type="password" placeholder="请确认您的密码" class="sure_password"></p>
        <button class="finish">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'reset-psw',
    data(){
      return{

      }
    },
    methods:{
      nextBtn:function () {
        $('.block').css('background',"#F8F4E9");
        $('.block p').css('color',"#000");
        $('.arrow').css('border-left-color',"#F8F4E9");
        $('.re_block').css('background',"#051827");
        $('.re_block p').css('color',"#fff");
        $(".ipt_box").hide();
        $(".ret_pwd").show();
      }
    }
  }
</script>

<style scoped>
  .reset-psw{
    background: #fff;
  }

</style>
