# Js 常用方法

## debounce

防抖的意思是，在连续的操作中，无论进行了多长时间，只有某一次的操作后在指定的时间内没有再操作，这一次才被判定有效。

具体场景可以搜索框输入关键字过程中实时 请求服务器匹配搜索结果，如果不进行处理，那么就是输入框内容一直变化，导致一直发送请求。如果进行防抖处理，结果就是当我们输入内容完成后，一定时间(比如 500ms)没有再 输入内容，这时再触发请求。

```typescript
let timeout: NodeJS.Timeout | null = null

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
export function debounce(func: Function, wait: number = 500, immediate: boolean = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    let callNow = !timeout
    timeout = setTimeout(() => {
      timeout = null
    }, wait)
    if (callNow) typeof func === 'function' && func()
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(() => {
      typeof func === 'function' && func()
    }, wait)
  }
}
```

## throttle

节流的意思是，规定时间内，只触发一次。比如我们设定 500ms，在这个时间内，无论点击按钮多少次，它都只会触发一次。

具体场景可以是抢购时候，由于有无数人 快速点击按钮，如果每次点击都发送请求，就会给服务器造成巨大的压力，但是我们进行节流后，就会大大减少请求的次数。

```typescript
let timer, flag: boolean
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
export function throttle(func: Function, wait: number = 500, immediate: boolean = true) {
  if (immediate) {
    if (!flag) {
      flag = true
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func()
      timer = setTimeout(() => {
        flag = false
      }, wait)
    }
  } else {
    if (!flag) {
      flag = true
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(() => {
        flag = false
        typeof func === 'function' && func()
      }, wait)
    }
  }
}
```

## deepClone

对象深度克隆

```typescript
// 深度克隆
export function deepClone(obj: any) {
  function isObject(value: any): boolean {
    return value !== null && typeof value === 'object'
  }

  function isFn(o: any): o is Function {
    return typeof o === 'function'
  }

  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj
  if (!isObject(obj) && !isFn(obj)) {
    //原始类型直接返回
    return obj
  }
  const o = Array.isArray(obj) ? ([] as any[]) : ({} as any)

  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = isObject(obj[i]) ? deepClone(obj[i]) : obj[i]
    }
  }
  return o
}

const a = {
  name: 'a',
}

let b = deepClone(a)

b.name = 'b'

console.log(b) // 结果为 { name: 'b' }
console.log(a) // 结果为 { name: 'a' }
```

## deepMerge

对象深度合并

```typescript
/**
 * JS对象深度合并
 * @param target
 * @param source
 * @returns
 */
export function deepMerge(target = {} as any, source = {} as any) {
  function isObject(value: any): boolean {
    return value !== null && typeof value === 'object'
  }

  function deepClone(obj: any) {
    function isObject(value: any): boolean {
      return value !== null && typeof value === 'object'
    }

    function isFn(o: any): o is Function {
      return typeof o === 'function'
    }

    // 对常见的“非”值，直接返回原来值
    if ([null, undefined, NaN, false].includes(obj)) return obj
    if (!isObject(obj) && !isFn(obj)) {
      //原始类型直接返回
      return obj
    }
    const o = Array.isArray(obj) ? ([] as any[]) : ({} as any)

    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = isObject(obj[i]) ? deepClone(obj[i]) : obj[i]
      }
    }
    return o
  }

  target = deepClone(target)
  if (!isObject(target) || !isObject(source)) return false
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue
    if (prop in target) {
      if (!isObject(target[prop])) {
        target[prop] = source[prop]
      } else {
        if (!isObject(source[prop])) {
          target[prop] = source[prop]
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop])
          } else {
            target[prop] = deepMerge(target[prop], source[prop])
          }
        }
      }
    } else {
      target[prop] = source[prop]
    }
  }
  return target
}

const a = {
  info: {
    name: 'mary',
  },
}

const b = {
  info: {
    age: '22',
  },
}

const c = deepMerge(a, b)

// c为我们期望的结果
c = {
  info: {
    age: '22',
    name: 'mary',
  },
}
```

## sleep

等待函数

```typescript
/**
 * 等待函数
 * @param { number }  ms 延迟秒数
 * @returns
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function test() {
  await sleep(3000)
  console.log(1) // 3s后打印
}

test()
```

## timeTaken

计算函数执行时间

```typescript
/**
 * 计算函数执行时间
 * @param callback
 * @returns
 */
export const timeTaken = (callback: () => any) => {
  console.time('timeTaken')
  const r = callback()
  console.timeEnd('timeTaken')
  return r
}

timeTaken(() => Math.pow(2, 10)) // 1024, (logged): timeTaken: 0.02099609375ms
```

## memoize

缓存函数

```typescript
/**
 * 缓存函数
 * @param fn
 * @returns
 */
export function memoize(fn: Function): Function {
  const cache = Object.create(null)
  return function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

memoize()
```

## once

只调用一次的函数

```typescript
/**
 * 只调用一次的函数
 * @param fn
 * @returns
 */
export function once(fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

once()
```

## getSize

获取不同类型变量的长度

```typescript
/**
 * 获取不同类型变量的长度
 * @param val
 * @returns
 */
export const getSize = (val: any) =>
  Array.isArray(val)
    ? val.length
    : val !== null && typeof val === 'object';
    ? val?.size || val?.length || Object.keys(val)?.length
    : typeof val === 'string'
    ? new Blob([val]).size
    : 0

getSize([1, 2, 3, 4, 5]) // 5
getSize('size') // 4
getSize({ one: 1, two: 2, three: 3 }) // 3
```
