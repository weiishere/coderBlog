/// <reference path="jquery-1.8.2.min.js" />
/// <reference path="lufylegend-1.8.6.min.js" />


(function ($) {
    $(function () {
        init(50, "canvas", 800, 550, main);//加载canvas
        var loader;
        function main() {
            loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE, loadBitMapData);
            loader.load("pic.jpg", "bitmapData")
        }
        function loadBitMapData() {
            var bitmapData = new LBitmapData(loader.content);
            var bitmap = new LBitmap(bitmapData);
            //加入层
            var layer = new LSprite();
            var graphics = new LGraphics();
            addChild(layer);

            //layer.graphics.beginBitmapFill(bitmapData);
            //layer.graphics.drawRect(1, "#ff0000", [10, 10, 150, 100], true, "#880088");
            layer.addChild(bitmap);
        }
    });
})(jQuery);
