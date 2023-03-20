# nodejs 文件相关

## 判断是文件还是目录

```js
import { readdirSync, statSync, accessSync } from 'fs'

const fileOrDirFullPath = '文件或目录的全路径名'
const stats = statSync(fileOrDirFullPath)
if (stats.isDirectory()) {
  console.log('是目录')
} else if (stats.isFile()) {
  console.log('是文件')
}
```

## 判断文件或目录是否存在

```js
import { accessSync, constants } from 'fs'

const fileOrDirFullPath = '文件或目录的全路径'
try {
  accessSync(fileOrDirFullPath, constants.F_OK)
  console.log('文件或目录存在')
} catch (err) {
  console.log('文件或目录不存在')
}
```

## 判断文件或目录是否可读/可写

### 是否可写

```js
import { accessSync, constants } from 'fs'

const fileOrDirFullPath = '文件或目录的全路径'
try {
  accessSync(fileOrDirFullPath, constants.R_OK)
  console.log('文件或目录可读')
} catch (err) {
  console.log('文件或目录不可读')
}
```

### 是否可读

```js
import { accessSync, constants } from 'fs'

const fileOrDirFullPath = '文件或目录的全路径'
try {
  accessSync(fileOrDirFullPath, constants.W_OK)
  console.log('文件或目录可写')
} catch (err) {
  console.log('文件或目录不可写')
}
```

### 判断文件是否存在且写

```js
import { accessSync, constants } from 'fs'

const fileOrDirFullPath = '文件全路径'
try {
  accessSync(fileOrDirFullPath, constants.F_OK | constants.W_OK)
  console.log('文件存在且可写')
} catch (err) {
  console.log('文件不存在或不可写')
}
```

## 获取目录下的所有文件和文件夹的名称

```js
import { readdirSync, statSync } from 'fs'

const dirFullPath = '指定目录的绝对路径'

// 返回dirFullPath目录下的所有文件夹和文件的名称
const allDirAndFileNameArr = readdirSync(dirFullPath)
allDirAndFileNameArr.map(dirOrFileName => {
  console.log(dirOrFileName)
})
```
