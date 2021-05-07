
// app管理应用程序的生命周期事件
// 通过BrowserWindow模块，创建和控制浏览器窗口
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // 创建窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
