[
    {
        text: "中国工商银行 (ICBC)",
        value: "中国工商银行 (ICBC)"
    },
    {
        text: "中国农业银行 (ABC)",
        value: "中国农业银行 (ABC)"
    },
    {
        text: "中国建设银行 (CBC)",
        value: "中国建设银行 (CBC)"
    },
    {
        text: "中国银行 (BC)",
        value: "中国银行 (BC)"
    },
    {
        text: "交通银行 (BOCOM)",
        value: "交通银行 (BOCOM)"
    },
    {
        text: "招商银行 (CNBC)",
        value: "招商银行 (CNBC)"
    },
    {
        text: "广发银行 (CGB)",
        value: "广发银行 (CGB)"
    },
    {
        text: "招商银行 (CNBC)",
        value: "招商银行 (CNBC)"
    },
    {
        text: "浦发银行 (SDPB)",
        value: "浦发银行 (SDPB)"
    },
    {
        text: "兴业银行 (CIB)",
        value: "兴业银行 (CIB)"
    },
    {
        text: "中国光大银行 (CEB)",
        value: "中国光大银行 (CEB)"
    },
    {
        text: "平安银行 (PAB)",
        value: "平安银行 (PAB)"
    },
    {
        text: "中国民生银行 (CMBC)",
        value: "中国民生银行 (CMBC)"
    },
    {
        text: "中信银行 (ECITIC)",
        value: "中信银行 (ECITIC)"
    },
    {
        text: "上海银行 (BOSC)",
        value: "上海银行 (BOSC)"
    },
    {
        text: "中国邮政储蓄银行 (PSBC)",
        value: "中国邮政储蓄银行 (PSBC)"
    }
];



var eventUtil = {
    addEvent: function(element, type, handler) {
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
    },
    removeEvent: function(element, type, handler) {
        if (element.removeEventListener) {
            //非IE浏览器采用dom2级事件处理，type为事件类型如：click，handler为事件处理函数，false代表事件采用冒泡处理模型，如果是true代表 采用捕获型处理模型
            //除了netbeans采用捕获型处理模型，其他都采用冒泡型处理模型
            //如果是非IE浏览器添加事件为：removeEventListener
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            //如果为IE浏览器，添加事件采用 detachEvent
            element.detachEvent("on" + type, handler);
        } else {
            //dom0级事件处理，如果删除事件采用赋值null
            element["on" + type] = null;
        }
    },
    getEvent: function(event) {
        //获取事件本身
        return event ? event : window.event;
    },
    getType: function(event) {
        //获取事件类型
        return event.type;
    },
    getElement: function(event) {
        //获取事件作用元素
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        //阻止默认的事件行为
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopProPagation: function(event) {
        //停止事件冒泡
        if (event.stopProPagation) {
            event.stopProPagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
