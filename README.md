# Go Notes

这是一个基于 VitePress 搭建的 Go 语言学习笔记项目，文档内容统一放在 `docs` 目录下。

## Go 版本基准

本项目中的 Go 语法说明、示例代码和命令使用，统一以当前 Go 版本为准：

```bash
go version go1.26.4 windows/amd64
```

后续新增或修改笔记内容时，需要确保语法标注和代码示例符合该版本行为。

## 包管理器

本项目使用 pnpm 管理前端依赖。

安装依赖：

```bash
pnpm install
```

启动文档：

```bash
pnpm docs:dev
```
