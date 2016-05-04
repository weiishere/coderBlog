/// <reference path="../jquery/jquery-1.8.2.min.js" />

(function ($, pro) {
    var SlideBlock = function (_number, isDetails, _content, _domId) {
        this.number = _number;
        this.isDetails = isDetails;
        this.content = _content;
        this.domId = _domId;
    }
    var findSlideBlock = function (id) {
        var result;
        $.each(SlideBlockArray, function (i, item) {
            if (item.domId == id) {
                result = item;
                return false;
            }
        });
        return result;
    }
    pro.init = function (exp) {
        exp = (null || pro);
        exp.SlideBlockArray = [];
        exp.maxNumber = parseInt($("#input_maxNumber").val());
        exp.slideLineWrap = $("#slideLineWrap");
        exp.slideLine = $("#slideLine");
        exp.resultWrap = $("#resultWrap");
        exp.activeSlideBlock;
        exp.mouseGo = 0;
        exp.ismove = false;
        $("#slideLineWrap i:eq(1)").html(maxNumber);
        initResult();
    }
    var insertSlideBlock = function (number) {
        var numberResult = parseInt((parseInt(number - 8) / slideLine.width()) * maxNumber);
        slideLineWrap.append("<div id='id_" + number + "' class='slideBlock' style='left:" + (number + (slideLine.position().left) / 2) + "px'><div class='topNum'>" + numberResult + "</div></div>");
        var slideBlock = new SlideBlock(numberResult, true, "大于" + maxNumber, "id_" + number);
        SlideBlockArray.push(slideBlock);
        initResult();
    }
    var initResult = function () {
        if (SlideBlockArray.length == 0) {
            $(".slideBlock,#resultWrap div").remove();
            return false;
        }
        SlideBlockArray.sort(function (x, y) { return x.number - y.number });
        var html = "";
        var minNumber = 0;
        $.each(SlideBlockArray, function (i, item) {
            html += "<div>from:" + minNumber + " to " + item.number + " <label><input type='checkbox' />是否显示详细</label><input type='text' value='大于" + minNumber + "'/></div>";
            item.content = "大于" + minNumber;
            minNumber = item.number;
        });
        resultWrap.html(html + "<div>from:" + minNumber + " to " + maxNumber + " <label><input type='checkbox' />是否显示详细</label><input type='text' value='大于" + minNumber + "'/></div>");
    }
    init();
    var textInputCommand = function (textInput) {
        var _num = $(textInput).val(); var dom = $(textInput).parent().parent();
        if (!isNaN(_num)) {
            if (_num <= 0 || _num >= maxNumber) { alert("输入超出范围"); return false; }
        } else {
            alert("请输入数字");
            return false;
        }
        var number = (_num / maxNumber) * slideLine.width();
        dom.css("left", number + slideLine.position().left - 5);
        findSlideBlock(dom[0].id).number = _num;
        dom.find("div").html(_num);
        initResult();
    }
    slideLine.click(function (e) {
        var ex = (e || window.event).clientX;
        var po_x = ex - slideLine.position().left;
        insertSlideBlock(po_x);
    });
    $(document).delegate("div.slideBlock", "mousedown", function (e) {
        activeSlideBlock = findSlideBlock(this.id);
        mouseGo = (e || window.event).clientX;
        ismove = true;
        var dom = $(this).css("cursor", "col-resize");
        var lineLeft = slideLine.position().left;
        var slideLineWidth = slideLine.width();
        $("body").mousemove(function (e) {
            if (!ismove) { return false; }
            var ex = (e || window.event).clientX;
            var conMouseGo = ex - mouseGo;
            var left = dom.position().left;
            if ((left + 5 <= lineLeft && conMouseGo < 0) || (left >= lineLeft + slideLineWidth - 5 && conMouseGo > 0)) { return false; }
            dom.css("left", left + conMouseGo);
            mouseGo = ex;
            var numberResult = parseInt((parseInt(dom.position().left - slideLine.position().left + 5) / slideLine.width()) * maxNumber);
            if (numberResult < 0) { numberResult = 0; } if (numberResult > maxNumber) { numberResult = maxNumber; }
            if (dom.find("input").size() == 0) { dom.find("div").html(numberResult); } else { dom.find("input").val(numberResult); }
        }).mouseup(function () {
            var numberResult = parseInt((parseInt(dom.position().left - slideLine.position().left + 5) / slideLine.width()) * maxNumber);
            activeSlideBlock.number = numberResult;
            ismove = false;
            $("body").unbind("mousemove").unbind("mouseup");
            initResult();
        });
    }).delegate("div.topNum", "click", function () {
        if ($(this).find("input").size() == 0) {
            var _num = parseFloat($(this).html());
            $(this).html("<input class='topNum_input' type='text' value='" + _num + "'>").find("input")[0].select();
        }
    }).delegate("input.topNum_input", "keypress", function (e) {
        if ((e || window.event).keyCode == 13) {
            textInputCommand(this);
        }
    }).delegate("input.topNum_input", "blur", function (e) {
        textInputCommand(this);
    });
    resultWrap.delegate(":checkbox", "click", function () {
        $(this).parent().next().attr("disabled", this.checked);
    });
})(jQuery, window);