<template>
  <div class="login">
    <div class="login_wrap">
      <div class="login_title">注册账号</div>
      <div class="inp_group">
        <input
          id="login_name"
          @focus="focusInp('name',true)"
          @blur="focusInp('name',false)"
          type="text"
          v-model="registerData.email"
        />
        <label for="login_name" :class="(name||registerData.email)&&'active'" class="inp_label">账号</label>
      </div>
      <div class="inp_group">
        <input
          id="pwdFoc"
          @focus="focusInp('pwdFoc',true)"
          @blur="focusInp('pwdFoc',false)"
          maxlength="20"
          type="text"
          v-model="registerData.login_pwd"
        />
        <label for="pwdFoc" :class="(pwdFoc||registerData.login_pwd)&&'active'" class="inp_label">密码</label>
      </div>
      <div class="inp_group">
        <input
          id="againPwdFoc"
          @focus="focusInp('againPwdFoc',true)"
          @blur="focusInp('againPwdFoc',false)"
          maxlength="20"
          type="text"
          v-model="again_pwd"
        />
        <label
          for="againPwdFoc"
          :class="(againPwdFoc||again_pwd)&&'active'"
          class="inp_label"
        >再次确认密码</label>
      </div>
      <div class="inp_group ImgCode">
        <input
          id="code"
          @focus="focusInp('code',true)"
          @blur="focusInp('code',false)"
          maxlength="20"
          type="text"
          v-model="registerData.captcha_code"
        />
        <label for="code" :class="(code||registerData.captcha_code)&&'active'" class="inp_label">验证码</label>
        <p @click="getImageCode" class="codeImg">
          <img :src="codeData.value" alt="加载失败" />
        </p>
      </div>
      <p class="forget">忘记密码?</p>
      <button class="login_btn" @click="postRegister">注册</button>
    </div>
  </div>
</template>

<script>
import { getImageCode, postRegister } from "common/http-req";
export default {
  data() {
    return {
      name: false,
      pwdFoc: false,
      againPwdFoc: false,
      code: false,
      codeData: {},
      again_pwd: null,
      registerData: {
        mobile: "17620800222",
        email: null,
        captcha_code: null,
        login_pwd: null,
        // again_pwd: null,
        id: null
      }
    };
  },
  components: {},
  mounted() {
    this.getImageCode();
  },
  methods: {
    focusInp(check, bol) {
      this[check] = bol;
      console.log(this[check]);
    },
    postRegister() {
      postRegister(this.registerData).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.$Message.success("恭喜你注册成功,请前往注册邮箱激活!");
        }
      });
    },
    getImageCode() {
      getImageCode()
        .then(res => {
          this.codeData = res.data;
          this.registerData.id = res.data.id;
          this.$lStore.set("codeImg", res.data);
        })
        .catch(err => {
          this.$Message.error("验证码异常！");
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.login {
  min-height: 100vh;
  width: 100%;
  padding-top: 200px;
  background-color: #242e47;
  &_wrap {
    width: 500px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    margin: 0 auto;
    padding: 0 48px 48px;
  }
  &_title {
    height: 88px;
    font-size: 20px;
    line-height: 88px;
    text-align: center;
  }
  .inp_group {
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;
    &.ImgCode {
      width: 280px;
      .codeImg {
        position: absolute;
        right: -124px;
        top: 7px;
        img {
          width: 120px;
        }
      }
    }
    input {
      background-color: #fff;
      border: 1px solid #dfe2e7;
      height: 54px;
      width: 100%;
      border-radius: 4px;
      padding: 24px 16px 8px;
      &:hover {
        border: 1px solid #357ce1;
      }
      &:focus {
        border: 1px solid #357ce1;
      }
    }
    .inp_label {
      position: absolute;
      left: 16px;
      top: 50%;
      font-size: 14px;
      line-height: 20px;
      margin-top: -10px;
      transition: all 0.4s;
      color: #9aa5b5;
      &.active {
        font-size: 13px;
        top: 6px;
        margin-top: 0;
      }
    }
  }
  .forget {
    color: #357ce1;
    text-align: right;
    font-size: 14px;
    cursor: pointer;
  }
  &_btn {
    font-size: 14px;
    margin-top: 14px;
    width: 100%;
    height: 48px;
    border-radius: 4px;
    background-color: #357ce1;
    color: #fff;
  }
}
</style>
