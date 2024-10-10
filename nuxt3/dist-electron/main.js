import { app as t, BrowserWindow as o } from "electron";
t.whenReady().then(async () => {
  await new Promise((e) => setTimeout(e, 1e3)), new o({
    height: 700,
    width: 720,
    minWidth: 720,
    autoHideMenuBar: !0,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#1C1B1F",
      symbolColor: "#8867c0"
    },
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1
    }
  }).loadURL(process.env.VITE_DEV_SERVER_URL);
});
