/// <reference path="jquery-1.8.2.min.js" />
/// <reference path="lufylegend-1.8.6.min.js" />


(function ($, exp) {
    exp.onresize = function () {
        LGlobal.resize();
    }

    LGlobal.destroy = true; //保证游戏中的不用的对象能够顺利被释放
    //声明游戏变量
    exp.backLayer = null;
    exp.toolLayer = null;
    var loadingLayer, gameLayer, jewelsLayer, mapLayer, stationLayer;
    var stageSpeed = 20;
    exp.isAllowShoot = true;
    exp.addSpeedMultiple = 1;//加速倍数
    exp.userInfo = {
        PersonIndex: 1, money: 0,
        tools: { Clamp: 1, Excavator: 1, Nosecone: 1, Bomb: 17, MoreSpeed: 1, MoreTime: 6 }
    }
    exp.isHaveHit = false;
    var isPress = false;
    var conPostion = { conX: 0, conY: 0, firstX: 0 }//用于拖动地图
    exp.isBombStatus = false;
    exp.tool;//当前使用的工具
    exp.maxSwayAngle = 65;
    exp.jewelsIsGraspedList = [];
    //获取随机数
    exp.getRedom = function (minNum, maxNum) {
        switch (arguments.length) {
            case 1: return parseInt(Math.random() * minNum + 1);
            case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
            default: return 0;
        }
    }
    var imgData = interFace.imgData;//图片内容
    
    $(function () {
        init(30, "canvas", 720, 1280, main);//加载canvas
        var loader;
        var _stageSpeed = stageSpeed;
        function main() {
            LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
            LSystem.screen(LStage.FULL_SCREEN);
            //背景层初始化
            backLayer = new LSprite();

            //在背景层上绘制黑色背景
            backLayer.graphics.drawRect(1, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
            //var bitmapData = new LBitmapData(imglist["loading"]);
            //背景显示
            addChild(backLayer);
            //进度条读取层初始化
            loadingLayer = new LoadingSample2(50);
            //进度条读取层初始化
            backLayer.addChild(loadingLayer);
            //利用LLoadManager类，读取所有图片，并显示进度条进程
            LLoadManage.load(imgData, function (progress) {
                loadingLayer.setProgress(progress);
            }, gameInit);
        }
        //读取完所有图片，进行游戏标题画面的初始化工作
        function gameInit(result) {
            //取得图片读取结果
            imglist = result;
            //移除进度条层//移除或者这样写 loadingLayer.remove();
            backLayer.removeChild(loadingLayer);

            //var bitmap = new LBitmap(new LBitmapData(imglist["loading"]));
            //bitmap.y = 0; bitmap.x = 0;
            //backLayer.addChild(bitmap);

            loadingLayer = null;
            //显示游戏标题
            var title = new LTextField();
            title.y = 100; title.size = 26; title.color = "#ffffff"; title.text = "钻石大咖";
            title.x = (LGlobal.width - title.getWidth()) / 2;
            backLayer.addChild(title);
            //显示说明文字
            backLayer.graphics.drawRect(1, "#ffffff", [(LGlobal.width - 230) / 2, 235, 230, 40]);
            var txtClick = new LTextField();
            //alert(LGlobal.width +"---"+ txtClick.getWidth());
            txtClick.y = 240; txtClick.size = 18; txtClick.color = "#ffffff"; txtClick.text = "点击开始游戏";
            txtClick.x = (LGlobal.width - txtClick.getWidth()) / 2;
            backLayer.addChild(txtClick);

            

            //添加点击事件，点击画面则游戏开始
            backLayer.addEventListener(LMouseEvent.MOUSE_UP, function () { initMap(); });
            LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, function (event) {
                if (event.keyCode == 32) { initMap(); }
                
            });
        }
        
        //初始化地图和Bar等信息
        exp.initMap = function () {
            backLayer.die();
            backLayer.removeAllChild();
            mapLayer = new LSprite();
            mapLayer.addChild(new LBitmap(new LBitmapData(imglist["map"])));
            mapLayer.x = -400;
            //初始化顶条和底条
            interFace.initBar();
            for (var area in Area) {
                var area_1 = new LSprite();
                var array = [];
                for (var it in Area[area].polygon) {
                    var _arr = [Area[area].polygon[it].x, Area[area].polygon[it].y];
                    array.push(_arr);
                }
                area_1.graphics.drawVertices(2, "#ff0000", array, false, "#880088");
                mapLayer.addChild(area_1);
            }
            var mapLayerOut = new LSprite();
            mapLayerOut.width = LGlobal.width;
            mapLayerOut.addChild(mapLayer);
            backLayer.addChild(mapLayerOut);
            backLayer.addChild(topBar);
            backLayer.addChild(bottomBar);
            mapLayerOut.addEventListener(LMouseEvent.MOUSE_DOWN, function (event) {
                isPress = true;
                conPostion.firstX = event.selfX;
                conPostion.conX = event.selfX;
            });
            mapLayerOut.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
                isPress = false;
                if (mapLayer.x > 0) { mapLayer.x = 0; return; }
                if (mapLayer.x < -(mapLayer.getWidth() - LGlobal.width)) { mapLayer.x = -(mapLayer.getWidth() - LGlobal.width); return; }
                if (conPostion.firstX == event.selfX) {
                    //gameStart();
                    var clickArea = "Ocean";
                    for (var area in Area) {
                        if (Area[area].polygon.length == 0) { continue; }
                        if (isInArea({ x: event.selfX - mapLayer.x, y: event.selfY }, Area[area].polygon)) {
                            clickArea = area;
                            break;
                        }
                    }
                    if (interFace.isDailogModel) { return; }//防止二次打开对话框
                    var confirmDig = interFace.confirmDig(function () {
                        if (getRedom(1, 100) <= digProbability.successProbability) {
                            gameStart(clickArea);
                        } else {
                            var failureNoticePanel = null;
                            if (getRedom(1, 100) <= digProbability.punishProbability) {
                                //赏罚
                                var _index = getRedom(0, jewelsDigResultInfo.PenaltyInfo.length - 1);
                                //alert(jewelsDigResultInfo.PenaltyInfo[_index].info); 
                                failureNoticePanel = interFace.failureNotice(jewelsDigResultInfo.PenaltyInfo[_index].info);
                                var resultPrice = userMoneyLayer.value + jewelsDigResultInfo.PenaltyInfo[_index].price;
                                userInfo.money = resultPrice <= 0 ? 0 : resultPrice;
                                userMoneyLayer.setNumber((resultPrice <= 0 ? 0 : resultPrice), function () {
                                    var con = moneySign.x + moneySign.getWidth() + 10 - LGlobal.width;
                                    if (con >= 0) { moneySign.x -= con }
                                });
                            } else {
                                //显示知识
                                var _index = getRedom(0, jewelsDigResultInfo.Knowledge.length - 1);
                                //alert(jewelsDigResultInfo.Knowledge[_index]);
                                failureNoticePanel = interFace.failureNotice(jewelsDigResultInfo.Knowledge[_index]);
                            }
                            backLayer.addChild(failureNoticePanel);
                        }
                    }, function () { });
                    confirmDig.alpha = 0.5; confirmDig.scaleY = 0.8;
                    backLayer.addChild(confirmDig);
                }
            });
            mapLayerOut.addEventListener(LMouseEvent.MOUSE_MOVE, function (event) {
                if (isPress == true) {
                    if (mapLayer.x > 0) { mapLayer.x = 0; return; }
                    if (mapLayer.x < -(mapLayer.getWidth() - LGlobal.width)) { mapLayer.x = -(mapLayer.getWidth() - LGlobal.width); return; }
                    var con_x = event.selfX - conPostion.conX;
                    conPostion.conX = event.selfX;
                    mapLayer.x += con_x;
                }
            });
        }

        //游戏画面初始化
        function gameStart(digArea) {
            //背景层清空
            backLayer.die();//die函数表示移除所有的时间监听
            backLayer.removeAllChild();
            //背景图片显示
            gameLayer = new LSprite();//初始化游戏层
            toolLayer = new LSprite();//初始化工具层
            jewelsLayer = new LSprite();//初始化钻石层

            background = new Background(digArea);
            backLayer.addChild(background);
            gameLayer.addChild(toolLayer);
            backLayer.addChild(gameLayer);
            backLayer.addChild(jewelsLayer);

            tool = new Clamp();
            toolLayer.addChild(tool);
            toolLayer.addChild(tool.toolRope);
            toolLayer.rotate = 0;//  maxSwayAngle;//初始化最大角度
            toolLayer.x = LGlobal.width / 2;//夹子位置为中央
            toolLayer.y = 380;
            tool.run();

            backLayer.addChild(interFace.initBombAndTool());//初始化工具栏
            //alert(interFace.initBar);
            interFace.initBar("mainGame");
            backLayer.addChild(topBar);
            jewelsIsGraspedList = [];

            initJewels(jewelsLayer, digArea);//初始化钻石
            backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
            background.addEventListener(LMouseEvent.MOUSE_DOWN, function (event) {
                if (RemainingTimeLayer.value == 0) {
                    gameOver();
                } else {
                    if ((tool.toolActive == 1 || tool.toolActive == 2) && isAllowShoot) {
                        tool.toolActive = 3;
                        tool.run();
                    }
                }
            });
        }
        exp.gameOver = function () {
            //游戏时间到
            var allPrice = 0;
            for (var j in jewelsIsGraspedList) {
                allPrice += jewelsIsGraspedList[j].price;
            }
            if (confirm("您的挖掘时间已到，挖掘结果为：" + jewelsIsGraspedList.length + "颗钻石，共价值$" + allPrice + "元，您需要回到地图界面吗？")) {
                tool.stop();
                initMap();
            }
        }
        function onframe() {
            tool.updateTruePosition();
            for (var i in jewelsLayer.childList) {
                var _child = jewelsLayer.childList[i];
                _child.onframe();
                //这里注意一下两颗钻石同时发生碰撞，加一个变量检测
                if (hitTest(_child, tool, 40)) {
                    if (isHaveHit) return;
                    //发生碰撞
                    isHaveHit = true;
                    if (tool.toolActive == 3 && _child.isGrasped == false) {
                        _child.isGrasped = true;
                        LTweenLite.remove(tool.tweenRope);
                        LTweenLite.remove(tool.tweenShoot);
                        _child.hit();
                        LTweenLite.to(tool, 0.1, {
                            scaleX: 0.8, onComplete: function () {
                                LTweenLite.to(tool, 0.1, {
                                    scaleX: 1, onComplete: function () {
                                        //_child.graphics.clear();
                                        //_child.graphics.drawRect(2, "#ff0000", [0, 0, _child.getWidth() * _child.unscale, _child.getHeight() * _child.unscale]);
                                        if (_child instanceof Stone) {
                                            _child.setView();
                                            _child.isGrasped = false;
                                            if (isBombStatus) {
                                                //爆破处理
                                                isBombStatus = false;
                                                tool.setBomb();//再次执行则去掉bomb
                                                LTweenLite.remove(interFace.bombTween);
                                            }
                                        }
                                        self.toolActive = 5; self.run();
                                    }
                                });
                            }
                        });
                    }
                    break;
                }
            }
        }
        //扩展碰撞测试
        function hitTest(jewels, tool, tx) {
            var t = tx || 0;
            var wA = jewels.getWidth() / 2
             , wB = tool.getWidth() - 2 * t
             , hA = jewels.getHeight() / 2
             , hB = tool.getHeight()
             , xA = jewels.x + wA / 2
             , xB = tool.tx - (wB) / 2// tool.x + (LGlobal.width - wB) / 2 - x_con
             , yA = jewels.y
             , yB = tool.ty - hB / 2 //tool.y + 340 - hB / 2 - y_con;
            var minx = xA > xB ? xA : xB
            , miny = yA > yB ? yA : yB
            , maxx = (xA + wA) > (xB + wB) ? (xB + wB) : (xA + wA)
            , maxy = (yA + hA) > (yB + hB) ? (yB + hB) : (yA + hA);
            return minx <= maxx && miny <= maxy;
        }
        //处理抓到的钻石
        exp.dojewelsIsGrasped = function () {
            if (jewelsIsGrasped) {
                backLayer.addChild(interFace.confirmSuccess(jewelsIsGrasped,
                    function (jewels) { alert("建设中..."); },//购买
                    function (jewels) { alert("建设中..."); },//赠送
                    function (jewels) {
                        userMoneyLayer.setNumber(userMoneyLayer.value + jewels.price, function () {
                            var con = moneySign.x + moneySign.getWidth() + 10 - LGlobal.width;
                            if (con >= 0) { moneySign.x -= con }
                        });
                        userInfo.money = userMoneyLayer.value;
                    },
                    function () {}//选择后进行的动作
                ));//入库
                jewelsIsGraspedList.push(jewelsIsGrasped);
                jewelsIsGrasped.isGrasped = false;
                jewelsLayer.removeChild(jewelsIsGrasped);
                jewelsIsGrasped = null;
            }
        }
 
        //通过键盘事件来控制
        if (!LGlobal.canTouch) {//判断当前浏览器是电脑还是只能手机，即判断是否可以触屏
            LEvent.addEventListener(window, LKeyboardEvent.KEY_DOWN, down);//按下
            LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, up);//弹起
        }
        function up(event) {
            //alert(event.keyCode);
        }
        function down(event) {
            //alert(event.keyCode);
            if (event.keyCode == 37) {
                //man.moveType = "left";
            } else if (event.keyCode == 39) {
                //man.moveType = "right";
            } else if (event.keyCode == 38) {
                //man.moveType = "up";
            } else if (event.keyCode == 32) {
                //空格键
            } else if (event.keyCode == 13) {
                if (tool.toolActive == 1 || tool.toolActive == 2) {
                    tool.toolActive = 3;
                    tool.run();
                }
            }
        }
    });
    
})(jQuery, window);
