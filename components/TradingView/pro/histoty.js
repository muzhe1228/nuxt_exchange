import Vue from "vue";
import { lStore } from "~/common/utli";
const _comm = new Vue();
const history = {};
export default {
  history: history,
  getBars: function(symbolInfo, resolution, from, to, first) {
    let split_symbol = symbolInfo.name.split(/[:/]/);
    if (resolution < 60) {
      resolution = resolution + "min";
    } else if (resolution == 60) {
      resolution = "60min";
    } else if (resolution == "1D") {
      resolution = "1day";
    } else if (resolution == "1W") {
      resolution = "1week";
    } else if (resolution == "1M") {
      resolution = "1mon";
    }
    if (first) {
      _comm.$EventListener.fire("SendMsg", {
        event: "req",
        channel: [
          `request.kline.${split_symbol[0].toLowerCase()}usdt.${resolution}.init`
        ]
      });
    } else {
      _comm.$EventListener.fire("SendMsg", {
        event: "req",
        channel: [
          `request.kline.${split_symbol[0].toLowerCase()}usdt.${resolution}.page.${to}`
        ]
      });
    }
    return new Promise(resolve => {
      let bars = [];
      _comm.$EventListener.on("TVhistory", data => {
        let _data = data;
        for (let i = 0; i < _data.length; i++) {
          let item = {
            time: _data[i].kTime * 1000, //TradingView requires bar time in ms
            low: _data[i].low,
            high: _data[i].high,
            open: _data[i].open,
            close: _data[i].close,
            volume: _data[i].amount
          };

          bars.unshift(item);
        }
        if (first) {
          _comm.$lStore.set("lastBar", bars[bars.length - 1]);
        }
        if (bars.length) {
          resolve(bars);
        } else {
          resolve([]);
        }
      });
    });
  }
};
