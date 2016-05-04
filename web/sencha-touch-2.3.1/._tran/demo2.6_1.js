/// <reference path="../sencha-touch-debug.js" />

//Ext.setup({
//    icon: '168.png',
//    glossOnIcon: false,
//    tabletStartupScreen: '168.png',
//    phoneStartupScreen: '168.png',
//    onReady: function () {
//        var panel = new Ext.create('Ext.Panel', {
//            fullscreen: true,
//            html:'hello world'
//        });
//        panel.show();
//    }
//});

Ext.require("Ext.Img");
Ext.require("Ext.MessageBox");
Ext.application({
    icon: '168.png',
    glossOnIcon: false,
    tabletStartupScreen: '168.png',
    phoneStartupScreen: '168.png',
    launch: function () {
        var panel = new Ext.create('Ext.Panel', {
            id: 'myPanel',
            fullscreen: true,
            html: '一个简单的示例面板'
        });
        var panel2 = new Ext.create('Ext.Panel', {
            id: 'subPanel',
            html: '一个简单的面板中的示例面板'
        });
        var img = Ext.create('Ext.Img', {
            src: '../../Images/png-0022.png',
            width:128,height:128,
            listeners: {
                tap: function () {
                    Ext.Msg.alert('Title', 'The quick brown fox jumped over the lazy dog.', Ext.emptyFn);
                    //Ext.Msg.alert("title", "点击了图片", Ext.emptyFn);
                }
            }
        });
        panel.add(panel2);
        panel.add(img);
        panel.addCls('colorRed');
        //Ext.get('myPanel').addCls('colorRed');
        //Ext.viewport.add(panel);
    }
});
