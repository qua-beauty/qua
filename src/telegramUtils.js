let webApp = window.Telegram.WebApp;

console.log(webApp);

if(webApp.platform === 'unknown') {
  webApp = null;
}

export {
  webApp
}