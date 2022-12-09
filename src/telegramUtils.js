let webApp = window.Telegram.WebApp;

if(webApp.platform === 'unknown') {
  webApp = null;
}

export {
  webApp
}