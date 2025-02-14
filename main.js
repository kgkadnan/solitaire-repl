const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');
const next = require('next');

let mainWindow;
let nextJsServer;

// Initialize Next.js in production mode
const nextApp = next({ dev: false }); // Set dev to false for production
const nextHandle = nextApp.getRequestHandler();

function startNextJsServer() {
    nextApp.prepare().then(() => {
        console.log('Next.js production server is running at http://localhost:3000');

        // Start HTTP server to serve the production build
        nextJsServer = http.createServer((req, res) => {
            return nextHandle(req, res);
        });

        nextJsServer.listen(3000, () => {
            console.log('Next.js server is live at http://localhost:3000');
        });
    }).catch((err) => {
        console.error('Error starting Next.js production server:', err);
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'icons', 'logo.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            devTools: false
        },
    });

    // Load the Next.js production build
    const timestamp = Date.now();
    mainWindow.loadURL(`http://localhost:3000/v2/scanner?_=${timestamp}`);
    mainWindow.setMenuBarVisibility(false);

    mainWindow.on('closed', () => {
        mainWindow = null;
        nextJsServer.close(() => {
            console.log('Next.js server stopped');
        });
    });
}

app.whenReady().then(() => {
    startNextJsServer(); // Start Next.js server
    createWindow(); // Create the Electron window after Next.js starts
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        createWindow();
    }
});
