
$(function () {
    $("#slides").slidesjs({ width: 940, height: 230, navigation: false });
    $(".small_sc_menu_wrap").delegate("li", "click", function () {
        if (this.title == "list") $(".arrow,.list_menu_wrap").css("display", $(".arrow").css("display") === "none" ? "block" : "none");
    });
});

var setStyle = function () {
    var _width = document.documentElement.clientWidth;
    var styleClass = (_width > 641) ? 'prv_wrap' : 'small_wrap';
    //alert(styleClass);
    //$("#out_wrap").removeClass(["prv_wrap", "small_wrap"]).addClass(styleClass);
    //if (fmt <= 640) { alert(styleClass); }
    $("body").removeClass("prv_wrap small_wrap").addClass(styleClass);
}