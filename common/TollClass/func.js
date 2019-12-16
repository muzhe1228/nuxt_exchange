import { normalDate } from "../utli";
// js获取日期：前天、昨天、今天、明天、后天
// GetDateStr(1);明天
// GetDateStr();今天
// GetDateStr(-1);昨天
function GetDateStr(AddDayCount) {
    AddDayCount = AddDayCount || 0;
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;
    return y + "-" + m + "-" + d;
}
//功能：计算两个时间戳之间相差的日时分秒
//$begin_time  开始时间戳
//$end_time 结束时间戳
function timediff($end_time) {
    var date1 = new Date(); //开始时间
    var date3 = $end_time - new Date().getTime(); //时间差的毫秒数

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));

    //计算出小时数

    var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours =
        Math.floor(leave1 / (3600 * 1000)) < 10
            ? "0" + Math.floor(leave1 / (3600 * 1000))
            : Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes =
        Math.floor(leave2 / (60 * 1000)) < 10
            ? "0" + Math.floor(leave2 / (60 * 1000))
            : Math.floor(leave2 / (60 * 1000));

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds =
        Math.round(leave3 / 1000) < 10
            ? "0" + Math.round(leave3 / 1000)
            : Math.round(leave3 / 1000);

    var $res = days + "天 " + hours + ":" + minutes + ":" + seconds;
    return $res;
}
//时间格式化(多长时间之前)
//oDate（时间戳或字符串日期都支持）
function dateFormat1(myDate) {
    var oDate = normalDate(myDate);

    if (+oDate >= +new Date()) {
        return "刚刚";
    }
    var lookTime = +new Date() - +oDate;
    var seconds = Math.floor(lookTime / 1000);
    var minutes = Math.floor(lookTime / (1000 * 60));
    var hours = Math.floor(lookTime / (1000 * 60 * 60));
    var days = Math.floor(lookTime / (1000 * 60 * 60 * 24));
    var months = Math.floor(lookTime / (1000 * 60 * 60 * 24 * 30));
    var years = Math.floor(lookTime / (1000 * 60 * 60 * 24 * 30 * 12));

    if (seconds < 60) {
        lookTime = seconds + "秒前";
    } else if (minutes < 60) {
        lookTime = minutes + "分钟前";
    } else if (hours < 24) {
        lookTime = hours + "小时前";
    } else if (days < 30) {
        lookTime = days + "天前";
    } else if (months < 12) {
        lookTime = months + "个月前";
    } else {
        lookTime = years + "年前";
    }
    return lookTime;
}

//转换json
function tryToParseJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {}
}
//科学技术法转化
function scientificToNumber(num) {
    if (!num) return num;
    let numStr = num.toString().toLocaleLowerCase();
    if (!/(e)|(E)/g.test(numStr)) {
        return num;
    }
    return Number(num)
        .toFixed(18)
        .replace(/\.0+$/, "")
        .replace(/(\.\d+[1-9])0+$/, "$1");
}
//科学计数法
function toFixeds(nums, len = 2) {
    if (nums || nums === 0) {
        let re = `/([0-9]+\.?[0-9]{${len}})[0-9]*/`,
            regexp = /(?:\.0*|(\.\d+?)0+)$/;
        nums = scientificToNumber(nums).toString();
        nums =
            nums == 0
                ? nums
                : nums.replace(eval(re), "$1").replace(regexp, "$1");
        return Number(nums).toFixed(len);
    } else {
        return "--";
    }
}
//保留小数位数
function isAction(str, err) {
    //账号
    var reg = /[a-zA-Z0-9_]{4,16}/;
    let isTrue = reg.test(str);
    if (!isTrue) {
        return err ? err : "账号为4-14位数字，字母，下划线";
    }
    return false;
}
// if (str.trim()) {
// } else {
//     return "密码不能为空";
// }
// return false;
function isEmail(str, err) {
    //email
    if (str.trim()) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        let isTrue = reg.test(str);
        if (!isTrue) {
            return err ? err : "邮箱格式有误！";
        }
        return false;
    } else {
        return "邮箱不能为空";
    }
}
function isAccount(str) {
    if (str.trim()) {
        if (isEmail(str) && isNum(str)) {
            return "账号为手机号或邮箱！";
        }
        return false;
    } else {
        return "账号不能为空";
    }
}

