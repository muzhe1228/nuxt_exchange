import http from "./Api";
// import { lStore } from "./utli";
// import router from "../router";
// import Store from "../Store";

/******************公用接口调用********* */
export function postRegister(req) {
  return http({
    url: "/api/dev/v1/user/register",
    method: "post",
    data: req
  });
}

export function getImageCode(req) {
  return http({
    url: "/api/dev/v1/captcha/generateCaptcha?captchaType=digit",
    method: "get",
    data: req
  });
}
