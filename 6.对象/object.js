/**
 * Created by liz on 2016/11/28.
 */
/*
* 6.1.1.对象直接量
* */
var empty = {};  //没有任何属性的对象
var point = { x:0, y:0 }; //两个属性
var point2 = { x: point.x, y: point.y }; //更复杂的值
var book = {
    "main title": "Javascript", //属性名里有空格，必须用字符串表示
    'sub-ttile': "The Definitive Guide", //属性名里有连字符，必须用字符串表示
    "for": "all audiences", //for是保留字，必须用引号
    author: { //这个属性的值是一个对象
        firstname: "Tyler", //注意，这里的属性名都没有引号
        surname: "Lee"
    }
};

/*
* 6.1.2. 通过new创建对象
* */
var a =  new Array(); //创建一个空数组， 和[]一样
var d = new Date(); //创建一个表示当前时间的Date对象
var r = new RegExp("js"); //创建一个可以进行模式匹配的RegExp对象

/*
* 6.1.3. 原型
* */

/*
* 6.1.4. Object.Create()
* */
//Object.create()是一个静态函数，而不是提供给某个对象调用的方法。
//它创建一个新对象，其中第一个参数是这个对象的原型。第二个可选参数，用以对对象的属性进一步描述。
var o1 = Object.create({ x:1, y:2 }); // o1继承了属性x和y

//通过传入null来创建一个没有原型的新对象，但通过这种方式创建的对象不会继承任何东西，甚至不包括基础方法，比如toString(),也就是说它将不能与“+”运算符一起正常工作
var o2 = Object.create(null); //o2不继承任何属性和方法

//如果想创建一个普通的空对象(比如通过{}或new Object()创建的对象)，需要传入Object.prototype:
var o3 = Object.create(Object.prototype); // o3和{}和new Object()一样

//ES3中可以用6-1中的代码来模拟原形继承:
//例：6-1 通过原型继承创建一个新对象（返回新对象继承了参数对象的属性，但不能完全代替Object.create(),它不能通过传入null原型来创建对象，而且不能接收第二个可选参数）
function inherit(p) {
    if (p == null) throw TypeError(); // p是一个对象，但不能是null
    if (Object.create) // 如果Object.create()存在，直接使用它
    {
        return Object.create(p);
    }
    var t= typeof p; // 否则进一步检测
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {}; // 定义一个空构造函数
    f.prototype = p; // 将其原型属性设置为p
    return new f(); // 使用f()创建p的继承对象
}

var o = { x: "don't change this value" };
library_function(inherit(o)); // 防止对o的意外修改

/*
 * 6.2属性的查询和设置
 */

var author = book.author; // 得到book的author属性
var name = author.surname; // 得到author的surname属性
var title = book["main title"]; // 得到book的"main title"属性

book.edition = 6; // 为book创建一个名为"edition"的属性
book["main title"] = "ECMAScript"; // 为"main title"属性赋值

/*
 * 6.2.1作为关联数组的对象
 */

//以下两个JavaScript表达式的值相同:
// Object[property]
// Object["property"] 这种数组就是我们所说的关联数组(associative array), 也称作散列、映射或字典。JavaScript对象都是关联数组。

//当通过点运算符（.）访问对象的属性时，属性名用一个标识符来表示。标识符必须直接出现在JavaScript程序中，它们不是数据类型，因为程序无法修改它们。
//反过来讲，当通过[]来访问对象的属性时，属性名通过字符串来表示。字符串是JavaScript的数据类型，在程序运行时可以修改和创建它们。

var addr = "";
for (i = 0; i < 4; i++) {
    addr += customer["address" + i] + '\n';
} // 读取customer对象的address0...3属性，并将它们连接起来。

function addstock(portfolio, stockname, shares) {
    portfolio[stockname] = shares;
}

function getvalue(portfolio) {
    var total = 0.0;
    for(stock in portfolio) { // 遍历portfolio中的每只股票
        var shares = portfolio[stock]; // 得到每只股票的份额
        var price = getquote(stock); // 查找股票价格
        total += shares * price; // 将结果累加到total中
    }
    return total; // 返回total值
}

/*
* 6.2.2继承
* */

var oo = {}; // oo从Object.prototype继承对象的方法
oo.x = 1; // 给oo定义一个属性x
var pp = inherit(oo); // pp继承oo和Object.prototype
pp.y = 2; // 给pp定义个属性y
var q = inherit(pp); // q继承pp、oo和Object.prototype
q.z = 3;
var s = q.toString(); // toString继承自Object.prototype
q.x + q.y // => 3 : x和y分别继承自o和p

var unitcircle = { r:1 }; // 一个用来继承的对象
var c;
c = inherit(unitcircle); // c继承属性r
c.x = 1; c.y = 1; // c定义两个属性
c.r = 2; // c覆盖继承来的属性
unitcircle.r; // => 1, 原型对象没有修改


/*
* 6.2.3 属性访问错误
* */
book.subtitle; // => undefined:属性不存在

