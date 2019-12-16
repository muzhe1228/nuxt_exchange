// api/stream.js
import Vue from "vue";
const _comm = new Vue();
// keep track of subscriptions
var _subs = [];
export default {
  subscribeBars: function(symbolInfo, resolution, updateCb, uid, resetCache) {
    let split_symbol = symbolInfo.name.split(/[:/]/);
    if (resolution <= 60) {
      resolution = resolution + "min";
    } else if (resolution == "1D") {
      resolution = "1day";
    } else if (resolution == "1W") {
      resolution = "1week";
    } else if (resolution == "1M") {
      resolution = "1mon";
    }
    setTimeout(() => {
      _comm.$EventListener.fire("SendMsg", {
        event: "sub",
        type: "kline",
        channel: [
          `market.${split_symbol[0].toLowerCase()}usdt.kline.${resolution}`
        ]
      });
      _comm.$EventListener.on("TVkline", klineLastBar.bind("dsda", resolution));
    });
    var newSub = {
      uid,
      resolution,
      symbolInfo,
      lastBar: _comm.$lStore.get("lastBar"),
      listener: updateCb
    };

    _subs.push(newSub);
  },
  unsubscribeBars: function(uid) {
    let split_symbol = uid.split("_"),
      resolution = split_symbol[1],
      coinCode = split_symbol[0].split("/")[0].toLowerCase();
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
    _comm.$EventListener.fire("SendMsg", {
      event: "un_sub",
      type: "kline",
      channel: [`market.${coinCode}usdt.kline.${resolution}`]
    });
    var subIndex = _subs.findIndex(e => e.uid === uid);
    if (subIndex === -1) {
      return;
    }
    _subs.splice(subIndex, 1);
  }
};

const klineLastBar = (resolution, data) => {
  if (_subs.length) {
    // disregard the initial catchup snapshot of trades for already closed candles
    let sub = _subs[0];
    var _lastBar = updateBar(data, resolution);

    // send the most recent bar back to TV's realtimeUpdate callback
    sub.listener(_lastBar);
    // update our own record of lastBar
    sub.lastBar = _lastBar;
  }
};

// Take a single trade, and subscription record, return updated bar
function updateBar(data, resolution) {
  var _lastBar;
  _lastBar = {
    time: data.kTime * 1000,
    low: data.low,
    high: data.high,
    open: data.open,
    close: data.close,
    volume: data.amount
  };
  return _lastBar;
}

export { klineLastBar };
