
require.config({
    baseUrl: '',//也可以使用这个
    paths: {
        jquery: 'jquery/jquery-1.8.2.min',
        backbone: "bootstrap/backbone.min",
        TabControl: "common/TabControl"
    }
});

require(['jquery', 'TabControl'], function ($,tb) {
    //alert($().jquery);
    alert($("#demo_div").html());
    (function () {
        //插件应用，具备
        //var tabArray = [{ commandId: "commandId_1", wrapId: "warp_1" },
        //        { commandId: "commandId_2", wrapId: "warp_2" },
        //        { commandId: "commandId_3", wrapId: "warp_3" }];
        tabControl = $.tabCommon([{ commandId: "commandId_1", wrapId: "warp_1" },
                { commandId: "commandId_2", wrapId: "warp_2" },
                { commandId: "commandId_3", wrapId: "warp_3" }], "dTab_static", "dTab_active", {
            defalutShow: 2, isHover: false, switchTime: 0,
            callBack: function (commandGroup) { }
        });
    })();
});