<template>
  <div class="home">
    <Swiper :bannerList="bannerList" />
    <section class="home_search"></section>
    <section class="home_coin">
      <ul class="coinList">
        <li v-for="item in coinList" :key="item">
          <a>
            <dl>
              <dt>
                <span>比特币</span>
                <strong>{{item}}/USDT</strong>
              </dt>
              <dd class="price">
                7064.00
                <em>≈ 49730.56 CNY</em>
              </dd>
              <dd class="vol">24H量 37,983</dd>
              <dd class="rate down">-0.48%</dd>
            </dl>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import banner from "images/banner.jpg";
import banner1 from "images/banner1.jpg";
import Swiper from "components/Banner";
export default {
  data() {
    return {
      bannerList: [
        {
          pic: banner,
          id: 1
        },
        {
          pic: banner1,
          id: 2
        }
      ],
      coinList: ["BTC", "ETH", "EOS", "HT", "BSV", "BCH"]
    };
  },
  components: {
    Swiper
  },
  methods: {}
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/home.styl';
</style>
