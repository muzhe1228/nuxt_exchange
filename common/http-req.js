import http from "./Api";
import { lStore } from "./utli";
import router from "../router";
import Store from "../Store";

/******************公用接口调用********* */
//获取币种介绍
export function getCoinDesc() {
  return http({
    url: "/coin/get_coin_desc",
    method: "get"
  });
}

//获取币种常量、偏移量、下单比例
export function getCoinBaseInfo() {
  return http({
    url: "/v1/leverage/baseinfo",
    method: "post"
  });
}

//获取平台所有币种偏移量
export function getCoinSymbolOffset() {
  return http({
    url: "/v1/leverage/symbolOffset",
    method: "get"
  });
}

//获取所有币种以及币种精度
export function getCoinAllTradeInfo() {
  return http({
    url: "/tradeInfo/allTradeInfo",
    method: "get"
  });
}

//获取钱包提币的手续费
export function getDrawFree(req) {
  return http({
    url: "/v1/misc/listByArray",
    method: "get",
    data: req
  });
}

//获取当前账户资产
export function getBanlace() {
  return http({
    url: "/v1/position/list",
    method: "get",
    data: { coinCode: "USDT" }
  });
}

/****************首页***********************/
//banner
export function getBannerList(req) {
  return http({
    url: "/v1/banner/",
    data: req,
    method: "get",
    notToken: true
  });
}

//公告  notice
export function getNotieList() {
  return http({
    url: "/v1/announcement/list",
    method: "get",
    notToken: true
  });
}

//获取徒弟页面详情 childDetailStatistics
export function getInviteData() {
  return http({
    url: "/user_recommend_detail/childDetailStatistics",
    method: "get"
  });
}

//徒弟列表
export function getDiscipleList(req) {
  return http({
    url: "/user_recommend_detail/childList",
    data: req,
    method: "get"
  });
}

/*****************获取活动详情-公告-以及新闻 **************** */
/**
 *
 * @param {type:3} 活动列表 req
 * @param {type:2} 新闻列表 req
 * @param {type:1} 公告列表 req
 */
export function getPlatMessage(req) {
  return http({
    url: "/v1/platMessage/getList",
    method: "get",
    data: req
  });
}

//新闻操作点赞
export function newHandle(req) {
  return http({
    url: "/v1/platMessage/click",
    method: "get",
    data: req
  });
}
//获取商家列表
export function getMerchantList(req) {
  return http({
    url: "/v1/position/otc/info-list",
    data: req,
    method: "get"
  });
}

export function getCoinCode(req) {
  return http({
    url: "/coin/getCoinInfo",
    data: req,
    method: "get"
  });
}
//获取钱包地址
export function getAddressList(req) {
  return http({
    url: "/v1/user/wallet_address",
    method: "post",
    data: req
  });
}

//获取提币地址列表
export function drawAddressList() {
  return http({
    url: "/v1/user/draw_address/USDT",
    method: "get"
  });
}
//添加提币地址
export function addressDraw(req) {
  return http({
    url: "/v1/user/add_draw_address",
    data: req,
    method: "post"
  });
}

//删除提币地址
export function deletAddressDraw(req) {
  return http({
    url: "/v1/user/delete_draw_address",
    data: req,
    method: "delete"
  });
}

//提币申请
export function drawCoin(req) {
  return http({
    url: "/v1/position/draw",
    data: req,
    method: "post"
  });
}

//充值申请
export function rechargeHandle(req) {
  return http({
    url: "/v1/position/otc/recharge-record-add",
    data: req,
    method: "post"
  });
}

//提现申请
export function drawHandle(req) {
  return http({
    url: "/v1/position/otc/draw-record-add",
    data: req,
    method: "post"
  });
}

//OTC充值列表
export function getOtcRechargeList(req) {
  return http({
    url: "/v1/position/otc/record-list",
    data: req,
    method: "get"
  });
}
//钱包充值列表
export function getWalletRechargeList(req) {
  return http({
    url: "/v1/trade/detail/drawlist",
    data: req,
    method: "get"
  });
}

