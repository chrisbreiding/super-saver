const { BrowserWindow, ipcMain } = require('electron')
const contextMenu = require('electron-context-menu')
const path = require('path')
const Promise = require('bluebird')
const { isBrowserDebug } = require('../util')

ipcMain.on('log', (event, ...messages) => {
  console.log(...messages) // eslint-disable-line no-console
})

module.exports = {
  bus: ipcMain,

  close (win) {
    return new Promise((resolve) => {
      win.on('closed', resolve)
      win.destroy()
    })
  },

  window ({ preload }) {
    const win = new BrowserWindow({
      show: isBrowserDebug(),
      width: 1024,
      height: 700,
      webPreferences: {
        preload: path.join(__dirname, preload),
        nodeIntegration: false,
      },
    })

    if (isBrowserDebug()) {
      win.webContents.openDevTools()
    }

    contextMenu({ window: win })

    return win
  },
}
