const {app, BrowserWindow, ipcMain, Notification} = require('electron')
const path = require('path')
let mainWindow

function handleIPC() {
  ipcMain.handle('notification', async (e, { ...args }) => {
    console.log('args', args)
    const { body, title, actions, closeButtonText } = args
    return res = await new Promise((resolve, reject) => {
      let notification = new Notification({
        title,
        body,
        actions,
        closeButtonText
      })
      notification.show()
      notification.on('action', function() {
        resolve({event: 'action'})
      })
      notification.on('close', function() {
        resolve({event: 'close'})
      })
    })
  })
}

function createMainWindow() {
  const readyPagePath = path.join(__dirname, '../render/pages/ready.html')

  mainWindow = new BrowserWindow({
    width: 400,
    height: 660,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile(readyPagePath)
  return mainWindow
}

app.whenReady().then(() => {
  handleIPC()
  createMainWindow()
})
