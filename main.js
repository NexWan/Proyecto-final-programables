// Este es el archivo principal de la aplicación de Electron. Este proceso se ejecutará mientras la aplicación esté en ejecución.
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;
function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/dist/browser/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Abre las herramientas de desarrollo de Chrome.
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}
app.on('ready', createWindow);
// Salir cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});