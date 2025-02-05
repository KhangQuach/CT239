const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false, // Không nên bật để tránh bảo mật
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Chạy Next.js ở chế độ phát triển
  const dev = !app.isPackaged;
  if (dev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile("out/index.html"); // Khi đã build Next.js
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});