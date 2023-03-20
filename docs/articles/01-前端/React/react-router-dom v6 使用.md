# react-router-dom v6 使用

[官网](https://reactrouter.com/en/6.9.0)

## 1.基本用法

### React-Router 的安装方法

```bash
npm install react-router-dom
```

全局路由有常用两种路由模式可选：`HashRouter` 和 `BrowserRouter` `HashRouter`：URL 中采用的是`hash`(#)部分去创建路由，类似`www.example.com/#/,` `BrowserRouter`：URL 采用真实的 URL 资源

入口文件：

```typescript
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

### 常用组件和 hooks

路由功能 `React-Router` V6 版本常用路由组件和`hooks`，其他不常用的大家可以看下官网的介绍

| 组件名      | 作用           | 说明                                                                                    |
| ----------- | -------------- | --------------------------------------------------------------------------------------- |
| `<Routers>` | 一组路由       | 代替原有`<Switch>`，所有子路由都用基础的 Router children 来表示, 现在不会再有模糊匹配了 |
| `<Router>`  | 基础路由       | Router 是可以嵌套的，解决原有 V5 中严格模式，后面与 V5 区别会详细介绍                   |
| `<Link>`    | 导航组件       | 在实际页面中跳转使用                                                                    |
| `<Outlet/>` | 自适应渲染组件 | 根据实际路由 url 自动选择组件(类似 Vue 中的`RouterView`组件)                            |

| hooks 名          | 作用                                      | 说明                        |
| ----------------- | ----------------------------------------- | --------------------------- |
| `useParams`       | 返回当前参数                              | 根据路径读取参数            |
| `useNavigate`     | 返回当前路由                              | 代替原有 V5 中的 useHistory |
| `useOutlet`       | 返回根据路由生成的 element                |                             |
| `useLocation`     | 返回当前的 location 对象                  |                             |
| `useRoutes`       | 同 Routers 组件一样，只不过是在 js 中使用 |                             |
| `useSearchParams` | 用来匹配 URL 中?后面的搜索参数            |                             |

### 嵌套路由

嵌套路由是 V6 版本对之前版本一个较大的升级，采用嵌套路由会智能的识别

```typescript
function App() {
  return (
    <Routes>
      <Route path="user" element={<Users />}>
        <Route path=":id" element={<UserDetail />} />
        <Route path="create" element={<NewUser />} />
      </Route>
    </Routes>
  )
}
```

当访问 /user/123 的时候，组件树将会变成这样

```js
<App>
  <Users>
    <UserDetail />
  </Users>
</App>
```

当访问/user/create 的时候，组件树将变成这样

```js
<App>
  <Users>
    <NewUser />
  </Users>
</App>
```

如果只是内部组件修改，也可以采用`<Outlet/>`来直接实现，如下所示

```js
function App() {
  return (
    <Routes>
      <Route path="user" element={<Users />}>
        <Route path=":id" element={<UserDetail />} />
        <Route path="create" element={<NewUser />} />
      </Route>
    </Routes>
  )
}
function Users() {
  return (
    <div>
      <h1>Users</h1>
      <Outlet />
    </div>
  )
}
```

### 集中式路由

可以像`vue-router`一样配置路由表

`router/index.ts`

```typescript
import { useRoutes } from 'react-router-dom'
import { RouteObject } from 'react-router-dom'
const Router = () => {
  let element: RouteObject[] = useRoutes([
    // These are the same as the props you provide to <Route>
    {
      path: 'home',
      element: <Layout />,
      // Nested routes use a children property, which is also
      // the same as <Route>
      children: [
        { path: '/home/user', element: <User /> },
        { path: '/home/user/:id', element: <Userinfo /> },
        { path: 'login', element: <Login /> },
        // Not found routes work as you'd expect
        { path: '*', element: <NotFound /> },
      ],
    },
  ])
  return element
}
```

`App.tsx`

```typescript
import Router from './router'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  )
}

