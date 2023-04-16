# this 指向

**一句话概括 this 指向：谁调用 this 就指向谁**

这句话可能太过广义，那么请看以下的各种 this 指向场景

## 1. 箭头函数（=>）

**箭头函数 this 的指向不会发生改变，也就是说在创建箭头函数时就已经确定了它的 this 的指向了；它的指向永远指向箭头函数外层的 this。**

```js
function fn1() {
  console.log(this)

  let fn2 = () => {
    console.log(this)
  }
  fn2() //this->window
}
fn1() //this->window

//因为fn1函数中this的指向是window，所以fn2箭头函数this指向fn1函数也就是间接指向window
```

## 2. 直接调用

在函数被直接调用时，this 将指向全局对象。在浏览器环境中全局对象是 Window，在 Node.js 环境中是 Global。

**全局作用域中：this 永远指向 window**

**函数作用域中：**

- 如果函数直接被调用 this 指向 window 函数名()
- 被对象的对象.属性()调用 函数中的 this 指向这个对象

```js
var obj = {
  fn: function fn1() {
    console.log(this)
  },
}
obj.fn() //this->obj
```

## 3. 对象.属性()调用

对象属性引用链只有上一层或者说最后一层在调用位置中起作用,例如

```js
function foo() {
  console.log(this.a)
}

var obj2 = {
  a: 111,
  foo,
}

var obj1 = {
  a: 777,
  obj2,
}

obj1.obj2.foo() // 111

// 对象 obj2 为最后一层
// obj1.obj2 仅为属性查找,并还没有开始调用
```

## 4. new

**当使用 new 关键字调用函数时，函数中的 this 一定是 JS 创建的新对象。**

可能你会有所疑问：**“如果使用 new 关键调用箭头函数，是不是箭头函数的 this 就会被修改呢？”**。

我们可以在控制台尝试一下：

```js
fun = () => {}
new fun() // throw error
```

从控制台中可以看出，箭头函数不能当做构造函数，所以不能与 new 一起执行。

## 5. bind

bind 是指 [Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)->原型里的方法

**多次 bind 时只认第一次 bind 的值**

例子：

```js
function fn() {
  console.log(this)
}

fn.bind(1).bind(2)() // 1
```

**注意：箭头函数中 this 不会被修改**

```js
fun = () => {
  // 这里 this 指向取决于外层 this
  console.log(this)
}

fun.bind(1)() // Window
```

### 5.1 bind 与 new

**注意：new 优先**

```js
function func() {
  console.log(this, this.__proto__ === func.prototype)
}

boundFunc = func.bind(1)
new boundFunc() // Object true
```

**bind 函数中 this 不会被修改**

```js
function func() {
  console.log(this)
}

boundFunc = func.bind(1)
boundFunc.apply(2) // 1 bind优先
```

**总结：将参数一一进行传递，在被函数调用时不会立马执行函数，返回有一个新函数，新函数中的 this 指向改变，不影响原来的函数的 this 指向**

## 6 .apply 和 call

**作用：改变 this 指向**

**区别：** 调用时传递参数形式不同

- **call:** 将参数一一进行传递(改变函数中的 this 指向 指向第一个参数;并且执行函数)
- **apply:** 将参数用数组的形式传递(改变函数中的 this 指向 指向第一个参数;并且执行函数)

**使用：**

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
var person = new Person('xiaoming', 100)
var obj = {}
Person.apply(obj, ['xiaoming', 300]) //Person {name: 'xiaoming', age: 100};
Person.call(obj, 'xiaozhang', 300) //Person {name: 'xiaoming', age: 100};
console.log(person)
```

**箭头函数中 this 不会被修改**

```js
func = () => {
  // 这里 this 指向取决于外层 this
  console.log(this)
}

func.apply(1) // Window
```

## 7. 不在函数里

**不在函数中的场景，可分为浏览器的 `<script />` 标签里，或 Node.js 的模块文件里。**

1. 在 `<script />` 标签里，`this` 指向 `Window`。

2. 在 `Node.js` 的模块文件里，`this` 指向 `Module` 的默认导出对象，也就是 `module.exports`

## 8. 严格模式

严格模式在全局模式下为`undefined`
