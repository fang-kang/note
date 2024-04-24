# 关于 setState 获取不到最新的值

## 1. 问题描述

在 `class` 中,如果 我们想要拿到 `setState` 最新的值,去调用 `api`,直接通过 `this.setState` 的回调函数就可以了

```jsx
this.setState(
  {
    value: '我是最新的',
  },
  () => {
    console.log(value) // 这里就会拿到最新的值
  }
)
```

然后我们在 `react hooks` 中 `setState` 确是拿到上一次的缓存,是因为，函数在每次渲染时也是独立的。

```jsx
const [value, setValue] = useState('')

function handleChange(val) {
  setValue(val)
  search()
}

function search() {
  console.log(value) // 这里拿到的值 是上一次的值,不是最新的
}
```

## 2. 解决方法

### 2.1 参数传递

直接把需要参数的值当作参数传进需要的函数,拿到的就是最新的了

```jsx
const [value, setValue] = useState('')

function handleChange(val) {
  setValue(val)
  // 直接把参数的值 传进去 拿到的就是最新的了
  search(val)
}

function search(value) {
  console.log(value)
}
```

### 2.2 使用 useEffect

在 `useEffect` 钩子函数中获取最新的值

```jsx
const [value, setValue] = useState('')

useEffect(() => {
  // 最新的值
  search()
}, [value]) // 依赖的值 等value 改变了 才触发

function handleChange(val) {
  setValue(val)
}

function search() {
  console.log(value)
}
```

### 2.3 使用 ref

使用`ref`

```jsx
const [value, setValue] = useState('')
const valueRef = useRef(null)

useEffect(() => {
  // 每次 更新 把值 复制给 value
  valueRef.current = value
}, [value]) // 依赖的值 value 改变了 才触发

function handleChange(val) {
  setValue(val)

  // **设置一个延迟 0毫秒,这个 很重要**
  setTimeout(() => {
    search()
  }, 0)
}

function search() {
  // 这里的值 就是 拿到最新的值了
  const _value = valueRef.current
  console.log(_value)
}
```

### 2.4 自定义 hooks

使用自定义 hooks `useSyncState`

```jsx
import { useState, useRef, useCallback } from 'react'

export const useSyncState = initVal => {
  const [val, setVal] = useState(initVal)

  const valRef = useRef(initVal)

  const setState = useCallback(changeVal => {
    valRef.current = changeVal
    setVal(changeVal)
  }, [])

  return [val, setState, valRef]
}
```

```jsx
import { Input } from 'antd'
import { useSyncState } from '../../hooks/useSyncState'

export default function Home() {
  const [value, setValue, currentValue] = useSyncState('')

  function handleChange(val) {
    setValue(val)
    search()
  }

  function search() {
    console.log(value, 'value')

    console.log(currentValue.current, 'currentValue')
  }

  return (
    <div>
      <Input onChange={e => handleChange(e.target.value)}></Input>
    </div>
  )
}
```
