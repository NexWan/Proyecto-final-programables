const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });
    
    // Load your Angular app from localhost
    win.loadURL('http://localhost:4200');

    // Abre las herramientas de desarrollo de Chrome.
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
    win.setMenu(null);  
}

function refreshWindow() {
    if (win) {
      win.reload();
    }
}

app.on('ready', () => {
    createWindow();

    // Register the Control + R shortcut
    globalShortcut.register('Control+R', refreshWindow);
});

// Salir cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {
    // Unregister the shortcut.
    globalShortcut.unregister('Control+R');

    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});

