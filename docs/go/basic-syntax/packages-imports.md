# 包和导入

Go 使用包来组织代码。一个包可以理解为一组相关代码的集合，其他文件可以通过 `import` 引入并使用这个包中的内容。

## 1. package 是什么

每个 Go 文件开头都必须声明自己属于哪个包：

```go
package main
```

`package` 的作用：

- 标识当前文件属于哪个包
- 决定当前文件可以和哪些文件一起编译
- 决定其他包如何引用当前代码

同一个目录下的 `.go` 文件，通常必须使用相同的包名。

例如：

```bash
hello-go/
├── go.mod
├── main.go
└── helper.go
```

如果 `main.go` 和 `helper.go` 在同一个目录下，它们通常都应该声明为：

```go
package main
```

## 2. main 包

`main` 是一个特殊的包名。

如果一个 Go 程序需要直接运行，必须满足两个条件：

- 包名是 `main`
- 包中存在 `main` 函数

示例：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

运行：

```bash
go run main.go
```

如果包名不是 `main`，这个包通常是给其他代码引用的库包，不能直接作为程序入口运行。

## 3. import 是什么

`import` 用来导入其他包。

导入标准库：

```go
import "fmt"
```

使用导入的包：

```go
fmt.Println("Hello, Go!")
```

这里的 `fmt` 是包名，`Println` 是 `fmt` 包中对外暴露的函数。

## 4. 多个包导入

如果只导入一个包，可以这样写：

```go
import "fmt"
```

如果导入多个包，推荐使用分组写法：

```go
import (
    "fmt"
    "strings"
    "time"
)
```

Go 官方工具会自动格式化导入顺序，所以平时可以使用：

```bash
go fmt ./...
```

## 5. 标准库导入

Go 自带很多标准库，不需要额外下载，可以直接导入。

常见标准库：

| 包名 | 说明 |
| --- | --- |
| `fmt` | 格式化输入输出 |
| `strings` | 字符串处理 |
| `strconv` | 字符串和基础类型转换 |
| `time` | 时间处理 |
| `math` | 数学计算 |
| `os` | 操作系统相关功能 |
| `io` | 输入输出接口 |

示例：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    text := "hello go"
    // strings.ToUpper 会把字符串中的英文字母转换为大写
    fmt.Println(strings.ToUpper(text))
}
```

输出：

```bash
HELLO GO
```

## 6. 认识 go.mod

`go.mod` 是 Go Modules 的配置文件。一个目录里有了 `go.mod`，Go 就会把这个目录当成一个模块项目来管理。

可以把 `go.mod` 理解成 Go 项目的“说明书”，它主要记录三类信息：

- 当前项目的模块名
- 当前项目使用的 Go 版本
- 当前项目依赖了哪些第三方包

### 如何生成 go.mod

在项目根目录执行：

```bash
go mod init hello-go
```

执行后会生成一个 `go.mod` 文件：

```go
module hello-go

go 1.26.4
```

这两行的含义：

| 内容 | 说明 |
| --- | --- |
| `module hello-go` | 当前项目的模块名 |
| `go 1.26.4` | 当前项目使用的 Go 版本 |

### module 是什么

`module` 后面的名字就是当前项目的模块名。

如果你的 `go.mod` 是：

```go
module hello-go
```

那么项目内部的本地包导入路径就要以 `hello-go` 开头。

例如项目结构：

```bash
hello-go/
├── go.mod
├── main.go
└── utils/
    └── string.go
```

在 `main.go` 中导入 `utils` 包时，需要写：

```go
import "hello-go/utils"
```

这里的 `hello-go` 就来自 `go.mod` 里的 `module hello-go`。

### require 是什么

当项目使用第三方包后，`go.mod` 中会出现 `require`。

例如执行：

```bash
go get github.com/gin-gonic/gin
```

`go.mod` 可能会变成：

```go
module hello-go

go 1.26.4

