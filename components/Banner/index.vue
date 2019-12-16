<template>
  <div class="banner">
    <div
      v-for="item in bannerList"
      :key="item.id"
      class="single"
      :class="selectBanner == item.id&&'active'"
      :style="`background-image:url(${item.pic})`"
    >
      <a href="/"></a>
    </div>
    <ul class="dots">
      <li
        v-for="item in bannerList"
        :key="item.id"
        @mouseenter="handDot(item.id)"
        @mouseleave="outDot(item.id)"
        :class="selectBanner == item.id&&'active'"
      >
        <span></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: {
      type: Array,
      default: () => []
    },
    interval: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      timer: null,
      selectBanner: null
    };
  },
  components: {},
  mounted() {
    this.selectBanner = this.bannerList[0].id;
    this.clearHandle();
  },
  destroyed() {
    this.clearHandle(true);
  },
  methods: {
    initBanner() {
      this.timer = setInterval(() => {
        if (this.bannerList.length <= this.selectBanner) {
          this.selectBanner = 1;
        } else {
          this.selectBanner++;
        }
      }, this.interval);
    },
    clearHandle(flag) {
      if (flag) {
        clearInterval(this.timer);
      } else {
        this.initBanner();
      }
    },
    handDot(id) {
      this.clearHandle(true);
      this.selectBanner = id;
    },
    outDot(id) {
      this.clearHandle();
    }
  }
};
</script>

<style scoped lang="stylus">
.banner {
  width: 100%;
  height: 540px;
  background-color: #0a151e;
  position: relative;
  overflow: hidden;
  .single {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    align-self: auto;
    opacity: 0;
    transition: opacity 0.4s;
    &.active {
      opacity: 1;
      z-index: 1;
    }
    a {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  .dots {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 20px;
    z-index: 2;
    li {
      cursor: pointer;
      display: inline-block;
      margin: 0 8px;
      opacity: 0.4;
      transition: opacity 0.4s;
      &:hover, &.active {
        opacity: 1;
      }
      span {
        display: inline-block;
        width: 56px;
        height: 3px;
        background: hsla(0, 0%, 100%, 0.3);
      }
    }
  }
}</style>
