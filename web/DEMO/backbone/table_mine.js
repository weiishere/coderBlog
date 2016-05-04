/// <reference path="jquery.js" />
/// <reference path="backbone.js" />

$(function () {
    //Model表示一个学生
    var Student = Backbone.Model.extend({
        //默认值
        defaults: function () {
            return {
                name: "XXX",
                age: "0",
                selected: false,
                id: StudentList.nextId()
            }
        },
        initialize: function () {
            if (!this.get("name")) {
                this.set({ "name": this.defaults().name });
            }
            if (!this.get("age") || !(/(^[1-9]\d*$)/.test(this.get("age")))) {
                this.set({ "age": this.defaults().age });
            }
        },
        //标记该学生是否被选中(---------理解save与set)
        toggle: function () {
            this.save({ "selected": !this.get("selected") });
        }
    });
    //Collection:Model的集合，即所有学生的集合
    var Students = Backbone.Collection.extend({
        model: Student,
        //本地数据库，用到backbone-localstorage.js
        localStorage: new Backbone.LocalStorage("Students-Table"),
        //返回被选中的学生的集合
        selected: function () {
            return this.filter(function (stu) { return stu.get("selected"); });
        },
        //给每个学生一个编号
        nextId: function () {
            if (!this.length)
                return 1;
            return this.last().get('id') + 1;
        }
    });
    //定义一个学生集合对象
    var StudentList = new Students;


    //View:这个视图表示table中的一列，即一个学生，对应一个Model
    var StudentView = Backbone.View.extend({
        tagName: "tr",
        template: _.template($("#item-template").html()),

        //this.$el为该tr节点元素，将template渲染进该节点，并把model的值写入
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            //如果该行被选中，则切换样式
            this.$el.toggleClass('selected', this.model.get('selected'));
            return this;
        },
        initialize: function () {
            //model发生变化就重新渲染视图
            this.listenTo(this.model, 'change', this.render);
            //销毁model
            this.listenTo(this.model, 'destroy', this.remove);
        },

        //绑定该tr下的事件
        events: {
            "click .toggle": "toggleSelect",
            "dblclick td": "edit",
            "click a.destroy": "clear",
            "blur .edit": "close"
        },
        toggleSelect: function () {
            this.model.toggle();
        },
        //双击td将样式变为可编辑
        edit: function (e) {
            $(e.currentTarget).addClass("editing").find("input,select").focus();
        },
        clear: function () {
            this.model.destroy();
        },
        //编辑状态下失去焦点，则修改完成
        close: function (e) {
            var _input = $(e.currentTarget);
            if (_input.attr("name") == "name") {
                if (!_input.val()) {
                    _input.val(this.model.defaults().name);
                }
                this.model.save({ "name": _input.val() });
            } else if (_input.attr("name") == "gender") {
                this.model.save({ "gender": _input.val() });
            } else {
                if (isNaN(_input.val())) {
                    this.model.save({ "age": input.val() });
                }
            }
            _input.parent().removeClass("editing");
        },
        clear: function () {
            this.model.destroy();
        }
    });



    //View:这个视图表示$("#content")，用来表现整个学生表格
    var AppView = Backbone.View.extend({
        el: $("#content"),
        template: _.template($('#stats-template').html()),
        events: {
            "click #add-student": "addNewStudent",
            "click #clear-selected": "clearSelected",
            "click #select-all": "selectAll"
        },
        initialize: function () {
            this.allCheckbox = $("#select-all");
            this.main = $("#main");
            this.footer = $('footer');
            this.name = $("#new-name");
            this.age = $("#new-age");
            this.gender = $("#new-gender");

            //Collection中增加一个Model就触发add事件
            this.listenTo(StudentList, 'add', this.addOne);//Collection中增加一个Model就触发add事件
            //一旦调用fetch方法就触法reset事件
            this.listenTo(StudentList, 'reset', this.addAll);
            //all事件表示该View下的所有事件，即触发任意事件就触法all事件
            this.listenTo(StudentList, 'all', this.render);

            //从本地数据库中获取所有学生
            StudentList.fetch();
        },
        //渲染视图
        render: function () {
            var selected = StudentList.selected().length;
            if (StudentList.length) {
                this.main.show();
                this.footer.show();
                this.footer.html(this.template({ selected: selected }));
            } else {
                this.main.hide();
                this.footer.hide();
            }
            //判断所有学生是否被选中
            this.allCheckbox.attr("checked", selected == StudentList.length ? true : false);
        },
        //增加一个学生，同时将model传入StudentView中
        addOne: function (student) {
            var view = new StudentView({ model: student });
            //将渲染后的每一列添加到表格中
            this.$("#student-list").append(view.render().el);
            //alert(this.$("#student-list").html());
        },
        //增加所有学生，通过Collection.each依次调用addOne方法
        addAll: function () {
            StudentList.each(this.addOne, this);
        },
        //增加一个新学生
        addNewStudent: function () {
            StudentList.create({ name: this.name.val(), gender: this.gender.val(), age: this.age.val() });
            this.name.val('');
            this.age.val('');
            this.gender.val(1);
        },
        //删除选中列，_.invoke(集合,方法)
        clearSelected:function(){
            _.invoke(StudentList.selected(), 'destroy');
        },
        //选中所有
        selectAll:function(){
            var selected=this.allCheckbox.attr('checked')=="checked";
            StudentList.each(function (student) {
                student.save({'selected':selected});
            });
        }
    });

    //创建View
    var App = new AppView;

    

    //var app = new AppRouter;
    //Backbone.history.start();
});