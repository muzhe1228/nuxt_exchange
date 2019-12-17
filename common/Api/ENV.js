// import { lStore } from "../utli";
// const market = lStore.get("market") || "PC";
export default {
  // 测试地址
  testENV: {
    name: "test",
    httpApi: "http://x5u6p3.natappfree.cc"
  },
  //生产地址
  // 18.139.211.91:8183
  proENV: {
    name: "prod",
    httpApi: "http://3.0.67.19:8183"
  },
  getENV: function() {
    return this.testENV;
  }
};
