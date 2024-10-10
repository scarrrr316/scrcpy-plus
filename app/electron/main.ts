import { app, BrowserWindow } from 'electron'

app.whenReady().then(async () => {
  await new Promise(r => setTimeout(r, 1000)); // The webpage was loading before the Nuxt server was ready.
  const win = new BrowserWindow({
    height: 700,
    width: 720,
    minWidth: 720,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#1C1B1F',
      symbolColor: '#8867c0'
    },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadURL(process.env.VITE_DEV_SERVER_URL);
})