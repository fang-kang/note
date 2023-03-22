# 手写 Promise

## 常见 Promise 面试题

首先，我们以常见的 Promise 面试题为切入点，我们看看面试官们都爱考什么：

1. Promise 解决了什么问题？
2. Promise 的业界实现都有哪些？
3. Promise 常用的 API 有哪些？
4. 能不能手写一个符合 Promise/A+ 规范的 Promise?
5. Promise 在事件循环中的执行过程是怎样的？
6. Promise 有什么缺陷，可以如何解决？

## Promise 出现的原因 & 业界实现

在 Promise 出现以前，在我们处理多个异步请求嵌套时，代码往往是这样的。。。

```js
let fs = require('fs')

fs.readFile('./name.txt', 'utf8', function (err, data) {
  fs.readFile(data, 'utf8', function (err, data) {
    fs.readFile(data, 'utf8', function (err, data) {
      console.log(data)
    })
  })
})
```

为了拿到回调的结果，我们必须一层一层的嵌套，可以说是相当恶心了。而且基本上我们还要对每次请求的结果进行一系列的处理，使得代码变的更加难以阅读和难以维护，这就是传说中臭名昭著的**回调地狱**～产生**回调地狱**的原因归结起来有两点：

1.**嵌套调用**，第一个函数的输出往往是第二个函数的输入；

2.**处理多个异步请求并发**，开发时往往需要同步请求最终的结果。

原因分析出来后，那么问题的解决思路就很清晰了：

1.**消灭嵌套调用**：通过 Promise 的链式调用可以解决；

2.**合并多个任务的请求结果**：使用 Promise.all 获取合并多个任务的错误处理。

Promise 正是用一种更加友好的代码组织方式，解决了异步嵌套的问题。

我们来看看上面的例子用 Promise 实现是什么样的：

```js
let fs = require('fs')

function read(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

read('./name.txt')
  .then(data => {
    return read(data)
  })
  .then(data => {
    return read(data)
  })
  .then(
    data => {
      console.log(data)
    },
    err => {
      console.log(err)
    }
  )
```

臃肿的嵌套变得线性多了有木有？没错，他就是我们的异步神器 Promise！

让我们再次回归刚才的问题，**Promise 为我们解决了什么问题？** 在传统的异步编程中，如果异步之间存在依赖关系，就需要通过层层嵌套回调的方式满足这种依赖，如果嵌套层数过多，可读性和可以维护性都会变得很差，产生所谓的“回调地狱”，而 Promise 将嵌套调用改为链式调用，增加了可阅读性和可维护性。也就是说，Promise 解决的是异步编码风格的问题。**那 Promise 的业界实现都有哪些呢？** 业界比较著名的实现 Promise 的类库有 bluebird、Q、ES6-Promise。

## 从零开始，手写 Promise

### Promise/A+

