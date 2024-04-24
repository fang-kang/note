# react 的 antd-table 大数据量卡顿优化

## 需求

原表格数据量大、渲染慢、滚动卡顿；1000 条 30 个数据列的表格会有明显卡顿； 不可抗力不能使用分页，另外有树形和排序的功能。

## 解决方法

**[virtuallist-antd：](https://github.com/crawler-django/virtuallist-antd)** 可以快速地在原代码的基础上实现优化效果，改动较小，表格的扩展功能可以保留；

::: warning 注意

Table 数据的每一列需要行高相同，组件内部取第一条数据的高度；

:::

## example

## 需要优化的代码

```js
import 'Table' from 'antd';

<Table
  columns={columns}
  dataSource={dataSource}
  onExpand={this.onExpand}
  expandedRowKeys={expandedRowKeys}
  rowKey={'id'}
  scroll={{y: '55vh'}}
  pagination={false}
  loading={loading}
/>

```

## 安装 [virtuallist-antd](https://github.com/crawler-django/virtuallist-antd)

```BASH
yarn add virtuallist-antd --save
```

## 优化后

```js
import React, { useMemo } from 'react'
import { Table } from 'antd'
import { VList } from 'virtuallist-antd'

function VisualTable(props) {
  const vc1 = useMemo(() => {
    return VList({
      height: '55vh',
      vid: 'first',
      resetTopWhenDataChange: false, // 当数据改变时是否回滚顶部
    })
  }, [])

  return (
    <>
      <Table
        columns={props.columns}
        dataSource={props.dataSource}
        pagination={props.pagination}
        onExpand={props.onExpand}
        expandedRowKeys={props.expandedRowKeys}
        /** 不建议使用x: max-content. 如果columns有fixed, x为max-content的话. ellipsis会失效 */
        scroll={{ y: '55vh', x: '100%' }}
        loading={props.loading}
        rowKey={props.rowKey}
        components={vc1}
      />
    </>
  )
}

export default VisualTable
```

## 问题

原代码较为复杂（繁多且时间上不允许重构），点击展开后会修改 dataSource，为了使点击展开后不回滚顶部，设置了`resetTopWhenDataChange: false`.

另外有一个很方便的 api，根据需要，可回滚顶部。

```js
import { scrollTo } from 'virtuallist-antd'

// 需要的业务逻辑下使用，可回滚顶部；
scrollTo({ row: 1, vid: '相应的vid' })
```
