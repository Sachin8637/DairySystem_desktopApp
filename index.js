const { app, BrowserWindow, ipcMain} = require('electron');

let path = require('path');
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.reply('asynchronous-reply', 'pong')
// })
function createWindow () {
  //main Window Screen 
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      ontextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload.js'),
  }
    
  });

   mainWindow.webContents.openDevTools();
  //  mainWindow.loadFile('page-login.html');



   mainWindow.loadFile('index.html');

   // splash Screen 
   var splash = new BrowserWindow({
    width: 1024, 
    height: 800, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true,
    
  });
  
  splash.loadFile('splash-screen.html');
  splash.center();
  

  

  mainWindow.once('ready-to-show', () => {


    setTimeout(() => {
      splash.destroy();
      mainWindow.show();
     }, 3000);
     
    // let keepLogin = function(){

    //   sendAPIRequest("POST" , "users/login",loginData,{}).then(response => {
    //    if (response.ok) return response.json();
    //    return response.json().then(response => { 
           
    //      throw new Error(response.message)})
    // }).then((responseJson)=>{
    //    let {data, message } = responseJson;
    //    setToken("x-access-token",data.token);
    //    showToster("Success",message);
   
    //    mainWindow.loadFile('index.html');
   
    //    return;
   
    // })
       
    //  .else(
   
    //    mainWindow.loadFile('page-login.html')
    //  )
   
   
      //  .catch(e =>{
      //    showToster("Error",e.message)
      //    $('button[type="submit"]').removeAttr('disabled');
       
      //  console.log(e)})
   

  
        
       
        
  

   
  });
}



app.on('ready',()=>{
  createWindow();


  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on('open-new-window', (event, fileName) => {
  let win = new BrowserWindow({width:960, height:540})
  //win.loadURL('page-login.html')
 // win.loadURL('index.html')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



try {
  require('electron-reloader')(module)
} catch (_) {}


