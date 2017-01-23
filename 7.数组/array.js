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

7.7 多维数组

7.8 数组方法

7.8.1 join()
Array.join()方法将数组中所有元素都转化成字符串并连接在一起，返回最后生成的字符串。此方法是String.split()方法的逆向操作，后者是讲字符串分割成若干块来创建一个数组
var a = [1,2,3]; // 创建一个包含3个元素的数组
a.join(); // “1,2,3”
a.join(" "); // "1 2 3"
a.join(""); // "123"
var b = new Array(10); // 长度为10的空数组
b.join('-'); // '---------': 9个连字符组成的字符串

7.8.2 reverse()
Array.reverse()方法将数组中的元素颠倒顺序，返回逆序的数组。它采取了替换；换句话说，它不通过重新排列的元素创建新的数组，而是在原先的数组中重新排列它们。

var a = [1,2,3];
a.reverse().join() // "3,2,1",并且现在的a是[3,2,1]

7.8.3 sort()
Array.sort()方法将数组中的元素排序并返回排序后的数组。当不带参数调用sort()时，数组元素以字母表顺序排序(如有必要将临时转化为字符串进行比较)：

var a = new Array("banana", "cherry", "apple");
a.sort();
var s = a.join(", "); // s == "apple, banana, cherry"

如果数组包含undefined元素，它们会被排到数组的尾部。
为了按照其他方式而非字母表顺序进行数组排序，必须给sort()方法传递一个比较函数。该函数决定了它的两个参数在排好序的数组中的先后顺序。

假设第一个参数应该在前，比较函数应该返回一个小于0的数值。反之，假设第一个参数应该在后，函数应该返回一个大于0的数值。并且假设两个值相等（即顺序无关紧要），函数应该返回0.
用数值大小而非字母表顺序进行数组排序，代码如下：

var a = [33, 4, 1111, 222];
a.sort(); // 字母表顺序：1111, 222, 33 ,4
a.sort(function(a, b) { // 数值顺序：4, 33, 222, 1111
    return a-b;         //根据顺序，返回负数，0，正数
});
a.sort(function(a, b) { return b-a }); // 1111, 222, 33, 4 数值大小顺序相反
这里使用匿名函数表达式非常方便，既然比较函数只使用一次，就没必要给它们命名了。

另外一个数组元素排序的列子，也许需要对一个字符串数组执行不区分大小写的字母表排序，比较函数首先将参数都转化为小写字符串(使用toLowerCase()方法)，再开始比较：
a = ['ant', 'Bug', 'cat', 'Dog'];
a.sort(); // 区分大小写的排序: ['Bug', 'Dog', 'ant', 'cat']
a.sort(function(s, t) {
    var a = s.toLowerCase();
    var b = t.toLowerCase();
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
});              // => ['ant', 'Bug', 'cat', 'Dog']


7.8.4 concat()
Array.concat()方法创建并返回一个新数组，它的元素包括调用concat()的原始数组的元素和concat()的每个参数。 
如果这些参数中的任何一个自身是数组，则连接的是数组的元素，而非数组本身。
但要注意，concat()不会递归扁平化数组的数组。
concat()也不会修改调用的数组。下面有一些实例：
var a = [1, 2, 3];
a.concat(4, 5); // 返回 [1,2,3,4,5]
a.concat([4,5]); // 返回[1,2,3,4,5]
a.concat([4,5], [6,7]); // 返回[1,2,3,4,5,6,7]
a.concat(4, [5,[6,7]]); // 返回[1,2,3,4,5,[6,7]]










