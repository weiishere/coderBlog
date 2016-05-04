/// <reference path="../jquery-1.6.1.min.js" />
//定义命名空间函数
var Global = {};
Global.namespace = function (str) {
    var arr = str.split("."), o = Global;
    for (i = (arr[0] = "Global") ? 1 : 0; i < arr.length; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
}
Global.namespace("Global.tool");
Global.namespace("Global.String");
Global.namespace("Global.method");
//示例:Global.namespace("A.Cat");A.Car.name="Tom";A.Cat.move=function(){...}

//动态加载JS
$.extend({
    includePath: '',
    include: function (file) {
        var files = typeof file == "string" ? [file] : file;
        for (var i = 0; i < files.length; i++) {
            var name = files[i].replace(/^\s|\s$/g, "");
            var att = name.split('.');
            var ext = att[att.length - 1].toLowerCase();
            var isCSS = ext == "css";
            var tag = isCSS ? "link" : "script";
            var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
            var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";
            if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">");
        }
    }
});
//示例：$.include(['http://image.esunny.com/script/jquery.divbox.js', '/css/pop_win.css']);

//$.include(['Scripts/common/artDialog/jquery.artDialog.js?skin=aero', 'Scripts/common/artDialog/artDialog.iframeTools.js']);

Global.dailogWindow = {
    //只显示传入内容的弹出框(需要一个domID，并在弹出框内部显示dom)
    openFloatDivByDomId: function (htmlDivId, title) {
        art.dialog({ content: document.getElementById(htmlDivId),
            lock: true,
            title: title,
            background: '#000', // 背景色
            opacity: 0.2, // 透明度
            closeFn: function () { $(".faceImgFloatDiv").hide(); }
        });
    },
    //confirm框，带两个方法参数(可为空)
    openConfirm: function (content, sureFun, falseFun, parameter) {
        var callBack = function (parameter) { };
        art.dialog.confirm(content, function () {
            if (sureFun != "") {
                callBack = sureFun;
                callBack(parameter);
            }
        }, function () {
            if (falseFun) {
                callBack = falseFun;
                callBack();
            }
        });
    },
    //alert框
    openAlert: function (content) {
        art.dialog.alert(content);
    },
    //关闭页面所有浮动层
    closeAllFloatDiv: function () {
        var list = art.dialog.list;
        for (var i in list) {
            list[i].close();
        };
    },
    //在规定时间内自动消失的提示框
    autoDisappearFloatDiv: function (disappearTime, _content) {
        var _time = disappearTime || 2;
        art.dialog({ fixed: true, time: disappearTime, content: _content });
    },
    //只显示传入内容并可能产生回发的的弹出框(实现之前必须有一个iframe页面，并传入url)
    openIframeWindows: function (iframeUrl, the_title, _width, _height) {
        if (_width == 0) {
            art.dialog.open(iframeUrl, { title: the_title, lock: true, background: '#000', opacity: 0.2 });
        } else {
            art.dialog.open(iframeUrl, { title: the_title, lock: true, background: '#000', opacity: 0.2, width: _width, height: _height });
        }
    }
};
//此法是将文件加在header头上
Global.tool.loadFile = {
    loadJs: function (file) {
        var scriptTag = document.getElementById('loadScript');
        var head = document.getElementsByTagName('head').item(0);
        if (scriptTag) head.removeChild(scriptTag);
        script = document.createElement('script');
        script.src = file;
        script.type = 'text/javascript';
        script.id = 'loadScript';
        head.appendChild(script);
    }, loadCss: function (file) {
        var cssTag = document.getElementById('loadCss');
        var head = document.getElementsByTagName('head').item(0);
        if (cssTag) head.removeChild(cssTag);
        css = document.createElement('link');
        css.href = file;
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.id = 'loadCss';
        head.appendChild(css);
    },
    loadJsAndRun: function (scripts, callback) {
        if (typeof (scripts) != "object") var scripts = [scripts];
        var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
        var s = new Array(), last = scripts.length - 1, recursiveLoad = function (i) {
            s[i] = document.createElement("script");
            s[i].setAttribute("type", "text/javascript");
            s[i].onload = s[i].onreadystatechange = function () {
                if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                    this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
                    if (i != last) recursiveLoad(i + 1); else if (typeof (callback) == "function") callback();
                }
            }
            s[i].setAttribute("src", scripts[i]);
            HEAD.appendChild(s[i]);
        };
        recursiveLoad(0);
    }
}
//获取根目录
Global.tool.getRootPath = function () {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    //return (prePath + postPath);
    return (prePath);
}
//获取URL参数方法
Global.tool.getScriptArg = function (key) {//获取单个参数
    return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
}
//跳转(参数2：是否在新页面中打开)
Global.tool.gotoUrl = function (url, isNewPage) {
    if (isNewPage) {
        window.open(url);
    } else {
        location.href = url;
    }
    //return false;
}
Global.tool.convertUrl = function (src, key) {//获取单个参数
    var reg = /_(c|m|s|t|o|b)\.(jpg|gif|png|bmp|ico|jpeg){1}$/gi;
    var reg2 = /\.(jpg|gif|png|bmp|ico|jpeg){1}$/gi;
    var reg3 = /(.)*_(c|m|s|t|o|b)\.(jpg|gif|png|bmp|ico|jpeg){1}$/gi;
    if (reg3.test(src)) {
        return src.replace(src.match(reg), key + src.match(reg2));
    } else {
        return src;
    }
}
Global.tool.onErrorUrl = function (img, defaultType) {
    var defaultUrl;
    if (defaultType == 0) {
        defaultUrl = $('#defaultImage').val();
    }
    else {
        defaultUrl = $('#defaultBlogSetImage').val(); 
    }

    if ($(img).attr("src") != defaultUrl) {
        $(img).attr("src", defaultUrl);
    }

    //img.attachEvent("onerror", function () { });
    //$(img).unbind("error", function () { });
    $(img).attr("onerror", "");

}


