<template>
  <div class="TVChartContainer" :id="containerId" />
</template>

<script>
import Datafeed from "./pro/index";
import { dateFormatUTC, dateFormat } from "~/common/utli";

export default {
  props: {
    symbol: {
      default: "BTC/USD",
      type: String
    },
    interval: {
      default: 15,
      type: [Number, String]
    },
    containerId: {
      default: "tv_chart_container",
      type: String
    },
    libraryPath: {
      default: `${process.env.BASE_URL}/static/charting_library/`,
      type: String
    },
    clientId: {
      default: "tradingview.com",
      type: String
    },
    userId: {
      default: "public_user_id",
      type: String
    },
    fullscreen: {
      default: false,
      type: Boolean
    },
    autosize: {
      default: true,
      type: Boolean
    },
    theme: {
      type: String,
      default: "Dark"
    },
    colors: {
      type: Object,
      default: () => {
        return {
          bgColor: "#1b212d",
          textColor: "#9BA0AC",
          lineColor: "#262F3F"
        };
      }
    }
  },
  watch: {
    symbol(val) {
      this.tvWidget.onChartReady(() => {
        this._initTV();
      });
    }
  },
  data() {
    this.buttons = [
      { title: "1分", resolution: "1", chartType: 1 },
      { title: "5分", resolution: "5", chartType: 1 },
      { title: "15分", resolution: "15", chartType: 1 },
      { title: "30分", resolution: "30", chartType: 1 },
      { title: "1时", resolution: "60", chartType: 1 },
      { title: "1日", resolution: "1D", chartType: 1 },
      { title: "1周", resolution: "1W", chartType: 1 },
      { title: "1月", resolution: "1M", chartType: 1 }
    ];
    return {
      tvWidget: null
    };
  },

  mounted() {
    this._initTV();
  },
  destroyed() {
    this.$EventListener.off("TVkline", "all");
    this.$EventListener.off("TVhistory", "all");
  },
  methods: {
    _initTV() {
      const widgetOptions = {
        debug: false,
        symbol: this.symbol,
        theme: this.theme,
        // BEWARE: no trailing slash is expected in feed URL
        datafeed: Datafeed,
        interval: this.interval,
        container_id: this.containerId,
        library_path: this.libraryPath,
        timezone: "Asia/Shanghai",
        // timezone: "Asia/Shanghai", //todo: ustawianie timezone'a po strefie usera
        locale: "zh",
        drawings_access: {
          type: "black",
          tools: [{ name: "Regression Trend" }]
        },
        customFormatters: {
          timeFormatter: {
            format: function(date) {
              return dateFormatUTC(date, "hh:mm:ss");
            }
          },
          dateFormatter: {
            format: function(date) {
              return dateFormatUTC(date, "yyyy-MM-dd");
            }
          }
        },
        disabled_features: [
          "use_localstorage_for_settings",
          "show_trading_notifications_history",
          //用户本地存储
          "dont_show_boolean_study_arguments",
          "use_localstorage_for_settings",
          //   //左边工具栏
          "left_toolbar",
          "header_widget",
          //   //周围边框
          "border_around_the_chart",
          //   //底部时间栏目
          "timeframes_toolbar",
          //   //k线与销量分开
          "volume_force_overlay",
          //图表右键菜单
          "pane_context_menu",
          //搜索
          "header_symbol_search",
          "symbol_search_hot_key",
          //左右箭头
          "header_undo_redo",
          //compare
          "header_compare",
          //图表类型
          "header_chart_type",
          //照相机
          "header_screenshot",
          //设置按钮
          "header_settings",
          //技术指标线
          "header_indicators",
          //上传下载按钮
          "header_saveload",
          //分辨率
          "header_resolutions",
          //全屏
          "header_fullscreen_button",
          //是否支持缩放
          "control_bar",
          "open_account_manager",
          "property_pages"
        ],
        enabled_features: [
          "dont_show_boolean_study_arguments",
          "hide_last_na_study_output",
          "show_dom_first_time",
          "lock_visible_time_range_on_resize",
          "disable_resolution_rebuild",
          "source_selection_markers",
          "study_templates"
        ],
        client_id: this.clientId,
        user_id: this.userId,
        fullscreen: this.fullscreen,
        autosize: this.autosize,
        studies_overrides: {
          "volume.volume.color.0": "#F66464",
          "volume.volume.color.1": "#1DBC8C",
          "volume.volume.transparency": 255
        },
        overrides: {
          volumePaneSize: "medium", // 支持的值: large, medium, small, tiny
          "paneProperties.background": this.colors.bgColor,
          //网格
          "paneProperties.vertGridProperties.color": this.colors.lineColor,
          "paneProperties.horzGridProperties.color": this.colors.lineColor,
          "scalesProperties.lineColor": this.colors.lineColor,
          "scalesProperties.textColor": this.colors.textColor,
          " paneProperties.topMargin": 8,
          "paneProperties.bottomMargin": 8,
          "scalesProperties.backgroundColor": this.colors.bgColor,
          "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
          "mainSeriesProperties.candleStyle.upColor": "#1DBC8C",
          "mainSeriesProperties.candleStyle.borderUpColor": "#1DBC8C",
          "mainSeriesProperties.candleStyle.wickUpColor": "#1DBC8C",
          "mainSeriesProperties.candleStyle.downColor": "#F66464",
          "mainSeriesProperties.candleStyle.borderDownColor": "#F66464",
          "mainSeriesProperties.candleStyle.wickDownColor": "#F66464",
          "paneProperties.legendProperties.showLegend": false,
          "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
          "mainSeriesProperties.showPrevClosePriceLine": true
        },
        loading_screen: {
          backgroundColor: this.colors.bgColor,
          foregroundColor: this.colors.bgColor
        }
        // custom_css_url: "bundles/coustom.css",
        // indicators_file_name: "customIndex.js"
      };
      const tvWidget = new TradingView.widget(widgetOptions);
      this.tvWidget = tvWidget;
      tvWidget.onChartReady(() => {
        this.createStudy(tvWidget);
      });
    },
    handleClick() {
      this.tvWidget.chart().getShapeById("MACD");
    },
    createStudy(tvWidget) {
      let mas = [
        {
          day: 5,
          color: "#821f68"
        },
        {
          day: 10,
          color: "#5c7798"
        },
        {
          day: 30,
          color: "#397d51"
        }
        // {
        //   day: 60,
        //   color: "#60407f"
        // }
      ];

      mas.forEach(item => {
        tvWidget
          .chart()
          .createStudy("Moving Average", false, false, [item.day], null, {
            "plot.color": item.color
          });
      });
    },
    clickBtn(resolution) {
      resolution = resolution.toString();
      this.tvWidget
        .chart()
        .setResolution(resolution, function onReadyCallback() {});
    },
    getID(Id, type) {
      this[type] = Id;
    },
    //关闭其他指标
    closeOther() {
      let IdArr = this.tvWidget.chart().getAllStudies();
      IdArr.forEach(item => {
        if (
          item.name == "Moving Average Exponential" ||
          item.name == "Volume"
        ) {
          return;
        } else {
          this.tvWidget.chart().removeEntity(item.id);
        }
      });
    },
    MACD() {
      this.closeOther();
      this.tvWidget.chart().createStudy("MACD", false, false, []);
      this.tvWidget.chart().createStudy("Equity", false, false, []);
    },
    BOLL() {
      this.closeOther();
      this.tvWidget.chart().createStudy("Bollinger Bands", false, false, []);
    },
    KDJ() {
      this.closeOther();
      this.tvWidget.chart().createStudy("Stochastic", false, false, []);
    },
    RSI() {
      this.closeOther();
      this.tvWidget
        .chart()
        .createStudy("Relative Strength Index", false, false, []);
    },
    WR() {
      this.closeOther();
      this.tvWidget.chart().createStudy("Williams %R", false, false, []);
    }
  },
  beforeDestroy() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }
};
</script>

<style lang="stylus" scoped>
.TVChartContainer {
  width: 100%;
  height: 100%;
}
</style>
