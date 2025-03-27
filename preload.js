// Minimal Preload Script (Only if Required)
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => 'pong'
});
