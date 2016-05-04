jQuery.support.cors = true;

jQuery.extend(
{
    /**
    * @see   将json字符串转换为对象
    * @param   json字符串
    * @return 返回object,array,string等对象
    */
    evalJSON: function (strJson) {
        return eval("(" + strJson + ")");
    }
});
jQuery.extend(
{
    /**
    * @see   将javascript数据类型转换为json字符串
    * @param 待转换对象,支持object,array,string,function,number,boolean,regexp
    * @return 返回json字符串
    */
    toJSON: function (object) {
        var type = typeof object;
        if ('object' == type) {
            if (Array == object.constructor)
                type = 'array';
            else if (RegExp == object.constructor)
                type = 'regexp';
            else
                type = 'object';
        }
        switch (type) {
            case 'undefined':
            case 'unknown':
                return;
                break;
            case 'function':
            case 'boolean':
            case 'regexp':
                return object.toString();
                break;
            case 'number':
                return isFinite(object) ? object.toString() : 'null';
                break;
            case 'string':
                return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g,
        function () {
            var a = arguments[0];
            return (a == '\n') ? '\\n' :
                       (a == '\r') ? '\\r' :
                       (a == '\t') ? '\\t' : ""
        }) + '"';
                break;
            case 'object':
                if (object === null) return 'null';
                var results = [];
                for (var property in object) {
                    var value = jQuery.toJSON(object[property]);
                    if (value !== undefined)
                        results.push(jQuery.toJSON(property) + ':' + value);
                }
                return '{' + results.join(',') + '}';
                break;
            case 'array':
                var results = [];
                for (var i = 0; i < object.length; i++) {
                    var value = jQuery.toJSON(object[i]);
                    if (value !== undefined) results.push(value);
                }
                return '[' + results.join(',') + ']';
                break;
        }
    }
});

jQuery.extend(
{
    isEmptyObject: function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    }
});
//example $.cookie('name', 'value');
//设置cookie的值，把name变量的值设为value
//example $.cookie('name', 'value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
//新建一个cookie 包括有效期 路径 域名等
//example $.cookie('name', 'value');
//新建cookie
//example $.cookie('name', null);
//删除一个cookie
//var account= $.cookie('name');
//取一个cookie(name)值给myvar
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie 
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE 
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie 
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want? 
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
//字符串格式化(使用：$.format("And the %1 want to know whose %2 you %3", "papers", "shirt", "wear")返回And the papers want to know whose shirt you wear)
jQuery.format = function (string) {
    var args = arguments;
    var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
    return String(string).replace(pattern, function (match, index) {
        return args[index];
    })
}
//生成字符串格式化模板
jQuery.makeFunc = function () {
    var args = Array.prototype.slice.call(arguments);
    var func = $.format;
    return function () {
        return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    };
}
//使用范例:var majorTom = $.makeFunc("This is Major Tom to ground control. I’m %1.");
//alert(majorTom("stepping through the door"));

//倒计时
$.fn.countDown = function (time, callback, bind) {
    var _this = this;
    var _time = time || 2000;
    _this.timer = window.setInterval(function () {
        if (callback) { callback.apply(_this, arguments); } else { _this.hide(); }
        window.clearInterval(_this.timer);
    }, _time);
    if (bind) bind.apply(_this, arguments);
    return _this;
}