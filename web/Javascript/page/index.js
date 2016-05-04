/// <reference path="../jquery-1.8.2.min.js" />

$(function () {
    masterCommon1.sideBarToggle();
    //Global.tool.textWeakInfo();
});
var masterCommon1 = {};
//初始化侧边栏触发器
masterCommon1.sideBarToggle = function () {
    var sideBarHeight = 0;
    var isStop = true;
    $("#toggleBar").click(function () {
        if (!isStop) { return false; }
        isStop = false;
        if ($("#siteInfoWrap").css("display") == "none") {
            $("#siteInfoWrap").toggle("normal", function () {
                $("#sideBarMenu").show().animate({ "height": sideBarHeight }, 300, function () { $(this).find("li").animate({ "margin-right": "0" }, 400, function () { }); isStop = true; });
                $(this).val("◤");
            });
            return;
        }
        sideBarHeight = $("#sideBarMenu").height();
        $("#sideBarMenu").height(sideBarHeight);
        var i = 0;
        $("#sideBarMenu li").animate({ "margin-right": "-25px" }, 400, function () { i++; if (i == 1) { $(this).parent().animate({ "height": "0" }, 300, function () { $("#siteInfoWrap").toggle("normal"); $(this).hide(); }); } isStop = true; });
        $(this).val("◢");
        
    });
    this.order = "";
    $("#sideBarMenu li").click(function () {
        if (masterCommon1.sideBarToggle.order == $(this).attr("order")) return;
        masterCommon1.sideBarToggle.order = $(this).attr("order");
        masterCommon1.sideBarCommandswitch(masterCommon1.sideBarToggle.order);
    });
}
//侧边栏菜单切换
masterCommon1.sideBarCommandswitch = function (order, callBack) {
    $(".sectionContentWeap").attr("style", "margin-left:-970px;display:none");
    $("#sectionFor" + order).show().animate({ "margin-left": "20" }, 300, function () { if (callBack) { callBack(); } });
}