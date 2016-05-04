/// <reference path="lufylegend-1.8.6.min.js" />

(function (exp) {
    var result = {};
    exp.topBar = undefined, exp.bottomBar = undefined, exp.moneySign = undefined;
    exp.barBtu = { bar_toolShop: new LSprite(), bar_Ranklist: new LSprite(), bar_myTool: new LSprite(), bar_company: new LSprite() }
    //exp.bombLayer;
    exp.userMoneyLayer;
    exp.bombNumLayer;
    exp.personLayer;
    exp.RemainingTimeLayer;
    exp.defalutGameTime = 60;

    //倒计时管理
    result.timeCommand = {
        initTime: function (isInit) {
            if (isInit) {
                var colock = new LSprite(); RemainingTimeLayer = new Number(defalutGameTime, "2"); RemainingTimeLayer.x = 140; RemainingTimeLayer.y = 20;
                var multiply = new LBitmap(new LBitmapData(imglist["multiply"]));
                multiply.x = 110; multiply.y = 20;
                topBar.addChild(multiply);

                var colockBitmap = new LBitmap(new LBitmapData(imglist["colock"]));
                colock.addChild(colockBitmap); colock.x = 10; colock.y = 0;
                topBar.addChild(colock); topBar.addChild(RemainingTimeLayer);
                LTweenLite.to(colockBitmap, 0.3, { rotate: 15 }).to(colockBitmap, 0.6, { rotate: -15, loop: true }).to(colockBitmap, 0.6, { rotate: 15 });
            }
            if (RemainingTimeLayer.value == 0) { return;}//秒数为零时不可继续读秒
            result.countDown = window.setInterval(function () {
                var RemainingTime = RemainingTimeLayer.value - 1;
                RemainingTimeLayer.setNumber(RemainingTime, function () {
                    RemainingTimeLayer.value = RemainingTime;
                    if (RemainingTimeLayer.value == 0) {
                        window.clearInterval(result.countDown);
                    }
                });
            }, 1000);
        },
        beginCountDown: function () { this.initTime(false); },
        pauseCountDown: function () { window.clearInterval(result.countDown); }
    };
    //初始化顶条和底条
    result.initBar = function (type) {
        if (!topBar) { topBar = new LSprite(); } else { topBar.removeAllChild(); }
        if (!bottomBar) { bottomBar = new LSprite(); } else { bottomBar.removeAllChild(); }
        //topBar = new LSprite(); bottomBar = new LSprite();
        topBar.addChild(new LBitmap(new LBitmapData(imglist["topBar"])));
        moneySign = new LSprite();
        if (type == "mainGame") {
            result.timeCommand.initTime(true);
        } else {
            var head = new LSprite();
            head.addChild(new LBitmap(new LBitmapData(imglist["head_1"]))); head.x = 10; head.y = 3;
            head.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
                initMap();
            });
            topBar.addChild(head);
        }
        moneySign.addChild(new LBitmap(new LBitmapData(imglist["moneySign"]))); moneySign.y = 20;
        userMoneyLayer = new Number(userInfo.money); userMoneyLayer.x = 100; userMoneyLayer.y = 5;
        moneySign.x = LGlobal.width - moneySign.width - userMoneyLayer.width - 10;
        moneySign.addChild(userMoneyLayer);
        topBar.addChild(moneySign);

        bottomBar.addChild(new LBitmap(new LBitmapData(imglist["bottomBar"])));
        bottomBar.y = LGlobal.height - bottomBar.height + 20;
        barBtu.bar_toolShop.addChild(new LBitmap(new LBitmapData(imglist["bar_but1"]))); barBtu.bar_toolShop.y = 35;
        barBtu.bar_Ranklist.addChild(new LBitmap(new LBitmapData(imglist["bar_but2"]))); barBtu.bar_Ranklist.y = 35; barBtu.bar_Ranklist.x = 170;
        barBtu.bar_myTool.addChild(new LBitmap(new LBitmapData(imglist["bar_but3"]))); barBtu.bar_myTool.y = 35; barBtu.bar_myTool.x = 350;
        barBtu.bar_company.addChild(new LBitmap(new LBitmapData(imglist["bar_but4"]))); barBtu.bar_company.y = 35; barBtu.bar_company.x = 520;
        
        barBtu.bar_toolShop.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
            //商店界面
            result.initShop();
        });
        barBtu.bar_Ranklist.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
            //排行榜
        });
        barBtu.bar_myTool.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
            //工具栏
        });
        barBtu.bar_company.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
            //开公司
        });
        bottomBar.addChild(barBtu.bar_toolShop);
        bottomBar.addChild(barBtu.bar_Ranklist);
        bottomBar.addChild(barBtu.bar_myTool);
        bottomBar.addChild(barBtu.bar_company);
    }
    //初始化游戏界面的炸弹和挖掘工具栏
    result.initBombAndTool = function () {
        var weaponPanel = new LSprite();
        var bombLayer = new LSprite();
        bombLayer.addChild(new LBitmap(new LBitmapData(imglist["bomb"]))); bombLayer.y = 170; bombLayer.x = 50;
        weaponPanel.addChild(bombLayer);
        //炸初始化弹数量
        bombNumLayer = new Number(userInfo.tools.Bomb, "2");
        bombNumLayer.x = 170; bombNumLayer.y = 245;
        var multiply = new LSprite();
        multiply.addChild(new LBitmap(new LBitmapData(imglist["multiply"]))); multiply.x = 135; multiply.y = 245;
        weaponPanel.addChild(multiply);
        weaponPanel.addChild(bombNumLayer);
        bombLayer.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
            if (bombNumLayer.value == 0) { return; }
            if (!isBombStatus) {
                result.bombTween = LTweenLite.to(bombLayer, 0.2, { scaleX: 1.05, scaleY: 1.05 }).to(bombLayer, 0.4, { scaleX: 0.95, scaleY: 0.95, loop: true }).to(bombLayer, 0.2, { scaleX: 1.05, scaleY: 1.05 });
                isBombStatus = true;
            } else {
                LTweenLite.remove(result.bombTween);
                bombLayer.scaleX = bombLayer.scaleY = 1;
                isBombStatus = false;
            }
            tool.setBomb();
        });
        //初始化活动的工具
        result.activeToolLayer = new LSprite(); 
        result.activeToolBitmap = new LBitmap(new LBitmapData(imglist[tool.ENname]));
        result.activeToolBitmap.scaleX = result.activeToolBitmap.scaleY = 0.7;
        result.activeToolLayer.addChild(result.activeToolBitmap); result.activeToolLayer.y = 245; result.activeToolLayer.x = 570;
        weaponPanel.addChild(result.activeToolLayer);
        result.activeToolLayer.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
            if (interFace.isDailogModel) {//防止二次打开对话框
                backLayer.removeChild(result.chooseToolPanel);//关闭选择对话框
                result.isDailogModel = false;
                return;
            }
            if (RemainingTimeLayer.value == 0) {
                gameOver();
                return;
            }
            //更新工具图片和文字(参数为选中后的回发事件)
            result.chooseToolPanel = result.initToolsChoosePanel(function (chooseTool) {
                if (chooseTool.isDigTool) {
                    result.activeToolNameText.text = chooseTool.CHname;
                    result.activeToolLayer.removeChild(result.activeToolBitmap);
                    result.activeToolBitmap = new LBitmap(new LBitmapData(imglist[chooseTool.ENname]));
                    result.activeToolBitmap.scaleX = result.activeToolBitmap.scaleY = 0.7;
                    result.activeToolLayer.addChild(result.activeToolBitmap);
                }
                chooseTool.activate();//应用选中的工具技能
                backLayer.removeChild(result.chooseToolPanel);//关闭选择对话框
                result.isDailogModel = false;
            });
            backLayer.addChild(result.chooseToolPanel);
        });
        //加速器和加时器
        result.addSpeedSign = new LBitmap(new LBitmapData(imglist["MoreSpeed"]));
        result.addTimeSign = new LBitmap(new LBitmapData(imglist["MoreTime"]));
        result.addSpeedSign.x = 630; result.addTimeSign.x = 570;
        result.addSpeedSign.y = result.addTimeSign.y = 150;
        result.addSpeedSign.scaleX = result.addSpeedSign.scaleY = 0.4;
        result.addTimeSign.scaleX = result.addTimeSign.scaleY = 0.4;
        result.addSpeedSign.alpha = result.addTimeSign.alpha = 0;//默认为透明
        weaponPanel.addChild(result.addSpeedSign);
        weaponPanel.addChild(result.addTimeSign);

        //初始化活动工具名称
        result.activeToolNameText = result.initTextField(tool.CHname, "#ffe492", "24", 570, 355); //new LTextField();
        weaponPanel.addChild(result.activeToolNameText);
        return weaponPanel;
    }
    //初始化操作台
    result.initDigStation = function () {
        var station = new LSprite();
        station.addChild(new LBitmap(new LBitmapData(imglist["stationBg"])));

        personLayer = new LSprite();
        personLayer.addChild(new LBitmap(new LBitmapData(imglist["person_" + userInfo.PersonIndex])));
        personLayer.x = (LGlobal.width - personLayer.width) / 2 + 100; personLayer.y = 150;
        station.addChild(personLayer);
        var shootPlatform = new LBitmap(new LBitmapData(imglist["shootPlatform"]));
        shootPlatform.x = (LGlobal.width - shootPlatform.width) / 2; shootPlatform.y = 330;
        station.addChild(shootPlatform);
        return station;
    }
    result.isDailogModel = false;
    //询问是否挖掘
    result.confirmDig = function (trueFn, falseFn) {
        var confirmDigBg = new LSprite();
        confirmDigBg.addChild(new LBitmap(new LBitmapData(imglist["isDigBg"])));
        confirmDigBg.x = (LGlobal.width - confirmDigBg.getWidth()) / 2;
        confirmDigBg.y = (LGlobal.height - confirmDigBg.getHeight()) / 2;

        var trueBtu = new LSprite(); var falseBtu = new LSprite();
        trueBtu.addChild(new LBitmap(new LBitmapData(imglist["isDig_True"])));
        falseBtu.addChild(new LBitmap(new LBitmapData(imglist["isDig_False"])));
        falseBtu.x = confirmDigBg.width - falseBtu.getWidth() - 20;
        trueBtu.y = falseBtu.y = (confirmDigBg.height + 80) / 2;falseBtu.y += 10;
        confirmDigBg.addChild(trueBtu);
        confirmDigBg.addChild(falseBtu);
        trueBtu.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
            confirmDigBg.remove();
            if (trueFn) trueFn();
            result.isDailogModel = false;
        });
        falseBtu.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
            LTweenLite.to(confirmDigBg, 0.2, {
                alpha: 0, onComplete: function () {
                    confirmDigBg.remove();
                    result.isDailogModel = false;
                }
            });
            if (falseFn) falseFn();
        });
        result.isDailogModel = true;
        LTweenLite.to(confirmDigBg, 0.2, { alpha: 1, scaleY: 1 });
        return confirmDigBg;
    }
    //否定挖掘的提示
    result.failureNotice = function (word,clickFn) {
        var _failureNotice = new LSprite();
        _failureNotice.addChild(new LBitmap(new LBitmapData(imglist["failureNotice"])));
        var textPanel = new LSprite();

        var title = result.initTextField(word, "#ffffff", "24", 0, 0);
        title.width = 420; 
        textPanel.x = (_failureNotice.getWidth() - title.width) / 2 - 40;
        textPanel.y = 500;
        title.setWordWrap(true, 40);
        textPanel.addChild(title);
        _failureNotice.addChild(textPanel);

        _failureNotice.x = (LGlobal.width - _failureNotice.getWidth()) / 2;
        _failureNotice.y = (LGlobal.height - _failureNotice.getHeight()) / 2;
        _failureNotice.addEventListener(LMouseEvent.MOUSE_UP, function (event) {
            LTweenLite.to(_failureNotice, 0.2, {
                alpha: 0, onComplete: function () {
                    _failureNotice.remove();
                    if (clickFn) clickFn();
                }
            });
        });
        return _failureNotice;
    }
    //初始化用户所有的工具
    result.initToolsChoosePanel = function (callBack) {
        result.isDailogModel = true;
        isAllowShoot = false;
        var panel = new LSprite(); 
        var lineNum = 1, listNum = 0;
        for (var tools in userInfo.tools) {
            if (tools == "Bomb") { continue; }//炸弹不予显示在工具栏中了
            lineNum++; 
            if (listNum == 1) { listNum = 0} else { listNum++; }
            var _toolPanel = new LSprite();
            _toolPanel.addChild(new LBitmap(new LBitmapData(imglist["chooseBg"])));
            var pic = new LBitmap(new LBitmapData(imglist[tools])); pic.x = 30; pic.y = 10;
            _toolPanel.addChild(pic);
            _toolPanel.x = ((_toolPanel.getWidth()+100) * listNum);
            _toolPanel.y = (_toolPanel.getHeight() + 50) * parseInt((lineNum / 2));
            _toolPanel.chooseTool = getToolByENname(tools);
            var _text = result.initTextField("", "#ffe492", "24",0, 160);
            _text.text = _toolPanel.chooseTool.isDigTool ? _toolPanel.chooseTool.CHname : _toolPanel.chooseTool.CHname + "(" + userInfo.tools[tools] + ")";
            _text.x = (_toolPanel.getWidth() - _text.getWidth()) / 2;
            _toolPanel.addChild(_text);
            if (parseInt(userInfo.tools[tools]) == 0) {//如果没有数量了，就显示禁用
                _toolPanel.addChild(new LBitmap(new LBitmapData(imglist["chooseBgNo"])));
            } else {
                _toolPanel.addEventListener(LMouseEvent.MOUSE_DOWN, function (event) {
                    callBack(event.clickTarget.chooseTool);
                    isAllowShoot = true;
                });
            }
            panel.addChild(_toolPanel);
        }
        panel.y = 150;
        panel.x = (LGlobal.width - panel.getWidth()) / 2;
        return panel;
    }
    //挖到钻石选中对话框
    result.confirmSuccess = function (jewel, buyFn, giveFn, inStrorageFn, afterChoosedFn) {
        result.isDailogModel = true;
        isAllowShoot = false;
        result.timeCommand.pauseCountDown();
        var confirmSuccessBg = new LSprite();
        confirmSuccessBg.addChild(new LBitmap(new LBitmapData(imglist["success_bg"])));
        confirmSuccessBg.y = (LGlobal.height - confirmSuccessBg.getHeight()) / 2;

        confirmSuccessBg.addChild(result.initTextField("重量:" + jewel.carat + "CT", "#ffffff", "24", 100, 430));
        confirmSuccessBg.addChild(result.initTextField("颜色:" + jewel.color, "#ffffff", "24", 360, 430));
        confirmSuccessBg.addChild(result.initTextField("净度:" + jewel.clarity, "#ffffff", "24", 100, 480));
        confirmSuccessBg.addChild(result.initTextField("切工:" + jewel.cut, "#ffffff", "24", 360, 480));
        var price = new Number(jewel.price); price.x = 160; price.y = 550; price.scaleX = price.scaleY = 1.5;
        confirmSuccessBg.addChild(price);
        var btuBuy = new LSprite(); var btuGive = new LSprite(); var btuIn = new LSprite();
        btuBuy.addChild(new LBitmap(new LBitmapData(imglist["btu_buy"]))); btuBuy.x = 380; btuBuy.y = 550;
        btuGive.addChild(new LBitmap(new LBitmapData(imglist["btu_give"]))); btuGive.x = 100; btuGive.y = 660;
        btuIn.addChild(new LBitmap(new LBitmapData(imglist["btu_InStrorage"]))); btuIn.x = 360; btuIn.y = 660;
        var choosedFn = function () {
            isAllowShoot = true;
            result.isDailogModel = false;
            result.timeCommand.beginCountDown();
            if (afterChoosedFn) afterChoosedFn.apply(confirmSuccessBg);
            backLayer.removeChild(confirmSuccessBg);
        }
        btuBuy.addEventListener(LMouseEvent.MOUSE_UP, function () { if (buyFn) buyFn.apply(confirmSuccessBg, [jewel]); choosedFn(); });
        btuGive.addEventListener(LMouseEvent.MOUSE_UP, function () { if (giveFn) giveFn.apply(confirmSuccessBg, [jewel]); choosedFn(); });
        btuIn.addEventListener(LMouseEvent.MOUSE_UP, function () { if (inStrorageFn) inStrorageFn.apply(confirmSuccessBg, [jewel]); choosedFn(); });
        confirmSuccessBg.addChild(btuBuy); confirmSuccessBg.addChild(btuGive); confirmSuccessBg.addChild(btuIn);
        return confirmSuccessBg;
    }
    //加入工具到面板（做显示）,可用于商店和工具栏
    result.addToolToPanel = function (tool, lineIndex, listIndex, isMytool, clickFn) {
        var toolPanelItem = new LSprite();
        toolPanelItem.addChild(new LBitmap(new LBitmapData(imglist["toolBg"])));//加载tool背景
        toolPanelItem.addChild(result.initTextField(tool.CHname, "#ffe492", "24", toolPanelItem.getWidth(), 10, true));//加载中文名称
        var toolPic = new LBitmap(new LBitmapData(imglist[tool.ENname])); toolPic.x = (toolPanelItem.getWidth() - toolPic.getWidth()) / 2; toolPic.y = 50;
        toolPanelItem.addChild(toolPic);//加载图片
        if (isMytool) {
            var toolSum = new LSprite(); toolSum.addChild(new LBitmap(new LBitmapData(imglist["multiply"])));
            for (var item in userInfo.tools) {
                if (tool.ENname == item) {
                    var UserToolSum = new Number(userInfo.tools[item]); UserToolSum.x = 30; UserToolSum.y = 2;
                    toolSum.addChild(UserToolSum);
                    toolPanelItem.addChild(toolSum);
                    break;
                }
            }
        } else {
            var toolPrice = new LSprite(); toolPrice.addChild(new LBitmap(new LBitmapData(imglist["moneySign3"])));
            var price = new Number(tool.price); price.x = 30; price.y = 2;
            toolPrice.addChild(price);; toolPrice.y = 205; toolPrice.x = (toolPanelItem.getWidth() - toolPrice.getWidth()) / 2;
            toolPanelItem.addChild(toolPrice);
        }
        toolPanelItem.addChild(result.initTextField(tool.explain, "#ffffff", "18", toolPanelItem.getWidth(), 260, true));//加载说明
        toolPanelItem.x = (lineIndex - 1) * toolPanelItem.getWidth() + lineIndex * 50;
        toolPanelItem.y = ((listIndex - 1) * toolPanelItem.getHeight() + listIndex * 25) + 170;
        toolPanelItem.addEventListener(LMouseEvent.MOUSE_UP, function () { clickFn(tool); });
        return toolPanelItem;
    }
    //加载道具店
    result.initShop = function () {
        var panel = initStaticPanel(1);
        var toolsPanel = new LSprite();
        toolsPanel.addChild(result.addToolToPanel(new Excavator(), 1, 1, false, function (chooseTool) { alert(chooseTool.CHname); }));
        toolsPanel.addChild(result.addToolToPanel(new Nosecone(), 2, 1, false, function (chooseTool) { alert("dd"); }));
        toolsPanel.addChild(result.addToolToPanel(new MoreSpeed(), 1, 2, false, function (chooseTool) { alert("dd"); }));
        toolsPanel.addChild(result.addToolToPanel(new MoreTime(), 2, 2, false, function (chooseTool) { alert("dd"); }));
        toolsPanel.addChild(result.addToolToPanel(new Bomb(), 1, 3, false, function (chooseTool) { alert("dd"); }));

        //var Scrollbar = new LScrollbar(toolsPanel, 660, 800); Scrollbar.y = 300; Scrollbar.x = 20;
        panel.addChild(toolsPanel);
    }
    
    //加载静态管理面板背景
    var initStaticPanel = function (panelIndex) {
        backLayer.die();
        backLayer.removeAllChild();
        var panel = new LSprite();
        //panel.addChild(new LBitmap(new LBitmapData(imglist["staticBg"])));
        panel.graphics.beginBitmapFill(new LBitmapData(imglist["staticBg"]));
        panel.graphics.drawRect(0, "#000", [0, 0, 720 * panelIndex, 1280]);
        backLayer.addChild(panel);
        result.initBar();
        backLayer.addChild(topBar);
        backLayer.addChild(bottomBar);
        return panel;
    }

    //文字封装
    result.initTextField = function (text, color, size, x, y, iscenter) {
        var _text = new LTextField();
        _text.text = text; _text.color = color; _text.size = size;
        if (iscenter) _text.x = (x - _text.getWidth()) / 2; else _text.x = x;
        _text.y = y;
        return _text;
    }
    //背景对象
    function Background(imgName) {
        base(this, LSprite, []);
        var self = this;
        self.bitmapData = new LBitmapData(imglist[imgName]); self.bitmap = new LBitmap(self.bitmapData); self.bitmap.y = 0;
        self.addChild(self.bitmap);
        //加载操作台（为了解决钻石拉到顶被遮挡的问题，只能将工作台加到背景层中）
        self.addChild(interFace.initDigStation());
    }
    //加载背景层(包含任务和道具类)
    Background.prototype.onframe = function () { }
    function Number(num, sharpType) {
        base(this, LSprite, []);
        var self = this;
        self.sharpType = sharpType || "1";
        self.setView(num);
        self.value = num;
    }
    Number.prototype.value = 0;
    Number.prototype.changeSpeed = 0.1;
    Number.prototype.spacing = 0;//数字间隔
    Number.prototype.scale = 1;//放大倍数
    Number.prototype.sharpType = "1";//数字图形类别
    Number.prototype.setView = function (num) {
        var self = this;
        var digit = (num + "").split("");
        var spriteWrap = new LSprite();
        spriteWrap.x = 0;
        for (var i = 0; i < digit.length; i++) {
            var sprite = new LSprite();
            var num = parseInt(digit[i]); 
            sprite.addChild(new LBitmap(new LBitmapData(imglist["number" + self.sharpType + "_" + num])));
            sprite.scaleX = sprite.scaleY = self.scale;
            spriteWrap.y = sprite.height / 2;
            sprite.y = -sprite.height / 2;
            sprite.x = spriteWrap.getWidth() + self.spacing;//i * (sprite.width * self.scale + self.spacing);
            spriteWrap.addChild(sprite);
            self.addChild(spriteWrap);
        }
    }
    Number.prototype.setNumber = function (num,callBack) {
        var self = this;
        self.value = num;
        var spriteWrap = self.getChildAt(0);
        LTweenLite.to(spriteWrap, self.changeSpeed, {
            scaleY: 0, onComplete: function () {
                self.removeAllChild();
                self.setView(num);
                spriteWrap = self.getChildAt(0);
                spriteWrap.scaleY = 0;
                LTweenLite.to(spriteWrap, self.changeSpeed, {
                    scaleY: 1, onComplete: function () { if (callBack) callBack.call(self); }
                });
            }
        });
    }
    exp.Number = Number;
    exp.Background = Background;
    //图片资源
    (function () {
        result.imgData = new Array(
            { name: "head_1", path: "Content/img/Person/head_1.png" },
            { name: "person_1", path: "Content/img/Person/person_1.png" },

            { name: "map", path: "Content/img/Background/map.png" },
            { name: "Africa", path: "Content/img/Background/Africa.png" },
            { name: "Ocean", path: "Content/img/Background/Ocean.png" },
            { name: "America", path: "Content/img/Background/America.png" },
            { name: "Asian", path: "Content/img/Background/Asian.png" },
            { name: "Europe", path: "Content/img/Background/Europe.png" },
            { name: "Oceania", path: "Content/img/Background/Europe.png" },
            { name: "success_bg", path: "Content/img/Background/success_bg.png" },
            //{ name: "staticBg", path: "Content/img/Background/staticBg.png" },

            { name: "topBar", path: "Content/img/Background/topBar_bg.png" },
            { name: "moneySign", path: "Content/img/Background/moneySign.png" },
            { name: "bottomBar", path: "Content/img/Background/bottomBar_bg.png" },
            { name: "loading", path: "Content/img/Background/loading.png" },
            { name: "stationBg", path: "Content/img/Background/StationBg.png" },
            { name: "staticBg", path: "Content/img/Background/staticBg_1.gif" },
            { name: "toolBg", path: "Content/img/Background/toolBg.png" },

            { name: "bar_but1", path: "Content/img/design/bar_but_01.png" },
            { name: "bar_but2", path: "Content/img/design/bar_but_02.png" },
            { name: "bar_but3", path: "Content/img/design/bar_but_03.png" },
            { name: "bar_but4", path: "Content/img/design/bar_but_04.png" },
            { name: "isDigBg", path: "Content/img/design/isDigBg.png" },
            { name: "isDig_False", path: "Content/img/design/isDig_False.png" },
            { name: "isDig_True", path: "Content/img/design/isDig_True.png" },
            { name: "failureNotice", path: "Content/img/design/failureNotice.png" },
            { name: "bombEffect", path: "Content/img/design/bombEffect.png" },
            { name: "colock", path: "Content/img/design/colock.png" },

            { name: "btu_buy", path: "Content/img/button/btu_buy.png" },
            { name: "btu_give", path: "Content/img/button/btu_give.png" },
            { name: "btu_InStrorage", path: "Content/img/button/btu_InStrorage.png" },

            { name: "bomb", path: "Content/img/Tool/bomb.png" },
            { name: "clamp", path: "Content/img/Tool/clamp.png" },
            { name: "shootPlatform", path: "Content/img/Tool/shootPlatform.png" },
            { name: "Bomb", path: "Content/img/Tool/tool_bomb.png" },
            { name: "Clamp", path: "Content/img/Tool/tool_clamp.png" },
            { name: "Excavator", path: "Content/img/Tool/tool_excavator.png" },
            { name: "Nosecone", path: "Content/img/Tool/tool_nosecone.png" },
            { name: "MoreSpeed", path: "Content/img/Tool/tool_moreSpeed.png" },
            { name: "MoreTime", path: "Content/img/Tool/tool_moreTime.png" },

            { name: "chooseBg", path: "Content/img/Tool/tool_chooseBg.png" },
            { name: "chooseBgNo", path: "Content/img/Tool/tool_chooseBgNo.png" },
            

            { name: "jewels_1", path: "Content/img/Jewels/jewels_1.png" },
            { name: "jewels_2", path: "Content/img/Jewels/jewels_2.png" },
            { name: "jewels_3", path: "Content/img/Jewels/jewels_3.png" },
            { name: "stone", path: "Content/img/Jewels/stone.png" },
            { name: "stone2", path: "Content/img/Jewels/stone2.png" },

            { name: "moneySign2", path: "Content/img/number/moneySign.png" },
            { name: "moneySign3", path: "Content/img/number/moneySign3.png" },
            { name: "number", path: "Content/img/number/number.png" },
            { name: "multiply", path: "Content/img/number/multiply.png" },
            { name: "number1_0", path: "Content/img/number/number_0.png" },
            { name: "number1_1", path: "Content/img/number/number_1.png" },
            { name: "number1_2", path: "Content/img/number/number_2.png" },
            { name: "number1_3", path: "Content/img/number/number_3.png" },
            { name: "number1_4", path: "Content/img/number/number_4.png" },
            { name: "number1_5", path: "Content/img/number/number_5.png" },
            { name: "number1_6", path: "Content/img/number/number_6.png" },
            { name: "number1_7", path: "Content/img/number/number_7.png" },
            { name: "number1_8", path: "Content/img/number/number_8.png" },
            { name: "number1_9", path: "Content/img/number/number_9.png" },
            { name: "number2_0", path: "Content/img/number/number2_0.png" },
            { name: "number2_1", path: "Content/img/number/number2_1.png" },
            { name: "number2_2", path: "Content/img/number/number2_2.png" },
            { name: "number2_3", path: "Content/img/number/number2_3.png" },
            { name: "number2_4", path: "Content/img/number/number2_4.png" },
            { name: "number2_5", path: "Content/img/number/number2_5.png" },
            { name: "number2_6", path: "Content/img/number/number2_6.png" },
            { name: "number2_7", path: "Content/img/number/number2_7.png" },
            { name: "number2_8", path: "Content/img/number/number2_8.png" },
            { name: "number2_9", path: "Content/img/number/number2_9.png" });
    })();
    exp.interFace = result;
})(window);