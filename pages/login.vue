<template>
  <div class="login">
    <div class="login_wrap">
      <div class="login_title">欢迎登录</div>
      <div class="inp_group">
        <input
          id="login_name"
          @focus="focusInp('name',true)"
          @blur="focusInp('name',false)"
          type="text"
        />
        <label for="login_name" :class="name&&'active'" class="inp_label">账号</label>
      </div>
      <div class="inp_group">
        <input
          id="password"
          @focus="focusInp('pwdFoc',true)"
          @blur="focusInp('pwdFoc',false)"
          maxlength="20"
          type="text"
        />
        <label for="password" :class="pwdFoc&&'active'" class="inp_label">密码</label>
      </div>
      <p class="forget">忘记密码?</p>
      <button class="login_btn">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: false,
      pwdFoc: false
    };
  },
  components: {},
  methods: {
    focusInp(check, bol) {
      this[check] = bol;
      console.log(this[check]);
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
    height: 360px;
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
