const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

// -------------------------------------------------------------------------
// CONFIGURAÇÃO FINAL: 
// Impede a reutilização de processos para estabilizar a renderização e inputs
// -------------------------------------------------------------------------
app.allowRendererProcessReuse = false;

// -------------------------------------------------------------------------
// IGNORAR DIÁLOGOS NATIVOS: Bloqueia as caixas de aviso (alert/confirm) do Windows
// -------------------------------------------------------------------------
app.on('ready', () => {
    // Sobrescreve as funções de diálogo para que elas não abram a janela nativa.
    dialog.showErrorBox = (title, content) => {
        console.log(`Error Ignored: ${title} - ${content}`);
    };
});


function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        // CORREÇÃO FEITA: Agora aponta para o seu arquivo 'TeddyApp.ico'
        icon: path.join(__dirname, 'TeddyApp.ico'), 
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            sandbox: false 
        },
        autoHideMenuBar: true 
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});