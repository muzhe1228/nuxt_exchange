import history from "./histoty";
// import history from "./historyProvider";
import stream from "./stream";
import { lStore } from "common/utli";
const supportedResolutions = ["1", "5", "15", "30", "60", "D", "W", "M"];

const config = {
  supported_resolutions: supportedResolutions
};
var socket = null;
export default {
  onReady: cb => {
    console.log("=====onReady running");
    setTimeout(() => cb(config), 0);
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    console.log("====Search Symbols running");
  },
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    // expects a symbolInfo object in response
    console.log("======resolveSymbol running", symbolName);
    // console.log('resolveSymbol:',{symbolName})
    var split_data = symbolName.split(/[:/]/),
      pricescale = Math.pow(
        10,
        lStore.get("coinPrecision")[split_data[0]].tickLength
      );
    // console.log({split_data})
    var symbol_stub = {
      name: symbolName,
      type: "crypto",
      session: "24x7",
      timezone: "Etc/UTC",
      ticker: symbolName,
      minmov: 1,
      pricescale: 100,
      has_intraday: true,
      has_weekly_and_monthly: true,
      supported_resolution: supportedResolutions,
      volume_precision: 8,
      data_status: "streaming",
      supports_time: true,
      has_intraday: true
      //   has_daily: true
    };
    symbol_stub.pricescale = pricescale;
    setTimeout(function() {
      onSymbolResolvedCallback(symbol_stub);
      console.log("Resolving that symbol....");
    }, 0);

    // onResolveErrorCallback('Not feeling it today')
  },
  getBars: function(
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    console.log("=====getBars running", firstDataRequest);
    history
      .getBars(symbolInfo, resolution, from, to, firstDataRequest)
      .then(bars => {
        let data = JSON.parse(JSON.stringify(bars));
        if (bars.length == 200) {
          setTimeout(() => {
            onHistoryCallback(data, { noData: false });
          });
        } else {
          setTimeout(() => {
            onHistoryCallback(data, { noData: true });
          });
        }
      })
      .catch(err => {
        onErrorCallback(err);
      });
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    console.log("=====subscribeBars runnning");
    stream.subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback
    );
  },
  unsubscribeBars: subscriberUID => {
    console.log("=====unsubscribeBars running");

    stream.unsubscribeBars(subscriberUID);
  },
  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
    let reg = /^[1-9]{1,}$/;

    if (resolution == "1D") {
      return {
        resolutionBack: "D",
        intervalBack: 180
      };
    } else if (resolution == "1W") {
      return {
        resolutionBack: "D",
        intervalBack: 140
      };
    } else if (resolution == "1M") {
      return {
        resolutionBack: "M",
        intervalBack: 36
      };
    } else if (reg.test(resolution)) {
      return {
        resolutionBack: "D",
        intervalBack: (Number(resolution) * 200) / 1440
      };
    } else {
      return undefined;
    }

    //optional
    // while optional, this makes sure we request 24 hours of minute data at a time
    // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
  },
  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //optional
    console.log("=====getMarks running");
  },
  getTimeScaleMarks: (
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) => {
    //optional
    console.log("=====getTimeScaleMarks running");
  },
  getServerTime: cb => {
    console.log("=====getServerTime running");
  }
};
