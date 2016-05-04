function Animal() {
    this.name = "Animal";
    this.array = ["_1"];
    this.sound = function () {
        alert("no sound~");
    }
    this.eat = function () { alert("nothing"); }
}
Animal.prototype.eat = function () {
    alert("all food");
}

function Cat() {
    this.name = "Tom";
}
Cat.prototype = new Animal();
//Cat.prototype.name = "GOU";

var animal = new Animal();

var cat = new Cat();
//cat.name = "Jerry";
//cat.sound();
//cat.eat();
var cat2 = Cat.prototype;
//alert(cat.constructor);
//alert("catName=" + cat.name);
//alert("cat2Name=" + cat2.name);

var cat3 = new Cat();
var cat4 = new Cat();
cat3.name = "RTRT";
//alert(cat4.name);

cat3.sound = function () {
    //alert("Miao~");
}

cat3.array.push("_2");
//alert(cat4.array);
//cat4.sound();

alert(typeof null);
alert(typeof NaN);
alert(typeof undefined);
var array = ["s", "2"];
alert(typeof []);
alert(Object.prototype.toString.call(array));
alert(Array.isArray(array));