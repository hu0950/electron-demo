#### Electron功能介绍

Electron 是一个能让你使用 JavaScript, HTML 和 CSS 来创建桌面应用程序的框架。 这些应用程序可以打包后在 macOS、Windows 和 Linux 上直接运行，或者通过 Mac App Store 或微软商店进行分发。

- 为你的应用添加功能

#### 浅析Electron架构原理

 - Chromium + Node.js是如何一起工作？

#### Electron 开发环境搭建

- 基本构成部分

  ```
  my-electron-app/
  ├── package.json
  ├── main.js // 指定了运行主进程的 Electron 应用程序的入口
  ├── preload.js
  └── index.html
  ```

  在**主进程**中运行的脚本控制应用程序的生命周期、显示图形用户界面及其元素、执行本机操作系统交互以及在网页中创建渲染进程。 Electron 应用程序只能有一个主进程。

 - 安装Electron

   ```
   mkdir my-electron-app && cd my-electron-app
   npm init -y
   npm i --save-dev electron
   ```

#### 创建一个Electron应用

- 主进程和渲染进程

 - 进程间的通信

#### 调试

#### 应用的打包与更新

- 安装electron-builder
- 添加electron-builder 配置文件
- 在macOS平台打包程序

