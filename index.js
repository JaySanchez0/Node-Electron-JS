const { app, BrowserWindow,ipcMain } = require('electron');

function createWindow () {
    const win = new BrowserWindow({
    width: 500,
    altura: 500,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('index.html');
  win.resizable = false;
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.on("win",(e,args)=>{
  const win = BrowserWindow.getFocusedWindow();
  win.loadFile("Win.html");
  win.webContents.on("did-finish-load",()=>{
    win.webContents.send("winner",args);
  });
  console.log(args);
});

ipcMain.on("lose",(e)=>{
  const win = BrowserWindow.getFocusedWindow();
  win.loadFile("lose.html");
});

ipcMain.on("restart-game",(e)=>{
  const win = BrowserWindow.getFocusedWindow();
  win.loadFile("index.html");
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