// 抛出一个类型错误异常, undefined没有length属性
var len = book.subtitle.length;

//两个可避免出错的方法:
//1.一种冗余但很易懂的方法
var len = undefined;
if (book) {
    if (book.subtitle) len = book.subtitle.length;
}

//2.一种更简练的常用方法, 获取subtitle的length属性或undefined
var len1 = book && book.subtitle && book.subtitle.length


/*
* 6.3删除属性
* */
delete book.author; // book不再有属性author
delete book["main title"]; // book也不再有属性"main title"
//delete运算符只能删除自由属性,不能删除继承属性(要删除继承属性必须从定义这个属性的原型对象上删除它, 而且这会影响到所有继承自这个原型的对象)

o = { x:1 }; // o有一个属性x, 并继承属性toString
delete o.x; // 删除x, 返回true
delete o.x; // 什么都不做(x已经不存在了), 返回true
delete o.toString; // 什么也不做(toString是继承来的), 返回true
delete 1; // 无意义, 返回true

delete Object.prototype; // 不能删除,属性是不可配置的
var x=1; // 声明一个全局变量
delete this.x; // 不能删除这个属性
function f() {}; // 声明一个全局函数
delete this.f; // 也不能删除全局函数

this.x = 1; // 创建一个可配置的全局属性 (没有用var)
delete x; // 将它删除,在非严格模式下
delete x; // 在非严格模式下报语法错误
delete this.x // 正常工作

/*
* 检测属性
* */

//in运算符的左侧是属性名(字符串), 右侧是对象. 如果对象的自有属性或继承属性中包含这个属性则返回true
var o = { x:1 };
"x" in o; // true, "x"是o的属性
"y" in o; // false, "y"不是o的属性
"toString" in o; //true, o继承toString属性

var o1 = { x: 1 };
o1.hasOwnProperty("x"); // true: o有一个自有属性x
o1.hasOwnProperty("y"); // false: o中不存在属性y
o1.hasOwnProperty("toString") // false: toString是继承属性

//propertyIsEnumerable()是hasOwnProperty()的增强版, 只有检测到是自有属性且这个属性的可枚举性(enumerable attribute)为true时它才返回true.
//某些内置属性是不可枚举的.
//通常由JavaScript代码创建的属性都是可枚举的, 除非在ES5中使用一个特殊的方法来改变属性的可枚举性, 随后会提到:

var o2 = inherit({ y:2 });
o2.x = 1;
o2.propertyIsEnumerable("x"); // true, o有一个可枚举的自由属性x
o2.propertyIsEnumerable("y"); // false, y是继承来的
Object.prototype.propertyIsEnumerable("toString"); // false, 不可枚举

var o3 = { x:1 };
o.x !== undefined; // true: o中有属性x
o.y !== undefined; // false: o中没有属性y
o.toString !== undefined; // true: o继承了toString属性

//然而有一种场景只能使用in运算符而不能使用上述属性访问的方式. in可以区分不存在的属性和存在但值为undefined的属性. 例如下面的代码:

var o4 = { x:undefined }; // 属性被显式复制为undefined
o4.x !== undefined; // false, 属性存在, 但值为undefined
o4.y !== undefined; // false, 属性不存在
"x" in o4; // true, 属性存在
"y" in o4; // false, 属性不存在
delete o4.x; // 删除了属性x
"x" in o4; // false, 属性不再存在


//注意上述代码中使用的是 "!==" 而不 "!=". "!=="可以区分undefined和null.有时则不必作这种区分:
// 如果o中有属性x, 且x的值不是null或undefined, o.x乘以2.
if (o.x != null) o.x *= 2;
// 如果o中含有属性x, 且x的值不能转换为false, o.x乘以2.
// 如果x是undefined, null, false, " ", 0或NaN, 则它保持不变
if (o.x) o.x *= 2;

/*
* 枚举属性
* */
//通常使用for/in循环遍历, ES5提供了两个更好用的代替方案.

var o5 = { x:1, y:2, z:3 }; // 3个可枚举的自有属性
o5.propertyIsEnumerable("toSting"); // => false, 不可枚举
for (p in o5) //遍历属性
console(p); // 输出x,y和z, 不会速出toString

for (p in o5) {
    if (!o5.hasOwnProperty(p)) continue; // 跳过继承的属性
}
for (p in o5) {
    if (typeof o[p] === "function") continue; // 跳过方法
}


/*
* 把p中的可枚举属性复制到o中,并返回o
* 如果o和p中含有同名属性, 则覆盖o中的属性
* 这个函数并不处理getter和setter以及复制属性
* */
function extend(p) {
    for (prop in p) { // 遍历p中的所有属性
        o[prop] = p[prop]; // 将属性添加至o中
    }
    return o;
}

/*
* 将p中的可枚举属性复制到o中, 并返回o
* 如果o和p中有同名的属性, o中的属性将不受到影响
* 这个函数并不处理getter和setter以及复制属性
* */

