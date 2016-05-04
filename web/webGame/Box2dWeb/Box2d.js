/// <reference path="lufylegend-1.8.6.min.js" />
/// <reference path="Box2dWeb-2.1.a.3.min.js" />

init(30, "canvas", 600, 400, main);//加载canvas
var backlayer, cLayer;
var imglist = {};
var imgData = new Array({ name: "face", path: "pic.jpg" });
function main() {
    //打开debug模式，否则矩形轮廓是不会显示的
    LGlobal.setDebug(true);
    backlayer = new LSprite();
    backlayer.graphics.drawRect(0, "#000000", [0, 0, 600, 400], false);
    addChild(backlayer);
    LLoadManage.load(imgData,null,gameInit);
}
function gameInit(result) {
    imglist = result;
    //Box2d初始化
    LGlobal.box2d = new LBox2d();
    //加入四个静态边墙物体
    cLayer0 = new LSprite();
    cLayer0.x = 300;
    cLayer0.y = 5;
    cLayer0.addBodyPolygon(565, 10, 0, 5, 0.4, 0.2);
    backlayer.addChild(cLayer0);

    cLayer = new LSprite();
    cLayer.x = 300;
    cLayer.y = 390;
    cLayer.addBodyPolygon(600, 10, 0, 5, 0.4, 0.2);
    backlayer.addChild(cLayer);
   

    cLayer2 = new LSprite();
    cLayer2.x = 5;
    cLayer2.y = 190;
    cLayer2.addBodyPolygon(10, 380, 0, 5, 0.4, 0.2);
    backlayer.addChild(cLayer2);
    

    cLayer3 = new LSprite();
    cLayer3.x = 590;
    cLayer3.y = 190;
    cLayer3.addBodyPolygon(10, 380, 0, 5, 0.4, 0.2);
    backlayer.addChild(cLayer3);
    


    
    //加入一个动态的矩形物体
    cLayer4 = new LSprite();
    cLayer4.x = 200;
    cLayer4.y = 100;
    backlayer.addChild(cLayer4);
    bitmap = new LBitmap(new LBitmapData(imglist["face"], 60, 50, 50, 50));
    cLayer4.addChild(bitmap);
    cLayer4.addBodyPolygon(50, 50, 1, 50, 0.2, 0.2);
    cLayer4.setBodyMouseJoint(true);
    //加入一个动态的圆形
    cLayer5 = new LSprite();
    cLayer5.x = 400;
    cLayer5.y = 100;
    backlayer.addChild(cLayer5);
    bitmap = new LBitmapData(imglist["face"], 50, 50, 100, 120);
    cLayer5.graphics.beginBitmapFill(bitmap);
    cLayer5.graphics.drawArc(1, "#000000", [30, 30, 30, 0, 2 * Math.PI], true);
    cLayer5.addBodyCircle(30, 0, 0, 1, 50, 0.8, 0.2);
    cLayer5.setBodyMouseJoint(true);
    //加入动态多边形
    cLayer6 = new LSprite();
    cLayer6.x = 300;
    cLayer6.y = 190;
    backlayer.addChild(cLayer6);
    bitmap2 = new LBitmapData(imglist["face"]);
    cLayer6.graphics.beginBitmapFill(bitmap2);
    var sharpArray1 = [[0, 25], [25, 0], [150, 25], [150, 75], [25, 100], [0, 75]];
    var sharpArray = [[[0, 25], [25, 0], [150, 25], [150, 75], [25, 100], [0, 75]]];//要特别注意这两个天刹的数组，有区别的
    cLayer6.graphics.drawVertices(1, "#000000", sharpArray1, true);
    cLayer6.addBodyVertices(sharpArray, 25, 75, 1, 0.5, 0.4, 0.2);
    cLayer6.setBodyMouseJoint(true);

    //距离关节
    //LGlobal.box2d.setDistanceJoint(cLayer4.box2dBody, cLayer5.box2dBody);
    //旋转关节
    //LGlobal.box2d.setRevoluteJoint(cLayer4.box2dBody, cLayer5.box2dBody);
    //滑轮关节
    //LGlobal.box2d.setPulleyJoint(cLayer4.box2dBody, cLayer5.box2dBody, [0,50, 300], [0, 100, 300], 1.0);
    //移动关节
    //LGlobal.box2d.setPrismaticJoint(cLayer4.box2dBody, cLayer5.box2dBody, [0, 1], [-5, 2.5], [1, 0]);
    //齿轮关节
    var revoluteJoint = LGlobal.box2d.setRevoluteJoint(cLayer5.box2dBody, cLayer4.box2dBody);
    var prismaticJoint = LGlobal.box2d.setPrismaticJoint(cLayer6.box2dBody, cLayer5.box2dBody, [0, 1], [-5, 2.5], [1, 0]);
    LGlobal.box2d.setGearJoint(cLayer4.box2dBody, cLayer6.box2dBody, 2, revoluteJoint, prismaticJoint);
}