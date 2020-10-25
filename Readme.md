# Electron Framework from Desktop


## Quick start

[ver](https://www.electronjs.org/docs/tutorial/quick-start)

## Install 

~~~

    npm i --save-dev electron

~~~

## Start Script 

~~~
    "start": "electron ."
~~~

## How Send Message to View

~~~

  const win = BrowserWindow.getFocusedWindow();
  win.loadFile("Win.html");
  win.webContents.on("did-finish-load",()=>{
    // Sending Message
    win.webContents.send("winner",args);
  });

~~~

## How recibe Message in Wiew

~~~
    var ip = require("electron").ipcRenderer;
    //Recibe message 
    ip.on("winner",(e,v)=>{
        console.log("entro winner");
        document.getElementById("win").innerText=v;
    });
~~~

## How Change Win Content

~~~

  const win = BrowserWindow.getFocusedWindow();
  win.loadFile("Win.html");

~~~