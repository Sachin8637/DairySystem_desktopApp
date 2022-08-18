function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 1024,
      height: 800,
      webPreferences: {
         preload: path.join(__dirname, 'preload.js')
       }
    })
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
    mainWindow.center();
    // Open the DevTools.  
   // mainWindow.webContents.openDevTools()
  }