我们想要手写一个 Promise，就要遵循 [Promise/A+](https://promisesaplus.com/) 规范，业界所有 Promise 的类库都遵循这个规范。

其实 Promise/A+ 规范对如何实现一个符合标准的 Promise 类库已经阐述的很详细了。每一行代码在 Promise/A+ 规范中都有迹可循，所以在下面的实现的过程中，我会尽可能的将代码和 Promise/A+ 规范一一对应起来。

下面开始步入正题啦～

### 基础版 Promise

我们先来回顾下最简单的 Promise 使用方式：

```js
const p1 = new Promise((resolve, reject) => {
  console.log('create a promise')
  resolve('成功了')
})

console.log('after new promise')

const p2 = p1.then(data => {
  console.log(data)
  throw new Error('失败了')
})

const p3 = p2.then(
  data => {
    console.log('success', data)
  },
  err => {
    console.log('faild', err)
  }
)
```

控制台输出：

```js
'create a promise'
'after new promise'
'成功了'
'faild Error: 失败了'
```

- 首先我们在调用 Promise 时，会返回一个 Promise 对象。
- 构建 Promise 对象时，需要传入一个 **executor 函数**，Promise 的主要业务流程都在 executor 函数中执行。
- 如果运行在 excutor 函数中的业务执行成功了，会调用 resolve 函数；如果执行失败了，则调用 reject 函数。
- Promise 的状态不可逆，同时调用 resolve 函数和 reject 函数，默认会采取第一次调用的结果。

以上简单介绍了 Promise 的一些主要的使用方法，结合 [Promise/A+](https://promisesaplus.com/) 规范，我们可以分析出 Promise 的基本特征：

1. promise 有三个状态：`pending`，`fulfilled`，or `rejected`；「规范 Promise/A+ 2.1」
2. `new promise`时， 需要传递一个`executor()`执行器，执行器立即执行；
3. `executor`接受两个参数，分别是`resolve`和`reject`；
4. promise 的默认状态是 `pending`；
5. promise 有一个`value`保存成功状态的值，可以是`undefined/thenable/promise`；「规范 Promise/A+ 1.3」
6. promise 有一个`reason`保存失败状态的值；「规范 Promise/A+ 1.5」
7. promise 只能从`pending`到`rejected`, 或者从`pending`到`fulfilled`，状态一旦确认，就不会再改变；
8. promise 必须有一个`then`方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」
9. 如果调用 then 时，promise 已经成功，则执行`onFulfilled`，参数是`promise`的`value`；
10. 如果调用 then 时，promise 已经失败，那么执行`onRejected`, 参数是`promise`的`reason`；
11. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调`onRejected`；

按照上面的特征，我们试着勾勒下 Promise 的形状：

```js
// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    // 默认状态为 PENDING
    this.status = PENDING
    // 存放成功状态的值，默认为 undefined
    this.value = undefined
    // 存放失败状态的值，默认为 undefined
    this.reason = undefined

    // 调用此方法就是成功
    let resolve = value => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
      }
    }

    // 调用此方法就是失败
    let reject = reason => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject)
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error)
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}
```

写完代码我们可以测试一下：

```js
const promise = new Promise((resolve, reject) => {
  resolve('成功')
}).then(
  data => {
    console.log('success', data)
  },
  err => {
    console.log('faild', err)
  }
)
```

控制台输出：

```js
'success 成功'
```

现在我们已经实现了一个基础版的 Promise，但是还不要高兴的太早噢，这里我们只处理了同步操作的 promise。如果在 `executor()`中传入一个异步操作的话呢，我们试一下：

```js
const promise = new Promise((resolve, reject) => {
  // 传入一个异步操作
  setTimeout(() => {
    resolve('成功')
  }, 1000)
}).then(
  data => {
    console.log('success', data)
  },
  err => {
    console.log('faild', err)
  }
)
```

执行测试脚本后发现，promise 没有任何返回。

因为 promise 调用 then 方法时，当前的 promise 并没有成功，一直处于 pending 状态。所以如果当调用 then 方法时，当前状态是 pending，我们需要先将成功和失败的回调分别存放起来，在`executor()`的异步任务被执行时，触发 resolve 或 reject，依次调用成功或失败的回调。

结合这个思路，我们优化一下代码：

```js
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    // 存放成功的回调
    this.onResolvedCallbacks = []
    // 存放失败的回调
    this.onRejectedCallbacks = []

    let resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })

      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}
```

测试一下：

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  }, 1000)
}).then(
  data => {
    console.log('success', data)
  },
  err => {
    console.log('faild', err)
  }
)
```

控制台等待 `1s` 后输出：

```js
'success 成功'
```

ok！大功告成，异步问题已经解决了！

熟悉设计模式的同学，应该意识到了这其实是一个**发布订阅模式**，这种`收集依赖 -> 触发通知 -> 取出依赖执行`的方式，被广泛运用于发布订阅模式的实现。

### then 的链式调用&值穿透特性

我们都知道，promise 的优势在于可以链式调用。在我们使用 Promise 的时候，当 then 函数中 return 了一个值，不管是什么值，我们都能在下一个 then 中获取到，这就是所谓的**then 的链式调用**。而且，当我们不在 then 中放入参数，例：`promise.then().then()`，那么其后面的 then 依旧可以得到之前 then 返回的值，这就是所谓的**值的穿透**。那具体如何实现呢？简单思考一下，如果每次调用 then 的时候，我们都重新创建一个 promise 对象，并把上一个 then 的返回结果传给这个新的 promise 的 then 方法，不就可以一直 then 下去了么？那我们来试着实现一下。这也是手写 Promise 源码的重中之重，所以，打起精神来，重头戏来咯！

有了上面的想法，我们再结合 [Promise/A+](https://promisesaplus.com/) 规范梳理一下思路：

1. then 的参数 `onFulfilled` 和 `onRejected` 可以缺省，如果 `onFulfilled` 或者 `onRejected`不是函数，将其忽略，且依旧可以在下面的 then 中获取到之前返回的值；「规范 Promise/A+ 2.2.1、2.2.1.1、2.2.1.2」
2. promise 可以 then 多次，每次执行完 promise.then 方法后返回的都是一个“新的 promise"；「规范 Promise/A+ 2.2.7」
3. 如果 then 的返回值 x 是一个普通值，那么就会把这个结果作为参数，传递给下一个 then 的成功的回调中；
4. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.2.7.2」
5. 如果 then 的返回值 x 是一个 promise，那么会等这个 promise 执行完，promise 如果成功，就走下一个 then 的成功；如果失败，就走下一个 then 的失败；如果抛出异常，就走下一个 then 的失败；「规范 Promise/A+ 2.2.7.3、2.2.7.4」
6. 如果 then 的返回值 x 和 promise 是同一个引用对象，造成循环引用，则抛出异常，把异常传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.3.1」
7. 如果 then 的返回值 x 是一个 promise，且 x 同时调用 resolve 函数和 reject 函数，则第一次调用优先，其他所有调用被忽略；「规范 Promise/A+ 2.3.3.3.3」

我们将代码补充完整：

```js
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      let then = x.then
      if (typeof then === 'function') {
        // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(
          x,
          y => {
            // 根据 promise 的状态决定是成功还是失败
            if (called) return
            called = true
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject)
          },
          r => {
            // 只要失败就失败 Promise/A+ 2.3.3.3.2
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(x)
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return
      called = true
      reject(e)
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    let resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    //解决 onFufilled，onRejected 没有传值的问题
    //Promise/A+ 2.2.1 / Promise/A+ 2.2.5 / Promise/A+ 2.2.7.3 / Promise/A+ 2.2.7.4
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err
          }
    // 每次调用 then 都返回一个新的 promise  Promise/A+ 2.2.7
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        //Promise/A+ 2.2.2
        //Promise/A+ 2.2.4 --- setTimeout
        setTimeout(() => {
          try {
            //Promise/A+ 2.2.7.1
            let x = onFulfilled(this.value)
            // x可能是一个proimise
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            //Promise/A+ 2.2.7.2
            reject(e)
          }
        }, 0)
      }

      if (this.status === REJECTED) {
        //Promise/A+ 2.2.3
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }
}
```

测试一下：

```js
const promise = new Promise((resolve, reject) => {
  reject('失败')
})
  .then()
  .then()
  .then(
    data => {
      console.log(data)
    },
    err => {
      console.log('err', err)
    }
  )
