/// <reference path="../frame/jquery-1.8.2.min.js" />

(function ($) {
    $.tabCommon = function (tabArray, staticClass, selectClass, _options) {
        //var newSetting = new theSetting();
        this.setting = $.extend({
            defalutShow: 1,
            isHover: true,
            callBack: function (a) { },
            switchTime: 0,
            isPullUpMode: false, //手风琴效果
            isPullUpAutoHide: false//手风琴效果是否自动隐藏其他内容面板
        }, _options || {});
        var tampSet = this.setting;
        tampSet.lastIndex = tampSet.defalutShow;
        var index = tampSet.defalutShow - 1;
        tampSet.setSelectState = function (_index) {

            index = _index;
            if (!tampSet.isPullUpMode) {
                for (var j = 0; j < tabArray.length; j++) {
                    $("#" + tabArray[j].commandId).removeClass(selectClass).addClass(staticClass);
                    $("#" + tabArray[j].wrapId).hide();
                }
            } else {
                if (tampSet.isPullUpAutoHide) {
                    $("#" + tabArray[tampSet.lastIndex].commandId).removeClass(selectClass).addClass(staticClass);
                    $("#" + tabArray[tampSet.lastIndex].wrapId).slideUp("fast");
                }
            }
            var tba = tabArray[_index];
            $("#" + tba.commandId).removeClass(staticClass).addClass(selectClass);
            if (!tampSet.isPullUpMode) {
                $("#" + tba.wrapId).show();
            } else {
                if ($("#" + tba.wrapId).css("display") == "none") {
                    $("#" + tba.wrapId).slideDown("fast");
                } else {
                    $("#" + tba.commandId).removeClass(selectClass).addClass(staticClass);
                    $("#" + ttba.wrapId).slideUp("fast");
                }
            }
            tampSet.lastIndex = _index;
            tampSet.callBack(tabArray[_index]);
        }
        for (var i = 0; i < tabArray.length; i++) {
            var t = tabArray[i];
            $("#" + t.commandId).toggleClass(staticClass);
            $("#" + t.wrapId).hide();
            $("#" + t.commandId).click(new function () {
                var k = i;
                return function () {
                    tampSet.setSelectState(k);
                }
            });
            if (tampSet.isHover == true) {
                $("#" + t.commandId).hover(new function () {
                    var k = i;
                    return function () {
                        tampSet.setSelectState(k);
                    }
                }, function () { });
            }
        }
        if (tampSet.defalutShow) {
            tampSet.setSelectState(tampSet.defalutShow - 1);
        } else {
            tampSet.setSelectState(0);
        }
        if (tampSet.switchTime != 0) {
            //var index = tampSet.defalutShow - 1;
            var timer = window.setInterval(function () {
                index = index == tabArray.length - 1 ? 0 : index + 1;
                tampSet.setSelectState(index);
            }, tampSet.switchTime);
        }
        return tampSet;
    }
})(jQuery);