//去除前后空格
Global.String.Trim = function (val) {
    return val.replace(/(^\s*)|(\s*$)/g, "");
}
//去除HTML标签
Global.String.deleteHtmlTag = function (str, charLength) {
    var _str = str.replace(/<[^>].*?>/g, "");
    if (charLength != 0) {
        _str = _str.length > charLength ? _str.substr(0, charLength) + "..." : _str;
    }
    return _str;
}
//转换HTML标签
Global.String.zyDeChart = function (str) {
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    return str;
}
//还原HTML标签
Global.String.zyEnChart = function (str) {
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&gt;/g, ">");
    return str;
}
/*Javascript设置要保留的小数位数，四舍五入。
*
(Dight,How):数值格式化函数，Dight要格式化的 数字，How要保留的小数位数。 
*这里的方法是先乘以10的倍数，然后去掉小数，最后再除以10的倍数。
*/
Global.String.ForDight = function (Dight, How) {
    Dight = Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);

    return Dight.toFixed(How);
}
//加载flash，注意此方法需要swfobject.js的支持
Global.tool.initFlash = function (div_id, flash_src, _width, _height) {
    var so = new SWFObject(flash_src, div_id, _width, _height, "7", "#fff");
    so.addParam("wmode", "Opaque");
    so.addParam("allowscriptaccess", "sameDomain");
    //    params.allowscriptaccess = "sameDomain";
    so.write(div_id);
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-1465702-6']);
    _gaq.push(['_trackPageview']);

}
//获取元素坐标（此方法有bug）
Global.tool.getPostion = function (obj) {
    var vLeft = 0;
    var vTop = 0;
    while (obj != null && obj != document.body) {
        vLeft += obj.offsetLeft;
        vTop += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return { left: vLeft, top: vTop };
}
Global.tool.gotoTop = function () {
    $("html").animate({ scrollTop: 0 }, "fast");
    $("body").animate({ scrollTop: 0 }, "fast");
}

//获取元素相对于浏览器的X坐标
Global.tool.getElementLeft = function (element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}
//获取元素相对于浏览器的Y坐标
Global.tool.getElementTop = function (element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}

//获取元素相对于浏览器滚动条的Y坐标
Global.tool.getElementViewTop = function (element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    if (document.compatMode == "BackCompat") {
        var elementScrollTop = document.body.scrollTop;
    } else {
        var elementScrollTop = $(document).scrollTop();
    }
    return actualTop - elementScrollTop;
}
//获取元素相对于浏览器滚动条的X坐标
Global.tool.getElementViewLeft = function (element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    if (document.compatMode == "BackCompat") {
        var elementScrollLeft = document.body.scrollLeft;
    } else {
        var elementScrollLeft = $(document).scrollLeft();
    }
    return actualLeft - elementScrollLeft;
}

Global.tool.loadImage = function (url, callBack) {
    var img = new Image(); //创建一个Image对象，实现图片的预下载
    img.onload = function () {
        img.onload = null;
        callBack(img);
    }
    img.src = url;
}
//如果参数为空，那么用法就是只要有属性weakChar='true'的框都要应用提示信息，如果加上参数，就独立应用（value提示值需默认设置）
Global.tool.textWeakInfo = function (_dom) {
    var doms = !_dom ? $("input[weakChar='true']") : _dom;
    doms.css("color", "#ccc").delegate("", "click", function () {
        var removeCssTag = function (tag, dom) {
            if (!$(dom).attr("style") || Global.String.Trim($(dom).attr("style")) == "") { return ""; }
            var styles = $(dom).attr("style").split(";");
            $(this).removeAttr(tag);
            var newStyle = new Array();
            for (var i = 0, l = styles.length; i < l; i++) {
                if (Global.String.Trim(styles[i].split(":")[0]) != "color" && Global.String.Trim(styles[i].split(":")[0]) != "") {
                    newStyle.push(styles[i].split(":")[0] + ":" + styles[i].split(":")[1]);
                }
            }
            return newStyle.join(";");
        }
        
        $(this).attr("style", removeCssTag("color", this));
        var tempMethod = function (dom) { if (dom.value == $(dom).attr("Dvalue")) { dom.value = ""; $(dom).attr("style", removeCssTag("color", dom)); } }
        $(this).attr("Dvalue", this.value);
        this.value = "";
        $(this).unbind("click");
        tempMethod(this);
        $(this).focus(function () {
            tempMethod(this);
        }).blur(function () {
            if (this.value == "") {
                this.value = $(this).attr("Dvalue");
                $(this).css("color", "#ccc")
            }
        });
    });
}