function isPwd(str, err) {
    if (str.trim()) {
        //密码
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,20}$/;
        let isTrue = reg.test(str);
        if (!isTrue) {
            return err ? err : "密码为 6 - 20 位数字，字母，下划线组合";
        }
        return false;
    } else {
        return "密码不能为空";
    }
}
function isCode(str, err) {
    if (str.trim()) {
        //验证码
        var reg = /^\d{6}$/;
        let isTrue = reg.test(str);
        if (!isTrue) {
            return err ? err : "验证码为6位数字";
        }
        return false;
    } else {
        return "验证码不能为空";
    }
}
function isBankCode(str, err) {
    if (str.trim()) {
        //银行卡
        var reg = /^([1-9]{1})(\d{14,18})$/;
        let isTrue = reg.test(str);
        if (!isTrue) {
            return err ? err : "银行卡号为15-19位数字";
        }
        return false;
    } else {
        return "银行卡号不能为空";
    }
}
function isShenfenCard(str, err) {
    if (str.trim()) {
        //身份证
        var reg = /(^\d{15,18}$)|(^\d{17}(\d|X|x)$)/;
        let isTrue = reg.test(str);
        if (!isTrue) {
            return err ? err : "身份证号为15-18位数字";
        }
        return false;
    } else {
        return "身份证号不能为空";
    }
}
function isPhone(str, err) {
    if (str.trim()) {
        //手机号
        var reg = /^1[23456789]\d{9}$/;
        let isTrue = reg.test(str);
        if (!isTrue) {
            return err ? err : "手机号码有误，请重填";
        }
        return false;
    } else {
        return "手机号不能为空";
    }
}
function isNum(str, err) {
    //全数字
    var reg = /^\d{1,}$/;
    let isTrue = reg.test(str);
    if (!isTrue) {
        return err ? err : "邀请码请输入数字";
    }
    return false;
}
function numFormat(num) {
    if (!num) return 0;
    var res = num.toString().replace(/\d+/, function(n) {
        // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
            return $1 + ",";
        });
    });
    return res;
}
function NumRes(num) {
    if (Number(num) < 10) {
        return "0" + num;
    } else {
        return num + "";
    }
}
//秒转分秒
function formatSeconds(value) {
    var secondTime = parseInt(value); // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小时
    if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        // //如果分钟大于60，将分钟转换成小时
        // if(minuteTime > 60) {
        //     //获取小时，获取分钟除以60，得到整数小时
        //     hourTime = parseInt(minuteTime / 60);
        //     //获取小时后取佘的分，获取分钟除以60取佘的分
        //     minuteTime = parseInt(minuteTime % 60);
        // }
    }
    var result = NumRes(parseInt(secondTime));

    if (minuteTime > 0) {
        result = NumRes(parseInt(minuteTime)) + ":" + result;
    }
    // if(hourTime > 0) {
    //   result = "" + parseInt(hourTime) + "小时" + result;
    // }
    return result;
}
//获取dom距离四周的边距
function getElementDL(element, direction) {
    let Length = parseInt(element.getBoundingClientRect()[direction]);
    return Length;
}
//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
function ZhengFu(num) {
    if (num > 0) {
        return "+" + num;
    } else {
        return num;
    }
}

function formatSecondsToHM(value) {
    var secondTime = parseInt(value / 1000); // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小时
    if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = (secondTime < 10 ? "0" : "") + parseInt(secondTime);

    if (minuteTime >= 0) {
        result =
            (minuteTime < 10 ? "0" : "") + parseInt(minuteTime) + ":" + result;
    }
    if (hourTime > 0) {
        result = (hourTime < 10 ? "0" : "") + parseInt(hourTime) + ":" + result;
    }
    return result;
}

/*
 * 参数说明：
 * number：要格式化的数字
 * decimals：保留几位小数
 * dec_point：小数点符号
 * thousands_sep：千分位符号
 * */
function numberFormat(number, decimals, dec_point, thousands_sep) {
    number = (number + "").replace(/[^0-9+-Ee.]/g, "");
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return "" + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
}

function isIos() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return false;
    }
    if (isiOS) {
        return true;
    }
}
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
// 判断是不是客户端
function getAppType() {
    if (isIos()) {
        window.webkit.messageHandlers.NativeMethod.postMessage("checkINApp");
    } else {
        window.openApp.getTypeApp("");
    }
}

function isNormal(type) {
    //股票是否正常可以
    if (type) {
        return "不可以";
    } else {
        return "正常";
    }
}
//颜色判断
function IsColor(val) {
    if (parseFloat(val) > 0) {
        return "text_green";
    } else if (parseFloat(val) == 0) {
        return "text_gray";
    } else {
        return "text_red";
    }
}
//获取时间间隔
function getDataSingle() {
    var date = new Date(),
        week = date.getDay(),
        Hours = date.getHours(),
        Min = date.getMinutes();
    if (0 < week < 6) {
        if (11 >= Hours && Hours >= 9) {
            if ((Hours == 9 && Min < 30) || (Hours == 11 && Min > 30)) {
                return false;
            } else {
                return true;
            }
        } else if (15 >= Hours && Hours >= 13) {
            if ((Hours == 13 && Min < 0) || (Hours == 15 && Min > 0)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//千分符
function toThousands(num) {
    var re = /\d{1,3}(?=(\d{3})+$)/g;
    var n1 = num.toString().replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
        return s1.replace(re, "$&,") + s2;
    });
    return n1;
}
//浮点数转换成小数
function toFixedsPic(num, extent = 2) {
    if (num == 0) {
        return 0;
    } else if (!num) {
        return "--";
    }
    return toThousands(num.toFixed(extent));
}

export {
    getDataSingle,
    isAction,
    isAccount,
    isEmail,
    isPwd,
    isCode,
    isBankCode,
    isShenfenCard,
    isPhone,
    isNum,
    GetDateStr,
    tryToParseJson,
    toFixeds,
    numFormat,
    formatSeconds,
    formatSecondsToHM,
    getElementDL,
    randomNum,
    ZhengFu,
    numberFormat,
    isIos,
    IsPC,
    getAppType,
    isNormal,
    IsColor,
    toThousands,
    toFixedsPic
};
