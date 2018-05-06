'use strict'

const _ = require('lodash')
const { ipcMain } = require('electron')
const Promise = require('bluebird')
const window = require('./window')

// const on = (requestName, callback) => {
//   ipcMain.on(`${requestName}:request`, (event, ...args) => {
//     callback((...reponseArgs) => {
//       event.sender.send(`${requestName}:response`, ...reponseArgs)
//     }, ...args)
//   })
// }

// const once = ipcMain.once.bind(ipcMain)
// const off = ipcMain.removeAllListeners.bind(ipcMain)

// const request = (requestName, id, ...args) => {
//   return window.ensure().then((win) => {
//     return new Promise((resolve, reject) => {
//       win.webContents.send(`${requestName}:request`, id, ...args)
//       const suffix = id ? `:${id}` : ''
//       ipcMain.once(`${requestName}:response${suffix}`, (event, error, response) => {
//         if (error) {
//           reject(_.extend(new Error(''), error))
//         } else {
//           resolve(response)
//         }
//       })
//     })
//   })
// }

const send = (eventName, ...args) => {
  return window.ensure().then((win) => {
    win.webContents.send(eventName, ...args)
  })
}

const sendInfo = (message, details) => {
  return send('info', message, details)
}

const sendTitle = (title) => {
  return send('title', title)
}

const sendError = (message, err) => {
  return send('error', message, err.stack || err.message || err)
}

module.exports = {
  // on,
  // once,
  // off,
  // request,
  on: ipcMain.on.bind(ipcMain),
  send,
  sendInfo,
  sendTitle,
  sendError,
}