require github.com/gin-gonic/gin v1.10.0
```

`require` 表示当前项目依赖某个第三方模块。

这一行可以拆开看：

| 内容 | 说明 |
| --- | --- |
| `require` | 声明依赖 |
| `github.com/gin-gonic/gin` | 依赖的模块路径 |
| `v1.10.0` | 依赖版本 |

### go.mod 和普通 go 文件的区别

直接创建 `.go` 文件，只是创建了一份源码文件。

执行 `go mod init` 后生成 `go.mod`，才表示这个目录是一个 Go 模块项目。

简单区别：

| 操作 | 作用 |
| --- | --- |
| 创建 `main.go` | 写 Go 源码 |
| 执行 `go mod init` | 初始化 Go 项目 |
| 生成 `go.mod` | 管理模块名、Go 版本和依赖 |

如果只是写一个很小的单文件示例，可以只创建 `.go` 文件。如果是正式项目，或者要使用第三方包、本地多目录包，就应该先执行 `go mod init`。

## 7. 第三方包导入

第三方包指的是 Go 官方标准库以外的包，通常由其他开发者或组织维护。

比如：

- `fmt`、`strings`、`time` 是 Go 标准库，不需要下载
- `github.com/gin-gonic/gin` 是第三方包，需要先下载

第三方包一般都有一个完整的导入路径，例如：

```go
import "github.com/gin-gonic/gin"
```

这个路径可以拆开理解：

| 部分 | 含义 |
| --- | --- |
| `github.com` | 代码托管平台 |
| `gin-gonic` | 组织名或用户名 |
| `gin` | 仓库名，也是这个依赖的模块路径 |

### 使用第三方包的步骤

以 Gin 为例，Gin 是 Go 中常见的 Web 框架。

第一步，先确保当前项目已经初始化 Go Modules：

```bash
go mod init hello-go
```

执行后会生成 `go.mod` 文件。

第二步，下载第三方包：

```bash
go get github.com/gin-gonic/gin
```

`go get` 会做几件事：

- 下载 `github.com/gin-gonic/gin`
- 下载 Gin 依赖的其他包
- 把依赖信息写入 `go.mod`
- 把依赖校验信息写入 `go.sum`

第三步，在代码中导入并使用：

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    router := gin.Default()

    router.GET("/ping", func(ctx *gin.Context) {
        ctx.JSON(200, gin.H{"message": "pong"})
    })

    router.Run(":8080")
}
```

运行：

```bash
go run main.go
```

访问：

```bash
http://localhost:8080/ping
```

会返回类似结果：

```json
{"message":"pong"}
```

### go.mod 和 go.sum

下载第三方包后，项目中通常会出现两个文件。

`go.mod` 用来记录当前项目的模块信息和依赖信息，例如：

```go
module hello-go

go 1.26.4

require github.com/gin-gonic/gin v1.10.0
```

`go.sum` 用来记录依赖的校验信息，主要用于保证依赖下载内容没有被篡改。一般不需要手动修改。

### 整理依赖

开发过程中，如果删除了某些代码，可能会有一些依赖已经不再使用。可以执行：

```bash
go mod tidy
```

`go mod tidy` 的作用：

- 删除没有使用的依赖
- 补充缺失的依赖
- 更新 `go.mod` 和 `go.sum`

简单理解：

- `go get`：安装或更新依赖
- `go mod tidy`：整理项目实际需要的依赖

## 8. 本地包导入

项目变大后，通常会把代码拆到不同目录中。

示例结构：

```bash
hello-go/
├── go.mod
├── main.go
└── utils/
    └── string.go
```

初始化模块：

```bash
go mod init hello-go
```

`utils/string.go`：

```go
package utils

func Upper(text string) string {
    // strings.ToUpper 会返回转换为大写后的字符串
    return strings.ToUpper(text)
}
```

上面代码使用了 `strings` 包，所以完整写法应该是：

```go
package utils

import "strings"

func Upper(text string) string {
    // strings.ToUpper 会返回转换为大写后的字符串
    return strings.ToUpper(text)
}
```

`main.go`：

```go
package main

import (
    "fmt"
    "hello-go/utils"
)

func main() {
    fmt.Println(utils.Upper("hello go"))
}
```

这里的导入路径 `hello-go/utils` 由两部分组成：

- `hello-go`：`go.mod` 中声明的模块名
- `utils`：项目中的目录名

## 9. 导出规则

Go 通过首字母大小写控制内容是否能被其他包访问。

| 名称 | 是否能被其他包访问 | 示例 |
| --- | --- | --- |
| 首字母大写 | 可以 | `Upper`、`User`、`NewClient` |
| 首字母小写 | 不可以 | `upper`、`user`、`newClient` |

示例：

```go
package utils

func Upper(text string) string {
    return text
}

func lower(text string) string {
    return text
}
```

