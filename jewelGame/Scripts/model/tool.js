/// <reference path="jquery-1.8.2.min.js" />
/// <reference path="lufylegend-1.8.6.min.js" />

(function ($, exp) {
    //工具类
    function Tool() {
        base(this, LSprite, []);
        var self = this;
        self.toolRope = new LSprite();
        self.toolRope.graphics.drawLine(7, "#272928", [0, 0, 0, 1]);//初始化绳索
        self.setView();
        self.shootSpeed = self.shootSpeed / addSpeedMultiple;
    }
    Tool.prototype.toolActive = 1;//1:右摆动状态,2左摆动状态,3:发状态,4:挖掘状态,5:收回状态
    Tool.prototype.toolActiveBeforeShoot = 1;//状态改变后的前一次状态记录，主要用于摆动判断
    Tool.prototype.swayAngle = 0;//摆动角度(其实就是toolLayer的角度)
    Tool.prototype.shootSpeed = 2;//发射速度，数值越大越慢
    Tool.prototype.backSpeed = 1;//回收速度
    Tool.prototype.swaySpeed = 2;//摆动速度，数值越大越慢
    Tool.prototype.maxDeep = 500;//最大可达深度
    Tool.prototype.toolRope;//工具绳子
    Tool.prototype.tween;//摆动缓动
    Tool.prototype.tweenShoot;//发射缓动
    Tool.prototype.tweenRope;//绳子拉长缓动
    Tool.prototype.tx = 0;//真实横坐标
    Tool.prototype.ty = 0;//真实纵坐标
    Tool.prototype.ENname = "";//英文名
    Tool.prototype.CHname = "";//中文名
    Tool.prototype.isDigTool = true;//是否是挖掘工具属性
    Tool.prototype.activate = function () {
        var self = this;
        toolLayer.rotate = 0;
        toolLayer.removeChild(tool);
        tool.stop();//要停止运行，不然会出事
        tool = self;
        toolLayer.addChild(tool);
        toolLayer.addChild(tool.toolRope);
        tool.run();
        tool.setBomb();//可能是爆破状态 
    }//道具具备的技能
    Tool.prototype.explain = "";
    Tool.prototype.price = 0;//价格
    Tool.bitmap;
    //获取摆动角度比例
    Tool.prototype.getSwayProportion = function () {
        self = this;
        var allSwayAngle = maxSwayAngle * 2;
        self.swayAngle = toolLayer.rotate;
        if (self.toolActiveBeforeShoot == 1)
            return self.swayAngle <= 0 ? ((-self.swayAngle + maxSwayAngle) / allSwayAngle) : (maxSwayAngle - self.swayAngle) / allSwayAngle;
        else
            return self.swayAngle <= 0 ? ((maxSwayAngle + self.swayAngle) / allSwayAngle) : (maxSwayAngle + self.swayAngle) / allSwayAngle;
    }
    Tool.prototype.run = function () {
        var self = this;
        var residueSwayProportion = 1 - self.getSwayProportion();//得到剩余的摆动比例
        if (self.toolActive == 1 || self.toolActive == 2) {
            //处理抓到的钻石
            isHaveHit = false;
            dojewelsIsGrasped();
        }
        if (self.toolActive == 1) {
            self.tween = LTweenLite.to(toolLayer, self.swaySpeed * residueSwayProportion, {
                rotate: -maxSwayAngle, onComplete: function () {
                    self.toolActive = self.toolActiveBeforeShoot = 2; self.run(); 
                }
            });
        } else if (self.toolActive == 2) {
            self.tween = LTweenLite.to(toolLayer, self.swaySpeed * residueSwayProportion, {
                rotate: maxSwayAngle, onComplete: function () {
                    self.toolActive = self.toolActiveBeforeShoot = 1; self.run();
                }
            });
        } else if (self.toolActive == 3) {
            LTweenLite.remove(self.tween);//摆动停止，开发发射

            jewelsIsGrasped = null;//清空夹具上面的钻石
            LTweenLite.remove(self.tweenRope);
            LTweenLite.remove(self.tweenShoot);
            self.tweenRope = LTweenLite.to(self.toolRope, self.shootSpeed, { scaleY: self.maxDeep });
            self.tweenShoot = LTweenLite.to(self, self.shootSpeed, {
                y: self.maxDeep, //ease: Strong.easeOut,
                onUpdate: function () {
                    //发射过程中检测碰撞
                },
                onComplete: function () {
                    //发射到底，检测碰撞
                    //LTweenLite.to(self, 0.5, { scaleX: 0.5 });
                    self.toolActive = 4; self.run();
                }
            });
        } else if (self.toolActive == 4) {
            //挖掘状态
            LTweenLite.to(self, 0.1, {
                scaleX: 0.8, onComplete: function () {
                    LTweenLite.to(self, 0.1, {
                        scaleX: 1, onComplete: function () { self.toolActive = 5; self.run(); }
                    });
                }
            });
        } else if (self.toolActive == 5) {
            LTweenLite.remove(self.tweenShoot);
            LTweenLite.remove(self.tweenRope);
            self.tweenRope = LTweenLite.to(self.toolRope, self.backSpeed, { scaleY: 1, ease: Strong.easeOut });
            self.tweenShoot = LTweenLite.to(self, self.backSpeed, {
                y: 0, ease: Strong.easeOut, onUpdate: function () {
                    //发射过程中检测碰撞
                }, onComplete: function () {
                    self.toolActive = self.toolActiveBeforeShoot;
                    self.run();
                    //alert(self.toolRope.scaleY);
                }
            });
        }
    }
    Tool.prototype.stop = function () {
        var self = this;
        LTweenLite.remove(self.tween);
        LTweenLite.remove(self.tweenShoot);
        LTweenLite.remove(self.tweenRope);
        removeChild(self);
    }
    Tool.prototype.updateTruePosition = function () {
        var self = this;
        var c = Math.PI / 180;
        var x_con = Math.sin(self.swayAngle * c) * self.toolRope.scaleY;
        var y_con = (1 - Math.cos(self.swayAngle * c)) * self.toolRope.scaleY;
        self.tx = LGlobal.width / 2 - x_con;
        self.ty = self.y + 380 - y_con;
    }
    Tool.prototype.onframe = function () { }
    Tool.prototype.setView = function () { }
    Tool.prototype.setBomb = function () {
        var self = this;
        if (isBombStatus) {
            var bombBitMap = new LBitmap(new LBitmapData(imglist["bomb"]));
            bombBitMap.rotate = 20;
            bombBitMap.x = -25;//-(bombBitMap.width / 2);
            bombBitMap.y = -30;
            bombBitMap.scaleX = bombBitMap.scaleY = 0.6;
            self.addChild(bombBitMap);
        } else {
            self.removeAllChild();
            self.addChild(self.bitmap);
        }
    }

    //夹子工具
    function Clamp() { base(this, Tool, []); var self = this; }
    Clamp.prototype.maxDeep = 400;
    Clamp.prototype.shootSpeed = 2;
    Clamp.prototype.ENname = "Clamp";
    Clamp.prototype.CHname = "锄头";
    Clamp.prototype.isDigTool = true;
    Clamp.prototype.setView = function () {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["clamp"]));//夹子
        self.bitmap.x = -(self.bitmap.width / 2);self.bitmap.y = -10;
        self.addChild(self.bitmap);
    }
    Clamp.prototype.explain = "抓手延伸至第一层";
    Clamp.prototype.price = 0;
    //挖掘机
    function Excavator() { base(this, Tool, []); var self = this; }
    Excavator.prototype.maxDeep = 600;
    Excavator.prototype.shootSpeed = 2.5;
    Excavator.prototype.ENname = "Excavator";
    Excavator.prototype.CHname = "挖掘机";
    Excavator.prototype.isDigTool = true;
    Excavator.prototype.setView = function () {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["clamp"]));
        self.bitmap.x = -(self.bitmap.width / 2); self.bitmap.y = -10;
        self.addChild(self.bitmap);
    }
    Excavator.prototype.explain = "抓手延伸至第二层";
    Excavator.prototype.price = 600000;
    //钻探机
    function Nosecone() { base(this, Tool, []); var self = this; }
    Nosecone.prototype.maxDeep = 900;
    Nosecone.prototype.shootSpeed = 3;
    Nosecone.prototype.ENname = "Nosecone";
    Nosecone.prototype.CHname = "钻探机";
    Nosecone.prototype.isDigTool = true;
    Nosecone.prototype.setView = function () {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["clamp"]));
        self.bitmap.x = -(self.bitmap.width / 2); self.bitmap.y = -10;
        self.addChild(self.bitmap);
    }
    Nosecone.prototype.explain = "抓手延伸至第三层";
    Nosecone.prototype.price = 1000000;
    //加速工具
    function MoreSpeed() { base(this, Tool, []); var self = this; }
    MoreSpeed.prototype.ENname = "MoreSpeed";
    MoreSpeed.prototype.CHname = "加速器";
    MoreSpeed.prototype.isDigTool = false;
    MoreSpeed.prototype.activate = function () {
        tool.shootSpeed = tool.shootSpeed / 2;//将发射速度增加2倍
        addSpeedMultiple = 2;//如果要一次使用全部道具都加速，需要使用这句代码
        interFace.addSpeedSign.alpha = 1;
        userInfo.tools.MoreSpeed--;
    }
    MoreSpeed.prototype.explain = "抓手发射速度增加一倍";
    MoreSpeed.prototype.price = 50000;
    //加时工具
    function MoreTime() { base(this, Tool, []); var self = this; }
    MoreTime.prototype.ENname = "MoreTime";
    MoreTime.prototype.CHname = "加时器";
    MoreTime.prototype.isDigTool = false;
    MoreTime.prototype.activate = function () {
        var _time = RemainingTimeLayer.value + 60;//加一分钟
        RemainingTimeLayer.value = _time;
        RemainingTimeLayer.setNumber(_time);
        interFace.addTimeSign.alpha = 1;
        userInfo.tools.MoreTime--;
    }
    MoreTime.prototype.explain = "增加60秒的挖掘时间";
    MoreTime.prototype.price = 30000;

    //炸弹
    function Bomb() { base(this, Tool, []); var self = this; }
    Bomb.prototype.ENname = "Bomb";
    Bomb.prototype.CHname = "炸弹";
    Bomb.prototype.isDigTool = false;
    Bomb.prototype.activate = function () { }
    Bomb.prototype.explain = "可以炸开石头";
    Bomb.prototype.price = 2000;

    exp.getToolByENname = function (name) {
        switch (name) {
            case "Clamp": return new Clamp(); break;
            case "Excavator": return new Excavator(); break;
            case "Nosecone": return new Nosecone(); break;
            case "MoreSpeed": return new MoreSpeed(); break;
            case "MoreTime": return new MoreTime(); break;
            case "Bomb": return new Bomb(); break;
        }
    }
    exp.Tool = Tool;
    exp.Clamp = Clamp;
    exp.Excavator = Excavator;
    exp.Nosecone = Nosecone;
    exp.MoreSpeed = MoreSpeed;
    exp.MoreTime = MoreTime;
    exp.Bomb = Bomb;
})(jQuery, window);