# ReactHooks

`Hook` 是 React16.8 的新特性，`Hook` 使你在无需修改组件结构的情况下复用状态逻辑。

弥补了 functin Component 没有实例没有生命周期的问题，`react` 项目基本上可以全部用 function Component 去实现了。

## hook 总览

常用的官方的 `hook` 主要是下面几个：

- useState()
- useReducer()
- useContext()
- useRef()
- useImperative()
- useEffect()
- useLayoutEffect()
- useMemo()
- useCallback()

## hook 基础

hook 使用规则：

- 不要在循环，条件，或者嵌套函数中调用 hook，在最顶层使用 hook
- 不能在普通函数中调用 hook

下面主要记录每个 hook 基础的用法，

### useState

存取数据的一种方式，对于简单的 state 适用，复杂的更新逻辑的 state 考虑使用 useReducer

使用：

```js
const [state, setState] = useState(initState)
```

更新：

```js
setState(newState)
setState(state => newState) // 函数式更新
```

setState 是稳定的，所以在一些 hook 依赖中可以省略

### useReducer

useState 的一种代替方案，当 state 的处理逻辑比较复杂的时候，有多个子值得时候，可以考虑用 useReducer

使用：

```js
const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    default:
      throw new Error()
  }
}
const [state, dispatch] = useReducer(reducer, initialState)
```

如果有第三个参数，则第三个参数为一个函数，接受第二个参数的值作为参数，返回初始值。

dispatch 是稳定的，所以在一些 hook 依赖中可以省略

### useContext

```js
const value = useContext(MyContext)
```

接受一个 context 对象，并返回该 context 对象的当前值，配合 context 使用

```js
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}

const ThemeContext = React.createContext(themes.light)

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  const theme = useContext(ThemeContext)
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>I am styled by theme context!</button>
  )
}
```

### useRef

```js
const refContainer = useRef(initValue)
```

返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。

- 访问 dom 的一个方式
- 可以将其作为一个值来使用，在每次渲染时都返回同一个 ref 对象
- 改变其 ref 的值，不会引起组件的重新渲染

例子 1，访问 dom 的方式：

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus()
  }
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```

例子 2，作为一个对象来保存值：

```js
import { useEffect, useRef, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  // 记录定时器，方便可以随时停止计时器
  let timer = useRef(null)
  useEffect(() => {
    timer.current = setInterval(() => {
      console.log(1)
      setCount(count => count + 1)
    }, 1000)
    return () => {
      clearInterval(timer.current)
      timer.current = null
    }
  }, [])

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
  }
  return (
    <div>
      <span>{count}</span>
      <button onClick={stop}>stop</button>
    </div>
  )
}

export default App
```

### useImperativeHandle

`useImperativeHandle` 可以让你在使用 ref 时自定义暴露给父组件的实例值

```js
useImperativeHandle(ref, createHandle, [deps])
```

- ref：需要被赋值的 ref 对象
- createHandle：的返回值作为 ref.current 的值。
- [deps]：依赖数组，依赖发生变化重新执行 createHandle 函数

使用例子：

```js
const Child = React.forwardRef((props, ref) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))
  return <input ref={inputRef} />
})
```

或者

```js
// App.js
;<Child cRef={this.myRef} />
f
// Child.js
const Child = props => {
  const inputRef = useRef()
  const { cRef } = props
  useImperativeHandle(cRef, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))
  return <input ref={inputRef} />
}
```

### useEffect

引入副作用，销毁函数和回调函数在 commit 阶段异步调度，在 layout 阶段完成后异步执行，不会阻塞 ui 得渲染。

```js
useEffect(() => {
  //...副作用
  return () => {
    // ...清除副作用
  }
}, [deps])
```

- 副作用在 commit 阶段异步执行，清除副作用的销毁函数会在下一阶段的的 commit 阶段执行，
- [deps]：依赖数组，依赖发生变化重新执行

### useLayoutEffect

引入副作用的，用法和 `useEffect` 一样，但 `useLayoutEffect` 会阻塞 `dom` 的渲染，同步执行，上一次更新的销毁函数在 commit 的 mutation 阶段执行，回调函数在在 layout 阶段执行，和 componentDidxxxx 是等价的。

### useMemo

返回一个`memo` 值，作为一种性能优化的手段，只有当依赖项的依赖改变才会重新渲染值

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

### useCallback

返回一个 `memoized` 回调函数，作为一种性能优化的手段，只有当依赖项的依赖改变才会重新构建该函数

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

### useDebugValue

`useDebugValue` 可用于在 React开发者工具中显示自定义 hook 的标签, 浏览器装有 react开发工具调试代码的时候才有用。

### useTransition

返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数。

```js
const [isPending, startTransition] = useTransition()
```

- isPending: 指示过渡任务何时活跃以显示一个等待状态，为 true 时表示过渡任务还没更新完。
- startTransition: 允许你通过标记更新将提供的回调函数作为一个过渡任务，变为过渡任务则说明更新往后放，先更新其他更紧急的任务。

例子：

```js
import React, { useEffect, useState, useTransition } from 'react'

const SearchResult = props => {
  const resultList = props.query
    ? Array.from({ length: 50000 }, (_, index) => ({
        id: index,
        keyword: `${props.query} -- 搜索结果${index}`,
      }))
    : []
  return resultList.map(({ id, keyword }) => <li key={id}>{keyword}</li>)
}

export default () => {
  const [isTrans, setIstrans] = useState(false)
  const [value, setValue] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [loading, startTransition] = useTransition({ timeoutMs: 2000 })

  useEffect(() => {
    // 监听搜索值改变
    console.log('对搜索值更新的响应++++++' + searchVal + '+++++++++++')
  }, [searchVal])

  useEffect(() => {
    // 监听输入框值改变
    console.log('对输入框值更新的响应-----' + value + '-------------')
  }, [value])

  useEffect(() => {
    if (isTrans) {
      startTransition(() => {
        setSearchVal(value)
      })
    } else {
      setSearchVal(value)
    }
  }, [value])

  return (
    <div className="App">
      <h3>StartTransition</h3>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={() => setIstrans(!isTrans)}>{isTrans ? 'transiton' : 'normal'}</button>
      {loading && <p>数据加载中，请稍候...</p>}
      <ul>
        <SearchResult query={searchVal}></SearchResult>
      </ul>
    </div>
  )
}
```

### useDeferredValue

`useDeferredValue` 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。如果当前渲染是一个紧急更新的结果，比如用户输入，React 将返回之前的值，然后在紧急渲染完成后渲染新的值。本，该副本将推迟到更紧急地更新之后

## hook 进阶

react hook 工作当中也用了一段时间了，中间踩过一些坑，针对不同 `hook` 的特点，进行总结。

- 两个 `state` 是关联或者需要一起发生改变，可以放在同一个 `state`，但不要太多
- 当 `state` 的更新逻辑比较复杂的时候则可以考虑使用 `useReducer` 代替
- `useEffect`、`useLayoutEffect`、`useMemo`、`useCallback`、`useImperativeHandle` 中依赖数组依赖项最好不要太多，太多则考虑拆分一下，感觉不超 3 到 4 个会比较合适。
- 去掉不必要的依赖项
- 合并相关的 `state` 为一个
- 通过 `setState` 回到函数方式去更新 `state`
- 按照不同维度这个 hook 还能不能拆分的更细
- `useMemo` 多用于对 `React` 元素做 `memorize` 处理或者需要复杂计算得出的值，对于简单纯 js 计算就不要进行 `useMemo` 处理了。
- useCallback要配合`memo`使用
