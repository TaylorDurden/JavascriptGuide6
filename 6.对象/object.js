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