```

控制台输出：

```js
'失败 err'
```

至此，我们已经完成了 promise 最关键的部分：then 的链式调用和值的穿透。搞清楚了 then 的链式调用和值的穿透，你也就搞清楚了 Promise。

### 测试 Promise 是否符合规范

Promise/A+规范提供了一个专门的测试脚本，可以测试所编写的代码是否符合 Promise/A+的规范。

首先，在 promise 实现的代码中，增加以下代码:

```js
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
```

安装测试脚本:

```bash
npm install -g promises-aplus-tests
```

如果当前的 promise 源码的文件名为 promise.js

那么在对应的目录执行以下命令:

```bash
promises-aplus-tests promise.js
```

promises-aplus-tests 中共有 872 条测试用例。以上代码，可以完美通过所有用例。

由于原生的 Promise 是 V8 引擎提供的微任务，我们无法还原 V8 引擎的实现，所以这里使用 setTimeout 模拟异步，所以原生的是微任务，这里是宏任务。

Promise A+ 规范 3.1 中也提到了：这可以通过“宏任务”机制（例如 setTimeout 或 setImmediate）或“微任务”机制（例如 MutatonObserver 或）来实现 process.nextTick。

如果你想实现 promise 的微任务，可以 mutationObserver 替代 seiTimeout 来实现微任务。

也可以使用 queueMicrotask 实现微任务，不过 queueMicrotask 兼容性不是很好，IE 下完全不支持。据我所知 queueMicrotask 的 polyfill 是基于 promise 实现的，如果不支持 promise 会转成 setTimeout。

总的来说，queueMicrotask 和 mutationObserver 都可以实现微任务机制

## Promise 的 API

虽然上述的 promise 源码已经符合 Promise/A+ 的规范，但是原生的 Promise 还提供了一些其他方法，如:

- Promise.resolve()
- Promise.reject()
- Promise.prototype.catch()
- Promise.prototype.finally()
- Promise.all()
- Promise.race()

下面具体说一下每个方法的实现:

### Promise.resolve

默认产生一个成功的 promise。

```js
static resolve(data){
  return new Promise((resolve,reject)=>{
    resolve(data);
  })
}
```

这里需要注意的是，**promise.resolve 是具备等待功能的**。如果参数是 promise 会等待这个 promise 解析完毕，在向下执行，所以这里需要在 resolve 方法中做一个小小的处理：

```js
let resolve = value => {
  // ======新增逻辑======
  // 如果 value 是一个promise，那我们的库中应该也要实现一个递归解析
  if (value instanceof Promise) {
    // 递归解析
    return value.then(resolve, reject)
  }
  // ===================
  if (this.status === PENDING) {
    this.status = FULFILLED
    this.value = value
    this.onResolvedCallbacks.forEach(fn => fn())
  }
}
```

测试一下：

```js
Promise.resolve(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok')
    }, 3000)
  })
)
  .then(data => {
    console.log(data, 'success')
  })
  .catch(err => {
    console.log(err, 'error')
  })
