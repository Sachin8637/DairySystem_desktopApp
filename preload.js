const electron = require('electron');

const { contextBridge  } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
  ipcRenderer : electron.ipcRenderer
})
