# Go 环境搭建

学习 Go 之前，需要先完成本地开发环境搭建。环境搭建的核心目标是：让电脑可以正常执行 `go` 命令，并能运行一个最简单的 Go 程序。

## 搭建流程

建议按照下面顺序操作：

1. 安装 Go
2. 验证 `go` 命令
3. 配置 `GOPROXY`
4. 配置编辑器
5. 创建并运行第一个 Go 程序

## 1. 安装 Go

不同系统的安装方式不一样。Windows 更适合使用安装包，macOS 和 Linux 更适合使用命令行工具安装。

### Windows 安装

Windows 推荐使用官方 `.msi` 安装包。

下载地址：

- 官网：https://go.dev/dl/
- 国内镜像：https://golang.google.cn/dl/

安装步骤：

1. 下载 Windows 对应的 `.msi` 安装包
2. 双击安装，一路下一步即可
3. 安装完成后重新打开终端
4. 执行 `go version` 验证是否安装成功

Windows 默认安装目录通常是：

```bash
C:\Program Files\Go
```

`go` 命令所在目录通常是：

```bash
C:\Program Files\Go\bin
```

正常情况下，安装程序会自动把上面的 `bin` 目录加入环境变量。

### macOS 安装

macOS 推荐使用 Homebrew 安装 Go。

Homebrew 是 macOS 上常用的命令行包管理工具，可以用来安装 Go、Node.js、Git 等开发工具。

如果还没有安装 Homebrew，先执行：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

验证 Homebrew 是否安装成功：

```bash
brew --version
```

如果使用的是 Apple Silicon 芯片，也就是 M1、M2、M3 系列 Mac，安装 Homebrew 后可能需要配置环境变量。终端一般会给出提示，常见命令如下：

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

安装 Go：

```bash
brew install go
```

### Linux 安装

Linux 通常用于服务器环境，推荐通过系统包管理器安装。

Debian / Ubuntu：

```bash
sudo apt update
sudo apt install golang-go
```

CentOS / RHEL / Fedora：

```bash
sudo dnf install golang
```

旧版 CentOS 可能需要使用：

```bash
sudo yum install golang
```

安装完成后，执行 `go version` 验证。

## 2. 验证 Go 环境

安装完成后，重新打开终端，执行：

```bash
go version
```

如果能看到类似下面的输出，说明 Go 安装成功：

```bash
go version go1.22.0 windows/amd64
```

不同系统输出的后半部分可能不同：

- Windows 常见为 `windows/amd64`
- macOS Intel 常见为 `darwin/amd64`
- macOS Apple Silicon 常见为 `darwin/arm64`
- Linux 常见为 `linux/amd64`

继续查看 Go 环境配置：

```bash
go env
```

常见配置项：

| 配置项 | 说明 |
| --- | --- |
| `GOROOT` | Go 安装目录 |
| `GOPATH` | Go 工作区目录 |
| `GOMOD` | 当前项目使用的 `go.mod` 文件路径 |
| `GOPROXY` | Go 模块下载代理 |
| `GOOS` | 目标操作系统 |
| `GOARCH` | 目标 CPU 架构 |

初学阶段不用强行记住所有配置，重点先知道：`go version` 能正常输出，说明 Go 命令可用。

## 3. 配置 GOPROXY

Go 下载第三方依赖时，默认会访问国外地址，国内网络环境下可能会很慢或失败。建议配置 Go 模块代理。

设置国内代理：

```bash
go env -w GOPROXY=https://goproxy.cn,direct
```

查看是否配置成功：

```bash
go env GOPROXY
```

如果输出下面内容，说明配置成功：

```bash
https://goproxy.cn,direct
```

这里的 `direct` 表示：如果代理没有找到对应依赖，再尝试直接从原始地址下载。

## 4. 配置编辑器

Go 可以使用任意编辑器开发，初学阶段推荐 VS Code 或 GoLand。

### VS Code

VS Code 免费、轻量，适合初学者。

需要安装插件：

- Go：官方 Go 语言插件
- Error Lens：增强错误提示，可选

安装 Go 插件后，打开 `.go` 文件时，VS Code 可能会提示安装 Go 相关工具，选择安装即可。

常用能力：

- 代码提示
- 跳转定义
- 自动格式化
- 运行测试
- 调试程序

### GoLand

GoLand 是 JetBrains 推出的 Go 专用 IDE，配置更完整，适合中大型项目开发。

如果你已经熟悉 JetBrains 系列工具，例如 IntelliJ IDEA、WebStorm、PyCharm，那么 GoLand 上手会比较快。

## 5. 创建第一个 Go 项目

创建一个测试目录：

```bash
mkdir hello-go
cd hello-go
```

初始化 Go 模块：

```bash
go mod init hello-go
```

创建 `main.go` 文件：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

运行程序：

```bash
go run main.go
```

如果输出下面内容，说明 Go 开发环境已经可以正常使用：

```bash
Hello, Go!
```

## 6. 常用命令

| 命令 | 说明 |
| --- | --- |
| `go version` | 查看 Go 版本 |
| `go env` | 查看 Go 环境配置 |
| `go mod init <模块名>` | 初始化 Go 模块 |
| `go run <文件名>` | 编译并运行 Go 程序 |
| `go build` | 编译当前项目 |
| `go test` | 运行测试 |
| `go fmt` | 格式化代码 |
| `go get <包名>` | 下载或更新依赖 |
| `go mod tidy` | 整理依赖 |

## 7. 常见问题

### go 不是内部或外部命令

说明系统没有找到 `go` 命令，通常是环境变量没有配置好。

Windows 需要检查下面目录是否在 `Path` 环境变量中：

```bash
C:\Program Files\Go\bin
```

macOS 或 Linux 可以检查：

```bash
which go
```

如果没有输出路径，说明当前终端找不到 `go` 命令。

### 依赖下载很慢

通常是 `GOPROXY` 没有配置。可以执行：

```bash
go env -w GOPROXY=https://goproxy.cn,direct
```

### go.mod 是什么

`go.mod` 是 Go 模块文件，用来记录当前项目的模块名、Go 版本和依赖信息。

现在写 Go 项目通常都应该使用 Go Modules，也就是先执行：

```bash
go mod init <模块名>
```

## 8. 检查清单

完成环境搭建后，确认下面几件事：

- `go version` 可以正常输出版本
- `go env` 可以查看环境配置
- `GOPROXY` 已经配置为 `https://goproxy.cn,direct`
- 编辑器已经安装 Go 插件或 Go IDE
- 可以运行第一个 `Hello, Go!` 程序
