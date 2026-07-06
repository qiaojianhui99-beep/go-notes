import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Go 语言学习笔记',
  description: '系统整理 Go 语言基础、常用包与实践笔记',
  lang: 'zh-CN',
  base: '/',
  themeConfig: {
    nav: [
      { text: 'Go 语言基础', link: '/go/basic-syntax/' }
    ],
    sidebar: {
      '/go/': [
        {
          text: '基础语法【必学】',
          collapsed: false,
          items: [
            { text: '概览', link: '/go/basic-syntax/' },
            { text: 'Go 环境搭建', link: '/go/basic-syntax/environment' },
            { text: '包和导入', link: '/go/basic-syntax/packages-imports' },
            { text: '变量和常量', link: '/go/basic-syntax/variables-constants' },
            { text: '基本类型', link: '/go/basic-syntax/basic-types' },
            { text: '复合类型', link: '/go/basic-syntax/composite-types' },
            { text: '运算符和表达式', link: '/go/basic-syntax/operators-expressions' },
            { text: '控制结构', link: '/go/basic-syntax/control-flow' },
            { text: '函数', link: '/go/basic-syntax/functions' },
            { text: '指针', link: '/go/basic-syntax/pointers' },
            { text: '方法', link: '/go/basic-syntax/methods' },
            { text: '接口', link: '/go/basic-syntax/interfaces' },
            { text: '错误处理', link: '/go/basic-syntax/error-handling' }
          ]
        },
        {
          text: '常用包【必学】',
          collapsed: false,
          items: [
            { text: '概览', link: '/go/common-packages/' },
            { text: 'fmt', link: '/go/common-packages/fmt' },
            { text: 'strings', link: '/go/common-packages/strings' },
            { text: 'strconv', link: '/go/common-packages/strconv' },
            { text: 'time', link: '/go/common-packages/time' },
            { text: 'math', link: '/go/common-packages/math' },
            { text: 'os', link: '/go/common-packages/os' },
            { text: 'io', link: '/go/common-packages/io' }
          ]
        }
      ]
    },
    socialLinks: []
  }
})