//钱包提现
export function getDrawList(req) {
  return http({
    url: "/v1/position/draw_list",
    data: req,
    method: "get"
  });
}

//获取充值提现订单详情
export function getDrawRechargeDetail(req) {
  return http({
    url: `/v1/position/otc/record-info/${req.id}`
  });
}

//充值  我已付款
export function paidHandle(req) {
  return http({
    url: `/v1/position/otc/recharge-user-confirm/${req.id}`,
    method: "put"
  });
}

//充值提现取消订单
export function cancelDrawRecharge(req) {
  return http({
    url: `/v1/position/otc/${req.url}/${req.id}`,
    method: "put"
  });
}

//系统公告
export function getSysList(req) {
  return http({
    url: "/v1/system/msg/list",
    data: req,
    method: "get"
  });
}

//全部已读系统公告
export function readAll() {
  return http({
    url: "/v1/system/msg/read_all",
    method: "put"
  });
}

/********* 交易页面 ****************************/

//获取所有币列表
export function coinList() {
  return http({
    url: "/v1/kline/findQuotationList",
    method: "get",
    notToken: true
  });
}

/***********************用户相关接口 ***********************/

//登录接口
export function loginHandle(req) {
  return http({
    url: "/auth/authorize",
    data: req,
    method: "put",
    notToken: true
  });
}

//退出登录
export function loginOut() {
  http({
    url: "/v1/user/login_out",
    method: "post"
  })
    .then(res => {
      lStore.remove("token");
      Store.commit("SET_USERINFO", "");
      Store.commit("SET_BALANCE", "");
      router.push("/login");
    })
    .catch(err => {
      lStore.remove("token");
      Store.commit("SET_USERINFO", "");
      Store.commit("SET_BALANCE", "");
      router.push("/login");
    });
}

//重置密码&&找回密码
export function forgetPwd(req) {
  return http({
    url: "/auth/find_pwd",
    data: req,
    method: "put",
    notToken: true
  });
}

//修改密码
export function editPwd(req) {
  return http({
    url: "/v1/user/update_login_pwd",
    data: req,
    method: "put"
  });
}

//注册接口
export function regHandle(req) {
  return http({
    url: "/auth/register",
    method: "post",
    data: req,
    notToken: true
  });
}

//设置头像
export function setAvatar(req) {
  return http({
    url: "/v1/user/portrait",
    method: "post",
    data: req
  });
}

//图片上传接口
export function uploadImg(req) {
  return http({
    url: "/v1/upload",
    method: "post",
    data: req
  });
}

// 更改用户名昵称
export function updateNickName(req) {
  return http({
    url: "/v1/user/update_nick_name",
    data: req,
    method: "put"
  });
}

//绑定手机号&&邮箱
export function bindPhoneEmail(req, type) {
  return http({
    url: `/v1/user/bind_${type}`,
    data: req,
    method: "post"
  });
}

//获取银行卡列表
export function getBankList(req) {
  return http({
    url: "/v1/user/card/list",
    method: "get"
  });
}

//添加银行卡
export function addBankCard(req) {
  return http({
    url: "/v1/user/card/add",
    data: req,
    method: "post"
  });
}

//解绑银行卡
export function unbindBankCard(req) {
  return http({
    url: "/v1/user/card/remove",
    method: "post",
    data: req
  });
}

//获取留言列表
export function getBoardList(req) {
  return http({
    url: "/v1/leaveMessageBoard/list",
    data: req,
    method: "get"
  });
}

//添加留言
export function addBoard(req) {
  return http({
    url: "/v1/leaveMessageBoard/add",
    data: req,
    method: "post"
  });
}

//提交意见反馈
export function submitFeedback(req) {
  return http({
    url: "/v1/userFeedback",
    method: "post",
    data: req
  });
}

