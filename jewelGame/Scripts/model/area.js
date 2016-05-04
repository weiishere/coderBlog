(function (exp) {
    //全局挖到钻石\信息(待确定参数)\如果未挖到钻石时赏罚的概率
    exp.digProbability = { successProbability: 90, punishProbability: 80 };
    //每个地域中三层出现钻石的概率,FloorProbability为每层出现钻石的概率,small、medium、large为出现小钻石、中钻石、大钻石的概率
    exp.Area = new Object();
    //非洲
    Area["Africa"] = {
        fristFloorProbabilit: { floorProbability: 50, stonProbability: 30, small: 94, medium: 5, large: 1, deep: 470 },
        secondFloorProbability: { floorProbability: 60, stonProbability: 20, small: 50, medium: 49, large: 1, deep: 740 },
        thirdFloorProbability: { floorProbability: 60, stonProbability: 20, small: 20, medium: 60, large: 10, deep: 1020 },
        polygon: [{ x: 200, y: 510 }, { x: 300, y: 510 }, { x: 340, y: 530 }, { x: 420, y: 540 }, { x: 480, y: 670 }
            , { x: 550, y: 660 }, { x: 480, y: 800 }, { x: 390, y: 920 }, { x: 350, y: 1000 }, { x: 300, y: 1000 },
            { x: 290, y: 900 }, { x: 270, y: 800 }, { x: 290, y: 760 }, { x: 250, y: 700 }, { x: 150, y: 710 },
            { x: 110, y: 680 }, { x: 110, y: 600 }]
    };
    //大洋洲
    Area["Oceania"] = {
        fristFloorProbabilit: { floorProbability: 10, stonProbability: 40, small: 94, medium: 5, large: 1, deep: 470 },
        secondFloorProbability: { floorProbability: 10, stonProbability: 40, small: 50, medium: 49, large: 1, deep: 740 },
        thirdFloorProbability: { floorProbability: 10, stonProbability: 40, small: 20, medium: 60, large: 10, deep: 1020 },
        polygon: [{ x: 1000, y: 810 }, { x: 1050, y: 710 }, { x: 1150, y: 730 }, { x: 1200, y: 800 }, { x: 1130, y: 840 }, { x: 1140, y: 890 }, { x: 1080, y: 970 },
            { x: 1020, y: 990 }, { x: 960, y: 940 }, { x: 935, y: 900 }, { x: 970, y: 830 }]
    }
    //欧洲
    Area["Europe"] = {
        fristFloorProbabilit: { floorProbability: 10, stonProbability: 60, small: 94, medium: 5, large: 1, deep: 470 },
        secondFloorProbability: { floorProbability: 10, stonProbability: 40, small: 50, medium: 49, large: 1, deep: 740 },
        thirdFloorProbability: { floorProbability: 10, stonProbability: 40, small: 20, medium: 60, large: 10, deep: 1020 },
        polygon: [{ x: 310, y: 300 }, { x: 505, y: 300 }, { x: 430, y: 545 }, { x: 260, y: 500 }, { x: 160, y: 510 }, { x: 140, y: 390 }]
    }
    //亚洲
    Area["Asian"] = {
        fristFloorProbabilit: { floorProbability: 100, stonProbability: 40, small: 94, medium: 5, large: 1, deep: 470 },
        secondFloorProbability: { floorProbability: 10, stonProbability: 40, small: 50, medium: 49, large: 1, deep: 740 },
        thirdFloorProbability: { floorProbability: 10, stonProbability: 40, small: 20, medium: 60, large: 10, deep: 1020 },
        polygon: [{ x: 910, y: 270 }, { x: 1190, y: 310 }, { x: 1150, y: 400 }, { x: 1080, y: 470 }, { x: 1035, y: 520 }
        , { x: 1070, y: 540 }, { x: 1030, y: 575 }, { x: 1000, y: 560 }, { x: 950, y: 600 }, { x: 1000, y: 800 }, { x: 900, y: 810 }
        ,  { x: 855, y: 750 }, { x: 760, y: 600 }, { x: 710, y: 645 }, { x: 690, y: 700 }, { x: 600, y: 600 }
        , { x: 490, y: 655 }, { x: 435, y: 550 },{ x: 520, y: 270 }]
    }
    //美洲
    Area["America"] = {
        fristFloorProbabilit: { floorProbability: 10, stonProbability: 40, small: 94, medium: 5, large: 1, deep: 470 },
        secondFloorProbability: { floorProbability: 10, stonProbability: 40, small: 50, medium: 49, large: 1, deep: 740 },
        thirdFloorProbability: { floorProbability: 10, stonProbability: 40, small: 20, medium: 60, large: 10, deep: 1020 },
        polygon: [{ x: 1410, y: 300 }, { x: 1900, y: 270 }, { x: 2040, y: 300 }, { x: 2100, y: 450 }, { x: 1960, y: 500 }
        , { x: 1940, y: 570 }, { x: 2040, y: 580 }, { x: 2080, y: 630 }, { x: 2060, y: 680 }, { x: 2130, y: 730 }, { x: 2200, y: 730 }
        , { x: 2200, y: 800 }, { x: 2160, y: 880 }, { x: 2100, y: 930 }, { x: 2080, y: 1045 }, { x: 2040, y: 1045 }, { x: 1880, y: 745 }
        , { x: 1650, y: 485 }, { x: 1550, y: 355 }, { x: 1400, y: 365 }]
    }
    //海洋
    Area["Ocean"] = {
        fristFloorProbabilit: { floorProbability: 0, stonProbability: 0, small: 94, medium: 5, large: 1, deep: 470 },
        secondFloorProbability: { floorProbability: 20, stonProbability: 0, small: 50, medium: 49, large: 1, deep: 740 },
        thirdFloorProbability: { floorProbability: 50, stonProbability: 40, small: 20, medium: 60, large: 10, deep: 1020 },
        polygon: []
    }


    //计算向量叉乘  
    var crossMul = function (v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }
    //判断两条线段是否相交  
    var checkCross = function (p1, p2, p3, p4) {
        var v1 = { x: p1.x - p3.x, y: p1.y - p3.y },
        v2 = { x: p2.x - p3.x, y: p2.y - p3.y },
        v3 = { x: p4.x - p3.x, y: p4.y - p3.y },
        v = crossMul(v1, v3) * crossMul(v2, v3)
        v1 = { x: p3.x - p1.x, y: p3.y - p1.y }
        v2 = { x: p4.x - p1.x, y: p4.y - p1.y }
        v3 = { x: p2.x - p1.x, y: p2.y - p1.y }
        return (v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0) ? true : false
    }
    //判断点是否在多边形内  
    exp.isInArea = function (point, polygon) {
        var p1, p2, p3, p4
        p1 = point
        p2 = { x: -100, y: point.y }
        var count = 0
        //对每条边都和射线作对比  
        for (var i = 0; i < polygon.length - 1; i++) {
            p3 = polygon[i]
            p4 = polygon[i + 1]
            if (checkCross(p1, p2, p3, p4) == true) {
                count++
            }
        }
        p3 = polygon[polygon.length - 1]
        p4 = polygon[0]
        if (checkCross(p1, p2, p3, p4) == true) {
            count++
        }
        return (count % 2 == 0) ? false : true
    }

})(window);