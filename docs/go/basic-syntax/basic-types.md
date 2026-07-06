# 基本类型

Go 是静态类型语言。变量一旦确定类型，后续就不能随意改成其他类型。

这一节主要学习 4 类基础类型：

- 整数类型：`int`
- 浮点数类型：`float32`、`float64`
- 布尔类型：`bool`
- 字符串类型：`string`
- 字符类型：`rune`

## 1. int 整数类型

`int` 用来表示整数。

```go
package main

import "fmt"

func main() {
    age := 18
    count := 100

    fmt.Println(age)
    fmt.Println(count)
}
```

`age := 18` 中，Go 会自动把 `age` 推导为 `int` 类型。

常见整数类型：

| 类型 | 说明 |
| --- | --- |
| `int` | 根据系统位数决定大小，最常用 |
| `int8` | 8 位有符号整数 |
| `int16` | 16 位有符号整数 |
| `int32` | 32 位有符号整数 |
| `int64` | 64 位有符号整数 |
| `uint` | 无符号整数，只能表示非负数 |

初学阶段优先使用 `int`，除非明确需要指定大小。

## 2. float 浮点数类型

浮点数用来表示小数。

```go
package main

import "fmt"

func main() {
    price := 99.9
    rate := 0.85

    fmt.Println(price)
    fmt.Println(rate)
}
```

Go 中常见浮点数类型：

| 类型 | 说明 |
| --- | --- |
| `float32` | 单精度浮点数 |
| `float64` | 双精度浮点数，默认小数类型 |

如果直接写：

```go
price := 99.9
```

Go 默认会把 `price` 推导为 `float64`。

如果需要明确指定类型：

```go
var price float32 = 99.9
var amount float64 = 199.99
```

## 3. bool 布尔类型

`bool` 只有两个值：`true` 和 `false`。

```go
package main

import "fmt"

func main() {
    enabled := true
    deleted := false

    fmt.Println(enabled)
    fmt.Println(deleted)
}
```

布尔类型通常用于条件判断：

```go
package main

import "fmt"

func main() {
    enabled := true

    if enabled {
        fmt.Println("功能已开启")
    }
}
```

Go 不会把数字自动当成布尔值。

错误示例：

```go
if 1 {
    fmt.Println("ok")
}
```

正确写法：

```go
count := 1
if count > 0 {
    fmt.Println("ok")
}
```

## 4. string 字符串类型

`string` 用来表示字符串。

```go
package main

import "fmt"

func main() {
    name := "Go"
    message := "Hello, Go!"

    fmt.Println(name)
    fmt.Println(message)
}
```

字符串需要使用双引号：

```go
name := "Go"
```

Go 中单引号通常表示字符，也就是 `rune`，不是字符串。

```go
letter := 'G'
```

## 5. rune 字符类型

`rune` 用来表示一个 Unicode 字符。

简单理解：

- `string` 表示一串字符
- `rune` 表示其中的一个字符

示例：

```go
package main

import "fmt"

func main() {
    letter := 'G'
    chinese := '你'

    fmt.Println(letter)
    fmt.Println(chinese)
    fmt.Printf("%c\n", letter)
    fmt.Printf("%c\n", chinese)
}
```

输出类似：

```bash
71
20320
G
你
```

为什么前两行输出数字？因为 `rune` 本质上是 `int32` 的别名，保存的是字符对应的 Unicode 编码值。

可以使用 `%T` 查看类型：

```go
letter := 'G'
fmt.Printf("%T\n", letter)
```

输出：

```bash
int32
```

虽然输出的是 `int32`，但在语义上，单引号字符通常理解为 `rune`。

### rune 和 string 的区别

```go
name := "Go"
letter := 'G'
```

区别：

| 写法 | 类型 | 含义 |
| --- | --- | --- |
| `"Go"` | `string` | 字符串 |
| `'G'` | `rune` | 单个字符 |

字符串用双引号，字符用单引号。

