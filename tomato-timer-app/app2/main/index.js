const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  handleIPCMain()
  loadIndexFile(createMainWindow())
})

// 只有主进程才能使用Notification，想要在渲染进程中展示，需要在主进程中监听，渲染进程中触发
function handleIPCMain() {
  ipcMain.handle('message-tip', async () => {
    return await new Promise(resolve => {
      let notification = new Notification({
        title: '任务结束',
        body: '是否开始休息',
        actions: [{text: '开始休息', type: 'button'}],
        closeButtonText: '继续工作'
      })
      notification.show()
      notification.on('action', () => {
          resolve('rest')
      })
      notification.on('close', () => {
          resolve('work')
      })
    })
  })
}

function createMainWindow() {
  return new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true // 可在渲染进程访问 Node.js API
    }
  })
}

function loadIndexFile(mainWindow) {
  const readyPagePath = path.join(__dirname, '../render/pages/ready.html')
  mainWindow.loadFile(readyPagePath)
}