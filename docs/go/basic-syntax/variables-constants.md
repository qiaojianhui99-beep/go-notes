# 变量和常量

变量和常量是 Go 程序中保存数据的基础。变量的值可以改变，常量的值一旦定义就不能改变。

## 1. 变量是什么

变量可以理解为一块有名字的存储空间，用来保存程序运行过程中的数据。

示例：

```go
package main

import "fmt"

func main() {
    var name string = "Go"
    fmt.Println(name)
}
```

这里的 `name` 就是变量，类型是 `string`，值是 `"Go"`。

## 2. var 声明变量

Go 使用 `var` 声明变量。

完整写法：

```go
var name string = "Go"
```

可以拆开理解：

| 部分 | 含义 |
| --- | --- |
| `var` | 声明变量的关键字 |
| `name` | 变量名 |
| `string` | 变量类型 |
| `"Go"` | 变量值 |

## 3. 类型推导

如果变量声明时已经赋值，Go 可以根据右边的值自动推导类型。

```go
var name = "Go"
var age = 15
var enabled = true
```

上面代码等价于：

```go
var name string = "Go"
var age int = 15
var enabled bool = true
```

实际开发中，如果右侧的值很明确，通常可以省略类型。

## 4. 零值

变量声明后如果没有手动赋值，Go 会自动给它一个默认值，这个默认值叫零值。

示例：

```go
package main

import "fmt"

func main() {
    var name string
    var age int
    var price float64
    var enabled bool

    fmt.Println(name)
    fmt.Println(age)
    fmt.Println(price)
    fmt.Println(enabled)
}
```

常见零值：

| 类型 | 零值 |
| --- | --- |
| `int` | `0` |
| `float64` | `0` |
| `bool` | `false` |
| `string` | `""` |
| 指针 | `nil` |
| 切片 | `nil` |
| 映射 | `nil` |
| 函数 | `nil` |
| 接口 | `nil` |

Go 的变量一定有明确的值，不会出现未初始化的随机值。

## 5. 短变量声明

在函数内部，可以使用 `:=` 声明并赋值变量。

```go
package main

import "fmt"

func main() {
    name := "Go"
    age := 15

    fmt.Println(name)
    fmt.Println(age)
}
```

`:=` 的含义是：声明变量并赋值。

下面两行作用类似：

```go
var name = "Go"
name := "Go"
```

区别是：`:=` 只能在函数内部使用。

错误示例：

```go
package main

name := "Go"

func main() {
}
```

包级别变量必须使用 `var`：

```go
package main

var name = "Go"

func main() {
}
```

## 6. 一次声明多个变量

可以一行声明多个变量：

```go
var name, city string = "Go", "Beijing"
```

也可以使用分组写法：

```go
var (
    name = "Go"
    age = 15
    enabled = true
)
```

函数内部也可以用短变量声明多个变量：

```go
name, age := "Go", 15
```

## 7. 变量重新赋值

变量声明后，可以重新赋值，但新值必须符合变量类型。

```go
package main

import "fmt"

func main() {
    name := "Go"
    name = "Golang"

    fmt.Println(name)
}
```

错误示例：

```go
package main

func main() {
    age := 18
    age = "18"
}
```

`age` 已经被推导为 `int`，不能再赋值为 `string`。

## 8. 常量是什么

常量使用 `const` 声明，声明后不能再修改。

```go
const pi = 3.14159
const appName = "go-notes"
```

常量适合保存不会变化的值，例如：

- 圆周率
- 配置名称
- 状态码
- 固定文案

常量不能被重新赋值。

错误示例：

```go
package main

func main() {
    const name = "Go"
    name = "Golang"
}
```

## 9. 常量分组声明

多个常量可以分组声明：

```go
const (
    StatusOK = 200
    StatusNotFound = 404
    StatusServerError = 500
)
```

也可以省略重复的值表达式：

```go
const (
    A = 1
    B
    C
)
```

上面代码中，`B` 和 `C` 会沿用上一行的表达式，所以它们的值都是 `1`。

## 10. iota

`iota` 是 Go 中用于常量计数的特殊标识符。它只能在 `const` 分组中使用。

示例：

```go
package main

import "fmt"

const (
    Sunday = iota
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
)

func main() {
    fmt.Println(Sunday)
    fmt.Println(Monday)
    fmt.Println(Saturday)
}
```

输出：

```bash
0
1
6
```

`iota` 从 `0` 开始，每新增一行常量声明就自动加 `1`。

如果想从 `1` 开始，可以这样写：

```go
const (
    Sunday = iota + 1
    Monday
    Tuesday
)
```

对应值是：

| 常量 | 值 |
| --- | --- |
| `Sunday` | `1` |
| `Monday` | `2` |
| `Tuesday` | `3` |

## 11. 变量命名规则

变量名需要遵守 Go 的标识符规则。

基本规则：

- 可以由字母、数字、下划线组成
- 不能以数字开头
- 不能使用 Go 关键字
- 区分大小写

推荐写法：

```go
var userName = "Tom"
var maxRetryCount = 3
var isEnabled = true
```

不推荐写法：

```go
var a = "Tom"
var x = 3
var flag = true
```

变量名应该尽量表达业务含义。

## 12. 易错点

### := 只能在函数内部使用

错误示例：

```go
package main

name := "Go"

func main() {
}
```

正确写法：

```go
package main

var name = "Go"

func main() {
}
```

### 变量声明后必须使用

Go 不允许在函数内部声明变量后不使用。

错误示例：

```go
package main

func main() {
    name := "Go"
}
```

正确写法：

```go
package main

import "fmt"

func main() {
    name := "Go"
    fmt.Println(name)
}
```

### 重新赋值不能使用 :=

`:=` 是声明并赋值。如果变量已经存在，通常使用 `=` 重新赋值。

```go
name := "Go"
name = "Golang"
```

### 常量不能使用 := 声明

常量必须使用 `const`。

错误示例：

```go
PI := 3.14159
```

正确写法：

```go
const PI = 3.14159
```

### 常量不能被重新赋值

错误示例：

```go
const StatusOK = 200
StatusOK = 201
```

## 13. 练习题

### 练习 1：声明变量

创建 `main.go`，声明下面几个变量并输出：

- `name`，值为 `Go`
- `age`，值为 `15`
- `enabled`，值为 `true`

### 练习 2：观察零值

声明下面几个没有赋值的变量，并打印它们的零值：

- `string`
- `int`
- `float64`
- `bool`

### 练习 3：使用常量

使用 `const` 声明下面几个 HTTP 状态码：

- `StatusOK = 200`
- `StatusNotFound = 404`
- `StatusServerError = 500`

然后使用 `fmt.Println` 输出它们。

### 练习 4：使用 iota

使用 `iota` 定义一组星期常量：

- `Monday = 1`
- `Tuesday = 2`
- `Wednesday = 3`

要求使用 `iota + 1` 实现。

## 14. 小结

这一节需要掌握：

- 使用 `var` 声明变量
- 使用 `:=` 在函数内部声明变量
- 变量没有手动赋值时会使用零值
- 变量可以重新赋值，但类型不能随意改变
- 使用 `const` 声明常量
- 常量声明后不能重新赋值
- `iota` 常用于定义一组递增的常量