其他包可以调用 `utils.Upper`，但不能调用 `utils.lower`。

## 10. 常见导入写法

### 别名导入

当包名太长，或者多个包名称冲突时，可以使用别名：

```go
import str "strings"

func main() {
    println(str.ToUpper("go"))
}
```

### 点导入

点导入可以省略包名前缀：

```go
import . "fmt"

func main() {
    Println("Hello")
}
```

不推荐在业务代码中使用点导入，因为会降低可读性。

### 空白导入

空白导入只执行包的初始化逻辑，不直接使用包名：

```go
import _ "github.com/go-sql-driver/mysql"
```

这种写法常见于数据库驱动、插件注册等场景。

## 11. 易错点

### imported and not used

Go 不允许导入没有使用的包。

错误示例：

```go
package main

import "fmt"

func main() {
}
```

如果导入了 `fmt`，就必须使用它。否则删除这个导入。

易错原因：从其他地方复制代码时，保留了多余的 `import`。

正确做法：只保留当前文件实际使用到的包。

### package xxx is not in std

这个错误通常表示导入路径写错了，或者项目没有正确初始化 `go.mod`。

可以先检查：

```bash
go env GOMOD
```

如果输出为空，说明当前目录不在 Go Module 项目中，需要执行：

```bash
go mod init <模块名>
```

### 同一个目录下包名不一致

同一个目录下的 `.go` 文件通常必须使用相同的包名。

错误示例：

```bash
hello-go/
├── main.go      # package main
└── helper.go    # package utils
```

这种结构容易导致编译错误。正确做法是：

- 如果两个文件属于同一个包，就使用相同的 `package` 名
- 如果想拆成不同包，就放到不同目录中

### 忘记使用模块名导入本地包

本地包不能只写目录名，通常要使用 `go.mod` 中的模块名加目录名。

假设 `go.mod` 是：

```go
module hello-go
```

项目结构是：

```bash
hello-go/
├── go.mod
├── main.go
└── utils/
    └── string.go
```

正确导入：

```go
import "hello-go/utils"
```

错误导入：

```go
import "utils"
```

### 小写函数无法被其他包访问

Go 通过首字母大小写控制访问权限。

```go
func upper(text string) string {
    return text
}
```

`upper` 首字母是小写，只能在当前包内部使用，其他包不能通过 `utils.upper()` 调用。

如果要给其他包使用，需要改成：

```go
func Upper(text string) string {
    return text
}
```

### import 路径和包名不是一回事

导入时写的是包的路径，使用时写的是包名。

例如：

```go
import "github.com/gin-gonic/gin"

func main() {
    router := gin.Default()
}
```

`github.com/gin-gonic/gin` 是导入路径，`gin` 是代码中使用的包名。

## 12. 练习题

### 练习 1：导入标准库

创建一个 `main.go`，要求：

- 导入 `fmt` 和 `strings`
- 定义字符串 `hello go`
- 使用 `strings.ToUpper` 转成大写
- 使用 `fmt.Println` 输出结果

预期输出：

```bash
HELLO GO
```

### 练习 2：拆分本地包

创建下面的项目结构：

```bash
hello-go/
├── go.mod
├── main.go
└── utils/
    └── string.go
```

要求：

- `go.mod` 的模块名为 `hello-go`
- `utils/string.go` 中定义 `Upper` 函数
- `main.go` 中导入 `hello-go/utils`
- 在 `main.go` 中调用 `utils.Upper("hello go")`

### 练习 3：修复未使用导入

下面代码会报错，尝试找出原因并修复：

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println("Hello")
}
```

提示：Go 不允许导入没有使用的包。

### 练习 4：判断能否跨包调用

下面两个函数都在 `utils` 包中：

```go
func Upper(text string) string {
    return text
}

func lower(text string) string {
    return text
}
```

问题：

- `main` 包中能否调用 `utils.Upper()`？
- `main` 包中能否调用 `utils.lower()`？
- 为什么？

## 13. 小结

这一节需要掌握：

- 每个 Go 文件都必须有 `package` 声明
- 可运行程序必须使用 `package main` 和 `func main()`
- 使用 `import` 导入标准库、第三方包或本地包
- 本地包导入路径通常是 `模块名/目录名`
- 首字母大写的标识符才能被其他包访问
- Go 不允许导入未使用的包
