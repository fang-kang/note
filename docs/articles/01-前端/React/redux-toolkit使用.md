# redux-toolkit 使用

`redux`的使用一直是很多人在`react`开发中无法逃开的痛，各种中间件，各种配置，各种目录规范，让很多想尝试的人选择了放弃。不过`redux`官方推出了 redux-toolkit 这个库，完全符合大家的胃口，可谓的完美验证了真香定律

官网地址：[https://redux.js.org/](https://link.zhihu.com/?target=https%3A//redux.js.org/)

## 1.安装

```bash
npm i react-redux @reduxjs/toolkit
npm i redux-devtools -D # 安装调试工具，-D安装开发依赖
```

## 2.API

**Redux Toolkit 的核心 API 主要是如下几个**:

- `configureStore`: 包装`createStore`以提供简化的配置选项和良好的默认值。它可以自动组合你的 slice reducer，添加你提供 的任何 `Redux` 中间件，redux-thunk 默认包含，并启用 `Redux DevTools Extension`。
- `createSlice`: 接受`reducer`函数的对象、切片名称和初始状态值，并自动生成切片`reducer`，并带有相应的`actions`。
- `createAsyncThunk`: 接受一个动作类型字符串和一个返回承诺的函数，并生成一个`pending/fulfilled/rejected`基于该承诺分派动作类型的 `thunk`

## 3.使用

**`configureStore`用于创建 store 对象，常见参数如下**:

- reducer: 将`slice`中的`reducer`可以组成一个对象传入此处
- middleware:可以使用参数，传入其他的中间件(自行了解)
- devTools:是否配置`devTools`工具，默认为`true`

`store/index.ts`

```tsx
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import * as reducer from './modules'

const rootReducer = combineReducers({
  ...reducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export default store
```

**createSlice 主要包含如下几个参数:**

**name:用户标记 slice 的名词**

> 在之后的 redux-devtool 中会显示对应的名词

**initialState:初始化值**

> 第一次初始化时的值;

**reducers:相当于之前的 reducer 函数**

> 对象类型，对象中可以添加很多的函数;
>
> 函数类似于 redux 原来 reducer 中的一个 case 语句;
>
> 函数的参数:
>
> 参数一: state, 当前的 state 状态
> 参数二: 传递的 actions 参数, actions 有两个属性, 一个是自动生成的 type, 另一个是传递的参数放在 payload 中;

**createSlice 返回值是一个对象，包含所有的 actions**;

`store/counter.ts`

```tsx
import { createSlice, Dispatch } from '@reduxjs/toolkit'

export interface CounterState {
  count: number
}

const initialState: CounterState = {
  count: 0,
}

export const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state, { payload }) {
      state.count = state.count + payload.step // 内置了immutable
    },
    decrement(state) {
      state.count -= 1
    },
  },
})

// 导出 reducers 方法
export const { increment, decrement } = counter.actions

// 默认导出
export default counter.reducer

// 内置了thunk插件，可以直接处理异步请求
export const asyncIncrement = (payload: any) => (dispatch: Dispatch) => {
  console.log(payload, 'payload')
  setTimeout(() => {
    dispatch(increment(payload))
  }, 2000)
}
```

**接下来使用 store 中的 counter 数据和修改 counter 的操作和之前一样, 借助于 react-redux 库进行连接使用**

```tsx
import { RootState } from '@/store'
import { asyncIncrement, increment } from '@/store/modules/counter'
import { useSelector, useDispatch } from 'react-redux'

export default function Counter() {
  const { count } = useSelector((store: RootState) => store.couter)
  const dispatch = useDispatch()
  const changeNumber = (num: number) => {
    dispatch(increment({ step: num }))
  }

  const changeNumberAsync = (num: number) => {
    dispatch(asyncIncrement({ step: num }) as any)
  }
  return (
    <div>
      <h2>Counter</h2>
      <h2>当前计数: {count}</h2>
      <button onClick={() => changeNumber(5)}>+5</button>
      <button onClick={() => changeNumberAsync(10)}>+10</button>
    </div>
  )
}
```

创建异步`action`
`createAsyncThunk`方法可以创建一个异步的`action`，这个方法被执行的时候会有三个( `pending`(进行中) `fulfilled`(成功) `rejected`(失败))状态。可以监听状态的改变执行不同的操作。以下代码示例中使用到了`extraReducers`创建额外的`action`对数据获取的状态信息进行监听。

```tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// createAsyncThunk创建一个异步的action，这个方法被触发的时候会有三个状态
// pending(进行中) fulfilled(成功) rejected(失败)
import { increment } from './counter'
// 发起网络请求获取数据
const loadMoviesAPI = () =>
  fetch('https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=2&ret_num=48').then(
    res => res.json()
  )
// 这个action是可以直接调用的，用来处理异步操作获取数据
export const loadData = createAsyncThunk('movie/loadData', async () => {
  const res = await loadMoviesAPI()
  return res // 此处的返回结果会在 .fulfilled中作为payload的值
})
export const movieSLice = createSlice({
  name: 'movie',
  initialState: {
    list: [],
    totals: 0,
  },
  reducers: {
    loadDataEnd(state, { payload }) {
      state.list = payload
      state.totals = payload.length
    },
  },
  // 可以额外的触发其他slice中的数据关联改变
  extraReducers: {
    [loadData.fulfilled](state, { payload }) {
      console.log(payload)
      state.list = payload.data.list
    },
    [loadData.rejected](state, err) {
      console.log(err)
    },
    [loadData.pending](state) {
      console.log('进行中')
    },
  },
})

export const { loadDataEnd } = movieSLice.actions
export default movieSLice.reducer
```
 
 