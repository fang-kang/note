# react 组件 - If

## 1. 背景

众所周知，`react` 没有如 `vue` 那样的 `v-if` 指令，只能使用三元判断或者 &&，这样会让我们的 `jsx` 或者 `tsx` 文件看起来非常凌乱，不够整洁明了，所以有了这个组件。

## 2. 组件结构

```text
src
 ├── components
   ├── If
     ├── Else.tsx
     ├── ElseIf.tsx
     ├── If.tsx
     ├── index.tsx
     ├── render.tsx
     ├── Wrapper.tsx
```

## 3. 源码

::: code-group

```ts [index.tsx]
import { If } from './If'
import { ElseIf } from './ElseIf'
import { Else } from './Else'
import { Wrapper as IfWrapper } from './Wrapper'

export { If, ElseIf, Else, IfWrapper }
```

```ts [If.tsx]
import { FC, ReactElement } from 'react'
import { render } from './render'

export interface IProps {
  when: boolean
  children: ReactElement
}

export const If: FC<IProps> = (props: IProps) => render(props)
```

```ts [Else.tsx]
import { FC, ReactElement } from 'react'

interface IProps {
  children: ReactElement
}

export const Else: FC<IProps> = (props: IProps) => props.children
```

```ts [ElseIf.tsx]
import { FC } from 'react'
import { IProps } from './If'
import { render } from './render'

export const ElseIf: FC<IProps> = (props: IProps) => render(props)
```

```ts [render.tsx]
import { IProps } from './If'

export const render = (props: IProps) => {
  return props.when ? props.children : null
}
```

```ts [Wrapper.tsx]
import React, { FC, ReactElement } from 'react'
import { If } from './If'
import { Else } from './Else'
import { ElseIf } from './ElseIf'

interface IProps {
  children: ReactElement[]
}

export const getConditionResult = (when: boolean): boolean => {
  const conditionResult = Boolean(when)

  return conditionResult
}

export const Wrapper: FC<IProps> = ({ children }: IProps) => {
  let matchingElement: ReactElement | undefined
  let elseElement: ReactElement | undefined

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) {
      return
    }

    if (!matchingElement && (child.type === If || child.type === ElseIf)) {
      const { when } = child.props as any

      const conditionResult = getConditionResult(when)

      if (conditionResult) {
        matchingElement = child
      }
    } else if (!elseElement && child.type === Else) {
      elseElement = child
    }
  })

  return matchingElement ?? elseElement ?? null
}
```

:::

## 4. 使用

### 4.1 If 单独使用

```tsx
import { useState } from 'react'
import { If } from './components/If'

export function Demo() {
  const [visible, setVisible] = useState(true)

  return (
    <>
      <If when={visible}>
        <span>visible</span>
      </If>
      <button onClick={() => setVisible(!visible)}>change visible</button>
    </>
  )
}
```

### 4.2 If Else 使用

```tsx
import { useState } from 'react'
import { If, Else, IfWrapper } from './components/If'

export function Demo() {
  const [visible, setVisible] = useState(true)

  return (
    <>
      <IfWrapper>
        <If when={visible}>
          <span>visible</span>
        </If>
        <Else>
          <span>hidden</span>
        </Else>
      </IfWrapper>
      <button onClick={() => setVisible(!visible)}>change visible</button>
    </>
  )
}
```

### 4.3 If Else ElseIf 使用

```tsx
import { useState } from 'react'
import { If, Else, ElseIf, IfWrapper } from './components/If'

export function Demo() {
  const [type, setType] = useState('1')

  return (
    <>
      <IfWrapper>
        <If when={type === '1'}>
          <span>1</span>
        </If>
        <ElseIf when={type === '2'}>
          <span>2</span>
        </ElseIf>
        <Else>
          <span>3</span>
        </Else>
      </IfWrapper>
      <button onClick={() => setType('1')}>change 1</button>
      <button onClick={() => setType('2')}>change 2</button>
      <button onClick={() => setType('3')}>change 3</button>
    </>
  )
}
```