```

控制台等待 `3s` 后输出：

```js
'ok success'
```

### Promise.reject

默认产生一个失败的 promise，Promise.reject 是直接将值变成错误结果。

```js
static reject(reason){
  return new Promise((resolve,reject)=>{
    reject(reason);
  })
}
```

### Promise.prototype.catch

Promise.prototype.catch 用来捕获 promise 的异常，**就相当于一个没有成功的 then**。

```js
Promise.prototype.catch = function (errCallback) {
  return this.then(null, errCallback)
}
```

### Promise.prototype.finally

finally 表示不是最终的意思，而是无论如何都会执行的意思。 如果返回一个 promise 会等待这个 promise 也执行完毕。如果返回的是成功的 promise，会采用上一次的结果；如果返回的是失败的 promise，会用这个失败的结果，传到 catch 中。

```js
Promise.prototype.finally = function (callback) {
  return this.then(
    value => {
      return Promise.resolve(callback()).then(() => value)
    },
    reason => {
      return Promise.resolve(callback()).then(() => {
        throw reason
      })
    }
  )
}
```

测试一下：

```js
Promise.resolve(456)
  .finally(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(123)
      }, 3000)
    })
  })
  .then(data => {
    console.log(data, 'success')
  })
  .catch(err => {
    console.log(err, 'error')
  })
```

控制台等待 `3s` 后输出：

```js
'456 success'
```

### Promise.all

promise.all 是解决并发问题的，多个异步并发获取最终的结果（如果有一个失败则失败）。

```js
Promise.all = function (values) {
  if (!Array.isArray(values)) {
    const type = typeof values
    return new TypeError(`TypeError: ${type} ${values} is not iterable`)
  }
  return new Promise((resolve, reject) => {
    let resultArr = []
    let orderIndex = 0
    const processResultByKey = (value, index) => {
      resultArr[index] = value
      if (++orderIndex === values.length) {
        resolve(resultArr)
      }
    }
    for (let i = 0; i < values.length; i++) {
      let value = values[i]
      if (value && typeof value.then === 'function') {
        value.then(value => {
          processResultByKey(value, i)
        }, reject)
      } else {
        processResultByKey(value, i)
      }
    }
  })
}
```

测试一下：

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok1')
  }, 1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('ok2')
  }, 1000)
})

Promise.all([1, 2, 3, p1, p2]).then(
  data => {
    console.log('resolve', data)
  },
  err => {
    console.log('reject', err)
  }
)
```

控制台等待 `1s` 后输出：

```js
"resolve [ 1, 2, 3, 'ok1', 'ok2' ]"
```

### Promise.race

Promise.race 用来处理多个请求，采用最快的（谁先完成用谁的）。

```js
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    // 一起执行就是for循环
    for (let i = 0; i < promises.length; i++) {
      let val = promises[i]
      if (val && typeof val.then === 'function') {
        val.then(resolve, reject)
      } else {
        // 普通值
        resolve(val)
      }
    }
  })
}
```

特别需要注意的是：因为**Promise 是没有中断方法的**，xhr.abort()、ajax 有自己的中断方法，axios 是基于 ajax 实现的；fetch 基于 promise，所以他的请求是无法中断的。

这也是 promise 存在的缺陷，我们可以使用 race 来自己封装中断方法：

```js
function wrap(promise) {
  // 在这里包装一个 promise，可以控制原来的promise是成功还是失败
  let abort
  let newPromise = new Promise((resolve, reject) => {
    // defer 方法
    abort = reject
  })
  let p = Promise.race([promise, newPromise]) // 任何一个先成功或者失败 就可以获取到结果
  p.abort = abort
  return p
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 模拟的接口调用 ajax 肯定有超时设置
    resolve('成功')
  }, 1000)
})

let newPromise = wrap(promise)

setTimeout(() => {
  // 超过3秒 就算超时 应该让 proimise 走到失败态
  newPromise.abort('超时了')
}, 3000)

newPromise
  .then(data => {
    console.log('成功的结果' + data)
  })
  .catch(e => {
    console.log('失败的结果' + e)
  })
```

控制台等待 `1s` 后输出：

```js
'成功的结果成功'
```

## promisify

promisify 是把一个 node 中的 api 转换成 promise 的写法。 在 node 版本 12.18 以上，已经支持了原生的 promisify 方法：`const fs = require('fs').promises`

```js
const promisify = fn => {
  // 典型的高阶函数 参数是函数 返回值是函数
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        // node中的回调函数的参数 第一个永远是error
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}
```

如果想要把 node 中所有的 api 都转换成 promise 的写法呢：

```js
const promisifyAll = target => {
  Reflect.ownKeys(target).forEach(key => {
    if (typeof target[key] === 'function') {
      // 默认会将原有的方法 全部增加一个 Async 后缀 变成 promise 写法
      target[key + 'Async'] = promisify(target[key])
    }
  })
  return target
}
```