export default App
```

路由懒加载:

路由页面:

```typescript
import { useRoutes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
// 因为Layout是公共部分 所以预加载
import Layout from '../pages/Layout'
const Login = lazy(() => import('../pages/Login'))
const User = lazy(() => import('../pages/User'))
const Userinfo = lazy(() => import('../pages/Userinfo'))
const lazyLoad = children => {
  return <Suspense fallback={<>loading</>}>{children}</Suspense>
}
const Router = () => {
  let element: RouteObject[] = useRoutes([
    // These are the same as the props you provide to <Route>
    {
      path: 'home',
      element: <Layout />,
      // Nested routes use a children property, which is also
      // the same as <Route>
      children: [
        { path: '/home/user', element: lazyLoad(<User />) },
        { path: '/home/user/:id', element: lazyLoad(<Userinfo />) },
        { path: 'login', element: lazyLoad(<Login />) },
      ],
    },
  ])
  return element
}
export default Router
```

### index 路由

`index`属性解决当嵌套路由有多个子路由但本身无法确认默认渲染哪个子路由的时候，可以增加`index`属性来指定默认路由

```js
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<About />} />
        <Route path="user" element={<User />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}
```

这样当访问/的时候`<Outlet/>`会默认渲染 About 组件

### 路由通配符

整个 react-router 支持以下几种通配符

```bash
/groups
/groups/admin
/users/:id
/users/:id/messages
/files/*
/files/:id/*
```

注意，以下这些正则方式在 V6 里面是不支持的

```bash
/users/:id?
/tweets/:id(\d+)
/files/*/cat.jpg
/files-*
```

这里的`*`只能用在/后面，不能用在实际路径中间

关于 NotFound 类路由，可以用`*`来代替

```js
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
```

### 获取参数 useParams 和 useSearchParams

假设现有 App 路由

```js
function App() {
  return (
    <Routes>
      <Route path="user" element={<Users />}>
        <Route path=":id" element={<UserDetail />} />
        <Route path="create" element={<NewUser />} />
      </Route>
    </Routes>
  )
}
```

那么在 UserDetail 内部需要用 useParams 来获取对应的参数

```js
import { useParams } from 'react-router-dom'

export default function UserDetail() {
  let params = useParams()
  return <h2>User: {params.id}</h2>
}
```

useSearchParams 相对复杂，他返回的是一个当前值和 set 方法

```js
let [searchParams, setSearchParams] = useSearchParams()
```

使用时可以用`searchParams.get("id")`来获取参数，同时页面内也可以 setSearchParams({"id":2})来改变路由，这样当访问`http://URL/user?id=111`时就可以获取和设置路径

### useNavigate

`useNavigate`是替代原有 V5 中的`useHistory`的新 hooks，其用法和`useHistory`类似，整体使用起来更轻量，他的声明方式如下：

```typescript
declare function useNavigate(): NavigateFunction

interface NavigateFunction {
  (to: To, options?: { replace?: boolean; state?: State }): void
  (delta: number): void
}
```

```js
  //js写法
  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  //组件写法
  function App() {
     return <Navigate to="/home" replace state={state} />;
  }
  //替代原有的go goBack和goForward
 <button onClick={() => navigate(-2)}>
    Go 2 pages back
  </button>
  <button onClick={() => navigate(-1)}>Go back</button>
  <button onClick={() => navigate(1)}>
    Go forward
  </button>
  <button onClick={() => navigate(2)}>
    Go 2 pages forward
  </button>
```

## 2.与 V5 的区别

### 用`<Routes>` children 形式替代`<Switch>`

V5 写法：

```js
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/users/:id" children={<User />} />
    </Switch>
  )
}
```

V6 写法

```js
function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="/users/:id" element={<User />} />
    </Routes>
  )
}
```

### 去除 Switch 中的`<Redirect>`，用 react-router-dom 中的 Redirect 替代，或者用 `<Navigate>` 实现

V5 写法：

```js
<Switch>
  <Redirect from="about" to="about-us" />
</Switch>
```

V6 写法：

```js
 <Route path="about" render={() => <Navigate to="about-us" />}
```

### `<Link to>`支持相对位置

V5 版本的 to 属性只支持绝对位置，如`<Lint to="me">`表示`<Lint to="/me">`，如果当时正在 Users 组件内,想跳转需要`<Lint to="/users/me">`。在 V6 中，Link 默认支持相对位置，也就是`<Lint to="me">` 在 Users 组件内会等价于`<Lint to="/users/me">`，同时支持'..' 和'.'等相对路径写法。

```js
// If your routes look like this
<Route path="app">
<Route path="dashboard">
 <Route path="stats" />
</Route>
</Route>

// and the current URL is /app/dashboard (with or without
// a trailing slash)
<Link to="stats">               => <a href="/app/dashboard/stats">
<Link to="../stats">            => <a href="/app/stats">
<Link to="../../stats">         => <a href="/stats">
<Link to="../../../stats">      => <a href="/stats">
```

### 使用 useNavigate 代替 useHistory

可以参考上面`useNavigate`使用，这里不再赘述
