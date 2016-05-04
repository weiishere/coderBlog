/// <reference path="../jquery-1.8.2.min.js" />
$(function () {
    $("#headSearch").focus(function () {
        $(this).animate({ "width": "150" }, 150);
    }).blur(function () { $(this).animate({ "width": "70" }, 150); });

    var ishidden = false;
    var timer;
    $("#blogMainNav li[hover='true']").hover(function () {
        
        if ($(this).attr("order") == "mine")
            $("#subModleList li:last-child").html("我的程序demo");
        else
            $("#subModleList li:last-child").html("程序人生");
        window.clearInterval(timer);
        ishidden = false;
        $("#subModleList").show().css("margin-top", "-20px").animate({ "margin-top": "0" }, 100);
    }, function () {
        ishidden = true;
        timer = window.setInterval(function () {

            if (ishidden)
                $("#subModleList").animate({ "margin-top": "-20px" }, 100, function () { $(this).hide(); ishidden = false; });
        }, 500);
    });
    $("#subModleList").hover(function () { ishidden = false; }, function () { ishidden = true; });
    Global.tool.textWeakInfo();
});