/************************订单接口 **************/

// /v1/leverage/updateDelay?orderNo=xxx&delay=0 or 1
// /v1/mock/updateDelay?orderNo=xxx&delay=0 or 1
//更新是否持仓过夜
export function updateDelay(req) {
  let url = lStore.get("tradeType")
    ? "/v1/leverage/updateDelay"
    : "/v1/mock/updateDelay";
  return http({
    url: `${url}?orderNo=${req.orderNo}&delay=${req.delay}`,
    method: "post"
  });
}

//投资报表
export function getReportData() {
  return http({
    url: "/v1/leverage/statistics",
    methd: "get"
  });
}

//平仓&撤单
export function closeOutCancel(req, url) {
  return http({
    url: url,
    method: "get",
    data: req
  });
}

//历史订单列表
export function getHisList(req, url) {
  return http({
    url: url,
    data: req,
    method: "get"
  });
}

//历史订单详情
export function getOrderHis(req, url) {
  return http({
    url: url,
    data: req,
    method: "get"
  });
}

//获取持仓单列表
export function getHoldList(req) {
  let url = lStore.get("tradeType")
    ? "/v1/leverage/holdList"
    : "/v1/mock/hold_list";
  return http({
    url: url,
    data: req,
    method: "get"
  });
}

//获取挂单列表
export function getEntrustIng() {
  let url = lStore.get("tradeType")
    ? "/v1/leverage/entrustIng"
    : "/v1/mock/entrust_list";
  return http({
    url: url,
    method: "get"
  });
}

//获取订单详情
export function getOrderDetail(req) {
  let url = lStore.get("tradeType")
    ? "/v1/leverage/getOrder"
    : "/v1/mock/order_detail";
  return http({
    url: url,
    data: req,
    method: "get"
  });
}

//更新止盈止损
export function updateProfitLoss(req) {
  let url = lStore.get("tradeType")
    ? "/v1/leverage/updateProfitAndLoss"
    : "/v1/mock/updateProfitAndLoss";
  return http({
    url: `${url}?orderNo=${req.orderNo}&profit=${req.profitPrice}&loss=${req.lossPrice}`,
    method: "put"
  });
}

//下单函数
export function placeOrder(req) {
  let url = "";
  if (lStore.get("tradeType")) {
    url =
      req.tradeType == 1
        ? "/v1/leverage/limited/submit"
        : "/v1/leverage/market/submit";
  } else {
    url = req.tradeType == 1 ? "/v1/mock/limit_trade" : "/v1/mock/market_trade";
  }
  return http({
    url: url,
    data: req,
    method: "post"
  });
}

/************获取K线数据*************/
export function getKLineList(req) {
  return http({
    url: "/v1/kline/findList",
    method: "get",
    data: req,
    notToken: true
  });
}

/****************钱包资金明细****************** */
// 请求参数：
//                 token：String，必填
// 	type:  int，必填，时间类型 1 周 2 月 3 3月
export function getWallAllAmount(req) {
  return http({
    url: "/v1/trade/detail/statisticsAmount",
    method: "get",
    data: req
  });
}

/****************钱包资金明细列表****************** */
export function getWallList(req) {
  return http({
    url: "/v1/trade/detail/accountDetailList",
    method: "get",
    data: req
  });
}

// 钱包转账
// url：/v1/trade/detail/walletTransfer
// 请求方式：post
// 请求参数：
//                 token：String，必填
// 	amount:  double，必填，转账数量
// 	uuid：String，必填，收款用户uuid
// 响应参数：
// 	{
//   "status": 200,
//   "timestamp": 1573207987507

// }
export function walletTransfer(req) {
  return http({
    url: "/v1/trade/detail/walletTransfer",
    method: "post",
    data: req
  });
}

//获取利息
export function PlatformProfit(req) {
  return http({
    url: "/v1/trade/detail/statisticsPlatformProfit",
    method: "get",
    data: req
  });
}
