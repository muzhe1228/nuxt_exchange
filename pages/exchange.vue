<template>
  <div class="exchange">
    <div class="exchange_top">
      <div class="exchange_top_left">
        <div class="left_head">
          <div class="quotes">
            <span class="fav">
              <em>自选</em>
            </span>
            <span class="active">USDT</span>
            <span>HUSD</span>
            <span>BTC</span>
            <span>ETH</span>
            <span>HT</span>
            <span>ALTS</span>
          </div>
          <div class="actions">
            <Input placeholder="Enter name" class="actions_inp" clearable style="width: 200px">
              <Icon type="ios-search" slot="prefix" />
            </Input>
            <button class="upper">
              <Icon size="18" class="upper_icon" type="md-aperture" />CNY
            </button>
          </div>
        </div>
        <div class="list">
          <ul class="list_head">
            <li>币种</li>
            <li>最新价</li>
            <li>涨幅</li>
          </ul>
          <div class="list_wrap">
            <ul class="list_single" v-for="(item,index) in coinList" :key="item">
              <li class="coin">
                <Icon type="md-heart" class="coin_collect" :class="index%2&&'active'" />
                {{item}}
              </li>
              <li>7743.67</li>
              <li :class="index%2?'color-red':'color-green'">-0.80%</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="exchange_top_right">
        <div class="left"></div>
        <div class="right">
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coinList: [
        "BTC",
        "ETH",
        "EOS",
        "HT",
        "BSV",
        "BCH",
        "TRX",
        "ADA",
        "XRP",
        "LINK",
        "ETC",
        "DASH"
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style scoped lang="stylus">
@import '~assets/stylus/exchange.styl';
</style>