### 为什么需要 rune

英文字符通常只占 1 个字节，但中文字符、日文字符、emoji 等可能占多个字节。

如果直接按字节处理字符串，遇到中文时容易出问题。

示例：

```go
package main

import "fmt"

func main() {
    text := "你好"

    fmt.Println(len(text))
    fmt.Println(len([]rune(text)))
}
```

输出：

```bash
6
2
```

原因：

- `len(text)` 统计的是字节数
- `len([]rune(text))` 统计的是字符数

所以处理中文字符串长度、遍历中文字符时，经常会用到 `rune`。

### 遍历字符串中的字符

推荐使用 `for range` 遍历字符串，它会按 `rune` 读取字符。

```go
package main

import "fmt"

func main() {
    text := "Go语言"

    for index, value := range text {
        fmt.Printf("index=%d value=%c type=%T\n", index, value, value)
    }
}
```

输出中的 `value` 类型是 `int32`，也就是 `rune`。

注意：这里的 `index` 是字节下标，不是第几个字符。

## 6. 字符串拼接

可以使用 `+` 拼接字符串：

```go
package main

import "fmt"

func main() {
    firstName := "Go"
    lastName := "Lang"

    fullName := firstName + " " + lastName
    fmt.Println(fullName)
}
```

输出：

```bash
Go Lang
```

## 7. 查看变量类型

可以使用 `fmt.Printf` 配合 `%T` 查看变量类型。

```go
package main

import "fmt"

func main() {
    age := 18
    price := 99.9
    enabled := true
    name := "Go"

    fmt.Printf("age 的类型是 %T\n", age)
    fmt.Printf("price 的类型是 %T\n", price)
    fmt.Printf("enabled 的类型是 %T\n", enabled)
    fmt.Printf("name 的类型是 %T\n", name)
}
```

输出类似：

```bash
age 的类型是 int
price 的类型是 float64
enabled 的类型是 bool
name 的类型是 string
```

## 8. 格式化输出

`fmt.Println` 适合直接打印变量值。

```go
fmt.Println(name, age, price, enabled)
```

`fmt.Printf` 适合按照指定格式输出。它的第一个参数必须是字符串格式模板。

```go
fmt.Printf("name=%s\n", name)
fmt.Printf("age=%d\n", age)
fmt.Printf("price=%.2f\n", price)
fmt.Printf("enabled=%t\n", enabled)
```

常见格式占位符：

| 占位符 | 说明 |
| --- | --- |
| `%d` | 整数 |
| `%f` | 浮点数 |
| `%.2f` | 保留两位小数 |
| `%t` | 布尔值 |
| `%s` | 字符串 |
| `%c` | 字符 |
| `%v` | 按默认格式输出任意值 |
| `%T` | 输出变量类型 |

错误示例：

```go
fmt.Printf(enabled)
fmt.Printf(price)
```

原因：`fmt.Printf` 第一个参数必须是字符串格式模板，不能直接传 `bool` 或 `float64`。

正确写法：

```go
fmt.Printf("%t\n", enabled)
fmt.Printf("%f\n", price)
```

## 9. 类型转换

Go 不会自动进行不同类型之间的转换，需要手动转换。

错误示例：

```go
var age int = 18
var price float64 = age
```

正确写法：

```go
var age int = 18
var price float64 = float64(age)
```

整数转浮点数：

```go
count := 10
result := float64(count)
```

浮点数转整数：

```go
price := 99.9
value := int(price)
```

注意：浮点数转整数会直接舍弃小数部分。

```go
int(99.9) // 结果是 99
```

## 10. 字符串和数字转换

字符串和数字之间的转换需要使用 `strconv` 包。

字符串转整数：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    ageText := "18"

    age, err := strconv.Atoi(ageText)
    if err != nil {
        fmt.Println("转换失败", err)
        return
    }

    fmt.Println(age)
}
```

整数转字符串：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    age := 18
    ageText := strconv.Itoa(age)

    fmt.Println(ageText)
}
```

