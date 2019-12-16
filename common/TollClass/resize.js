function addEvent(element, type, handler) {
    if (element.addEventListener) {
        //非IE浏览器采用dom2级事件处理，type为事件类型如：click，handler为事件处理函数，false代表事件采用冒泡处理模型，如果是true代表 采用捕获型处理模型
        //除了netbeans采用捕获型处理模型，其他都采用冒泡型处理模型
        //如果是非IE浏览器添加事件为：addEventListener
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        //如果为IE浏览器，添加事件采用 attachEvent
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}
/**
 * 节制函数
 * @param {Function} method 需要节制的函数
 * @param {Number} delay  间隔时间
 * @param {Number} duration 超出时间
 * @param {Boolean} controlType 1防抖 0节流 默认0
 * @return Function
 */
function control(method, delay = 300, controlType) {
    let timer = null;
    let start = new Date().getTime();
    return function() {
        let context = this;
        let args = arguments;
        if (controlType) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(function() {
                let end = new Date().getTime();
                if (end - start >= delay) {
                    method.apply(context, args);
                    start = end;
                }
            }, delay);
        } else {
            let end = new Date().getTime();
            if (timer) clearTimeout(timer);
            if (end - start >= delay) {
                method.apply(context, args);
                start = end;
            } else {
                timer = setTimeout(function() {
                    method.apply(context, args);
                    start = new Date().getTime();
                }, delay);
            }
        }
    };
}
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt =
            "orientationchange" in window ? "orientationchange" : "resize",
        recalc = control(function() {
            var clientWidth = docEl.clientWidth;
            console.log(6666666666666666666)
            if (!clientWidth) return;
            if (clientWidth >= 375) {
                docEl.style.fontSize = "50px";
            } else {
                docEl.style.fontSize =
                    Math.floor(100 * (clientWidth / 750)) + "px";
            }
        });
    if (!doc.addEventListener) return;
    addEvent(win, resizeEvt, recalc);
    addEvent(doc, "DOMContentLoaded", recalc);
})(document, window);
