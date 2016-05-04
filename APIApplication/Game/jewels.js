/// <reference path="jquery-1.8.2.min.js" />
/// <reference path="lufylegend-1.8.6.min.js" />


(function ($, exp) {
    
    exp.jewelsIsGrasped = null;//被抓到的钻石
    
    //钻石父类
    function Jewels() {
        base(this, LSprite, []); var self = this;
        self.setView();
        self.scaleX = self.scaleY = self.scale;//先缩小一倍
        self.addChild(self.bitmap);
    }
    Jewels.prototype.hit = function () {
        var self = this;
        if (isBombStatus) {
            //如果爆破状态碰到钻石不做处理，直接回去
            self.isGrasped = false;
        } else { jewelsIsGrasped = self;}
    }
    Jewels.prototype.setView = function () { }
    Jewels.prototype.onframe = function () {
        var self = this;
        
        if (self.isGrasped) { console.log(self.isGrasped); }
        if (self.isGrasped && jewelsIsGrasped != null) {
            
            var c = Math.PI / 180;
            var halfWidth = (self.getWidth() * self.unscale) / 2;
            self.rotate = tool.swayAngle;
            var n = tool.swayAngle > 0 ? -1 : 1;
            self.x = tool.tx - (Math.cos(tool.swayAngle * c) * halfWidth / 2);
            self.y = tool.ty + Math.sin(Math.abs(tool.swayAngle) * c) * halfWidth / 2 * n;
        }
    }
    Jewels.prototype.isGrasped = false;
    Jewels.prototype.number = "12345678";
    Jewels.prototype.carat = 0.5;//重量
    Jewels.prototype.color = "K";
    Jewels.prototype.clarity = "SI2";//净度
    Jewels.prototype.cut = "VG";
    Jewels.prototype.polish = "GD";
    Jewels.prototype.symmetry = "VG";//对称度,VG/EX/GD
    Jewels.prototype.size = { minWidth: 5.15, maxWidth: 5.17, height: 3.10 }
    Jewels.prototype.certificate = "GIA";
    Jewels.prototype.price = 7900;
    Jewels.prototype.scale = 0.5;//初始值缩小0.5
    Jewels.prototype.unscale = 2;//缩小值的倒数，用于还原原始宽度

    exp.initJewels = function (jewelsLayer, bgIndex) {
        var area = Area[bgIndex];
        //处理每层钻石
        //每一层的起始深度(每一层为3*8个方格)
        for (var item in area) {
            var floor = area[item];
            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 3; j++) {
                    //给点位移误差
                    var error_x = getRedom(-20, 20);
                    var error_y = getRedom(-20, 20);
                    var _x = 90 * i + error_x; var _y = 95 * j + floor.deep + error_y;
                    var jewels = null;
                    if (getRedom(1, 100) <= floor.floorProbability) {
                        var redom = getRedom(1, 3);
                        switch (redom) {
                            case 1: jewels = new Jewels_1(); break;
                            case 2: jewels = new Jewels_2(); break;
                            case 3: jewels = new Jewels_3(); break;
                        }
                    }
                    if (getRedom(1, 100) <= floor.stonProbability && jewels == null) {
                        jewels = new Stone();
                    }
                    if (!jewels) { continue; }
                    var redomScale = getRedom(7, 10);
                    jewels.scale = redomScale / 10;
                    jewels.unscale = 2 * (10 / redomScale);
                    jewels.rotate = getRedom(-20, 20);
                    jewels.scaleX = jewels.scaleY = 0.5 * jewels.scale;// redomScaleIndex;
                    jewels.x = _x; jewels.y = _y;
                    jewelsLayer.addChild(jewels);
                }
            }
        }
    }
    //石头
    function Stone() {
        base(this, Jewels, []); var self = this;
        self.setView();
        //self.addChild(self.bitmap);
    }
    exp.Stone = Stone;
    Stone.prototype.scale = 1;
    Stone.prototype.setView = function () {
        var self = this;
        self.removeAllChild();
        self.bitmap = new LBitmap(new LBitmapData(imglist["stone"]));
        self.addChild(self.bitmap);
        if (isBombStatus) {
            self.removeChild(self.bitmap);
            var bombWrap = new LSprite();
            self.bitmap = new LBitmap(new LBitmapData(imglist["bombEffect"]));
            bombWrap.addChild(self.bitmap);
            self.bitmap.x = -self.bitmap.getWidth() / 2;
            self.bitmap.y = -self.bitmap.getHeight() / 2;
            bombWrap.x = 70; bombWrap.y = 30;
            self.addChild(bombWrap);
            bombWrap.scaleX = bombWrap.scaleY = 0.9;
            LTweenLite.to(bombWrap, 0.3, {
                scaleX: 1, scaleY: 1, onComplete: function () {
                    self.remove();
                    bombNumLayer.setNumber(bombNumLayer.value - 1);
                    userInfo.tools.Bomb--;
                }
            });
        }
    }
    Stone.prototype.hit = function () {
        var self = this;
        if (!isBombStatus) {
            //爆破处理
            self.bitmap = new LBitmap(new LBitmapData(imglist["stone2"]));
            self.addChild(self.bitmap);
        }
    }

    //示例钻石
    function Jewels_1() { base(this, Jewels, []); var self = this; }
    exp.Jewels_1 = Jewels_1;
    Jewels_1.prototype.number = "49509214";
    Jewels_1.prototype.carat = 0.5;
    Jewels_1.prototype.color = "K";
    Jewels_1.prototype.clarity = "SI2";
    Jewels_1.prototype.cut = "VG";
    Jewels_1.prototype.polish = "GD";
    Jewels_1.prototype.symmetry = "VG";
    Jewels_1.prototype.size = { minWidth: 5.15, maxWidth: 5.17, height: 3.10 }
    Jewels_1.prototype.certificate = "GIA";
    Jewels_1.prototype.price = 7900;
    Jewels_1.prototype.setView = function () {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["jewels_1"]));
    }

    function Jewels_2() { base(this, Jewels, []); var self = this; }
    exp.Jewels_2 = Jewels_2;
    Jewels_2.prototype.number = "49925108";
    Jewels_2.prototype.carat = 0.51;
    Jewels_2.prototype.color = "L";
    Jewels_2.prototype.clarity = "SI2";
    Jewels_2.prototype.cut = "VG";
    Jewels_2.prototype.polish = "VG";
    Jewels_2.prototype.symmetry = "VG";
    Jewels_2.prototype.size = { minWidth: 5.08, maxWidth: 5.11, height: 3.14 }
    Jewels_2.prototype.certificate = "GIA";
    Jewels_2.prototype.price = 8467;
    Jewels_2.prototype.setView = function () {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["jewels_2"]));
    }

    function Jewels_3() { base(this, Jewels, []); var self = this; }
    exp.Jewels_3 = Jewels_3;
    Jewels_3.prototype.setView = function () {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["jewels_3"]));
    }
    
    var Knowledge = new Array(
    "钻石价格是按克拉（Carat）计价的，简称卡，一卡等于0.2克。",
    "钻石硬度为10，是目前已知最硬的矿物，绝对硬度是水晶的1000倍，蓝宝石的150倍。",
    "某些钻石具有发光性，日光照射后 ，夜晚能发出淡青色磷光，也是夜明珠的一种。",
    "钻石产量前五位的国家是澳大利亚、扎伊尔、博茨瓦纳、俄罗斯、南非。",
    "最好的钻石来自于纳米比亚冲积矿床中开采出来的钻石。",
    "3000年前，印度是钻石的唯一产地，历史上许多著名钻石如光明之山（kohi-noor）、奥尔洛夫（orloff）和大莫卧儿（great mogul）都来自印度。",
    "澳大利亚钻石主要分布西澳新南威尔斯的bingara和copeton，尤其是阿盖尔（argle）矿床储量为5．5亿克拉。",
    "博茨瓦纳盛产优质金刚石，宝石级占50%，著名的矿区有orapa岩筒、letihakena岩筒和jwaneng钻矿。",
    "俄罗斯的钻石主要分布在西伯利亚中部雅库特地区。",
    "听说加拿大北部地区发现了大量的金伯利岩，去那里试试吧。",
    "全世界第一座钻石矿命名为“库力斯堡矿”也叫“新热潮矿”。",
    "五十几年前，南非的钻石产量居世界首位，但现在矿藏逐渐枯竭，产量只占世界总产量的10%左右。",
    "中国现存发现的最大钻石为常林钻石，于1977年12月21日发现于山东，由常林大队魏振芳发现。",
    "常林钻石重158.786克拉，呈八面体，质地洁净、透明，淡黄色。",
    "中国最大的钻石曾是金鸡钻石，重281.25克拉，但在二战期间被日军掠走，至今下落不明。",
    "世界最大的钻石库利南（cullinan）。1905年1月21日发现于南非普利米尔矿山。它纯净透明，带有淡蓝色调，重3106克拉。",
    "库稀努尔(kohinur)是世界上已知最古老的钻石.相传早在13世纪时发现于印度著名的古钻石矿区——哥尔负达。原石重约800克拉，被称为“库稀努尔”。",
    "1克拉等于0.2克，它的次一级单位为“分”，1克拉等于100分。",
    "大于1克拉的钻石可用于投资，具备一定的保值、增值能力。",
    "钻石重量是分级计价的，一个级别的价差有时会达到1000元甚至更多。",
    "钻石的质量好坏取决于钻石的4C标准，它包括钻石的克拉重、净度、色级、和切工。",
    "钻石顶级颜色是D色，依次往下排列到Z，D-F是无色级别，G-J是近无色级别，从K往下基本没有收藏意义，K色以下的戒托做黄金的也很漂亮。",
    "彩色的钻石，有：黄色、绿色、蓝色、褐色、粉红色、橙色、红色、黑色、紫色等，属于钻石中珍品，价格昂贵。红钻最为名贵.",
    "净度分级依据是内含物位置，大小和数量的不同来划分．由高到低详细可分为FL,IF,VVS1,VVS2,VS 1,VS2,SI1,SI2,P1,P2.低于SI2肉眼就能看到钻石里的杂质。",
    "切工分为切割比例，抛光，修饰度三项。每一项都有五个级别，由高到低依次是EXCELLENT,VERY GOOD,GOOD,FAIR,POOR.一般所见钻石都是标准圆钻型切工。",
    "三项EX(EXCELLENT）切工价钱会稍微贵一些，因为它的出成率比较低，比不是三项EX切工的价钱高5%~15%左右，但三项EX的石头色彩绝对是最绚丽的．",
    "若钻石留有天然面，天然面上有机会发现到钻石独有的『三角形生长纹』",
    "国际钻石权威三大证书是：GIA,IGI,HRD.其中GIA标准的权威性最高，得到最广泛的认同。",
    "天然钻石98%都是无色—浅黄系列。所以彩钻是非常稀有的。 ",
    "钻石的颜色中D色最漂亮，等级最高，按照英文字母的排列顺序等级逐级下降，从D,E,F,G,H,I,J,K等。",
    "A diamond is forever打动了无数沉溺在爱河中的情侣，让他们更加期待爱情的永恒，同时被钻石这一稀有、珍贵的“宝石之王”所深深的吸引。",
    "自古以来，钻石一直被人类视为权力、威严、地位和富贵的象征。其坚不可摧、攻无不克、坚贞永恒和坚毅阳刚的品质，是人类永远追求的目标。",
    "钻石是唯一一种集最高硬度，强折射率和高色散于一体的宝石品种，任何其它宝石品种都是不可比拟的。这样的宝中之宝，稀中之罕，理所应当地成为贵中之最了。",
    "为了得到1克拉的钻石，需要挖掘约250吨矿石。",
    "世界名钻摄政王于1702年在印度谷康达附近发现的。摄政王钻石以其罕见纯净和完美切割闻名，它无可争议当属世界最美钻石。",
    "一枚118克拉重、有“全球最大白钻”之称的罕见珍宝即将公开拍卖，预估价高达3500万美元（约合人民币2.14亿元）。",
    "人人都应该致富，机会就在你身边。",
    "你需要的不是资本，而是知识。",
    "你的财富在别人的需求里。",
    "正是因为爱才悄悄的躲开，躲开的是身影，躲不开的是默默的情怀；今天我终于鼓起勇气，向你表达我的爱。",
    "在这世上珍贵的东西总是罕有，所以这世上只有一个你。",
    "忠诚的爱情充溢在我的心里，我无法估计自己享有的财富。",
    "爱，从来就是一件千回百转的事。不曾被离弃，不曾受伤害，怎懂得爱人？ 爱，原来是一种经历，但愿人长久。",
    "即使在你最失魂落魄的时候，也要努力微笑，也许，会有人，因为你带着落寞的笑容而爱上你。",
    "在茫茫人海中，爱与被爱，都是幸运的。如果彼此相爱，心有灵犀，就该珍惜每一次相遇，每一次心跳。",
    "婚姻和爱情，是一种投资，你们相爱才有了投资的本钱，但有钱开店就一定会赚钱吗？所以，婚姻和爱情，更主要的是经营。",
    "美丽单身女郎的最大问题是：她会让已婚的男人重新变成单身。女人靠直觉挑选男人，男人则是靠视觉挑选女人。",
    "也许上帝让你在遇见那个合适的人之前遇见很多错误的人，所以，当这一切发生的时候，你应该心存感激。",
    "爱情是人类整个感情世界中，欲望最为强烈的一种情感，真正的爱情能唤醒人的潜能！"
    );
    
    var PenaltyInfo = new Array(
        { price: 200000, info: "挖到乌木，变卖得到20w" },
        { price: 100000, info: "发现加勒比海盗的佩刀，拍卖获得10w" },
        { price: -100000, info: "在丛林中被毒蛇咬伤，治疗费用10w" },
        { price: -50000, info: "挖掘中与当地村民发生斗殴，赔偿医疗费5w" },
        { price: -200000, info: "收到当地环保部门罚单20w" },
        { price: -10000, info: "中石油调价了，油料费用上涨，损失1w" },
        { price: -20000, info: "捐款给希望工程2w" },
        { price: -300000, info: "遭到基地组织劫持，赎金30w" },
        { price: 100000, info: "将地质学结合实践，并发表论文《论量子力学与熵增原理对碳元素的作用及钻石矿脉成因分析》获得诺贝尔和平奖，奖金100w，税后10w。" },
        { price: -100000, info: "遭遇洪水，损失10w" }
    ); 
    exp.jewelsDigResultInfo = {};
    jewelsDigResultInfo.Knowledge = Knowledge;
    jewelsDigResultInfo.PenaltyInfo = PenaltyInfo;
})(jQuery, window);