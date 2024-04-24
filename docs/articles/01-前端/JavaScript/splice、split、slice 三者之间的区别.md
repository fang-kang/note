# splice、split、slice 三者之间的区别

## 1. split（字符串的方法，切割字符串）

```javascript
let str = 'How-are-you!'
// 参数1
console.log(str.split()) // ['How-are-you!']
console.log(str.split('')) // ['H', 'o', 'w', '-', 'a', 'r', 'e', '-', 'y', 'o', 'u', '!']
console.log(str.split('-')) // ['How', 'are', 'you!']
// 使用正则表示
var myStr = 'Hello 1 word. Sentence number 2.' //  ['Hello ', '1', ' word. Sentence number ', '2', '.']
console.log(myStr.split(/(\d)/))

// 参数2
console.log(str.split('-', -10)) // ['How', 'are', 'you!']
console.log(str.split('-', -1)) // ['How', 'are', 'you!']
console.log(str.split('-', 0)) // []
console.log(str.split('-', 1)) // ['How']
console.log(str.split('-', 10)) // ['How', 'are', 'you!']
```

如上示例获得以下结论
（1）语法： str.split(separator, limit)
（2）参数：
**separator（不必填）**
指定表示每个拆分应发生的点的字符串。separator 可以是一个字符串或正则表达式。如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点。如果在 str 中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。如果分隔符为空字符串，则将 str 原字符串中每个字符的数组形式返回。
**limit（不必填）**
`一个整数，限定返回的分割片段数量。`当提供此参数时，split 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。`返回的整数属于绝对值，-10为10，不填默认返返回所有，填0返回空数组。`
（3）返回值：返回一个数组。
（4）注意点：用 split() 来颠倒字符串顺序 是一种非健壮逆转字符串的方法。
（5）作用：`split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。`

## 2. slice（字符串的方法，截取字符串）

```javascript
// 参数1
console.log(str.length) // 长度为10
console.log(str.slice()) // HowAreYou!
console.log(str.slice(1)) // owAreYou!
console.log(str.slice(9)) // !
console.log(str.slice(100)) // 这里为空

// 负数： 这里相当于 str.length -9 ，也就是10-9，等同于str.slice(1)
console.log(str.slice(-9)) // owAreYou!

// 除数字外的其他字符，显示所有
console.log(str.slice('@@asdf')) // HowAreYou!

// 参数2 （从什么开始，从什么结束，第二个值就是结束的下标）
console.log(str.slice(0, 6)) // HowAre
console.log(str.slice(1, 6)) // owAre
console.log(str.slice(3, 6)) // Are
// 负数 这里相当于 str.length -6 ，也就是10-6，等同于str.slice(1,4)
console.log(str.slice(1, -6)) // owA
console.log(str.slice(3, -6)) // A
```

（1）语法： str.slice(beginIndex, endIndex)
（2）参数：
**beginIndex**：从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待，这里的 strLength 是字符串的长度（例如，如果 beginIndex 是 -3 则看作是：strLength - **endIndex**
可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度 (例如，如果 endIndex 是 -3，则是，strLength - 3)。
（3）返回值：返回一个从原字符串中提取出来的新字符串。
（4）注意点：两个参数的值虽然为整数，但也可以为其他，但是为其他会返回所有字符。

```javascript
let str = 'HowAreYou!'
// 除数字外的其他字符，相当于参数为0
console.log(str.slice('@@asdf')) // HowAreYou! 相当于str.slice(0)
console.log(str.slice('@@asdf', 'asdf')) // 这里为空 相当于str.slice(0，0)
```

（5）作用：`slice() 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。`

## 3. slice（数组的方法，不改变元素组）

```javascript
let array = ['张三', '李四', '王五', '赵六', '沈七', '王八'] // 长度为6
// 语法一：不填参数（结果： 返回元素组）
console.log(array.slice()) // ['张三', '李四', '王五', '赵六', '沈七', '王八']

// 语法二
// 2.1 值为负数 从原数组中的倒数第几个元素开始提取
console.log(array.slice(-1)) // ['王八']
console.log(array.slice(-3)) // ['赵六', '沈七', '王八']
// 2.2 值为0   返回原数组
console.log(array.slice(0)) // ['张三', '李四', '王五', '赵六', '沈七', '王八']

// 2.3 值为正数
console.log(array.slice(1)) // ['李四', '王五', '赵六', '沈七', '王八']
console.log(array.slice(3)) // ['赵六', '沈七', '王八']

// 语法三
// 3.1 end被忽略，直接提取到原数组末尾，同2.3
console.log(array.slice(3)) // ['赵六', '沈七', '王八']

// 3.2 参数二end为负数 表示在原数组中的倒数第几个元素结束抽取
console.log(array.slice(-2, -1)) // ['沈七']  表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）
console.log(array.slice(2, -1)) // ['王五', '赵六', '沈七']
// 3.3 参数二end为0, 返回空数组
console.log(array.slice(3, 0)) // []
// 3.4 参数二end为正数  slice 会提取原数组中索引从 begin 到 end 的所有元素
console.log(array.slice(1, 6)) // ['李四', '王五', '赵六', '沈七', '王八']
console.log(array.slice(2, 4)) // ['王五', '赵六']
```