## 11. 零值

基础类型没有赋值时，会使用对应零值。

```go
package main

import "fmt"

func main() {
    var age int
    var price float64
    var enabled bool
    var name string
    var letter rune

    fmt.Println(age)
    fmt.Println(price)
    fmt.Println(enabled)
    fmt.Println(name)
    fmt.Println(letter)
}
```

基础类型零值：

| 类型 | 零值 |
| --- | --- |
| `int` | `0` |
| `float64` | `0` |
| `bool` | `false` |
| `string` | `""` |
| `rune` | `0` |

## 12. 易错点

### 字符串必须使用双引号

错误示例：

```go
name := 'Go'
```

正确写法：

```go
name := "Go"
```

如果只表示一个字符，才使用单引号：

```go
letter := 'G'
```

### len(string) 统计的是字节数

错误理解：

```go
text := "你好"
fmt.Println(len(text)) // 不是 2
```

`len(text)` 输出 `6`，因为一个中文字符通常占 3 个字节。

如果想统计字符数量，可以转换为 `[]rune`：

```go
text := "你好"
fmt.Println(len([]rune(text))) // 2
```

### 不同类型不能直接赋值

错误示例：

```go
age := 18
age = "18"
```

`age` 已经是 `int` 类型，不能再赋值为 `string`。

### int 和 float64 不能直接混用

错误示例：

```go
count := 10
price := 99.9
total := count + price
```

正确写法：

```go
count := 10
price := 99.9
total := float64(count) + price
```

### bool 不能用数字代替

Go 中 `1` 不等于 `true`，`0` 不等于 `false`。

错误示例：

```go
if 1 {
    fmt.Println("ok")
}
```

正确写法：

```go
enabled := true
if enabled {
    fmt.Println("ok")
}
```

### fmt.Printf 不能直接传非字符串模板

错误示例：

```go
fmt.Printf(enabled)
```

正确写法：

```go
fmt.Printf("%t\n", enabled)
```

## 13. 练习题

### 练习 1：声明基础类型变量

声明并打印下面变量：

- `age`：整数，值为 `18`
- `price`：浮点数，值为 `99.9`
- `enabled`：布尔值，值为 `true`
- `name`：字符串，值为 `Go`

### 练习 2：查看变量类型

使用 `fmt.Printf` 和 `%T` 打印 `age`、`price`、`enabled`、`name` 的类型。

### 练习 3：格式化输出

使用 `fmt.Printf` 输出下面格式：

```bash
name=Go age=18 price=99.90 enabled=true
```

### 练习 4：类型转换

定义：

```go
count := 10
price := 9.9
```

计算 `count + price` 的结果，要求不能修改变量原始类型。

### 练习 5：字符串转数字

定义字符串：

```go
ageText := "18"
```

使用 `strconv.Atoi` 把它转换为整数，并输出转换结果。

### 练习 6：统计中文字符数量

定义字符串：

```go
text := "Go语言"
```

分别输出：

- `len(text)` 的结果
- `len([]rune(text))` 的结果

观察字节数和字符数的区别。

### 练习 7：遍历字符串字符

使用 `for range` 遍历字符串：

```go
text := "Go语言"
```

要求输出每个字符和它的类型。

## 14. 小结

这一节需要掌握：

- `int` 用来表示整数
- `float32` 和 `float64` 用来表示小数，默认是 `float64`
- `bool` 只有 `true` 和 `false`
- `string` 表示字符串，字符串使用双引号
- `rune` 表示单个 Unicode 字符，通常使用单引号
- `rune` 本质上是 `int32` 的别名
- `fmt.Println` 用于直接打印变量
- `fmt.Printf` 用于格式化输出，第一个参数必须是字符串模板
- 不同类型之间通常需要显式类型转换
- 字符串和数字互转需要使用 `strconv` 包
- `len(string)` 统计字节数，`len([]rune(string))` 统计字符数
