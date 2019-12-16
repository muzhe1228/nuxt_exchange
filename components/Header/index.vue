<template>
  <header class="header" :class="isHome&&'active'">
    <div class="header_left">
      <div class="header_logo">
        <img src="~assets/images/logo.svg" alt />
      </div>
      <div class="header_menu">
        <nuxt-link to="/">行情</nuxt-link>
        <nuxt-link to="/lever">法币交易</nuxt-link>
        <nuxt-link to="/exchange">币币交易</nuxt-link>
        <nuxt-link to="/">杠杆交易</nuxt-link>
      </div>
    </div>
    <div class="header_right">
      <nuxt-link to="/login">登录</nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  scrollToTop: true,
  data() {
    return {
      isHome: false
    };
  },
  mounted() {
    this.initColor();
  },
  methods: {
    initColor() {
      if (this.$route.path === "/") {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    }
  },
  watch: {
    $route(to, from) {
      console.log("11111111111111");
      if (to.path === "/") {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.header {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  background: #131625;
  border-bottom-color: transparent;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.active {
    background: rgba(0, 0, 0, 0.15);
  }
  &_left {
    display: flex;
    align-items: center;
  }
  &_menu {
    padding-left: 40px;
    display: flex;
    align-items: center;
    a {
      font-size: 14px;
      vertical-align: top;
      display: inline-block;
      height: 48px;
      line-height: 48px;
      color: #aeb9d8;
      margin-left: 24px;
      padding: 0 6px;
      transition: all 0.2 linear;
      &.nuxt-link-exact-active {
        position: relative;
        color: #fff;
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          background-color: #357ce1;
          left: 0;
          bottom: 0;
        }
      }
      &:hover {
        color: #fff;
      }
    }
  }
  &_right {
    font-size: 16px;
    a {
      padding-right: 20px;
      color: #aeb9d8;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