function merge(o, p) {
    for (prop in p) {
        if (o.hasOwnProperty[prop]) continue; // 过滤掉已经在o中存在的属性
        o[prop] = p[prop]; // 将属性添加至o中
    }
    return o;
}

/*
* 如果o中的属性在p中没有同名的属性, 则从o中删除这个属性, 返回o
* */

function restrict(o, p) {
    for (prop in o) {
        if (! (prop in p)) delete o[prop]; // 如果在p中不存在, 则删除之
    }
    return o;
}

/*
* 如果o中的属性在p中存在同名属性, 则从o中删除这个属性, 返回o
* */
function subtract(o, p) {
    for (prop in p) {
        delete o[p]; // 从o中删除一个不存在的属性不会报错
    }
    return o;
}

/*
* 返回一个新对象, 这个对象同时拥有o的属性和p的属性.
* 如果o和p中有重名属性, 则使用p中的属性值
* */
function union(o, p) {
    return extend(extend({}, o), p);
}

/*
* 返回一个新对象, 这个对象拥有同时在o和p中出现的属性
* 很像求o和p的交集. 但p中的属性值被忽略
* */
function intersection(o, p) { return restrict(extend({}, o), p); }


/*
* 返回一个数组, 这个数组包含的是o中可枚举的自有属性的名字
* */
function keys(o) {
    if (typeof o !== "object") throw TypeError(); // 参数必须是对象
    var result = []; //将要返回的数组
    for (var prop in o) {
        if (o.hasOwnProperty(prop)) { // 判断是否是自有属性
            result.push(prop); // 将属性名添加至数组
        }
    }
    return result;
}

/*
* 6.6 属性getter和setter
* */
var p1 = {
    //x和y是普通的可读写的数据属性
    x: 1.0,
    y: 1.0,

    //r是可读写的存取器属性，它有getter和setter。
    //函数体结束后不要忘记带上逗号
    get r() { return Math.sqrt(this.x*this.x + this.y*this.y); },
    set r(newvalue) {
        var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
        var ratio = newvalue / oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    get theta() { return Math.atan2(this.y, this.x) }
}

var qq = inherit(p1); // 创建一个继承getter和setter的新对象
qq.y = 1, qq.x = 1; // 给qq添加两个属性
console.log(qq.r); // 可以使用继承的存取器属性
console.log(qq.theta);

var serialnum = {
    // 这个数据属性包含下一个序列号
    // $符号暗示这个属性是一个私有属性
    $n: 0,

    // 返回当前值， 然后自增
    get next() { return this.$n++; },

    // 给n设置新的值， 但只有当它比当前值大时才设置成功
    set next(n) {
        if (n >= this.$n) this.$n++;
        else throw "序列号的值不能比当前值小"
    }
};

// 这个对象有一个可以返回随机数的存取器属性
// 例如，表达式“random.octet”产生一个随机数
// 每次产生的随机数都在0-255之间
var random = {
    get octet() { return Math.floor(Math.random()*256); },
    get uint16() { return Math.floor(Math.random()*65536); },
    get int16() { return Math.floor(Math.random()*65536) - 32768; }
};

/*
* 6.7 属性的特性
* */

//1. 可以通过和谐API给原型对象添加方法，并将它们设置成不可枚举的，这让它们看起来更像内置方法。
//2. 可以通过这些API给对象定义不能修改或删除的属性，借此‘锁定’这个对象。

// 通过调用Object.getOwnPropertyDescriptor()可以获得某个对象自有特定属性的属性描述符：

    // 返回 { value:1, writable:true, enumerable: true, configurable:true }
    Object.getOwnPropertyDescriptor({x:1}, "x");

    // 查询上下文中定义的random对象的octet属性
    // 返回 { get: /**func/, set:undefined, enumerable:true, configurable: true 0}
    Object.getOwnPropertyDescriptor(random, "octet")

    // 对于继承属性和不存在的属性， 返回undefined
    Object.getOwnPropertyDescriptor({}, "x")   // undefined, 没有这个属性
    Object.getOwnPropertyDescriptor({}, "toString")   // undefined, 继承属性

// 要想设置属性的特性，或者想让新建属性具有某种特性，则需要调用Object.defineProperty(),传入要修改的对象、要创建或修改的属性的名称以及属性描述符对象：
    var ooo = {};
    // 添加一个不可枚举的数据属性x, 并赋值为1
    Object.defineProperty(ooo, "x", {value:1, writable:true, enumerable: false, configurable:true});

    // 属性是存在的，但不可枚举
    ooo.x; // => 1
    Object.keys(ooo); // => []

    // 现在对属性x做修改，让它变为只读
    Object.defineProperty(ooo, "x", { writable: false });

    // 试图更改这个属性的值
    ooo.x = 2; // 操作失败但不报错，而在严格模式下抛出类型错误异常
    ooo.x; // =》 1

    // 属性依然是可配置的，因此可以通过这种方式对它进行修改：
    Object.defineProperty(ooo, "x", { value:2 });
    ooo.x; // => 2
  
    // 现在将x从
    
