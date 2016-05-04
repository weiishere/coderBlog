/// <reference path="../jquery-1.8.2.min.js" />
var articleCommon = {};
$(function () {
    $("#toggleForModule,#toggleForTag").click(function () {
        articleCommon.toggleSideBar($(this).attr("order"));
    });
    $("#previewWrap span").click(function () {
        if ($("#articles" + $(this).attr("order")).css("display") == "block") return;
        $("#a_listContentWrap nav>ul").fadeOut("fast");
        $("#a_listContentWrap ul[sign='articles" + $(this).attr("order") + "']").fadeIn("normal");
    });
    var tabArray = [{ commandId: "command_new", wrapId: "wrap_1" },
                         { commandId: "command_hot", wrapId: "wrap_2" }];
    tabControl = $.tabCommon(tabArray, "", "articleHeadWrap_span_hover", {
        defalutShow: 1, isHover: false, switchTime: 0, callBack: function (commandGroup) {
        }
    });
});

articleCommon.leftBarIsToggle = false;
articleCommon.rightBarIsToggle = false;
articleCommon.wrapId = "a_listContentWrap";
articleCommon.toggleSideBar = function (order) {
    var h = $("#article_moduleBar").width();
    var h2 = $("#article_tagBar").width();
    if (order == "module") {
        var ah = $("#" + articleCommon.wrapId).width();
        if (articleCommon.rightBarIsToggle == true) { ah--; }
        if (!articleCommon.leftBarIsToggle) {
            $("#article_moduleBar").animate({ "margin-left": -h }, 300);
            $("#" + articleCommon.wrapId).animate({ "width": ah + h + 2 }, 300, function () { articleCommon.leftBarIsToggle = true; $(this).css({ "border-left": "0" }); });
        } else {
            $("#article_moduleBar").animate({ "margin-left": 0 }, 300);
            $("#" + articleCommon.wrapId).animate({ "width": ah - h + 1 }, 300, function () { articleCommon.leftBarIsToggle = false; $(this).css({ "border-left": "solid 1px #999" }); });
        }
    } else {
        var ah = $("#" + articleCommon.wrapId).width() + 2;
        if (articleCommon.leftBarIsToggle == true) { ah--; }
        if (!articleCommon.rightBarIsToggle) {
            $("#article_tagBar").animate({ "margin-right": -h2 }, 300);
            $("#" + articleCommon.wrapId).animate({ "width": ah + h2 + 1 }, 300, function () { articleCommon.rightBarIsToggle = true; $(this).css({ "border-right": "0" }); });
        } else {
            $("#article_tagBar").animate({ "margin-right":  0}, 300);
            $("#" + articleCommon.wrapId).animate({ "width": ah - h2 - 2 }, 300, function () { articleCommon.rightBarIsToggle = false; $(this).css({ "border-right": "solid 1px #999" }); });
        }
    }
    //if (articleCommon.rightBarIsToggle && articleCommon.leftBarIsToggle) {
    //    alert("f");
    //    $("#a_listContentWrap").width(1022);
    //}
}