上述示例获取一下结论  
（1）语法：两个参数都可选

```javascript
Array.slice()
Array.slice(start)
Array.slice(start, end)
```

（2）参数
**begin （可选）**
提取起始处的索引（从 0 开始），从该索引开始提取原数组元素。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。如果省略 begin，则 slice 从索引 0 开始。如果 begin 超出原数组的索引范围，则会返回空数组。

**end （可选）**
提取终止处的索引（从 0 开始），在该索引处结束提取原数组元素。slice 会提取原数组中索引从 begin 到 end 的所有元素（包含 begin，但不包含 end）。slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素（索引为 1, 2, 3 的元素）。如果该参数为负数，则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。如果 end 被省略，则 slice 会一直提取到原数组末尾。如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。
（3）返回值：一个含有被提取元素的新数组。
（4）注意点：不会改变原数组。
（5）作用：`slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。`

## 4. splice（数组的方法，可对数组进行添加、删除、替换操作）

```javascript
// 参数1
// 1.1若为负值，从数组的最后面（-1）算起，超过了数组的长度，也就是获取整个数组
console.log(array.splice(-1)) // ['小明']
console.log(array.splice(-3)) // ['沈七', '王八', '小明']
console.log(array.splice(-7)) // ['张三', '李四', '王五', '赵六', '沈七', '王八', '小明']
console.log(array.splice(-100)) // ['张三', '李四', '王五', '赵六', '沈七', '王八', '小明']

// 1.2若为0，获取整个数组
console.log(array.splice(0)) // ['张三', '李四', '王五', '赵六', '沈七', '王八', '小明']

// 1.3若为正整数，获取整个数组，超过了数组的长度，返回空数组或在数组末尾添加内容
console.log(array.splice(1)) //  ['李四', '王五', '赵六', '沈七', '王八', '小明']
console.log(array.splice(5)) // ['王八', '小明']
console.log(array.splice(100)) // []

// 参数2
// 2.1若为负值或0，不移除元素
console.log(array.splice(3, 0)) // []

// 2.2 如果deleteCount大于start之后的元素的总数，则从start后面的元素都将被删除（含第 start 位）
console.log(array.splice(1, 2)) // ['李四', '王五']
console.log(array.splice(1, 7)) // ['李四', '王五', '赵六', '沈七', '王八', '小明']
console.log(array.splice(1, 10)) // ['李四', '王五', '赵六', '沈七', '王八', '小明']
```

> splice 方法会改变原数组。所以每次定义的原数组只能进行一次测试。

（1）语法：

```javascript
Array.splice(start)
Array.splice(start, deleteCount)
Array.splice(start, deleteCount, item1)
Array.splice(start, deleteCount, item1, item2, itemN)
```

（2）参数
① 参数一 `start​`：指定修改的开始位置（从 0 计数）。
如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从 -1 计数，这意味着 -n 是倒数第 n 个元素并且等价于 array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第 0 位。

② 参数二 `deleteCount` （可选）
整数，表示要移除的数组元素的个数。如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。如果 deleteCount 被省略了，或者它的值大于等于 array.length - start(也就是说，如果它大于或者等于 start 之后的所有元素的数量)，那么 start 之后数组的所有元素都会被删除。如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。

③ 参数三四…**item1, item2, …** （可选）
要添加进数组的元素，从 start 位置开始。如果不指定，则 splice() 将只删除数组元素。
（3）返回值：返回被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
（4）注意点：会改变原数组。
（5）作用：`splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会改变原数组。`

## 总结：三者之间的区别

**注意：slice 字符串和数组两个都有，**

数组：

- slice 两个参数，返回新数组，不改变原数组
- splice n 个参数，前面两个和 slice 相同，返回新数组，改变原数组

字符串

- slice 提取字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
- split 分割字符串 返回一个分割的数组，且不会改动原字符串。
