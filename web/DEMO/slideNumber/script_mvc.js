/// <reference path="../../Javascript/jquery-1.8.2.min.js" />


(function ($, exports) {
    Man = Backbone.Model.extend({
        initialize: function () {
            alert('Hey you create me');
            //初始化时绑定监听
            this.bind("change:name", function () {
                var name = this.get("name");
                alert("你改变了name属性为：" + name);
            });
            this.bind("error", function (model, error) {
                alert(error);
            });
        },
        defaults: {
            name: '张三',
            age: '38'
        },
        //backbone有个坑爹的设定，那就是如果set一个字段为空，比如 set({name:""}) 时将不会触发validate校验，在实际应用中要小心这个坑
        validate: function (attributes) {
            if (attributes.name == "no name") {
                return "name不能为空！";
            }
        },
        aboutMe: function () {
            return '我叫' + this.get('name') + ',今年' + this.get('age') + '岁';
        }
    });
    var man = new Man;
    man.set({ name: "no name"});//根据验证规则，弹出错误提示。
    alert(man.aboutMe());
})(jQuery, window);












(function ($, exports) {
    if (typeof Object.create != "function") {
        Object.create = function (o) {
            function F() { }
            F.prototype = o;
            return new F();//传入一个对象，返回一个继承了这个对象的新对象
        }
    }
    //MODEL
    exports.Model = {
        inherited: function () { },
        created: function () { 
        },//新增对象之后执行的函数
        prototype: { init: function () { } },
        create: function () {
            var object = Object.create(this);
            object.parent = this;
            object.prototype = object.fn = Object.create(this.prototype);
            object.created();
            this.inherited(object);
            return object;
        },
        init: function () {
            var instance = Object.create(this.prototype);
            instance.parent = this;
            instance.init.apply(instance, arguments);
            return instance;
        },
        //添加对象属性
        extend: function (o) {
            var extended = o.extended;
            $.extend(this, o);
            if (extended) extended(this);
        },
        //添加实例属性
        include: function (o) {
            var included = o.included;
            $.extend(this.prototype, o);
            if (included) included(this);
        }
    }
    Model.records = {};
    Model.extend({
        find: function (id) {
            if (this.records[id]) return this.records[id].dup(); else throw ("Unkown record");
            //return this.records[id]||throw "Unkown record";
        },
        created: function () {
            this.records = {};
        }
    });
    Model.include({
        init: function (attr) { if (attr) { this.load(attr); } },
        load: function (attributes) {
            for (var name in attributes) {
                this[name] = attributes[name];
            }
        },
        dup: function () {
            return $.extend(true, {}, this);
        },
        newRecord: true,
        create: function () {
            if (!this.id) this.id = Math.guid();
            this.newRecord = false;
            this.parent.records[this.id] = this.dup();
        },
        distory: function () { delete this.parent.records[this.id]; },
        update: function () { this.parent.records[this.id] = this.dup(); },
        save: function () { this.newRecord ? this.create() : this.update(); }
    });
    Math.guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    //Controller
    var mod = {};
    mod.create = function (includes) {
        var result = function () { this.init.apply(this, arguments); }
        result.fn = result.prototype;
        result.fn.init = function () { }
        result.fn.proxy = result.proxy = function (func) { return $.proxy(func, this); }
        //result.fn.proxy = result.proxy;
        result.include = function (object) { $.extend(this.fn, object); }
        result.extend = function (object) { $.extend(this, object); }
        if (includes) result.include(includes);
        return result;
    }
    exports.Controller = mod;
    //mod = function (includes) { if (includes) this.includes(includes); }
    //mod.fn = mod.prototype;
    //mod.fn.proxy = function (func) { return $.proxy(func, this); }
    //mod.fn.load = function (func) { $(this.proxy(func)); }
    //mod.fn.include = function (object) { $.extend(this, object); }
    //mod.fn.unload = function (func) { $(window).bind("unload", this.proxy(func)); }
    //exports.Controller = mod;
})(jQuery, window);



var SlideBlock = Model.create();
var slideBlock = SlideBlock.init({ number: 0, isDetails: 0, content: "", domId: "" });
//alert(slideBlock.number);
//slideBlock.save();
//slideBlock.distory();
//alert(slideBlock.id);