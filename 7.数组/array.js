/**
 * Created by taylor on 30/11/2016.
 */
"use strict";


/*
* 7.1创建数组
* */
var empty = []; // 没有元素的数组
var primes = [2, 3, 5, 7 , 11]; // 有5个数的数组
var misc =  [1.1, true, "a", ]; // 3个不同类型额元素和结尾的逗号

var base = 1024;
var table = [base, base + 1, base + 2, base + 3];

var b = [[1, { x:1, y:2 }], [2, { x:3, y:4 }]];

var count = [1,,3]; // 数组有3个元素, 中间那个元素值为undefined
var undefs = [,,]; // 数组有2个元素, 都是undefined

var a = new Array(); // => []

var a1 = new Array(10); // 指定长度为10

var a2 = new Array(5, 4, 3, 2, 1, "TESTING, testing");


/*
* 7.2数组元素的读和写
* */

var a3 = ["world"]; // 从一个元素的数组开始
var value = a[0]; // 读第0个元素
a[1] = 3.14; // 写第1个元素
var i = 2;
a[i] = 3; // 写第2个元素
a[i + 1] = 4; // 写第3个元素
a[a[i]] = a[0]; // 读第0个和第2个元素,写第3个元素
a.length; // => 4

var o = {};
o[1] = "one"; //用一个整数来索引它

a[-1.23] = true; // 这将创建一个名为"-1.23"的属性
a["1000"] = 0; // 这是数组的第1001个元素
a[1.00]; // 和a[1]相等


/*
* 7.3稀疏数组
* */

a = new Array(5); // length = 5, 没有元素
a = []; // length = 0, 无元素
a[1000] = 0; // 添加一个元素, 但设置length为1001

var aa = [,,,]; // 数组是[undefined, undefined, undefined]
var aa1 = new Array(3); // 该数组没有元素
0 in aa; // true, aa在索引0处有一个元素
0 in aa1; //false, aa1在索引0处无元素

var a1 = [,]; // 此数组没有元素, 长度是1
var a2 = [undefined]; // 此数组包含一个值为undefined的元素
0 in a1; // false, a1在索引0处没有元素
0 in a2; // true, a2在索引0处有一个值为undefined的元素


/*
 *7.4数组长度
 */

[].length; // => 0 ,数组无元素
['a', 'b', 'c'].length; // => 3: 最大的索引为2, length为3

a = [1,2,3,4,5]; // 从5个元素开始的数组
a.length = 3; // 现在a为[1,2,3]
a.length = 0; // 删除所有元素, a为[]
a.length = 5; // 长度为5, 但没有元素, 就像new Array(5)

a = [1, 2, 3]; // 从3个元素开始
Object.defineProperty(a, "length", { writable: false }); // 让属性length只读
a.length = 0; // a不会改变


/*
* 7.5数组元素的添加和删除
* */

a = []; // 开始是一个空数组
a[0] = "zero"; // 然后向其中添加元素
a[1] = "one";

a = [];
a.push("zero"); // 在末尾添加一个元素, a = ["zero"]
a.push("one", "two"); // 再添加连个元素, a = ["zero", "one", "two"]

a = [1, 2, 3];
delete a[1]; // a在索引1的位置不再有元素
1 in a; // => false: 数组索引1并未在数组中定义
a.length; // => 3: delete操作并不影响数组长度

/*
* 7.6数组遍历
* */
var keys = Object.keys(o); // 获得o对象属性名组成的数组
var values = []; // 在数组中存储匹配属性的值
for (var i = 0; i < keys.length; i++) {
    var key = keys[i]; // 获得索引处的键值
    values[i] = o[key]; // 在values数组中保存属性值
}

for(var i = 0, len = keys.length; i < len; i++) {
    // 循环体仍然不变
}

for(var i = 0; i < a.length; i++) {
    if (!a[i]) continue; // 跳过null, undefined和不存在的元素
    //循环体
}

for (var i = 0; i< a.length; i++) {
    if (!(i in a)) continue; // 跳过不存在的元素
    // 循环体
}

for (var index in sparseArray) {
    var value = sparseArray[index];
    // 此处可以使用索引和值做一些事情
}

for (var i in a) {
    if (!a.hasOwnProperty(i)) continue; // 跳过继承的属性
    // 循环体
}

for (var i in a) {
    // 跳过不是非负整数的i
    if (String(Math.floor(Math.abs(Number(i)))) !== i) continue;
}

var data = [1,2,3,4,5];
var sumOfSquares = 0; // 要得到数据的平方和
data.forEach(function(x) {
    sumOfSquares += x*x; // 平方和
})
sumOfSquares; // => 55, 1+4+9+16+25





